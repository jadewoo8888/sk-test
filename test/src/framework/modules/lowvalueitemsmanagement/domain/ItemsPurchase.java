package framework.modules.lowvalueitemsmanagement.domain;

import framework.sys.foreignkeytranslation.FK;
import framework.sys.foreignkeytranslation.Ref;

public class ItemsPurchase implements java.io.Serializable, Cloneable{

	private String pk = "";
	private String ipCode = "";
	private String ipItemsApplyPK;
	@FK(ref = Ref.Category)
	private String ipCategoryPK = "";
	@FK(ref = Ref.Organization)
	private String ipOrgCode = "";
	@FK(ref = Ref.Department)
	private String ipDeptCode = "";
	@FK(ref = Ref.User)
	private String ipApplyPerson = "";
	private String ipPurchaseDate = "";
	private String applyPerson = "";
	private Integer ipPurchaseCountSum = 0;
	private Integer ipStoreCountSum = 0;
	private String ipRemark = "";
	@FK(ref = Ref.Classify)
	private String ipApprovalFlag = "";
	private String linkers = "";
	private String allowApprPerson = ""; 
	private String insertTime = "";
	private String lastestUpdate = "";
	private String updatePerson = "";

	// 外检翻译
	private String ipCategoryPKDisplay = "";
	private String ipOrgCodeDisplay = "";
	private String ipDeptCodeDisplay = "";
	private String ipApplyPersonDisplay = "";
	private String ipApprovalFlagDisplay = "";
	
	public String getPk() {
		return pk;
	}
	public void setPk(String pk) {
		this.pk = pk;
	}
	public String getIpCode() {
		return ipCode;
	}
	public void setIpCode(String ipCode) {
		this.ipCode = ipCode;
	}
	public String getIpCategoryPK() {
		return ipCategoryPK;
	}
	public void setIpCategoryPK(String ipCategoryPK) {
		this.ipCategoryPK = ipCategoryPK;
	}
	public String getIpOrgCode() {
		return ipOrgCode;
	}
	public void setIpOrgCode(String ipOrgCode) {
		this.ipOrgCode = ipOrgCode;
	}
	public String getIpDeptCode() {
		return ipDeptCode;
	}
	public void setIpDeptCode(String ipDeptCode) {
		this.ipDeptCode = ipDeptCode;
	}
	public String getIpApplyPerson() {
		return ipApplyPerson;
	}
	public void setIpApplyPerson(String ipApplyPerson) {
		this.ipApplyPerson = ipApplyPerson;
	}
	public String getIpPurchaseDate() {
		return ipPurchaseDate;
	}
	public void setIpPurchaseDate(String ipPurchaseDate) {
		this.ipPurchaseDate = ipPurchaseDate;
	}
	public String getApplyPerson() {
		return applyPerson;
	}
	public void setApplyPerson(String applyPerson) {
		this.applyPerson = applyPerson;
	}
	public Integer getIpPurchaseCountSum() {
		return ipPurchaseCountSum;
	}
	public void setIpPurchaseCountSum(Integer ipPurchaseCountSum) {
		this.ipPurchaseCountSum = ipPurchaseCountSum;
	}
	public Integer getIpStoreCountSum() {
		return ipStoreCountSum;
	}
	public void setIpStoreCountSum(Integer ipStoreCountSum) {
		this.ipStoreCountSum = ipStoreCountSum;
	}
	public String getIpRemark() {
		return ipRemark;
	}
	public void setIpRemark(String ipRemark) {
		this.ipRemark = ipRemark;
	}
	public String getIpApprovalFlag() {
		return ipApprovalFlag;
	}
	public void setIpApprovalFlag(String ipApprovalFlag) {
		this.ipApprovalFlag = ipApprovalFlag;
	}
	public String getLinkers() {
		return linkers;
	}
	public void setLinkers(String linkers) {
		this.linkers = linkers;
	}
	public String getAllowApprPerson() {
		return allowApprPerson;
	}
	public void setAllowApprPerson(String allowApprPerson) {
		this.allowApprPerson = allowApprPerson;
	}
	
	public String getInsertTime() {
		return insertTime;
	}
	public void setInsertTime(String insertTime) {
		this.insertTime = insertTime;
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
	public String getIpCategoryPKDisplay() {
		return ipCategoryPKDisplay;
	}
	public void setIpCategoryPKDisplay(String ipCategoryPKDisplay) {
		this.ipCategoryPKDisplay = ipCategoryPKDisplay;
	}
	public String getIpOrgCodeDisplay() {
		return ipOrgCodeDisplay;
	}
	public void setIpOrgCodeDisplay(String ipOrgCodeDisplay) {
		this.ipOrgCodeDisplay = ipOrgCodeDisplay;
	}
	public String getIpDeptCodeDisplay() {
		return ipDeptCodeDisplay;
	}
	public void setIpDeptCodeDisplay(String ipDeptCodeDisplay) {
		this.ipDeptCodeDisplay = ipDeptCodeDisplay;
	}
	public String getIpApplyPersonDisplay() {
		return ipApplyPersonDisplay;
	}
	public void setIpApplyPersonDisplay(String ipApplyPersonDisplay) {
		this.ipApplyPersonDisplay = ipApplyPersonDisplay;
	}
	public String getIpApprovalFlagDisplay() {
		return ipApprovalFlagDisplay;
	}
	public void setIpApprovalFlagDisplay(String ipApprovalFlagDisplay) {
		this.ipApprovalFlagDisplay = ipApprovalFlagDisplay;
	}
	public String getIpItemsApplyPK() {
		return ipItemsApplyPK;
	}
	public void setIpItemsApplyPK(String ipItemsApplyPK) {
		this.ipItemsApplyPK = ipItemsApplyPK;
	}
	
	
}
