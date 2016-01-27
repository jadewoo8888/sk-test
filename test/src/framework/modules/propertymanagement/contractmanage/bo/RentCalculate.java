package framework.modules.propertymanagement.contractmanage.bo;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import framework.modules.propertymanagement.contractmanage.domain.HLCRentRlue;
import framework.sys.tools._Date;

public class RentCalculate {
	DecimalFormat df = new DecimalFormat("0.00");

	/**
	 * 生成应收款
	 * 
	 * @param:hlcRentRule 租期租金明细对象
	 * @return: 返回一个二维数组 数组内容为每一条租金的 [][0]起始日期String [][1]结束日期String
	 *          [][2]应收金额Double [][3]应收日期String
	 */
	public Object[][] createRentInfoByRentRuleateRentInfoByRentRule(HLCRentRlue hlcRentRule) {
		Object[][] rentInfo = null;
		if (hlcRentRule.getHlcRentRulePeriod().equals("PayCyc_005")) {// 一次性付款
			rentInfo = new String[1][4];
			// 应收租金
			rentInfo[0][2] = df.format(hlcRentRule.getHlcRentRuleRent());
			// 应收日期
			String strHLCRentRuleStartDate = hlcRentRule.getHlcRentRuleStartDate(); // 起始日期
			String strPeriodDate = hlcRentRule.getHlcRentRulePeriodDate(); // 第几天
			String strPeriodMonth = hlcRentRule.getHlcRentRulePeriodMonth(); // 第几个月
			strPeriodMonth = (strPeriodMonth == null || strPeriodMonth.equals("")) ? "1" : strPeriodMonth;
			int iPeriodDate = strPeriodDate.equals("") ? 1 : Integer.parseInt(strPeriodDate);
			int iPeriodMonth = strPeriodDate.equals("") ? 1 : Integer.parseInt(strPeriodMonth);
			String strReceiveDate = _Date.getPointedDate(strHLCRentRuleStartDate, 0, -(iPeriodMonth - 1), -(iPeriodDate - 1));
			rentInfo[0][3] = strReceiveDate;
		} else {
			rentInfo = this.getRentInfo(hlcRentRule);
		}
		return rentInfo;
	}
	
	/**
	 * 对非一次性缴款的租金规则进行租金计算，: 
	 * @param HLCRentRule 租金规则对象
	 * @return 返回一个二维数组 数组内容为每一条租金的
	 * 		[][0]起始日期String
	 * 		[][1]结束日期String
	 * 		[][2]应收金额Double
	 * 		[][3]应收日期String
	 */
	public Object[][] getRentInfo(HLCRentRlue hlcRentRule){
		String strStartDate = hlcRentRule.getHlcRentRuleStartDate();	// 区间起始日期
		String strEndDate = hlcRentRule.getHlcRentRuleEndDate();		// 区间终止日期
		int intFirstStartDay = Integer.parseInt(strStartDate.substring(8, 10));
		String theWholeDiff = _Date.getDateDiff(strStartDate, strEndDate);// 格式000-00-01-00-01
		int intDiffMonth = Integer.parseInt(theWholeDiff.substring(0, 3)); // 当前相差月份
		int intDayDif1 = Integer.parseInt(theWholeDiff.substring(4, 6)); // 当期相差天数
		int intDayMonth1 = Integer.parseInt(theWholeDiff.substring(7, 9));
		
		/** 特殊情况：只有一个月且是起始结束日期是在同一个月的情况 **/
		if (intDayDif1 == intDayMonth1) {
			theWholeDiff = "001-00-01-00-01";
			intDiffMonth = 1;
			intDayDif1 = 0;
			intDayMonth1 = 1;
		}
		
		/** 根据收款方式，初始化收款间隔月数 **/
		String period = hlcRentRule.getHlcRentRulePeriod();
		int divisor = 1;// 该方法不用于一次性收款
		if (period.equals("PayCyc_002")) {
			divisor = 3;
		} else if (period.equals("PayCyc_003")) {
			divisor = 6;
		} else if (period.equals("PayCyc_004")) {
			divisor = 12;
		}
		/** 计算每个应收款的起始终止日期信息 **/
		//记录可生成多少条租金信息，最后一条记录特殊，要不就是跟结算期一样大，要不就是比结算期长一点。
		int count = intDiffMonth / divisor; 
		if (count == 0) {
			count = 1;
		}
		// 用于存储截取后的每段日期的信息。
		Object[][] rentInfo = new String[count][4];
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		// 先获取每一段日期的起始结束日期
		if (count == 1) {
			rentInfo[0][0] = strStartDate;
			rentInfo[0][1] = strEndDate;
		} else {// 大于1条的情况
			Calendar cal = Calendar.getInstance();
			try {
				cal.setTime(format.parse(strStartDate));
			}catch (Exception e) {
				throw new RuntimeException(e);
			}
			for (int i = 0; i < count; i++) {
				if (i == 0) {// 第一条
					cal.add(Calendar.MONTH, divisor);
					cal.add(Calendar.DAY_OF_MONTH, -1);
					if (intFirstStartDay == _Date.getDayOfMonthByDate(strStartDate, "now")) {
						cal.set(Calendar.DAY_OF_MONTH, _Date.getDayOfMonthByDate(format.format(cal.getTime()), "now") - 1);
					}
					rentInfo[i][0] = strStartDate;
					rentInfo[i][1] = format.format(cal.getTime());
					cal.add(Calendar.DAY_OF_MONTH, 1);
				} else if (i == (count - 1)) {// 最后一条
					rentInfo[i][0] = format.format(cal.getTime());
					rentInfo[i][1] = strEndDate;
				} else {// 中间的
					rentInfo[i][0] = format.format(cal.getTime());
					cal.add(Calendar.MONTH, divisor);
					cal.add(Calendar.DAY_OF_MONTH, -1);
					if (intFirstStartDay == _Date.getDayOfMonthByDate(strStartDate, "now")) {
						cal.set(Calendar.DAY_OF_MONTH, _Date.getDayOfMonthByDate(format.format(cal.getTime()), "now") - 1);
					}
					rentInfo[i][1] = format.format(cal.getTime());
					cal.add(Calendar.DAY_OF_MONTH, 1);
				}
			}
		}
		
		/** 处理租金和应收日期 **/
		for (int i = 0; i < count; i++) {
			// 租金
			rentInfo[i][2] = df.format(hlcRentRule.getHlcRentRuleRent()*divisor);
			// 应收日期 
			String strPeriodDate = hlcRentRule.getHlcRentRulePeriodDate();			//第几天
			String strPeriodMonth = hlcRentRule.getHlcRentRulePeriodMonth();		//第几个月
			strPeriodMonth = (strPeriodMonth==null||strPeriodMonth.equals(""))?"1":strPeriodMonth;
			int periodMonth = Integer.parseInt(strPeriodMonth);
			int periodDate = Integer.parseInt(strPeriodDate);
			Calendar calTemp = Calendar.getInstance();
			try {
				calTemp.setTime(format.parse((String)rentInfo[i][0]));
			}catch (Exception e) {
				throw new RuntimeException(e);
			}
			calTemp.add(calTemp.MONTH, periodMonth - 1);
			calTemp.add(calTemp.DAY_OF_MONTH, periodDate - 1);
			rentInfo[i][3] = format.format(calTemp.getTime());
			calTemp = null;
		}
		return rentInfo;
	}
}
