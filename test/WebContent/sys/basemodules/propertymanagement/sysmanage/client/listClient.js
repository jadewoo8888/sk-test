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
 **/
function initDataGrid() {
	var _sortInfo = {"sortPK" : "pk","sortSql" : "lastestUpdate Desc"};
	 var _columns =  
	 [[
	 	{field:'option',title:'操作',minwidth:120,formatter:function(value,row,index){
			var html = ''; 
			if(row.clientStatus=='0') {
				html = "<a class='table_a_css' href='javascript:modifyone(\""+row.pk+"\")' >修改</a><a class='table_a_css' href='javascript:writeoff(\""+row.pk+"\")' >注销</a>";
			} else if(row.clientStatus=='1') {
				html = "<a class='table_a_css' href='javascript:unwriteoff(\""+row.pk+"\")' >撤销注销</a>";
			}
			html += "<a class='table_a_css' href='javascript:viewone(\""+row.pk+"\")' >查看</a>";
 			return html;
		}}, 
		{field:"clientCode",title:'客户编号',minwidth:120},
        {field:"hlcSecondEnprName",title:'承租人',minwidth:150,align:'left'},
        {field:"unitAdress",title:'物业地址',minwidth:200,align:'left'}, 
        {field:"unitArea",title:'物业面积',minwidth:120,align:'right',fmType:'money'},
		{field:"unitPurposeDisplay",title:'物业用途',minwidth:100,align:'center'},
		{field:"lastWaterDate",title:'上次查电表日期',align:'center',minwidth:100}, 
 		{field:"lastElecDate",title:'上次查水表日期',align:'center',minwidth:100},
		{field:"perSquareHalthFee",title:'每平物业卫生费',minwidth:120,align:'right',fmType:'money'},
		{field:"monthlyOtherFee",title:'其它费用',minwidth:120,align:'right',fmType:'money'},
		{field:"waAndElecRevolv",title:'周转金余额',minwidth:120,align:'right',fmType:'money'},
		{field:"arrearsTimes",title:'欠费笔数',minwidth:120,align:'center',fmType:'int'},
		{field:"arrearsTotal",title:'欠费总金额',minwidth:120,align:'right',fmType:'money'},
		{field:"ifHealthFee",title:'是否代收物业卫生费',minwidth:120,align:'center',hidden:true},
		{field:"ifCollection",title:'是否代收水电费',minwidth:120,align:'center',hidden:true},
		{field:"lastWaterDegree",title:'上月水吨数',minwidth:120,align:'right',fmType:'money',hidden:true},
		{field:"lastElecDegree",title:'上月电度数',minwidth:120,align:'right',fmType:'money',hidden:true},
		{field:"lister",title:'登记人',minwidth:120,align:'center',hidden:true},
		{field:"listDate",title:'登记日期',minwidth:100,align:'center',hidden:true},
		{field:"remark",title:'备注',minwidth:200,align:'center',hidden:true},
		{field:"updatePerson",title:'最后修改人',align:'center',minwidth:120,hidden:true},
		{field:"lastestUpdate",title:'最后修改时间',align:'center',minwidth:120,hidden:true}
	]];
	 var dataGridOptions ={checkbox:true};
	 var customOptions = {tableID:'id_table_grid',classID:'ClientBO',methodID:'getListForPageClient',columns:_columns,sortInfo:_sortInfo,customQCFunc:null,
			 orgField:"orgSysCode"};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
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
	$("#id_btn_delete").click(function () {
		deleteone();
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
 	window.location.href = "editClient.jsp?busitype="+STR_REGISTER_ADDNEW;
}


/**
 * 修改
 **/
function modifyone(pk) {
	if(!judgeOpeCollectOrg()) {
		return;
	}
  	window.location.href = "editClient.jsp?busitype="+STR_REGISTER_MODIFY+"&pk="+pk;
}

/**
 * 注销
 **/
function writeoff(pk) {
	if(!judgeOpeCollectOrg()) {
		return;
	}
	
	top.layer.open({
		title:'注销客户信息',
		icon: 3,
		area:['300px','160px'],
		btn:['确定', '取消'],
		content:'确定要注销选中的客户信息吗？',
		shift:1,
		closeBtn :2,
		yes: function(index){
			top.layer.close(index);
			writeoffService(pk);		
	    }
	});	
}

/**
 * 发送注销请求
 **/
function writeoffService(pk) {
	Ajax.service(
		'ClientBO',
		'writeoffClient', 
		[[pk]],
		writeoffServiceSuccFunc,
		serviceFailureFunc
	);
}

/**
 * 注销请求成功回调函数
 **/
function writeoffServiceSuccFunc(data) {
	top.layer.alert('注销成功 ',{icon:6,closeBtn :2});
	datagrid.query();
}


/**
 * 撤销注销
 **/
function unwriteoff(pk) {
	if(!judgeOpeCollectOrg()) {
		return;
	}
 
	top.layer.open({
		title:'撤销注销客户信息',
		icon: 3,
		area:['320px','160px'],
		btn:['确定', '取消'],
		content:'确定要撤销注销选中的客户信息吗？',
		shift:1,
		closeBtn :2,
		yes: function(index){
			top.layer.close(index);
			unwriteoffService(pk);		
	    }
	});	
}


/**
 * 发送撤销注销请求
 **/
function unwriteoffService(pk) {
	Ajax.service(
		'ClientBO',
		'unWriteoffClient', 
		[[pk]],
		unwriteoffServiceSuccFunc,
		serviceFailureFunc
	);
}

/**
 * 撤销注销请求成功回调函数
 **/
function unwriteoffServiceSuccFunc(data) {
	top.layer.alert('撤销注销成功 ',{icon:6,closeBtn :2});
	datagrid.query();
}

/**
 * 删除
 **/
function deleteone() {
	if(!judgeOpeCollectOrg()) {
		return;
	}
	var selectData = datagrid.getSelectedData();
	var selectData = datagrid.getSelectedFilterObj(selectData); 
	if(!selectData||selectData.length==0){
		return;
	}
	
	top.layer.open({
		title:'删除客户信息',
		icon: 3,
		area:['300px','160px'],
		btn:['确定', '取消'],
		content:'确定要删除选中的客户信息吗？',
		shift:1,
		closeBtn :2,
		yes: function(index){
			top.layer.close(index);
			deleteService(selectData);		
	    }
	});	
}

/**
 * 发送删除请求
 **/
function deleteService(selectData) {
	Ajax.service(
		'ClientBO',
		'deleteClient', 
		[selectData],
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
function viewone(pk) {
	var context = "";
	context = contextPath+'/sys/basemodules/propertymanagement/sysmanage/client/viewClient.jsp?pk='+pk+'&busitype='+STR_VIEW;
	top.layer.open({
		type: 2,
		title:'客户信息查看',
		area:['900px','450px'],
		shift:1,
		closeBtn:2,
		content:context
	});
} 