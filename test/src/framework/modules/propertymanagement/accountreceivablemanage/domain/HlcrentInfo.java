package framework.modules.propertymanagement.accountreceivablemanage.domain;

import framework.sys.foreignkeytranslation.FK;
import framework.sys.foreignkeytranslation.Ref;

public class HlcrentInfo implements java.io.Serializable, Cloneable {
	private String hlcrentInfoPK = "";
	private String hlcrentInfoContractCode = "";
	private String hlcrentInfoContractBarCode = "";
	private String hlcrentInfoSecondEnprName = "";
	private String hlcrentInfoSerialNo = "";
	private String hlcrentInfoFirstEnprCode = "";
	private String hlcrentInfoFirstEnprName = "";
	private String unitSysCode = "";
	private String unitAdress = "";
	@FK(ref = Ref.Classify)
	private String invoice = "";
	private String invoiceCode = "";
	private String invoiceNO = "";
	private String paydperson = "";
	private String ifToAccount = "";
	private String hlcrentInfoRate = "";
	private String ifAdjunct = "";
	private String incomePaidCode = "";
	private String hlcrentInfoListDate = "";
	private String hlcrentInfoLister = "";
	private Double hlcrentInfoOtherIn = 0.00;
	@FK(ref = Ref.Classify)
	private String hlcrentInfoPayType = "";
	private String hlcrentInfoRealRecDate = "";
	private Double hlcrentInfoRealRecLateFee = 0.00;
	private Double hlcrentInfoRealRecRent = 0.00;
	private String hlcrentInfoReceiveDate = "";
	private Double hlcrentInfoReceiveRent = 0.00;
	private Double hlcrentInfoDecRRLateFee = 0.00;
	private Double hlcrentInfoMoney = 0.00;
	private String hlcrentInfoReason = "";
	private String hlcrentInfoRemark = "";
	private Double hlcrentInfoSalesTax = 0.00;
	private Double hlcrentInfoTax = 0.00;
	private Double hlcrentInfoDiffOtherTax = 0.00;
	private Double hlcrentInfoHouseTax = 0.00;
	private Double hlcrentInfoLandTax = 0.00;
	private Double hlcrentInfoOtherTax = 0.00;
	private Double hlcrentInfoDiffSumTax = 0.00;
	private Double hlcrentInfoDiffTax = 0.00;
	private Double hlcrentInfoTurn = 0.00;
	private Double hlcrentInfoDiff = 0.00;
	private Double hlcrentInfoTurnIn = 0.00;
	private String hlcrentInfoTurnInDate = "";
	@FK(ref = Ref.Classify)
	private String hlcrentInfoStyleNotice1 = "";
	@FK(ref = Ref.Classify)
	private String hlcrentInfoStyleNotice = "";
	@FK(ref = Ref.Classify)
	private String hlcrentInfoRentType = "";
	@FK(ref = Ref.Classify)
	private String hlcrentInfoStyle = "";
	@FK(ref = Ref.CustomHandle, customvalue = "SJZT_00,未收##SJZT_01,已收##SJZT_02,坏账##SJZT_03,已上缴##SJZT_04,部分收款")
	private String hlcrentInfoCheckFlag = "";
	private String lastestUpdate = "";
	private String updatePerson = "";
	private String hlcrentInfoThirdEnprName = "";
	private String hlcrentInfoCurrencyType = "";

	// 外检翻译
	private String invoiceDisplay = "";
	private String hlcrentInfoPayTypeDisplay = "";
	private String hlcrentInfoStyleNotice1Display = "";
	private String hlcrentInfoStyleNoticeDisplay = "";
	private String hlcrentInfoRentTypeDisplay = "";
	private String hlcrentInfoStyleDisplay = "";
	private String hlcrentInfoCheckFlagDisplay = "";

	public String getHlcrentInfoPK() {
		return hlcrentInfoPK;
	}

	public void setHlcrentInfoPK(String hlcrentInfoPK) {
		this.hlcrentInfoPK = hlcrentInfoPK;
	}

	public String getHlcrentInfoContractCode() {
		return hlcrentInfoContractCode;
	}

	public void setHlcrentInfoContractCode(String hlcrentInfoContractCode) {
		this.hlcrentInfoContractCode = hlcrentInfoContractCode;
	}

	public String getHlcrentInfoContractBarCode() {
		return hlcrentInfoContractBarCode;
	}

	public void setHlcrentInfoContractBarCode(String hlcrentInfoContractBarCode) {
		this.hlcrentInfoContractBarCode = hlcrentInfoContractBarCode;
	}

	public String getHlcrentInfoSecondEnprName() {
		return hlcrentInfoSecondEnprName;
	}

	public void setHlcrentInfoSecondEnprName(String hlcrentInfoSecondEnprName) {
		this.hlcrentInfoSecondEnprName = hlcrentInfoSecondEnprName;
	}

	public String getHlcrentInfoSerialNo() {
		return hlcrentInfoSerialNo;
	}

	public void setHlcrentInfoSerialNo(String hlcrentInfoSerialNo) {
		this.hlcrentInfoSerialNo = hlcrentInfoSerialNo;
	}

	public String getHlcrentInfoFirstEnprCode() {
		return hlcrentInfoFirstEnprCode;
	}

	public void setHlcrentInfoFirstEnprCode(String hlcrentInfoFirstEnprCode) {
		this.hlcrentInfoFirstEnprCode = hlcrentInfoFirstEnprCode;
	}

	public String getHlcrentInfoFirstEnprName() {
		return hlcrentInfoFirstEnprName;
	}

	public void setHlcrentInfoFirstEnprName(String hlcrentInfoFirstEnprName) {
		this.hlcrentInfoFirstEnprName = hlcrentInfoFirstEnprName;
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

	public String getInvoiceNO() {
		return invoiceNO;
	}

	public void setInvoiceNO(String invoiceNO) {
		this.invoiceNO = invoiceNO;
	}

	public String getPaydperson() {
		return paydperson;
	}

	public void setPaydperson(String paydperson) {
		this.paydperson = paydperson;
	}

	public String getIfToAccount() {
		return ifToAccount;
	}

	public void setIfToAccount(String ifToAccount) {
		this.ifToAccount = ifToAccount;
	}

	public String getHlcrentInfoRate() {
		return hlcrentInfoRate;
	}

	public void setHlcrentInfoRate(String hlcrentInfoRate) {
		this.hlcrentInfoRate = hlcrentInfoRate;
	}

	public String getIfAdjunct() {
		return ifAdjunct;
	}

	public void setIfAdjunct(String ifAdjunct) {
		this.ifAdjunct = ifAdjunct;
	}

	public String getIncomePaidCode() {
		return incomePaidCode;
	}

	public void setIncomePaidCode(String incomePaidCode) {
		this.incomePaidCode = incomePaidCode;
	}

	public String getHlcrentInfoListDate() {
		return hlcrentInfoListDate;
	}

	public void setHlcrentInfoListDate(String hlcrentInfoListDate) {
		this.hlcrentInfoListDate = hlcrentInfoListDate;
	}

	public String getHlcrentInfoLister() {
		return hlcrentInfoLister;
	}

	public void setHlcrentInfoLister(String hlcrentInfoLister) {
		this.hlcrentInfoLister = hlcrentInfoLister;
	}

	public Double getHlcrentInfoOtherIn() {
		return hlcrentInfoOtherIn;
	}

	public void setHlcrentInfoOtherIn(Double hlcrentInfoOtherIn) {
		this.hlcrentInfoOtherIn = hlcrentInfoOtherIn;
	}

	public String getHlcrentInfoPayType() {
		return hlcrentInfoPayType;
	}

	public void setHlcrentInfoPayType(String hlcrentInfoPayType) {
		this.hlcrentInfoPayType = hlcrentInfoPayType;
	}

	public String getHlcrentInfoRealRecDate() {
		return hlcrentInfoRealRecDate;
	}

	public void setHlcrentInfoRealRecDate(String hlcrentInfoRealRecDate) {
		this.hlcrentInfoRealRecDate = hlcrentInfoRealRecDate;
	}

	public Double getHlcrentInfoRealRecLateFee() {
		return hlcrentInfoRealRecLateFee;
	}

	public void setHlcrentInfoRealRecLateFee(Double hlcrentInfoRealRecLateFee) {
		this.hlcrentInfoRealRecLateFee = hlcrentInfoRealRecLateFee;
	}

	public Double getHlcrentInfoRealRecRent() {
		return hlcrentInfoRealRecRent;
	}

	public void setHlcrentInfoRealRecRent(Double hlcrentInfoRealRecRent) {
		this.hlcrentInfoRealRecRent = hlcrentInfoRealRecRent;
	}

	public String getHlcrentInfoReceiveDate() {
		return hlcrentInfoReceiveDate;
	}

	public void setHlcrentInfoReceiveDate(String hlcrentInfoReceiveDate) {
		this.hlcrentInfoReceiveDate = hlcrentInfoReceiveDate;
	}

	public Double getHlcrentInfoReceiveRent() {
		return hlcrentInfoReceiveRent;
	}

	public void setHlcrentInfoReceiveRent(Double hlcrentInfoReceiveRent) {
		this.hlcrentInfoReceiveRent = hlcrentInfoReceiveRent;
	}

	public Double getHlcrentInfoDecRRLateFee() {
		return hlcrentInfoDecRRLateFee;
	}

	public void setHlcrentInfoDecRRLateFee(Double hlcrentInfoDecRRLateFee) {
		this.hlcrentInfoDecRRLateFee = hlcrentInfoDecRRLateFee;
	}

	public Double getHlcrentInfoMoney() {
		return hlcrentInfoMoney;
	}

	public void setHlcrentInfoMoney(Double hlcrentInfoMoney) {
		this.hlcrentInfoMoney = hlcrentInfoMoney;
	}

	public String getHlcrentInfoReason() {
		return hlcrentInfoReason;
	}

	public void setHlcrentInfoReason(String hlcrentInfoReason) {
		this.hlcrentInfoReason = hlcrentInfoReason;
	}

	public String getHlcrentInfoRemark() {
		return hlcrentInfoRemark;
	}

	public void setHlcrentInfoRemark(String hlcrentInfoRemark) {
		this.hlcrentInfoRemark = hlcrentInfoRemark;
	}

	public Double getHlcrentInfoSalesTax() {
		return hlcrentInfoSalesTax;
	}

	public void setHlcrentInfoSalesTax(Double hlcrentInfoSalesTax) {
		this.hlcrentInfoSalesTax = hlcrentInfoSalesTax;
	}

	public Double getHlcrentInfoTax() {
		return hlcrentInfoTax;
	}

	public void setHlcrentInfoTax(Double hlcrentInfoTax) {
		this.hlcrentInfoTax = hlcrentInfoTax;
	}

	public Double getHlcrentInfoDiffOtherTax() {
		return hlcrentInfoDiffOtherTax;
	}

	public void setHlcrentInfoDiffOtherTax(Double hlcrentInfoDiffOtherTax) {
		this.hlcrentInfoDiffOtherTax = hlcrentInfoDiffOtherTax;
	}

	public Double getHlcrentInfoHouseTax() {
		return hlcrentInfoHouseTax;
	}

	public void setHlcrentInfoHouseTax(Double hlcrentInfoHouseTax) {
		this.hlcrentInfoHouseTax = hlcrentInfoHouseTax;
	}

	public Double getHlcrentInfoLandTax() {
		return hlcrentInfoLandTax;
	}

	public void setHlcrentInfoLandTax(Double hlcrentInfoLandTax) {
		this.hlcrentInfoLandTax = hlcrentInfoLandTax;
	}

	public Double getHlcrentInfoOtherTax() {
		return hlcrentInfoOtherTax;
	}

	public void setHlcrentInfoOtherTax(Double hlcrentInfoOtherTax) {
		this.hlcrentInfoOtherTax = hlcrentInfoOtherTax;
	}

	public Double getHlcrentInfoDiffSumTax() {
		return hlcrentInfoDiffSumTax;
	}

	public void setHlcrentInfoDiffSumTax(Double hlcrentInfoDiffSumTax) {
		this.hlcrentInfoDiffSumTax = hlcrentInfoDiffSumTax;
	}

	public Double getHlcrentInfoDiffTax() {
		return hlcrentInfoDiffTax;
	}

	public void setHlcrentInfoDiffTax(Double hlcrentInfoDiffTax) {
		this.hlcrentInfoDiffTax = hlcrentInfoDiffTax;
	}

	public Double getHlcrentInfoTurn() {
		return hlcrentInfoTurn;
	}

	public void setHlcrentInfoTurn(Double hlcrentInfoTurn) {
		this.hlcrentInfoTurn = hlcrentInfoTurn;
	}

	public Double getHlcrentInfoDiff() {
		return hlcrentInfoDiff;
	}

	public void setHlcrentInfoDiff(Double hlcrentInfoDiff) {
		this.hlcrentInfoDiff = hlcrentInfoDiff;
	}

	public Double getHlcrentInfoTurnIn() {
		return hlcrentInfoTurnIn;
	}

	public void setHlcrentInfoTurnIn(Double hlcrentInfoTurnIn) {
		this.hlcrentInfoTurnIn = hlcrentInfoTurnIn;
	}

	public String getHlcrentInfoTurnInDate() {
		return hlcrentInfoTurnInDate;
	}

	public void setHlcrentInfoTurnInDate(String hlcrentInfoTurnInDate) {
		this.hlcrentInfoTurnInDate = hlcrentInfoTurnInDate;
	}

	public String getHlcrentInfoStyleNotice1() {
		return hlcrentInfoStyleNotice1;
	}

	public void setHlcrentInfoStyleNotice1(String hlcrentInfoStyleNotice1) {
		this.hlcrentInfoStyleNotice1 = hlcrentInfoStyleNotice1;
	}

	public String getHlcrentInfoStyleNotice() {
		return hlcrentInfoStyleNotice;
	}

	public void setHlcrentInfoStyleNotice(String hlcrentInfoStyleNotice) {
		this.hlcrentInfoStyleNotice = hlcrentInfoStyleNotice;
	}

	public String getHlcrentInfoRentType() {
		return hlcrentInfoRentType;
	}

	public void setHlcrentInfoRentType(String hlcrentInfoRentType) {
		this.hlcrentInfoRentType = hlcrentInfoRentType;
	}

	public String getHlcrentInfoStyle() {
		return hlcrentInfoStyle;
	}

	public void setHlcrentInfoStyle(String hlcrentInfoStyle) {
		this.hlcrentInfoStyle = hlcrentInfoStyle;
	}

	public String getHlcrentInfoCheckFlag() {
		return hlcrentInfoCheckFlag;
	}

	public void setHlcrentInfoCheckFlag(String hlcrentInfoCheckFlag) {
		this.hlcrentInfoCheckFlag = hlcrentInfoCheckFlag;
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

	public String getHlcrentInfoThirdEnprName() {
		return hlcrentInfoThirdEnprName;
	}

	public void setHlcrentInfoThirdEnprName(String hlcrentInfoThirdEnprName) {
		this.hlcrentInfoThirdEnprName = hlcrentInfoThirdEnprName;
	}

	public String getHlcrentInfoCurrencyType() {
		return hlcrentInfoCurrencyType;
	}

	public void setHlcrentInfoCurrencyType(String hlcrentInfoCurrencyType) {
		this.hlcrentInfoCurrencyType = hlcrentInfoCurrencyType;
	}

	public String getInvoiceDisplay() {
		return invoiceDisplay;
	}

	public void setInvoiceDisplay(String invoiceDisplay) {
		this.invoiceDisplay = invoiceDisplay;
	}

	public String getHlcrentInfoPayTypeDisplay() {
		return hlcrentInfoPayTypeDisplay;
	}

	public void setHlcrentInfoPayTypeDisplay(String hlcrentInfoPayTypeDisplay) {
		this.hlcrentInfoPayTypeDisplay = hlcrentInfoPayTypeDisplay;
	}

	public String getHlcrentInfoStyleNotice1Display() {
		return hlcrentInfoStyleNotice1Display;
	}

	public void setHlcrentInfoStyleNotice1Display(String hlcrentInfoStyleNotice1Display) {
		this.hlcrentInfoStyleNotice1Display = hlcrentInfoStyleNotice1Display;
	}

	public String getHlcrentInfoStyleNoticeDisplay() {
		return hlcrentInfoStyleNoticeDisplay;
	}

	public void setHlcrentInfoStyleNoticeDisplay(String hlcrentInfoStyleNoticeDisplay) {
		this.hlcrentInfoStyleNoticeDisplay = hlcrentInfoStyleNoticeDisplay;
	}

	public String getHlcrentInfoRentTypeDisplay() {
		return hlcrentInfoRentTypeDisplay;
	}

	public void setHlcrentInfoRentTypeDisplay(String hlcrentInfoRentTypeDisplay) {
		this.hlcrentInfoRentTypeDisplay = hlcrentInfoRentTypeDisplay;
	}

	public String getHlcrentInfoStyleDisplay() {
		return hlcrentInfoStyleDisplay;
	}

	public void setHlcrentInfoStyleDisplay(String hlcrentInfoStyleDisplay) {
		this.hlcrentInfoStyleDisplay = hlcrentInfoStyleDisplay;
	}

	public String getHlcrentInfoCheckFlagDisplay() {
		return hlcrentInfoCheckFlagDisplay;
	}

	public void setHlcrentInfoCheckFlagDisplay(String hlcrentInfoCheckFlagDisplay) {
		this.hlcrentInfoCheckFlagDisplay = hlcrentInfoCheckFlagDisplay;
	}
}
