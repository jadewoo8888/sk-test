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
	 var dataGridOptions ={checkbox:false};
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
	
	initCombobox();
}
/**
 * 类别下拉框
 */
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
/**
 * 显示选择入库方式窗口
 */
function selPushStoreWay() {
	var html = '<div style="padding: 5px;text-align: center;"><input type="button" class="bt_list_function" value="采购申请单入库" onclick="toPurchasePage();"/></div>';
	html += '<div style="padding: 5px;text-align: center;"><input type="button" class="bt_list_function" value="自行入库" onclick="showCategoryListLayer();"/></div>';
	
	//页面层
	layer.open({
		title:'请选择入库方式',
	    type: 1,
	    closeBtn :2,
	    //skin: 'layui-layer-rim', //加上边框
	    area: ['250px', '250px'], //宽高
	    content: html
	});
	
	/*top.layer.open({
		type:2,
		title:'请选择入库方式 ',
		shift:1,
		closeBtn :2,
		area:['250x','200px'],
		shade:false,
		zIndex:'2015', 
		success:function(layero){
	   		top.layer.setTop(layero); 
		},
		content:contextPath+'/sys/basemodules/lowvalueitemsmanagement/purchasemanage/purchaseapply/selStoreWay.jsp'
	});*/
	
};

/**
 * 跳转到申购页面
 */
function toPurchasePage() {
	location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/purchasemanage/purchaseapply/listpurchaseapply.jsp';
};

/**
 * 显示类目选择窗口
 */
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
		html += '<div style="padding: 5px;text-align: center;"><input type="button" id="category'+i+'" class="bt_list_function" value="'+result[i].categoryName+'" onclick="toAddItemStorePage(\''+result[i].pk+'\');"/></div>';
	}
	//页面层
	layer.open({
		title:'请选择类目',
	    type: 1,
	    closeBtn :2,
	    area: ['250px', '250px'], //宽高
	    content: html
	});
};

/**
 * 自行入库
 * 类目中包含低值品才能入库
 */
function toAddItemStorePage(pk) {
	Ajax.service(
	  		'ItemManageBO',
	  		'findByProperty', 
	  		['imCategoryPK',pk],
	  		function(rows){
	  			var ifIncludeLVItem = false;//是否包含低值品
	  			for (var i = 0; i < rows.length; i++) {
	  				if (rows[i].imType == 'WPLB_001') {
	  					ifIncludeLVItem = true;
	  					break;
	  				}
	  			}
	  			
	  			if (ifIncludeLVItem) {
		  			location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/lowvalueitemsmanage/pushlowvalueitems.jsp?categoryPk='+pk+'&business='+STR_REGISTER_ADDNEW;
	  			} else {
	  				top.layer.alert('该类目中无低值品，请重新选择类目！', {icon: 5,closeBtn :2});
	  			}
	  		
	  		},
	  		function(data){
	  			top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
	  		}
	  	);
};

//发放
function toIssueitemPage() {
	location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/issuemange/listissueitem.jsp';
}
//入库记录
function toPushstorerecordPage() {
	location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/lowvalueitemsmanage/lviStoreRecord/listlviStoreRecord.jsp';
}
//出库记录
function toPopstorerecordPage() {
	location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/lowvalueitemsmanage/lviPopRecord/listlviPopRecord.jsp';
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
