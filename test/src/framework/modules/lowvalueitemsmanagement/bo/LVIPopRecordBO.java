package framework.modules.lowvalueitemsmanagement.bo;

import java.util.UUID;

import framework.modules.lowvalueitemsmanagement.dao.ItemManageDAO;
import framework.modules.lowvalueitemsmanagement.dao.LVIPopRecordDAO;
import framework.modules.lowvalueitemsmanagement.domain.ItemManage;
import framework.modules.lowvalueitemsmanagement.domain.LVIPopRecord;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;
import framework.sys.tools.DBOperation;

@LogOperate(menu = "低值易耗品物品管理")
public class LVIPopRecordBO  extends BOBase<LVIPopRecordDAO, LVIPopRecord>{

	@MethodID("addItem")
	@LogOperate(operate = "新增物品")
	public void addItem_log_trans(ItemManage itemManage) {
		/*String pk = UUID.randomUUID().toString();
		itemManage.setPk(pk);
		String[] updateInfo = DBOperation.getUpdateInfo();
		itemManage.setInsertTime(updateInfo[0]);
		itemManage.setLastestUpdate(updateInfo[0]);
		itemManage.setUpdatePerson(updateInfo[2]);
		entityDAO.save(itemManage);*/
	}
	
	@MethodID("modifyItem")
	@LogOperate(operate = "修改物品")
	public void modifyItem_log_trans(ItemManage itemManage){
		/*String[] updateInfo = DBOperation.getUpdateInfo();
		itemManage.setLastestUpdate(updateInfo[0]);
		itemManage.setUpdatePerson(updateInfo[2]);
		entityDAO.attachDirty(itemManage);*/
	}
	
	@MethodID("deleteItem")
	@LogOperate(operate = "删除一条物品")
	public void deleteItem_log_trans(String pk) {
		//对应物品存在物品申领单或物品采购单、低值品入库记录时不允许删除
		/*String return_tips = "";
		entityDAO.delete(entityDAO.findById(pk));*/

	}
}
