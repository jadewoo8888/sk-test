package framework.modules.propertymanagement.contractmanage.bo;

import java.util.List;

import framework.modules.append.bo.AppendBO;
import framework.modules.append.bo.AppendBusinessType;
import framework.modules.append.domain.Append;
import framework.modules.propertymanagement.accountreceivablemanage.dao.HlcrentInfoDAO;
import framework.modules.propertymanagement.contractmanage.dao.HLCRentRlueDAO;
import framework.modules.propertymanagement.contractmanage.dao.HouseLeaseContractDAO;
import framework.modules.propertymanagement.contractmanage.domain.HouseLeaseContract;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;
import framework.sys.tools.DBOperation;

@LogOperate(menu = "合同解除")
public class HouseLeaseContractStopBO extends BOBase<HouseLeaseContractDAO, HouseLeaseContract> {
	private AppendBO appendBO;
	private HLCRentRlueDAO hlcRentRlueDAO;
	private HlcrentInfoDAO hlcrentInfoDAO;

	/**
	 * 
	 * @param contract
	 *            合同信息对象
	 * @param appendList
	 *            附件信息集合
	 * @param strType
	 *            解除类型，"1" 中止，"2" 终止
	 */
	@MethodID("stopContract")
	@LogOperate(operate = "解除合同")
	public void stopContract_log_trans(HouseLeaseContract contract, List<Append> appendList, String strType) {
		String[] updateInfo = DBOperation.getUpdateInfo();
		/** 第一步：设置合同信息值，并更新保存 * */
		// 合同终止
		if ("2".equals(strType)) {
			contract.setApprType("HTSPYWLX_003");
		} else {
			contract.setApprType("HTSPYWLX_002");
		}
		// 申请单状态 未提交
		contract.setHtspflag("HTSPZT_001");
		// 申请人
		contract.setApplyPerson(updateInfo[2]);
		contract.setHlcCheckFlag("SJZT_01");
		// 清空历史审批人
		contract.setLinkers("");
		// 合同是否已中止 合同已终止
		contract.setHlcIsStop("HLCStop_005");
		if (contract.getApprType().equals("HTSPYWLX_002")) {// 中止
			// 合同状态 已中止
			contract.setHlcCheckFlag("SJZT_02");
			// 实际结束日期
			contract.setHlcRealEndDate(contract.getHlcStopDate());
			// 删除合同未收应收款
			entityDAO.executeSql("delete from tHLCRentInfo where HLCRentInfoContractCode = ? and HLCRentInfoCheckFlag = 'SJZT_00'", contract.getHlcCode());
		} else {// 终止
			// 合同状态 已终止
			contract.setHlcCheckFlag("SJZT_03");
			// 实际结束日期
			contract.setHlcRealEndDate(contract.getHlcRegEndDate());
		}
		entityDAO.attachDirty(contract);

		/**第二步： 处理单元定义表 清空合同编号、到期日、承租人名称，并将业务状态改成“未申请” **/
		entityDAO.executeSql("Update tHouseUnit Set ContractCode = '',ContractDueDate = '',HLCSecondEnprName = '',CanLeaseFlag=0 Where UnitSysCode = ? ",
				contract.getUnitSysCode());

		/** 第三步：处理附件信息 **/
		appendBO.processAppend(appendList, contract.getHlcpk(), AppendBusinessType.TYYWLX_006, contract.getHlcFirstEnprCode());
	}

	public AppendBO getAppendBO() {
		return appendBO;
	}

	public void setAppendBO(AppendBO appendBO) {
		this.appendBO = appendBO;
	}

	public HLCRentRlueDAO getHlcRentRlueDAO() {
		return hlcRentRlueDAO;
	}

	public void setHlcRentRlueDAO(HLCRentRlueDAO hlcRentRlueDAO) {
		this.hlcRentRlueDAO = hlcRentRlueDAO;
	}

	public HlcrentInfoDAO getHlcrentInfoDAO() {
		return hlcrentInfoDAO;
	}

	public void setHlcrentInfoDAO(HlcrentInfoDAO hlcrentInfoDAO) {
		this.hlcrentInfoDAO = hlcrentInfoDAO;
	}
}
