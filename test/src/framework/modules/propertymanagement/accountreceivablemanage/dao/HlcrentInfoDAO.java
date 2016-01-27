package framework.modules.propertymanagement.accountreceivablemanage.dao;

import java.sql.ResultSet;

import framework.core.orm.hibernate3.support.GenericHibernateDaoSupport;
import framework.modules.propertymanagement.accountreceivablemanage.domain.HlcrentInfo;

public class HlcrentInfoDAO extends GenericHibernateDaoSupport<HlcrentInfo> {
	
	/**
	 * 验证合同是否有已收款接口
	 * @param:
	 * @return:是否有已收款
	 * @throws java.lang.Exception
	 */
	public boolean isContractHasRentInfo(String strHLCContractCode) {
		ResultSet rs = null;
		int intRet = 0;
		String strSql = "Select count(hlcrentInfoPK) From tHLCRentInfo Where HLCRentInfoContractCode = ? And HLCRentInfoCheckFlag <> 'SJZT_00'";
		Object resultObj = executeFindUnique(strSql, strHLCContractCode);
		if (resultObj != null && !resultObj.equals("")) {
			intRet = Integer.parseInt(String.valueOf(resultObj));
		}
		return intRet > 0;
	}
}