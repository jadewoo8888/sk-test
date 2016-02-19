package framework.modules.lowvalueitemsmanagement.domain;


public class ItemsPurchaseDetail implements java.io.Serializable, Cloneable {

	private String pk = "";
	private String ipDItemsPurchasePK = "";
	private String ipDItemManagePK = "";
	private String ipDName = "";
	private String ipDType = "";
	private String ipDSpecification = "";
	private String ipDMetricUnit = "";
	private Integer ipDApplyCount = 0;
	private Integer ipDApproveCount = 0;
	private Integer ipDPurchaseCount = 0;
	private Integer ipDStoreCount = 0;
	private String ipDCheckFlag = "";
	private String insertTime = "";
	private String lastestUpdate = "";
	private String updatePerson = "";
	
	
	public String getPk() {
		return pk;
	}
	public void setPk(String pk) {
		this.pk = pk;
	}
	public String getIpDItemsPurchasePK() {
		return ipDItemsPurchasePK;
	}
	public void setIpDItemsPurchasePK(String ipDItemsPurchasePK) {
		this.ipDItemsPurchasePK = ipDItemsPurchasePK;
	}
	public String getIpDItemManagePK() {
		return ipDItemManagePK;
	}
	public void setIpDItemManagePK(String ipDItemManagePK) {
		this.ipDItemManagePK = ipDItemManagePK;
	}
	public String getIpDName() {
		return ipDName;
	}
	public void setIpDName(String ipDName) {
		this.ipDName = ipDName;
	}
	public String getIpDType() {
		return ipDType;
	}
	public void setIpDType(String ipDType) {
		this.ipDType = ipDType;
	}
	public String getIpDSpecification() {
		return ipDSpecification;
	}
	public void setIpDSpecification(String ipDSpecification) {
		this.ipDSpecification = ipDSpecification;
	}
	public String getIpDMetricUnit() {
		return ipDMetricUnit;
	}
	public void setIpDMetricUnit(String ipDMetricUnit) {
		this.ipDMetricUnit = ipDMetricUnit;
	}
	public Integer getIpDApplyCount() {
		return ipDApplyCount;
	}
	public void setIpDApplyCount(Integer ipDApplyCount) {
		this.ipDApplyCount = ipDApplyCount;
	}
	public Integer getIpDApproveCount() {
		return ipDApproveCount;
	}
	public void setIpDApproveCount(Integer ipDApproveCount) {
		this.ipDApproveCount = ipDApproveCount;
	}
	public Integer getIpDPurchaseCount() {
		return ipDPurchaseCount;
	}
	public void setIpDPurchaseCount(Integer ipDPurchaseCount) {
		this.ipDPurchaseCount = ipDPurchaseCount;
	}
	public Integer getIpDStoreCount() {
		return ipDStoreCount;
	}
	public void setIpDStoreCount(Integer ipDStoreCount) {
		this.ipDStoreCount = ipDStoreCount;
	}
	public String getIpDCheckFlag() {
		return ipDCheckFlag;
	}
	public void setIpDCheckFlag(String ipDCheckFlag) {
		this.ipDCheckFlag = ipDCheckFlag;
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
	
}
