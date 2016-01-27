package framework.modules.propertymanagement.houseunit.bo;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import framework.core.sql.QueryCondition;
import framework.core.sql.QueryConditionAssembler;
import framework.modules.append.bo.AppendBO;
import framework.modules.append.bo.AppendBusinessType;
import framework.modules.append.domain.Append;
import framework.modules.propertymanagement.houseunit.dao.HouseUnitDAO;
import framework.modules.propertymanagement.houseunit.domain.HouseUnit;
import framework.sys.basemodule.bo.BOBase;
import framework.sys.basemodule.bo.ListForPageBean;
import framework.sys.context.applicationworker.MethodID;
import framework.sys.foreignkeytranslation.FKOper;
import framework.sys.log.LogOperate;
import framework.sys.tools.DBOperation;
import framework.sys.tools._Date;

@LogOperate(menu = "物业登记管理")
public class HouseUnitBO extends BOBase<HouseUnitDAO, HouseUnit> {
	private AppendBO appendBO;

	/**
	 * 新增保存物业登记信息,保存前会校验物业编号唯一性
	 * 
	 * @param houseUnit
	 *            物业单元信息
	 * @param appendList
	 *            附件信息集合 
	 * @return
	 */
	@MethodID("addNewHouseUnit")
	@LogOperate(operate = "新增物业登记信息")
	public String addNewHouseUnit_log_trans(HouseUnit houseUnit, List<Append> appendList) {
		String returnTips = "";

		/** 第一步：检查物业编号唯一性 * */
		returnTips = checkUnitCodeExists(houseUnit.getUnitCode(), houseUnit.getOrgSysCode());
		if (!returnTips.equals("")) {
			return returnTips;
		}
		/** 第二步：物业信息设置默认值等，并保存 * */
		// 主键uuid，由于6.0中单元内部编号不按4.3的编码规则，随机唯一则可，故也使用pk值
		String mainpk = UUID.randomUUID().toString();
		houseUnit.setPk(mainpk);
		houseUnit.setUnitSysCode(mainpk);
		if (houseUnit.getIfFirePlug() == null || houseUnit.getIfFirePlug().equals("")) {
			houseUnit.setIfFirePlug("YesNo_001");
		}
		houseUnit.setCanLeaseFlag(0);
		houseUnit.setUseCheckFlag("0");
		entityDAO.save(houseUnit);

		/** 第三步：保存附件信息 * */
		appendBO.processAppend(appendList, mainpk, AppendBusinessType.TYYWLX_002, houseUnit.getOrgSysCode());

		return returnTips;
	}

	/**
	 * 修改物业登记信息，保存前会校验物业编号唯一性
	 * 
	 * @param houseUnit
	 *            物业单元信息
	 * @param appendList
	 *            附件信息集合
	 * @return
	 */
	@MethodID("modifyHouseUnit")
	@LogOperate(operate = "修改物业登记信息")
	public String modifyHouseUnit_log_trans(HouseUnit houseUnit, List<Append> appendList) {
		String returnTips = "";

		/** 第一步：判断与原登记信息的物业编号是否一致，若不一致则检查新物业编号唯一性 * */
		HouseUnit oldHouseUnit = entityDAO.findById(houseUnit.getPk());
		if (!houseUnit.getUnitCode().equals(oldHouseUnit.getUnitCode())) {
			returnTips = checkUnitCodeExists(houseUnit.getUnitCode(), houseUnit.getOrgSysCode());
			if (!returnTips.equals("")) {
				return returnTips;
			}
		}

		/** 第二步：物业信息设置默认值等，并保存 * */
		if (houseUnit.getIfFirePlug() == null || houseUnit.getIfFirePlug().equals("")) {
			houseUnit.setIfFirePlug("YesNo_001");
		}
		entityDAO.merge(houseUnit);

		/** 第三步：保存附件信息 * */
		appendBO.processAppend(appendList, houseUnit.getPk(), AppendBusinessType.TYYWLX_002, houseUnit.getOrgSysCode());

		return returnTips;
	}

	/**
	 * 删除物业登记信息，同时删除相应的附件信息。删除前会检查是否登记了出租信息。 若没有登记信息则删除数据，否则返回提示语句
	 * 
	 * @param houseunitList
	 *            待删除的物业登记信息集合
	 * 
	 * @return 若没有相应的出租信息，则返回空字符串，否则返回提示语句
	 */
	@MethodID("deleteHouseUnit")
	@LogOperate(operate = "删除物业登记信息")
	public String deleteHouseUnit_log_trans(List<HouseUnit> houseunitList) {
		String return_tips = "";
		if (houseunitList == null || houseunitList.size() == 0) {
			return "";
		}

		/** 第一步：组装pk和unitsyscode数组 * */
		int houseunitListLen = houseunitList.size();
		String[] pkArr = new String[houseunitListLen];
		String[] unitSysCodeArr = new String[houseunitListLen];
		for (int i = 0; i < houseunitListLen; i++) {
			pkArr[i] = houseunitList.get(i).getPk();
			unitSysCodeArr[i] = houseunitList.get(i).getUnitSysCode();
		}

		/** 第二步：检查是否存在出租信息，有则返回提示语句 * */
		return_tips = checkBeforeDelete(unitSysCodeArr);
		if (!return_tips.equals("")) {
			return return_tips;
		}

		/** 第三步：删除物业登记信息，及相应附件信息 * */
		String mainPkInSql = DBOperation.mosaicInStrSql(pkArr);
		/** 根据物业登记信息pk，删除物业登记信息及相关附件信息 * */
		if (mainPkInSql.length() > 0) {
			String deleteMainSql = "delete from tHouseunit where pk in ( " + mainPkInSql + " )";
			entityDAO.executeSql(deleteMainSql);
			appendBO.deleteAppendByBusinessCode(pkArr, AppendBusinessType.TYYWLX_002);
		}

		return return_tips;
	}

	/**
	 * 注销物业登记信息，将物业使用状态字段更新为已注销
	 * 
	 * @param pkArr
	 *            待注销的物业登记信息主键数组
	 * 
	 * @return
	 */
	@MethodID("writeoffHouseUnit")
	@LogOperate(operate = "注销物业登记信息")
	public void writeoffHouseUnit_log_trans(String[] houseUnitPKArr) {
		if (houseUnitPKArr == null || houseUnitPKArr.length == 0) {
			return;
		}
		String mainPkInSql = DBOperation.mosaicInStrSql(houseUnitPKArr);
		if (mainPkInSql.length() > 0) {
			String[] updateInfo = DBOperation.getUpdateInfo();
			String sqlStr = "update tHouseunit set UseCheckFlag = '1',LastestUpdate ='" + updateInfo[0] + "',UpdatePerson = '" + updateInfo[1]
					+ "' where pk in ( " + mainPkInSql + " )";
			entityDAO.executeSql(sqlStr);
		}
	}

	/**
	 * 撤销注销物业登记信息，将物业使用状态字段更新为使用中
	 * 
	 * @param pkArr
	 *            待撤销注销的物业登记信息主键数组
	 * 
	 * @return
	 */
	@MethodID("unWriteoffHouseUnit")
	@LogOperate(operate = "撤销注销物业登记信息")
	public void unWriteoffHouseUnit_log_trans(String[] houseUnitPKArr) {
		if (houseUnitPKArr == null || houseUnitPKArr.length == 0) {
			return;
		}
		String mainPkInSql = DBOperation.mosaicInStrSql(houseUnitPKArr);
		if (mainPkInSql.length() > 0) {
			String[] updateInfo = DBOperation.getUpdateInfo();
			String sqlStr = "update tHouseunit set UseCheckFlag = '0',LastestUpdate ='" + updateInfo[0] + "',UpdatePerson = '" + updateInfo[1]
					+ "' where pk in ( " + mainPkInSql + " )";
			entityDAO.executeSql(sqlStr);
		}
	}

	/**
	 * 检查物业编号是否存在。并返回检查结果语句
	 * 
	 * @param unitCode
	 *            物业编号
	 * @param orgSysCode
	 *            物业所属单位内部编号
	 * @return 空字符串标识不存在数据库中，否则为提示语句
	 */
	@MethodID("checkUnitCodeExists")
	public String checkUnitCodeExists(String unitCode, String orgSysCode) {
		String return_tips = "";
		String strSql = "select count(*) from tHouseUnit where  OrgSysCode = ? and  UnitCode = ? ";
		BigDecimal count = (BigDecimal) entityDAO.executeFindUnique(strSql, orgSysCode, unitCode);
		if (count.intValue() != 0) {
			return_tips = "当前单位此物业编号已存在！";
		}
		return return_tips;
	}

	/**
	 * 删除前检查,检查物业信息是否存在于出租申请和合同单元明细中
	 * 
	 * @param pkArr
	 *            待删除的物业登记信息主键数组
	 * 
	 * @return
	 */
	@MethodID("checkBeforeDelete")
	public String checkBeforeDelete(String[] unitSysCodeArr) {
		String return_tips = "";
		if (unitSysCodeArr == null || unitSysCodeArr.length == 0) {
			return "";
		}
		String mainPkInSql = DBOperation.mosaicInStrSql(unitSysCodeArr);
		String strSql = "select count(*) from tLetRent  where  UnitSysCode in (" + mainPkInSql + ")";
		BigDecimal count = (BigDecimal) entityDAO.executeFindUnique(strSql);
		if (count.intValue() == 0) {
			strSql = "select count(*) from tHouseLeaseContract where UnitSysCode in (" + mainPkInSql + ")";
			count = (BigDecimal) entityDAO.executeFindUnique(strSql);
			if (count.intValue() != 0) {
				return_tips = "物业有出租记录，不允许删除";
			}
		} else {
			return_tips = "物业有出租记录，不允许删除";
		}
		return return_tips;
	}

	@MethodID("getListForPageTranContratStatus")
	public ListForPageBean getListForPage(final int pageNumber, final int pageSize, final List<QueryCondition> queryCond, final String sortCond) {
		ListForPageBean listForPageBean = new ListForPageBean();
		QueryConditionAssembler assembler = getQueryConditionAssembler(queryCond, sortCond);
		int totalCount = entityDAO.getTotalCountForPage(assembler);
		List<HouseUnit> rowList = null;
		if (totalCount > 0) {
			rowList = entityDAO.getListForPage(" * ", pageNumber, pageSize, assembler);
		}
		if (rowList != null) {
			for (HouseUnit houseUnit : rowList) {
				if (houseUnit.getCanLeaseFlag()==null||houseUnit.getCanLeaseFlag() == 0) {
					houseUnit.setContratStatusDisplay("空闲");
				} else if (houseUnit.getCanLeaseFlag() == 1) {
					houseUnit.setContratStatusDisplay("出租审批中");
				} else if (houseUnit.getCanLeaseFlag() == 2) {
					houseUnit.setContratStatusDisplay("出租已审批");
				} else if (houseUnit.getCanLeaseFlag() == 3) {
					houseUnit.setContratStatusDisplay("待签合同");
				} else if (houseUnit.getCanLeaseFlag() == 4) {
					int monthDiff = _Date.getMonthDiffTo(houseUnit.getContractDueDate(), _Date.getSystemDate3());
					if (monthDiff < 0) {
						houseUnit.setContratStatusDisplay("合同已到期");
					} else if (monthDiff < 1) {
						houseUnit.setContratStatusDisplay("一个月内到期");
					} else if (monthDiff < 2) {
						houseUnit.setContratStatusDisplay("两个月内到期");
					} else if (monthDiff < 3) {
						houseUnit.setContratStatusDisplay("三个月内到期");
					} else if (monthDiff < 4) {
						houseUnit.setContratStatusDisplay("半年内到期");
					} else {
						houseUnit.setContratStatusDisplay("合同执行中");
					}
				}
			}
		}
		listForPageBean.setTotal(totalCount);
		FKOper.getInstance().setDisplay(rowList);
		listForPageBean.setRows(rowList);
		return listForPageBean;
	}
	
	/**
	 * 根据物业内部编号查找物业信息
	 * 
	 * @param unitSysCode
	 *            物业内部编号
	 * 
	 * @return
	 */
	@MethodID("findByUnitSysCode")
	public HouseUnit findByUnitSysCode(String unitSysCode) {
		List<HouseUnit> list = entityDAO.findByProperty("unitSysCode", unitSysCode);
		if(list.size()>0){
			FKOper.getInstance().setDisplay(list);
			return list.get(0);
		}else 
			return null;
	}
	
	public AppendBO getAppendBO() {
		return appendBO;
	}

	public void setAppendBO(AppendBO appendBO) {
		this.appendBO = appendBO;
	}

}
