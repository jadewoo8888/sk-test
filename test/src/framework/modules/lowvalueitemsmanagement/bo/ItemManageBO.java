package framework.modules.lowvalueitemsmanagement.bo;

import java.util.UUID;

import framework.modules.lowvalueitemsmanagement.dao.ItemManageDAO;
import framework.modules.lowvalueitemsmanagement.domain.ItemManage;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;
import framework.sys.log.LogOperateManager;
import framework.sys.tools.DBOperation;

@LogOperate(menu = "低值易耗品物品管理")
public class ItemManageBO extends BOBase<ItemManageDAO, ItemManage> {

	/*private ItemsApplyMDetailDAO itemsApplyMDetailDAO;
	private ItemsPurchaseDetailDAO itemsPurchaseDetailDAO;
	private LVIStoreRecordDAO lviStoreRecordDAO;*/

	@MethodID("addItem")
	@LogOperate(operate = "新增物品")
	public String addItem_log_trans(ItemManage itemManage) {
		String return_tips = "";
		boolean existItemName = entityDAO.executeFindExists("select 1 from tItemManage where imName = ?", itemManage.getImName());
		if (existItemName) {
			LogOperateManager.unlog();
			return_tips = "物品名称已经存在，请重新输入";
		} else {
			String pk = UUID.randomUUID().toString();
			itemManage.setPk(pk);
			entityDAO.save(itemManage);
		}
		return return_tips;
	}

	@MethodID("modifyItem")
	@LogOperate(operate = "修改物品")
	public void modifyItem_log_trans(ItemManage itemManage) {
		entityDAO.attachDirty(itemManage);
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
		
		entityDAO.delete(entityDAO.findById(pk));
		
		return "";

	}

}
