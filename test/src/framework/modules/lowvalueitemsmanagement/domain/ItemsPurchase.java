package framework.modules.lowvalueitemsmanagement.domain;

import framework.sys.foreignkeytranslation.FK;
import framework.sys.foreignkeytranslation.Ref;

public class ItemsPurchase implements java.io.Serializable, Cloneable{

	private String pk = "";
	private String iPCode = "";
	//@FK(ref = Ref.Organization)
	private String iPCategoryPK = "";
	@FK(ref = Ref.Organization)
	private String iPOrgCode = "";
	@FK(ref = Ref.Department)
	private String iPDeptCode = "";
	@FK(ref = Ref.User)
	private String iPApplyPerson = "";
	private String iPPurchaseDate = "";
	private String applyPerson = "";
	private Integer iPPurchaseCountSum = 0;
	private Integer iPStoreCountSum = 0;
	private String iPRemark = "";
	@FK(ref = Ref.Classify)
	private String iPApprovalFlag = "";
	private String linkers = "";
	private String allowApprPerson = ""; 
	private String inserttime = "";
	private String lastestUpdate = "";
	private String updatePerson = "";

	// 外检翻译
	private String iPCategoryPKDisplay = "";
	private String iPOrgCodeDisplay = "";
	private String iPDeptCodeDisplay = "";
	private String iPApplyPersonDisplay = "";
	private String iPApprovalFlagDisplay = "";
	
	public String getPk() {
		return pk;
	}
	public void setPk(String pk) {
		this.pk = pk;
	}
	public String getiPCode() {
		return iPCode;
	}
	public void setiPCode(String iPCode) {
		this.iPCode = iPCode;
	}
	public String getiPCategoryPK() {
		return iPCategoryPK;
	}
	public void setiPCategoryPK(String iPCategoryPK) {
		this.iPCategoryPK = iPCategoryPK;
	}
	public String getiPOrgCode() {
		return iPOrgCode;
	}
	public void setiPOrgCode(String iPOrgCode) {
		this.iPOrgCode = iPOrgCode;
	}
	public String getiPDeptCode() {
		return iPDeptCode;
	}
	public void setiPDeptCode(String iPDeptCode) {
		this.iPDeptCode = iPDeptCode;
	}
	public String getiPApplyPerson() {
		return iPApplyPerson;
	}
	public void setiPApplyPerson(String iPApplyPerson) {
		this.iPApplyPerson = iPApplyPerson;
	}
	public String getiPPurchaseDate() {
		return iPPurchaseDate;
	}
	public void setiPPurchaseDate(String iPPurchaseDate) {
		this.iPPurchaseDate = iPPurchaseDate;
	}
	public String getApplyPerson() {
		return applyPerson;
	}
	public void setApplyPerson(String applyPerson) {
		this.applyPerson = applyPerson;
	}
	
	public String getiPRemark() {
		return iPRemark;
	}
	public void setiPRemark(String iPRemark) {
		this.iPRemark = iPRemark;
	}
	public String getLinkers() {
		return linkers;
	}
	public void setLinkers(String linkers) {
		this.linkers = linkers;
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
	public String getiPCategoryPKDisplay() {
		return iPCategoryPKDisplay;
	}
	public void setiPCategoryPKDisplay(String iPCategoryPKDisplay) {
		this.iPCategoryPKDisplay = iPCategoryPKDisplay;
	}
	public String getiPOrgCodeDisplay() {
		return iPOrgCodeDisplay;
	}
	public void setiPOrgCodeDisplay(String iPOrgCodeDisplay) {
		this.iPOrgCodeDisplay = iPOrgCodeDisplay;
	}
	public String getiPDeptCodeDisplay() {
		return iPDeptCodeDisplay;
	}
	public void setiPDeptCodeDisplay(String iPDeptCodeDisplay) {
		this.iPDeptCodeDisplay = iPDeptCodeDisplay;
	}
	public String getiPApplyPersonDisplay() {
		return iPApplyPersonDisplay;
	}
	public void setiPApplyPersonDisplay(String iPApplyPersonDisplay) {
		this.iPApplyPersonDisplay = iPApplyPersonDisplay;
	}
	public String getiPApprovalFlagDisplay() {
		return iPApprovalFlagDisplay;
	}
	public void setiPApprovalFlagDisplay(String iPApprovalFlagDisplay) {
		this.iPApprovalFlagDisplay = iPApprovalFlagDisplay;
	}
	public Integer getiPPurchaseCountSum() {
		return iPPurchaseCountSum;
	}
	public void setiPPurchaseCountSum(Integer iPPurchaseCountSum) {
		this.iPPurchaseCountSum = iPPurchaseCountSum;
	}
	public Integer getiPStoreCountSum() {
		return iPStoreCountSum;
	}
	public void setiPStoreCountSum(Integer iPStoreCountSum) {
		this.iPStoreCountSum = iPStoreCountSum;
	}
	public String getiPApprovalFlag() {
		return iPApprovalFlag;
	}
	public void setiPApprovalFlag(String iPApprovalFlag) {
		this.iPApprovalFlag = iPApprovalFlag;
	}
	public String getAllowApprPerson() {
		return allowApprPerson;
	}
	public void setAllowApprPerson(String allowApprPerson) {
		this.allowApprPerson = allowApprPerson;
	}
	public String getInserttime() {
		return inserttime;
	}
	public void setInserttime(String inserttime) {
		this.inserttime = inserttime;
	}
	
	
}
