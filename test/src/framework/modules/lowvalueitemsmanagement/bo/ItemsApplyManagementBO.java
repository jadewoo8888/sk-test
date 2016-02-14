package framework.modules.lowvalueitemsmanagement.bo;

import java.util.List;
import java.util.UUID;

import framework.modules.approve.bo.ApprovalBO;
import framework.modules.approve.bo.ApproveResult;
import framework.modules.lowvalueitemsmanagement.dao.ItemsApplyMDetailDAO;
import framework.modules.lowvalueitemsmanagement.dao.ItemsApplyManagementDAO;
import framework.modules.lowvalueitemsmanagement.domain.ItemsApplyMDetail;
import framework.modules.lowvalueitemsmanagement.domain.ItemsApplyManagement;
import framework.modules.propertymanagement.letrentmanage.domain.LetRent;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;
import framework.sys.tools.DBOperation;

@LogOperate(menu = "低值易耗品物品申领管理")
public class ItemsApplyManagementBO extends BOBase<ItemsApplyManagementDAO, ItemsApplyManagement> {

	private ItemsApplyMDetailDAO itemsApplyMDetailDAO;
	private ApprovalBO approvalBO;
	/*@MethodID("addItemApply")
	@LogOperate(operate = "新增物品申领")
	public void addItemApply_log_trans(ItemsApplyManagement ItemsApplyManagement) {
		String pk = UUID.randomUUID().toString();
		ItemsApplyManagement.setPk(pk);
		String[] updateInfo = DBOperation.getUpdateInfo();
		ItemsApplyManagement.setInsertTime(updateInfo[0]);
		ItemsApplyManagement.setLastestUpdate(updateInfo[0]);
		ItemsApplyManagement.setUpdatePerson(updateInfo[2]);
		entityDAO.save(ItemsApplyManagement);
	}*/
	
	@MethodID("addItemApply")
	@LogOperate(operate = "新增物品申领")
	public void addItemApply_log_trans(ItemsApplyManagement itemsApplyManagement, List<ItemsApplyMDetail> itemsApplyMdetailList, boolean ifReport) {
		String applyManagementPk = UUID.randomUUID().toString();
		itemsApplyManagement.setPk(applyManagementPk);
		String applyCode = UUID.randomUUID().toString();
		itemsApplyManagement.setItemsApplyCode(applyCode);
		
		String[] updateInfo = DBOperation.getUpdateInfo();
		
		itemsApplyManagement.setApplyPerson(updateInfo[2]);
		//itemsApplyManagement.setItemsApplyDate(updateInfo[0]);
		itemsApplyManagement.setIamCheckFlag("FSCCQWPFS_002");
		//itemsApplyManagement.setItemsApplyFlag("");
		//itemsApplyManagement.setApprovalFlag("");
		itemsApplyManagement.setItemsIssueLister("");
		itemsApplyManagement.setItemsIssueDate("");
		if ("WPSLZT_002".equals(itemsApplyManagement.getItemsApplyFlag())) {
			itemsApplyManagement.setAllowApprPerson("");
		}
		
		itemsApplyManagement.setInsertTime(updateInfo[0]);
		itemsApplyManagement.setLastestUpdate(updateInfo[0]);
		itemsApplyManagement.setUpdatePerson(updateInfo[2]);
		
		entityDAO.save(itemsApplyManagement);
		
		for (ItemsApplyMDetail itemsApplyMdetail : itemsApplyMdetailList) {
			itemsApplyMdetail.setPk(UUID.randomUUID().toString());
			itemsApplyMdetail.setItemsApplyMPK(applyManagementPk);
			itemsApplyMdetail.setInsertTime(updateInfo[0]);
			itemsApplyMdetail.setLastestUpdate(updateInfo[0]);
			itemsApplyMdetail.setUpdatePerson(updateInfo[2]);
			itemsApplyMDetailDAO.save(itemsApplyMdetail);
		}
		
		if (ifReport) {
			this.upreportItemsApply_log_trans(applyManagementPk);
		}
	}
	
	@MethodID("modifyItemApply")
	@LogOperate(operate = "修改物品申领")
	public void modifyItemApply_log_trans(String pk, String itemsApplyRemark, List<ItemsApplyMDetail> itemsApplyMdetailList, boolean ifReport){
		ItemsApplyManagement itemsApplyManagement = entityDAO.findById(pk);
		String[] updateInfo = DBOperation.getUpdateInfo();
		itemsApplyManagement.setLastestUpdate(updateInfo[0]);
		itemsApplyManagement.setUpdatePerson(updateInfo[2]);
		itemsApplyManagement.setItemsApplyRemark(itemsApplyRemark);
		entityDAO.attachDirty(itemsApplyManagement);
		
		entityDAO.executeSql("delete from tItemsApplyMDetail t where t.itemsapplympk=?", pk);
		
		for (ItemsApplyMDetail itemsApplyMdetail : itemsApplyMdetailList) {
			itemsApplyMdetail.setPk(UUID.randomUUID().toString());
			itemsApplyMdetail.setItemsApplyMPK(itemsApplyManagement.getPk());
			itemsApplyMdetail.setInsertTime(updateInfo[0]);
			itemsApplyMdetail.setLastestUpdate(updateInfo[0]);
			itemsApplyMdetail.setUpdatePerson(updateInfo[2]);
			itemsApplyMDetailDAO.save(itemsApplyMdetail);
		}
		
		if (ifReport) {
			this.upreportItemsApply_log_trans(pk);
		}
	}
	
	@MethodID("deleteItemApply")
	@LogOperate(operate = "删除一条物品申领")
	public String deleteItemApply_log_trans(String pk) {
		String return_tips = "";
		entityDAO.delete(entityDAO.findById(pk));
		entityDAO.executeSql("delete from tItemsApplyMDetail t where t.itemsapplympk=?", pk);
		return return_tips;

	}
	
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
	 */
	private ApproveResult _upreport(ItemsApplyManagement itemsApplyManagement) {
		String[] sysPara = {"MENU_10_01_01",itemsApplyManagement.getOrgCode(),itemsApplyManagement.getItemsApplyDeptCode()};
		// 上报
		ApproveResult approveResult = approvalBO.toUpApproval(itemsApplyManagement.getOrgCode(), "SPYWLX_001", itemsApplyManagement.getPk(), sysPara);
		processApproval(itemsApplyManagement, approveResult);
		// 上报后，需要审批的生成待办事项
		if (!approveResult.getApplyStatus().equals("已审批通过")) {
			genSynTaken();
		}
		return approveResult;
	}

	private void processApproval(ItemsApplyManagement itemsApplyManagement, ApproveResult approveResult) {
		if (approveResult.getApplyStatus().equals("未提交")) {
			//letRent.setLetRentFlag("ZJZZT_001");
			itemsApplyManagement.setItemsApplyFlag("WPSLZT_001");
		}
		if (approveResult.getApplyStatus().equals("待审批")) {
			//letRent.setLetRentFlag("ZJZZT_002");
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
	
	private void genSynTaken() {

	}
	
	public ItemsApplyMDetailDAO getItemsApplyMDetailDAO() {
		return itemsApplyMDetailDAO;
	}

	public void setItemsApplyMDetailDAO(ItemsApplyMDetailDAO itemsApplyMDetailDAO) {
		this.itemsApplyMDetailDAO = itemsApplyMDetailDAO;
	}

	
}
