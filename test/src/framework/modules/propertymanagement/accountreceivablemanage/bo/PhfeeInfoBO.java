package framework.modules.propertymanagement.accountreceivablemanage.bo;

import java.math.BigDecimal;
import java.util.List;

import framework.modules.append.bo.AppendBO;
import framework.modules.append.bo.AppendBusinessType;
import framework.modules.append.domain.Append;
import framework.modules.propertymanagement.accountreceivablemanage.dao.PhfeeInfoDAO;
import framework.modules.propertymanagement.accountreceivablemanage.domain.HlcrentInfo;
import framework.modules.propertymanagement.accountreceivablemanage.domain.PhfeeInfo;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;

@LogOperate(menu = "物业卫生费收款管理")
public class PhfeeInfoBO extends BOBase<PhfeeInfoDAO, PhfeeInfo> {
	private AppendBO appendBO;

	/**
	 * 物业卫生费收款,或修改
	 * 
	 * @param phfeeInfo
	 *            物业卫生费收款信息
	 * @param appendList
	 *            附件信息
	 */
	@MethodID("receiving")
	@LogOperate(operate = "物业卫生费收款")
	public void receiving_log_trans(PhfeeInfo phfeeInfo, List<Append> appendList) {
		/** 第一步：处理租金信息 * */
		// 校验 实收金额>=应收金额
		if (phfeeInfo.getRealRecRent() >= phfeeInfo.getReceiveRent()) {
			phfeeInfo.setCheckFlag("SJZT_01");
		}
		// 实收金额大于0，且少于应收金额
		else if (phfeeInfo.getRealRecRent() > 0 && phfeeInfo.getRealRecRent() < phfeeInfo.getReceiveRent()) {
			phfeeInfo.setCheckFlag("SJZT_04");
		} else {
			phfeeInfo.setCheckFlag("SJZT_00");
		}
		entityDAO.attachDirty(phfeeInfo);

		/** 第二步：处理附件信息 * */
		appendBO.processAppend(appendList, phfeeInfo.getPk(), AppendBusinessType.TYYWLX_029, phfeeInfo.getOrgSysCode());
	}

	/**
	 * 列表点击收款后，弹出收款窗口前对选中信息的校验
	 * 
	 * @param hlcrentInfo
	 *            租金信息
	 * @return 空字符串""标示可进行收款操作，否则为提示语
	 */
	@MethodID("checkBeforReceiving")
	public String checkBeforReceiving(PhfeeInfo phfeeInfo) {
		String return_tips = "";

		String strSql = "select  count(*) from tPhfeeInfo where ClientCode =  ?   and CheckFlag in ('SJZT_00','SJZT_04') and ReceiveDate< ?";
		BigDecimal count = (BigDecimal) entityDAO.executeFindUnique(strSql, phfeeInfo.getClientCode(), phfeeInfo.getReceiveDate());
		if (count.intValue() != 0) {
			return_tips = "存在比当前所选应收日期小的未收款，请先收前面的应收款！！";
		}

		return return_tips;
	}

	public AppendBO getAppendBO() {
		return appendBO;
	} 

	public void setAppendBO(AppendBO appendBO) {
		this.appendBO = appendBO;
	}
}
