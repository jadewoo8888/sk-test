package framework.modules.lowvalueitemsmanagement.bo;

import java.util.List;
import java.util.UUID;

import framework.modules.lowvalueitemsmanagement.dao.ItemsApplyMDetailDAO;
import framework.modules.lowvalueitemsmanagement.domain.ItemsApplyMDetail;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;
import framework.sys.tools.DBOperation;

@LogOperate(menu = "低值易耗品物品申领管理明细")
public class ItemsApplyMDetailBO  extends BOBase<ItemsApplyMDetailDAO, ItemsApplyMDetail>{

	@MethodID("addItemsApplyMDetail")
	@LogOperate(operate = "新增物品申领明细")
	public void addItemsApplyMDetail_log_trans(ItemsApplyMDetail itemsApplyMDetail) {
		String pk = UUID.randomUUID().toString();
		itemsApplyMDetail.setPk(pk);
		String[] updateInfo = DBOperation.getUpdateInfo();
		itemsApplyMDetail.setInsertTime(updateInfo[0]);
		itemsApplyMDetail.setLastestUpdate(updateInfo[0]);
		itemsApplyMDetail.setUpdatePerson(updateInfo[2]);
		entityDAO.save(itemsApplyMDetail);
	}
	
	@MethodID("modifyItemsApplyMDetail")
	@LogOperate(operate = "修改物品申领明细")
	public void modifyItemsApplyMDetail_log_trans(ItemsApplyMDetail itemsApplyMDetail){
		String[] updateInfo = DBOperation.getUpdateInfo();
		itemsApplyMDetail.setLastestUpdate(updateInfo[0]);
		itemsApplyMDetail.setUpdatePerson(updateInfo[2]);
		entityDAO.attachDirty(itemsApplyMDetail);
	}
	
	@MethodID("deleteItemsApplyMDetail")
	@LogOperate(operate = "删除一条物品申领明细")
	public String deleteItemsApplyMDetail_log_trans(String pk) {
		String return_tips = "";
		entityDAO.delete(entityDAO.findById(pk));
		return return_tips;

	}
	
	@MethodID("approvalItemMDtailCount")
	@LogOperate(operate = "审批物品申领明细")
	public void approvalItemMDtailCount_log_trans(List<ItemsApplyMDetail> itemsApplyMDetailList, int roleType){
		if (roleType == 2 || roleType == 3) {
			for (ItemsApplyMDetail itemsApplyMDetail : itemsApplyMDetailList) {
				ItemsApplyMDetail dbItemsApplyMDetail = entityDAO.findById(itemsApplyMDetail.getPk());
				if (roleType == 2) {
					dbItemsApplyMDetail.setIamListerCheckCount(itemsApplyMDetail.getIamListerCheckCount());
				} else if (roleType == 3) {
					dbItemsApplyMDetail.setIamLeaderCheckCount(itemsApplyMDetail.getIamLeaderCheckCount());
				}
				entityDAO.attachDirty(dbItemsApplyMDetail);
			}
		}
	}
}
