package framework.modules.lowvalueitemsmanagement.domain;

import framework.sys.foreignkeytranslation.FK;
import framework.sys.foreignkeytranslation.Ref;

public class ItemsApplyMDetail implements java.io.Serializable, Cloneable {
	private String pk = "";
	//@FK(ref = Ref.Organization)
	private String itemsApplyMPK = "";
	//@FK(ref = Ref.Organization)
	private String categoryManagementPK = "";
	//@FK(ref = Ref.Organization)
	private String itemManagePK = "";
	@FK(ref = Ref.Organization)
	private String orgCode = "";
	//@FK(ref = Ref.Organization)
	private String itemsApplyDeptCode = "";
	private String iMName = "";
	//@FK(ref = Ref.Organization)
	private String iMAssetType = "";
	//@FK(ref = Ref.Organization)
	private String iMType = "";
	//@FK(ref = Ref.Organization)
	private String iMSpecification = "";
	//@FK(ref = Ref.Organization)
	private String iMMetricUnit = "";
	private Integer iAMApplyCount = 0;
	private String iAMCheckFlag = "";
	private Integer iAMListerCheckCount = 0; 
	private Integer iAMLeaderCheckCount = 0;
	private String assetRegPK = "";
	private String iAMItemManagePK = "";
	private String inserttime = "";
	private String lastestUpdate = "";
	private String updatePerson = "";

	// 外检翻译
	private String itemsApplyMPKDisplay = "";
	private String categoryManagementDisplay = "";
	private String itemManagePKDisplay = "";
	private String orgCodeDisplay = "";
	private String itemsApplyDeptCodeDisplay = "";
	private String iMAssetTypeDisplay = "";
	
	private String iMTypeDisplay = "";
	private String iMSpecificationDisplay = "";
	private String iMMetricUnitDisplay = "";
	
	public String getPk() {
		return pk;
	}
	public void setPk(String pk) {
		this.pk = pk;
	}
	public String getItemsApplyMPK() {
		return itemsApplyMPK;
	}
	public void setItemsApplyMPK(String itemsApplyMPK) {
		this.itemsApplyMPK = itemsApplyMPK;
	}
	public String getCategoryManagementPK() {
		return categoryManagementPK;
	}
	public void setCategoryManagementPK(String categoryManagementPK) {
		this.categoryManagementPK = categoryManagementPK;
	}
	public String getItemManagePK() {
		return itemManagePK;
	}
	public void setItemManagePK(String itemManagePK) {
		this.itemManagePK = itemManagePK;
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
	public String getiMType() {
		return iMType;
	}
	public void setiMType(String iMType) {
		this.iMType = iMType;
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
	public Integer getiAMApplyCount() {
		return iAMApplyCount;
	}
	public void setiAMApplyCount(Integer iAMApplyCount) {
		this.iAMApplyCount = iAMApplyCount;
	}
	public String getiAMCheckFlag() {
		return iAMCheckFlag;
	}
	public void setiAMCheckFlag(String iAMCheckFlag) {
		this.iAMCheckFlag = iAMCheckFlag;
	}
	public Integer getiAMListerCheckCount() {
		return iAMListerCheckCount;
	}
	public void setiAMListerCheckCount(Integer iAMListerCheckCount) {
		this.iAMListerCheckCount = iAMListerCheckCount;
	}
	public Integer getiAMLeaderCheckCount() {
		return iAMLeaderCheckCount;
	}
	public void setiAMLeaderCheckCount(Integer iAMLeaderCheckCount) {
		this.iAMLeaderCheckCount = iAMLeaderCheckCount;
	}
	public String getAssetRegPK() {
		return assetRegPK;
	}
	public void setAssetRegPK(String assetRegPK) {
		this.assetRegPK = assetRegPK;
	}
	public String getiAMItemManagePK() {
		return iAMItemManagePK;
	}
	public void setiAMItemManagePK(String iAMItemManagePK) {
		this.iAMItemManagePK = iAMItemManagePK;
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
	public String getItemsApplyMPKDisplay() {
		return itemsApplyMPKDisplay;
	}
	public void setItemsApplyMPKDisplay(String itemsApplyMPKDisplay) {
		this.itemsApplyMPKDisplay = itemsApplyMPKDisplay;
	}
	public String getCategoryManagementDisplay() {
		return categoryManagementDisplay;
	}
	public void setCategoryManagementDisplay(String categoryManagementDisplay) {
		this.categoryManagementDisplay = categoryManagementDisplay;
	}
	public String getItemManagePKDisplay() {
		return itemManagePKDisplay;
	}
	public void setItemManagePKDisplay(String itemManagePKDisplay) {
		this.itemManagePKDisplay = itemManagePKDisplay;
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
	public String getiMAssetTypeDisplay() {
		return iMAssetTypeDisplay;
	}
	public void setiMAssetTypeDisplay(String iMAssetTypeDisplay) {
		this.iMAssetTypeDisplay = iMAssetTypeDisplay;
	}
	public String getiMTypeDisplay() {
		return iMTypeDisplay;
	}
	public void setiMTypeDisplay(String iMTypeDisplay) {
		this.iMTypeDisplay = iMTypeDisplay;
	}
	public String getiMSpecificationDisplay() {
		return iMSpecificationDisplay;
	}
	public void setiMSpecificationDisplay(String iMSpecificationDisplay) {
		this.iMSpecificationDisplay = iMSpecificationDisplay;
	}
	public String getiMMetricUnitDisplay() {
		return iMMetricUnitDisplay;
	}
	public void setiMMetricUnitDisplay(String iMMetricUnitDisplay) {
		this.iMMetricUnitDisplay = iMMetricUnitDisplay;
	}
	
	

}
