package framework.modules.lowvalueitemsmanagement.bo;



import java.util.UUID;

import framework.modules.lowvalueitemsmanagement.dao.ItemsPurchaseDAO;
import framework.modules.lowvalueitemsmanagement.dao.ItemsPurchaseDetailDAO;
import framework.modules.lowvalueitemsmanagement.dao.LVIStoreRecordDAO;
import framework.modules.lowvalueitemsmanagement.dao.LowValueItemsDAO;
import framework.modules.lowvalueitemsmanagement.domain.ItemsPurchase;
import framework.modules.lowvalueitemsmanagement.domain.ItemsPurchaseDetail;
import framework.modules.lowvalueitemsmanagement.domain.LVIStoreRecord;
import framework.modules.lowvalueitemsmanagement.domain.LowValueItems;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;
import framework.sys.log.LogOperateManager;

@LogOperate(menu = "低值品入库记录管理")
public class LVIStoreRecordBO  extends BOBase<LVIStoreRecordDAO, LVIStoreRecord> {

	private LowValueItemsDAO lowValueItemsDAO;
	private ItemsPurchaseDetailDAO itemsPurchaseDetailDAO; 
	private ItemsPurchaseDAO itemsPurchaseDAO; 
	
	@MethodID("deleteStoreRecord")
	@LogOperate(operate = "删除一条入库记录")
	public String deleteStoreRecord_log_trans(String pk){
		LVIStoreRecord lviStoreRecord = entityDAO.findById(pk);
		
		String strSql = "SELECT * FROM tLowValueItems WHERE LVIItemManagePK = ?";
		LowValueItems dbLowValueItem = entityDAO.executeFindEntity(LowValueItems.class, strSql, lviStoreRecord.getLviSRItemManagePK());
		
		int count = dbLowValueItem.getLviCount() - lviStoreRecord.getLviSRCount();
		if (count < 0) {
			LogOperateManager.unlog();
			return "该记录无法删除!";
		} else {
			entityDAO.delete(lviStoreRecord);
			
			dbLowValueItem.setLviCount(count);
			lowValueItemsDAO.attachDirty(dbLowValueItem);
			//如该记录是通过采购功能入库的，删除时要更新采购单中对应的物品的已入库数量
			if (lviStoreRecord.getLviSRPurchasePK() != null && !lviStoreRecord.getLviSRPurchasePK().equals("")) {
				String strSql1 = "select * from tItemsPurchase where PK = ?";
				ItemsPurchase itemsPurchase = itemsPurchaseDAO.executeFindEntity(ItemsPurchase.class, strSql1, lviStoreRecord.getLviSRPurchasePK());
				itemsPurchase.setIpStoreCountSum(itemsPurchase.getIpPurchaseCountSum() - lviStoreRecord.getLviSRCount());
				itemsPurchaseDAO.attachDirty(itemsPurchase);
				
				String strSql2 = "select * from tItemsPurchaseDetail where IPDItemsPurchasePK = ? and IPDItemManagePK = ?";
				ItemsPurchaseDetail itemsPurchaseDetail = itemsPurchaseDetailDAO.executeFindEntity(ItemsPurchaseDetail.class, strSql2, lviStoreRecord.getLviSRPurchasePK(),lviStoreRecord.getLviSRItemManagePK());
				itemsPurchaseDetail.setIpDStoreCount(itemsPurchaseDetail.getIpDStoreCount() - lviStoreRecord.getLviSRCount());
				itemsPurchaseDetailDAO.attachDirty(itemsPurchaseDetail);
			}
		}
		return "";
	}
	
	@MethodID("deleteStoreRecordList")
	@LogOperate(operate = "批量删除入库记录")
	public String deleteStoreRecordList_log_trans(String[] pks){
		/*String pksInSql = DBOperation.mosaicInStrSql(pks);
		if (pksInSql.length() > 0) {
			String deleteMainSql = "delete from tLVIStoreRecord where pk in ( " + pksInSql + " )";
			entityDAO.executeSql(deleteMainSql);
		}*/
		for (String pk : pks) {
			String msg = this.deleteStoreRecord_log_trans(pk);
			if (!msg.equals("")) {
				LogOperateManager.unlog();
				return "部分记录无法删除!";
			}
		}
		return "";
	}
	
	@MethodID("modifyStoreRecord")
	@LogOperate(operate = "修改入库记录")
	public String modifyStoreRecord_log_trans(LVIStoreRecord lviStoreRecord) {
		
		LVIStoreRecord dbLVIStoreRecord = entityDAO.findById(lviStoreRecord.getPk());
		
		if (dbLVIStoreRecord.getLviSRPurchasePK() != null && !dbLVIStoreRecord.getLviSRPurchasePK().equals("")) {//	如该记录是通过采购功能入库的，则不允许修改
			return "该记录是通过采购功能入库，故不允许修改！";
		}
		
		int count = lviStoreRecord.getLviSRCount() - dbLVIStoreRecord.getLviSRCount();
		
		dbLVIStoreRecord.setLviSRCount(lviStoreRecord.getLviSRCount());
		dbLVIStoreRecord.setLviSRRemark(lviStoreRecord.getLviSRRemark());
		/*String[] updateInfo = DBOperation.getUpdateInfo();
		dbLVIStoreRecord.setLastestUpdate(updateInfo[0]);
		dbLVIStoreRecord.setUpdatePerson(updateInfo[2]);*/
		entityDAO.attachDirty(dbLVIStoreRecord);
		
		//保存后，每一类物品登记一条入库记录；将库存管理功能中的库存量增加对应的数量。
		String strSql = "SELECT * FROM tLowValueItems WHERE LVIItemManagePK = ?";
		LowValueItems dbLowValueItem = entityDAO.executeFindEntity(LowValueItems.class, strSql, lviStoreRecord.getLviSRItemManagePK());
		if (dbLowValueItem != null) {
			if ((dbLowValueItem.getLviCount() + count) < 0) {//则更新下存库量（注意更新的数量要用修改前和修改后相对比，如果保存后会造成库存数量变成负数，则提醒用户并不予保存）；
				LogOperateManager.unlog();
				return "修改之后的库存不能负数，请重新输入！";
			} else {
				dbLowValueItem.setLviCount(dbLowValueItem.getLviCount() + count);
				lowValueItemsDAO.attachDirty(dbLowValueItem);
			}
		}
		return "";
	}

	public LowValueItemsDAO getLowValueItemsDAO() {
		return lowValueItemsDAO;
	}

	public void setLowValueItemsDAO(LowValueItemsDAO lowValueItemsDAO) {
		this.lowValueItemsDAO = lowValueItemsDAO;
	}

	public ItemsPurchaseDetailDAO getItemsPurchaseDetailDAO() {
		return itemsPurchaseDetailDAO;
	}

	public void setItemsPurchaseDetailDAO(ItemsPurchaseDetailDAO itemsPurchaseDetailDAO) {
		this.itemsPurchaseDetailDAO = itemsPurchaseDetailDAO;
	}

	public ItemsPurchaseDAO getItemsPurchaseDAO() {
		return itemsPurchaseDAO;
	}

	public void setItemsPurchaseDAO(ItemsPurchaseDAO itemsPurchaseDAO) {
		this.itemsPurchaseDAO = itemsPurchaseDAO;
	}
	
	
}
