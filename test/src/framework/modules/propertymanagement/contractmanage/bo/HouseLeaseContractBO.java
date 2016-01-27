package framework.modules.propertymanagement.contractmanage.bo;

import java.util.List;
import java.util.UUID;

import framework.modules.append.bo.AppendBO;
import framework.modules.append.bo.AppendBusinessType;
import framework.modules.append.domain.Append;
import framework.modules.approve.bo.ApprovalBO;
import framework.modules.approve.dao.ApprovalDAO;
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
import framework.sys.tools._Date;

@LogOperate(menu = "合同登记信息管理")
public class HouseLeaseContractBO extends BOBase<HouseLeaseContractDAO, HouseLeaseContract> {
	private HLCRentRlueDAO hlcRentRlueDAO;
	private HlcrentInfoDAO hlcrentInfoDAO;
	private AppendBO appendBO;

	/**
	 * @function:新增合同接口
	 * @param: contract		出租合同对象
	 * @param: ruleList		出租期限列表
	 * @param: appendList	出租附件列表
	 */
	@MethodID("addHouseLeaseContract")
	@LogOperate(operate = "新增合同")
	public void addHouseLeaseContract_log_trans(HouseLeaseContract contract, List<HLCRentRlue> ruleList, List<Append> appendList){
		String mainpk = UUID.randomUUID().toString();
		String hlcCode = GlobalCache.getBusinBillNoFactoryService().getHTDJNBNo();
		
		/** 处理主表 **/
		contract.setHlcpk(mainpk);
		contract.setHlcCode(hlcCode);
		if (contract.getHlcBarCode()==null||contract.getHlcBarCode().equals("")) {
			String hlcBarCode = GlobalCache.getBusinBillNoFactoryService().getHTDJWBNo(contract.getHlcFirstEnprCode(), contract.getUnitCode());
			contract.setHlcBarCode(hlcBarCode);
		}
		contract.setHlcpk(mainpk);
		contract.setHlcIfvalid("YesNo_001");								//是否有效合同 是
		contract.setHlcRegDate(_Date.getSystemDate().substring(0, 10));		//签订日期
		contract.setHlcCheckFlag("SJZT_01");								//合同状态 执行中
		contract.setHlcIsNotice("Notice_001");								//是否打印拟到期通知书  未发
		contract.setMarginCheckFlag("SJZT_00");								//保证金状态 未收
		contract.setHlcSecondPaperTyype("CZRZJLX_002");						//承租人证件类型 身份证
		entityDAO.save(contract);
		
		/** 处理租期租金明细表 **/
		for (int i = 0; i < ruleList.size(); i++) {
			HLCRentRlue rule = ruleList.get(i);
			rule.setHlcRentRuleContractCode(contract.getHlcCode());
			hlcRentRlueDAO.save(rule);
		}
		
		RentCalculate rentCalculate = new RentCalculate();
		/** 处理应收租金明细表 **/
		for (int i = 0; i < ruleList.size(); i++) {
			HLCRentRlue rule = ruleList.get(i);
			Object[][] hlcRentInfos = rentCalculate.createRentInfoByRentRuleateRentInfoByRentRule(rule);
			for (int j = 0; j < hlcRentInfos.length; j++) {
				HlcrentInfo rentinfo = new HlcrentInfo();
				rentinfo.setHlcrentInfoReceiveRent(Double.parseDouble(hlcRentInfos[j][2].toString()));			//收款金额
				rentinfo.setHlcrentInfoReceiveDate((String)hlcRentInfos[j][3]);			//收款日期
				rentinfo.setHlcrentInfoContractCode(contract.getHlcCode());				//合同内部编号
				rentinfo.setHlcrentInfoContractBarCode(contract.getHlcBarCode());		//合同序号 合同外部编号
				rentinfo.setHlcrentInfoSecondEnprName(contract.getHlcSecondEnprName());	//承租人名称
				rentinfo.setHlcrentInfoFirstEnprCode(contract.getHlcFirstEnprCode());	//单位编号（内部）
				rentinfo.setHlcrentInfoFirstEnprName(contract.getHlcFirstEnprName());	//单位名称
				rentinfo.setUnitSysCode(contract.getUnitSysCode());						//单元内部编号（物业内部编号）
				rentinfo.setUnitAdress(contract.getUnitAdress());						//单元地址（物业地址）
				rentinfo.setIfAdjunct("无");												//有无附件 无
				rentinfo.setHlcrentInfoStyleNotice1("Notice_001");						//催款通知书发送状态 未发
				rentinfo.setHlcrentInfoStyleNotice("Notice_001");						//提醒通知书发送状态 未发
				rentinfo.setHlcrentInfoRentType("FundType_001");						//款项类型 租金
				rentinfo.setHlcrentInfoStyle("RentStyle_004");							//款项状态 正常
				rentinfo.setHlcrentInfoCheckFlag("SJZT_00");							//状态标识（标记款项是否处理完毕）未收
				hlcrentInfoDAO.save(rentinfo);
			}
		}
		
		/** 处理单元定义表 修改合同内部编号和到期日并设置状态为“登记合同” **/
		entityDAO.executeSql("update tHouseUnit set ContractCode=?,ContractDueDate=?,HLCSecondEnprName=?,CanLeaseFlag=4 where UnitSysCode=?",new String[]{contract.getHlcBarCode(),contract.getHlcRegEndDate(),contract.getHlcSecondEnprName(),contract.getUnitSysCode()});
		
		/** 处理承租人确认表 更新是否已生成合同 **/
		entityDAO.executeSql("update tLetConfirm set LetContractFlag='是' where UnitSysCode=?",contract.getUnitSysCode());
		
		/** 处理附件表 **/
		appendBO.processAppend(appendList, contract.getHlcpk(), AppendBusinessType.TYYWLX_006, contract.getHlcFirstEnprCode());
	}
	
	
	/**
	 * 删除合同
	 * @param hlcPK 要删除合同信息的HLCPK，这里不支持多合同删除
	 * @return 字符串型：表示该合同是否删除成功，成功时返回""，失败时返回失败原因
	 */
	@MethodID("deleteHouseLeaseContract")
	@LogOperate(operate = "删除合同")
	public String deleteHouseLeaseContract_log_trans(String hlcPK) {
		
		/** 获取合同信息 **/
		HouseLeaseContract contract = entityDAO.findById(hlcPK);

		/** 判断合同是否已收过款，收过款则不能删除 **/
		if (hlcrentInfoDAO.isContractHasRentInfo(contract.getHlcCode())) {
			return "此合同已收过款，不可以进行删除操作！";
		}
		
		/** 处理主表 **/
		entityDAO.delete(contract);
		
		/** 处理租期租金明细表（直接使用语句删除，不处理其他相关表，如有需要就改成接口） **/
		entityDAO.executeSql("delete from tHLCRentRlue where HLCRentRuleContractCode = ? ",contract.getHlcCode());
		
		/** 处理应收租金明细表 **/
		entityDAO.executeSql("delete from tHLCRentInfo where HLCRentInfoContractCode = ? ",contract.getHlcCode());
		
		/** 处理单元定义表 清空合同编号、到期日、承租人名称，并将业务状态改成“已确认” **/
		entityDAO.executeSql("update tHouseUnit Set ContractCode = '',ContractDueDate = '',HLCSecondEnprName = '',CanLeaseFlag=3 Where UnitSysCode = ? ",contract.getUnitSysCode());
		
		/** 处理承租人确认表 更新是否已生成合同 **/
		entityDAO.executeSql("update tLetConfirm set LetContractFlag='否' where UnitSysCode = ? ",contract.getUnitSysCode());
		
		/** 处理附件信息 **/
		appendBO.deleteAppendByBusinessCode(new String[]{contract.getHlcpk()}, AppendBusinessType.TYYWLX_006);
		
		return "";
	}
	
	/**
	 * 附件上传保存接口
	 * 合同信息不作更改，仅修改附件信息
	 * @param contract 合同信息
	 * @param appendList 附件信息
	 */
	@MethodID("modifyAppend")
	@LogOperate(operate = "附件上传")
	public void modifyAppend_log_trans(HouseLeaseContract contract,  List<Append> appendList){
		appendBO.processAppend(appendList, contract.getHlcpk(), AppendBusinessType.TYYWLX_006, contract.getHlcFirstEnprCode());
	}
	
	
	/**
	 * 自动检测并终止合同（满足自动终止的条件：已到期&应收款处理完毕）无事务 供其他模块调用
	 * 
	 */
	public void autoEnd() {
		String strSql = "";
		String nowDate = _Date.getSystemDate3();
		/** 第一步：找出已到期且没有终止的合同编号 * */
		strSql = "select HLCCode from tHouseLeaseContract where HLCCheckFlag='SJZT_01'   and HLCRegEndDate <'" + nowDate + "'";
		String strHLCCodeEnd = ""; // 已到期合同的编号集
		List<HouseLeaseContract> hlcList = entityDAO.executeFind(HouseLeaseContract.class, strSql);
		if (hlcList != null) {
			int hlcListLen = hlcList.size();
			for (int i = 0; i < hlcListLen; i++) {
				strHLCCodeEnd = strHLCCodeEnd + ",'" + hlcList.get(i).getHlcCode() + "'";
			}
		}
		// 如果没有已到期的合同，结束本次操作
		if (strHLCCodeEnd.length() == 0)
			return;

		/** 第二步：找出已到期合同中应收款已经处理完毕的合同编号 * */
		strHLCCodeEnd = strHLCCodeEnd.substring(1);
		strSql = "select distinct HLCRentInfoContractCode from tHLCRentInfo where HLCRentInfoContractCode in("
				+ strHLCCodeEnd
				+ ")"
				+ " AND not exists (select HLCRentInfoContractCode from tHLCRentInfo temp where temp.HLCRentInfoContractCode = tHLCRentInfo.HLCRentInfoContractCode And (HLCRENTINFOCHECKFLAG in ('SJZT_00','SJZT_04')) And (HLCRENTINFORENTTYPE = 'FundType_001' ))";
		String strHLCCodeF = "";// 已到期且收款完毕的合同编号
		List<String> hlcCodeList = entityDAO.executeFind(strSql);
		if (hlcCodeList != null) {
			int hciListLen = hlcCodeList.size();
			for (int i = 0; i < hciListLen; i++) {
				strHLCCodeF = strHLCCodeF + ",'" + hlcCodeList.get(i) + "'";
			}
		}
		// 如果没有已到期且应收款处理完成的合同，结束本次操作
		if (strHLCCodeF.length() == 0)
			return;

		/** 第三步：自动终止已到期且应收款处理完成的合同 * */
		strHLCCodeF = strHLCCodeF.substring(1);
		strSql = "update tHouseLeaseContract set HLCRealEndDate ='" + nowDate + "',HLCCheckFlag='SJZT_03' where HLCCode in(" + strHLCCodeF + ")";
		entityDAO.executeSql(strSql);
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
