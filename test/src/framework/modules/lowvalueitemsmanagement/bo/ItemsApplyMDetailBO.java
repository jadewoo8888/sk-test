package framework.modules.lowvalueitemsmanagement.bo;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import framework.core.sql.QueryCondition;
import framework.core.sql.QueryConditionAssembler;
import framework.modules.lowvalueitemsmanagement.dao.ItemsApplyMDetailDAO;
import framework.modules.lowvalueitemsmanagement.dao.ItemsApplyManagementDAO;
import framework.modules.lowvalueitemsmanagement.dao.LVIPopRecordDAO;
import framework.modules.lowvalueitemsmanagement.dao.LowValueItemsDAO;
import framework.modules.lowvalueitemsmanagement.domain.ItemManage;
import framework.modules.lowvalueitemsmanagement.domain.ItemsApplyMDetail;
import framework.modules.lowvalueitemsmanagement.domain.ItemsApplyManagement;
import framework.modules.lowvalueitemsmanagement.domain.LVIPopRecord;
import framework.modules.lowvalueitemsmanagement.domain.LowValueItems;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.basemodule.bo.ListForPageBean;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.foreignkeytranslation.FKOper;
import framework.sys.log.LogOperate;
import framework.sys.tools.DBOperation;

@LogOperate(menu = "低值易耗品物品申领管理明细")
public class ItemsApplyMDetailBO extends BOBase<ItemsApplyMDetailDAO, ItemsApplyMDetail> {

	private LowValueItemsDAO lowValueItemsDAO;
	private LVIPopRecordDAO lviPopRecordDAO;
	private ItemsApplyManagementDAO itemsApplyManagementDAO;
	
	@MethodID("addItemsApplyMDetail")
	@LogOperate(operate = "新增物品申领明细")
	public void addItemsApplyMDetail_log_trans(ItemsApplyMDetail itemsApplyMDetail) {
		String pk = UUID.randomUUID().toString();
		itemsApplyMDetail.setPk(pk);
		entityDAO.save(itemsApplyMDetail);
	}
	
	@MethodID("modifyItemsApplyMDetail")
	@LogOperate(operate = "修改物品申领明细")
	public void modifyItemsApplyMDetail_log_trans(ItemsApplyMDetail itemsApplyMDetail){
		entityDAO.attachDirty(itemsApplyMDetail);
	}
	
	@MethodID("deleteItemsApplyMDetail")
	@LogOperate(operate = "删除一条物品申领明细")
	public String deleteItemsApplyMDetail_log_trans(String pk) {
		String return_tips = "";
		entityDAO.delete(entityDAO.findById(pk));
		return return_tips;

	}
	
	/**
	 * 审批物品申领明细，设置审批数量
	 * @param itemsApplyMDetailList 物品申领明细列表
	 * @param roleType 审批角色值  2：审核人，3：核准人
	 */
	@MethodID("approvalItemMDtailCount")
	@LogOperate(operate = "审批物品申领明细")
	public void approvalItemMDtailCount_log_trans(List<ItemsApplyMDetail> itemsApplyMDetailList, int roleType){
		//设置审批数量
		if (roleType == 2 || roleType == 3) {//2：审核人，3：核准人
			for (ItemsApplyMDetail itemsApplyMDetail : itemsApplyMDetailList) {
				ItemsApplyMDetail dbItemsApplyMDetail = entityDAO.findById(itemsApplyMDetail.getPk());
				if (roleType == 2) {//如果审批角色是审核人
					dbItemsApplyMDetail.setIamListerCheckCount(itemsApplyMDetail.getIamListerCheckCount());//设置经办人审核数量
				} else if (roleType == 3) {//如果审批角色是核准人
					dbItemsApplyMDetail.setIamLeaderCheckCount(itemsApplyMDetail.getIamLeaderCheckCount());//设置行装科领导审核数量
				}
				entityDAO.attachDirty(dbItemsApplyMDetail);
			}
		}
	}
	
	@MethodID("getListForPage")
	public ListForPageBean getListForPage(final int pageNumber, final int pageSize,
			final List<QueryCondition> queryCond, final String sortCond) {
		ListForPageBean listForPageBean = new ListForPageBean();
		QueryConditionAssembler assembler = getQueryConditionAssembler(queryCond, sortCond);
		int totalCount = entityDAO.getTotalCountForPage(assembler);
		List<ItemsApplyMDetail> rowList = null;
		if (totalCount > 0) {
			rowList = entityDAO.getListForPage(" * ", pageNumber, pageSize, assembler);
		}
		if (rowList != null) {
			/**遍历申领明细，给每个申领明细库存赋值**/
			for (ItemsApplyMDetail itemsApplyMDetail : rowList) {//给库存赋值
				ItemManage itemManage = entityDAO.executeFindEntity(ItemManage.class,"select * from tItemManage where pk = ?",itemsApplyMDetail.getItemManagePK());
				if (itemManage != null) {
					String imType = itemManage.getImType();
					if (imType.equals("WPLB_002")) {//固定资产：从入库登记功能中读取该物品对应的所有固定资产分类代码中，使用人为空的数量之和。
						String imAssetType = itemManage.getImAssetType();
						String atStoreSql = "SELECT SUM(assetRegAssetCurCount) FROM tAssetRegist WHERE (assetRegUserId IS NULL OR assetRegUserId='') AND (assetRegUser IS NULL OR assetRegUser='')  AND assetRegAssetType like ? AND assetRegEnprCode = ?  AND assetRegCheckFlag='SJZT_01'";
						System.out.println("imAssetType:"+imAssetType);
						System.out.println("OrgCode:"+itemsApplyMDetail.getOrgCode());
						System.out.println("atStoreSql:"+atStoreSql);
						BigDecimal storeCount = (BigDecimal)entityDAO.executeFindUnique(atStoreSql, imAssetType+"%",itemsApplyMDetail.getOrgCode());
						//BigDecimal storeCount = (BigDecimal) entityDAO.executeFindUnique(atStoreSql, "001006001003","001502004001");
						itemsApplyMDetail.setItemStoreCount(storeCount == null ? 0 : Integer.parseInt(storeCount+""));
					} else {//低值品：从低值品仓库管理中读取
						LowValueItems lowValueItems = lowValueItemsDAO.executeFindEntity(LowValueItems.class,
								"select * from tLowValueItems where LVIItemManagePK = ?",
								itemsApplyMDetail.getItemManagePK());
						if (lowValueItems != null) {// 设置库存
							itemsApplyMDetail.setItemStoreCount(lowValueItems.getLviCount());
						}
					}	
				}
			}
		}
		listForPageBean.setTotal(totalCount);
		FKOper.getInstance().setDisplay(rowList);
		listForPageBean.setRows(rowList);
		return listForPageBean;

	}
	
	/**
	 * 发放物品
	 * @param itemsApplyMDetailPkArr 申领明细pk
	 */
	@MethodID("issueItems")
	@LogOperate(operate = "发放物品")
	public void issueItems_log_trans(String itemsApplyMPK, String[] itemsApplyMDetailPkArr) {
		for (String itemsApplyMDetailPk : itemsApplyMDetailPkArr) {
			ItemsApplyMDetail itemsApplyMDetail = entityDAO.findById(itemsApplyMDetailPk);
			//第一步：修改低值品仓库管理对应物品的库存（减少的库存量等于行装科领导审核通过的数量）
			LowValueItems lowValueItems = lowValueItemsDAO.executeFindEntity(LowValueItems.class, "select * from tLowValueItems where LVIItemManagePK = ?", itemsApplyMDetail.getItemManagePK());
			lowValueItems.setLviCount(lowValueItems.getLviCount() - itemsApplyMDetail.getIamLeaderCheckCount());
			lowValueItemsDAO.attachDirty(lowValueItems);
			//第二步：发放成功后，将申领单状态变更为“已发放”，更新发放人和发放日期
			ItemsApplyManagement itemsApplyManagement = itemsApplyManagementDAO.executeFindEntity(ItemsApplyManagement.class, "select * from tItemsApplyManagement where pk = ?", itemsApplyMDetail.getItemsApplyMPK());
			itemsApplyManagement.setIamCheckFlag("FSCCQWPFS_004"); 
			
			String[] updateInfo = DBOperation.getUpdateInfo();
			itemsApplyManagement.setItemsIssueLister(updateInfo[2]);
			SimpleDateFormat sFormat = new SimpleDateFormat("yyyy-MM-dd");
			String now = sFormat.format(new Date());
			itemsApplyManagement.setItemsIssueDate(now);
			itemsApplyManagementDAO.attachDirty(itemsApplyManagement); 
			
			//第三步：每个物品新增一条出库记录（发放数量等于行装科领导审核通过的数量）
			LVIPopRecord lviPopRecord = new LVIPopRecord();
			lviPopRecord.setLviPRApplyPerson(itemsApplyManagement.getApplyPerson());
			lviPopRecord.setLviPRCategoryPK(itemsApplyManagement.getCategoryManagementPK());
			lviPopRecord.setLviPRCount(itemsApplyMDetail.getIamLeaderCheckCount());
			lviPopRecord.setLviPRDate(now);
			lviPopRecord.setLviPRItemManagePK(itemsApplyMDetail.getIamItemManagePK());
			lviPopRecord.setLviPRMetricUnit(itemsApplyMDetail.getImMetricUnit());
			lviPopRecord.setLviPRName(itemsApplyMDetail.getImName());
			lviPopRecord.setLviPRPerson(updateInfo[2]);
			lviPopRecord.setLviPRRemark("");
			lviPopRecord.setLviPRSpecification(itemsApplyMDetail.getImSpecification());
			lviPopRecord.setLviPRType(itemsApplyMDetail.getImType());
			lviPopRecord.setPk(UUID.randomUUID().toString());
			lviPopRecordDAO.save(lviPopRecord);
		}
		
		//清除申购数量为0的申购明细，目的是清除没用的数据。这些数据的存在是在新建和修改申购明细的时候，批量增加的。/
		String delApplyItemsSql = "delete from titemsApplyMDetail t where t.IAMApplyCount=0 and t.itemsapplympk=?";
		entityDAO.executeSql(delApplyItemsSql, itemsApplyMPK);
		
	}

	
	public LowValueItemsDAO getLowValueItemsDAO() {
		return lowValueItemsDAO;
	}

	public void setLowValueItemsDAO(LowValueItemsDAO lowValueItemsDAO) {
		this.lowValueItemsDAO = lowValueItemsDAO;
	}

	public LVIPopRecordDAO getLviPopRecordDAO() {
		return lviPopRecordDAO;
	}

	public void setLviPopRecordDAO(LVIPopRecordDAO lviPopRecordDAO) {
		this.lviPopRecordDAO = lviPopRecordDAO;
	}

	public ItemsApplyManagementDAO getItemsApplyManagementDAO() {
		return itemsApplyManagementDAO;
	}

	public void setItemsApplyManagementDAO(ItemsApplyManagementDAO itemsApplyManagementDAO) {
		this.itemsApplyManagementDAO = itemsApplyManagementDAO;
	}

	
}
