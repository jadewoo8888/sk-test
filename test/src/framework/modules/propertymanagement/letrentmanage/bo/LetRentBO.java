package framework.modules.propertymanagement.letrentmanage.bo;

import java.util.List;
import java.util.UUID;

import framework.core.sql.DBType;
import framework.modules.append.bo.AppendBO;
import framework.modules.append.bo.AppendBusinessType;
import framework.modules.append.domain.Append;
import framework.modules.approve.bo.ApprovalBO;
import framework.modules.approve.bo.ApproveResult;
import framework.modules.approve.dao.ApprovalDAO;
import framework.modules.approve.domain.Approval;
import framework.modules.assetwriteoff.domain.AssetWriteoff;
import framework.modules.propertymanagement.letrentmanage.dao.LetRentDAO;
import framework.modules.propertymanagement.letrentmanage.domain.LetRent;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.cache.GlobalCache;
import framework.sys.cache.SystemConfig;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.foreignkeytranslation.FKOper;
import framework.sys.log.LogOperate;
import framework.sys.log.LogOperateManager;
import framework.sys.tools.DBOperation;

@LogOperate(menu = "出租信息管理")
public class LetRentBO extends BOBase<LetRentDAO, LetRent> {
	private AppendBO appendBO;
	private ApprovalBO approvalBO;
	private ApprovalDAO approvalDAO;

	/** 出租的审批菜单标识 */
	public static String Menu_LetRent_Check = "MENU_01_06_02_02";

	/** 
	 * 新增保存出租申请，按保存类型处理，新增或新增并上报
	 * 
	 * @param letRent
	 *            出租申请信息
	 * @param appendList
	 *            附件信息集合
	 * @param saveType
	 *            保存类型,addnew:新增保存,upreport:上报
	 * 
	 * @return
	 */
	@MethodID("addLetRent")
	@LogOperate(operate = "新增出租申请")
	public ApproveResult addLetRent_log_trans(LetRent letRent, List<Append> appendList, String saveType) {
		ApproveResult approveResult = null;
		String[] updateInfo = DBOperation.getUpdateInfo();
		String mainPK = UUID.randomUUID().toString();
		String billNo = GlobalCache.getBusinBillNoFactoryService().getZJZSQNo(letRent.getOrgSysCode(), letRent.getUnitCode());

		/** 第一步：处理出租申请信息的默认值等，并保存 * */
		// 招租方式不为‘综合评分’‘公开竞价’时，成功竞租月租金等于租金起步价
		if (!letRent.getLetRentWay().equals("ZZFS_001") && !letRent.getLetRentWay().equals("ZZFS_002")) {
			letRent.setUintRuleRent(letRent.getLetUpPrice());
		}
		// 新增默认值
		if ("addnew".equalsIgnoreCase(saveType)) {// 普通新增
			letRent.setLetRentFlag("ZJZZT_001");
			letRent.setApprovalProcess("未提交");
		}
		// 有无附件 没有填时根据传过来的参数判断
		letRent.setIfAdjunct(appendBO.hasAppend(appendList));
		letRent.setApplyPerson(updateInfo[2]);// 单据申请人
		letRent.setPk(mainPK);
		letRent.setLetRentCode(billNo);
		letRent.setLetRentBarCode(billNo);
		entityDAO.save(letRent);

		/** 第二步：处理附件信息 * */
		appendBO.processAppend(appendList, mainPK, AppendBusinessType.TYYWLX_003, letRent.getOrgSysCode());

		/** 第三步：按保存类型更新物业状态或上报* */
		if ("addnew".equals(saveType)) {
			// 更新单元定义表中的业务状态 审批中（此处使用脚本更新，如有需要则改成接口）
			entityDAO.executeSql("update tHouseUnit set CanLeaseFlag = 1 where UnitSysCode= ? ", letRent.getUnitSysCode());
		} else {
			LogOperateManager.unlog();
			LogOperateManager.operate("上报出租申请");
			approveResult = _upreport(letRent);
		}

		return approveResult;
	}

	/**
	 * 修改保存出租申请，按保存类型处理，修改保存或保存并上报
	 * 
	 * @param letRent
	 * @param appendList
	 * @param saveType
	 *            保存类型,modify:修改保存,upreport:上报
	 * @return
	 */
	@MethodID("modifyLetRent")
	@LogOperate(operate = "修改出租申请")
	public ApproveResult modifyLetRent_log_trans(LetRent letRent, List<Append> appendList, String saveType) {
		ApproveResult approveResult = null;

		/** 第一步：处理出租申请信息的默认值等，并保存 * */
		// 招租方式不为‘综合评分’‘公开竞价’时，成功竞租月租金等于租金起步价
		if (!letRent.getLetRentWay().equals("ZZFS_001") && !letRent.getLetRentWay().equals("ZZFS_002")) {
			letRent.setUintRuleRent(letRent.getLetUpPrice());
		}
		// 有无附件 没有填时根据传过来的参数判断
		letRent.setIfAdjunct(appendBO.hasAppend(appendList));

		/** 第二步：处理附件信息 * */
		appendBO.processAppend(appendList, letRent.getPk(), AppendBusinessType.TYYWLX_003, letRent.getOrgSysCode());

		/** 第三步：根据修改类型处理，若是修改保存，则需检查所选物业是否更改，若更改则需更新原物业的状态。 * */
		if ("modify".equals(saveType)) {
			LetRent oldLetRent = entityDAO.findById(letRent.getPk());
			// 如果修改了物业 则更新单元定义表中的业务状态（此处使用脚本更新，如有需要则改成接口）
			if (!oldLetRent.getUnitSysCode().equals(letRent.getUnitSysCode())) {
				entityDAO.executeSql("update tHouseUnit set CanLeaseFlag = 0 where UnitSysCode= ? ", oldLetRent.getUnitSysCode());
				entityDAO.executeSql("update tHouseUnit set CanLeaseFlag = 1 where UnitSysCode= ? ", letRent.getUnitSysCode());
			} 
		} else {
			LogOperateManager.operate("上报出租申请");
			approveResult = _upreport(letRent);
		}
		
		/** 保存更新出租信息，注意代码顺序需要在新旧出租信息比较后 **/
		entityDAO.merge(letRent);
		
		return approveResult;
	}

	/**
	 * 上报出租申请。先遍历pk，查找pk对应的出租信息，若出租信息的状态为‘未提交’则调用上报方法
	 * 
	 * @param pkArr
	 *            待上报的出租信息pk数组
	 */
	@MethodID("upreportLetRent")
	@LogOperate(operate = "上报出租申请")
	public void upreportLetRent_log_trans(String[] pkArr) {
		if (pkArr == null || pkArr.length == 0) {
			return;
		}
		for (int j = 0; j < pkArr.length; j++) {
			LetRent letRent = entityDAO.findById(pkArr[j]);
			if (letRent.getLetRentFlag().equals("ZJZZT_001")) {
				_upreport(letRent);
			}
		}
	}

	/**
	 * 审批出租申请单
	 * 
	 * @param letRent 出租申请信息
	 * @param approval 审批信息
	 * @param appendList 附件信息
	 * @param strApprovalType 审批类型 1 保存 2 通过 3 不通过
	 * @return
	 */
	@MethodID("approvalLetRent")
	@LogOperate(operate = "审批出租申请")
	public ApproveResult approvalLetRent_log_trans(LetRent letRent, Approval approval, List<Append> appendList, String strApprovalType) {
		ApproveResult approveResult = null;
		String[] arrCondition = _getApprovalConditon(letRent);

		// 有无附件 没有填时根据传过来的参数判断
		letRent.setIfAdjunct(appendBO.hasAppend(appendList));

		// 通过 不通过
		if (!"1".equals(strApprovalType)) {
			if ("2".equals(strApprovalType)) {
				approveResult = approvalBO.toAgreeApproval(approval, arrCondition, new String[] { Menu_LetRent_Check, letRent.getOrgSysCode(), "" });
				// 审批通过的处理
				processApproval(letRent, approveResult);
				// 同意后，不是已经通过结束的均生成待办事项
				if (approveResult.getApplyStatus().indexOf("通过") == -1) {
					genSynTaken();
				}
			} else if ("3".equals(strApprovalType)) {
				approveResult = approvalBO.toUnagreeApproval(approval, arrCondition, new String[] { Menu_LetRent_Check, letRent.getOrgSysCode(), "" });
				String nextOrgCode = approveResult.getNextOrgCode(); // 生成的下一审批单位
				String linkOrgCode = approval.getLinkOrgCode(); // 当前审批信息审批单位

				// 由于下级单位的编码长度会比当前单位的编码长度大，故若退回的长度大于当前审批单位的长度的话，或下一审批单位为空，即可视为退回了上一单位或退回申请人
				if (nextOrgCode == null || nextOrgCode.equals("") || nextOrgCode.length() > linkOrgCode.length()) {
				}

				// 审批不通过处理
				processApproval(letRent, approveResult);
				if (approveResult.getApplyStatus().indexOf("通过") == -1) {
					genSynTaken();
				}
			}

			String applyStatus = approveResult.getApplyStatus();// 申请单状态
			if (applyStatus.equals("已审批通过")) {
				// genSynTaken_approval_passend(assetWriteoff);
			}
		}
		// 保存
		else {
			LogOperateManager.operate("保存审批信息");
			entityDAO.attachDirty(letRent);
			approvalDAO.attachDirty(approval);
		}

		/** 处理附件 * */
		appendBO.processAppend(appendList, letRent.getPk(), AppendBusinessType.TYYWLX_003, letRent.getOrgSysCode());

		return approveResult;
	}

	private String[] _getApprovalConditon(LetRent letRent) {
		return new String[] { "", "", letRent.getUnitArea().toString(), "", "", "", "" };
	}

	/**
	 * 删除出租申请。先遍历pk，查找pk对应的出租信息，并删除，同时更新这些出租信息所对应的物业单元的业务状态
	 * 
	 * @param pkArr
	 */
	@MethodID("deleteLetRent")
	@LogOperate(operate = "删除出租申请")
	public void deleteLetRent_log_trans(String[] pkArr) {
		if (pkArr == null || pkArr.length == 0) {
			return;
		}
		/** 第一步：遍历删除出租申请信息，更新对应的物业单元业务状态 * */
		for (int j = 0; j < pkArr.length; j++) {
			LetRent letRent = entityDAO.findById(pkArr[j]);
			// 更新单元定义表中的业务状态 未申请
			entityDAO.executeSql("update tHouseUnit set CanLeaseFlag = 0 where UnitSysCode= ? ", letRent.getUnitSysCode());
			entityDAO.delete(letRent);
		}

		/** 第二步：删除出租申请对应的附件信息 * */
		appendBO.deleteAppendByBusinessCode(pkArr, AppendBusinessType.TYYWLX_003);
	}

	/**
	 * 查找某个物业最后登记的（按LetRentDate字段倒序）出租信息
	 * 
	 * @param unitSysCode
	 *            物业单元内部编码
	 * @return 若有则返回信息，否则null
	 */
	@MethodID("getLastLetRent")
	public LetRent getLastLetRent(String unitSysCode) {
		String strSql = "";

		if (SystemConfig.getDBType() == DBType.SqlServer) {
			strSql = "select top 1 * from tLetRent where UnitSysCode = ? order by LetRentDate desc";
		} else {
			strSql = "select * from (select * from tLetRent where UnitSysCode = ? order by LetRentDate desc) where rownum= 1 ";
		}
		LetRent letRent = entityDAO.executeFindEntity(LetRent.class, strSql, unitSysCode);
		FKOper.getInstance().setDisplay(letRent);
		return letRent;
	}

	/**
	 * 上报动作
	 */
	private ApproveResult _upreport(LetRent letRent) {
		// 上报
		ApproveResult approveResult = approvalBO.toUpApproval(letRent.getOrgSysCode(), "SPYWLX_001", letRent.getPk(), new String[] { Menu_LetRent_Check,
				letRent.getOrgSysCode(), "" });
		processApproval(letRent, approveResult);
		// 上报后，需要审批的生成待办事项
		if (!approveResult.getApplyStatus().equals("已审批通过")) {
			genSynTaken();
		}
		return approveResult;
	}

	/**
	 * 处理公共审批接口返回的结果
	 */
	private void processApproval(LetRent letRent, ApproveResult approveResult) {
		if (approveResult.getApplyStatus().equals("未提交")) {
			letRent.setLetRentFlag("ZJZZT_001");
		}
		if (approveResult.getApplyStatus().equals("待审批")) {
			letRent.setLetRentFlag("ZJZZT_002");
		}
		if (approveResult.getApplyStatus().equals("审批中")) {
			letRent.setLetRentFlag("ZJZZT_003");
		}
		if (approveResult.getApplyStatus().equals("已审批通过")) {
			letRent.setLetRentFlag("ZJZZT_004");
		}
		if (approveResult.getApplyStatus().equals("审批不通过")) {
			letRent.setLetRentFlag("ZJZZT_099");
		}
		letRent.setApprovalProcess(approveResult.getApprovalStatus());// 审批状态
		String strCurMan = approveResult.getCurMan();
		String strHisMan = approveResult.getHisMan();
		letRent.setAllowApprPerson(strCurMan == null || strCurMan.equals("") ? "" : ("|" + strCurMan + "|"));// 当前审批人
		strHisMan = (letRent.getLinkers()==null?"":letRent.getLinkers()) + (strHisMan == null || strHisMan.equals("") ? "" : (strHisMan + "|"));
		strHisMan = strHisMan.startsWith("|") ? strHisMan : "|" + strHisMan;
		letRent.setLinkers(strHisMan);// 历史审批人
		entityDAO.attachDirty(letRent);
		// 更新单元定义表中的业务状态
		if (approveResult.getCanLeaseFlag().equals("2"))approveResult.setCanLeaseFlag("3");//当状态为“已审批”时，直接改为“已确认”
		entityDAO.executeSql("update tHouseUnit set CanLeaseFlag = ?   where UnitSysCode = ?", approveResult.getCanLeaseFlag(), letRent.getUnitSysCode());
	}

	private void genSynTaken() {

	}

	public AppendBO getAppendBO() {
		return appendBO;
	}

	public void setAppendBO(AppendBO appendBO) {
		this.appendBO = appendBO;
	}

	public ApprovalBO getApprovalBO() {
		return approvalBO;
	}

	public void setApprovalBO(ApprovalBO approvalBO) {
		this.approvalBO = approvalBO;
	}

	public ApprovalDAO getApprovalDAO() {
		return approvalDAO;
	}

	public void setApprovalDAO(ApprovalDAO approvalDAO) {
		this.approvalDAO = approvalDAO;
	}
}
