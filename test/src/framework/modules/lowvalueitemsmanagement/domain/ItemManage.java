package framework.modules.lowvalueitemsmanagement.domain;

import framework.sys.foreignkeytranslation.FK;
import framework.sys.foreignkeytranslation.Ref;

public class ItemManage implements java.io.Serializable, Cloneable {

	private String pk = "";
	@FK(ref = Ref.Category)
	private String imCategoryPK = "";//物品所属的类目对应的PK，对应D001的PK字段
	@FK(ref = Ref.Classify)
	private String imType="";
	private String imName = "";
	//@FK(ref = Ref.AssetClassify)
	private String imAssetType = "";
	
	private String imSpecification = "";
	private String imMetricUnit = "";
	private String imRemark = "";
	private String insertTime = "";
	private String lastestUpdate="";
	private String updatePerson = "";
	
	// 外检翻译
	private String imCategoryPKDisplay = "";
	private String imTypeDisplay = "";
	//private String imAssetTypeDisplay = "";
	
	public String getPk() {
		return pk;
	}
	public void setPk(String pk) {
		this.pk = pk;
	}
	public String getImCategoryPK() {
		return imCategoryPK;
	}
	public void setImCategoryPK(String imCategoryPK) {
		this.imCategoryPK = imCategoryPK;
	}
	public String getImType() {
		return imType;
	}
	public void setImType(String imType) {
		this.imType = imType;
	}
	public String getImName() {
		return imName;
	}
	public void setImName(String imName) {
		this.imName = imName;
	}
	public String getImAssetType() {
		return imAssetType;
	}
	public void setImAssetType(String imAssetType) {
		this.imAssetType = imAssetType;
	}
	public String getImSpecification() {
		return imSpecification;
	}
	public void setImSpecification(String imSpecification) {
		this.imSpecification = imSpecification;
	}
	public String getImMetricUnit() {
		return imMetricUnit;
	}
	public void setImMetricUnit(String imMetricUnit) {
		this.imMetricUnit = imMetricUnit;
	}
	public String getImRemark() {
		return imRemark;
	}
	public void setImRemark(String imRemark) {
		this.imRemark = imRemark;
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
	public String getImCategoryPKDisplay() {
		return imCategoryPKDisplay;
	}
	public void setImCategoryPKDisplay(String imCategoryPKDisplay) {
		this.imCategoryPKDisplay = imCategoryPKDisplay;
	}
	public String getImTypeDisplay() {
		return imTypeDisplay;
	}
	public void setImTypeDisplay(String imTypeDisplay) {
		this.imTypeDisplay = imTypeDisplay;
	}
	
}
