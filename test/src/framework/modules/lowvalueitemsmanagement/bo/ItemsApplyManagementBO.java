package framework.modules.lowvalueitemsmanagement.bo;

import java.util.List;
import java.util.UUID;

import framework.core.sql.QueryCondition;
import framework.core.sql.QueryConditionAssembler;
import framework.modules.append.bo.AppendBO;
import framework.modules.append.bo.AppendBusinessType;
import framework.modules.append.domain.Append;
import framework.modules.approve.bo.ApprovalBO;
import framework.modules.approve.bo.ApproveResult;
import framework.modules.approve.dao.ApprovalDAO;
import framework.modules.approve.domain.Approval;
import framework.modules.lowvalueitemsmanagement.dao.ItemsApplyMDetailDAO;
import framework.modules.lowvalueitemsmanagement.dao.ItemsApplyManagementDAO;
import framework.modules.lowvalueitemsmanagement.domain.ItemsApplyMDetail;
import framework.modules.lowvalueitemsmanagement.domain.ItemsApplyManagement;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.basemodule.bo.ListForPageBean;
import framework.sys.cache.GlobalCache;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.foreignkeytranslation.FKOper;
import framework.sys.log.LogOperate;
import framework.sys.log.LogOperateManager;

@LogOperate(menu = "低值易耗品物品申领管理")
public class ItemsApplyManagementBO extends BOBase<ItemsApplyManagementDAO, ItemsApplyManagement> {

	private ItemsApplyMDetailDAO itemsApplyMDetailDAO;
	private ItemsApplyMDetailBO itemsApplyMDetailBO;
	private AppendBO appendBO;
	private ApprovalBO approvalBO;
	private ApprovalDAO approvalDAO;
	
	public static String Menu_ItemsApplyMan_Check = "MENU_10_01_02";//申领审批菜单
	
	/**
	 * 
	 * @param itemsApplyManagement
	 * @param itemsApplyMdetailList
	 * @param ifReport
	 * @param appendList
	 */
	@MethodID("addItemApply")
	@LogOperate(operate = "新增物品申领登记")
	public String addItemApply_log_trans(ItemsApplyManagement itemsApplyManagement, List<ItemsApplyMDetail> itemsApplyMdetailList, boolean ifReport,List<Append> appendList) {
		/** 第一步：新增物品申领 * */
		//新增物品申领
		String applyManagementPk = UUID.randomUUID().toString();
		itemsApplyManagement.setPk(applyManagementPk);
		String applyCode = GlobalCache.getBusinBillNoFactoryService().getWPSLNo();
		itemsApplyManagement.setItemsApplyCode(applyCode);
		itemsApplyManagement.setIamCheckFlag("FSCCQWPFS_002");//默认待发放
		itemsApplyManagement.setItemsApplyFlag("WPSLZT_001");//默认未提交
		entityDAO.save(itemsApplyManagement);
		
		//保存申领明细列表
		for (ItemsApplyMDetail itemsApplyMdetail : itemsApplyMdetailList) {
			itemsApplyMdetail.setItemsApplyMPK(applyManagementPk);
			itemsApplyMDetailDAO.save(itemsApplyMdetail);
		}
		//上报
		if (ifReport) {
			LogOperateManager.operate("上报物品申领");
			this.upreportItemsApply_log_trans(applyManagementPk);
		}
		
		/** 第二步：处理附件信息 * */
		appendBO.processAppend(appendList, applyManagementPk, AppendBusinessType.TYYWLX_024, itemsApplyManagement.getOrgCode());
		
		return "";
	}
	
	/**
	 * 
	 * @param itemsApplyMPK
	 * @param itemsApplyRemark
	 * @param itemsApplyMdetailList
	 * @param ifReport
	 * @param appendList
	 */
	@MethodID("modifyItemApply")
	@LogOperate(operate = "修改物品申领登记")
	public String modifyItemApply_log_trans(String itemsApplyMPK, String itemsApplyRemark, List<ItemsApplyMDetail> itemsApplyMdetailList, boolean ifReport,List<Append> appendList){
		/** 第一步：修改物品申领 * */
		//修改物品申领备注
		ItemsApplyManagement itemsApplyManagement = entityDAO.findById(itemsApplyMPK);
		itemsApplyManagement.setItemsApplyRemark(itemsApplyRemark);
		entityDAO.attachDirty(itemsApplyManagement);
		
		//修改物品申领明细的申领数量
		String strSql = "select * from tItemsApplyMDetail t where t.pk=?";
		ItemsApplyMDetail dbItemsApplyMDetail = null;
		for (ItemsApplyMDetail itemsApplyMdetail : itemsApplyMdetailList) {
			dbItemsApplyMDetail = entityDAO.executeFindEntity(ItemsApplyMDetail.class, strSql, itemsApplyMdetail.getPk());
			dbItemsApplyMDetail.setIamApplyCount(itemsApplyMdetail.getIamApplyCount());
			itemsApplyMDetailDAO.attachDirty(dbItemsApplyMDetail);
		}
		
		//上报
		if (ifReport) {
			LogOperateManager.operate("上报物品申领登记");
			this.upreportItemsApply_log_trans(itemsApplyMPK);
		}
		
		/** 第二步：处理附件信息 * */
		appendBO.processAppend(appendList, itemsApplyMPK, AppendBusinessType.TYYWLX_024, itemsApplyManagement.getOrgCode());
		
		return "";
	}
	
	/**
	 * 
	 * @param pk
	 * @return
	 */
	@MethodID("deleteItemApply")
	@LogOperate(operate = "删除一条物品申领登记")
	public String deleteItemApply_log_trans(String pk) {
		/** 第一步：删除物品申领单 * */
		entityDAO.executeSql("delete from tItemsApplyManagement t where t.pk = ?", pk);
		/** 第二步：删除对应的物品申领单明细 * */
		entityDAO.executeSql("delete from tItemsApplyMDetail t where t.itemsapplympk=?", pk);
		
		/** 第三步：删除对应的附件信息 * */
		String pkArr[] = {pk};
		appendBO.deleteAppendByBusinessCode(pkArr, AppendBusinessType.TYYWLX_024);
		return "";

	}
	
	/**
	 * 
	 * @param pk
	 */
	@MethodID("upreportItemsApply")
	@LogOperate(operate = "上报物品申领登记")
	public void upreportItemsApply_log_trans(String pk) {
		if (pk == null) {
			return;
		}
		ItemsApplyManagement itemsApplyManagement = entityDAO.findById(pk);
		if (itemsApplyManagement.getItemsApplyFlag().equals("WPSLZT_001")) {
			_upreport(itemsApplyManagement);
		}
	}
	
	/**
	 * 上报动作
	 * @param itemsApplyManagement
	 * @return
	 */
	private ApproveResult _upreport(ItemsApplyManagement itemsApplyManagement) {
		String[] sysPara = {Menu_ItemsApplyMan_Check,itemsApplyManagement.getOrgCode(),itemsApplyManagement.getItemsApplyDeptCode()};
		// 上报
		ApproveResult approveResult = approvalBO.toUpApproval(itemsApplyManagement.getOrgCode(), "SPYWLX_014", itemsApplyManagement.getPk(), sysPara);
		processApproval(itemsApplyManagement, approveResult);
		// 上报后，需要审批的生成待办事项
		if (!approveResult.getApplyStatus().equals("已审批通过")) {
			genSynTaken();
		}
		return approveResult;
	}

	private void processApproval(ItemsApplyManagement itemsApplyManagement, ApproveResult approveResult) {
		if (approveResult.getApplyStatus().equals("未提交")) {
			itemsApplyManagement.setItemsApplyFlag("WPSLZT_001");
		}
		if (approveResult.getApplyStatus().equals("待审批")) {
			itemsApplyManagement.setItemsApplyFlag("WPSLZT_002");
		}
		if (approveResult.getApplyStatus().equals("审批中")) {
			itemsApplyManagement.setItemsApplyFlag("WPSLZT_003");
		}
		if (approveResult.getApplyStatus().equals("已审批通过")) {
			itemsApplyManagement.setItemsApplyFlag("WPSLZT_004");
		}
		if (approveResult.getApplyStatus().equals("审批不通过")) {
			itemsApplyManagement.setItemsApplyFlag("WPSLZT_005");
		}
		itemsApplyManagement.setApprovalFlag(approveResult.getApprovalStatus());// 审批状态
		String strCurMan = approveResult.getCurMan();
		String strHisMan = approveResult.getHisMan();
		itemsApplyManagement.setAllowApprPerson(strCurMan == null || strCurMan.equals("") ? "" : ("|" + strCurMan + "|"));// 当前审批人
		strHisMan = (itemsApplyManagement.getLinkers()==null?"":itemsApplyManagement.getLinkers()) + (strHisMan == null || strHisMan.equals("") ? "" : (strHisMan + "|"));
		strHisMan = strHisMan.startsWith("|") ? strHisMan : "|" + strHisMan;
		itemsApplyManagement.setLinkers(strHisMan);// 历史审批人
		entityDAO.attachDirty(itemsApplyManagement);
	}
	
	@MethodID("approvalItemsApply")
	@LogOperate(operate = "审批物品申领登记")
	public ApproveResult approvalItemsApply_log_trans(ItemsApplyManagement itemsApplyManagement, Approval approval, List<Append> appendList, String strApprovalType,List<ItemsApplyMDetail> itemsApplyMDetailList, int roleType) {
		ApproveResult approveResult = null;
		String[] arrCondition = _getApprovalConditon(itemsApplyManagement);
		String[] sysPara = {Menu_ItemsApplyMan_Check,itemsApplyManagement.getOrgCode(),itemsApplyManagement.getItemsApplyDeptCode()};
		// 通过 不通过
		if (!"1".equals(strApprovalType)) {
			if ("2".equals(strApprovalType)) {
				approveResult = approvalBO.toAgreeApproval(approval, arrCondition, sysPara);
				// 审批通过的处理
				processApproval(itemsApplyManagement, approveResult);
				// 同意后，不是已经通过结束的均生成待办事项
				if (approveResult.getApplyStatus().indexOf("通过") == -1) {
					genSynTaken();
				}
			} else if ("3".equals(strApprovalType)) {
				approveResult = approvalBO.toUnagreeApproval(approval, arrCondition, sysPara);
				String nextOrgCode = approveResult.getNextOrgCode(); // 生成的下一审批单位
				String linkOrgCode = approval.getLinkOrgCode(); // 当前审批信息审批单位

				// 由于下级单位的编码长度会比当前单位的编码长度大，故若退回的长度大于当前审批单位的长度的话，或下一审批单位为空，即可视为退回了上一单位或退回申请人
				if (nextOrgCode == null || nextOrgCode.equals("") || nextOrgCode.length() > linkOrgCode.length()) {
				}

				// 审批不通过处理
				processApproval(itemsApplyManagement, approveResult);
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
			entityDAO.attachDirty(itemsApplyManagement);
			approvalDAO.attachDirty(approval);
		}

		/** 处理附件 * */
		appendBO.processAppend(appendList, itemsApplyManagement.getPk(), AppendBusinessType.TYYWLX_024, itemsApplyManagement.getOrgCode());

		itemsApplyMDetailBO.approvalItemMDtailCount_log_trans(itemsApplyMDetailList, roleType);
		
		return approveResult;
	}
	
	private String[] _getApprovalConditon(ItemsApplyManagement itemsApplyManagement) {
		return new String[] { "", "", "", "", "", "", "" };
	}
	
	private void genSynTaken() {

	}
	
	@MethodID("getListForPageItemStatus")
	public ListForPageBean getListForPage(final int pageNumber, final int pageSize, final List<QueryCondition> queryCond, final String sortCond) {
		ListForPageBean listForPageBean = new ListForPageBean();
		QueryConditionAssembler assembler = getQueryConditionAssembler(queryCond, sortCond);
		int totalCount = entityDAO.getTotalCountForPage(assembler);
		List<ItemsApplyManagement> rowList = null;
		if (totalCount > 0) {
			rowList = entityDAO.getListForPage(" * ", pageNumber, pageSize, assembler);
		}
		
		listForPageBean.setTotal(totalCount);
		FKOper.getInstance().setDisplay(rowList);
		listForPageBean.setRows(rowList);
		return listForPageBean;
		
	}
	
	public ItemsApplyMDetailDAO getItemsApplyMDetailDAO() {
		return itemsApplyMDetailDAO;
	}

	public void setItemsApplyMDetailDAO(ItemsApplyMDetailDAO itemsApplyMDetailDAO) {
		this.itemsApplyMDetailDAO = itemsApplyMDetailDAO;
	}

	public ItemsApplyMDetailBO getItemsApplyMDetailBO() {
		return itemsApplyMDetailBO;
	}

	public void setItemsApplyMDetailBO(ItemsApplyMDetailBO itemsApplyMDetailBO) {
		this.itemsApplyMDetailBO = itemsApplyMDetailBO;
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

	public AppendBO getAppendBO() {
		return appendBO;
	}

	public void setAppendBO(AppendBO appendBO) {
		this.appendBO = appendBO;
	}

	

	
}
