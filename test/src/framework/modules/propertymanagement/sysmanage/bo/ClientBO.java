package framework.modules.propertymanagement.sysmanage.bo;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.hibernate.transform.Transformers;

import framework.core.sql.QueryCondition;
import framework.core.sql.QueryConditionAssembler;
import framework.modules.append.bo.AppendBO;
import framework.modules.append.bo.AppendBusinessType;
import framework.modules.append.domain.Append;
import framework.modules.propertymanagement.sysmanage.dao.ClientDAO;
import framework.modules.propertymanagement.sysmanage.domain.Client;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.basemodule.bo.ListForPageBean;
import framework.sys.cache.GlobalCache;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.foreignkeytranslation.FKOper;
import framework.sys.log.LogOperate;
import framework.sys.tools.DBOperation;

@LogOperate(menu = "客户管理")
public class ClientBO extends BOBase<ClientDAO, Client> {
	private AppendBO appendBO;
	/**
	 * 新增保存客户信息,保存前会校验物业编号唯一性
	 * 
	 * @param client
	 *            客户信息
	 * @param appendList
	 *            附件信息集合
	 * @return
	 */
	@MethodID("addNewClient")
	@LogOperate(operate = "新增客户信息")
	public String addNewClient_log_trans(Client client, List<Append> appendList) {
		String returnTips = "";

		/** 第一步：如果客户填写客户编号，检查唯一性，检查不唯一返回，否进入下一步，没有填写系统生成 * */
		String clientCode=client.getClientCode();
		if(!clientCode.equals("")){
			returnTips = checkUnitCodeExists(clientCode, client.getOrgSysCode());
			if (!returnTips.equals("")) {
				return returnTips;
			}
		}else{
			client.setClientCode(GlobalCache.getBusinBillNoFactoryService().getKHDJNo(client.getOrgSysCode()));
		}
		/** 第二步：设置默认值,并保存* */
		// 主键uuid
		String mainpk = UUID.randomUUID().toString();
		client.setPk(mainpk);
		//客户状态
		client.setClientStatus("0");

		entityDAO.save(client);

		/** 第三步：保存附件信息 * */
		appendBO.processAppend(appendList, mainpk, AppendBusinessType.TYYWLX_010, client.getOrgSysCode());

		return returnTips;
	}
	
	/**
	 * 修改客户信息，保存前会校验客户编号唯一性
	 * 
	 * 
		@param client
	 *            客户信息
	 * @param appendList
	 *            附件信息集合
	 * @return
	 */
	@MethodID("modifyClient")
	@LogOperate(operate = "修改客户信息")
	public String modifyClient_log_trans(Client client, List<Append> appendList) {
		String returnTips = "";

		/** 第一步：判断与原登记信息的客户编号是否一致，若不一致则检查新客户编号唯一性 * */
		Client oldHouseUnit = entityDAO.findById(client.getPk());
		if (!client.getClientCode().equals(oldHouseUnit.getClientCode())) {
			returnTips = checkUnitCodeExists(client.getClientCode(), client.getOrgSysCode());
			if (!returnTips.equals("")) {
				return returnTips;
			}
		}

		/** 第二步：保存 客户信息 * */
		entityDAO.merge(client);

		/** 第三步：保存附件信息 * */
		appendBO.processAppend(appendList, client.getPk(), AppendBusinessType.TYYWLX_010, client.getOrgSysCode());

		return returnTips;
	}
	
	/**
	 * 删除客户信息，同时删除相应的附件信息。删除前会检查当前客户是否存在水电费记录或已收款的物业卫生费，是则返回提示语句
	 * 
	 * @param clientList
	 *            待删除的客户信息集合
	 * 
	 * @return 若成功执行删除操作，则返回空字符串，否则返回提示语句
	 */
	@MethodID("deleteClient")
	@LogOperate(operate = "删除客户信息")
	public String deleteClient_log_trans(List<Client> clientList) {
		String return_tips = "";
		if (clientList == null || clientList.size() == 0) {
			return "请选择删除记录";
		}

		/** 第一步：组装pk * */
		int clientListLen = clientList.size();
		String[] pkArr = new String[clientListLen];
		for (int i = 0; i < clientListLen; i++) {
			pkArr[i] = clientList.get(i).getPk();
		}

		/** 第二步：检查是否存在水电费记录或已收款的物业卫生费，有则返回提示语句 * */
		return_tips = checkBeforeDelete(pkArr);
		if (!return_tips.equals("")) {
			return return_tips;
		}

		/** 第三步：删除客户信息，及相应附件信息 * */	
		/** 根据客户信息pk，删除客户信息及相关附件信息 * */
		if (pkArr.length > 0) {
			String deleteMainSql = "delete from tClient where pk in (:pkArr)";
			
			List<String> paramName = new ArrayList<String>();
			paramName.add("pkArr");
			List<Object> paramValue = new ArrayList<Object>();
			paramValue.add(pkArr);
			
			entityDAO.executeSql(deleteMainSql,paramName,paramValue);
			appendBO.deleteAppendByBusinessCode(pkArr, AppendBusinessType.TYYWLX_002);
		}

		return return_tips;
	}
	
	/**
	 * 注销客户信息，将客户状态字段更新为已注销
	 * 
	 * @param pkArr
	 *            待注销的客户信息主键数组
	 * 
	 * @return
	 */
	@MethodID("writeoffClient")
	@LogOperate(operate = "注销客户")
	public void writeoffClient_log_trans(String[] clientPKArr) {
		if (clientPKArr == null || clientPKArr.length == 0) {
			return;
		}
		
		if (clientPKArr.length > 0) {
			String[] updateInfo = DBOperation.getUpdateInfo();
			String sqlStr = "update tClient set ClientStatus = '1' ,LastestUpdate = :lastestUpdate ,UpdatePerson = :updatePerson  where pk in ( :pkArr )";
			
			List<String> paramName = new ArrayList<String>();
			paramName.add("lastestUpdate");
			paramName.add("updatePerson");
			paramName.add("pkArr");
			List<Object> paramValue = new ArrayList<Object>();
			paramValue.add(updateInfo[0]);
			paramValue.add(updateInfo[1]);
			paramValue.add(clientPKArr);
			
			entityDAO.executeSql(sqlStr,paramName,paramValue);
		}
	}
	
	/**
	 * 撤销注销客户，将客户状态字段更新为使用中
	 * 
	 * @param pkArr
	 *            待撤销注销的客户信息主键数组
	 * 
	 * @return
	 */
	@MethodID("unWriteoffClient")
	@LogOperate(operate = "撤销注销客户")
	public void unWriteoffClient_log_trans(String[] clientPKArr) {
		if (clientPKArr == null || clientPKArr.length == 0) {
			return;
		}
		String mainPkInSql = DBOperation.mosaicInStrSql(clientPKArr);
		if (mainPkInSql.length() > 0) {
			String[] updateInfo = DBOperation.getUpdateInfo();
			String sqlStr = "update tClient set ClientStatus = '0',LastestUpdate = :lastestUpdate , UpdatePerson = :updatePerson where pk in (:pkArr)";
			
			List<String> paramName = new ArrayList<String>();
			paramName.add("lastestUpdate");
			paramName.add("updatePerson");
			paramName.add("pkArr");
			List<Object> paramValue = new ArrayList<Object>();
			paramValue.add(updateInfo[0]);
			paramValue.add(updateInfo[1]);
			paramValue.add(clientPKArr);
			
			entityDAO.executeSql(sqlStr,paramName,paramValue);
		}
	}
	
	/**
	 * 检查物业编号是否存在。并返回检查结果语句
	 * 
	 * @param unitCode
	 *            物业编号
	 * @param orgSysCode
	 *            物业所属单位内部编号
	 * @return 空字符串标识不存在数据库中，否则为提示语句
	 */
	@MethodID("checkUnitCodeExists")
	public String checkUnitCodeExists(String clientCode, String orgSysCode) {
		String return_tips = "";
		String strSql = "select count(*) from tClient where  OrgSysCode = ? and  ClientCode = ? ";
		
		BigDecimal count = (BigDecimal) entityDAO.executeFindUnique(strSql, orgSysCode, clientCode);
		if (count.intValue() != 0) {
			return_tips = "当前单位此物业编号已存在！";
		}
		return return_tips;
	}
	
	/**
	 * 删除前检查,检查是否存在水电费记录,水电周转金明细查询或已收款的物业卫生费
	 * 
	 * @param pkArr
	 *            待删除的物业登记信息主键数组
	 * 
	 * @return
	 */
	@MethodID("checkBeforeDelete")
	public String checkBeforeDelete(String[] pkArr) {
		String return_tips = "";
		if (pkArr == null || pkArr.length == 0) {
			return "";
		}
		//检查是否存在水电周转金	
		String strSql = "select count(*) from tWaAndElecRevolv where ClientCode in (:pkArr)";
		
		List<String> paramName = new ArrayList<String>();
		paramName.add("pkArr");
		List<Object> paramValue = new ArrayList<Object>();
		paramValue.add(pkArr);		
		BigDecimal count = (BigDecimal) entityDAO.executeFindUnique(strSql,paramName,paramValue);
		
		if (count.intValue() == 0) {
			//检查是存在水电费记录
			strSql = "select count(*) from tWaAndElec where ClientCode in (:pkArr)";
			
			count = (BigDecimal) entityDAO.executeFindUnique(strSql,paramName,paramValue);
			if (count.intValue() != 0) {
				return_tips = "客户有水电费记录，不允许删除";
			}
		} else {
			return_tips = "客户有水电周转金，不允许删除";
		}

		
		return return_tips;
	}
	
	/**
	 * 删除前检查,检查是否存在水电费记录,水电周转金明细查询或已收款的物业卫生费
	 * 
	 * @param pkArr
	 *            待删除的物业登记信息主键数组
	 * 
	 * @return
	 */
	@MethodID("updateClient")
	@LogOperate(operate = "更新客户信息")
	public String updateClient_log_trans(Client client) {
		String return_tips = "";
		entityDAO.merge(client);
		return return_tips;
	}
	
	@MethodID("getListForPageClient")
	public ListForPageBean getListForPageClient(final int pageNumber, final int pageSize, final List<QueryCondition> queryCond, final String sortCond) {
		ListForPageBean listForPageBean = new ListForPageBean();
		QueryConditionAssembler assembler = getQueryConditionAssembler(queryCond, sortCond);
		int totalCount = entityDAO.getTotalCountForPage(assembler);
		List<Client> rowList = null;
		if (totalCount > 0) {
		
		   String[] updateInfo = DBOperation.getUpdateInfo();
		   rowList = entityDAO.getListForPage(" * ", pageNumber, pageSize, assembler);
			
		   String[]  ClientCodes = new String[rowList.size()];		   
		   
	       for(int i = 0; i < rowList.size(); i++){ 
	    	   ClientCodes[i] = ((Client)rowList.get(i)).getClientCode() ;   
	        }
	        
			//检查是存在水电费记录
       	   Map<String,Object> params = new HashMap<String, Object>();
       	   
	       if(ClientCodes.length>0){
	        	String strSql =this.getStaticAccountSQL();
	        	
	    		List<String> paramName = new ArrayList<String>();
	    		paramName.add("date");
	    		paramName.add("ClientCodes");
	    		List<Object> paramValue = new ArrayList<Object>();
	    		paramValue.add(updateInfo[0]);
	    		paramValue.add(ClientCodes);			    		 
	    		List<?> list =entityDAO.executeFind(strSql,paramName,paramValue);
	        	
	        	for(int i = 0; i < list.size(); i++){
	        		Object[]  obj = (Object[]) list.get(i);        		
		        	params.put(obj[2].toString(),new String[]{obj[0].toString(),obj[1].toString()});     	
	        	}
	        }				       
	       
	       for(int i = 0; i < rowList.size(); i++)  
	        {   
	    	   String[] param=(String[]) params.get(((Client)rowList.get(i)).getClientCode());  
	    	   if(param==null){
	    		   param=new String[]{"0","0"};
	    	   }
	    	   ((Client)rowList.get(i)).setArrearsTimes(Integer.parseInt(param[0]));
	    	   ((Client)rowList.get(i)).setArrearsTotal(Double.parseDouble(param[1])); 
	        }
	       
		}
		FKOper.getInstance().setDisplay(rowList);		
		listForPageBean.setTotal(totalCount);
		listForPageBean.setRows(rowList);
		
		return listForPageBean;
	}
	//返回欠费笔数,欠费 总额查询
	public String getStaticAccountSQL(){
		String sql="select (case when rentCount is null then 0 else rentCount end) + "+
						  "(case when elec_waterCount is null then 0 else elec_waterCount end) + "+
						  "(case when feeCount is null then  0  else  feeCount end) as COUNTQ, "+
						  "(case  when rentMoney is null then 0  else rentMoney  end) +  "+
						  "(case when elec_waterMoney is null then 0  else elec_waterMoney end) + "+
						  "(case  when feeMoney is null then 0 else feeMoney  end) as TOTALMONEY, "+
						  "tc.clientcode as CLIENTCODE "+
				   "from tclient tc "+
				   "left join (select count(*) as rentCount, "+
		                    		 "sum((case when HLCRentInfoReceiveRent is null then 0 else HLCRentInfoReceiveRent end) +  "+
		                    			 "(case when HLCRentInfoOtherIn is null then 0 else  HLCRentInfoOtherIn end) -  "+
		                    			 "(case when HLCRentInfoMoney is null then 0 else HLCRentInfoMoney end) -  "+
		                    			 "(case when HLCRentInfoRealRecRent is null then 0 else HLCRentInfoRealRecRent end)) as rentMoney, "+
		                    		 "HLCRentInfoContractCode "+
		                      "from tHLCRentInfo "+
		                      "where HLCRentInfoReceiveDate < :date "+
		                      "group by HLCRentInfoContractCode) t1  "+
		           "on (tc.clientcode =  t1.HLCRentInfoContractCode) "+
		  		   "left join (select count(*) as elec_waterCount , "+
		  				   			 "sum((case when ReceiWaterCost is null then 0 else ReceiWaterCost end) -  "+
		  				   				 "(case when RentInfoMoney is null then 0 else  RentInfoMoney end) -  "+
		  				   				 "(case  when RealAmount is null then 0 else RealAmount   end)) as elec_waterMoney, "+
		  				   			 "ClientCode as c2 "+
		  				   	  "from tWaAndElec "+
		  				   	  "where CheckFlag in ('SJZT_00', 'SJZT_04') "+
		              		  "group by ClientCode)  "+
				   "on (tc.clientcode = c2) "+
				   "left join (select count(*) as feeCount, "+
		                    		 "sum((case when ReceiveRent is null then 0 else ReceiveRent  end) -  "+
		                    			 "(case  when RealRecRent is null then 0 else  RealRecRent end)) as feeMoney, "+
		                    		 "ClientCode as c3 "+
		                      "from tPHFeeInfo "+
		                      "where ReceiveDate < :date "+
		                      "and CheckFlag in ('SJZT_00', 'SJZT_02', 'SJZT_04') "+
		              			"group by ClientCode)  "+
				   "on (c2 = c3) "+
				   "where tc.clientcode in ( :ClientCodes)";
					
		
		return sql;
	}
	public AppendBO getAppendBO() {
		return appendBO;
	}

	public void setAppendBO(AppendBO appendBO) {
		this.appendBO = appendBO;
	}
	
}
