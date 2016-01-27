package framework.modules.propertymanagement.accountreceivablemanage.domain;

import framework.sys.foreignkeytranslation.FK;
import framework.sys.foreignkeytranslation.Ref;

public class PhfeeInfo implements java.io.Serializable, Cloneable {
	private String pk = "";
	@FK(ref = Ref.CustomHandle, customvalue = "SJZT_00,未收##SJZT_01,已收##SJZT_02,坏账##SJZT_03,已上缴##SJZT_04,部分收款")
	private String checkFlag = "";
	@FK(ref = Ref.Organization)
	private String orgSysCode = "";
	private String clientCode = "";
	private String receiveDate = "";
	private Double halthFee = 0.00;
	private Double otherFee = 0.00;
	private Double receiveRent = 0.00;
	private Double realRecRent = 0.00;
	@FK(ref = Ref.Classify)
	private String payType = "";
	private String payPerson = "";
	@FK(ref = Ref.Classify)
	private String invoice = "";
	private String invoiceCode = "";
	private String lister = "";
	private String listDate = "";
	private String remark = "";
	private String inserttime = "";
	private String lastestUpdate = "";
	private String updatePerson = "";

	// 外键翻译
	private String checkFlagDisplay = "";
	private String orgSysCodeDisplay = "";
	private String invoiceDisplay = "";
	private String payTypeDisplay = "";
	

	public String getCheckFlag() {
		return checkFlag;
	}

	public void setCheckFlag(String checkFlag) {
		this.checkFlag = checkFlag;
	}

	public String getCheckFlagDisplay() {
		return checkFlagDisplay;
	}

	public void setCheckFlagDisplay(String checkFlagDisplay) {
		this.checkFlagDisplay = checkFlagDisplay;
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

	public String getReceiveDate() {
		return receiveDate;
	}

	public void setReceiveDate(String receiveDate) {
		this.receiveDate = receiveDate;
	}

	public Double getReceiveRent() {
		return receiveRent;
	}

	public void setReceiveRent(Double receiveRent) {
		this.receiveRent = receiveRent;
	}

	public Double getRealRecRent() {
		return realRecRent;
	}

	public void setRealRecRent(Double realRecRent) {
		this.realRecRent = realRecRent;
	}

	public String getPayType() {
		return payType;
	}

	public void setPayType(String payType) {
		this.payType = payType;
	}

	public String getPayPerson() {
		return payPerson;
	}

	public void setPayPerson(String payPerson) {
		this.payPerson = payPerson;
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

	public Double getHalthFee() {
		return halthFee;
	}

	public void setHalthFee(Double halthFee) {
		this.halthFee = halthFee;
	}

	public Double getOtherFee() {
		return otherFee;
	}

	public void setOtherFee(Double otherFee) {
		this.otherFee = otherFee;
	}

	public String getOrgSysCode() {
		return orgSysCode;
	}

	public void setOrgSysCode(String orgSysCode) {
		this.orgSysCode = orgSysCode;
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

}
