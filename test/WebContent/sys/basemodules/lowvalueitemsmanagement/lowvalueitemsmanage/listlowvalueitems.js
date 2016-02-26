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
	 var _sortInfo = {"sortPK" : "pk","sortSql" : "lastestUpdate Desc"};
	 var _columns =  
	 [[
		{field:"lviCategoryPKDisplay",title:'类目',minwidth:80},
        {field:"lviTypeDisplay",title:'类别',minwidth:80},
        {field:"lviName",title:'物品名称',minwidth:80},
        {field:"lviSpecification",title:'规格型号',minwidth:80},
		{field:"lviMetricUnit",title:'计量单位',minwidth:80},
		{field:"lviCount",title:'库存',minwidth:80},
		{field:"imRemark",title:'备注',minwidth:150}
	]];
	 var dataGridOptions ={};
	 var customOptions = {tableID:'id_table_grid',classID:'LowValueItemsBO',columns:_columns,sortInfo:_sortInfo};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}

/**
 * 为页面上的组件添加事件处理方法
 **/
function initComBindFunc() {
	$("#id_btn_pushstore").click(function () {
		pushstore();
	});
	$("#id_btn_issueitem").click(function () {
		toIssueitemPage();
	});
	$("#id_btn_pushstorerecord").click(function () {
		toPushstorerecordPage();
	});
	$("#id_btn_popstorerecord").click(function () {
		toPopstorerecordPage();
	});
	$("#id_btn_pushstore").click(function () {
		pushstore();
	});
	//列选功能 
   	$("#selecteColumns").click(function(){
   		datagrid.showSelectListItem();
   	})
	//查询按钮处理事件
	$("#id_btn_query").click(function () {
		datagrid.query();
	});
	$("#id_btn_export").click(function () {
		datagrid.showExport();
	}); 
	
	initCombobox();
}

function initCombobox() {
	if($('#lviType')[0])
		$('#lviType').combobox({    
		    data:data_imType,  
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
 * 入库
 **/
function pushstore() {
	if(!judgeOpeCollectOrg()) {
		return;
	}
	selPushStoreWay();
}

function selPushStoreWay() {
	var html = '<div style="padding: 5px;text-align: center;"><input type="button" class="bt_list_function" value="采购申请单入库" onclick="toPurchasePage();"/></div>';
	html += '<div style="padding: 5px;text-align: center;"><input type="button" class="bt_list_function" value="自行入库" onclick="showCategoryListLayer();"/></div>';
	
	//页面层
	layer.open({
		title:'选择类目',
	    type: 1,
	    skin: 'layui-layer-rim', //加上边框
	    area: ['180px', '220px'], //宽高
	    content: html
	});
};

function toPurchasePage() {
	location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/purchasemanage/purchaseapply/listpurchaseapply.jsp';
};

function showCategoryListLayer() {
	Ajax.service(
		'CategoryManagementBO',
		'findCategoryByGroupCode', 
		[top.strUserGroupCode],
		showCategoryListSuccFunc
	);
}

function showCategoryListSuccFunc(result) {
	
	var html = "";
	var len = result.length;
	for (var i = 0; i < len;i++) {
		html += '<div style="padding: 5px;text-align: center;"><input type="button" id="category'+i+'" class="bt_list_function" value="'+result[i].categoryName+'" onclick="toAddApplyPage(\''+result[i].pk+'\',\''+result[i].categoryName+'\');"/></div>';
	}
	//页面层
	layer.open({
		title:'请选择入库方式',
	    type: 1,
	    skin: 'layui-layer-rim', //加上边框
	    area: ['180px', '220px'], //宽高
	    content: html
	});
};

function toAddApplyPage(pk,categoryName) {
	location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/lowvalueitemsmanage/pushlowvalueitems.jsp?categoryPk='+pk+'&categoryName='+categoryName+'&business='+STR_REGISTER_ADDNEW;
};

function toIssueitemPage() {
	location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/issuemange/listissueitem.jsp';
}

function toPushstorerecordPage() {
	location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/lowvalueitemsmanage/lviStoreRecord/listlviStoreRecord.jsp';
}

function toPopstorerecordPage() {
	location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/lowvalueitemsmanage/lviPopRecord/listlviPopRecord.jsp';
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
		'findCategoryByGroupCode', 
		[top.strUserGroupCode],
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
