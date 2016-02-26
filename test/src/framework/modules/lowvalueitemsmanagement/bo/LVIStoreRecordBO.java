package framework.modules.lowvalueitemsmanagement.bo;


import java.util.UUID;

import framework.modules.lowvalueitemsmanagement.dao.LVIStoreRecordDAO;
import framework.modules.lowvalueitemsmanagement.domain.ItemManage;
import framework.modules.lowvalueitemsmanagement.domain.LVIStoreRecord;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;
import framework.sys.tools.DBOperation;

@LogOperate(menu = "低值品入库记录管理")
public class LVIStoreRecordBO  extends BOBase<LVIStoreRecordDAO, LVIStoreRecord> {

	
	@MethodID("deleteStoreRecord")
	@LogOperate(operate = "删除一条入库记录")
	public void deleteStoreRecord_log_trans(String pk){
		entityDAO.delete(entityDAO.findById(pk));
	}
	
	@MethodID("deleteStoreRecordList")
	@LogOperate(operate = "批量删除入库记录")
	public void deleteStoreRecordList_log_trans(String[] pks){
		String pksInSql = DBOperation.mosaicInStrSql(pks);
		if (pksInSql.length() > 0) {
			String deleteMainSql = "delete from tLVIStoreRecord where pk in ( " + pksInSql + " )";
			entityDAO.executeSql(deleteMainSql);
		}
	}
	
	@MethodID("modifyStoreRecord")
	@LogOperate(operate = "修改入库记录")
	public void modifyStoreRecord_log_trans(LVIStoreRecord lviStoreRecord) {
		LVIStoreRecord dbLVIStoreRecord = entityDAO.findById(lviStoreRecord.getPk());
		dbLVIStoreRecord.setLviSRCount(lviStoreRecord.getLviSRCount());
		dbLVIStoreRecord.setLviSRRemark(lviStoreRecord.getLviSRRemark());
		String[] updateInfo = DBOperation.getUpdateInfo();
		dbLVIStoreRecord.setLastestUpdate(updateInfo[0]);
		dbLVIStoreRecord.setUpdatePerson(updateInfo[2]);
		entityDAO.attachDirty(dbLVIStoreRecord);
	}

}
