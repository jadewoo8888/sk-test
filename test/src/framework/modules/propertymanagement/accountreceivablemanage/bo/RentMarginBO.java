package framework.modules.propertymanagement.accountreceivablemanage.bo;


import java.util.List;
import java.util.UUID;

import framework.modules.append.bo.AppendBO;
import framework.modules.append.bo.AppendBusinessType;
import framework.modules.append.domain.Append;
import framework.modules.propertymanagement.accountreceivablemanage.dao.RentMarginDAO;
import framework.modules.propertymanagement.accountreceivablemanage.domain.RentMargin;
import framework.modules.propertymanagement.contractmanage.dao.HouseLeaseContractDAO;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;
import framework.sys.tools.DBOperation;

@LogOperate(menu = "合同保证金")
public class RentMarginBO extends BOBase<RentMarginDAO, RentMargin> {
	private AppendBO appendBO;
	private HouseLeaseContractDAO houseLeaseContractDAO;
	

	/**
	 * 合同保证金收款
	 * 
	 * @param phfeeInfo
	 *            合同保证金收款信息
	 * @param appendList
	 *            附件信息
	 */
	@MethodID("receiveContractMargin")
	@LogOperate(operate = "合同保证金收款")
	public void receiveContractMargin_log_trans(RentMargin rentMargin, List<Append> appendList) {
		/** 第一步：生成合同保证金序号（待修改）* */
		String mainpk = UUID.randomUUID().toString();
		rentMargin.setSerialNo(mainpk);
		/** 第二步：设置保证金状态，保存合同保证金* */
		rentMargin.setCheckFlag("SJZT_01");
		entityDAO.save(rentMargin);
		/** 第三步：更新合同的租赁保证金状态* */
		String[] updateInfo = DBOperation.getUpdateInfo();
		String sqlStr = "update thouseleasecontract set MarginCheckFlag = 'SJZT_01',LastestUpdate =?,UpdatePerson = ? where HLCCode = ?";
		houseLeaseContractDAO.executeSql(sqlStr,updateInfo[0],updateInfo[2],rentMargin.getContractCode());
		/** 第四步：处理附件信息 * */
		appendBO.processAppend(appendList, rentMargin.getPk(), AppendBusinessType.TYYWLX_009, rentMargin.getFirstEnprCode());
	}
	
	/**
	 * 合同保证金修改
	 * 
	 * @param phfeeInfo
	 *            合同保证金修改
	 * @param appendList
	 *            附件信息
	 */
	@MethodID("modifyContractMargin")
	@LogOperate(operate = "合同保证金修改")
	public void modifyContractMargin_log_trans(RentMargin rentMargin, List<Append> appendList) {
		/** 第一步：保存合同保证金* */
		entityDAO.merge(rentMargin);
		/** 第二步：处理附件信息 * */
		appendBO.processAppend(appendList, rentMargin.getPk(), AppendBusinessType.TYYWLX_009, rentMargin.getFirstEnprCode());
	}
	
	/**
	 * 合同保证金退款
	 * 
	 * @param phfeeInfo
	 *            合同保证金退款
	 */
	@MethodID("refundContractMargin")
	@LogOperate(operate = "合同保证金退款")
	public String refundContractMargin_log_trans(String HLCCode) {
		String return_tips = "";
		String[] updateInfo = DBOperation.getUpdateInfo();
		/** 第一步：检查code是否为空* */
		if (HLCCode == null || HLCCode.length() == 0) {
			return "合同编码不能为空";
		}
		/** 第二步：更新合同保证金信息表的保证金状态* */
		String tRsqlStr = "update tRentMargin set CheckFlag = 'SJZT_01',LastestUpdate ='" + updateInfo[0] + "',UpdatePerson = '" + updateInfo[1]
		                  + "' where ContractCode = '" + HLCCode +"'";
		entityDAO.executeSql(tRsqlStr);
		/** 第二步：更新合同的租赁保证金状态* */		
		String sqlStr = "update thouseleasecontract set MarginCheckFlag = 'SJZT_02',LastestUpdate ='" + updateInfo[0] + "',UpdatePerson = '" + updateInfo[1]
		                 + "' where HLCCode = '" + HLCCode +"'";
		houseLeaseContractDAO.executeSql(sqlStr);

		return return_tips;
	}
	
	/**
	 * 根据ContractCode获取合同实体对象
	 * 
	 * @param ContractCode 合同编号（合同登记表里的合同内部编码HLCCode）
	 * @return
	 */
	@MethodID("getRentMarginByContractCode")
	public RentMargin getRentMarginByContractCode(String contractCode) {

		String sql = "select * from tRentMargin where ContractCode=? ";

		return entityDAO.executeFindEntity(RentMargin.class, sql, contractCode);
	}
	
	public AppendBO getAppendBO() {
		return appendBO;
	}

	public void setAppendBO(AppendBO appendBO) {
		this.appendBO = appendBO;
	}

	public void setHouseLeaseContractDAO(HouseLeaseContractDAO houseLeaseContractDAO) {
		this.houseLeaseContractDAO = houseLeaseContractDAO;
	}

	public HouseLeaseContractDAO getHouseLeaseContractDAO() {
		return houseLeaseContractDAO;
	}

}
