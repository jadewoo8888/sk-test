package framework.modules.propertymanagement.contractmanage.dao;

import java.util.List;

import framework.core.orm.hibernate3.support.GenericHibernateDaoSupport;
import framework.modules.approve.domain.Approval;
import framework.modules.propertymanagement.contractmanage.domain.HLCRentRlue;

public class HLCRentRlueDAO extends GenericHibernateDaoSupport<HLCRentRlue> {

	/**
	 * 获取变更日期后的租赁规则
	 * 
	 * @param hlcRentRuleContractCode
	 *            合同内部编号
	 * @param changeDate
	 *            变更日期
	 * @return
	 */
	public List<HLCRentRlue> getAfterChangeRule(String hlcRentRuleContractCode, String changeDate) {
		List<HLCRentRlue> return_List = null;
		String sqlStr = "select * from tHLCRentRlue where HLCRentRuleContractCode = ? and HLCRentRuleStartDate > ? order by  HLCRentRuleStartDate asc";
		return_List = executeFind(HLCRentRlue.class, sqlStr, hlcRentRuleContractCode, changeDate);
		return return_List;
	}

}