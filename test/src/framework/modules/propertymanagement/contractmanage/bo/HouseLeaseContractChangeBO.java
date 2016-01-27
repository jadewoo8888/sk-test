package framework.modules.propertymanagement.contractmanage.bo;

import java.util.List;
import java.util.UUID;

import framework.modules.append.bo.AppendBO;
import framework.modules.append.bo.AppendBusinessType;
import framework.modules.append.domain.Append;
import framework.modules.propertymanagement.accountreceivablemanage.dao.HlcrentInfoDAO;
import framework.modules.propertymanagement.accountreceivablemanage.domain.HlcrentInfo;
import framework.modules.propertymanagement.contractmanage.dao.HLCRentRlueDAO;
import framework.modules.propertymanagement.contractmanage.dao.HouseLeaseContractDAO;
import framework.modules.propertymanagement.contractmanage.domain.HLCRentRlue;
import framework.modules.propertymanagement.contractmanage.domain.HouseLeaseContract;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.cache.GlobalCache;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;
import framework.sys.tools.DBOperation;

@LogOperate(menu = "合同变更")
public class HouseLeaseContractChangeBO extends BOBase<HouseLeaseContractDAO, HouseLeaseContract> {
	private AppendBO appendBO;
	private HLCRentRlueDAO hlcRentRlueDAO;
	private HlcrentInfoDAO hlcrentInfoDAO;

	/**
	 * 新增合同变更
	 * 
	 * @param: contract 出租合同对象
	 * @param: ruleList 出租期限列表
	 * @param: appendList 出租附件列表
	 */
	@MethodID("addContractChange")
	@LogOperate(operate = "新增合同变更")
	public void addContractChange_log_trans(HouseLeaseContract contract, List<HLCRentRlue> ruleList, List<Append> appendList) {
		String mainpk = UUID.randomUUID().toString();
		String[] updateInfo = DBOperation.getUpdateInfo();
		String oldHlcpk = contract.getHlcpk();
		String newHlcCode = GlobalCache.getBusinBillNoFactoryService().getHTBGWBNo(contract.getHlcCode());
		String newHlcBarCode = GlobalCache.getBusinBillNoFactoryService().getHTBGNBNo(contract.getHlcBarCode());

		/** 第一步：设置新合同信息的值，并保存,同时更新原合同的字段 * */
		contract.setHlcpk(mainpk);
		contract.setHlcCode(newHlcCode);
		contract.setHlcBarCode(newHlcBarCode);
		// 是否有效合同 否
		contract.setHlcIfvalid("YesNo_002");
		// 审批业务类型 合同变更
		contract.setApprType("HTSPYWLX_001");
		// 申请单状态 未提交
		contract.setHtspflag("HTSPZT_001");
		// 申请单状态 申请人
		contract.setApplyPerson(updateInfo[2]);
		entityDAO.save(contract);
		entityDAO.executeSql("update tHouseLeaseContract set ApprType='HTSPYWLX_001',Htspflag='HTSPZT_001' where HLCPK = ? ", oldHlcpk);


		/** 第二步：处理租赁规则明细 * */
		int ruleListLen = ruleList.size();
		for (int i = 0; i < ruleListLen; i++) {
			HLCRentRlue hlcRentRlue = ruleList.get(i);
			hlcRentRlue.setHlcRentRulePK("");
			hlcRentRlue.setHlcRentRuleContractCode(contract.getHlcCode());
			hlcRentRlueDAO.save(hlcRentRlue);
		}

		/** 第三步： 处理附件表 * */
		appendBO.processAppend(appendList, contract.getHlcpk(), AppendBusinessType.TYYWLX_006, contract.getHlcFirstEnprCode());
	}

	/**
	 * 修改合同变更
	 * 
	 * @param: contract 出租合同对象
	 * @param: ruleList 出租期限列表
	 * @param: appendList 出租附件列表
	 */
	@MethodID("modifyContractChange")
	@LogOperate(operate = "修改合同变更")
	public void modifyContractChange_log_trans(HouseLeaseContract contract, List<HLCRentRlue> ruleList, List<Append> appendList) {

		/** 第一步：保存修改的合同信息 * */
		entityDAO.attachDirty(contract);

		/** 第二步：处理租赁规则明细 * */
		// 先删除原来的所有明细，再新增保存此次的明细，简化处理
		entityDAO.executeSql("delete from tHLCRentRlue where HLCRentRuleContractCode = ? ", contract.getHlcCode());
		int ruleListLen = ruleList.size();
		for (int i = 0; i < ruleListLen; i++) {
			HLCRentRlue hlcRentRlue = ruleList.get(i);
			hlcRentRlue.setHlcRentRulePK("");
			hlcRentRlue.setHlcRentRuleContractCode(contract.getHlcCode());
			hlcRentRlueDAO.save(hlcRentRlue);
		}

		/** 第三步： 处理附件表 * */
		appendBO.processAppend(appendList, contract.getHlcpk(), AppendBusinessType.TYYWLX_006, contract.getHlcFirstEnprCode());
	}

	/**
	 * 删除合同变更
	 * 
	 * @param: contract 出租合同对象
	 */
	@MethodID("deleteContractChange")
	@LogOperate(operate = "删除合同变更")
	public void deleteContractChange_log_trans(HouseLeaseContract contract) {
		String hlcCode = contract.getHlcCode();
		String oldHlcCode = hlcCode.substring(0, hlcCode.lastIndexOf("-"));

		/** 第一步：删除合同变更信息，更新原合同的状态 * */
		entityDAO.delete(contract);
		entityDAO.executeSql("update tHouseLeaseContract set ApprType = '',HTSPFlag = ''  where HlcCode = ? ", oldHlcCode);

		/** 第二步：删除变更合同相关的租赁规则信息 * */
		entityDAO.executeSql("delete from tHLCRentRlue where HLCRentRuleContractCode = ? ", contract.getHlcCode());

		/** 第三步：删除附件 * */
		appendBO.deleteAppendByBusinessCode(new String[] { contract.getHlcpk() }, AppendBusinessType.TYYWLX_006);
	}

	/**
	 * 确认合同变更
	 * 
	 * @param: contract 出租合同对象
	 */
	@MethodID("confirmContractChange")
	@LogOperate(operate = "确认合同变更")
	public void confirmContractChange_log_trans(HouseLeaseContract contract) {
		String hlcCode = contract.getHlcCode();
		String oldHlcCode = hlcCode.substring(0, hlcCode.lastIndexOf("-"));

		HouseLeaseContract oldContract = (HouseLeaseContract) entityDAO.findByProperty("hlcCode", oldHlcCode).get(0);
		String strTemp = "";
		
		// 交换新旧合同相关数据
		// 合同编号（内部）
		strTemp = oldContract.getHlcCode();
		String strHLCBarCode_old = null;// 用于交换合同外部编号时，规避唯一键问题
		oldContract.setHlcCode(hlcCode);
		contract.setHlcCode(oldHlcCode);
		// 合同编号（外部）
		strTemp = oldContract.getHlcBarCode();
		strHLCBarCode_old = contract.getHlcBarCode();
		oldContract.setHlcBarCode(strHLCBarCode_old + "temp");
		contract.setHlcBarCode(strTemp);

		// 是否有效合同
		strTemp = oldContract.getHlcIfvalid();
		oldContract.setHlcIfvalid(contract.getHlcIfvalid());
		contract.setHlcIfvalid(strTemp);

		// 申请单状态
 		oldContract.setHtspflag("");
		contract.setHtspflag("");

		// 审批状态
		strTemp = oldContract.getApprovalProcess();
		oldContract.setApprovalProcess(contract.getApprovalProcess());
		contract.setApprovalProcess(strTemp);

		contract.setApprType("");
		oldContract.setApprType("");
		oldContract.setApplyPerson(contract.getApplyPerson());
		oldContract.setLinkers(contract.getLinkers());

		// 修改原始合同
		entityDAO.attachDirty(oldContract);

		// 生成应收租金
		List<HLCRentRlue> ruleList = hlcRentRlueDAO.getAfterChangeRule(contract.getHlcCode(),contract.getChangeDate());
		
		int ruleListLen = ruleList.size();
		RentCalculate rentCalculate = new RentCalculate();
		for (int i = 1; i < ruleListLen; i++) {
			HLCRentRlue hlcRentRlue = ruleList.get(i);
			
 			if (true) {
				// 生成应收款
				Object[][] hlcRentInfos = rentCalculate.createRentInfoByRentRuleateRentInfoByRentRule(hlcRentRlue);
				for (int j = 0; j < hlcRentInfos.length; j++) {
					HlcrentInfo rentinfo = new HlcrentInfo();

					rentinfo.setHlcrentInfoReceiveRent(Double.parseDouble(hlcRentInfos[j][2].toString())); // 收款金额
					rentinfo.setHlcrentInfoReceiveDate((String) hlcRentInfos[j][3]); // 收款日期
					rentinfo.setHlcrentInfoContractCode(contract.getHlcCode()); // 合同内部编号
					rentinfo.setHlcrentInfoContractBarCode(contract.getHlcBarCode()); // 合同序号
					// 合同外部编号
					rentinfo.setHlcrentInfoSecondEnprName(contract.getHlcSecondEnprName()); // 承租人名称
					rentinfo.setHlcrentInfoFirstEnprCode(contract.getHlcFirstEnprCode()); // 单位编号（内部）
					rentinfo.setHlcrentInfoFirstEnprName(contract.getHlcFirstEnprName()); // 单位名称
					rentinfo.setUnitSysCode(contract.getUnitSysCode()); // 单元内部编号（物业内部编号）
					rentinfo.setUnitAdress(contract.getUnitAdress()); // 单元地址（物业地址）
					rentinfo.setIfAdjunct("无"); // 有无附件 无
					rentinfo.setHlcrentInfoStyleNotice1("Notice_001"); // 催款通知书发送状态
					rentinfo.setHlcrentInfoStyleNotice("Notice_001"); // 提醒通知书发送状态
					rentinfo.setHlcrentInfoRentType("FundType_001"); // 款项类型
					rentinfo.setHlcrentInfoStyle("RentStyle_004"); // 款项状态 正常
					rentinfo.setHlcrentInfoCheckFlag("SJZT_00"); // 状态标识（标记款项是否处理完毕）未收
					hlcrentInfoDAO.save(rentinfo);
				}
			}
		}
		// 删除旧合同未收应收款
		entityDAO.executeSql("delete from tHLCRentInfo where HLCRentInfoContractCode = ? and HLCRentInfoCheckFlag = 'SJZT_00' ", oldHlcCode);
		
		// 将处理租期租金明细表中的合同编号进行交换(合同编号已经进行过交换了)
		// 将原明细的合同编号改为变更合同编号+"_"
		entityDAO.executeSql("update tHLCRentRlue set HLCRentRuleContractCode = ? where HLCRentRuleContractCode = ?", oldContract.getHlcCode() + "_", contract
				.getHlcCode());
		// 将新明细的合同编号改为原合同的编号
		entityDAO.executeSql("update tHLCRentRlue set HLCRentRuleContractCode = ? where HLCRentRuleContractCode = ?", contract.getHlcCode(), oldContract
				.getHlcCode());
		// 去除原明细的合同编号的后缀 "_"
		entityDAO.executeSql("update tHLCRentRlue set HLCRentRuleContractCode= ? where HLCRentRuleContractCode = ?", oldContract.getHlcCode(), oldContract
				.getHlcCode()
				+ "_");
		// 处理单元定义表 修改 承租人 合同到期日
		entityDAO.executeSql("update tHouseUnit set  ContractDueDate = ?,HLCSecondEnprName= ? where UnitSysCode = ?", contract.getHlcRegEndDate(), contract
				.getHlcSecondEnprName(), contract.getUnitSysCode());
		
		entityDAO.attachDirty(contract);
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
