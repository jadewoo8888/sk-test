package framework.modules.lowvalueitemsmanagement.domain;

import framework.sys.foreignkeytranslation.FK;
import framework.sys.foreignkeytranslation.Ref;

public class ItemsApplyMDetail implements java.io.Serializable, Cloneable {
	private String pk = "";
	private String itemsApplyMPK = "";
	private String categoryManagementPK = "";
	private String itemManagePK = "";
	private String orgCode = "";
	private String itemsApplyDeptCode = "";
	private String imName = "";
	//@FK(ref = Ref.AssetClassify)
	private String imAssetType = "";
	@FK(ref = Ref.Classify)
	private String imType = "";
	private String imSpecification = "";
	private String imMetricUnit = "";
	private Integer iamApplyCount = 0;
	private String iamCheckFlag = "";
	private Integer iamListerCheckCount = 0; 
	private Integer iamLeaderCheckCount = 0;
	private String assetRegPK = "";
	private String iamItemManagePK = "";
	private String insertTime = "";
	private String lastestUpdate = "";
	private String updatePerson = "";
	
	// 外检翻译
	//private String itemsApplyMPKDisplay = "";
	//private String categoryManagementDisplay = "";
	//private String itemManagePKDisplay = "";
	//private String orgCodeDisplay = "";
	//private String itemsApplyDeptCodeDisplay = "";
	//private String iMAssetTypeDisplay = "";
	
	private String imTypeDisplay = "";
	//private String iMSpecificationDisplay = "";
	//private String iMMetricUnitDisplay = "";
	
	//特殊字段
	private int itemStoreCount = 0;//库存

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

	public String getImType() {
		return imType;
	}

	public void setImType(String imType) {
		this.imType = imType;
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

	public Integer getIamApplyCount() {
		return iamApplyCount;
	}

	public void setIamApplyCount(Integer iamApplyCount) {
		this.iamApplyCount = iamApplyCount;
	}

	public String getIamCheckFlag() {
		return iamCheckFlag;
	}

	public void setIamCheckFlag(String iamCheckFlag) {
		this.iamCheckFlag = iamCheckFlag;
	}

	public Integer getIamListerCheckCount() {
		return iamListerCheckCount;
	}

	public void setIamListerCheckCount(Integer iamListerCheckCount) {
		this.iamListerCheckCount = iamListerCheckCount;
	}

	public Integer getIamLeaderCheckCount() {
		return iamLeaderCheckCount;
	}

	public void setIamLeaderCheckCount(Integer iamLeaderCheckCount) {
		this.iamLeaderCheckCount = iamLeaderCheckCount;
	}

	public String getAssetRegPK() {
		return assetRegPK;
	}

	public void setAssetRegPK(String assetRegPK) {
		this.assetRegPK = assetRegPK;
	}

	public String getIamItemManagePK() {
		return iamItemManagePK;
	}

	public void setIamItemManagePK(String iamItemManagePK) {
		this.iamItemManagePK = iamItemManagePK;
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


	public String getImTypeDisplay() {
		return imTypeDisplay;
	}

	public void setImTypeDisplay(String imTypeDisplay) {
		this.imTypeDisplay = imTypeDisplay;
	}

	public int getItemStoreCount() {
		return itemStoreCount;
	}

	public void setItemStoreCount(int itemStoreCount) {
		this.itemStoreCount = itemStoreCount;
	}

}
