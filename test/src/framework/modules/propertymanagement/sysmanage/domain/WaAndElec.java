package framework.modules.propertymanagement.sysmanage.domain;

import framework.sys.foreignkeytranslation.FK;
import framework.sys.foreignkeytranslation.Ref;

public class WaAndElec implements java.io.Serializable, Cloneable {
	private String pk = "";
	private String clientCode = "";
	private String hlccode = "";
	private String hlcbarCode = "";
	private String hlcfirstEnprName = "";
	@FK(ref = Ref.Organization)
	private String orgSysCode = "";
	private String hlcsecondEnprName = "";
	private String unitSysCode = "";
	private String unitName = "";
	private String unitAdress = "";
	private String lastElecDate = "";
	private String elecEndDate = "";
	private Double lastElecDegree = 0.00;
	private Double elecEndDegree = 0.00;
	private Double realElecDegree = 0.00;
	private Double shareElecDegree = 0.00;
	private Double chargeElecDegree = 0.00;
	private Double unitElecCost = 0.00;
	private Double receiElecCost = 0.00;
	private String lastWaterDate = "";
	private String waterEndDate = "";
	private Double lastWaterTon = 0.00;
	private Double waterEndTon = 0.00;
	private Double realWaterTon = 0.00;
	private Double shareWaterTon = 0.00;
	private Double chargeWaterTon = 0.00;
	private Double unitWaterCost = 0.00;
	private Double receiWaterCost = 0.00;
	private Double otherCost = 0.00;
	private Double waAndElecAmount = 0.00;
	private Double rentInfoMoney = 0.00;
	private String lister1 = "";
	private String listerDate1 = "";
	private Double realAmount = 0.00;
	@FK(ref = Ref.Classify)
	private String invoice = "";
	private String invoiceCode = "";
	@FK(ref = Ref.Classify)
	private String payType = "";
	private String realDate = "";
	private String paydperson = "";
	private String lister = "";
	@FK(ref = Ref.CustomHandle, customvalue = "SJZT_00,未收##SJZT_01,已收##SJZT_04,部分收款")
	private String checkFlag = "SJZT_00";
	private String remark1 = "";
	private String remark2 = "";
	private String ifAdjunct = "";
	private String inserttime = "";
	private String lastestUpdate = "";
	private String updatePerson = "";

	// 外键翻译
	private String orgSysCodeDisplay = "";
	private String invoiceDisplay = "";
	private String payTypeDisplay = "";
	private String checkFlagDisplay = "";
	

	public String getPk() {
		return pk;
	}

	public void setPk(String pk) {
		this.pk = pk;
	}

	public String getClientCode() {
		return clientCode;
	}

	public void setClientCode(String clientCode) {
		this.clientCode = clientCode;
	}

	public String getHlccode() {
		return hlccode;
	}

	public void setHlccode(String hlccode) {
		this.hlccode = hlccode;
	}

	public String getHlcbarCode() {
		return hlcbarCode;
	}

	public void setHlcbarCode(String hlcbarCode) {
		this.hlcbarCode = hlcbarCode;
	}

	public String getHlcfirstEnprName() {
		return hlcfirstEnprName;
	}

	public void setHlcfirstEnprName(String hlcfirstEnprName) {
		this.hlcfirstEnprName = hlcfirstEnprName;
	}

	public String getOrgSysCode() {
		return orgSysCode;
	}

	public void setOrgSysCode(String orgSysCode) {
		this.orgSysCode = orgSysCode;
	}

	public String getHlcsecondEnprName() {
		return hlcsecondEnprName;
	}

	public void setHlcsecondEnprName(String hlcsecondEnprName) {
		this.hlcsecondEnprName = hlcsecondEnprName;
	}

	public String getUnitSysCode() {
		return unitSysCode;
	}

	public void setUnitSysCode(String unitSysCode) {
		this.unitSysCode = unitSysCode;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public String getUnitAdress() {
		return unitAdress;
	}

	public void setUnitAdress(String unitAdress) {
		this.unitAdress = unitAdress;
	}

	public String getLastElecDate() {
		return lastElecDate;
	}

	public void setLastElecDate(String lastElecDate) {
		this.lastElecDate = lastElecDate;
	}

	public String getElecEndDate() {
		return elecEndDate;
	}

	public void setElecEndDate(String elecEndDate) {
		this.elecEndDate = elecEndDate;
	}

	public Double getLastElecDegree() {
		return lastElecDegree;
	}

	public void setLastElecDegree(Double lastElecDegree) {
		this.lastElecDegree = lastElecDegree;
	}

	public Double getElecEndDegree() {
		return elecEndDegree;
	}

	public void setElecEndDegree(Double elecEndDegree) {
		this.elecEndDegree = elecEndDegree;
	}

	public Double getRealElecDegree() {
		return realElecDegree;
	}

	public void setRealElecDegree(Double realElecDegree) {
		this.realElecDegree = realElecDegree;
	}

	public Double getShareElecDegree() {
		return shareElecDegree;
	}

	public void setShareElecDegree(Double shareElecDegree) {
		this.shareElecDegree = shareElecDegree;
	}

	public Double getChargeElecDegree() {
		return chargeElecDegree;
	}

	public void setChargeElecDegree(Double chargeElecDegree) {
		this.chargeElecDegree = chargeElecDegree;
	}

	public Double getUnitElecCost() {
		return unitElecCost;
	}

	public void setUnitElecCost(Double unitElecCost) {
		this.unitElecCost = unitElecCost;
	}

	public Double getReceiElecCost() {
		return receiElecCost;
	}

	public void setReceiElecCost(Double receiElecCost) {
		this.receiElecCost = receiElecCost;
	}

	public String getLastWaterDate() {
		return lastWaterDate;
	}

	public void setLastWaterDate(String lastWaterDate) {
		this.lastWaterDate = lastWaterDate;
	}

	public String getWaterEndDate() {
		return waterEndDate;
	}

	public void setWaterEndDate(String waterEndDate) {
		this.waterEndDate = waterEndDate;
	}

	public Double getLastWaterTon() {
		return lastWaterTon;
	}

	public void setLastWaterTon(Double lastWaterTon) {
		this.lastWaterTon = lastWaterTon;
	}

	public Double getWaterEndTon() {
		return waterEndTon;
	}

	public void setWaterEndTon(Double waterEndTon) {
		this.waterEndTon = waterEndTon;
	}

	public Double getRealWaterTon() {
		return realWaterTon;
	}

	public void setRealWaterTon(Double realWaterTon) {
		this.realWaterTon = realWaterTon;
	}

	public Double getShareWaterTon() {
		return shareWaterTon;
	}

	public void setShareWaterTon(Double shareWaterTon) {
		this.shareWaterTon = shareWaterTon;
	}

	public Double getChargeWaterTon() {
		return chargeWaterTon;
	}

	public void setChargeWaterTon(Double chargeWaterTon) {
		this.chargeWaterTon = chargeWaterTon;
	}

	public Double getUnitWaterCost() {
		return unitWaterCost;
	}

	public void setUnitWaterCost(Double unitWaterCost) {
		this.unitWaterCost = unitWaterCost;
	}

	public Double getReceiWaterCost() {
		return receiWaterCost;
	}

	public void setReceiWaterCost(Double receiWaterCost) {
		this.receiWaterCost = receiWaterCost;
	}

	public Double getOtherCost() {
		return otherCost;
	}

	public void setOtherCost(Double otherCost) {
		this.otherCost = otherCost;
	}

	public Double getWaAndElecAmount() {
		return waAndElecAmount;
	}

	public void setWaAndElecAmount(Double waAndElecAmount) {
		this.waAndElecAmount = waAndElecAmount;
	}

	public String getLister1() {
		return lister1;
	}

	public void setLister1(String lister1) {
		this.lister1 = lister1;
	}

	public String getListerDate1() {
		return listerDate1;
	}

	public void setListerDate1(String listerDate1) {
		this.listerDate1 = listerDate1;
	}

	public Double getRealAmount() {
		return realAmount;
	}

	public void setRealAmount(Double realAmount) {
		this.realAmount = realAmount;
	}

	public String getInvoice() {
		return invoice;
	}

	public void setInvoice(String invoice) {
		this.invoice = invoice;
	}

	public String getInvoiceCode() {
		return invoiceCode;
	}

	public void setInvoiceCode(String invoiceCode) {
		this.invoiceCode = invoiceCode;
	}

	public String getPayType() {
		return payType;
	}

	public void setPayType(String payType) {
		this.payType = payType;
	}

	public String getRealDate() {
		return realDate;
	}

	public void setRealDate(String realDate) {
		this.realDate = realDate;
	}

	public String getPaydperson() {
		return paydperson;
	}

	public void setPaydperson(String paydperson) {
		this.paydperson = paydperson;
	}

	public String getLister() {
		return lister;
	}

	public void setLister(String lister) {
		this.lister = lister;
	}

	public String getCheckFlag() {
		return checkFlag;
	}

	public void setCheckFlag(String checkFlag) {
		this.checkFlag = checkFlag;
	}

	public String getRemark1() {
		return remark1;
	}

	public void setRemark1(String remark1) {
		this.remark1 = remark1;
	}

	public String getRemark2() {
		return remark2;
	}

	public void setRemark2(String remark2) {
		this.remark2 = remark2;
	}

	public String getIfAdjunct() {
		return ifAdjunct;
	}

	public void setIfAdjunct(String ifAdjunct) {
		this.ifAdjunct = ifAdjunct;
	}

	public String getInserttime() {
		return inserttime;
	}

	public void setInserttime(String inserttime) {
		this.inserttime = inserttime;
	}

	public String getLastestUpdate() {
		return lastestUpdate;
	}

	public void setLastestUpdate(String lastestUpdate) {
		this.lastestUpdate = lastestUpdate;
	}

	public String getUpdatePerson() {
		return updatePerson;
	}

	public void setUpdatePerson(String updatePerson) {
		this.updatePerson = updatePerson;
	}

	public String getOrgSysCodeDisplay() {
		return orgSysCodeDisplay;
	}

	public void setOrgSysCodeDisplay(String orgSysCodeDisplay) {
		this.orgSysCodeDisplay = orgSysCodeDisplay;
	}

	public String getInvoiceDisplay() {
		return invoiceDisplay;
	}

	public void setInvoiceDisplay(String invoiceDisplay) {
		this.invoiceDisplay = invoiceDisplay;
	}

	public String getPayTypeDisplay() {
		return payTypeDisplay;
	}

	public void setPayTypeDisplay(String payTypeDisplay) {
		this.payTypeDisplay = payTypeDisplay;
	}

	public String getCheckFlagDisplay() {
		return checkFlagDisplay;
	}

	public void setCheckFlagDisplay(String checkFlagDisplay) {
		this.checkFlagDisplay = checkFlagDisplay;
	}

	public Double getRentInfoMoney() {
		return rentInfoMoney;
	}

	public void setRentInfoMoney(Double rentInfoMoney) {
		this.rentInfoMoney = rentInfoMoney;
	}
}
