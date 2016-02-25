package framework.modules.lowvalueitemsmanagement.bo;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import framework.modules.lowvalueitemsmanagement.dao.LVIStoreRecordDAO;
import framework.modules.lowvalueitemsmanagement.dao.LowValueItemsDAO;
import framework.modules.lowvalueitemsmanagement.domain.LVIStoreRecord;
import framework.modules.lowvalueitemsmanagement.domain.LowValueItems;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;
import framework.sys.tools.DBOperation;

@LogOperate(menu = "低值品仓库管理")
public class LowValueItemsBO extends BOBase<LowValueItemsDAO, LowValueItems> {
	
	private LVIStoreRecordDAO lviStoreRecordDAO;
	
	@MethodID("addLowValueItems")
	@LogOperate(operate = "新增低值品仓库")
	public void addLowValueItems_log_trans(List<LowValueItems> lowValueItemsList, String orgCode) {
		
		String[] updateInfo = DBOperation.getUpdateInfo();
		
		for (LowValueItems newLowValueItems : lowValueItemsList) {
			//判断是否已经存在，如果已经存在则更新数量，不存在就新增一条记录
			String strSql = "SELECT * FROM tLowValueItems WHERE LVIItemManagePK = ?";
			LowValueItems lowValueItemOld = entityDAO.executeFindEntity(LowValueItems.class, strSql, newLowValueItems.getLviItemManagePK());
			if (lowValueItemOld != null) {
				lowValueItemOld.setLviCount(lowValueItemOld.getLviCount() + newLowValueItems.getLviCount());
				entityDAO.attachDirty(lowValueItemOld);
			} else {
				newLowValueItems.setPk(UUID.randomUUID().toString());
				newLowValueItems.setInserttime(updateInfo[0]);
				newLowValueItems.setLastestUpdate(updateInfo[0]);
				newLowValueItems.setUpdatePerson(updateInfo[2]);
				entityDAO.save(newLowValueItems);
			}
			//单独登记一条入库记录
			LVIStoreRecord lviStoreRecord = new LVIStoreRecord();
			lviStoreRecord.setlVISRCategoryPK(newLowValueItems.getLviCategoryPK());
			lviStoreRecord.setlVISRCount(newLowValueItems.getLviCount());//采购数量=入库数量？
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			lviStoreRecord.setlVISRDate(df.format(new Date()));
			lviStoreRecord.setlVISRItemManagePK(newLowValueItems.getLviItemManagePK());
			lviStoreRecord.setlVISRMetricUnit(newLowValueItems.getLviMetricUnit());
			lviStoreRecord.setlVISRName(newLowValueItems.getLviName());
			lviStoreRecord.setlVISROrgCode(orgCode);
			
			lviStoreRecord.setlVISRPerson(updateInfo[2]);
			lviStoreRecord.setlVISRPurchasePK(newLowValueItems.getPk());
			lviStoreRecord.setlVISRRemark("");
			lviStoreRecord.setlVISRSpecification(newLowValueItems.getLviSpecification());
			lviStoreRecord.setlVISRType(newLowValueItems.getLviType());
			lviStoreRecord.setPk(UUID.randomUUID().toString());
			
			lviStoreRecord.setInserttime(updateInfo[0]);
			lviStoreRecord.setLastestUpdate(updateInfo[0]);
			lviStoreRecord.setUpdatePerson(updateInfo[2]);
			
			lviStoreRecordDAO.save(lviStoreRecord);
		}
	}
	/*
	@MethodID("modifyItem")
	@LogOperate(operate = "修改物品")
	public void modifyItem_log_trans(ItemManage itemManage) {
		String[] updateInfo = DBOperation.getUpdateInfo();
		itemManage.setLastestUpdate(updateInfo[0]);
		itemManage.setUpdatePerson(updateInfo[2]);
		entityDAO.attachDirty(itemManage);
	}

	@MethodID("deleteItem")
	@LogOperate(operate = "删除一条物品")
	public void deleteItem_log_trans(String pk) {
		// 对应物品存在物品申领单或物品采购单、低值品入库记录时不允许删除
		String return_tips = "";
		entityDAO.delete(entityDAO.findById(pk));
		return return_tips;

	}*/

	public LVIStoreRecordDAO getLviStoreRecordDAO() {
		return lviStoreRecordDAO;
	}

	public void setLviStoreRecordDAO(LVIStoreRecordDAO lviStoreRecordDAO) {
		this.lviStoreRecordDAO = lviStoreRecordDAO;
	}
	
	
}
