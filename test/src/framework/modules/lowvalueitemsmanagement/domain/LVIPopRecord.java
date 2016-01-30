package framework.modules.lowvalueitemsmanagement.domain;

public class LVIPopRecord  implements java.io.Serializable, Cloneable {

	private String pk = "";
	//@FK(ref = Ref.Organization)
	private String lVIPRCategoryPK = "";
	//@FK(ref = Ref.Organization)
	private String lVIPRItemManagePK = "";
	//@FK(ref = Ref.Organization)
	private String lVIPRName = "";
	//@FK(ref = Ref.Organization)
	private String lVIPRType = "";
	//@FK(ref = Ref.Organization)
	private String lVIPRSpecification = "";
	//@FK(ref = Ref.Organization)
	private String lVIPRMetricUnit = "";
	//@FK(ref = Ref.Organization)
	private Integer lVIPRCount = 0;
	//@FK(ref = Ref.Organization)
	private String lVIPRApplyPerson = "";
	
	private String lVIPRPerson = "";
	private String lVIPRDate = "";
	private String lVIPRRemark = "";
	
	private String inserttime = "";
	private String lastestUpdate = "";
	private String updatePerson = "";

	// 外检翻译
	private String lVIPRCategoryPKDisplay = "";
	private String lVIPRItemManagePKDisplay = "";
	private String lVISRItemManagePKDisplay = "";
	private String lVIPRNameDisplay = "";
	private String lVIPRTypeDisplay = "";
	private String lVIPRSpecificationDisplay = "";
	
	public String getPk() {
		return pk;
	}
	public void setPk(String pk) {
		this.pk = pk;
	}
	public String getlVIPRCategoryPK() {
		return lVIPRCategoryPK;
	}
	public void setlVIPRCategoryPK(String lVIPRCategoryPK) {
		this.lVIPRCategoryPK = lVIPRCategoryPK;
	}
	public String getlVIPRItemManagePK() {
		return lVIPRItemManagePK;
	}
	public void setlVIPRItemManagePK(String lVIPRItemManagePK) {
		this.lVIPRItemManagePK = lVIPRItemManagePK;
	}
	public String getlVIPRName() {
		return lVIPRName;
	}
	public void setlVIPRName(String lVIPRName) {
		this.lVIPRName = lVIPRName;
	}
	public String getlVIPRType() {
		return lVIPRType;
	}
	public void setlVIPRType(String lVIPRType) {
		this.lVIPRType = lVIPRType;
	}
	public String getlVIPRSpecification() {
		return lVIPRSpecification;
	}
	public void setlVIPRSpecification(String lVIPRSpecification) {
		this.lVIPRSpecification = lVIPRSpecification;
	}
	public String getlVIPRMetricUnit() {
		return lVIPRMetricUnit;
	}
	public void setlVIPRMetricUnit(String lVIPRMetricUnit) {
		this.lVIPRMetricUnit = lVIPRMetricUnit;
	}
	public Integer getlVIPRCount() {
		return lVIPRCount;
	}
	public void setlVIPRCount(Integer lVIPRCount) {
		this.lVIPRCount = lVIPRCount;
	}
	public String getlVIPRApplyPerson() {
		return lVIPRApplyPerson;
	}
	public void setlVIPRApplyPerson(String lVIPRApplyPerson) {
		this.lVIPRApplyPerson = lVIPRApplyPerson;
	}
	public String getlVIPRPerson() {
		return lVIPRPerson;
	}
	public void setlVIPRPerson(String lVIPRPerson) {
		this.lVIPRPerson = lVIPRPerson;
	}
	public String getlVIPRDate() {
		return lVIPRDate;
	}
	public void setlVIPRDate(String lVIPRDate) {
		this.lVIPRDate = lVIPRDate;
	}
	public String getlVIPRRemark() {
		return lVIPRRemark;
	}
	public void setlVIPRRemark(String lVIPRRemark) {
		this.lVIPRRemark = lVIPRRemark;
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
	public String getlVIPRCategoryPKDisplay() {
		return lVIPRCategoryPKDisplay;
	}
	public void setlVIPRCategoryPKDisplay(String lVIPRCategoryPKDisplay) {
		this.lVIPRCategoryPKDisplay = lVIPRCategoryPKDisplay;
	}
	public String getlVIPRItemManagePKDisplay() {
		return lVIPRItemManagePKDisplay;
	}
	public void setlVIPRItemManagePKDisplay(String lVIPRItemManagePKDisplay) {
		this.lVIPRItemManagePKDisplay = lVIPRItemManagePKDisplay;
	}
	public String getlVISRItemManagePKDisplay() {
		return lVISRItemManagePKDisplay;
	}
	public void setlVISRItemManagePKDisplay(String lVISRItemManagePKDisplay) {
		this.lVISRItemManagePKDisplay = lVISRItemManagePKDisplay;
	}
	public String getlVIPRNameDisplay() {
		return lVIPRNameDisplay;
	}
	public void setlVIPRNameDisplay(String lVIPRNameDisplay) {
		this.lVIPRNameDisplay = lVIPRNameDisplay;
	}
	public String getlVIPRTypeDisplay() {
		return lVIPRTypeDisplay;
	}
	public void setlVIPRTypeDisplay(String lVIPRTypeDisplay) {
		this.lVIPRTypeDisplay = lVIPRTypeDisplay;
	}
	public String getlVIPRSpecificationDisplay() {
		return lVIPRSpecificationDisplay;
	}
	public void setlVIPRSpecificationDisplay(String lVIPRSpecificationDisplay) {
		this.lVIPRSpecificationDisplay = lVIPRSpecificationDisplay;
	}
	
	

}
