package framework.modules.lowvalueitemsmanagement.bo;

import java.util.List;
import java.util.UUID;

import framework.modules.lowvalueitemsmanagement.dao.CategoryManagementDAO;
import framework.modules.lowvalueitemsmanagement.dao.ItemManageDAO;
import framework.modules.lowvalueitemsmanagement.domain.CategoryManagement;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;
import framework.sys.tools.DBOperation;

@LogOperate(menu = "低值易耗品类目管理")
public class CategoryManagementBO extends BOBase<CategoryManagementDAO, CategoryManagement>{

	private ItemManageDAO itemManageDAO;
	
	@MethodID("addCategory")
	@LogOperate(operate = "新增类目")
	public String addCategory_log_trans(CategoryManagement categoryManagement) {
		boolean flag = entityDAO.executeFindExists("select 1 from tCategoryManagement where categoryName = ?", categoryManagement.getCategoryName());
		if (flag) {
			return "类目名称已经存在，请重新输入";
		}
		String pk = UUID.randomUUID().toString();
		categoryManagement.setPk(pk);
		String[] updateInfo = DBOperation.getUpdateInfo();
		categoryManagement.setInsertTime(updateInfo[0]);
		categoryManagement.setLastestUpdate(updateInfo[0]);
		categoryManagement.setUpdatePerson(updateInfo[2]);
		entityDAO.save(categoryManagement);
		
		return "";
	}
	
	@MethodID("modifyCategory")
	@LogOperate(operate = "修改类目")
	public void modifyCategory_log_trans(CategoryManagement categoryManagement){
		String[] updateInfo = DBOperation.getUpdateInfo();
		categoryManagement.setLastestUpdate(updateInfo[0]);
		categoryManagement.setUpdatePerson(updateInfo[2]);
		entityDAO.attachDirty(categoryManagement);
	}
	
	@MethodID("deleteCategory")
	@LogOperate(operate = "删除一条类目")
	public String deleteCategory_log_trans(String pk) {
		boolean isExistItem = itemManageDAO.executeFindExists("select 1 from titemManage where imCategoryPK=?", pk);
		if (isExistItem) {
			return "类目在物品管理表中有记录时，不允许删除";
		}
		entityDAO.delete(entityDAO.findById(pk));
		return "";
	}
	@MethodID("findCategoryByGroupCode")
	public List<CategoryManagement> findCategoryByGroupCode(String groupCode) {
		 String strSql = "select * from tCategoryManagement where groupCode = ? or groupCode is null";
	     List<CategoryManagement> list = entityDAO.executeFind(CategoryManagement.class , strSql ,groupCode);
		return list;
	}
	/*
	@MethodID("deleteCategorys")
	@LogOperate(operate = "删除多条类目")
	public void deleteCategorys_log_trans(String[] pkArr) {
		if (pkArr == null || pkArr.length == 0) {
			return;
		}
		*//** 第一步：遍历删除类目信息，更新对应的物业单元业务状态 * *//*
		for (int j = 0; j < pkArr.length; j++) {
			CategoryManagement categoryManagement = entityDAO.findById(pkArr[j]);
			// 更新单元定义表中的业务状态 未申请
			entityDAO.delete(categoryManagement);
		}

		*//** 第二步：删除类目对应的各种信息 * *//*
	}*/

	public ItemManageDAO getItemManageDAO() {
		return itemManageDAO;
	}

	public void setItemManageDAO(ItemManageDAO itemManageDAO) {
		this.itemManageDAO = itemManageDAO;
	}
	
}
