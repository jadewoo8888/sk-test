package framework.modules.lowvalueitemsmanagement.bo;

import java.util.UUID;

import framework.modules.lowvalueitemsmanagement.dao.CategoryManagementDAO;
import framework.modules.lowvalueitemsmanagement.domain.CategoryManagement;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;
import framework.sys.tools.DBOperation;

@LogOperate(menu = "低值易耗品类目管理")
public class CategoryManagementBO extends BOBase<CategoryManagementDAO, CategoryManagement>{

	@MethodID("addCategoryManagement")
	@LogOperate(operate = "新增类目")
	public void addTest_log_trans(CategoryManagement categoryManagement) {
		String pk = UUID.randomUUID().toString();
		categoryManagement.setPk(pk);
		String[] updateInfo = DBOperation.getUpdateInfo();
		categoryManagement.setInsertTime(updateInfo[0]);
		categoryManagement.setLastestUpdate(updateInfo[0]);
		categoryManagement.setUpdatePerson(updateInfo[2]);
		entityDAO.save(categoryManagement);
	}
	
	@MethodID("modifyCategoryManagement")
	@LogOperate(operate = "修改类目")
	public void modifyTest_log_trans(CategoryManagement categoryManagement){
		String[] updateInfo = DBOperation.getUpdateInfo();
		categoryManagement.setLastestUpdate(updateInfo[0]);
		categoryManagement.setUpdatePerson(updateInfo[2]);
		entityDAO.attachDirty(categoryManagement);
	}
	
	@MethodID("deleteCategoryManagement")
	@LogOperate(operate = "删除类目")
	public void deleteCategoryManagement_log_trans(String[] pkArr) {
		if (pkArr == null || pkArr.length == 0) {
			return;
		}
		/** 第一步：遍历删除类目信息，更新对应的物业单元业务状态 * */
		for (int j = 0; j < pkArr.length; j++) {
			CategoryManagement categoryManagement = entityDAO.findById(pkArr[j]);
			// 更新单元定义表中的业务状态 未申请
			entityDAO.delete(categoryManagement);
		}

		/** 第二步：删除类目对应的各种信息 * */
	}
	
}
