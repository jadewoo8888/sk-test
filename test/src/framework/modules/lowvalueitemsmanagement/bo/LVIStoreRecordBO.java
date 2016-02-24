package framework.modules.lowvalueitemsmanagement.bo;


import framework.modules.lowvalueitemsmanagement.dao.LVIStoreRecordDAO;
import framework.modules.lowvalueitemsmanagement.domain.ItemManage;
import framework.modules.lowvalueitemsmanagement.domain.LVIStoreRecord;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;

@LogOperate(menu = "")
public class LVIStoreRecordBO  extends BOBase<LVIStoreRecordDAO, LVIStoreRecord> {

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
	
}
