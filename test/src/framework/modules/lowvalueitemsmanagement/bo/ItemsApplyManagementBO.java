package framework.modules.lowvalueitemsmanagement.bo;

import java.util.UUID;

import framework.modules.lowvalueitemsmanagement.dao.ItemsApplyManagementDAO;
import framework.modules.lowvalueitemsmanagement.domain.ItemsApplyManagement;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;
import framework.sys.tools.DBOperation;

@LogOperate(menu = "低值易耗品物品申领管理")
public class ItemsApplyManagementBO extends BOBase<ItemsApplyManagementDAO, ItemsApplyManagement> {

	@MethodID("addItemApply")
	@LogOperate(operate = "新增物品申领")
	public void addItemApply_log_trans(ItemsApplyManagement ItemsApplyManagement) {
		String pk = UUID.randomUUID().toString();
		ItemsApplyManagement.setPk(pk);
		String[] updateInfo = DBOperation.getUpdateInfo();
		ItemsApplyManagement.setInsertTime(updateInfo[0]);
		ItemsApplyManagement.setLastestUpdate(updateInfo[0]);
		ItemsApplyManagement.setUpdatePerson(updateInfo[2]);
		entityDAO.save(ItemsApplyManagement);
	}
	
	@MethodID("modifyItemApply")
	@LogOperate(operate = "修改物品申领")
	public void modifyItemApply_log_trans(ItemsApplyManagement ItemsApplyManagement){
		String[] updateInfo = DBOperation.getUpdateInfo();
		ItemsApplyManagement.setLastestUpdate(updateInfo[0]);
		ItemsApplyManagement.setUpdatePerson(updateInfo[2]);
		entityDAO.attachDirty(ItemsApplyManagement);
	}
	
	@MethodID("deleteItemApply")
	@LogOperate(operate = "删除一条物品申领")
	public String deleteItemApply_log_trans(String pk) {
		String return_tips = "";
		entityDAO.delete(entityDAO.findById(pk));
		return return_tips;

	}

}
