//页面主表信息对象 
var contractObj = new Object();
//租金规则列表datagrid对象
var datagrid = null;
/** 用于标识某个区域时候第一次打开，若第一次打开则同时初始化这个区域内的内容，并获取数据填充 **/
var initedAppendAreaFlag = false;
/**
 * 初始化入口 
 **/
$(function () {
	initComBindFunc();
	initComDisplay();
	initData();
});

/**
 * 页面组件绑定事件处理方法
 **/
function initComBindFunc() {
	$("#tabs").tabs({onSelect:tabSelect});
	$("#id_btn_save").click(save);
	$("#id_btn_return").click(returnUpperLevel);	
}
/**
 * 初始化设置页面组件的显示
 **/
function initComDisplay() {
	 $("#tabs").tabs("select", 1);
	 $('#id_div_desc .head-title').html('上传附件');
}

/**
 * 初始化表格信息,注意在获取完合同信息后才初始化，因租金规则表查询需要用到获取的合同信息中的合同内码
 **/
function initDataGrid() {
	var _sortInfo = {"sortPK" : "hlcRentRulePK","sortSql" : "hlcRentRuleStartDate Asc"};
	 var _columns =  
	 [[
		{field:"hlcRentRuleStartDate",title:'租赁开始日期',minwidth:95,align:'center'},
		{field:"hlcRentRuleEndDate",title:'租赁截止日期',minwidth:95,align:'center'},
		{field:"hlcRentRuleRent",title:'月租金（小写）',minwidth:120,align:'right',fmType:'money'},
		{field:"hlcRentRuleRentUp",title:'月租金（大写）',minwidth:220,align:'right'},
		{field:"hlcRentRulePeriodDisplay",title:'租金结算方式',minwidth:100,align:'center'},
		{field:"hlcRentRulePeriodDateDisplay",title:'交租日期',minwidth:150,align:'center'}
	]]; 
	 var dataGridOptions ={rownumbers:false,checkbox:false,pagination:false,height:'auto',onBeforeLoadData:onBeforeLoadDataFunc};
	 var customOptions = {tableID:'id_table_grid',classID:'HLCRentRlueBO',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQC};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}

/**
 * 租金规则列表数据加载前的处理
 **/
function onBeforeLoadDataFunc(data) { 
	if(data==null||data.length==0) {
		return;
	}
	var dataLen = data.length;
	for(var i=0;i<dataLen;i++) {
		data[i].hlcRentRuleRentUp = moneyUpperCase(data[i].hlcRentRuleRent);
		if(data[i].hlcRentRulePeriod == 'PayCyc_001') {
			data[i].hlcRentRulePeriodDateDisplay = "每月第 "+data[i].hlcRentRulePeriodDate+" 天";
		} else {
			data[i].hlcRentRulePeriodDateDisplay = "第 "+data[i].hlcRentRulePeriodMonth+" 月第 "+data[i].hlcRentRulePeriodDate+" 天";
		}
	}
}

/**
 * 设置自定义查询条件
 **/
function setCustomQC() {
	var customQCArr = new Array();
	var QC1 = new Object();
	QC1.fn = "hlcRentRuleContractCode";
	QC1.oper = ARY_STR_EQUAL[0];
	QC1.value1 =  contractObj.hlcCode;
	customQCArr.push(QC1);
	return customQCArr;
}

/**
 * 设置附件
 **/
function setAppenFrame() {
	var appendFrameObj = document.getElementById("id_iframe_append");
	appendFrameObj.src = contextPath + "/core/componentmodule/upload/listCommonUpload.jsp?busitype=TYYWLX_006&controltype=" + STR_REGISTER_MODIFY + "&businesscode=" + hlcpk;
}
 
 
/**
 * 初始化页面数据
 **/
function initData() {
	getContractInfoData();
}
 
 /**
 * 获取主表信息
 **/
function getContractInfoData() {
	$("body").addLoading({msg:"\u83b7\u53d6\u6570\u636e\u4e2d\uff0c\u8bf7\u7a0d\u540e..."});
	Ajax.service("HouseLeaseContractBO", "findById", [hlcpk], getContractInfoDataSuccFunc, getContractInfoDataFailureFunc);
}
/**
 * 获取参数信息成功回调函数
 **/
function getContractInfoDataSuccFunc(data) {
	contractObj = data;
	fillContractInfo();
	initDataGrid();
	$("body").removeLoading();
}
/**
 * 获取信息失败回调函数
 **/
function getContractInfoDataFailureFunc() {
	$("body").removeLoading();
	top.layer.alert("\u83b7\u53d6\u5904\u7f6e\u5355\u57fa\u672c\u4fe1\u606f\u51fa\u73b0\u9519\u8bef\uff0c\u8bf7\u8054\u7cfb\u7ba1\u7406\u5458 ", {icon:5, closeBtn:2});
}
/**
 * 填充参数数据到页面中
 **/
function fillContractInfo() {
	$("#id_unitCode").val(contractObj.unitCode);
	$("#id_unitArea").val(formatMoney(contractObj.unitArea));
	$("#id_unitPurpose").val(contractObj.unitPurposeDisplay);
	$("#id_hlcPurpose").val(contractObj.hlcPurposeDisplay);
	$("#id_unitAdress").val(contractObj.unitAdress);
	$("#id_hlcFirstEnprName").val(contractObj.hlcFirstEnprName);
	$("#id_hlcBarCode").val(contractObj.hlcBarCode);
	$("#id_hlcSecondEnprName").val(contractObj.hlcSecondEnprName);
	$("#id_hlcRegDate").val(contractObj.hlcRegDate);
	$("#id_hlcSecondPaperTyype").val(contractObj.hlcSecondPaperTyypeDisplay);
	$("#id_hlcSecondPaperNo").val(contractObj.hlcSecondPaperNo);
	$("#id_hlcSecondtname").val(contractObj.hlcSecondtname);
	$("#id_hlcSecondtTel").val(contractObj.hlcSecondtTel);
	$("#id_hlcRegStartDate").val(contractObj.hlcRegStartDate);
	$("#id_hlcRegEndDate").val(contractObj.hlcRegEndDate);
	$("#id_hlcRentPayType").val(contractObj.hlcRentPayTypeDisplay);
	$("#id_hlcDeposit").val(formatMoney(contractObj.hlcDeposit));
	$("#id_hlcRuleRent").val(formatMoney(contractObj.hlcRuleRent));
	$("#id_hlcIncrRound").val(contractObj.hlcIncrRound);
	$("#id_hlcUintRuleRent").val(formatMoney(contractObj.hlcUintRuleRent));
	$("#id_hlcIncrRate").val(contractObj.hlcIncrRate);
 	$("#id_hlcOtherItem").val(contractObj.hlcOtherItem);
 	$("#id_hlcFirstRepairItem").val(contractObj.hlcFirstRepairItem);
 	$("#id_hlcRentType").val(contractObj.hlcRentTypeDisplay);
 	
 	
}
 
/**
 * 标签切换处理
 **/
function tabSelect(title, index) {
	if (index == 0) {
	} else {
		if (index == 1) {
			if (!initedAppendAreaFlag) {
				initedAppendAreaFlag = true;
				setAppenFrame();
			}
		}
	}
}

/**
 * 保存
 **/
function save() { 
	changeBtnDisabled(true);
	top.layer.open({title:"\u4fdd\u5b58", icon:3, area:["330px", "160px"], btn:["\u786e\u5b9a", "\u53d6\u6d88"], content:"确定保存当前附件数据?", shift:1, closeBtn:2, yes:function (index) {
		top.layer.close(index);
		saveService();
	}, cancel:function (index) {
		top.layer.close(index);
		changeBtnDisabled(false);
		$("body").removeLoading();
	}});
}

/**
 * 保存发送保存请求
 **/
function saveService() {
	$("body").removeLoading();
	$("body").addLoading({msg:"\u6b63\u5728\u4fdd\u5b58\u6570\u636e\uff0c\u8bf7\u8010\u5fc3\u7b49\u5019..."});
	var appendPackage = getAppendData();
 	Ajax.service("HouseLeaseContractBO", "modifyAppend", [contractObj, appendPackage], saveServiceSuccessFunc, saveServiceFailureFunc);
}
/**
 * 保存发送保存请求成功回调函数
 **/
function saveServiceSuccessFunc(data) {
	changeBtnDisabled(false);
	$("body").removeLoading();
	top.layer.open({title:"\u63d0\u793a", icon:6, area:["280px", "150px"], content:'附件数据保存成功', shift:1, closeBtn:2, yes:function (index) {
		top.contentframe.$("#id_table_grid").datagrid("reload");
		top.layer.close(index);
			returnUpperLevel();
	}, cancel:function (index) {
		top.contentframe.$("#id_table_grid").datagrid("reload");
		top.layer.close(index);
		returnUpperLevel();
	}});
}
/**
 * 保存发送保存请求失败回调函数
 **/
function saveServiceFailureFunc() {
	changeBtnDisabled(false);
	$("body").removeLoading();
	top.layer.alert("保存出现错误，请联系管理员 ", {icon:5, closeBtn:2});
}


/** 
 * 获取附件数据
 **/
function getAppendData() {
	var appendData = null;
	var appendFrameObj = document.getElementById("id_iframe_append").contentWindow;
	/** 这个判断是因为现在按标签初始化，若标签没有被点击，附件控件未被初始化 **/
	if (appendFrameObj.getAppendData) {
		appendData = appendFrameObj.getAppendData();
	}
	return appendData;
}

/**
 * 返回上一级页面
 **/
function returnUpperLevel() {
	history.go(-1);
}
