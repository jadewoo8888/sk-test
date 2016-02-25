package framework.modules.lowvalueitemsmanagement.domain;

import framework.sys.foreignkeytranslation.FK;
import framework.sys.foreignkeytranslation.Ref;

public class LowValueItems implements java.io.Serializable, Cloneable{

	private String pk = "";
	@FK(ref = Ref.Category)
	private String lviCategoryPK = "";
	private String lviItemManagePK = "";
	private String lviName = "";
	@FK(ref = Ref.Classify)
	private String lviType = "";
	private String lviSpecification = "";
	private String lviMetricUnit = "";
	private Integer lviCount = 0;
	private String lviRemark = "";
	private String inserttime = "";
	private String lastestUpdate = "";
	private String updatePerson = "";

	// 外检翻译
	private String lviCategoryPKDisplay = "";
	private String lviTypeDisplay = "";
	
	public String getPk() {
		return pk;
	}
	public void setPk(String pk) {
		this.pk = pk;
	}
	public String getLviCategoryPK() {
		return lviCategoryPK;
	}
	public void setLviCategoryPK(String lviCategoryPK) {
		this.lviCategoryPK = lviCategoryPK;
	}
	public String getLviItemManagePK() {
		return lviItemManagePK;
	}
	public void setLviItemManagePK(String lviItemManagePK) {
		this.lviItemManagePK = lviItemManagePK;
	}
	public String getLviName() {
		return lviName;
	}
	public void setLviName(String lviName) {
		this.lviName = lviName;
	}
	public String getLviType() {
		return lviType;
	}
	public void setLviType(String lviType) {
		this.lviType = lviType;
	}
	public String getLviSpecification() {
		return lviSpecification;
	}
	public void setLviSpecification(String lviSpecification) {
		this.lviSpecification = lviSpecification;
	}
	public String getLviMetricUnit() {
		return lviMetricUnit;
	}
	public void setLviMetricUnit(String lviMetricUnit) {
		this.lviMetricUnit = lviMetricUnit;
	}
	public Integer getLviCount() {
		return lviCount;
	}
	public void setLviCount(Integer lviCount) {
		this.lviCount = lviCount;
	}
	public String getLviRemark() {
		return lviRemark;
	}
	public void setLviRemark(String lviRemark) {
		this.lviRemark = lviRemark;
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
	public String getLviCategoryPKDisplay() {
		return lviCategoryPKDisplay;
	}
	public void setLviCategoryPKDisplay(String lviCategoryPKDisplay) {
		this.lviCategoryPKDisplay = lviCategoryPKDisplay;
	}
	public String getLviTypeDisplay() {
		return lviTypeDisplay;
	}
	public void setLviTypeDisplay(String lviTypeDisplay) {
		this.lviTypeDisplay = lviTypeDisplay;
	}
	
	
	
	

}
