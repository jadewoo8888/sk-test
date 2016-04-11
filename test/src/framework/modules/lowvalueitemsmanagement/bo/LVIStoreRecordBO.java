package framework.modules.lowvalueitemsmanagement.bo;




import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
import framework.sys.tools.DBOperation;

@LogOperate(menu = "低值品入库记录管理")
public class LVIStoreRecordBO  extends BOBase<LVIStoreRecordDAO, LVIStoreRecord> {

	private LowValueItemsDAO lowValueItemsDAO;
	private ItemsPurchaseDetailDAO itemsPurchaseDetailDAO; 
	private ItemsPurchaseDAO itemsPurchaseDAO; 
	
	
	@MethodID("deleteStoreRecordList")
	@LogOperate(operate = "删除入库记录")
	public String deleteStoreRecordList_log_trans(String[] pks) {
		Set<String> cannotDelRecords = new HashSet<String>();//不能删除的记录
		String pksInSql = DBOperation.mosaicInStrSql(pks);
		//String strSqlStoreRecord = "SELECT * FROM tLVIStoreRecord WHERE pk in ( ? )";
		String strSqlStoreRecord = "SELECT * FROM tLVIStoreRecord WHERE pk in ( "+pksInSql+" ) and 1=?";
		List<LVIStoreRecord> lviStoreRecordList = entityDAO.executeFindEntitys(LVIStoreRecord.class, strSqlStoreRecord, "1");
		for (LVIStoreRecord lviStoreRecord : lviStoreRecordList) {
			//在执行删除操作前，如果发现删除后会导致库存变成负数，则提醒用户并不予删除
			String strSql = "SELECT * FROM tLowValueItems WHERE LVIItemManagePK = ?";
			LowValueItems dbLowValueItem = entityDAO.executeFindEntity(LowValueItems.class, strSql, lviStoreRecord.getLviSRItemManagePK());
			
			int count = dbLowValueItem.getLviCount() - lviStoreRecord.getLviSRCount();
			if (count < 0) {
				cannotDelRecords.add(dbLowValueItem.getLviName());
			} else {
				entityDAO.delete(lviStoreRecord);
				
				dbLowValueItem.setLviCount(count);
				lowValueItemsDAO.attachDirty(dbLowValueItem);
				//如该记录是通过采购功能入库的，删除时要更新采购单中对应的物品的已入库数量
				if (lviStoreRecord.getLviSRPurchasePK() != null && !lviStoreRecord.getLviSRPurchasePK().equals("")) {//是否是采购入库
					//更新申购单的入库数量合计（数量减少）
					String strSql1 = "select * from tItemsPurchase where PK = ?";
					ItemsPurchase itemsPurchase = entityDAO.executeFindEntity(ItemsPurchase.class, strSql1, lviStoreRecord.getLviSRPurchasePK());
					if (itemsPurchase != null) {
						itemsPurchase.setIpStoreCountSum(itemsPurchase.getIpStoreCountSum() - lviStoreRecord.getLviSRCount());
						itemsPurchaseDAO.attachDirty(itemsPurchase);
					}
					
					//更新申购单明细的已入库数量（数量减少）
					String strSql2 = "select * from tItemsPurchaseDetail where IPDItemsPurchasePK = ? and IPDItemManagePK = ?";
					ItemsPurchaseDetail itemsPurchaseDetail = entityDAO.executeFindEntity(ItemsPurchaseDetail.class, strSql2, lviStoreRecord.getLviSRPurchasePK(),lviStoreRecord.getLviSRItemManagePK());
					if (itemsPurchaseDetail != null) {
						itemsPurchaseDetail.setIpDStoreCount(itemsPurchaseDetail.getIpDStoreCount() - lviStoreRecord.getLviSRCount());
						itemsPurchaseDetailDAO.attachDirty(itemsPurchaseDetail);
					}
					
				}
			}
		}
		if (cannotDelRecords.size() > 0) {
			return cannotDelRecords.toString().replace("[", "【").replace("]", "】")+"不能被删除（因为删除后的库存不能为负数）";
		}
		return "";
	}
	
	@MethodID("modifyStoreRecord")
	@LogOperate(operate = "修改入库记录")
	public String modifyStoreRecord_log_trans(LVIStoreRecord lviStoreRecord) {
		
		LVIStoreRecord dbLVIStoreRecord = entityDAO.findById(lviStoreRecord.getPk());
		//如该记录是通过采购功能入库的，则不允许修改
		if (dbLVIStoreRecord.getLviSRPurchasePK() != null && !dbLVIStoreRecord.getLviSRPurchasePK().equals("")) {
			LogOperateManager.unlog();
			return "该记录是通过采购功能入库，故不允许修改！";
		}
		
		//保存后，每一类物品登记一条入库记录；将库存管理功能中的库存量增加对应的数量。
		String strSql = "SELECT * FROM tLowValueItems WHERE LVIItemManagePK = ?";
		LowValueItems dbLowValueItem = entityDAO.executeFindEntity(LowValueItems.class, strSql, lviStoreRecord.getLviSRItemManagePK());
		if (dbLowValueItem != null) {
			//更新下存库量（注意更新的数量要用修改前和修改后相对比，如果保存后会造成库存数量变成负数，则提醒用户并不予保存）；
			int count = lviStoreRecord.getLviSRCount() - dbLVIStoreRecord.getLviSRCount();
			if ((dbLowValueItem.getLviCount() + count) < 0) {
				LogOperateManager.unlog();
				return "修改之后的库存不能负数，请重新输入！";
			} else {
				//更新仓库的库存
				dbLowValueItem.setLviCount(dbLowValueItem.getLviCount() + count);
				lowValueItemsDAO.attachDirty(dbLowValueItem);
				//更新入库记录的入库数量
				dbLVIStoreRecord.setLviSRCount(lviStoreRecord.getLviSRCount());
				dbLVIStoreRecord.setLviSRRemark(lviStoreRecord.getLviSRRemark());
				entityDAO.attachDirty(dbLVIStoreRecord);
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
