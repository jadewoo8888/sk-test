package framework.modules.lowvalueitemsmanagement.domain;


public class ItemsPurchaseDetail implements java.io.Serializable, Cloneable {

	private String pk = "";
	//@FK(ref = Ref.Organization)
	private String iPDItemsPurchasePK = "";
	//@FK(ref = Ref.Organization)
	private String iPDItemManagePK = "";
	//@FK(ref = Ref.Organization)
	private String iPDName = "";
	//@FK(ref = Ref.Organization)
	private String iPDType = "";
	//@FK(ref = Ref.Organization)
	private String iPDSpecification = "";
	//@FK(ref = Ref.Organization)
	private String iPDMetricUnit = "";
	private Integer iPDApplyCount = 0;
	private Integer iPDApproveCount = 0;
	private Integer iPDPurchaseCount = 0;
	private Integer iPDStoreCount = 0;
	private String iPDCheckFlag = "";
	private String inserttime = "";
	private String lastestUpdate = "";
	private String updatePerson = "";

	// 外检翻译
	private String iPDItemsPurchasePKDisplay = "";
	private String iPDItemManagePKDisplay = "";
	private String iPDNameDisplay = "";
	private String iPDTypeDisplay = "";
	private String iPDSpecificationDisplay = "";
	private String iPDMetricUnitDisplay = "";
	
	
	public String getPk() {
		return pk;
	}
	public void setPk(String pk) {
		this.pk = pk;
	}
	public String getiPDItemsPurchasePK() {
		return iPDItemsPurchasePK;
	}
	public void setiPDItemsPurchasePK(String iPDItemsPurchasePK) {
		this.iPDItemsPurchasePK = iPDItemsPurchasePK;
	}
	public String getiPDItemManagePK() {
		return iPDItemManagePK;
	}
	public void setiPDItemManagePK(String iPDItemManagePK) {
		this.iPDItemManagePK = iPDItemManagePK;
	}
	public String getiPDName() {
		return iPDName;
	}
	public void setiPDName(String iPDName) {
		this.iPDName = iPDName;
	}
	public String getiPDType() {
		return iPDType;
	}
	public void setiPDType(String iPDType) {
		this.iPDType = iPDType;
	}
	public String getiPDSpecification() {
		return iPDSpecification;
	}
	public void setiPDSpecification(String iPDSpecification) {
		this.iPDSpecification = iPDSpecification;
	}
	public String getiPDMetricUnit() {
		return iPDMetricUnit;
	}
	public void setiPDMetricUnit(String iPDMetricUnit) {
		this.iPDMetricUnit = iPDMetricUnit;
	}
	public Integer getiPDApplyCount() {
		return iPDApplyCount;
	}
	public void setiPDApplyCount(Integer iPDApplyCount) {
		this.iPDApplyCount = iPDApplyCount;
	}
	public Integer getiPDApproveCount() {
		return iPDApproveCount;
	}
	public void setiPDApproveCount(Integer iPDApproveCount) {
		this.iPDApproveCount = iPDApproveCount;
	}
	public Integer getiPDPurchaseCount() {
		return iPDPurchaseCount;
	}
	public void setiPDPurchaseCount(Integer iPDPurchaseCount) {
		this.iPDPurchaseCount = iPDPurchaseCount;
	}
	public Integer getiPDStoreCount() {
		return iPDStoreCount;
	}
	public void setiPDStoreCount(Integer iPDStoreCount) {
		this.iPDStoreCount = iPDStoreCount;
	}
	public String getiPDCheckFlag() {
		return iPDCheckFlag;
	}
	public void setiPDCheckFlag(String iPDCheckFlag) {
		this.iPDCheckFlag = iPDCheckFlag;
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
	public String getiPDItemsPurchasePKDisplay() {
		return iPDItemsPurchasePKDisplay;
	}
	public void setiPDItemsPurchasePKDisplay(String iPDItemsPurchasePKDisplay) {
		this.iPDItemsPurchasePKDisplay = iPDItemsPurchasePKDisplay;
	}
	public String getiPDItemManagePKDisplay() {
		return iPDItemManagePKDisplay;
	}
	public void setiPDItemManagePKDisplay(String iPDItemManagePKDisplay) {
		this.iPDItemManagePKDisplay = iPDItemManagePKDisplay;
	}
	public String getiPDNameDisplay() {
		return iPDNameDisplay;
	}
	public void setiPDNameDisplay(String iPDNameDisplay) {
		this.iPDNameDisplay = iPDNameDisplay;
	}
	public String getiPDTypeDisplay() {
		return iPDTypeDisplay;
	}
	public void setiPDTypeDisplay(String iPDTypeDisplay) {
		this.iPDTypeDisplay = iPDTypeDisplay;
	}
	public String getiPDSpecificationDisplay() {
		return iPDSpecificationDisplay;
	}
	public void setiPDSpecificationDisplay(String iPDSpecificationDisplay) {
		this.iPDSpecificationDisplay = iPDSpecificationDisplay;
	}
	public String getiPDMetricUnitDisplay() {
		return iPDMetricUnitDisplay;
	}
	public void setiPDMetricUnitDisplay(String iPDMetricUnitDisplay) {
		this.iPDMetricUnitDisplay = iPDMetricUnitDisplay;
	}
	
	
	
}
