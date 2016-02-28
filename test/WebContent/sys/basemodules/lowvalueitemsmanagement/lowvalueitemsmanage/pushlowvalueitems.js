//列表表格对象
var datagrid = null;
var mainObj = new Object();
/**
 * 初始化方法
 **/ 
$(function () { 
	initDefaultValue();
	initDataGrid();
	initComBindFunc(); 
	setAppenFrame();
});

function initDefaultValue() {
	$("#id_itemsApplyDeptCode").val(top.strUserDeptName);
	$("#id_applyPerson").val(top.strUserName);
	$("#id_itemsApplyDate").val(serverDate);
	$("#id_categoryManagementPK").val(categoryName);
}

/**
 * 初始化表格信息
 **/
function initDataGrid() {
	 var _sortInfo = {"sortPK" : "pk","sortSql" : "lastestUpdate Desc"};
	 var _columns =  
	 [[
		{field:"imName",title:'物品名称',minwidth:80},
        {field:"imSpecification",title:'规格型号',minwidth:80},
		{field:"imMetricUnit",title:'单位',minwidth:80},
		{field:"lviCount",title:'入库数量',minwidth:80,editor:{ type:'numberbox',options:{min:1,width:80},align:'right',fmType:'int'}}
	]];
	 
	 var dataGridOptions ={rownumbers:false,checkbox:true,isQuery:true,pagination:false,height:'auto',onLoadSuccess:initEditCell};
	 
	 var customOptions = {tableID:'id_table_grid',classID:'ItemManageBO',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}

function initEditCell(){
	var row = datagrid.dataGridObj.datagrid('getRows');
	var rowLen = row.length;
	for (var i = 0; i < rowLen; i++) {
		datagrid.dataGridObj.datagrid('beginEdit', i);
	}
	
	var width = $("td[field=lviCount]").children("div.datagrid-cell")[0].clientWidth;
	$(".datagrid-cell-c1-lviCount").width(width);
}

//自定义查询条件
function setCustomQueryCondition() {
	var customQCArr = new Array();
	//单位条件
	var categoryQc = new Object();
	categoryQc.fn = 'imCategoryPK';
	categoryQc.oper = ARY_STR_EQUAL[0];
	categoryQc.value1 = categoryPk;
	customQCArr.push(categoryQc);
    return customQCArr;
}

/**
 * 为页面上的组件添加事件处理方法
 **/
function initComBindFunc() {
	$("#id_btn_save").click(function () {
		save();
	});
	//查询按钮处理事件
	$("#id_btn_query").click(function () {
		datagrid.query();
	});
	$("#id_btn_export").click(function () {
		datagrid.showExport();
	}); 
	$("#id_bt_return").click(function(){
		history.go(-1);
		});
	
}

function save() {
	var lowValueItemsList = packagelowValueItemsData();
	
	Ajax.service(
			'LowValueItemsBO',
			'addLowValueItems', 
			 [lowValueItemsList,top.strFilterOrgCode,top.strUserDeptCode],
			function(result){
				$('body').removeLoading();     // 关闭遮挡层
				//$("#id_btn_save").attr("disabled", false); // 按钮可点击
				if(result!=null&&result!=""){		
					top.layer.alert(result,{icon: 5, closeBtn:2});
				}else{
					top.layer.alert('入库成功 ',{icon: 6, closeBtn:2});
					history.go(-1);
				}		
			}
		);
}

function packagelowValueItemsData() {
	
	var row = datagrid.dataGridObj.datagrid('getRows');
	var rowLen = row.length;
    var rowsData = new Array();
    for(var i=0;i<rowLen;i++) {
		var editors = datagrid.dataGridObj.datagrid('getEditors', i);	
	 	
	 	var lowValueItems = new Object();
	 	lowValueItems.lviCategoryPK = categoryPk;
	 	lowValueItems.lviItemManagePK = row[i].pk;
	 	lowValueItems.lviName = row[i].imName;
	 	lowValueItems.lviType = row[i].imType;
	 	lowValueItems.lviSpecification = row[i].imSpecification;
	 	lowValueItems.lviMetricUnit = row[i].imMetricUnit;
	 	lowValueItems.lviCount = editors[0].target.numberbox('getValue');
	 	
   		rowsData.push(lowValueItems);
	}
	return rowsData;
}

/**
 * 设置附件
 **/
function setAppenFrame() {    
	var appendFrameObj = document.getElementById('id_iframe_append');
	appendFrameObj.src = contextPath+'/core/componentmodule/upload/listCommonUpload.jsp?busitype=TYYWLX_025&controltype='+business+'&businesscode='+pk;
}

/** 
 * 获取附件数据
 **/
function getAppendData() {
	var appendFrameObj = document.getElementById('id_iframe_append').contentWindow;
	var appendData = appendFrameObj.getAppendData();
	return appendData;
}

