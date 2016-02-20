package framework.modules.lowvalueitemsmanagement.bo;

import java.util.List;
import java.util.UUID;

import framework.modules.lowvalueitemsmanagement.dao.ItemsPurchaseDetailDAO;
import framework.modules.lowvalueitemsmanagement.domain.ItemsPurchaseDetail;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;
import framework.sys.tools.DBOperation;

@LogOperate(menu = "低值易耗品物品采购申请明细")
public class ItemsPurchaseDetailBO extends BOBase<ItemsPurchaseDetailDAO, ItemsPurchaseDetail>{

	@MethodID("addItemsPurchaseDetail")
	@LogOperate(operate = "新增物品采购申请明细")
	public void addItemsPurchaseDetail_log_trans(ItemsPurchaseDetail itemsPurchaseDetail) {
		String pk = UUID.randomUUID().toString();
		itemsPurchaseDetail.setPk(pk);
		String[] updateInfo = DBOperation.getUpdateInfo();
		itemsPurchaseDetail.setInsertTime(updateInfo[0]);
		itemsPurchaseDetail.setLastestUpdate(updateInfo[0]);
		itemsPurchaseDetail.setUpdatePerson(updateInfo[2]);
		entityDAO.save(itemsPurchaseDetail);
	}
	
	@MethodID("modifyItemsPurchaseDetail")
	@LogOperate(operate = "修改物品采购申请明细")
	public void modifyItemsPurchaseDetail_log_trans(ItemsPurchaseDetail itemsPurchaseDetail){
		String[] updateInfo = DBOperation.getUpdateInfo();
		itemsPurchaseDetail.setLastestUpdate(updateInfo[0]);
		itemsPurchaseDetail.setUpdatePerson(updateInfo[2]);
		entityDAO.attachDirty(itemsPurchaseDetail);
	}
	
	@MethodID("deleteItemsPurchaseDetail")
	@LogOperate(operate = "删除一条物品采购申请明细")
	public String deleteItemsPurchaseDetail_log_trans(String pk) {
		String return_tips = "";
		entityDAO.delete(entityDAO.findById(pk));
		return return_tips;

	}
	
	@MethodID("approvalApplyCount")
	@LogOperate(operate = "审批物品申购数量")
	public void approveApplyCount_log_trans(List<ItemsPurchaseDetail> itemsPurchaseDetailList){
		for (ItemsPurchaseDetail itemsPurchaseDetail : itemsPurchaseDetailList) {
			ItemsPurchaseDetail dbItemsPurchaseDetail = entityDAO.findById(itemsPurchaseDetail.getPk());
			dbItemsPurchaseDetail.setIpDApproveCount(itemsPurchaseDetail.getIpDApproveCount());
			entityDAO.attachDirty(dbItemsPurchaseDetail);
		}
	}
	
	@MethodID("modifyPurchaseCount")
	@LogOperate(operate = "修改物品采购数量")
	public void modifyPurchaseCount_log_trans(List<ItemsPurchaseDetail> itemsPurchaseDetailList){
		for (ItemsPurchaseDetail itemsPurchaseDetail : itemsPurchaseDetailList) {
			ItemsPurchaseDetail dbItemsPurchaseDetail = entityDAO.findById(itemsPurchaseDetail.getPk());
			dbItemsPurchaseDetail.setIpDPurchaseCount(itemsPurchaseDetail.getIpDPurchaseCount());
			entityDAO.attachDirty(dbItemsPurchaseDetail);
		}
	}
}

