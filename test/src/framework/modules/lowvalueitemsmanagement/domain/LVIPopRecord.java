package framework.modules.lowvalueitemsmanagement.domain;

import framework.sys.foreignkeytranslation.FK;
import framework.sys.foreignkeytranslation.Ref;

public class LVIPopRecord  implements java.io.Serializable, Cloneable {

	private String pk = "";
	@FK(ref = Ref.Category)
	private String lviPRCategoryPK = "";
	private String lviPRItemManagePK = "";
	private String lviPRName = "";
	@FK(ref = Ref.Classify)
	private String lviPRType = "";
	private String lviPRSpecification = "";
	private String lviPRMetricUnit = "";
	private Integer lviPRCount = 0;
	private String lviPRApplyPerson = "";
	
	private String lviPRPerson = "";
	private String lviPRDate = "";
	private String lviPRRemark = "";
	
	private String insertTime = "";
	private String lastestUpdate = "";
	private String updatePerson = "";

	// 外检翻译
	private String lviPRCategoryPKDisplay = "";
	/*private String lviPRItemManagePKDisplay = "";
	private String lviSRItemManagePKDisplay = "";
	private String lviPRNameDisplay = "";*/
	private String lviPRTypeDisplay = "";
	//private String lviPRSpecificationDisplay = "";
	
	public String getPk() {
		return pk;
	}
	public void setPk(String pk) {
		this.pk = pk;
	}
	public String getLviPRCategoryPK() {
		return lviPRCategoryPK;
	}
	public void setLviPRCategoryPK(String lviPRCategoryPK) {
		this.lviPRCategoryPK = lviPRCategoryPK;
	}
	public String getLviPRItemManagePK() {
		return lviPRItemManagePK;
	}
	public void setLviPRItemManagePK(String lviPRItemManagePK) {
		this.lviPRItemManagePK = lviPRItemManagePK;
	}
	public String getLviPRName() {
		return lviPRName;
	}
	public void setLviPRName(String lviPRName) {
		this.lviPRName = lviPRName;
	}
	public String getLviPRType() {
		return lviPRType;
	}
	public void setLviPRType(String lviPRType) {
		this.lviPRType = lviPRType;
	}
	public String getLviPRSpecification() {
		return lviPRSpecification;
	}
	public void setLviPRSpecification(String lviPRSpecification) {
		this.lviPRSpecification = lviPRSpecification;
	}
	public String getLviPRMetricUnit() {
		return lviPRMetricUnit;
	}
	public void setLviPRMetricUnit(String lviPRMetricUnit) {
		this.lviPRMetricUnit = lviPRMetricUnit;
	}
	public Integer getLviPRCount() {
		return lviPRCount;
	}
	public void setLviPRCount(Integer lviPRCount) {
		this.lviPRCount = lviPRCount;
	}
	public String getLviPRApplyPerson() {
		return lviPRApplyPerson;
	}
	public void setLviPRApplyPerson(String lviPRApplyPerson) {
		this.lviPRApplyPerson = lviPRApplyPerson;
	}
	public String getLviPRPerson() {
		return lviPRPerson;
	}
	public void setLviPRPerson(String lviPRPerson) {
		this.lviPRPerson = lviPRPerson;
	}
	public String getLviPRDate() {
		return lviPRDate;
	}
	public void setLviPRDate(String lviPRDate) {
		this.lviPRDate = lviPRDate;
	}
	public String getLviPRRemark() {
		return lviPRRemark;
	}
	public void setLviPRRemark(String lviPRRemark) {
		this.lviPRRemark = lviPRRemark;
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
	public String getLviPRCategoryPKDisplay() {
		return lviPRCategoryPKDisplay;
	}
	public void setLviPRCategoryPKDisplay(String lviPRCategoryPKDisplay) {
		this.lviPRCategoryPKDisplay = lviPRCategoryPKDisplay;
	}
	public String getLviPRTypeDisplay() {
		return lviPRTypeDisplay;
	}
	public void setLviPRTypeDisplay(String lviPRTypeDisplay) {
		this.lviPRTypeDisplay = lviPRTypeDisplay;
	}
	
}
