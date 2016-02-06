//列表表格对象
var datagrid = null;

/**
 * 初始化方法
 **/ 
$(function () { 
	initDataGrid();
	initComBindFunc(); 
	initCategoryCombo();
});

/**
 * 初始化表格信息
 **/
function initDataGrid() {
	 var tempID1 = Math.random();
	 var _sortInfo = {"sortPK" : "pk","sortSql" : "lastestUpdate Desc"};
	 var _columns =  
	 [[
		{field:"pk",title:'主键',minwidth:200, hidden:true},
		{field:"imName",title:'物品名称',minwidth:150},
        {field:"imTypeDisplay",title:'类别',minwidth:160},
        {field:"imSpecification",title:'规格型号',minwidth:160},
		{field:"imMetricUnit",title:'单位',minwidth:200,},
		{field:"a",title:'申领数量',minwidth:150,formatter:function(value,row,index){return '<input id="'+tempID1+'" name="name_input_dayday" type="text" style="width:30px" value="1"  class="easyui-numberbox" data-options="maxWidth:30,min:1,max:31,precision:0"  >'}},
		{field:"b",title:'经办人审核数量',minwidth:150},
		{field:"c",title:'行装科领导审核数量',minwidth:150}
	]];
	 var dataGridOptions ={rownumbers:false,checkbox:false,pagination:false,height:'auto',onLoadSuccess:null};
	 var customOptions = {tableID:'id_table_grid',classID:'ItemManageBO',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}

//自定义查询条件
function setCustomQueryCondition() {
	var customQCArr = new Array();
	//单位条件
	var categoryQc = new Object();
	categoryQc.fn = 'imCategoryPK';
	categoryQc.oper = ARY_STR_EQUAL[0];
	categoryQc.value1 = "31fd2d39-49ab-42ec-bf2f-f1ff6d111e56";//31fd2d39-49ab-42ec-bf2f-f1ff6d111e56
	customQCArr.push(categoryQc);
    return customQCArr;
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
	$("#id_btn_export").click(function () {
		datagrid.showExport();
	}); 
	
	
}

/**
 * 新增
 **/
function addone() {
	/*if(!judgeOpeCollectOrg()) {
		return;
	}*/
 	window.location.href = "edititems.jsp?busitype=add";
}

//修改
function modifyone(pk){
		location.href='edititems.jsp?pk='+pk+'&busitype=modify';

}

/**
 * 删除
 **/
function deleteone(pk) {
	top.layer.open({
		title:'删除数据',
		icon: 3,
		area:['300px','160px'],
		btn:['确定', '取消'],
		content:'确定要删除选中的数据吗？',
		shift:1,
		closeBtn :2,
		yes: function(index){
			top.layer.close(index);
			deleteService(pk);		
	    }
	});	
}

/**
 * 发送删除请求
 **/
function deleteService(pk) {
	Ajax.service(
		'ItemManageBO',
		'deleteItem', 
		[pk],
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


function initCategoryCombo() {
	$('#category').combobox({
		onBeforeLoad: function(param){
			ajaxCategory();
		},
		valueField:'pk',
		textField:'categoryName',
		width:180,
		height:26,
		panelHeight:100,
		editable:false
	});
}

function ajaxCategory(){
	Ajax.service(
		'CategoryManagementBO',
		'findAll', 
		[],
		function(result){
			$('#category').combobox("loadData",result);
		}
	);
}

function getImType() {
	var checkedQc = new Object();
	checkedQc.fn = '';
	checkedQc.oper = 14;
	var contratStatusDisplay=$('#imType').combobox('getValue');
	
	if (contratStatusDisplay== '2'){
		checkedQc.value1 = "(IMType = 'WPLB_001')";
	}else if(contratStatusDisplay== '3'){
		checkedQc.value1 = "(IMType = 'WPLB_002')";
	}else{
		checkedQc.value1 = "(1=1)";
	}
    return checkedQc;
}
