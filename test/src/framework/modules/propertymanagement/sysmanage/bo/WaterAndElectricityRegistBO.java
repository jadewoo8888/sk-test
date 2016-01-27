package framework.modules.propertymanagement.sysmanage.bo;

import java.util.List;

import framework.core.sql.DBType;
import framework.modules.propertymanagement.sysmanage.dao.WaAndElectDAO;
import framework.modules.propertymanagement.sysmanage.domain.Client;
import framework.modules.propertymanagement.sysmanage.domain.WaAndElec;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.cache.SystemConfig;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;
@LogOperate(menu = "水电费登记")
public class WaterAndElectricityRegistBO extends BOBase<WaAndElectDAO, WaAndElec>{
	private ClientBO clientBO; 

	/**
	 * 新增水电费
	 * @param waAndElec
	 */
	@MethodID("createRegist")
	@LogOperate(operate = "新增水电费")
	public void createRegist_log_trans(WaAndElec waAndElec) {
		entityDAO.save(waAndElec);
		clientUpdate(waAndElec);
	}
	/**
	 * 删除水电费
	 * @param clientCode	客户编号	
	 * @return
	 */
	@MethodID("deleteRegist")
	@LogOperate(operate = "删除水电费")
	public String deleteRegist_log_trans(String clientCode) {
			//第一步，查出客户最新的水电费记录
			WaAndElec lastRegist = getLastRegist(clientCode);
			if(lastRegist == null){
				return "暂无数据，无法删除";
			}
			
			//第二步，判断该记录是否已收款，已收款则不能删除
			String checkFlag = lastRegist.getCheckFlag();
			if("SJZT_01".equals(checkFlag)){
				return "该客户已收款，不允许删除";
			}
			
			//第三步，假如通过第二步，则删除客户的水电费记录
			entityDAO.delete(lastRegist);
			WaAndElec lasetData = getLastRegist(clientCode);
			clientUpdate(lasetData);
			
		return "";
	}
	/**
	 * 更新水电费
	 * @param waAndElec
	 */
	@MethodID("updateRegist")
	@LogOperate(operate = "更新水电费")
	public void updateRegist_log_trans(WaAndElec waAndElec) {
		//第一步，执行水电费登记更新
		entityDAO.attachDirty(waAndElec);
		clientUpdate(waAndElec);
	}
	
	/**查出客户最新的水电费记录
	 * 
	 * @param clientcode	客户编号
	 * @return	最新水电费记录
	 */
	@MethodID("getLastRegist")
	public WaAndElec getLastRegist(String clientcode){
		String lastRegistSql = "";
		if (SystemConfig.getDBType() == DBType.SqlServer) {
			lastRegistSql = "select top 1 * from tWaAndElec where clientcode=? order by lastestupdate desc";
		} else {
			lastRegistSql = "select * from (select * from tWaAndElec where clientcode=? order by lastestupdate desc) where rownum=1";
		}
		return entityDAO.executeFindEntity(WaAndElec.class, lastRegistSql,clientcode);
	}
	
	//更新客戶表水電費
	public void clientUpdate(WaAndElec waAndElec){
		//第二步，重新将水电费对象中的电费截止日期、水费截止日期、本月电度数、本月水吨数设置到客户信息对象中的上次查表电日期、上次查水表日期、上月电度数、上月水吨数
		List<Client> clientList = clientBO.findByProperty("clientCode", waAndElec.getClientCode());
		Client client = clientList.get(0);
		client.setLastWaterDate(waAndElec.getWaterEndDate());
		client.setLastElecDate(waAndElec.getElecEndDate());
		client.setLastElecDegree(waAndElec.getElecEndDegree());
		client.setLastWaterDegree(waAndElec.getWaterEndTon());
		//执行更新
		clientBO.updateClient_log_trans(client);
	}
	
	
	public ClientBO getClientBO() {
		return clientBO;
	}
	public void setClientBO(ClientBO clientBO) {
		this.clientBO = clientBO;
	}
}
