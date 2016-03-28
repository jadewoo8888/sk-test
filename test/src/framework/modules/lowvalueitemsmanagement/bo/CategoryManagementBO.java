package framework.modules.lowvalueitemsmanagement.bo;

import java.util.List;
import java.util.UUID;

import framework.modules.lowvalueitemsmanagement.dao.CategoryManagementDAO;
import framework.modules.lowvalueitemsmanagement.dao.ItemManageDAO;
import framework.modules.lowvalueitemsmanagement.domain.CategoryManagement;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;
import framework.sys.log.LogOperateManager;

@LogOperate(menu = "低值易耗品类目管理")
public class CategoryManagementBO extends BOBase<CategoryManagementDAO, CategoryManagement>{

	private ItemManageDAO itemManageDAO;
	
	@MethodID("addCategory")
	@LogOperate(operate = "新增类目")
	public String addCategory_log_trans(CategoryManagement categoryManagement) {
		boolean flag = entityDAO.executeFindExists("select 1 from tCategoryManagement where categoryName = ?", categoryManagement.getCategoryName());
		if (flag) {
			LogOperateManager.unlog();
			return "类目名称已经存在，请重新输入";
		}
		String pk = UUID.randomUUID().toString();
		categoryManagement.setPk(pk);
		entityDAO.save(categoryManagement);
		
		return "";
	}
	
	@MethodID("modifyCategory")
	@LogOperate(operate = "修改类目")
	public String modifyCategory_log_trans(CategoryManagement categoryManagement){
		if (categoryManagement.isEditName()) {
			boolean flag = entityDAO.executeFindExists("select 1 from tCategoryManagement where categoryName = ?", categoryManagement.getCategoryName());
			if (flag) {
				LogOperateManager.unlog();
				return "类目名称已经存在，请重新输入";
			}
		}
		entityDAO.attachDirty(categoryManagement);
		
		return "";
	}
	
	@MethodID("deleteCategory")
	@LogOperate(operate = "删除一条类目")
	public String deleteCategory_log_trans(String pk) {
		boolean isExistItem = itemManageDAO.executeFindExists("select 1 from titemManage where imCategoryPK=?", pk);
		if (isExistItem) {
			LogOperateManager.unlog();
			return "类目在物品管理表中有记录时，不允许删除";
		}
		entityDAO.delete(entityDAO.findById(pk));
		return "";
	}
	/**
	 * 找出没角色组和相应角色组的类目
	 * （应用不填适用角色组时代表所有组都适用，填写了则只对于相应组的用户才能显示对应的类目）
	 * @param groupCode 编号
	 * @return
	 */
	@MethodID("findCategoryByGroupCode")
	public List<CategoryManagement> findCategoryByGroupCode(String groupCode) {
		 String strSql = "select * from tCategoryManagement where groupCode = ? or groupCode is null";
	     List<CategoryManagement> list = entityDAO.executeFind(CategoryManagement.class , strSql ,groupCode);
		return list;
	}

	public ItemManageDAO getItemManageDAO() {
		return itemManageDAO;
	}

	public void setItemManageDAO(ItemManageDAO itemManageDAO) {
		this.itemManageDAO = itemManageDAO;
	}
	
}
