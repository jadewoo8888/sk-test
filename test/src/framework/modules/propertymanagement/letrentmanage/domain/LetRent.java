package framework.modules.propertymanagement.letrentmanage.domain;

import framework.sys.foreignkeytranslation.FK;
import framework.sys.foreignkeytranslation.Ref;

public class LetRent implements java.io.Serializable, Cloneable {
	private String pk = "";
	private String letRentCode = "";
	private String letRentBarCode = "";
	@FK(ref = Ref.Organization)
	private String orgSysCode = "";
	private String orgName = "";
	private String ownerOrgName = "";
	private String unitSysCode = "";
	private String unitCode = "";
	private String unitName = "";
	private Double unitArea = 0.00;
	private String unitAdress = "";
	private String unitLetPurpose = "";
	@FK(ref = Ref.Classify)
	private String unitClassify = "";
	private String ifFirePlug = "";
	private Double uintRuleRent = 0.00;
	private String letApplyName = "";
	private String letRentDate = "";
	private Double letUpPrice = 0.00;
	@FK(ref = Ref.Classify)
	private String letRentWay = "";
	private String letTerm = "";
	private String incrRate = "";
	private String incrRound = "";
	private Double rentMargin = 0.00;
	private Double auctionMargin = 0.00;
	private String decorateperiod = "";
	@FK(ref = Ref.Classify)
	private String planLetPurpose = "";
	private String qualification = "";
	private String letRentGist = "";
	private Double formerLetUpPrice = 0.00;
	private Double formerLastRent = 0.00;
	private String formerStartDate = "";
	private String formerRealEndDate = "";
	private String formerIncrRate = "";
	private String formerIncrRound = "";
	private Double formerRentMargin = 0.00;
	private Double formerAuctionMargin = 0.00;
	private String formerDecorateperiod = "";
	private String formerLetPurpose = "";
	@FK(ref = Ref.Classify)
	private String letRentFlag = "";
	private String approvalProcess = "";
	private String allowApprPerson = "";
	private String linkers = "";
	private String applyPerson = "";
	private String remark = "";
	private String ifAdjunct = "";
	private String inserttime = "";
	private String lastestUpdate = "";
	private String updatePerson = "";

	// 外键翻译
	private String orgSysCodeDisplay = "";
	private String letRentWayDisplay = "";
	private String planLetPurposeDisplay = "";
	private String letRentFlagDisplay = "";
	private String unitClassifyDisplay = "";

	public String getPk() {
		return pk;
	}

	public void setPk(String pk) {
		this.pk = pk;
	}

	public String getLetRentCode() {
		return letRentCode;
	}

	public void setLetRentCode(String letRentCode) {
		this.letRentCode = letRentCode;
	}

	public String getLetRentBarCode() {
		return letRentBarCode;
	}

	public void setLetRentBarCode(String letRentBarCode) {
		this.letRentBarCode = letRentBarCode;
	}

	public String getOrgSysCode() {
		return orgSysCode;
	}

	public void setOrgSysCode(String orgSysCode) {
		this.orgSysCode = orgSysCode;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public String getOwnerOrgName() {
		return ownerOrgName;
	}

	public void setOwnerOrgName(String ownerOrgName) {
		this.ownerOrgName = ownerOrgName;
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

	public String getUnitLetPurpose() {
		return unitLetPurpose;
	}

	public void setUnitLetPurpose(String unitLetPurpose) {
		this.unitLetPurpose = unitLetPurpose;
	}

	public String getUnitClassify() {
		return unitClassify;
	}

	public void setUnitClassify(String unitClassify) {
		this.unitClassify = unitClassify;
	}

	public String getIfFirePlug() {
		return ifFirePlug;
	}

	public void setIfFirePlug(String ifFirePlug) {
		this.ifFirePlug = ifFirePlug;
	}

	public Double getUintRuleRent() {
		return uintRuleRent;
	}

	public void setUintRuleRent(Double uintRuleRent) {
		this.uintRuleRent = uintRuleRent;
	}

	public String getLetApplyName() {
		return letApplyName;
	}

	public void setLetApplyName(String letApplyName) {
		this.letApplyName = letApplyName;
	}

	public String getLetRentDate() {
		return letRentDate;
	}

	public void setLetRentDate(String letRentDate) {
		this.letRentDate = letRentDate;
	}

	public Double getLetUpPrice() {
		return letUpPrice;
	}

	public void setLetUpPrice(Double letUpPrice) {
		this.letUpPrice = letUpPrice;
	}

	public String getLetRentWay() {
		return letRentWay;
	}

	public void setLetRentWay(String letRentWay) {
		this.letRentWay = letRentWay;
	}

	public String getLetTerm() {
		return letTerm;
	}

	public void setLetTerm(String letTerm) {
		this.letTerm = letTerm;
	}

	public String getIncrRate() {
		return incrRate;
	}

	public void setIncrRate(String incrRate) {
		this.incrRate = incrRate;
	}

	public String getIncrRound() {
		return incrRound;
	}

	public void setIncrRound(String incrRound) {
		this.incrRound = incrRound;
	}

	public Double getRentMargin() {
		return rentMargin;
	}

	public void setRentMargin(Double rentMargin) {
		this.rentMargin = rentMargin;
	}

	public Double getAuctionMargin() {
		return auctionMargin;
	}

	public void setAuctionMargin(Double auctionMargin) {
		this.auctionMargin = auctionMargin;
	}

	public String getDecorateperiod() {
		return decorateperiod;
	}

	public void setDecorateperiod(String decorateperiod) {
		this.decorateperiod = decorateperiod;
	}

	public String getPlanLetPurpose() {
		return planLetPurpose;
	}

	public void setPlanLetPurpose(String planLetPurpose) {
		this.planLetPurpose = planLetPurpose;
	}

	public String getQualification() {
		return qualification;
	}

	public void setQualification(String qualification) {
		this.qualification = qualification;
	}

	public String getLetRentGist() {
		return letRentGist;
	}

	public void setLetRentGist(String letRentGist) {
		this.letRentGist = letRentGist;
	}

	public Double getFormerLetUpPrice() {
		return formerLetUpPrice;
	}

	public void setFormerLetUpPrice(Double formerLetUpPrice) {
		this.formerLetUpPrice = formerLetUpPrice;
	}

	public Double getFormerLastRent() {
		return formerLastRent;
	}

	public void setFormerLastRent(Double formerLastRent) {
		this.formerLastRent = formerLastRent;
	}

	public String getFormerStartDate() {
		return formerStartDate;
	}

	public void setFormerStartDate(String formerStartDate) {
		this.formerStartDate = formerStartDate;
	}

	public String getFormerRealEndDate() {
		return formerRealEndDate;
	}

	public void setFormerRealEndDate(String formerRealEndDate) {
		this.formerRealEndDate = formerRealEndDate;
	}

	public String getFormerIncrRate() {
		return formerIncrRate;
	}

	public void setFormerIncrRate(String formerIncrRate) {
		this.formerIncrRate = formerIncrRate;
	}

	public String getFormerIncrRound() {
		return formerIncrRound;
	}

	public void setFormerIncrRound(String formerIncrRound) {
		this.formerIncrRound = formerIncrRound;
	}

	public Double getFormerRentMargin() {
		return formerRentMargin;
	}

	public void setFormerRentMargin(Double formerRentMargin) {
		this.formerRentMargin = formerRentMargin;
	}

	public Double getFormerAuctionMargin() {
		return formerAuctionMargin;
	}

	public void setFormerAuctionMargin(Double formerAuctionMargin) {
		this.formerAuctionMargin = formerAuctionMargin;
	}

	public String getFormerDecorateperiod() {
		return formerDecorateperiod;
	}

	public void setFormerDecorateperiod(String formerDecorateperiod) {
		this.formerDecorateperiod = formerDecorateperiod;
	}

	public String getFormerLetPurpose() {
		return formerLetPurpose;
	}

	public void setFormerLetPurpose(String formerLetPurpose) {
		this.formerLetPurpose = formerLetPurpose;
	}

	public String getLetRentFlag() {
		return letRentFlag;
	}

	public void setLetRentFlag(String letRentFlag) {
		this.letRentFlag = letRentFlag;
	}

	public String getApprovalProcess() {
		return approvalProcess;
	}

	public void setApprovalProcess(String approvalProcess) {
		this.approvalProcess = approvalProcess;
	}

	public String getAllowApprPerson() {
		return allowApprPerson;
	}

	public void setAllowApprPerson(String allowApprPerson) {
		this.allowApprPerson = allowApprPerson;
	}

	public String getLinkers() {
		return linkers;
	}

	public void setLinkers(String linkers) {
		this.linkers = linkers;
	}

	public String getApplyPerson() {
		return applyPerson;
	}

	public void setApplyPerson(String applyPerson) {
		this.applyPerson = applyPerson;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getIfAdjunct() {
		return ifAdjunct;
	}

	public void setIfAdjunct(String ifAdjunct) {
		this.ifAdjunct = ifAdjunct;
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

	public String getOrgSysCodeDisplay() {
		return orgSysCodeDisplay;
	}

	public void setOrgSysCodeDisplay(String orgSysCodeDisplay) {
		this.orgSysCodeDisplay = orgSysCodeDisplay;
	}

	public String getLetRentWayDisplay() {
		return letRentWayDisplay;
	}

	public void setLetRentWayDisplay(String letRentWayDisplay) {
		this.letRentWayDisplay = letRentWayDisplay;
	}

	public String getPlanLetPurposeDisplay() {
		return planLetPurposeDisplay;
	}

	public void setPlanLetPurposeDisplay(String planLetPurposeDisplay) {
		this.planLetPurposeDisplay = planLetPurposeDisplay;
	}

	public String getLetRentFlagDisplay() {
		return letRentFlagDisplay;
	}

	public void setLetRentFlagDisplay(String letRentFlagDisplay) {
		this.letRentFlagDisplay = letRentFlagDisplay;
	}

	public String getUnitClassifyDisplay() {
		return unitClassifyDisplay;
	}

	public void setUnitClassifyDisplay(String unitClassifyDisplay) {
		this.unitClassifyDisplay = unitClassifyDisplay;
	}
}
