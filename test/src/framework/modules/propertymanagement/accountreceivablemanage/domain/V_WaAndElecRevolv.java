package framework.modules.propertymanagement.accountreceivablemanage.domain;

import framework.sys.foreignkeytranslation.FK;
import framework.sys.foreignkeytranslation.Ref;

public class V_WaAndElecRevolv implements java.io.Serializable, Cloneable {

	private String pk = "";
	private String revolvpk = "";
	private String clientCode = "";

	@FK(ref = Ref.Organization)
	private String orgSysCode = "";
	private String unitAdress = "";
	private String hlcFirstEnprName = "";
	private String hlcSecondEnprName = "";
	private String ifCollection = "";
	private String unitName = "";
	private String clientStatus = "";

	@FK(ref = Ref.Classify)
	private String invoice = "";
	private String invoiceCode = "";
	private Double waAndElecRevolv = 0.00;
	@FK(ref = Ref.CustomHandle, customvalue = "SJZT_00,未收##SJZT_01,已收##SJZT_02,已退")
	private String checkFlag = "SJZT_00";

	@FK(ref = Ref.Classify)
	private String payType = "";
	private String realDate = "";
	private String paydPerson = "";
	private String lister = "";
	private String retDate = "";
	private String retLister = "";
	private String remark = "";
	private String lastestUpdate = "";
	private String updatePerson = "";
	private String insertTime = "";

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

	public String getRevolvpk() {
		return revolvpk;
	}

	public void setRevolvpk(String revolvpk) {
		this.revolvpk = revolvpk;
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

	public String getUnitAdress() {
		return unitAdress;
	}

	public void setUnitAdress(String unitAdress) {
		this.unitAdress = unitAdress;
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

	public String getIfCollection() {
		return ifCollection;
	}

	public void setIfCollection(String ifCollection) {
		this.ifCollection = ifCollection;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public String getClientStatus() {
		return clientStatus;
	}

	public void setClientStatus(String clientStatus) {
		this.clientStatus = clientStatus;
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

	public Double getWaAndElecRevolv() {
		return waAndElecRevolv;
	}

	public void setWaAndElecRevolv(Double waAndElecRevolv) {
		this.waAndElecRevolv = waAndElecRevolv;
	}

	public String getCheckFlag() {
		return checkFlag;
	}

	public void setCheckFlag(String checkFlag) {
		this.checkFlag = checkFlag;
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

	public String getPaydPerson() {
		return paydPerson;
	}

	public void setPaydPerson(String paydPerson) {
		this.paydPerson = paydPerson;
	}

	public String getLister() {
		return lister;
	}

	public void setLister(String lister) {
		this.lister = lister;
	}

	public String getRetDate() {
		return retDate;
	}

	public void setRetDate(String retDate) {
		this.retDate = retDate;
	}

	public String getRetLister() {
		return retLister;
	}

	public void setRetLister(String retLister) {
		this.retLister = retLister;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

	public String getInsertTime() {
		return insertTime;
	}

	public void setInsertTime(String insertTime) {
		this.insertTime = insertTime;
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

}
