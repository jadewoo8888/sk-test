package framework.modules.lowvalueitemsmanagement.bo;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
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
import framework.sys.tools.DBOperation;

@LogOperate(menu = "低值易耗品物品采购申请明细")
public class ItemsPurchaseDetailBO extends BOBase<ItemsPurchaseDetailDAO, ItemsPurchaseDetail> {

	private ItemsPurchaseDAO itemsPurchaseDAO;
	private LVIStoreRecordDAO lviStoreRecordDAO;
	private LowValueItemsDAO lowValueItemsDAO;
	
	@MethodID("addItemsPurchaseDetail")
	@LogOperate(operate = "新增物品采购申请明细")
	public void addItemsPurchaseDetail_log_trans(ItemsPurchaseDetail itemsPurchaseDetail) {
		String pk = UUID.randomUUID().toString();
		itemsPurchaseDetail.setPk(pk);
		String[] updateInfo = DBOperation.getUpdateInfo();
		itemsPurchaseDetail.setInsertTime(updateInfo[0]);
		itemsPurchaseDetail.setLastestUpdate(updateInfo[0]);
		itemsPurchaseDetail.setUpdatePerson(updateInfo[2]);
		entityDAO.save(itemsPurchaseDetail);
	}
	
	@MethodID("modifyItemsPurchaseDetail")
	@LogOperate(operate = "修改物品采购申请明细")
	public void modifyItemsPurchaseDetail_log_trans(ItemsPurchaseDetail itemsPurchaseDetail){
		String[] updateInfo = DBOperation.getUpdateInfo();
		itemsPurchaseDetail.setLastestUpdate(updateInfo[0]);
		itemsPurchaseDetail.setUpdatePerson(updateInfo[2]);
		entityDAO.attachDirty(itemsPurchaseDetail);
	}
	
	@MethodID("deleteItemsPurchaseDetail")
	@LogOperate(operate = "删除一条物品采购申请明细")
	public String deleteItemsPurchaseDetail_log_trans(String pk) {
		String return_tips = "";
		entityDAO.delete(entityDAO.findById(pk));
		return return_tips;

	}
	
	@MethodID("approvalApplyCount")
	@LogOperate(operate = "审批物品申购数量")
	public void approveApplyCount_log_trans(List<ItemsPurchaseDetail> itemsPurchaseDetailList){
		for (ItemsPurchaseDetail itemsPurchaseDetail : itemsPurchaseDetailList) {
			ItemsPurchaseDetail dbItemsPurchaseDetail = entityDAO.findById(itemsPurchaseDetail.getPk());
			dbItemsPurchaseDetail.setIpDApproveCount(itemsPurchaseDetail.getIpDApproveCount());
			entityDAO.attachDirty(dbItemsPurchaseDetail);
		}
	}
	
	@MethodID("modifyPurchaseCount")
	@LogOperate(operate = "修改物品采购数量")
	public void modifyPurchaseCount_log_trans(List<ItemsPurchaseDetail> itemsPurchaseDetailList, String ipDItemsPurchasePK){
		
		int ipPurchaseCountSum = 0;//采购数量合计
		
		for (ItemsPurchaseDetail itemsPurchaseDetail : itemsPurchaseDetailList) {
			ItemsPurchaseDetail dbItemsPurchaseDetail = entityDAO.findById(itemsPurchaseDetail.getPk());
			dbItemsPurchaseDetail.setIpDPurchaseCount(itemsPurchaseDetail.getIpDPurchaseCount());
			entityDAO.attachDirty(dbItemsPurchaseDetail);
			ipPurchaseCountSum += dbItemsPurchaseDetail.getIpDPurchaseCount();
		}
		//合计采购数量
		ItemsPurchase itemsPurchase = itemsPurchaseDAO.findById(ipDItemsPurchasePK);
		itemsPurchase.setIpPurchaseCountSum(ipPurchaseCountSum);
		itemsPurchaseDAO.attachDirty(itemsPurchase);
	}
	
	@MethodID("getIpDetailLisByIPPK")
	public List<ItemsPurchaseDetail> getIpDetailLisByIPPK(String ipPk) {
		List<ItemsPurchaseDetail> list = entityDAO.executeFind(ItemsPurchaseDetail.class,"select * from tItemsPurchaseDetail t where t.ipDApplyCount > 0 and t.IPDItemsPurchasePK = ?", ipPk);
		return list;
	}
	
	/**
	 * 
	 * 1、更新tItemsPurchase的入库数量合计
	 * 2、将已入库数量更新为采购数量的值，将单据中状态为“未入库”的物品的状态变更为“已入库”。更新tItemsPurchaseDetail的已入库数量；更新tItemsPurchaseDetail状态标识为“已入库”
	 * 3、增加入库记录tLVIStoreRecord（将分别对每一类物品单独登记一条入库记录；）
	 * 4、插入或者更新LowValueItems的记录。（将库存管理功能中的库存量增加对应的数量。）
	 * @param purchasePk
	 * @param purchaseDetailPk
	 */
	@MethodID("pushOneStore")
	@LogOperate(operate = "单个物品入库")
	public void pushOneStore_log_trans(String itemsPurchaseDetailPk) {
		System.out.println(itemsPurchaseDetailPk);
		
		ItemsPurchaseDetail itemsPurchaseDetail = entityDAO.findById(itemsPurchaseDetailPk);
		
		String[] updateInfo = DBOperation.getUpdateInfo();
		
		//1、将已入库数量更新为采购数量的值，将单据中状态为“未入库”的物品的状态变更为“已入库”
		itemsPurchaseDetail.setIpDStoreCount(itemsPurchaseDetail.getIpDPurchaseCount());
		itemsPurchaseDetail.setIpDCheckFlag("SJZT_01");//已完全入库
		entityDAO.attachDirty(itemsPurchaseDetail);
		//2、更新入库数量合计
		ItemsPurchase itemsPurchase = itemsPurchaseDAO.findById(itemsPurchaseDetail.getIpDItemsPurchasePK());
		itemsPurchase.setIpStoreCountSum(itemsPurchase.getIpStoreCountSum() + itemsPurchaseDetail.getIpDPurchaseCount());
		//3、单独登记一条入库记录
		LVIStoreRecord lviStoreRecord = new LVIStoreRecord();
		lviStoreRecord.setlVISRCategoryPK(itemsPurchase.getIpCategoryPK());
		lviStoreRecord.setlVISRCount(itemsPurchaseDetail.getIpDPurchaseCount());//采购数量=入库数量？
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		lviStoreRecord.setlVISRDate(df.format(new Date()));
		lviStoreRecord.setlVISRItemManagePK(itemsPurchaseDetail.getIpDItemManagePK());
		lviStoreRecord.setlVISRMetricUnit(itemsPurchaseDetail.getIpDMetricUnit());
		lviStoreRecord.setlVISRName(itemsPurchaseDetail.getIpDName());
		lviStoreRecord.setlVISROrgCode(itemsPurchase.getIpOrgCode());
		
		lviStoreRecord.setlVISRPerson(updateInfo[2]);
		lviStoreRecord.setlVISRPurchasePK(itemsPurchase.getPk());
		lviStoreRecord.setlVISRRemark("");
		lviStoreRecord.setlVISRSpecification(itemsPurchaseDetail.getIpDSpecification());
		lviStoreRecord.setlVISRType(itemsPurchaseDetail.getIpDType());
		lviStoreRecord.setPk(UUID.randomUUID().toString());
		
		lviStoreRecord.setInserttime(updateInfo[0]);
		lviStoreRecord.setLastestUpdate(updateInfo[0]);
		lviStoreRecord.setUpdatePerson(updateInfo[2]);
		
		lviStoreRecordDAO.save(lviStoreRecord);
		
		//4、将库存管理功能中的库存量增加对应的数量
		String strSql = "SELECT * FROM tLowValueItems WHERE LVIItemManagePK = ?";
		LowValueItems lowValueItem = lowValueItemsDAO.executeFindEntity(LowValueItems.class, strSql, itemsPurchaseDetail.getIpDItemManagePK());
		if (lowValueItem != null) {
			lowValueItem.setLviCount(lowValueItem.getLviCount() + itemsPurchaseDetail.getIpDPurchaseCount());
			lowValueItemsDAO.attachDirty(lowValueItem);
		} else {
			lowValueItem = new LowValueItems();
			lowValueItem.setInserttime(updateInfo[0]);
			lowValueItem.setLastestUpdate(updateInfo[0]);
			lowValueItem.setUpdatePerson(updateInfo[2]);
			lowValueItem.setLviCategoryPK(itemsPurchase.getIpCategoryPK());
			lowValueItem.setLviCount(itemsPurchaseDetail.getIpDPurchaseCount());
			lowValueItem.setLviItemManagePK(itemsPurchaseDetail.getIpDItemManagePK());
			lowValueItem.setLviMetricUnit(itemsPurchaseDetail.getIpDMetricUnit());
			lowValueItem.setLviName(itemsPurchaseDetail.getIpDName());
			lowValueItem.setLviRemark("");
			lowValueItem.setLviSpecification(itemsPurchaseDetail.getIpDSpecification());
			lowValueItem.setLviType(itemsPurchaseDetail.getIpDType());
			lowValueItem.setPk(UUID.randomUUID().toString());
			lowValueItemsDAO.save(lowValueItem);
		}
	}

	@MethodID("batchPushStore")
	@LogOperate(operate = "批量物品入库")
	public void batchPushStore_log_trans(String[] itemsPurchaseDetailPkArr){
		for (String itemsPurchaseDetailP : itemsPurchaseDetailPkArr) {
			this.pushOneStore_log_trans(itemsPurchaseDetailP);
		}
	}
	
	public ItemsPurchaseDAO getItemsPurchaseDAO() {
		return itemsPurchaseDAO;
	}

	public void setItemsPurchaseDAO(ItemsPurchaseDAO itemsPurchaseDAO) {
		this.itemsPurchaseDAO = itemsPurchaseDAO;
	}

	public LVIStoreRecordDAO getLviStoreRecordDAO() {
		return lviStoreRecordDAO;
	}

	public void setLviStoreRecordDAO(LVIStoreRecordDAO lviStoreRecordDAO) {
		this.lviStoreRecordDAO = lviStoreRecordDAO;
	}

	public LowValueItemsDAO getLowValueItemsDAO() {
		return lowValueItemsDAO;
	}

	public void setLowValueItemsDAO(LowValueItemsDAO lowValueItemsDAO) {
		this.lowValueItemsDAO = lowValueItemsDAO;
	}
	
}

