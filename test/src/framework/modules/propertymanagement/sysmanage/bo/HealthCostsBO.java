package framework.modules.propertymanagement.sysmanage.bo;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import framework.modules.propertymanagement.accountreceivablemanage.dao.PhfeeInfoDAO;
import framework.modules.propertymanagement.accountreceivablemanage.domain.PhfeeInfo;
import framework.modules.propertymanagement.sysmanage.dao.ClientDAO;
import framework.modules.propertymanagement.sysmanage.domain.Client;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;

@LogOperate(menu = "物业卫生费设置")
public class HealthCostsBO extends BOBase<ClientDAO, Client> {
	private PhfeeInfoDAO phfeeInfoDAO;
	private final int ONEOFF = 0;
	private final int MONTH = 1;
	private final int QUARTER = 3;
	private final int HALFAYEAR = 6;
	private final int YEAR = 12;
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	
	@MethodID("clientSetting")
	@LogOperate(operate = "设置")
	public void clientSetting_log_trans(Client client) {
		entityDAO.attachDirty(client);
		costsFactory(client);
		
	}
	
	/**根据周期生成收款单
	 * 
	 * @param client	客户数据
	 */
	public void costsFactory(Client client){
		Date startDate;
		try {
			startDate = sdf.parse(client.getHlcRegStartDate());
			Date validate = startDate;
			Date endDate = sdf.parse(client.getHlcRegEndDate());
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(startDate);
			int cycle = getCycle(client);
			//判断是否是一次性收款
			if(cycle == ONEOFF){
				calendar.setTime(startDate);
				paybleFactory(client, validate, calendar,cycle);
			}else{
				while (startDate.before(endDate) || startDate.equals(endDate)) {
					paybleFactory(client, validate, calendar,cycle);
					calendar.add(Calendar.MONTH, cycle);
					startDate = calendar.getTime();
				}
			}
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	

	//根据周期参数，返回相应的整形周期
	private Integer getCycle(Client client) {
		String paymentcycle = client.getPaymentcycle();
		if("PayCyc_001".equals(paymentcycle)){
			return MONTH;
		}else if("PayCyc_002".equals(paymentcycle)){
			return QUARTER;
		}else if("PayCyc_003".equals(paymentcycle)){
			return HALFAYEAR;
		}else if("PayCyc_004".equals(paymentcycle)){
			return YEAR;
		}else if("PayCyc_005".equals(paymentcycle)){
			return ONEOFF;
		}else{
			return null;
		}
	}
	/**
	 * 生成收款单
	 * @param client	客户数据
	 * @param validate	初始校验日期
	 * @param calendar	当前时间
	 * @param cycle 
	 */
	private void paybleFactory(Client client, Date validate, Calendar calendar, int cycle) {
		int maxDate = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
		int month = calendar.get(Calendar.MONTH)+1;
		String monthStr = addZero(month);
		PhfeeInfo phfeeInfo = new PhfeeInfo();
		
		phfeeInfo.setClientCode(client.getClientCode());
		phfeeInfo.setCheckFlag("SJZT_00");
		phfeeInfo.setRemark(client.getPropertyHealthRemark());
		phfeeInfo.setOrgSysCode(client.getOrgSysCode());
		//当每月最大日期小于收款日期，则按该月最大日期为收款日期
		if(maxDate < validate.getDate()){
			phfeeInfo.setReceiveDate(calendar.get(Calendar.YEAR)+"-"+monthStr+"-"+addZero(maxDate));
		}else{
			calendar.set(Calendar.DATE, validate.getDate());
			phfeeInfo.setReceiveDate(calendar.get(Calendar.YEAR)+"-"+monthStr+"-"+addZero(calendar.get(Calendar.DATE)));
		}
		//一次性付款
		if(cycle == 0){
			int mothCalculate;
			try {
				mothCalculate = mothCalculate(client);
				phfeeInfo.setReceiveRent(client.getMonthlyPayableFee() * mothCalculate);
				phfeeInfo.setHalthFee(client.getMonthlyHalthFee() * mothCalculate);
				phfeeInfo.setOtherFee(client.getMonthlyOtherFee() * mothCalculate);
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}else{
			phfeeInfo.setReceiveRent(client.getMonthlyPayableFee()* cycle);
			phfeeInfo.setHalthFee(client.getMonthlyHalthFee() * cycle);
			phfeeInfo.setOtherFee(client.getMonthlyOtherFee() * cycle);
		}
		
		phfeeInfoDAO.save(phfeeInfo);
	}
	
	/**
	 * 判断数字是否是1位，否则在前面加0
	 * @param number
	 * @return
	 */
	private String addZero(int number){
		String str = number+"";
		if(str.length()<2){
			return "0"+str;
		}
		return str;
	}
	
	/**
	 * 计算一次性付款的月差
	 * @param client
	 * @return	总月数
	 * @throws ParseException 
	 */
	public int mothCalculate(Client client) throws ParseException{
		String startDate = client.getHlcRegStartDate();
		String endDate = client.getHlcRegEndDate();
		Date startTime = sdf.parse(startDate);
		Date endTime = sdf.parse(endDate);
		int countMonth = 0;
		
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(startTime);
		while (startTime.before(endTime)) {
			calendar.add(Calendar.MONTH, 1);
			countMonth++;
			startTime = calendar.getTime();
		}
		return countMonth;
	}

	public PhfeeInfoDAO getPhfeeInfoDAO() {
		return phfeeInfoDAO;
	}

	public void setPhfeeInfoDAO(PhfeeInfoDAO phfeeInfoDAO) {
		this.phfeeInfoDAO = phfeeInfoDAO;
	}


	
	
}
