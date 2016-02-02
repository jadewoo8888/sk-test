package framework.modules.lowvalueitemsmanagement.domain;

import framework.sys.foreignkeytranslation.FK;
import framework.sys.foreignkeytranslation.Ref;

public class ItemsApplyManagement implements java.io.Serializable, Cloneable {

	private String pk = "";
	private String itemsApplyCode = "";
	private String categoryName = "";
	//@FK(ref = Ref.Classify) 对应表D001的PK字段
	private String categoryManagementPK = "";
	@FK(ref = Ref.Organization)
	private String orgCode = "";
	@FK(ref = Ref.Department)
	private String itemsApplyDeptCode = "";
	@FK(ref = Ref.User)
	private String applyPerson = "";
	private String itemsApplyDate = "";
	@FK(ref = Ref.Classify)
	private String iamCheckFlag = "";
	@FK(ref = Ref.Classify)
	private String itemsApplyFlag = "";
	private String approvalFlag = "";
	@FK(ref = Ref.User)
	private String itemsIssueLister = "";
	private String itemsIssueDate = "";
	private String itemsApplyRemark = ""; 
	private String linkers = "";
	private String allowApprPerson = "";
	private String inserttime = "";
	private String lastestUpdate = "";
	private String updatePerson = "";

	// 外检翻译
	private String categoryManagementPKDisplay = "";
	private String orgCodeDisplay = "";
	private String itemsApplyDeptCodeDisplay = "";
	private String applyPersonDisplay = "";
	private String iamCheckFlagDisplay = "";
	private String itemsIssueListerDisplay = "";
	private String itemsApplyFlagDisplay = "";
	
	public String getPk() {
		return pk;
	}
	public void setPk(String pk) {
		this.pk = pk;
	}
	public String getItemsApplyCode() {
		return itemsApplyCode;
	}
	public void setItemsApplyCode(String itemsApplyCode) {
		this.itemsApplyCode = itemsApplyCode;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public String getCategoryManagementPK() {
		return categoryManagementPK;
	}
	public void setCategoryManagementPK(String categoryManagementPK) {
		this.categoryManagementPK = categoryManagementPK;
	}
	public String getOrgCode() {
		return orgCode;
	}
	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}
	public String getItemsApplyDeptCode() {
		return itemsApplyDeptCode;
	}
	public void setItemsApplyDeptCode(String itemsApplyDeptCode) {
		this.itemsApplyDeptCode = itemsApplyDeptCode;
	}
	public String getApplyPerson() {
		return applyPerson;
	}
	public void setApplyPerson(String applyPerson) {
		this.applyPerson = applyPerson;
	}
	public String getItemsApplyDate() {
		return itemsApplyDate;
	}
	public void setItemsApplyDate(String itemsApplyDate) {
		this.itemsApplyDate = itemsApplyDate;
	}
	
	public String getItemsApplyFlag() {
		return itemsApplyFlag;
	}
	public void setItemsApplyFlag(String itemsApplyFlag) {
		this.itemsApplyFlag = itemsApplyFlag;
	}
	public String getApprovalFlag() {
		return approvalFlag;
	}
	public void setApprovalFlag(String approvalFlag) {
		this.approvalFlag = approvalFlag;
	}
	public String getItemsIssueLister() {
		return itemsIssueLister;
	}
	public void setItemsIssueLister(String itemsIssueLister) {
		this.itemsIssueLister = itemsIssueLister;
	}
	public String getItemsIssueDate() {
		return itemsIssueDate;
	}
	public void setItemsIssueDate(String itemsIssueDate) {
		this.itemsIssueDate = itemsIssueDate;
	}
	public String getItemsApplyRemark() {
		return itemsApplyRemark;
	}
	public void setItemsApplyRemark(String itemsApplyRemark) {
		this.itemsApplyRemark = itemsApplyRemark;
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
	public String getCategoryManagementPKDisplay() {
		return categoryManagementPKDisplay;
	}
	public void setCategoryManagementPKDisplay(String categoryManagementPKDisplay) {
		this.categoryManagementPKDisplay = categoryManagementPKDisplay;
	}
	public String getOrgCodeDisplay() {
		return orgCodeDisplay;
	}
	public void setOrgCodeDisplay(String orgCodeDisplay) {
		this.orgCodeDisplay = orgCodeDisplay;
	}
	public String getItemsApplyDeptCodeDisplay() {
		return itemsApplyDeptCodeDisplay;
	}
	public void setItemsApplyDeptCodeDisplay(String itemsApplyDeptCodeDisplay) {
		this.itemsApplyDeptCodeDisplay = itemsApplyDeptCodeDisplay;
	}
	public String getApplyPersonDisplay() {
		return applyPersonDisplay;
	}
	public void setApplyPersonDisplay(String applyPersonDisplay) {
		this.applyPersonDisplay = applyPersonDisplay;
	}
	
	public String getItemsIssueListerDisplay() {
		return itemsIssueListerDisplay;
	}
	public void setItemsIssueListerDisplay(String itemsIssueListerDisplay) {
		this.itemsIssueListerDisplay = itemsIssueListerDisplay;
	}
	public String getIamCheckFlag() {
		return iamCheckFlag;
	}
	public void setIamCheckFlag(String iamCheckFlag) {
		this.iamCheckFlag = iamCheckFlag;
	}
	public String getIamCheckFlagDisplay() {
		return iamCheckFlagDisplay;
	}
	public void setIamCheckFlagDisplay(String iamCheckFlagDisplay) {
		this.iamCheckFlagDisplay = iamCheckFlagDisplay;
	}
	public String getItemsApplyFlagDisplay() {
		return itemsApplyFlagDisplay;
	}
	public void setItemsApplyFlagDisplay(String itemsApplyFlagDisplay) {
		this.itemsApplyFlagDisplay = itemsApplyFlagDisplay;
	}
	
	
}
