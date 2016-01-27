var dataGrid = null;//表格对象
var openWindow = null; //打开选择窗口的窗口对象，以下均称呼为打开窗口
 
 /**
 * 初始化方法
 **/
$(function () {
	initOpenWindow();
	initComDisplay();
	initComDisplayByBusitype();
	initDataGrid();
	initComFunc();
});
/**
 * 取得打开当前窗口的窗口的对象
 **/
function initOpenWindow() {
	openWindow = window.open("", openWindowName);
}
/**
 * 初始化设置页面组件的显示
 **/
function initComDisplay() {
 
}
/**
 * 根据业务类型，设置页面上的组件显示
 **/
function initComDisplayByBusitype() {
 
}

function initComFunc() {
	//查询按钮处理事件
	$("#id_btn_query").click(function () {
		dataGrid.query();
	});
	$("#id_btn_sure").click(sure);
	$("#id_btn_cancel").click(cancel);
}
 
/**
 * 初始化表格
 **/
function initDataGrid() {
	var _sortInfo = {"sortPK" : "hlcpk","sortSql" : "lastestUpdate Desc"};
	 var _columns =  
	 [[
		{field:"hlcBarCode",title:'合同编号',minwidth:140,align:'center'},
        {field:"hlcFirstEnprCodeDisplay",title:'出租人',minwidth:180,align:'center'},
        {field:"hlcSecondEnprName",title:'承租人',minwidth:120,align:'center'},
		{field:"unitArea",title:'物业面积',minwidth:120,align:'right',fmType:'money'},
		{field:"unitPurposeDisplay",title:'出租用途',align:'center',minwidth:100},
 		{field:"hlcRuleRent",title:'月租金',minwidth:120,align:'right',fmType:'money'},
		{field:"hlcCheckFlagDisplay",title:'合同状态',minwidth:120,align:'center'},
		{field:"hlcRegDate",title:'签订日期',minwidth:100,align:'center'},
		{field:"unitAdress",title:'物业地址',minwidth:200,align:'center'}
		
	]];
	 var dataGridOptions ={checkbox:false,height:430};
	 var customOptions = {tableID:'id_table_grid',classID:'HouseLeaseContractBO',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition,
			 orgField:"hlcFirstEnprCode"};	 
	 dataGrid = new DataGrid(customOptions,dataGridOptions);
}
 
/**
 * 根据业务类型，设置实际的查询条件
 **/
function setCustomQueryCondition() {
	var customQCArr = new Array();
	
	var hlcCheckFlagQC = new Object();
	hlcCheckFlagQC.fn = "hlcCheckFlag";
	hlcCheckFlagQC.oper = ARY_STR_EQUAL[0];
	hlcCheckFlagQC.value1 = 'SJZT_01';
	customQCArr.push(hlcCheckFlagQC);
	
	var notExistQC = new Object();
	notExistQC.fn = "";
	notExistQC.oper = ARY_STR_NULLOPER[0];
	notExistQC.value1 = ' not exists (select 1 from tClient where tClient.HLCCode = tHouseLeaseContract.HLCCode) ';
	customQCArr.push(notExistQC);
	
	return customQCArr;
}
 
/**
 * 确定处理方法
 **/
function sure() {
	var data  = dataGrid.getSelectedData();
	if (data.length > 0) {
		callUpdateData(data);
	} 
}

/**
 * 取消按钮点击处理方法
 **/
function cancel() {
	closeWindow();
}
/**
 * 关闭选择控件窗口
 **/
function closeWindow() {
	var parentIndex = top.layer.getFrameIndex(window.name);
	top.layer.close(parentIndex);
}
  
/**
 * 回调具体页面的回调函数
 **/  
function callUpdateData(selectedData) {
	if (openWindow.updateContractSelectedData != undefined) {
		openWindow.updateContractSelectedData(selectedData);
		closeWindow();
	} else {
		top.layer.alert("请在调用窗口Jsp内定义结束选中合同数据的方法updateContractSelectedData(data)", {closeBtn:2, icon:7});
	}
}