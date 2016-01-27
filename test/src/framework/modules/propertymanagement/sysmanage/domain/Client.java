package framework.modules.propertymanagement.sysmanage.domain;

import framework.sys.foreignkeytranslation.FK;
import framework.sys.foreignkeytranslation.Ref;

public class Client implements java.io.Serializable, Cloneable {
	private String pk = "";
	private String clientCode = "";
	private String hlcCode = "";
	private String hlcBarCode = "";
	private String hlcFirstEnprName = "";
	@FK(ref = Ref.Organization)
	private String orgSysCode = "";
	private String hlcSecondEnprName = "";
	private String unitSysCode = "";
	private String unitName = "";
	private String unitAdress = "";
	private Double lastWaterDegree = 0.00;
	private Double lastElecDegree = 0.00;
	private String lastWaterDate = "";
	private String lastElecDate = "";
	private String hlcSecondtTel = "";
	private String ifCollection = "";
	private String lister = "";
	private String listDate = "";
	private String remark = "";
	private Double waAndElecRevolv = 0.00;
	private String oweTimes = "";
	private String ifAdjunct = "";
	@FK(ref = Ref.Classify)
	private String unitPurpose = "";
	private String linker = "";
	private String ifHealthFee = "";
	@FK(ref = Ref.CustomHandle, customvalue = "0,正常##1,已注销")
	private String clientStatus = "";
	private Double unitArea = 0.00;
	private String hlcRegEndDate = "";
	private String hlcRegStartDate = "";
	private Double perSquareHalthFee = 0.00;
	private Double monthlyHalthFee = 0.00;
	private Double monthlyOtherFee = 0.00;
	private Double monthlyPayableFee = 0.00;
	@FK(ref = Ref.Classify)
	private String paymentcycle = "";
	private String propertyHealthLister = "";
	private String propertyHealthListDate = "";
	private String propertyHealthRemark = "";
	private String inserttime = "";
	private String lastestUpdate = "";
	private String updatePerson = "";

	// 外键翻译
	private String orgSysCodeDisplay = "";
	private String clientStatusDisplay = "";
	private String unitPurposeDisplay = "";
	private String paymentcycleDisplay = "";
	
	//特殊字段，显示使用
	private int arrearsTimes = 0;
	private Double arrearsTotal = 0.00;
	
	public String getUnitPurpose() {
		return unitPurpose;
	}

	public void setUnitPurpose(String unitPurpose) {
		this.unitPurpose = unitPurpose;
	}

	public String getUnitPurposeDisplay() {
		return unitPurposeDisplay;
	}

	public void setUnitPurposeDisplay(String unitPurposeDisplay) {
		this.unitPurposeDisplay = unitPurposeDisplay;
	}

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

	public String getOrgSysCode() {
		return orgSysCode;
	}

	public void setOrgSysCode(String orgSysCode) {
		this.orgSysCode = orgSysCode;
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

	public String getLastWaterDate() {
		return lastWaterDate;
	}

	public void setLastWaterDate(String lastWaterDate) {
		this.lastWaterDate = lastWaterDate;
	}

	public String getLastElecDate() {
		return lastElecDate;
	}

	public void setLastElecDate(String lastElecDate) {
		this.lastElecDate = lastElecDate;
	}

	public String getIfCollection() {
		return ifCollection;
	}

	public void setIfCollection(String ifCollection) {
		this.ifCollection = ifCollection;
	}

	public String getLister() {
		return lister;
	}

	public void setLister(String lister) {
		this.lister = lister;
	}

	public String getListDate() {
		return listDate;
	}

	public void setListDate(String listDate) {
		this.listDate = listDate;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Double getWaAndElecRevolv() {
		return waAndElecRevolv;
	}

	public void setWaAndElecRevolv(Double waAndElecRevolv) {
		this.waAndElecRevolv = waAndElecRevolv;
	}

	public String getOweTimes() {
		return oweTimes;
	}

	public void setOweTimes(String oweTimes) {
		this.oweTimes = oweTimes;
	}

	public String getIfAdjunct() {
		return ifAdjunct;
	}

	public void setIfAdjunct(String ifAdjunct) {
		this.ifAdjunct = ifAdjunct;
	}

	public String getLinker() {
		return linker;
	}

	public void setLinker(String linker) {
		this.linker = linker;
	}

	public String getIfHealthFee() {
		return ifHealthFee;
	}

	public void setIfHealthFee(String ifHealthFee) {
		this.ifHealthFee = ifHealthFee;
	}

	public String getClientStatus() {
		return clientStatus;
	}

	public void setClientStatus(String clientStatus) {
		this.clientStatus = clientStatus;
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

	public String getClientStatusDisplay() {
		return clientStatusDisplay;
	}

	public void setClientStatusDisplay(String clientStatusDisplay) {
		this.clientStatusDisplay = clientStatusDisplay;
	}

	public String getHlcCode() {
		return hlcCode;
	}

	public void setHlcCode(String hlcCode) {
		this.hlcCode = hlcCode;
	}

	public String getHlcBarCode() {
		return hlcBarCode;
	}

	public void setHlcBarCode(String hlcBarCode) {
		this.hlcBarCode = hlcBarCode;
	}

	public String getHlcFirstEnprName() {
		return hlcFirstEnprName;
	}

	public void setHlcFirstEnprName(String hlcFirstEnprName) {
		this.hlcFirstEnprName = hlcFirstEnprName;
	}

	public String getHlcSecondEnprName() {
		return hlcSecondEnprName;
	}

	public void setHlcSecondEnprName(String hlcSecondEnprName) {
		this.hlcSecondEnprName = hlcSecondEnprName;
	}

	public String getHlcSecondtTel() {
		return hlcSecondtTel;
	}

	public void setHlcSecondtTel(String hlcSecondtTel) {
		this.hlcSecondtTel = hlcSecondtTel;
	}

	public Double getLastWaterDegree() {
		return lastWaterDegree;
	}

	public void setLastWaterDegree(Double lastWaterDegree) {
		this.lastWaterDegree = lastWaterDegree;
	}

	public Double getLastElecDegree() {
		return lastElecDegree;
	}

	public void setLastElecDegree(Double lastElecDegree) {
		this.lastElecDegree = lastElecDegree;
	}

	public Double getUnitArea() {
		return unitArea;
	}

	public void setUnitArea(Double unitArea) {
		this.unitArea = unitArea;
	}

	public String getHlcRegEndDate() {
		return hlcRegEndDate;
	}

	public void setHlcRegEndDate(String hlcRegEndDate) {
		this.hlcRegEndDate = hlcRegEndDate;
	}

	public String getHlcRegStartDate() {
		return hlcRegStartDate;
	}

	public void setHlcRegStartDate(String hlcRegStartDate) {
		this.hlcRegStartDate = hlcRegStartDate;
	}

	public Double getPerSquareHalthFee() {
		return perSquareHalthFee;
	}

	public void setPerSquareHalthFee(Double perSquareHalthFee) {
		this.perSquareHalthFee = perSquareHalthFee;
	}

	public Double getMonthlyHalthFee() {
		return monthlyHalthFee;
	}

	public void setMonthlyHalthFee(Double monthlyHalthFee) {
		this.monthlyHalthFee = monthlyHalthFee;
	}

	public Double getMonthlyOtherFee() {
		return monthlyOtherFee;
	}

	public void setMonthlyOtherFee(Double monthlyOtherFee) {
		this.monthlyOtherFee = monthlyOtherFee;
	}

	public Double getMonthlyPayableFee() {
		return monthlyPayableFee;
	}

	public void setMonthlyPayableFee(Double monthlyPayableFee) {
		this.monthlyPayableFee = monthlyPayableFee;
	}

	public String getPaymentcycle() {
		return paymentcycle;
	}

	public void setPaymentcycle(String paymentcycle) {
		this.paymentcycle = paymentcycle;
	}

	public String getPropertyHealthLister() {
		return propertyHealthLister;
	}

	public void setPropertyHealthLister(String propertyHealthLister) {
		this.propertyHealthLister = propertyHealthLister;
	}

	public String getPropertyHealthListDate() {
		return propertyHealthListDate;
	}

	public void setPropertyHealthListDate(String propertyHealthListDate) {
		this.propertyHealthListDate = propertyHealthListDate;
	}

	public String getPropertyHealthRemark() {
		return propertyHealthRemark;
	}

	public void setPropertyHealthRemark(String propertyHealthRemark) {
		this.propertyHealthRemark = propertyHealthRemark;
	}

	public String getPaymentcycleDisplay() {
		return paymentcycleDisplay;
	}

	public void setPaymentcycleDisplay(String paymentcycleDisplay) {
		this.paymentcycleDisplay = paymentcycleDisplay;
	}

	public void setArrearsTimes(int arrearsTimes) {
		this.arrearsTimes = arrearsTimes;
	}

	public int getArrearsTimes() {
		return arrearsTimes;
	}

	public void setArrearsTotal(Double arrearsTotal) {
		this.arrearsTotal = arrearsTotal;
	}

	public Double getArrearsTotal() {
		return arrearsTotal;
	}

}
