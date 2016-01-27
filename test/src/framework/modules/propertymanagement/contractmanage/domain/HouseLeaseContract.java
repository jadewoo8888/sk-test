package framework.modules.propertymanagement.contractmanage.domain;

import framework.sys.foreignkeytranslation.FK;
import framework.sys.foreignkeytranslation.Ref;

public class HouseLeaseContract implements java.io.Serializable, Cloneable {
	private String hlcpk = "";
	@FK(ref = Ref.Organization)
	private String hlcFirstEnprCode = "";
	private String hlcFirstEnprDisCode = "";
	private String hlcFirstEnprName = "";
	private String hlcCode = "";
	private String hlcSecondEnprName = "";
	private String hlcSecondtTel = "";
	private Double hlcDeposit = 0.00;
	@FK(ref = Ref.Classify)
	private String hlcSecondPaperTyype = "";
	private String hlcSecondPaperNo = "";
	private Double hlcRuleRent = 0.00;
	private Double hlcUintRuleRent = 0.00;
	private Integer hlcIncrRound = 0;
	private String hlcIncrRate = "";
	private String hlcSecondtname = "";
	private String hlcBarCode = "";
	private String unitSysCode = "";
	private String unitCode = "";
	private String unitName = ""; 
	private Double unitArea = 0.00;
	private String unitAdress = "";
	@FK(ref = Ref.Classify)
	private String unitPurpose = "";
	private String hlcIfvalid = "";
	private String hlcAddress = "";
	private String hlcRegDate = "";
	@FK(ref = Ref.Classify)
	private String hlcRentPayType = "";
	@FK(ref = Ref.Classify)
	private String hlcRentType = "";
	private Double hlcSecondFellBackRate = 0.00;
	private String hlcOtherItem = "";
	private String hlcFirstRepairItem = "";
	@FK(ref = Ref.CustomHandle, customvalue = "SJZT_01,执行中##SJZT_02,已中止##SJZT_03,已终止")
	private String hlcCheckFlag = "";
	private String hlcCheckNo = "";
	private Double hlcNetArea = 0.00;
	private String hlcRegEndDate = "";
	private String hlcRegStartDate = "";
	@FK(ref = Ref.Classify)
	private String hlcIsStop = "";
	private String updatePerson = "";
	private String lastestUpdate = "";
	private String hlcRealEndDate = "";
	@FK(ref = Ref.Classify)
	private String hlcIsNotice = "";
	private String hlcRealEndRemark = "";
	@FK(ref = Ref.Classify)
	private String htspflag = "";
	private String approvalProcess = "";
	private String allowApprPerson = "";
	private String linkers = "";
	private String applyPerson = "";
	@FK(ref = Ref.Classify)
	private String apprType = "";
	private String marginCheckFlag = "";
	private String hlcChangeReason = "";
	private String hlcStopReason = "";
	private String hlcEndReason = "";
	private String hlcStopDate = "";
	private String hlcRentRate = "";
	private String hlcRentTurnInType = "";
	private String hlcOffHireDate = "";
	private String hlcRentPeriod = "";
	private String hlcRentPeriodDate = "";
	private String hlcRentPeriodMonth = "";
	private String hlcApproveLevel = "";
	private String hlcApproveStatus = "";
	private String hlcArbitration = "";
	private Double hlcArea = 0.00;
	private String hlcCurrencyType = "";
	private String hlcDepositReturnType = "";
	private String hlcDirectlyListDate = "";
	private String hlcDirectlyLister = "";
	private String hlcDirectlyMgrer = "";
	private String hlcDirectlyNotion = "";
	private String hlcFirstAddress = "";
	private String hlcFirstArtificial = "";
	private String hlcFirstClient = "";
	private String hlcFirstClientPaperNo = "";
	private String hlcFirstClientPaperType = "";
	private Double hlcFirstFellBackRate = 0.00;
	private Integer hlcFirstGuaranty = 0;
	private String hlcFirstPaperNo = "";
	private String hlcFirstPaperTyype = "";
	private String hlcFirstRegDate = "";
	private String hlcFirstTel = "";
	private Integer hlcFirstTransit = 0;
	private String hlcPayType = "";
	@FK(ref = Ref.Classify)
	private String hlcPurpose = "";
	private String hlcSecondAddress = "";
	private String hlcSecondArtificial = "";
	private String hlcSecondClient = "";
	private String hlcSecondClientPaperNo = "";
	private String hlcSecondClientPaperType = "";
	private String hlcSecondEnprCode = "";
	private String hlcSecondEnprDisCode = "";
	private String hlcSecondRegDate = "";
	private Integer hlcSecondRelet = 0;
	private String hlcSecondRepairItem = "";
	private String hlcSelfListDate = "";
	private String hlcSelfLister = "";
	private String hlcSelfMgrer = "";
	private String hlcSelfNotion = "";
	private Integer hlcShare = 0;
	private String hlcThirdEnprCode = "";
	private String hlcThirdEnprDisCode = "";
	private String hlcThirdEnprName = "";
	private String hlcTiptopListDate = "";
	private String hlcTiptopLister = "";
	private String hlcTiptopMgrer = "";
	private String hlcTiptopNotion = "";
	private String hlcWorkType = "";
	private String hlcIsContractProlong = "";
	private String hlcCurMan = "";
	private String hlcCurLevel = "";
	private String hlcCurAppOrg = "";
	private String hlcAffirmant = "";
	private String hlcFiller = "";
	private String hlcTel = "";
	private String hlcCheckMan = "";
	private String hlcCheckDate = "";
	private String hlcCurStatus = "";
	private String hlcToBeDueNotice = "";
	private String hlcStatusStartDate = "";
	private String hlcStatusEndDate = "";
	private String changeDate = "";

	// 外检翻译，注意：由于部分字段在6.0中不使用（参考数据库文档中灰色字段），故这些字段的外键翻译也不配置了
	private String hlcFirstEnprCodeDisplay = "";
	private String hlcSecondPaperTyypeDisplay = "";
	private String unitPurposeDisplay = "";
	private String hlcRentPayTypeDisplay = "";
	private String hlcRentTypeDisplay = "";
	private String hlcIsStopDisplay = "";
	private String hlcIsNoticeDisplay = "";
	private String htspflagDisplay = "";
	private String apprTypeDisplay = "";
	private String hlcCheckFlagDisplay = "";
	private String hlcPurposeDisplay = "";
	
	//特殊字段
	private String changeStatus = "";
	private String changeCount = "";

	public String getChangeStatus() {
		return changeStatus;
	}

	public void setChangeStatus(String changeStatus) {
		this.changeStatus = changeStatus;
	}

	public String getHlcCheckFlagDisplay() {
		return hlcCheckFlagDisplay;
	}

	public void setHlcCheckFlagDisplay(String hlcCheckFlagDisplay) {
		this.hlcCheckFlagDisplay = hlcCheckFlagDisplay;
	}

	public String getHlcpk() {
		return hlcpk;
	}

	public void setHlcpk(String hlcpk) {
		this.hlcpk = hlcpk;
	}

	public String getHlcFirstEnprCode() {
		return hlcFirstEnprCode;
	}

	public void setHlcFirstEnprCode(String hlcFirstEnprCode) {
		this.hlcFirstEnprCode = hlcFirstEnprCode;
	}

	public String getHlcFirstEnprDisCode() {
		return hlcFirstEnprDisCode;
	}

	public void setHlcFirstEnprDisCode(String hlcFirstEnprDisCode) {
		this.hlcFirstEnprDisCode = hlcFirstEnprDisCode;
	}

	public String getHlcFirstEnprName() {
		return hlcFirstEnprName;
	}

	public void setHlcFirstEnprName(String hlcFirstEnprName) {
		this.hlcFirstEnprName = hlcFirstEnprName;
	}

	public String getHlcCode() {
		return hlcCode;
	}

	public void setHlcCode(String hlcCode) {
		this.hlcCode = hlcCode;
	}

	public String getHlcSecondEnprName() {
		return hlcSecondEnprName;
	}

	public void setHlcSecondEnprName(String hlcSecondEnprName) {
		this.hlcSecondEnprName = hlcSecondEnprName;
	}

	public String getHlcSecondtTel() {
		return hlcSecondtTel;
	}

	public void setHlcSecondtTel(String hlcSecondtTel) {
		this.hlcSecondtTel = hlcSecondtTel;
	}

	public Double getHlcDeposit() {
		return hlcDeposit;
	}

	public void setHlcDeposit(Double hlcDeposit) {
		this.hlcDeposit = hlcDeposit;
	}

	public String getHlcSecondPaperTyype() {
		return hlcSecondPaperTyype;
	}

	public void setHlcSecondPaperTyype(String hlcSecondPaperTyype) {
		this.hlcSecondPaperTyype = hlcSecondPaperTyype;
	}

	public String getHlcSecondPaperNo() {
		return hlcSecondPaperNo;
	}

	public void setHlcSecondPaperNo(String hlcSecondPaperNo) {
		this.hlcSecondPaperNo = hlcSecondPaperNo;
	}

	public Double getHlcRuleRent() {
		return hlcRuleRent;
	}

	public void setHlcRuleRent(Double hlcRuleRent) {
		this.hlcRuleRent = hlcRuleRent;
	}

	public Double getHlcUintRuleRent() {
		return hlcUintRuleRent;
	}

	public void setHlcUintRuleRent(Double hlcUintRuleRent) {
		this.hlcUintRuleRent = hlcUintRuleRent;
	}
	public String getHlcIncrRate() {
		return hlcIncrRate;
	}

	public void setHlcIncrRate(String hlcIncrRate) {
		this.hlcIncrRate = hlcIncrRate;
	}

	public Integer getHlcIncrRound() {
		return hlcIncrRound;
	}

	public void setHlcIncrRound(Integer hlcIncrRound) {
		this.hlcIncrRound = hlcIncrRound;
	}

	public String getHlcSecondtname() {
		return hlcSecondtname;
	}

	public void setHlcSecondtname(String hlcSecondtname) {
		this.hlcSecondtname = hlcSecondtname;
	}

	public String getHlcBarCode() {
		return hlcBarCode;
	}

	public void setHlcBarCode(String hlcBarCode) {
		this.hlcBarCode = hlcBarCode;
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

	public String getUnitPurpose() {
		return unitPurpose;
	}

	public void setUnitPurpose(String unitPurpose) {
		this.unitPurpose = unitPurpose;
	}

	public String getHlcIfvalid() {
		return hlcIfvalid;
	}

	public void setHlcIfvalid(String hlcIfvalid) {
		this.hlcIfvalid = hlcIfvalid;
	}

	public String getHlcAddress() {
		return hlcAddress;
	}

	public void setHlcAddress(String hlcAddress) {
		this.hlcAddress = hlcAddress;
	}

	public String getHlcRegDate() {
		return hlcRegDate;
	}

	public void setHlcRegDate(String hlcRegDate) {
		this.hlcRegDate = hlcRegDate;
	}

	public String getHlcRentPayType() {
		return hlcRentPayType;
	}

	public void setHlcRentPayType(String hlcRentPayType) {
		this.hlcRentPayType = hlcRentPayType;
	}

	public String getHlcRentType() {
		return hlcRentType;
	}

	public void setHlcRentType(String hlcRentType) {
		this.hlcRentType = hlcRentType;
	}

	public Double getHlcSecondFellBackRate() {
		return hlcSecondFellBackRate;
	}

	public void setHlcSecondFellBackRate(Double hlcSecondFellBackRate) {
		this.hlcSecondFellBackRate = hlcSecondFellBackRate;
	}

	public String getHlcOtherItem() {
		return hlcOtherItem;
	}

	public void setHlcOtherItem(String hlcOtherItem) {
		this.hlcOtherItem = hlcOtherItem;
	}

	public String getHlcFirstRepairItem() {
		return hlcFirstRepairItem;
	}

	public void setHlcFirstRepairItem(String hlcFirstRepairItem) {
		this.hlcFirstRepairItem = hlcFirstRepairItem;
	}

	public String getHlcCheckFlag() {
		return hlcCheckFlag;
	}

	public void setHlcCheckFlag(String hlcCheckFlag) {
		this.hlcCheckFlag = hlcCheckFlag;
	}

	public String getHlcCheckNo() {
		return hlcCheckNo;
	}

	public void setHlcCheckNo(String hlcCheckNo) {
		this.hlcCheckNo = hlcCheckNo;
	}

	public Double getHlcNetArea() {
		return hlcNetArea;
	}

	public void setHlcNetArea(Double hlcNetArea) {
		this.hlcNetArea = hlcNetArea;
	}

	public String getHlcRegEndDate() {
		return hlcRegEndDate;
	}

	public void setHlcRegEndDate(String hlcRegEndDate) {
		this.hlcRegEndDate = hlcRegEndDate;
	}

	public String getHlcRegStartDate() {
		return hlcRegStartDate;
	}

	public void setHlcRegStartDate(String hlcRegStartDate) {
		this.hlcRegStartDate = hlcRegStartDate;
	}

	public String getHlcIsStop() {
		return hlcIsStop;
	}

	public void setHlcIsStop(String hlcIsStop) {
		this.hlcIsStop = hlcIsStop;
	}

	public String getUpdatePerson() {
		return updatePerson;
	}

	public void setUpdatePerson(String updatePerson) {
		this.updatePerson = updatePerson;
	}

	public String getLastestUpdate() {
		return lastestUpdate;
	}

	public void setLastestUpdate(String lastestUpdate) {
		this.lastestUpdate = lastestUpdate;
	}

	public String getHlcRealEndDate() {
		return hlcRealEndDate;
	}

	public void setHlcRealEndDate(String hlcRealEndDate) {
		this.hlcRealEndDate = hlcRealEndDate;
	}

	public String getHlcIsNotice() {
		return hlcIsNotice;
	}

	public void setHlcIsNotice(String hlcIsNotice) {
		this.hlcIsNotice = hlcIsNotice;
	}

	public String getHlcRealEndRemark() {
		return hlcRealEndRemark;
	}

	public void setHlcRealEndRemark(String hlcRealEndRemark) {
		this.hlcRealEndRemark = hlcRealEndRemark;
	}

	public String getHtspflag() {
		return htspflag;
	}

	public void setHtspflag(String htspflag) {
		this.htspflag = htspflag;
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

	public String getApprType() {
		return apprType;
	}

	public void setApprType(String apprType) {
		this.apprType = apprType;
	}

	public String getMarginCheckFlag() {
		return marginCheckFlag;
	}

	public void setMarginCheckFlag(String marginCheckFlag) {
		this.marginCheckFlag = marginCheckFlag;
	}

	public String getHlcChangeReason() {
		return hlcChangeReason;
	}

	public void setHlcChangeReason(String hlcChangeReason) {
		this.hlcChangeReason = hlcChangeReason;
	}

	public String getHlcStopReason() {
		return hlcStopReason;
	}

	public void setHlcStopReason(String hlcStopReason) {
		this.hlcStopReason = hlcStopReason;
	}

	public String getHlcEndReason() {
		return hlcEndReason;
	}

	public void setHlcEndReason(String hlcEndReason) {
		this.hlcEndReason = hlcEndReason;
	}

	public String getHlcStopDate() {
		return hlcStopDate;
	}

	public void setHlcStopDate(String hlcStopDate) {
		this.hlcStopDate = hlcStopDate;
	}

	public String getHlcRentRate() {
		return hlcRentRate;
	}

	public void setHlcRentRate(String hlcRentRate) {
		this.hlcRentRate = hlcRentRate;
	}

	public String getHlcRentTurnInType() {
		return hlcRentTurnInType;
	}

	public void setHlcRentTurnInType(String hlcRentTurnInType) {
		this.hlcRentTurnInType = hlcRentTurnInType;
	}

	public String getHlcOffHireDate() {
		return hlcOffHireDate;
	}

	public void setHlcOffHireDate(String hlcOffHireDate) {
		this.hlcOffHireDate = hlcOffHireDate;
	}

	public String getHlcRentPeriod() {
		return hlcRentPeriod;
	}

	public void setHlcRentPeriod(String hlcRentPeriod) {
		this.hlcRentPeriod = hlcRentPeriod;
	}

	public String getHlcRentPeriodDate() {
		return hlcRentPeriodDate;
	}

	public void setHlcRentPeriodDate(String hlcRentPeriodDate) {
		this.hlcRentPeriodDate = hlcRentPeriodDate;
	}

	public String getHlcRentPeriodMonth() {
		return hlcRentPeriodMonth;
	}

	public void setHlcRentPeriodMonth(String hlcRentPeriodMonth) {
		this.hlcRentPeriodMonth = hlcRentPeriodMonth;
	}

	public String getHlcApproveLevel() {
		return hlcApproveLevel;
	}

	public void setHlcApproveLevel(String hlcApproveLevel) {
		this.hlcApproveLevel = hlcApproveLevel;
	}

	public String getHlcApproveStatus() {
		return hlcApproveStatus;
	}

	public void setHlcApproveStatus(String hlcApproveStatus) {
		this.hlcApproveStatus = hlcApproveStatus;
	}

	public String getHlcArbitration() {
		return hlcArbitration;
	}

	public void setHlcArbitration(String hlcArbitration) {
		this.hlcArbitration = hlcArbitration;
	}

	public Double getHlcArea() {
		return hlcArea;
	}

	public void setHlcArea(Double hlcArea) {
		this.hlcArea = hlcArea;
	}

	public String getHlcCurrencyType() {
		return hlcCurrencyType;
	}

	public void setHlcCurrencyType(String hlcCurrencyType) {
		this.hlcCurrencyType = hlcCurrencyType;
	}

	public String getHlcDepositReturnType() {
		return hlcDepositReturnType;
	}

	public void setHlcDepositReturnType(String hlcDepositReturnType) {
		this.hlcDepositReturnType = hlcDepositReturnType;
	}

	public String getHlcDirectlyListDate() {
		return hlcDirectlyListDate;
	}

	public void setHlcDirectlyListDate(String hlcDirectlyListDate) {
		this.hlcDirectlyListDate = hlcDirectlyListDate;
	}

	public String getHlcDirectlyLister() {
		return hlcDirectlyLister;
	}

	public void setHlcDirectlyLister(String hlcDirectlyLister) {
		this.hlcDirectlyLister = hlcDirectlyLister;
	}

	public String getHlcDirectlyMgrer() {
		return hlcDirectlyMgrer;
	}

	public void setHlcDirectlyMgrer(String hlcDirectlyMgrer) {
		this.hlcDirectlyMgrer = hlcDirectlyMgrer;
	}

	public String getHlcDirectlyNotion() {
		return hlcDirectlyNotion;
	}

	public void setHlcDirectlyNotion(String hlcDirectlyNotion) {
		this.hlcDirectlyNotion = hlcDirectlyNotion;
	}

	public String getHlcFirstAddress() {
		return hlcFirstAddress;
	}

	public void setHlcFirstAddress(String hlcFirstAddress) {
		this.hlcFirstAddress = hlcFirstAddress;
	}

	public String getHlcFirstArtificial() {
		return hlcFirstArtificial;
	}

	public void setHlcFirstArtificial(String hlcFirstArtificial) {
		this.hlcFirstArtificial = hlcFirstArtificial;
	}

	public String getHlcFirstClient() {
		return hlcFirstClient;
	}

	public void setHlcFirstClient(String hlcFirstClient) {
		this.hlcFirstClient = hlcFirstClient;
	}

	public String getHlcFirstClientPaperNo() {
		return hlcFirstClientPaperNo;
	}

	public void setHlcFirstClientPaperNo(String hlcFirstClientPaperNo) {
		this.hlcFirstClientPaperNo = hlcFirstClientPaperNo;
	}

	public String getHlcFirstClientPaperType() {
		return hlcFirstClientPaperType;
	}

	public void setHlcFirstClientPaperType(String hlcFirstClientPaperType) {
		this.hlcFirstClientPaperType = hlcFirstClientPaperType;
	}

	public Double getHlcFirstFellBackRate() {
		return hlcFirstFellBackRate;
	}

	public void setHlcFirstFellBackRate(Double hlcFirstFellBackRate) {
		this.hlcFirstFellBackRate = hlcFirstFellBackRate;
	}

	public Integer getHlcFirstGuaranty() {
		return hlcFirstGuaranty;
	}

	public void setHlcFirstGuaranty(Integer hlcFirstGuaranty) {
		this.hlcFirstGuaranty = hlcFirstGuaranty;
	}

	public String getHlcFirstPaperNo() {
		return hlcFirstPaperNo;
	}

	public void setHlcFirstPaperNo(String hlcFirstPaperNo) {
		this.hlcFirstPaperNo = hlcFirstPaperNo;
	}

	public String getHlcFirstPaperTyype() {
		return hlcFirstPaperTyype;
	}

	public void setHlcFirstPaperTyype(String hlcFirstPaperTyype) {
		this.hlcFirstPaperTyype = hlcFirstPaperTyype;
	}

	public String getHlcFirstRegDate() {
		return hlcFirstRegDate;
	}

	public void setHlcFirstRegDate(String hlcFirstRegDate) {
		this.hlcFirstRegDate = hlcFirstRegDate;
	}

	public String getHlcFirstTel() {
		return hlcFirstTel;
	}

	public void setHlcFirstTel(String hlcFirstTel) {
		this.hlcFirstTel = hlcFirstTel;
	}

	public Integer getHlcFirstTransit() {
		return hlcFirstTransit;
	}

	public void setHlcFirstTransit(Integer hlcFirstTransit) {
		this.hlcFirstTransit = hlcFirstTransit;
	}

	public String getHlcPayType() {
		return hlcPayType;
	}

	public void setHlcPayType(String hlcPayType) {
		this.hlcPayType = hlcPayType;
	}

	public String getHlcPurpose() {
		return hlcPurpose;
	}

	public void setHlcPurpose(String hlcPurpose) {
		this.hlcPurpose = hlcPurpose;
	}

	public String getHlcSecondAddress() {
		return hlcSecondAddress;
	}

	public void setHlcSecondAddress(String hlcSecondAddress) {
		this.hlcSecondAddress = hlcSecondAddress;
	}

	public String getHlcSecondArtificial() {
		return hlcSecondArtificial;
	}

	public void setHlcSecondArtificial(String hlcSecondArtificial) {
		this.hlcSecondArtificial = hlcSecondArtificial;
	}

	public String getHlcSecondClient() {
		return hlcSecondClient;
	}

	public void setHlcSecondClient(String hlcSecondClient) {
		this.hlcSecondClient = hlcSecondClient;
	}

	public String getHlcSecondClientPaperNo() {
		return hlcSecondClientPaperNo;
	}

	public void setHlcSecondClientPaperNo(String hlcSecondClientPaperNo) {
		this.hlcSecondClientPaperNo = hlcSecondClientPaperNo;
	}

	public String getHlcSecondClientPaperType() {
		return hlcSecondClientPaperType;
	}

	public void setHlcSecondClientPaperType(String hlcSecondClientPaperType) {
		this.hlcSecondClientPaperType = hlcSecondClientPaperType;
	}

	public String getHlcSecondEnprCode() {
		return hlcSecondEnprCode;
	}

	public void setHlcSecondEnprCode(String hlcSecondEnprCode) {
		this.hlcSecondEnprCode = hlcSecondEnprCode;
	}

	public String getHlcSecondEnprDisCode() {
		return hlcSecondEnprDisCode;
	}

	public void setHlcSecondEnprDisCode(String hlcSecondEnprDisCode) {
		this.hlcSecondEnprDisCode = hlcSecondEnprDisCode;
	}

	public String getHlcSecondRegDate() {
		return hlcSecondRegDate;
	}

	public void setHlcSecondRegDate(String hlcSecondRegDate) {
		this.hlcSecondRegDate = hlcSecondRegDate;
	}

	public Integer getHlcSecondRelet() {
		return hlcSecondRelet;
	}

	public void setHlcSecondRelet(Integer hlcSecondRelet) {
		this.hlcSecondRelet = hlcSecondRelet;
	}

	public String getHlcSecondRepairItem() {
		return hlcSecondRepairItem;
	}

	public void setHlcSecondRepairItem(String hlcSecondRepairItem) {
		this.hlcSecondRepairItem = hlcSecondRepairItem;
	}

	public String getHlcSelfListDate() {
		return hlcSelfListDate;
	}

	public void setHlcSelfListDate(String hlcSelfListDate) {
		this.hlcSelfListDate = hlcSelfListDate;
	}

	public String getHlcSelfLister() {
		return hlcSelfLister;
	}

	public void setHlcSelfLister(String hlcSelfLister) {
		this.hlcSelfLister = hlcSelfLister;
	}

	public String getHlcSelfMgrer() {
		return hlcSelfMgrer;
	}

	public void setHlcSelfMgrer(String hlcSelfMgrer) {
		this.hlcSelfMgrer = hlcSelfMgrer;
	}

	public String getHlcSelfNotion() {
		return hlcSelfNotion;
	}

	public void setHlcSelfNotion(String hlcSelfNotion) {
		this.hlcSelfNotion = hlcSelfNotion;
	}

	public Integer getHlcShare() {
		return hlcShare;
	}

	public void setHlcShare(Integer hlcShare) {
		this.hlcShare = hlcShare;
	}

	public String getHlcThirdEnprCode() {
		return hlcThirdEnprCode;
	}

	public void setHlcThirdEnprCode(String hlcThirdEnprCode) {
		this.hlcThirdEnprCode = hlcThirdEnprCode;
	}

	public String getHlcThirdEnprDisCode() {
		return hlcThirdEnprDisCode;
	}

	public void setHlcThirdEnprDisCode(String hlcThirdEnprDisCode) {
		this.hlcThirdEnprDisCode = hlcThirdEnprDisCode;
	}

	public String getHlcThirdEnprName() {
		return hlcThirdEnprName;
	}

	public void setHlcThirdEnprName(String hlcThirdEnprName) {
		this.hlcThirdEnprName = hlcThirdEnprName;
	}

	public String getHlcTiptopListDate() {
		return hlcTiptopListDate;
	}

	public void setHlcTiptopListDate(String hlcTiptopListDate) {
		this.hlcTiptopListDate = hlcTiptopListDate;
	}

	public String getHlcTiptopLister() {
		return hlcTiptopLister;
	}

	public void setHlcTiptopLister(String hlcTiptopLister) {
		this.hlcTiptopLister = hlcTiptopLister;
	}

	public String getHlcTiptopMgrer() {
		return hlcTiptopMgrer;
	}

	public void setHlcTiptopMgrer(String hlcTiptopMgrer) {
		this.hlcTiptopMgrer = hlcTiptopMgrer;
	}

	public String getHlcTiptopNotion() {
		return hlcTiptopNotion;
	}

	public void setHlcTiptopNotion(String hlcTiptopNotion) {
		this.hlcTiptopNotion = hlcTiptopNotion;
	}

	public String getHlcWorkType() {
		return hlcWorkType;
	}

	public void setHlcWorkType(String hlcWorkType) {
		this.hlcWorkType = hlcWorkType;
	}

	public String getHlcIsContractProlong() {
		return hlcIsContractProlong;
	}

	public void setHlcIsContractProlong(String hlcIsContractProlong) {
		this.hlcIsContractProlong = hlcIsContractProlong;
	}

	public String getHlcCurMan() {
		return hlcCurMan;
	}

	public void setHlcCurMan(String hlcCurMan) {
		this.hlcCurMan = hlcCurMan;
	}

	public String getHlcCurLevel() {
		return hlcCurLevel;
	}

	public void setHlcCurLevel(String hlcCurLevel) {
		this.hlcCurLevel = hlcCurLevel;
	}

	public String getHlcCurAppOrg() {
		return hlcCurAppOrg;
	}

	public void setHlcCurAppOrg(String hlcCurAppOrg) {
		this.hlcCurAppOrg = hlcCurAppOrg;
	}

	public String getHlcAffirmant() {
		return hlcAffirmant;
	}

	public void setHlcAffirmant(String hlcAffirmant) {
		this.hlcAffirmant = hlcAffirmant;
	}

	public String getHlcFiller() {
		return hlcFiller;
	}

	public void setHlcFiller(String hlcFiller) {
		this.hlcFiller = hlcFiller;
	}

	public String getHlcTel() {
		return hlcTel;
	}

	public void setHlcTel(String hlcTel) {
		this.hlcTel = hlcTel;
	}

	public String getHlcCheckMan() {
		return hlcCheckMan;
	}

	public void setHlcCheckMan(String hlcCheckMan) {
		this.hlcCheckMan = hlcCheckMan;
	}

	public String getHlcCheckDate() {
		return hlcCheckDate;
	}

	public void setHlcCheckDate(String hlcCheckDate) {
		this.hlcCheckDate = hlcCheckDate;
	}

	public String getHlcFirstEnprCodeDisplay() {
		return hlcFirstEnprCodeDisplay;
	}

	public void setHlcFirstEnprCodeDisplay(String hlcFirstEnprCodeDisplay) {
		this.hlcFirstEnprCodeDisplay = hlcFirstEnprCodeDisplay;
	}

	public String getHlcSecondPaperTyypeDisplay() {
		return hlcSecondPaperTyypeDisplay;
	}

	public void setHlcSecondPaperTyypeDisplay(String hlcSecondPaperTyypeDisplay) {
		this.hlcSecondPaperTyypeDisplay = hlcSecondPaperTyypeDisplay;
	}

	public String getUnitPurposeDisplay() {
		return unitPurposeDisplay;
	}

	public void setUnitPurposeDisplay(String unitPurposeDisplay) {
		this.unitPurposeDisplay = unitPurposeDisplay;
	}

	public String getHlcRentPayTypeDisplay() {
		return hlcRentPayTypeDisplay;
	}

	public void setHlcRentPayTypeDisplay(String hlcRentPayTypeDisplay) {
		this.hlcRentPayTypeDisplay = hlcRentPayTypeDisplay;
	}

	public String getHlcRentTypeDisplay() {
		return hlcRentTypeDisplay;
	}

	public void setHlcRentTypeDisplay(String hlcRentTypeDisplay) {
		this.hlcRentTypeDisplay = hlcRentTypeDisplay;
	}

	public String getHlcIsStopDisplay() {
		return hlcIsStopDisplay;
	}

	public void setHlcIsStopDisplay(String hlcIsStopDisplay) {
		this.hlcIsStopDisplay = hlcIsStopDisplay;
	}

	public String getHlcIsNoticeDisplay() {
		return hlcIsNoticeDisplay;
	}

	public void setHlcIsNoticeDisplay(String hlcIsNoticeDisplay) {
		this.hlcIsNoticeDisplay = hlcIsNoticeDisplay;
	}

	public String getHtspflagDisplay() {
		return htspflagDisplay;
	}

	public void setHtspflagDisplay(String htspflagDisplay) {
		this.htspflagDisplay = htspflagDisplay;
	}

	public String getApprTypeDisplay() {
		return apprTypeDisplay;
	}

	public void setApprTypeDisplay(String apprTypeDisplay) {
		this.apprTypeDisplay = apprTypeDisplay;
	}

	public String getHlcCurStatus() {
		return hlcCurStatus;
	}

	public void setHlcCurStatus(String hlcCurStatus) {
		this.hlcCurStatus = hlcCurStatus;
	}

	public String getHlcToBeDueNotice() {
		return hlcToBeDueNotice;
	}

	public void setHlcToBeDueNotice(String hlcToBeDueNotice) {
		this.hlcToBeDueNotice = hlcToBeDueNotice;
	}

	public String getHlcStatusStartDate() {
		return hlcStatusStartDate;
	}

	public void setHlcStatusStartDate(String hlcStatusStartDate) {
		this.hlcStatusStartDate = hlcStatusStartDate;
	}

	public String getHlcStatusEndDate() {
		return hlcStatusEndDate;
	}

	public void setHlcStatusEndDate(String hlcStatusEndDate) {
		this.hlcStatusEndDate = hlcStatusEndDate;
	}

	public String getHlcPurposeDisplay() {
		return hlcPurposeDisplay;
	}

	public void setHlcPurposeDisplay(String hlcPurposeDisplay) {
		this.hlcPurposeDisplay = hlcPurposeDisplay;
	}

	public String getChangeDate() {
		return changeDate;
	}

	public void setChangeDate(String changeDate) {
		this.changeDate = changeDate;
	}

	public String getChangeCount() {
		return changeCount;
	}

	public void setChangeCount(String changeCount) {
		this.changeCount = changeCount;
	}

}
