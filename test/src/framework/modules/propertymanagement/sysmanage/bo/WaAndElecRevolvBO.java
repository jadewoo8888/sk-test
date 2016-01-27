package framework.modules.propertymanagement.sysmanage.bo;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import framework.core.sql.DBType;
import framework.modules.append.bo.AppendBO;
import framework.modules.append.bo.AppendBusinessType;
import framework.modules.append.domain.Append;
import framework.modules.propertymanagement.sysmanage.dao.ClientDAO;
import framework.modules.propertymanagement.sysmanage.dao.WaAndWlecRevolvDAO;
import framework.modules.propertymanagement.sysmanage.domain.Client;
import framework.modules.propertymanagement.sysmanage.domain.WaAndElecRevolv;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.cache.SystemConfig;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.foreignkeytranslation.FKOper;
import framework.sys.log.LogOperate;

@LogOperate(menu = "水电周转金管理")
public class WaAndElecRevolvBO extends
		BOBase<WaAndWlecRevolvDAO, WaAndElecRevolv> {
	private ClientDAO clientDAO;
	private AppendBO appendBO;

	public ClientDAO getClientDAO() {
		return clientDAO;
	}

	public void setClientDAO(ClientDAO clientDAO) {
		this.clientDAO = clientDAO;
	}

	public AppendBO getAppendBO() {
		return appendBO;
	}

	public void setAppendBO(AppendBO appendBO) {
		this.appendBO = appendBO;
	}

	/**
	 * 水电周转金退款功能
	 * 
	 * @param pk
	 * @param retLister
	 */
	@MethodID("retWaAndElecRevolv")
	@LogOperate(operate = "退款")
	public String retMoneyWaAndElecRevolv__log_trans(String pk, String retLister) {
		String return_tips = "";
		// 第一步：根据pk找出客户对象client,将客户表周转金设置为0，并保存
		// 客户表周转金设置为0
		Client client = clientDAO.findById(pk);
		client.setWaAndElecRevolv(0.00);
		clientDAO.attachDirty(client);
		// 第二步：根据客户对象clientcode的属性 clientCode值找出周转金对象revolv
		WaAndElecRevolv revolv = getLastRegist(client.getClientCode());
		// 第三部：保存周转金属性值
		if (revolv == null) {
			return_tips = "没有水电周转金！";
			return return_tips;
		}
		// 记录退款人
		revolv.setRetLister(retLister);
		// 记录退款时间
		Date currentTime = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String dateString = formatter.format(currentTime);
		revolv.setRetDate(dateString);
		// 记录保证金状态
		revolv.setCheckFlag("SJZT_02");
		entityDAO.attachDirty(revolv);
		return return_tips;
	}

	/**
	 * 水电周转金收款功能
	 * 
	 * @param revolv
	 */
	@MethodID("receivingWaAndElecRevolv")
	@LogOperate(operate = "收款")
	public String getMoneyWaAndElecRevolv__log_trans(WaAndElecRevolv revolv,
			List<Append> appendList) {
		// 第一步：根据clientCode找出客户对象client
		String return_tips = "";
		Client client = getClientByClientCode(revolv.getClientCode());
		// 第二步：修改周转金的周转金属性值,并保存。
		client.setWaAndElecRevolv(revolv.getWaAndElecRevolv());
		clientDAO.attachDirty(client);
		// 第三步：将周转金状态设置为收款状态，并保存
		revolv.setCheckFlag("SJZT_01");
		String mainpk = UUID.randomUUID().toString();
		revolv.setPk(mainpk);
		entityDAO.save(revolv);
		appendBO.processAppend(appendList, mainpk,
				AppendBusinessType.TYYWLX_012, revolv.getOrgSysCode());
		return return_tips;
	}

	/**
	 * 修改水电周转金
	 * 
	 * @param revolv
	 */
	@MethodID("updateWaAndElecRevolv")
	@LogOperate(operate = "修改")
	public String updateWaAndElecRevolv__log_trans(WaAndElecRevolv revolv,
			List<Append> appendList) {
		// 第一步：根据clientCode找出客户对象client,修改周转金值，并保存
		String return_tips = "";
		// 设置客户表周转金
		Client client = getClientByClientCode(revolv.getClientCode());
		client.setWaAndElecRevolv(revolv.getWaAndElecRevolv());
		clientDAO.attachDirty(client);
		// 第二步：保存周转金对象和附件对象
		entityDAO.attachDirty(revolv);

		appendBO.processAppend(appendList, revolv.getPk(),
				AppendBusinessType.TYYWLX_012, revolv.getOrgSysCode());
		return return_tips;
	}

	/**
	 * 获取最近的水电周转对象WaAndElecRevolv
	 * 
	 * @param clientcode
	 * @return
	 */
	public WaAndElecRevolv getLastRegist(String clientcode) {
		String lastRegistSql = "";
		if (SystemConfig.getDBType() == DBType.SqlServer) {
			lastRegistSql = "select top 1 * from tWaAndElecRevolv where clientcode=? order by lastestupdate desc";
		} else {
			lastRegistSql = "select * from (select * from tWaAndElecRevolv where clientcode=? order by lastestupdate desc) where rownum=1";
		}
		WaAndElecRevolv revolv = entityDAO.executeFindEntity(
				WaAndElecRevolv.class, lastRegistSql, clientcode);
		if (revolv == null) {
			return null;
		} else {
			FKOper.getInstance().setDisplay(revolv);
			return revolv;
		}

	}

	/**
	 * 获取最近的水电周转对象WaAndElecRevolv 和 是否代收水电费 ifCollection字段值
	 * 
	 * @param clientcode
	 * @return
	 */

	@MethodID("getLastWaAndWlecRevolv")
	public Map<String, Object> getLastRegistAndCheckFlag(String clientcode) {
		Map<String, Object> revolvmap = new HashMap<String, Object>();
		// 第一步：根据clientCode获取周转金对象，保存在map中
		WaAndElecRevolv revolv = getLastRegist(clientcode);
		revolvmap.put("WaAndElecRevolv", revolv);
		// 第二步：根据clientCode查出客户对象，保存是否代交水电费属性ifCollection
		String ifCollection = getIfCollection(clientcode);
		revolvmap.put("ifCollection", ifCollection);
		// 第三步：并返回map.
		return revolvmap;

	}

	public String getIfCollection(String clientcode) {
		Client client = getClientByClientCode(clientcode);
		if (client == null) {
			return null;
		}
		return client.getIfCollection();

	}

	/**
	 * 根据clientcode获取client对象
	 * 
	 * @param clientcode
	 * @return
	 */
	public Client getClientByClientCode(String clientcode) {

		String sql = "select * from tClient where clientcode=? ";

		return entityDAO.executeFindEntity(Client.class, sql, clientcode);
	}

}
