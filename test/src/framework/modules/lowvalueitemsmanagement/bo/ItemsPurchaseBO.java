package framework.modules.lowvalueitemsmanagement.bo;


import java.util.List;
import java.util.UUID;

import framework.modules.append.bo.AppendBO;
import framework.modules.append.bo.AppendBusinessType;
import framework.modules.append.domain.Append;
import framework.modules.approve.bo.ApprovalBO;
import framework.modules.approve.bo.ApproveResult;
import framework.modules.approve.dao.ApprovalDAO;
import framework.modules.approve.domain.Approval;
import framework.modules.lowvalueitemsmanagement.dao.ItemsPurchaseDAO;
import framework.modules.lowvalueitemsmanagement.dao.ItemsPurchaseDetailDAO;
import framework.modules.lowvalueitemsmanagement.domain.ItemsApplyManagement;
import framework.modules.lowvalueitemsmanagement.domain.ItemsPurchase;
import framework.modules.lowvalueitemsmanagement.domain.ItemsPurchaseDetail;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.cache.GlobalCache;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;
import framework.sys.log.LogOperateManager;
import framework.sys.tools.DBOperation;

@LogOperate(menu = "低值易耗品采购申请")
public class ItemsPurchaseBO  extends BOBase<ItemsPurchaseDAO, ItemsPurchase> {

	private ItemsPurchaseDetailDAO itemsPurchaseDetailDAO;
	private ItemsPurchaseDetailBO itemsPurchaseDetailBO;
	private AppendBO appendBO;
	private ApprovalBO approvalBO;
	private ApprovalDAO approvalDAO;
	
	public static String Menu_ItemsPurchaseMan_Check = "MENU_10_03_02";//采购申请审批菜单
	
	@MethodID("addItemPurchase")
	@LogOperate(operate = "新增物品采购申请")
	public void addItemPurchase_log_trans(ItemsPurchase itemsPurchase, List<ItemsPurchaseDetail> itemsPurchaseDetailList, boolean ifReport, String itemsApplyMPK, List<Append> appendList) {
		String itemsPurchasePk = UUID.randomUUID().toString();
		itemsPurchase.setPk(itemsPurchasePk);
		String ipCode = GlobalCache.getBusinBillNoFactoryService().getWPCGNo();
		itemsPurchase.setIpCode(ipCode);
		
		String[] updateInfo = DBOperation.getUpdateInfo();
		
		itemsPurchase.setIpApprovalFlag("WPSLZT_001");//未提交
		
		
		itemsPurchase.setInsertTime(updateInfo[0]);
		itemsPurchase.setLastestUpdate(updateInfo[0]);
		itemsPurchase.setUpdatePerson(updateInfo[2]);
		
		entityDAO.save(itemsPurchase);
		
		for (ItemsPurchaseDetail itemsPurchaseDetail : itemsPurchaseDetailList) {
			itemsPurchaseDetail.setPk(UUID.randomUUID().toString());
			itemsPurchaseDetail.setIpDItemsPurchasePK(itemsPurchasePk);
			itemsPurchaseDetail.setInsertTime(updateInfo[0]);
			itemsPurchaseDetail.setLastestUpdate(updateInfo[0]);
			itemsPurchaseDetail.setUpdatePerson(updateInfo[2]);
			itemsPurchaseDetailDAO.save(itemsPurchaseDetail);
		}
		
		if (ifReport) {
			LogOperateManager.operate("上报物品采购申请");
			this.upreportItemsPurchase_log_trans(itemsPurchasePk);
			//更新申领单位采购中
			String strSql = "update tItemsApplyManagement set IAMCheckFlag='FSCCQWPFS_003'  where pk = ? ";
			if (itemsApplyMPK != null && !itemsApplyMPK.equals("")) {
				entityDAO.executeSql(strSql, itemsApplyMPK);
			}
			
		}
		
		/** 第二步：处理附件信息 * */
		appendBO.processAppend(appendList, itemsPurchasePk, AppendBusinessType.TYYWLX_026, itemsPurchase.getIpOrgCode());
	}
	
	@MethodID("modifyItemPurchase")
	@LogOperate(operate = "修改物品采购申请")
	public void modifyItemPurchase_log_trans(String pk, String ipRemark, List<ItemsPurchaseDetail> itemsPurchaseDetailList, boolean ifReport,String itemsApplyMPK, List<Append> appendList){
		ItemsPurchase itemsPurchase = entityDAO.findById(pk);
		String[] updateInfo = DBOperation.getUpdateInfo();
		itemsPurchase.setLastestUpdate(updateInfo[0]);
		itemsPurchase.setUpdatePerson(updateInfo[2]);
		itemsPurchase.setIpRemark(ipRemark);
		entityDAO.attachDirty(itemsPurchase);
		
		entityDAO.executeSql("delete from tItemsPurchaseDetail t where t.IPDItemsPurchasePK=?", pk);
		
		for (ItemsPurchaseDetail itemsPurchaseDetail : itemsPurchaseDetailList) {
			itemsPurchaseDetail.setPk(UUID.randomUUID().toString());
			itemsPurchaseDetail.setIpDItemsPurchasePK(itemsPurchase.getPk());
			itemsPurchaseDetail.setInsertTime(updateInfo[0]);
			itemsPurchaseDetail.setLastestUpdate(updateInfo[0]);
			itemsPurchaseDetail.setUpdatePerson(updateInfo[2]);
			itemsPurchaseDetailDAO.save(itemsPurchaseDetail);
		}
		
		if (ifReport) {
			LogOperateManager.operate("上报物品采购申请");
			this.upreportItemsPurchase_log_trans(pk);
			//更新申领单位采购中
			String strSql = "update tItemsApplyManagement set IAMCheckFlag='FSCCQWPFS_003'  where pk = ? ";
			if (itemsApplyMPK != null && !itemsApplyMPK.equals("")) {
				entityDAO.executeSql(strSql, itemsApplyMPK);
			}
		}
		
		/** 第二步：处理附件信息 * */
		appendBO.processAppend(appendList, pk, AppendBusinessType.TYYWLX_026, itemsPurchase.getIpOrgCode());
	}
	
	@MethodID("deleteItemPurchase")
	@LogOperate(operate = "删除一条物品采购申请")
	public String deleteItemPurchase_log_trans(String pk) {
		String return_tips = "";
		entityDAO.delete(entityDAO.findById(pk));
		entityDAO.executeSql("delete from tItemsPurchaseDetail t where t.IPDItemsPurchasePK=?", pk);
		
		/** 第二步：删除对应的附件信息 * */
		String pkArr[] = {pk};
		appendBO.deleteAppendByBusinessCode(pkArr, AppendBusinessType.TYYWLX_026);
		return return_tips;

	}
	
	@MethodID("upreportItemsPurchase")
	@LogOperate(operate = "上报物品采购申请")
	public void upreportItemsPurchase_log_trans(String pk) {
		if (pk == null) {
			return;
		}
		ItemsPurchase itemsPurchase = entityDAO.findById(pk);
		if (itemsPurchase.getIpApprovalFlag().equals("WPSLZT_001")) {
			_upreport(itemsPurchase);
		}
	}
	
	/**
	 * 上报动作
	 */
	private ApproveResult _upreport(ItemsPurchase itemsPurchase) {
		String[] sysPara = {Menu_ItemsPurchaseMan_Check,itemsPurchase.getIpOrgCode(),itemsPurchase.getIpDeptCode()};
		// 上报
		ApproveResult approveResult = approvalBO.toUpApproval(itemsPurchase.getIpOrgCode(), "SPYWLX_015", itemsPurchase.getPk(), sysPara);
		processApproval(itemsPurchase, approveResult);
		// 上报后，需要审批的生成待办事项
		if (!approveResult.getApplyStatus().equals("已审批通过")) {
			genSynTaken();
		}
		return approveResult;
	}

	private void processApproval(ItemsPurchase itemsPurchase, ApproveResult approveResult) {
		if (approveResult.getApplyStatus().equals("未提交")) {
			itemsPurchase.setIpApprovalFlag("WPSLZT_001");
		}
		if (approveResult.getApplyStatus().equals("待审批")) {
			itemsPurchase.setIpApprovalFlag("WPSLZT_002");
		}
		if (approveResult.getApplyStatus().equals("审批中")) {
			itemsPurchase.setIpApprovalFlag("WPSLZT_003");
		}
		if (approveResult.getApplyStatus().equals("已审批通过")) {
			itemsPurchase.setIpApprovalFlag("WPSLZT_004");
		}
		if (approveResult.getApplyStatus().equals("审批不通过")) {
			itemsPurchase.setIpApprovalFlag("WPSLZT_005");
		}
		//ItemsPurchase.setApprovalFlag(approveResult.getApprovalStatus());// 审批状态
		String strCurMan = approveResult.getCurMan();
		String strHisMan = approveResult.getHisMan();
		itemsPurchase.setAllowApprPerson(strCurMan == null || strCurMan.equals("") ? "" : ("|" + strCurMan + "|"));// 当前审批人
		strHisMan = (itemsPurchase.getLinkers()==null?"":itemsPurchase.getLinkers()) + (strHisMan == null || strHisMan.equals("") ? "" : (strHisMan + "|"));
		strHisMan = strHisMan.startsWith("|") ? strHisMan : "|" + strHisMan;
		itemsPurchase.setLinkers(strHisMan);// 历史审批人
		entityDAO.attachDirty(itemsPurchase);
	}
	
	@MethodID("approvalItemsPurchase")
	@LogOperate(operate = "审批物品申购")
	public ApproveResult approvalItemsPurchase_log_trans(ItemsPurchase itemsPurchase, Approval approval, List<Append> appendList, String strApprovalType,List<ItemsPurchaseDetail> itemsPurchaseDetailList) {
		ApproveResult approveResult = null;
		String[] arrCondition = _getApprovalConditon(itemsPurchase);
		String[] sysPara = {Menu_ItemsPurchaseMan_Check,itemsPurchase.getIpOrgCode(),itemsPurchase.getIpDeptCode()};
		// 通过 不通过
		if (!"1".equals(strApprovalType)) {
			if ("2".equals(strApprovalType)) {
				approveResult = approvalBO.toAgreeApproval(approval, arrCondition, sysPara);
				// 审批通过的处理
				processApproval(itemsPurchase, approveResult);
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
				processApproval(itemsPurchase, approveResult);
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
			entityDAO.attachDirty(itemsPurchase);
			approvalDAO.attachDirty(approval);
		}

		/** 处理附件 * */
		appendBO.processAppend(appendList, itemsPurchase.getPk(), AppendBusinessType.TYYWLX_026, itemsPurchase.getIpOrgCode());

		itemsPurchaseDetailBO.approveApplyCount_log_trans(itemsPurchaseDetailList);
		
		return approveResult;
	}
	
	private String[] _getApprovalConditon(ItemsPurchase ItemsPurchase) {
		return new String[] { "", "", "", "", "", "", "" };
	}
	
	private void genSynTaken() {

	}
	
	/*@MethodID("getListForPagePurchaseStatus")
	public ListForPageBean getListForPage(final int pageNumber, final int pageSize, final List<QueryCondition> queryCond, final String sortCond) {
		ListForPageBean listForPageBean = new ListForPageBean();
		QueryConditionAssembler assembler = getQueryConditionAssembler(queryCond, sortCond);
		int totalCount = entityDAO.getTotalCountForPage(assembler);
		List<ItemsPurchase> rowList = null;
		if (totalCount > 0) {
			rowList = entityDAO.getListForPage(" * ", pageNumber, pageSize, assembler);
		}
		if (rowList != null) {
			for (ItemsPurchase ItemsPurchase : rowList) {
				if (ItemsPurchase.getIpApprovalFlag().equals("WPSLZT_001")) {
					ItemsPurchase.setItemStatusDisplay("未上报");
				} else if(ItemsPurchase.getIpApprovalFlag().equals("WPSLZT_002")) {
					ItemsPurchase.setItemStatusDisplay("已上报");
				} else if(ItemsPurchase.getIpApprovalFlag().equals("WPSLZT_003")) {
					ItemsPurchase.setItemStatusDisplay("审批中");
				} else if(ItemsPurchase.getIamCheckFlag ().equals("FSCCQWPFS_001") || ItemsPurchase.getIpApprovalFlag().equals("WPSLZT_004") || ItemsPurchase.getIpApprovalFlag().equals("WPSLZT_005")) {
					ItemsPurchase.setItemStatusDisplay("已审批");
				} else if(ItemsPurchase.getIamCheckFlag().equals("FSCCQWPFS_003")) {
					ItemsPurchase.setItemStatusDisplay("采购中");
				} else if(ItemsPurchase.getIamCheckFlag().equals("FSCCQWPFS_002")) {
					ItemsPurchase.setItemStatusDisplay("待发放");
				} else if(ItemsPurchase.getIamCheckFlag().equals("FSCCQWPFS_004")) {
					ItemsPurchase.setItemStatusDisplay("已发放");
				}
			}
		}
		listForPageBean.setTotal(totalCount);
		FKOper.getInstance().setDisplay(rowList);
		listForPageBean.setRows(rowList);
		return listForPageBean;
		
	}*/

	public ItemsPurchaseDetailDAO getItemsPurchaseDetailDAO() {
		return itemsPurchaseDetailDAO;
	}

	public void setItemsPurchaseDetailDAO(ItemsPurchaseDetailDAO itemsPurchaseDetailDAO) {
		this.itemsPurchaseDetailDAO = itemsPurchaseDetailDAO;
	}

	public ItemsPurchaseDetailBO getItemsPurchaseDetailBO() {
		return itemsPurchaseDetailBO;
	}

	public void setItemsPurchaseDetailBO(ItemsPurchaseDetailBO itemsPurchaseDetailBO) {
		this.itemsPurchaseDetailBO = itemsPurchaseDetailBO;
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
