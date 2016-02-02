package framework.modules.lowvalueitemsmanagement.domain;

import framework.sys.foreignkeytranslation.FK;
import framework.sys.foreignkeytranslation.Ref;

public class ItemManage implements java.io.Serializable, Cloneable {

	private String pk = "";
	//@FK(ref = Ref.Organization)
	private String iMCategoryPK = "";//物品所属的类目对应的PK，对应D001的PK字段
	private String iMType="";
	private String iMName = "";
	//@FK(ref = Ref.)
	private String iMAssetType = "";
	
	private String iMSpecification = "";
	private String iMMetricUnit = "";
	private String iMRemark = "";
	private String insertTime = "";
	private String lastestUpdate="";
	private String updatePerson = "";
	
	// 外检翻译
	private String iMCategoryPKDisplay = "";
	private String iMAssetTypeDisplay = "";
	
	public String getPk() {
		return pk;
	}
	public void setPk(String pk) {
		this.pk = pk;
	}
	public String getiMCategoryPK() {
		return iMCategoryPK;
	}
	public void setiMCategoryPK(String iMCategoryPK) {
		this.iMCategoryPK = iMCategoryPK;
	}
	public String getiMType() {
		return iMType;
	}
	public void setiMType(String iMType) {
		this.iMType = iMType;
	}
	public String getiMName() {
		return iMName;
	}
	public void setiMName(String iMName) {
		this.iMName = iMName;
	}
	public String getiMAssetType() {
		return iMAssetType;
	}
	public void setiMAssetType(String iMAssetType) {
		this.iMAssetType = iMAssetType;
	}
	public String getiMSpecification() {
		return iMSpecification;
	}
	public void setiMSpecification(String iMSpecification) {
		this.iMSpecification = iMSpecification;
	}
	public String getiMMetricUnit() {
		return iMMetricUnit;
	}
	public void setiMMetricUnit(String iMMetricUnit) {
		this.iMMetricUnit = iMMetricUnit;
	}
	public String getiMRemark() {
		return iMRemark;
	}
	public void setiMRemark(String iMRemark) {
		this.iMRemark = iMRemark;
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
	public String getiMCategoryPKDisplay() {
		return iMCategoryPKDisplay;
	}
	public void setiMCategoryPKDisplay(String iMCategoryPKDisplay) {
		this.iMCategoryPKDisplay = iMCategoryPKDisplay;
	}
	public String getiMAssetTypeDisplay() {
		return iMAssetTypeDisplay;
	}
	public void setiMAssetTypeDisplay(String iMAssetTypeDisplay) {
		this.iMAssetTypeDisplay = iMAssetTypeDisplay;
	}
	
	
}
