package framework.modules.propertymanagement.accountreceivablemanage.domain;

import framework.sys.foreignkeytranslation.FK;
import framework.sys.foreignkeytranslation.Ref;

public class V_RentMargin implements java.io.Serializable, Cloneable{
	
	private String rentMarginPk = "";
	private String hlcpk = "";
	private String hlcCode = "";
	private String hlcBarCode = "";
	private String unitAdress = "";
	private String hlcSecondEnprName = "";
	private Double hlcDeposit = 0.00;
	private Double realMargin = 0.00;
	@FK(ref = Ref.CustomHandle, customvalue = "SJZT_01,执行中##SJZT_02,已中止##SJZT_03,已终止")
	private String hlcCheckFlag = "";	
	@FK(ref = Ref.CustomHandle, customvalue = "SJZT_00,未收##SJZT_01,已收##SJZT_02,已退")
	private String marginCheckFlag = "";
	private String hlcFirstEnprCode = "";
	private String hlcFirstEnprDisCode = "";
	private String unitSysCode = "";
	private String updatePerson = "";
	private String lastestUpdate = "";
	
	
	// 外检翻译
	private String hlcCheckFlagDisplay = "";
	private String marginCheckFlagDisplay = "";
	
	public String getHlcpk() {
		return hlcpk;
	}
	public void setHlcpk(String hlcpk) {
		this.hlcpk = hlcpk;
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
	public String getUnitAdress() {
		return unitAdress;
	}
	public void setUnitAdress(String unitAdress) {
		this.unitAdress = unitAdress;
	}
	public String getHlcSecondEnprName() {
		return hlcSecondEnprName;
	}
	public void setHlcSecondEnprName(String hlcSecondEnprName) {
		this.hlcSecondEnprName = hlcSecondEnprName;
	}
	public Double getHlcDeposit() {
		return hlcDeposit;
	}
	public void setHlcDeposit(Double hlcDeposit) {
		this.hlcDeposit = hlcDeposit;
	}
	public Double getRealMargin() {
		return realMargin;
	}
	public void setRealMargin(Double realMargin) {
		this.realMargin = realMargin;
	}
	public String getHlcCheckFlag() {
		return hlcCheckFlag;
	}
	public void setHlcCheckFlag(String hlcCheckFlag) {
		this.hlcCheckFlag = hlcCheckFlag;
	}
	public String getMarginCheckFlag() {
		return marginCheckFlag;
	}
	public void setMarginCheckFlag(String marginCheckFlag) {
		this.marginCheckFlag = marginCheckFlag;
	}
	public String getHlcFirstEnprCode() {
		return hlcFirstEnprCode;
	}
	public void setHlcFirstEnprCode(String hlcFirstEnprCode) {
		this.hlcFirstEnprCode = hlcFirstEnprCode;
	}
	public String getHlcFirstEnprDisCode() {
		return hlcFirstEnprDisCode;
	}
	public void setHlcFirstEnprDisCode(String hlcFirstEnprDisCode) {
		this.hlcFirstEnprDisCode = hlcFirstEnprDisCode;
	}
	public String getUnitSysCode() {
		return unitSysCode;
	}
	public void setUnitSysCode(String unitSysCode) {
		this.unitSysCode = unitSysCode;
	}
	public String getUpdatePerson() {
		return updatePerson;
	}
	public void setUpdatePerson(String updatePerson) {
		this.updatePerson = updatePerson;
	}
	public String getLastestUpdate() {
		return lastestUpdate;
	}
	public void setLastestUpdate(String lastestUpdate) {
		this.lastestUpdate = lastestUpdate;
	}
	public void setHlcCheckFlagDisplay(String hlcCheckFlagDisplay) {
		this.hlcCheckFlagDisplay = hlcCheckFlagDisplay;
	}
	public String getHlcCheckFlagDisplay() {
		return hlcCheckFlagDisplay;
	}
	public void setMarginCheckFlagDisplay(String marginCheckFlagDisplay) {
		this.marginCheckFlagDisplay = marginCheckFlagDisplay;
	}
	public String getMarginCheckFlagDisplay() {
		return marginCheckFlagDisplay;
	}
	public void setRentMarginPk(String rentMarginPk) {
		this.rentMarginPk = rentMarginPk;
	}
	public String getRentMarginPk() {
		return rentMarginPk;
	}

}
