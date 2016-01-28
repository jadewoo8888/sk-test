package framework.modules.consumblemanagement.bo;

import java.util.UUID;

import framework.modules.append.bo.AppendBusinessType;
import framework.modules.consumblemanagement.dao.TestDAO;
import framework.modules.consumblemanagement.domain.Test;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;
import framework.sys.tools.DBOperation;

@LogOperate(menu = "吴测试")
public class TestBO extends BOBase<TestDAO, Test> {

	/**
	 * @function:新增合同接口
	 * @param: contract		出租合同对象
	 * @param: ruleList		出租期限列表
	 * @param: appendList	出租附件列表
	 */
	@MethodID("addTest")
	@LogOperate(operate = "新增测试")
	public void addTest_log_trans(Test test){
		String mainpk = UUID.randomUUID().toString();
		test.setId(mainpk);
		entityDAO.save(test);
	}
	
	@MethodID("modifyTest")
	@LogOperate(operate = "修改测试")
	public void modifyTest_log_trans(Test test){
		entityDAO.attachDirty(test);
	}
	
	@MethodID("deleteTest")
	@LogOperate(operate = "删除测试")
	public String deleteTest_log_trans(String id){
		String return_tips = "";
		entityDAO.delete(entityDAO.findById(id));
		return return_tips;
	}
	
	@MethodID("deleteTestByIds")
	@LogOperate(operate = "批量删除测试")
	public String deleteTestByIds_log_trans(String[] ids){
		String return_tips = "";
		String idsInSql = DBOperation.mosaicInStrSql(ids);
		if (idsInSql.length() > 0) {
			String deleteMainSql = "delete from ttest where id in ( " + idsInSql + " )";
			entityDAO.executeSql(deleteMainSql);
		}
		return return_tips;
	}
}
