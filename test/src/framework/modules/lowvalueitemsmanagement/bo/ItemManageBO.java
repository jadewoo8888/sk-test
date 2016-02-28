package framework.modules.lowvalueitemsmanagement.bo;

import java.util.UUID;

import framework.modules.lowvalueitemsmanagement.dao.ItemManageDAO;
import framework.modules.lowvalueitemsmanagement.dao.ItemsApplyMDetailDAO;
import framework.modules.lowvalueitemsmanagement.dao.ItemsPurchaseDetailDAO;
import framework.modules.lowvalueitemsmanagement.dao.LVIStoreRecordDAO;
import framework.modules.lowvalueitemsmanagement.domain.ItemManage;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;
import framework.sys.tools.DBOperation;

@LogOperate(menu = "低值易耗品物品管理")
public class ItemManageBO extends BOBase<ItemManageDAO, ItemManage> {

	private ItemsApplyMDetailDAO itemsApplyMDetailDAO;
	private ItemsPurchaseDetailDAO itemsPurchaseDetailDAO;
	private LVIStoreRecordDAO lviStoreRecordDAO;

	@MethodID("addItem")
	@LogOperate(operate = "新增物品")
	public String addItem_log_trans(ItemManage itemManage) {
		boolean flag = entityDAO.executeFindExists("select 1 from tItemManage where imName = ?", itemManage.getImName());
		if (flag) {
			return "物品名称已经存在，请重新输入";
		}
		
		String pk = UUID.randomUUID().toString();
		itemManage.setPk(pk);
		String[] updateInfo = DBOperation.getUpdateInfo();
		itemManage.setInsertTime(updateInfo[0]);
		itemManage.setLastestUpdate(updateInfo[0]);
		itemManage.setUpdatePerson(updateInfo[2]);
		entityDAO.save(itemManage);
		return "";
	}

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
	public String deleteItem_log_trans(String pk) {
		// 对应物品存在物品申领单或物品采购单、低值品入库记录时不允许删除
		
		boolean flag = itemsApplyMDetailDAO.executeFindExists("select * from tItemsApplyMDetail where ItemManagePK = ?", pk);
		if (flag) {
			return "该物品已经被申领，不能删除！";
		}
		
		flag = itemsPurchaseDetailDAO.executeFindExists("select * from tItemsPurchaseDetail where IPDItemManagePK = ?", pk);
		if (flag) {
			return "该物品已经被采购，不能删除！";
		}
		
		flag = lviStoreRecordDAO.executeFindExists("select * from tLVIStoreRecord where LVISRItemManagePK = ?", pk);
		if (flag) {
			return "该物品已经入库，不能删除！";
		}
		
		entityDAO.delete(entityDAO.findById(pk));
		
		return "";

	}

	/*
	 * @MethodID("deleteItems")
	 * 
	 * @LogOperate(operate = "删除物品") public void deleteItems_log_trans(String[]
	 * pkArr) { if (pkArr == null || pkArr.length == 0) { return; }
	 *//** 第一步：遍历删除类目信息，更新对应的物业单元业务状态 * */

	/*
	 * for (int j = 0; j < pkArr.length; j++) { ItemManage itemManage =
	 * entityDAO.findById(pkArr[j]); // 更新单元定义表中的业务状态 未申请
	 * entityDAO.delete(itemManage); }
	 * 
	 *//** 第二步：删除类目对应的各种信息 * *//*
								 * }
								 */

	public ItemsApplyMDetailDAO getItemsApplyMDetailDAO() {
		return itemsApplyMDetailDAO;
	}

	public void setItemsApplyMDetailDAO(ItemsApplyMDetailDAO itemsApplyMDetailDAO) {
		this.itemsApplyMDetailDAO = itemsApplyMDetailDAO;
	}

	public ItemsPurchaseDetailDAO getItemsPurchaseDetailDAO() {
		return itemsPurchaseDetailDAO;
	}

	public void setItemsPurchaseDetailDAO(ItemsPurchaseDetailDAO itemsPurchaseDetailDAO) {
		this.itemsPurchaseDetailDAO = itemsPurchaseDetailDAO;
	}

	public LVIStoreRecordDAO getLviStoreRecordDAO() {
		return lviStoreRecordDAO;
	}

	public void setLviStoreRecordDAO(LVIStoreRecordDAO lviStoreRecordDAO) {
		this.lviStoreRecordDAO = lviStoreRecordDAO;
	}

}
