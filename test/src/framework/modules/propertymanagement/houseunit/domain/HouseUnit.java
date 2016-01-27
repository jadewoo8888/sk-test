package framework.modules.propertymanagement.houseunit.domain;

import framework.sys.foreignkeytranslation.FK;
import framework.sys.foreignkeytranslation.Ref;

public class HouseUnit implements java.io.Serializable, Cloneable {
	private String pk = "";
	@FK(ref = Ref.Organization)
	private String orgSysCode = "";
	private String ownerOrgName = "";
	private String assetSysCode = "";
	private String unitSysCode = "";
	private String unitCode = "";
	private String unitName = "";
	private Double unitArea = 0.00;
	private String unitAdress = "";
	@FK(ref = Ref.Classify)
	private String useLineMD = "";
	@FK(ref = Ref.Classify)
	private String unitPurpose = "";
	@FK(ref = Ref.Classify)
	private String unitClassify = "";
	private String unitRemark = "";
	@FK(ref = Ref.Classify)
	private String ifFirePlug = ""; 
	private String contractCode = "";
	private String contractDueDate = "";
	private String hlcSecondEnprName = "";
	private String unitActuality = "";
	private String registerDate = "";
	private Integer canLeaseFlag = 0;
	private Integer floorsNo = 0;
	private String useCheckFlag = "";
	private String clients = "";
	private String usePeople = "";
	private String centralizePeople = "";
	private String useDept = "";
	private String centralizeDept = "";
	@FK(ref = Ref.Classify)
	private String campus = "";
	private String insertTime = "";
	private String lastestUpdate = "";
	private String updatePerson = "";

	// 外检翻译
	private String orgSysCodeDisplay = "";
	private String useLineMDDisplay = "";
	private String unitPurposeDisplay = "";
	private String unitClassifyDisplay = "";
	private String ifFirePlugDisplay = "";
	private String campusDisplay = "";
	
	//特殊字段
	private String contratStatusDisplay = "";
	
	
	public String getPk() {
		return pk;
	}
	public void setPk(String pk) {
		this.pk = pk;
	}
	public String getOrgSysCode() {
		return orgSysCode;
	}
	public void setOrgSysCode(String orgSysCode) {
		this.orgSysCode = orgSysCode;
	}
	public String getOwnerOrgName() {
		return ownerOrgName;
	}
	public void setOwnerOrgName(String ownerOrgName) {
		this.ownerOrgName = ownerOrgName;
	}
	public String getAssetSysCode() {
		return assetSysCode;
	}
	public void setAssetSysCode(String assetSysCode) {
		this.assetSysCode = assetSysCode;
	}
	public String getUnitSysCode() {
		return unitSysCode;
	}
	public void setUnitSysCode(String unitSysCode) {
		this.unitSysCode = unitSysCode;
	}
	public String getUnitCode() {
		return unitCode;
	}
	public void setUnitCode(String unitCode) {
		this.unitCode = unitCode;
	}
	public String getUnitName() {
		return unitName;
	}
	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
	public Double getUnitArea() {
		return unitArea;
	}
	public void setUnitArea(Double unitArea) {
		this.unitArea = unitArea;
	}
	public String getUnitAdress() {
		return unitAdress;
	}
	public void setUnitAdress(String unitAdress) {
		this.unitAdress = unitAdress;
	}
	public String getUseLineMD() {
		return useLineMD;
	}
	public void setUseLineMD(String useLineMD) {
		this.useLineMD = useLineMD;
	}
	public String getUnitPurpose() {
		return unitPurpose;
	}
	public void setUnitPurpose(String unitPurpose) {
		this.unitPurpose = unitPurpose;
	}
	public String getUnitClassify() {
		return unitClassify;
	}
	public void setUnitClassify(String unitClassify) {
		this.unitClassify = unitClassify;
	}
	public String getUnitRemark() {
		return unitRemark;
	}
	public void setUnitRemark(String unitRemark) {
		this.unitRemark = unitRemark;
	}
	public String getIfFirePlug() {
		return ifFirePlug;
	}
	public void setIfFirePlug(String ifFirePlug) {
		this.ifFirePlug = ifFirePlug;
	}
	public String getContractCode() {
		return contractCode;
	}
	public void setContractCode(String contractCode) {
		this.contractCode = contractCode;
	}
	public String getContractDueDate() {
		return contractDueDate;
	}
	public void setContractDueDate(String contractDueDate) {
		this.contractDueDate = contractDueDate;
	}
 
	public String getUnitActuality() {
		return unitActuality;
	}
	public void setUnitActuality(String unitActuality) {
		this.unitActuality = unitActuality;
	}
	public String getRegisterDate() {
		return registerDate;
	}
	public void setRegisterDate(String registerDate) {
		this.registerDate = registerDate;
	}
	public Integer getCanLeaseFlag() {
		return canLeaseFlag;
	}
	public void setCanLeaseFlag(Integer canLeaseFlag) {
		this.canLeaseFlag = canLeaseFlag;
	}
	public Integer getFloorsNo() {
		return floorsNo;
	}
	public void setFloorsNo(Integer floorsNo) {
		this.floorsNo = floorsNo;
	}
	public String getClients() {
		return clients;
	}
	public void setClients(String clients) {
		this.clients = clients;
	}
	public String getUsePeople() {
		return usePeople;
	}
	public void setUsePeople(String usePeople) {
		this.usePeople = usePeople;
	}
	public String getCentralizePeople() {
		return centralizePeople;
	}
	public void setCentralizePeople(String centralizePeople) {
		this.centralizePeople = centralizePeople;
	}
	public String getUseDept() {
		return useDept;
	}
	public void setUseDept(String useDept) {
		this.useDept = useDept;
	}
	public String getCentralizeDept() {
		return centralizeDept;
	}
	public void setCentralizeDept(String centralizeDept) {
		this.centralizeDept = centralizeDept;
	}
	public String getCampus() {
		return campus;
	}
	public void setCampus(String campus) {
		this.campus = campus;
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
	public String getOrgSysCodeDisplay() {
		return orgSysCodeDisplay;
	}
	public void setOrgSysCodeDisplay(String orgSysCodeDisplay) {
		this.orgSysCodeDisplay = orgSysCodeDisplay;
	}
	public String getUseLineMDDisplay() {
		return useLineMDDisplay;
	}
	public void setUseLineMDDisplay(String useLineMDDisplay) {
		this.useLineMDDisplay = useLineMDDisplay;
	}
	public String getUnitPurposeDisplay() {
		return unitPurposeDisplay;
	}
	public void setUnitPurposeDisplay(String unitPurposeDisplay) {
		this.unitPurposeDisplay = unitPurposeDisplay;
	}
	public String getUnitClassifyDisplay() {
		return unitClassifyDisplay;
	}
	public void setUnitClassifyDisplay(String unitClassifyDisplay) {
		this.unitClassifyDisplay = unitClassifyDisplay;
	}
	public String getIfFirePlugDisplay() {
		return ifFirePlugDisplay;
	}
	public void setIfFirePlugDisplay(String ifFirePlugDisplay) {
		this.ifFirePlugDisplay = ifFirePlugDisplay;
	}
	public String getCampusDisplay() {
		return campusDisplay;
	}
	public void setCampusDisplay(String campusDisplay) {
		this.campusDisplay = campusDisplay;
	}
	public String getHlcSecondEnprName() {
		return hlcSecondEnprName;
	}
	public void setHlcSecondEnprName(String hlcSecondEnprName) {
		this.hlcSecondEnprName = hlcSecondEnprName;
	}
	public String getUseCheckFlag() {
		return useCheckFlag;
	}
	public void setUseCheckFlag(String useCheckFlag) {
		this.useCheckFlag = useCheckFlag;
	}
	public String getContratStatusDisplay() {
		return contratStatusDisplay;
	}
	public void setContratStatusDisplay(String contratStatusDisplay) {
		this.contratStatusDisplay = contratStatusDisplay;
	}

}
