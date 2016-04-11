//列表表格对象
var datagrid = null;

/**
 * 初始化方法
 **/ 
$(function () { 
	initTypeCombobox();
	initDataGrid();
	initComBindFunc(); 
	initCategoryCombo();
});

/**
 * 初始化表格信息
 **/
function initDataGrid() {
	 var _sortInfo = {"sortPK" : "pk","sortSql" : "lastestUpdate Desc"};
	 var _columns =  
	 [[
		{field:"lviPRCategoryPKDisplay",title:'类目',minwidth:80},
        {field:"lviPRTypeDisplay",title:'类别',minwidth:80},
        {field:"lviPRName",title:'物品名称',minwidth:80},
        {field:"lviPRSpecification",title:'规格',minwidth:80},
		{field:"lviPRMetricUnit",title:'单位',minwidth:80},
		{field:"lviPRCount",title:'出库数量',minwidth:80},
        {field:"lviPRPerson",title:'发放人',minwidth:80},
		{field:"lviPRApplyPerson",title:'领用人',minwidth:80},
		{field:"lviPRDate",title:'发放日期',minwidth:80},
		{field:"lviPRRemark",title:'备注',minwidth:150}
	]];
	 var dataGridOptions ={checkbox:false};
	 var customOptions = {tableID:'id_table_grid',classID:'LVIPopRecordBO',columns:_columns,sortInfo:_sortInfo};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}

/**
 * 为页面上的组件添加事件处理方法
 **/
function initComBindFunc() {
	$("#id_btn_return").click(function () {
		history.go(-1);
	});
	//列选功能 
   	$("#id_btn_selecteColumns").click(function(){
   		datagrid.showSelectListItem();
   	})
	//查询按钮处理事件
	$("#id_btn_query").click(function () {
		datagrid.query();
	});
	$("#id_btn_export").click(function () {
		datagrid.showExport();
	}); 
}
/**
 * 类别下拉框
 */
function initTypeCombobox() {
	if($('#itemType')[0])
		$('#itemType').combobox({    
		    data:data_lviPRType,  
		    editable:false,
		    panelHeight:100,
		    multiple:true,
		    height:28,
		    width:120,
		    valueField:'classifyCode',
		    textField:'classifyName',
		    onLoadSuccess: function () { //数据加载完毕事件

	        }  
		});
}

/**
 * 类目下拉框
 * 初始化类目下拉框。根据角色编码查找：下拉类目列表包含自己角色的和类目角色为空的
 */
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
		'findCategoryByGroupCode', 
		[top.strUserGroupCode],
		function(result){
			$('#category').combobox("loadData",result);
		}
	);
}

