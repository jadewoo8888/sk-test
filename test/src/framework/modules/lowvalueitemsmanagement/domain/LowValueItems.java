package framework.modules.lowvalueitemsmanagement.domain;

import framework.sys.foreignkeytranslation.FK;
import framework.sys.foreignkeytranslation.Ref;

public class LowValueItems implements java.io.Serializable, Cloneable{

	private String pk = "";
	//@FK(ref = Ref.Organization)
	private String lVICategoryPK = "";
	//@FK(ref = Ref.Organization)
	private String lVIItemManagePK = "";
	//@FK(ref = Ref.Organization)
	private String lVIName = "";
	//@FK(ref = Ref.Organization)
	private String lVIType = "";
	//@FK(ref = Ref.Organization)
	private String lVISpecification = "";
	//@FK(ref = Ref.Organization)
	private String lVIMetricUnit = "";
	private Integer lVICount = 0;
	private String lVIRemark = "";
	private String inserttime = "";
	private String lastestUpdate = "";
	private String updatePerson = "";

	// 外检翻译
	private String lVICategoryPKDisplay = "";
	private String lVIItemManagePKDisplay = "";
	private String lVITypeDisplay = "";
	private String lVISpecificationDisplay = "";
	private String lVIMetricUnitDisplay = "";
	
	public String getPk() {
		return pk;
	}
	public void setPk(String pk) {
		this.pk = pk;
	}
	public String getlVICategoryPK() {
		return lVICategoryPK;
	}
	public void setlVICategoryPK(String lVICategoryPK) {
		this.lVICategoryPK = lVICategoryPK;
	}
	public String getlVIItemManagePK() {
		return lVIItemManagePK;
	}
	public void setlVIItemManagePK(String lVIItemManagePK) {
		this.lVIItemManagePK = lVIItemManagePK;
	}
	public String getlVIName() {
		return lVIName;
	}
	public void setlVIName(String lVIName) {
		this.lVIName = lVIName;
	}
	public String getlVIType() {
		return lVIType;
	}
	public void setlVIType(String lVIType) {
		this.lVIType = lVIType;
	}
	public String getlVISpecification() {
		return lVISpecification;
	}
	public void setlVISpecification(String lVISpecification) {
		this.lVISpecification = lVISpecification;
	}
	public String getlVIMetricUnit() {
		return lVIMetricUnit;
	}
	public void setlVIMetricUnit(String lVIMetricUnit) {
		this.lVIMetricUnit = lVIMetricUnit;
	}
	public Integer getlVICount() {
		return lVICount;
	}
	public void setlVICount(Integer lVICount) {
		this.lVICount = lVICount;
	}
	public String getlVIRemark() {
		return lVIRemark;
	}
	public void setlVIRemark(String lVIRemark) {
		this.lVIRemark = lVIRemark;
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
	public String getlVICategoryPKDisplay() {
		return lVICategoryPKDisplay;
	}
	public void setlVICategoryPKDisplay(String lVICategoryPKDisplay) {
		this.lVICategoryPKDisplay = lVICategoryPKDisplay;
	}
	public String getlVIItemManagePKDisplay() {
		return lVIItemManagePKDisplay;
	}
	public void setlVIItemManagePKDisplay(String lVIItemManagePKDisplay) {
		this.lVIItemManagePKDisplay = lVIItemManagePKDisplay;
	}
	public String getlVITypeDisplay() {
		return lVITypeDisplay;
	}
	public void setlVITypeDisplay(String lVITypeDisplay) {
		this.lVITypeDisplay = lVITypeDisplay;
	}
	public String getlVISpecificationDisplay() {
		return lVISpecificationDisplay;
	}
	public void setlVISpecificationDisplay(String lVISpecificationDisplay) {
		this.lVISpecificationDisplay = lVISpecificationDisplay;
	}
	public String getlVIMetricUnitDisplay() {
		return lVIMetricUnitDisplay;
	}
	public void setlVIMetricUnitDisplay(String lVIMetricUnitDisplay) {
		this.lVIMetricUnitDisplay = lVIMetricUnitDisplay;
	} 
	
	

}
