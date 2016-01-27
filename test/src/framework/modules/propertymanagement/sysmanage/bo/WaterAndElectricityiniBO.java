package framework.modules.propertymanagement.sysmanage.bo;

import framework.modules.propertymanagement.sysmanage.dao.ClientDAO;
import framework.modules.propertymanagement.sysmanage.domain.Client;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;

@LogOperate(menu = "物业管理水电费设置")
public class WaterAndElectricityiniBO extends BOBase<ClientDAO, Client> {

	@MethodID("setWaterAndElectricityini")
	@LogOperate(operate = "水电初始化设置")
	public void setWaterAndElectricityini_log_trans(Client client) {
		entityDAO.attachDirty(client);
		
	}

}
