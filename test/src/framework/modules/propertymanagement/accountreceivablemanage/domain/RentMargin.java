package framework.modules.propertymanagement.accountreceivablemanage.domain;

import framework.sys.foreignkeytranslation.FK;
import framework.sys.foreignkeytranslation.Ref;

public class RentMargin implements java.io.Serializable, Cloneable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String pk = "";
	private String serialNo = "";
	private String contractCode = "";
	private String contractBarCode = "";
	private String secondEnprName = "";
	private String firstEnprCode = "";
	private String firstEnprName = "";
	private String unitSysCode = "";
	private String unitAdress = "";
	private Double deposit = 0.00;
	private Double realMargin = 0.00;
	private String realDate = "";
	private String retDate = "";
	private String retLister = "";
	@FK(ref = Ref.Classify)
	private String invoice = "";
	private String invoiceCode = "";
	@FK(ref = Ref.Classify)
	private String payType = "";
	private String paydperson = "";
	private String ifAdjunct = "";
	private String lister = "";
	private String remark = "";
	@FK(ref = Ref.CustomHandle, customvalue = "SJZT_00,未收##SJZT_01,已收##SJZT_02,已退")
	private String checkFlag = "";
	private String lastestUpdate = "";
	private String updatePerson = "";
	// 外检翻译
	private String invoiceDisplay = "";
	private String payTypeDisplay = "";
	private String checkFlagDisplay = "";
	
	public String getPk() {
		return pk;
	}
	public void setPk(String pk) {
		this.pk = pk;
	}
	public String getContractCode() {
		return contractCode;
	}
	public void setContractCode(String contractCode) {
		this.contractCode = contractCode;
	}
	public String getContractBarCode() {
		return contractBarCode;
	}
	public void setContractBarCode(String contractBarCode) {
		this.contractBarCode = contractBarCode;
	}
	public String getSecondEnprName() {
		return secondEnprName;
	}
	public void setSecondEnprName(String secondEnprName) {
		this.secondEnprName = secondEnprName;
	}
	public String getFirstEnprCode() {
		return firstEnprCode;
	}
	public void setFirstEnprCode(String firstEnprCode) {
		this.firstEnprCode = firstEnprCode;
	}
	public String getFirstEnprName() {
		return firstEnprName;
	}
	public void setFirstEnprName(String firstEnprName) {
		this.firstEnprName = firstEnprName;
	}
	public String getUnitSysCode() {
		return unitSysCode;
	}
	public void setUnitSysCode(String unitSysCode) {
		this.unitSysCode = unitSysCode;
	}
	public String getUnitAdress() {
		return unitAdress;
	}
	public void setUnitAdress(String unitAdress) {
		this.unitAdress = unitAdress;
	}
	public Double getDeposit() {
		return deposit;
	}
	public void setDeposit(Double deposit) {
		this.deposit = deposit;
	}
	public Double getRealMargin() {
		return realMargin;
	}
	public void setRealMargin(Double realMargin) {
		this.realMargin = realMargin;
	}
	public String getRealDate() {
		return realDate;
	}
	public void setRealDate(String realDate) {
		this.realDate = realDate;
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
	public String getPaydperson() {
		return paydperson;
	}
	public void setPaydperson(String paydperson) {
		this.paydperson = paydperson;
	}
	public String getIfAdjunct() {
		return ifAdjunct;
	}
	public void setIfAdjunct(String ifAdjunct) {
		this.ifAdjunct = ifAdjunct;
	}
	public String getLister() {
		return lister;
	}
	public void setLister(String lister) {
		this.lister = lister;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getCheckFlag() {
		return checkFlag;
	}
	public void setCheckFlag(String checkFlag) {
		this.checkFlag = checkFlag;
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
	public void setSerialNo(String serialNo) {
		this.serialNo = serialNo;
	}
	public String getSerialNo() {
		return serialNo;
	}

	

}
