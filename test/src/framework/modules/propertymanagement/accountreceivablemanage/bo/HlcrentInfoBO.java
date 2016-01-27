package framework.modules.propertymanagement.accountreceivablemanage.bo;

import java.math.BigDecimal;
import java.util.List;

import framework.modules.append.bo.AppendBO;
import framework.modules.append.bo.AppendBusinessType;
import framework.modules.append.domain.Append;
import framework.modules.propertymanagement.accountreceivablemanage.dao.HlcrentInfoDAO;
import framework.modules.propertymanagement.accountreceivablemanage.domain.HlcrentInfo;
import framework.modules.propertymanagement.contractmanage.bo.HouseLeaseContractBO;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;

@LogOperate(menu = "合同租金管理")
public class HlcrentInfoBO extends BOBase<HlcrentInfoDAO, HlcrentInfo> {
	private AppendBO appendBO;
	private HouseLeaseContractBO houseLeaseContractBO;

	/**
	 * 合同租金收款，或修改 
	 * 
	 * @param hlcrentInfo
	 *            租金信息
	 * @param appendList
	 *            附件信息
	 */
	@MethodID("receiving")
	@LogOperate(operate = "合同租金收款")
	public void receiving_log_trans(HlcrentInfo hlcrentInfo, List<Append> appendList) {
		/** 第一步：处理租金信息 * */
		hlcrentInfo.setIfAdjunct(appendBO.hasAppend(appendList));
		// 校验 实收金额>=应收金额+其它收入-减免金额
		if (hlcrentInfo.getHlcrentInfoRealRecRent() >= (hlcrentInfo.getHlcrentInfoReceiveRent() + hlcrentInfo.getHlcrentInfoOtherIn() - hlcrentInfo
				.getHlcrentInfoMoney())) {
			hlcrentInfo.setHlcrentInfoCheckFlag("SJZT_01");
			hlcrentInfo.setHlcrentInfoStyle("RentStyle_004");
		}
		// 实收金额大于0，且少于应收金额+其它收入-减免金额
		else if (hlcrentInfo.getHlcrentInfoRealRecRent() > 0
				&& hlcrentInfo.getHlcrentInfoRealRecRent() < (hlcrentInfo.getHlcrentInfoReceiveRent() + hlcrentInfo.getHlcrentInfoOtherIn() - hlcrentInfo
						.getHlcrentInfoMoney())) {
			hlcrentInfo.setHlcrentInfoCheckFlag("SJZT_04");
			hlcrentInfo.setHlcrentInfoStyle("RentStyle_003");
		} else {
			hlcrentInfo.setHlcrentInfoCheckFlag("SJZT_00");
			hlcrentInfo.setHlcrentInfoStyle("RentStyle_003");
		}
		entityDAO.attachDirty(hlcrentInfo);

		/** 第二步：判断合同是否完结，完结时修改合同状态 * */
		houseLeaseContractBO.autoEnd();

		/** 第三步：处理附件信息 * */
		appendBO.processAppend(appendList, hlcrentInfo.getHlcrentInfoPK(), AppendBusinessType.TYYWLX_007, hlcrentInfo.getHlcrentInfoFirstEnprCode());
	}

	/**
	 * 列表点击收款后，弹出收款窗口前对选中租金的校验
	 * 
	 * @param hlcrentInfo
	 *            租金信息
	 * @return 空字符串""标示可进行收款操作，否则为提示语
	 */
	@MethodID("checkBeforReceiving")
	public String checkBeforReceiving(HlcrentInfo hlcrentInfo) {
		String return_tips = "";

		String strSql = "select  count(*) from tHlcrentInfo where HLCRentInfoContractCode =  ?   and HLCRentInfoCheckFlag in ('SJZT_00','SJZT_04') and HLCRentInfoReceiveDate< ?";
		BigDecimal count = (BigDecimal) entityDAO.executeFindUnique(strSql, hlcrentInfo.getHlcrentInfoContractCode(), hlcrentInfo.getHlcrentInfoReceiveDate());
		if (count.intValue() != 0) {
			return_tips = "存在比当前所选应收日期小的未收款，请先收前面的应收款！！";
		}

		return return_tips;
	}

	/**
	 * 更新租金信息的提醒通知书字段状态为已提醒
	 * 
	 * @param hlcrentInfo
	 *            租金信息
	 */
	@MethodID("updateTXNotice")
	@LogOperate(operate = "提醒通知书打印")
	public void updateTXNotice_log_trans(HlcrentInfo hlcrentInfo) {
		hlcrentInfo.setHlcrentInfoStyleNotice("Notice_002");
		entityDAO.attachDirty(hlcrentInfo);
	}

	/**
	 * 更新租金信息的催款通知书字段状态为已催款
	 * 
	 * @param hlcrentInfo
	 *            租金信息
	 */
	@MethodID("updateCKNotice")
	@LogOperate(operate = "催款通知书打印")
	public void updateCKNotice_log_trans(HlcrentInfo hlcrentInfo) {
		hlcrentInfo.setHlcrentInfoStyleNotice1("Notice_002");
		entityDAO.attachDirty(hlcrentInfo);
	}

	public AppendBO getAppendBO() {
		return appendBO;
	}

	public void setAppendBO(AppendBO appendBO) {
		this.appendBO = appendBO;
	}

	public HouseLeaseContractBO getHouseLeaseContractBO() {
		return houseLeaseContractBO;
	}

	public void setHouseLeaseContractBO(HouseLeaseContractBO houseLeaseContractBO) {
		this.houseLeaseContractBO = houseLeaseContractBO;
	}
}
