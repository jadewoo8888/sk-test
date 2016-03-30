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
		entityDAO.save(itemsPurchaseDetail);
	}
	
	@MethodID("modifyItemsPurchaseDetail")
	@LogOperate(operate = "修改物品采购申请明细")
	public void modifyItemsPurchaseDetail_log_trans(ItemsPurchaseDetail itemsPurchaseDetail){
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
		
		int ipPurchaseCountSum = 0;//采购数量合计值
		
		for (ItemsPurchaseDetail itemsPurchaseDetail : itemsPurchaseDetailList) {
			ItemsPurchaseDetail dbItemsPurchaseDetail = entityDAO.findById(itemsPurchaseDetail.getPk());
			dbItemsPurchaseDetail.setIpDPurchaseCount(itemsPurchaseDetail.getIpDPurchaseCount());
			entityDAO.attachDirty(dbItemsPurchaseDetail);
			ipPurchaseCountSum += itemsPurchaseDetail.getIpDPurchaseCount() - dbItemsPurchaseDetail.getIpDPurchaseCount();//采购数量合计
		}
		//更新物品申请单的合计采购数量
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
	 * 单个固定资产物品入库（与单个低值品物品入库功能类似，只是需求不是很明确，故分开来写）
	 * @param itemsPurchaseDetailPk
	 * @param assetCount
	 */
	@MethodID("pushOneAssetStore")
	@LogOperate(operate = "单个固定资产物品入库")
	public void pushOneAssetStore_log_trans(String itemsPurchaseDetailPk, int assetCount) {
		
		ItemsPurchaseDetail itemsPurchaseDetail = entityDAO.findById(itemsPurchaseDetailPk);
		
		ItemsPurchase itemsPurchase = itemsPurchaseDAO.findById(itemsPurchaseDetail.getIpDItemsPurchasePK());
				
		//1、保存到入库登记的未对账标签下，在数据库中保存对应的申购单号。（该步骤由固定资产入库登记页面完成）
		
		//2、将已入库数量更新为登记的固定资产数量(累加)
		int newIpStoreCountSum = itemsPurchase.getIpStoreCountSum() + assetCount;
		itemsPurchase.setIpStoreCountSum(newIpStoreCountSum);
		itemsPurchaseDAO.attachDirty(itemsPurchase);
		
		//3、更新后的已入库数量等于采购数量时，物品的状态变更为“已入库”。
		itemsPurchaseDetail.setIpDStoreCount(assetCount);
		if (assetCount == itemsPurchaseDetail.getIpDPurchaseCount()) {
			itemsPurchaseDetail.setIpDCheckFlag("SJZT_01");//已完全入库
		}
		entityDAO.attachDirty(itemsPurchaseDetail);
		
		//4、如通过物品发放功能生成的申购单，整张单的全部物品入库后要将申领单的状态改为待发放。
		//采购数量=入库数量,则表示完全入库
		String ipItemsApplyPK = itemsPurchase.getIpItemsApplyPK();
		if(ipItemsApplyPK != null && !ipItemsApplyPK.equals("") && itemsPurchase.getIpPurchaseCountSum() == itemsPurchase.getIpStoreCountSum()) {
			String updateIAMSql = "update tItemsApplyManagement t set t.IAMCheckFlag='FSCCQWPFS_002' where t.pk=? ";//FSCCQWPFS_002待发放
			entityDAO.executeSql(updateIAMSql, "");
		}
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
	@LogOperate(operate = "单个低值品物品入库")
	public void pushOneStore_log_trans(String itemsPurchaseDetailPk) {
		
		ItemsPurchaseDetail itemsPurchaseDetail = entityDAO.findById(itemsPurchaseDetailPk);
		
		String[] updateInfo = DBOperation.getUpdateInfo();
		
		//1、将已入库数量更新为采购数量的值，将单据中状态为“未入库”的物品的状态变更为“已入库”
		itemsPurchaseDetail.setIpDStoreCount(itemsPurchaseDetail.getIpDPurchaseCount());
		itemsPurchaseDetail.setIpDCheckFlag("SJZT_01");//已完全入库
		entityDAO.attachDirty(itemsPurchaseDetail);
		//2、更新入库数量合计
		ItemsPurchase itemsPurchase = itemsPurchaseDAO.findById(itemsPurchaseDetail.getIpDItemsPurchasePK());
		itemsPurchase.setIpStoreCountSum(itemsPurchase.getIpStoreCountSum() + itemsPurchaseDetail.getIpDPurchaseCount());
		itemsPurchaseDAO.attachDirty(itemsPurchase);
		//3、单独登记一条入库记录
		LVIStoreRecord lviStoreRecord = new LVIStoreRecord();
		lviStoreRecord.setLviSRCategoryPK(itemsPurchase.getIpCategoryPK());
		lviStoreRecord.setLviSRCount(itemsPurchaseDetail.getIpDPurchaseCount());//采购数量=入库数量？
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		lviStoreRecord.setLviSRDate(df.format(new Date()));
		lviStoreRecord.setLviSRItemManagePK(itemsPurchaseDetail.getIpDItemManagePK());
		lviStoreRecord.setLviSRMetricUnit(itemsPurchaseDetail.getIpDMetricUnit());
		lviStoreRecord.setLviSRName(itemsPurchaseDetail.getIpDName());
		lviStoreRecord.setLviSROrgCode(itemsPurchase.getIpOrgCode());
		
		lviStoreRecord.setLviSRPerson(updateInfo[2]);
		lviStoreRecord.setLviSRPurchasePK(itemsPurchase.getPk());
		lviStoreRecord.setLviSRRemark("");
		lviStoreRecord.setLviSRSpecification(itemsPurchaseDetail.getIpDSpecification());
		lviStoreRecord.setLviSRType(itemsPurchaseDetail.getIpDType());
		lviStoreRecord.setPk(UUID.randomUUID().toString());
		
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
		//5、如通过物品发放功能生成的申购单，整张单的全部物品入库后要将申领单的状态改为待发放。
		//采购数量=入库数量,则表示完全入库
		String ipItemsApplyPK = itemsPurchase.getIpItemsApplyPK();
		if(ipItemsApplyPK != null && !ipItemsApplyPK.equals("") && itemsPurchase.getIpPurchaseCountSum() == itemsPurchase.getIpStoreCountSum()) {
			String updateIAMSql = "update tItemsApplyManagement t set t.IAMCheckFlag='FSCCQWPFS_002' where t.pk=? ";//FSCCQWPFS_002待发放
			entityDAO.executeSql(updateIAMSql, "");
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

