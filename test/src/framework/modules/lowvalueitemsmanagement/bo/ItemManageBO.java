package framework.modules.lowvalueitemsmanagement.bo;

import java.util.UUID;

import framework.modules.lowvalueitemsmanagement.dao.ItemManageDAO;
import framework.modules.lowvalueitemsmanagement.domain.ItemManage;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;
import framework.sys.tools.DBOperation;

@LogOperate(menu = "低值易耗品物品管理")
public class ItemManageBO extends BOBase<ItemManageDAO, ItemManage>{

			@MethodID("addItem")
			@LogOperate(operate = "新增物品")
			public void addItem_log_trans(ItemManage itemManage) {
				String pk = UUID.randomUUID().toString();
				itemManage.setPk(pk);
				String[] updateInfo = DBOperation.getUpdateInfo();
				itemManage.setInsertTime(updateInfo[0]);
				itemManage.setLastestUpdate(updateInfo[0]);
				itemManage.setUpdatePerson(updateInfo[2]);
				entityDAO.save(itemManage);
			}
			
			@MethodID("modifyItem")
			@LogOperate(operate = "修改物品")
			public void modifyItem_log_trans(ItemManage itemManage){
				String[] updateInfo = DBOperation.getUpdateInfo();
				itemManage.setLastestUpdate(updateInfo[0]);
				itemManage.setUpdatePerson(updateInfo[2]);
				entityDAO.attachDirty(itemManage);
			}
			
			@MethodID("deleteItem")
			@LogOperate(operate = "删除物品")
			public void deleteItem_log_trans(String[] pkArr) {
				if (pkArr == null || pkArr.length == 0) {
					return;
				}
				/** 第一步：遍历删除类目信息，更新对应的物业单元业务状态 * */
				for (int j = 0; j < pkArr.length; j++) {
					ItemManage itemManage = entityDAO.findById(pkArr[j]);
					// 更新单元定义表中的业务状态 未申请
					entityDAO.delete(itemManage);
				}

				/** 第二步：删除类目对应的各种信息 * */
			}
			
}
