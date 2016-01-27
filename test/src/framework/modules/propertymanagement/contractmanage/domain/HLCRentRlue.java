package framework.modules.propertymanagement.contractmanage.domain;

import framework.sys.foreignkeytranslation.FK;
import framework.sys.foreignkeytranslation.Ref;

public class HLCRentRlue implements java.io.Serializable, Cloneable {

	private String hlcRentRulePK = "";
	private String hlcRentRuleContractCode = "";
	private String hlcRentRuleStartDate = "";
	private String hlcRentRuleEndDate = "";
	private Double hlcRentRuleRent = 0.00;
	@FK(ref = Ref.Classify)
	private String hlcRentRulePeriod = "";
	private String hlcRentRulePeriodMonth = "";
	private String hlcRentRulePeriodDate = "";
	@FK(ref = Ref.Classify)
	private String hlcRentRulePayType = "";
	@FK(ref = Ref.Classify)
	private String hlcRentRuleCurrencyType = "";
	private String updatePerson = "";
	private String lastestUpdate = "";
	

	// 外检翻译
	private String hlcRentRulePeriodDisplay = "";
	private String hlcRentRulePayTypeDisplay = "";
	private String hlcRentRuleCurrencyTypeDisplay = "";
	
	public String getHlcRentRulePK() {
		return hlcRentRulePK;
	}
	public void setHlcRentRulePK(String hlcRentRulePK) {
		this.hlcRentRulePK = hlcRentRulePK;
	}
	public String getHlcRentRuleContractCode() {
		return hlcRentRuleContractCode;
	}
	public void setHlcRentRuleContractCode(String hlcRentRuleContractCode) {
		this.hlcRentRuleContractCode = hlcRentRuleContractCode;
	}
	public String getHlcRentRuleStartDate() {
		return hlcRentRuleStartDate;
	}
	public void setHlcRentRuleStartDate(String hlcRentRuleStartDate) {
		this.hlcRentRuleStartDate = hlcRentRuleStartDate;
	}
	public String getHlcRentRuleEndDate() {
		return hlcRentRuleEndDate;
	}
	public void setHlcRentRuleEndDate(String hlcRentRuleEndDate) {
		this.hlcRentRuleEndDate = hlcRentRuleEndDate;
	}
	public Double getHlcRentRuleRent() {
		return hlcRentRuleRent;
	}
	public void setHlcRentRuleRent(Double hlcRentRuleRent) {
		this.hlcRentRuleRent = hlcRentRuleRent;
	}
	public String getHlcRentRulePeriod() {
		return hlcRentRulePeriod;
	}
	public void setHlcRentRulePeriod(String hlcRentRulePeriod) {
		this.hlcRentRulePeriod = hlcRentRulePeriod;
	}
	public String getHlcRentRulePeriodMonth() {
		return hlcRentRulePeriodMonth;
	}
	public void setHlcRentRulePeriodMonth(String hlcRentRulePeriodMonth) {
		this.hlcRentRulePeriodMonth = hlcRentRulePeriodMonth;
	}
	public String getHlcRentRulePeriodDate() {
		return hlcRentRulePeriodDate;
	}
	public void setHlcRentRulePeriodDate(String hlcRentRulePeriodDate) {
		this.hlcRentRulePeriodDate = hlcRentRulePeriodDate;
	}
	public String getHlcRentRulePayType() {
		return hlcRentRulePayType;
	}
	public void setHlcRentRulePayType(String hlcRentRulePayType) {
		this.hlcRentRulePayType = hlcRentRulePayType;
	}
	public String getHlcRentRuleCurrencyType() {
		return hlcRentRuleCurrencyType;
	}
	public void setHlcRentRuleCurrencyType(String hlcRentRuleCurrencyType) {
		this.hlcRentRuleCurrencyType = hlcRentRuleCurrencyType;
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
	public String getHlcRentRulePeriodDisplay() {
		return hlcRentRulePeriodDisplay;
	}
	public void setHlcRentRulePeriodDisplay(String hlcRentRulePeriodDisplay) {
		this.hlcRentRulePeriodDisplay = hlcRentRulePeriodDisplay;
	}
	public String getHlcRentRulePayTypeDisplay() {
		return hlcRentRulePayTypeDisplay;
	}
	public void setHlcRentRulePayTypeDisplay(String hlcRentRulePayTypeDisplay) {
		this.hlcRentRulePayTypeDisplay = hlcRentRulePayTypeDisplay;
	}
	public String getHlcRentRuleCurrencyTypeDisplay() {
		return hlcRentRuleCurrencyTypeDisplay;
	}
	public void setHlcRentRuleCurrencyTypeDisplay(
			String hlcRentRuleCurrencyTypeDisplay) {
		this.hlcRentRuleCurrencyTypeDisplay = hlcRentRuleCurrencyTypeDisplay;
	}


}
