package framework.modules.propertymanagement.accountreceivablemanage.bo;

import java.util.List;

import framework.modules.append.bo.AppendBO;
import framework.modules.append.bo.AppendBusinessType;
import framework.modules.append.domain.Append;
import framework.modules.propertymanagement.sysmanage.dao.WaAndElectDAO;
import framework.modules.propertymanagement.sysmanage.domain.WaAndElec;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.log.LogOperate;
import framework.sys.log.LogOperateManager;
@LogOperate(menu = "水电费管理")
public class WaterAndElectricManageBO extends BOBase<WaAndElectDAO, WaAndElec>{
	private AppendBO appendBO;
	
	/**
	 * 更新水电费
	 * @param waAndElec
	 * @return 返回信息，返回空为成功，失败会返回失败信息
	 */
	@MethodID("updateWAE")
	@LogOperate(operate = "水电费收款")
	public String updateWAE_log_trans(WaAndElec waAndElec,List<Append> appendList) {
		Double realAmount = waAndElec.getRealAmount();//实收
		Double waAndElecAmount = waAndElec.getWaAndElecAmount();//应收
		Double rentInfoMoney = waAndElec.getRentInfoMoney();
		Double totalAmoun = waAndElecAmount - rentInfoMoney;
		/** 第一步：根据实收金额与应收总额大小设置状态 **/
		if(realAmount == totalAmoun){
			waAndElec.setCheckFlag("SJZT_01");
		}else if(realAmount < totalAmoun){
			waAndElec.setCheckFlag("SJZT_04");
		}else if(realAmount == 0 || realAmount > totalAmoun){
			LogOperateManager.unlog();
			return "实收金额不能为0或大于应收总额-减免金额";
		}
		entityDAO.attachDirty(waAndElec);
		/** 第二步：保存附件信息 **/
		appendBO.processAppend(appendList, waAndElec.getPk(), AppendBusinessType.TYYWLX_011, waAndElec.getOrgSysCode());
		return "";
	}
	
	public AppendBO getAppendBO() {
		return appendBO;
	}
	public void setAppendBO(AppendBO appendBO) {
		this.appendBO = appendBO;
	}
	

}
