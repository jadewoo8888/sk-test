package framework.modules.lowvalueitemsmanagement.domain;

public class LVIStoreRecord implements java.io.Serializable, Cloneable {

	private String pk = "";
	//@FK(ref = Ref.Organization)
	private String lVISRPurchasePK = "";
	//@FK(ref = Ref.Organization)
	private String lVISRCategoryPK = "";
	//@FK(ref = Ref.Organization)
	private String lVISRItemManagePK = "";
	//@FK(ref = Ref.Organization)
	private String lVISROrgCode = "";
	//@FK(ref = Ref.Organization)
	private String lVISRName = "";
	//@FK(ref = Ref.Organization)
	private String lVISRType = "";
	//@FK(ref = Ref.Organization)
	private String lVISRSpecification = "";
	//@FK(ref = Ref.Organization)
	private String lVISRMetricUnit = "";
	
	private Integer lVISRCount = 0;
	private String lVISRPerson = "";
	private String lVISRDate = "";
	private String lVISRRemark = "";
	
	private String inserttime = "";
	private String lastestUpdate = "";
	private String updatePerson = "";

	// 外检翻译
	private String lVISRPurchasePKDisplay = "";
	private String lVISRCategoryPKDisplay = "";
	private String lVISRItemManagePKDisplay = "";
	private String lVISROrgCodeDisplay = "";
	private String lVISRTypeDisplay = "";
	private String lVISRSpecificationDisplay = "";
	private String lVISRMetricUnitDisplay = "";
	
	public String getPk() {
		return pk;
	}
	public void setPk(String pk) {
		this.pk = pk;
	}
	public String getlVISRPurchasePK() {
		return lVISRPurchasePK;
	}
	public void setlVISRPurchasePK(String lVISRPurchasePK) {
		this.lVISRPurchasePK = lVISRPurchasePK;
	}
	public String getlVISRCategoryPK() {
		return lVISRCategoryPK;
	}
	public void setlVISRCategoryPK(String lVISRCategoryPK) {
		this.lVISRCategoryPK = lVISRCategoryPK;
	}
	public String getlVISRItemManagePK() {
		return lVISRItemManagePK;
	}
	public void setlVISRItemManagePK(String lVISRItemManagePK) {
		this.lVISRItemManagePK = lVISRItemManagePK;
	}
	public String getlVISROrgCode() {
		return lVISROrgCode;
	}
	public void setlVISROrgCode(String lVISROrgCode) {
		this.lVISROrgCode = lVISROrgCode;
	}
	public String getlVISRName() {
		return lVISRName;
	}
	public void setlVISRName(String lVISRName) {
		this.lVISRName = lVISRName;
	}
	public String getlVISRType() {
		return lVISRType;
	}
	public void setlVISRType(String lVISRType) {
		this.lVISRType = lVISRType;
	}
	public String getlVISRSpecification() {
		return lVISRSpecification;
	}
	public void setlVISRSpecification(String lVISRSpecification) {
		this.lVISRSpecification = lVISRSpecification;
	}
	public String getlVISRMetricUnit() {
		return lVISRMetricUnit;
	}
	public void setlVISRMetricUnit(String lVISRMetricUnit) {
		this.lVISRMetricUnit = lVISRMetricUnit;
	}
	public Integer getlVISRCount() {
		return lVISRCount;
	}
	public void setlVISRCount(Integer lVISRCount) {
		this.lVISRCount = lVISRCount;
	}
	public String getlVISRPerson() {
		return lVISRPerson;
	}
	public void setlVISRPerson(String lVISRPerson) {
		this.lVISRPerson = lVISRPerson;
	}
	public String getlVISRDate() {
		return lVISRDate;
	}
	public void setlVISRDate(String lVISRDate) {
		this.lVISRDate = lVISRDate;
	}
	public String getlVISRRemark() {
		return lVISRRemark;
	}
	public void setlVISRRemark(String lVISRRemark) {
		this.lVISRRemark = lVISRRemark;
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
	public String getlVISRPurchasePKDisplay() {
		return lVISRPurchasePKDisplay;
	}
	public void setlVISRPurchasePKDisplay(String lVISRPurchasePKDisplay) {
		this.lVISRPurchasePKDisplay = lVISRPurchasePKDisplay;
	}
	public String getlVISRCategoryPKDisplay() {
		return lVISRCategoryPKDisplay;
	}
	public void setlVISRCategoryPKDisplay(String lVISRCategoryPKDisplay) {
		this.lVISRCategoryPKDisplay = lVISRCategoryPKDisplay;
	}
	public String getlVISRItemManagePKDisplay() {
		return lVISRItemManagePKDisplay;
	}
	public void setlVISRItemManagePKDisplay(String lVISRItemManagePKDisplay) {
		this.lVISRItemManagePKDisplay = lVISRItemManagePKDisplay;
	}
	public String getlVISROrgCodeDisplay() {
		return lVISROrgCodeDisplay;
	}
	public void setlVISROrgCodeDisplay(String lVISROrgCodeDisplay) {
		this.lVISROrgCodeDisplay = lVISROrgCodeDisplay;
	}
	public String getlVISRTypeDisplay() {
		return lVISRTypeDisplay;
	}
	public void setlVISRTypeDisplay(String lVISRTypeDisplay) {
		this.lVISRTypeDisplay = lVISRTypeDisplay;
	}
	public String getlVISRSpecificationDisplay() {
		return lVISRSpecificationDisplay;
	}
	public void setlVISRSpecificationDisplay(String lVISRSpecificationDisplay) {
		this.lVISRSpecificationDisplay = lVISRSpecificationDisplay;
	}
	public String getlVISRMetricUnitDisplay() {
		return lVISRMetricUnitDisplay;
	}
	public void setlVISRMetricUnitDisplay(String lVISRMetricUnitDisplay) {
		this.lVISRMetricUnitDisplay = lVISRMetricUnitDisplay;
	}
	
	
}
