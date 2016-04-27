package framework.modules.lowvalueitemsmanagement.bo;


import framework.modules.lowvalueitemsmanagement.dao.ItemManageDAO;
import framework.modules.lowvalueitemsmanagement.domain.ItemManage;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;
import framework.sys.log.LogOperateManager;

@LogOperate(menu = "低值易耗品物品管理")
public class ItemManageBO extends BOBase<ItemManageDAO, ItemManage> {

	@MethodID("addItem")
	@LogOperate(operate = "新增物品")
	public String addItem_log_trans(ItemManage itemManage) {
		String return_tips = "";
		boolean existItemName = entityDAO.executeFindExists("select 1 from tItemManage where imName = ?", itemManage.getImName());
		if (existItemName) {
			LogOperateManager.unlog();
			return_tips = "物品名称已经存在，请重新输入";
		} else {
			entityDAO.save(itemManage);
		}
		return return_tips;
	}

	@MethodID("modifyItem")
	@LogOperate(operate = "修改物品")
	public String modifyItem_log_trans(ItemManage itemManage) {
		
		boolean flag = entityDAO.executeFindExists("select 1 from tItemManage where imName = ? and pk != ?", itemManage.getImName(),itemManage.getPk());
		if (flag) {
			LogOperateManager.unlog();
			return "物品名称已经存在，请重新输入";
		}
		
		//更新物品管理表
		entityDAO.attachDirty(itemManage);
		
		String categoryPK = itemManage.getImCategoryPK();
		String imName = itemManage.getImName();
		String type = itemManage.getImType();
		String specification = itemManage.getImSpecification();
		String metricUnit = itemManage.getImMetricUnit();
		String imPk = itemManage.getPk();
		
		//更新低值品仓库管理
		String lviUpdSql = "update tLowValueItems t set t.LVICategoryPK = ?, t.LVIName = ? ,t.LVIType = ?, t.LVISpecification = ?,t.LVIMetricUnit = ? where t.LVIItemManagePK = ?";
		entityDAO.executeSql(lviUpdSql, categoryPK, imName, type, specification, metricUnit, imPk);
		//更新出库记录
		String popUpdSql = "update tLVIPopRecord t set t.LVIPRCategoryPK = ?, t.LVIPRName = ? ,t.LVIPRType = ?, t.LVIPRSpecification = ?,t.LVIPRMetricUnit = ? where t.LVIPRItemManagePK = ?";
		entityDAO.executeSql(popUpdSql, categoryPK, imName, type, specification, metricUnit, imPk);
		//更新入库记录
		String istUpdSql = "update tLVIStoreRecord t set t.LVISRCategoryPK = ?, t.LVISRName = ? ,t.LVISRType = ?, t.LVISRSpecification = ?,t.LVISRMetricUnit = ? where t.LVISRItemManagePK = ?";
		entityDAO.executeSql(istUpdSql, categoryPK, imName, type, specification, metricUnit, imPk);
		//更新申领明细
		String iamdUpdSql = "update tItemsApplyMDetail t set t.CategoryManagementPK = ?, t.IMName = ? ,t.IMAssetType = ?,t.IMType = ?, t.IMSpecification = ?,t.IMMetricUnit = ? where t.ItemManagePK = ?";
		String imAssetType = itemManage.getImAssetType();
		entityDAO.executeSql(iamdUpdSql, categoryPK, imName, imAssetType, type, specification, metricUnit, imPk);
		//更新采购明细
		String ipUpdSql = "update tItemsPurchaseDetail t set t.IPDName = ? ,t.IPDType = ?, t.IPDSpecification = ?,t.IPDMetricUnit = ? where t.IPDItemManagePK = ?";
		entityDAO.executeSql(ipUpdSql, imName, type, specification, metricUnit, imPk);
		
		return "";
		
	}

	@MethodID("deleteItem")
	@LogOperate(operate = "删除一条物品")
	public String deleteItem_log_trans(String pk) {
		// 对应物品存在物品申领单或物品采购单、低值品入库记录时不允许删除
		boolean existAppllyList = entityDAO.executeFindExists("select 1 from tItemsApplyMDetail where ItemManagePK = ?", pk);
		if (existAppllyList) {
			LogOperateManager.unlog();
			return "该物品已经被申领，不能删除！";
		}
		
		boolean existPurchase = entityDAO.executeFindExists("select 1 from tItemsPurchaseDetail where IPDItemManagePK = ?", pk);
		if (existPurchase) {
			LogOperateManager.unlog();
			return "该物品已经被采购，不能删除！";
		}
		
		boolean existStore = entityDAO.executeFindExists("select 1 from tLVIStoreRecord where LVISRItemManagePK = ?", pk);
		if (existStore) {
			LogOperateManager.unlog();
			return "该物品已经入库，不能删除！";
		}
		
		entityDAO.executeSql("delete from tItemManage t where t.pk = ?",pk);
		
		return "";

	}

}
