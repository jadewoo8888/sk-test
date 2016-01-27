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
	var _sortInfo = {"sortPK" : "pk","sortSql" : "lastestUpdate Desc"};
	 var _columns =  
	 [[
		{field:"unitCode",title:'物业编号',minwidth:160,formatter:function(value,row,index){return "<a onclick='viewHouseUnit(\""+row.pk+"\")' href='javascript:void(0);' >"+value+"</a>"}},
		{field:"unitAdress",title:'物业地址',minwidth:220,align:'left'},
		{field:'unitArea',title:'物业面积',minwidth:120,align:'right',fmType:'money'},
		{field:'useLineMDDisplay',title:'使用状态',minwidth:100},
		{field:'unitPurposeDisplay',title:'物业用途',minwidth:100},
		{field:"campusDisplay",title:'校区',minwidth:100,align:'center'},
		{field:"contractDueDate",title:'合同到期日',minwidth:120}	
	]]; 
	 var dataGridOptions ={checkbox:false,height:430};
	 var customOptions = {tableID:'id_table_grid',classID:'HouseUnitBO',methodID:'getListForPageTranContratStatus',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition,
			 orgField:"orgSysCode"};	 
	 dataGrid = new DataGrid(customOptions,dataGridOptions);
}
 
/**
 * 根据业务类型，设置实际的查询条件
 **/
function setCustomQueryCondition() {
	var customQCArr = new Array();
	
	var QC1 = new Object();
	QC1.fn = "CanLeaseFlag";
	QC1.oper = ARY_STR_EQUAL[0];
	QC1.value1 = '3';
	customQCArr.push(QC1);
	
	var QC2 = new Object();
	QC2.fn = "UseCheckFlag";
	QC2.oper = ARY_STR_EQUAL[0];
	QC2.value1 = '0';
	customQCArr.push(QC2);	
	
	var QC3 = new Object();
	QC3.fn = "UseLineMD";
	QC3.oper = ARY_STR_EQUAL[0];
	QC3.value1 = 'DYZT_002';
	customQCArr.push(QC3);
	
	return customQCArr;
}

 
/**
 * 为页面上的组件添加事件处理方法
 **/

  
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
 * 关闭资产选择控件窗口
 **/
function closeWindow() {
	var parentIndex = top.layer.getFrameIndex(window.name);
	top.layer.close(parentIndex);
}
  
function callUpdateData(selectedData) {
	if (openWindow.callUpdateData != undefined) {
		openWindow.callUpdateData(selectedData);
		closeWindow();
	} else {
		top.layer.alert("请在调用窗口Jsp内定义结束选中合同数据的方法callUpdateData(data)", {closeBtn:2, icon:7});
	}
}