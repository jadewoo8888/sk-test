package framework.modules.lowvalueitemsmanagement.bo;

import java.util.UUID;

import framework.modules.lowvalueitemsmanagement.dao.ItemManageDAO;
import framework.modules.lowvalueitemsmanagement.dao.ItemsApplyManagementDAO;
import framework.modules.lowvalueitemsmanagement.domain.ItemsApplyManagement;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;
import framework.sys.tools.DBOperation;

@LogOperate(menu = "低值易耗品物品申领管理")
public class ItemsApplyManagementBO extends BOBase<ItemsApplyManagementDAO, ItemsApplyManagement>{

	/*@MethodID("addItem")
	@LogOperate(operate = "新增物品")
	public void addItem_log_trans(ItemsApplyManagement ItemsApplyManagement) {
		String pk = UUID.randomUUID().toString();
		ItemsApplyManagement.setPk(pk);
		String[] updateInfo = DBOperation.getUpdateInfo();
		ItemsApplyManagement.setInsertTime(updateInfo[0]);
		ItemsApplyManagement.setLastestUpdate(updateInfo[0]);
		ItemsApplyManagement.setUpdatePerson(updateInfo[2]);
		entityDAO.save(ItemsApplyManagement);
	}
	
	@MethodID("modifyItem")
	@LogOperate(operate = "修改物品")
	public void modifyItem_log_trans(ItemsApplyManagement ItemsApplyManagement){
		String[] updateInfo = DBOperation.getUpdateInfo();
		ItemsApplyManagement.setLastestUpdate(updateInfo[0]);
		ItemsApplyManagement.setUpdatePerson(updateInfo[2]);
		entityDAO.attachDirty(ItemsApplyManagement);
	}
	
	@MethodID("deleteItem")
	@LogOperate(operate = "删除物品")
	public void deleteItem_log_trans(String[] pkArr) {
		if (pkArr == null || pkArr.length == 0) {
			return;
		}
		*//** 第一步：遍历删除类目信息，更新对应的物业单元业务状态 * *//*
		for (int j = 0; j < pkArr.length; j++) {
			ItemsApplyManagement ItemsApplyManagement = entityDAO.findById(pkArr[j]);
			// 更新单元定义表中的业务状态 未申请
			entityDAO.delete(ItemsApplyManagement);
		}

		*//** 第二步：删除类目对应的各种信息 * *//*
	}*/

}
