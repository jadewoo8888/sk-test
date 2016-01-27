//列表表格对象
var datagrid = null;

/**
 * 初始化方法
 **/ 
$(function () { 
	initComponent();
	initDataGrid();
	initComBindFunc(); 
});

/**
 * 初始化表格信息
 **/
function initDataGrid() {
	var _sortInfo = {"sortPK" : "hlcpk","sortSql" : "lastestUpdate Desc"};
	 var _columns =  
	 [[
	 	{field:'option',title:'操作',minwidth:150,formatter:function(value,row,index){
			var html = "<a class='table_a_css' href='javascript:deleteone(\""+row.hlcpk+"\")' >删除</a><a class='table_a_css' href='javascript:modifyappend(\""+row.hlcpk+"\")' >上传附件</a>";
			html += "<a class='table_a_css' href='javascript:viewone(\""+row.hlcpk+"\")' >查看</a>";
 			return html;
		}}, 
		{field:"hlcFirstEnprName",title:'申请单位',minwidth:200},
        {field:"hlcBarCode",title:'合同编号',minwidth:160},
        {field:"hlcSecondEnprName",title:'承租人',minwidth:150},
        {field:"unitArea",title:'物业面积',minwidth:120,align:'right',fmType:'money'},
        {field:"hlcPurposeDisplay",title:'出租用途',minwidth:100,align:'center',hidden:true},
		{field:"hlcCheckFlagDisplay",title:'合同状态',minwidth:100,align:'center'},
		{field:"hlcRegDate",title:'签订日期',minwidth:100,align:'center'},
        {field:"unitAdress",title:'物业地址',minwidth:250},
		{field:"unitCode",title:'物业编号',minwidth:100,align:'center',hidden:true},
		{field:"unitName",title:'物业名称',minwidth:150,align:'center',hidden:true},
		{field:"unitPurposeDisplay",title:'物业用途',minwidth:100,align:'center',hidden:true},
		{field:"hlcSecondPaperTyypeDisplay",title:'承租人证件类型',minwidth:120,align:'center',hidden:true},
		{field:"hlcSecondPaperNo",title:'承租人证件号码',minwidth:150,align:'center',hidden:true},
		{field:"hlcSecondtname",title:'承租人联系人',minwidth:120,align:'center',hidden:true},
		{field:"hlcSecondtTel",title:'承租人联系电话',minwidth:120,align:'center',hidden:true}, 
		{field:"hlcRegStartDate",title:'合同起始日期',minwidth:100,align:'center',hidden:true},
		{field:"hlcRegEndDate",title:'合同结束日期',minwidth:100,align:'center',hidden:true},
		{field:"hlcRentPayTypeDisplay",title:'付款方式',minwidth:100,align:'center',hidden:true},
        {field:"hlcDeposit",title:'租赁保证金',minwidth:120,align:'right',fmType:'money',hidden:true},
        {field:"hlcRuleRent",title:'月租金',minwidth:120,align:'right',fmType:'money'},
        {field:"hlcUintRuleRent",title:'单价（元/平方米）',minwidth:120,align:'right',fmType:'money'},
		{field:"hlcIncrRound",title:'递增周期（月）',minwidth:100,align:'center',hidden:true},
        {field:"hlcIncrRate",title:'递增率（%）',minwidth:100,align:'center',hidden:true},
		{field:"hlcOtherItem",title:'其他条款',minwidth:200,align:'center',hidden:true},
		{field:"hlcFirstRepairItem",title:'备注',minwidth:200,align:'center',hidden:true},
		{field:"updatePerson",title:'最后修改人',align:'center',minwidth:120,hidden:true},
		{field:"lastestUpdate",title:'最后修改时间',align:'center',minwidth:150,hidden:true}
	]];
	 var dataGridOptions ={};
	 var customOptions = {tableID:'id_table_grid',classID:'HouseLeaseContractBO',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition,
			 orgField:"hlcFirstEnprCode"};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}


/**
 * 根据业务类型，设置实际的查询条件
 **/
function setCustomQueryCondition() {
	var customQCArr = new Array();
	
	var QC1 = new Object();
	QC1.fn = "hlcIfvalid";
	QC1.oper = ARY_STR_EQUAL[0];
	QC1.value1 = 'YesNo_001';
	customQCArr.push(QC1);
	
	return customQCArr;
}

function initComponent() {
}

/**
 * 为页面上的组件添加事件处理方法
 **/
function initComBindFunc() {
	$("#id_btn_addnew").click(function () {
		addone();
	});
	//查询按钮处理事件
	$("#id_btn_query").click(function () {
		datagrid.query();
	});
	$("#id_btn_selecteColumns").click(function () {
		datagrid.showSelectListItem();
	});
	$("#id_btn_export").click(function () {
		datagrid.showExport();
	}); 
}

/**
 * 新增
 **/
function addone() {
	if(!judgeOpeCollectOrg()) {
		return;
	}
 	window.location.href = "editContractRegist.jsp?busitype="+STR_REGISTER_ADDNEW;
}

/**
 * 上传附件
 **/
function modifyappend(hlcpk) {
	if(!judgeOpeCollectOrg()) {
		return;
	}
 	window.location.href = "modifyAppendContractRegist.jsp?hlcpk="+hlcpk;
}

/**
 * 删除
 **/
function deleteone(hlcpk) {
	if(!judgeOpeCollectOrg()) {
		return;
	}
	top.layer.open({
		title:'删除合同信息',
		icon: 3,
		area:['300px','160px'],
		btn:['确定', '取消'],
		content:'确定要删除选中的合同信息吗？',
		shift:1,
		closeBtn :2,
		yes: function(index){
			top.layer.close(index);
			deleteService(hlcpk);		
	    }
	});	
}

/**
 * 发送删除请求
 **/
function deleteService(hlcpk) {
	Ajax.service(
		'HouseLeaseContractBO',
		'deleteHouseLeaseContract', 
		[hlcpk],
		deleteServiceSuccFunc,
		serviceFailureFunc
	);
}

/**
 * 删除请求成功回调函数
 **/
function deleteServiceSuccFunc(data) {
	if(data!="null"&&data.length>0){
		top.layer.alert(data,{closeBtn :2,icon:5});
		changeBtnDisabled(false);
	}else{	    				
		top.layer.alert('删除成功 ',{icon:6,closeBtn :2});
		datagrid.query();
	}	
}

/**
 * 请求失败回调函数,删除，注销，撤销注销失败等均调用此方法
 **/
function serviceFailureFunc() {
	top.layer.alert('删除数据出现错误，请联系管理员 ',{icon:5,closeBtn :2});
} 

/**
 * 查看客户信息单
 **/
function viewone(hlcpk) {
	 viewContract('hlcpk',hlcpk);
} 