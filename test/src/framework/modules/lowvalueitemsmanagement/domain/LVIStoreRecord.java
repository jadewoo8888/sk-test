package framework.modules.lowvalueitemsmanagement.domain;

import framework.sys.foreignkeytranslation.FK;
import framework.sys.foreignkeytranslation.Ref;

public class LVIStoreRecord implements java.io.Serializable, Cloneable {

	private String pk = "";
	private String lviSRPurchasePK = "";
	@FK(ref = Ref.Category)
	private String lviSRCategoryPK = "";
	private String lviSRItemManagePK = "";
	@FK(ref = Ref.Organization)
	private String lviSROrgCode = "";
	@FK(ref = Ref.Department)
	private String lviSRDeptCode = "";
	private String lviSRName = "";
	@FK(ref = Ref.Classify)
	private String lviSRType = "";
	private String lviSRSpecification = "";
	private String lviSRMetricUnit = "";
	
	private Integer lviSRCount = 0;
	private String lviSRPerson = "";
	private String lviSRDate = "";
	private String lviSRRemark = "";
	
	private String inserttime = "";
	private String lastestUpdate = "";
	private String updatePerson = "";

	// 外检翻译
	private String lviSRPurchasePKDisplay = "";
	private String lviSRCategoryPKDisplay = "";
	private String lviSROrgCodeDisplay = "";
	private String lviSRDeptCodeDisplay = "";
	private String lviSRTypeDisplay = "";
	
	public String getPk() {
		return pk;
	}
	public void setPk(String pk) {
		this.pk = pk;
	}
	public String getLviSRPurchasePK() {
		return lviSRPurchasePK;
	}
	public void setLviSRPurchasePK(String lviSRPurchasePK) {
		this.lviSRPurchasePK = lviSRPurchasePK;
	}
	public String getLviSRCategoryPK() {
		return lviSRCategoryPK;
	}
	public void setLviSRCategoryPK(String lviSRCategoryPK) {
		this.lviSRCategoryPK = lviSRCategoryPK;
	}
	public String getLviSRItemManagePK() {
		return lviSRItemManagePK;
	}
	public void setLviSRItemManagePK(String lviSRItemManagePK) {
		this.lviSRItemManagePK = lviSRItemManagePK;
	}
	public String getLviSROrgCode() {
		return lviSROrgCode;
	}
	public void setLviSROrgCode(String lviSROrgCode) {
		this.lviSROrgCode = lviSROrgCode;
	}
	public String getLviSRName() {
		return lviSRName;
	}
	public void setLviSRName(String lviSRName) {
		this.lviSRName = lviSRName;
	}
	public String getLviSRType() {
		return lviSRType;
	}
	public void setLviSRType(String lviSRType) {
		this.lviSRType = lviSRType;
	}
	public String getLviSRSpecification() {
		return lviSRSpecification;
	}
	public void setLviSRSpecification(String lviSRSpecification) {
		this.lviSRSpecification = lviSRSpecification;
	}
	public String getLviSRMetricUnit() {
		return lviSRMetricUnit;
	}
	public void setLviSRMetricUnit(String lviSRMetricUnit) {
		this.lviSRMetricUnit = lviSRMetricUnit;
	}
	public Integer getLviSRCount() {
		return lviSRCount;
	}
	public void setLviSRCount(Integer lviSRCount) {
		this.lviSRCount = lviSRCount;
	}
	public String getLviSRPerson() {
		return lviSRPerson;
	}
	public void setLviSRPerson(String lviSRPerson) {
		this.lviSRPerson = lviSRPerson;
	}
	public String getLviSRDate() {
		return lviSRDate;
	}
	public void setLviSRDate(String lviSRDate) {
		this.lviSRDate = lviSRDate;
	}
	public String getLviSRRemark() {
		return lviSRRemark;
	}
	public void setLviSRRemark(String lviSRRemark) {
		this.lviSRRemark = lviSRRemark;
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
	public String getLviSRPurchasePKDisplay() {
		return lviSRPurchasePKDisplay;
	}
	public void setLviSRPurchasePKDisplay(String lviSRPurchasePKDisplay) {
		this.lviSRPurchasePKDisplay = lviSRPurchasePKDisplay;
	}
	public String getLviSRCategoryPKDisplay() {
		return lviSRCategoryPKDisplay;
	}
	public void setLviSRCategoryPKDisplay(String lviSRCategoryPKDisplay) {
		this.lviSRCategoryPKDisplay = lviSRCategoryPKDisplay;
	}
	public String getLviSROrgCodeDisplay() {
		return lviSROrgCodeDisplay;
	}
	public void setLviSROrgCodeDisplay(String lviSROrgCodeDisplay) {
		this.lviSROrgCodeDisplay = lviSROrgCodeDisplay;
	}
	public String getLviSRTypeDisplay() {
		return lviSRTypeDisplay;
	}
	public void setLviSRTypeDisplay(String lviSRTypeDisplay) {
		this.lviSRTypeDisplay = lviSRTypeDisplay;
	}
	public String getLviSRDeptCode() {
		return lviSRDeptCode;
	}
	public void setLviSRDeptCode(String lviSRDeptCode) {
		this.lviSRDeptCode = lviSRDeptCode;
	}
	public String getLviSRDeptCodeDisplay() {
		return lviSRDeptCodeDisplay;
	}
	public void setLviSRDeptCodeDisplay(String lviSRDeptCodeDisplay) {
		this.lviSRDeptCodeDisplay = lviSRDeptCodeDisplay;
	}
	
}
