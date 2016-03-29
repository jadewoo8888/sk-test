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
	public void addLowValueItems_log_trans(List<LowValueItems> lowValueItemsList, String orgCode, String deptCode) {
		
		String[] updateInfo = DBOperation.getUpdateInfo();
		
		for (LowValueItems newLowValueItems : lowValueItemsList) {
			if (newLowValueItems.getLviCount() > 0) {//控制入库数量大于0的才可以入库
				//判断仓库记录是否已经存在，如果已经存在则更新数量，不存在就新增一条记录
				String strSql = "SELECT * FROM tLowValueItems WHERE LVIItemManagePK = ?";
				LowValueItems lowValueItemOld = entityDAO.executeFindEntity(LowValueItems.class, strSql, newLowValueItems.getLviItemManagePK());
				if (lowValueItemOld != null) {
					lowValueItemOld.setLviCount(lowValueItemOld.getLviCount() + newLowValueItems.getLviCount());
					entityDAO.attachDirty(lowValueItemOld);
				} else {
					newLowValueItems.setPk(UUID.randomUUID().toString());
					entityDAO.save(newLowValueItems);
				}
				//单独登记一条入库记录
				LVIStoreRecord lviStoreRecord = new LVIStoreRecord();
				lviStoreRecord.setLviSRCategoryPK(newLowValueItems.getLviCategoryPK());
				lviStoreRecord.setLviSRCount(newLowValueItems.getLviCount());
				SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
				lviStoreRecord.setLviSRDate(df.format(new Date()));
				lviStoreRecord.setLviSRItemManagePK(newLowValueItems.getLviItemManagePK());
				lviStoreRecord.setLviSRMetricUnit(newLowValueItems.getLviMetricUnit());
				lviStoreRecord.setLviSRName(newLowValueItems.getLviName());
				lviStoreRecord.setLviSRDeptCode(deptCode);
				lviStoreRecord.setLviSROrgCode(orgCode);
				lviStoreRecord.setLviSRPerson(updateInfo[2]);
				lviStoreRecord.setLviSRPurchasePK(newLowValueItems.getPk());
				lviStoreRecord.setLviSRRemark("");
				lviStoreRecord.setLviSRSpecification(newLowValueItems.getLviSpecification());
				lviStoreRecord.setLviSRType(newLowValueItems.getLviType());
				lviStoreRecord.setPk(UUID.randomUUID().toString());
				
				//lviStoreRecordDAO.save(lviStoreRecord);
			}
		}
	}

	public LVIStoreRecordDAO getLviStoreRecordDAO() {
		return lviStoreRecordDAO;
	}

	public void setLviStoreRecordDAO(LVIStoreRecordDAO lviStoreRecordDAO) {
		this.lviStoreRecordDAO = lviStoreRecordDAO;
	}
	
	
}
