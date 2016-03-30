//列表表格对象
var datagrid = null;
//var mainObj = new Object();
/**
 * 初始化方法
 **/ 
$(function () { 
	initDefaultValue();
	initDataGrid();
	initComBindFunc(); 
	setAppenFrame();
});

/**
 * 初始化默认值
 */
function initDefaultValue() {
	$("#id_itemsApplyDeptCode").val(top.strUserDeptName);
	$("#id_applyPerson").val(top.strUserName);
	$("#id_itemsApplyDate").val(serverDate);
	$("#id_categoryManagementPK").val(categoryName);
}

function checkLviCount(value) {
	if(value < 1) {
		top.layer.alert('申购数量不能小于"1"',{closeBtn :2,icon:7});
	}
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
		{field:"lviCount",title:'入库数量',minwidth:80,editor:{ type:'numberbox',options:{onChange:checkLviCount,width:80},align:'right',fmType:'int'}}
	]];
	 
	 var dataGridOptions ={rownumbers:false,checkbox:true,isQuery:true,pagination:false,height:'auto',onLoadSuccess:initEditCell};
	 
	 var customOptions = {tableID:'id_table_grid',classID:'ItemManageBO',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}

/**初始化编辑的单元格**/
function initEditCell(){
	var row = datagrid.dataGridObj.datagrid('getRows');
	var rowLen = row.length;
	for (var i = 0; i < rowLen; i++) {
		datagrid.dataGridObj.datagrid('beginEdit', i);
	}
	//编辑单元格的宽带会被框架（审批的样式）样式覆盖，这里处理覆盖的样式
	var width = $("td[field=lviCount]").children("div.datagrid-cell")[0].clientWidth;
	var cssWidth = 'width:'+width+'px!important;';
	$(".datagrid-cell-c1-lviCount").css("cssText",cssWidth);
}

//自定义查询条件
function setCustomQueryCondition() {
	var customQCArr = new Array();
	//类目条件
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

/**
 * 入库
 */
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

/**
 * 打包低值品仓库
 * @returns {Array}
 */
/*function packagelowValueItemsData() {
	
	var row = datagrid.dataGridObj.datagrid('getRows');
	var rowLen = row.length;
    var rowsData = new Array();
    for(var i=0;i<rowLen;i++) {
		var editors = datagrid.dataGridObj.datagrid('getEditors', i);	
		var lviCount = editors[0].target.numberbox('getValue');
		if (lviCount > 0) {//控制入库数量大于0的才可以入库
			var lowValueItems = new Object();
			lowValueItems.lviCount = lviCount;
		 	lowValueItems.lviCategoryPK = categoryPk;
		 	lowValueItems.lviItemManagePK = row[i].pk;
		 	lowValueItems.lviName = row[i].imName;
		 	lowValueItems.lviType = row[i].imType;
		 	lowValueItems.lviSpecification = row[i].imSpecification;
		 	lowValueItems.lviMetricUnit = row[i].imMetricUnit;
		 	rowsData.push(lowValueItems);
		}
	}
	return rowsData;
}*/

/**
 * 打包低值品仓库
 * @returns {Array}
 */
function packagelowValueItemsData() {
	
	var checkRows = $('#id_table_grid').datagrid('getChecked');//很奇怪，通过getChecked得到的列和编辑值顺序是倒过来的，即不对应。所以只能用笨的办法来处理。哎
	var checkRowsLen = checkRows.length;
	if (checkRowsLen < 1) {
		var msg = '请选择要入库的物品，并填写入库数量！';
		top.layer.alert(msg,{closeBtn :2,icon:7});
 		return;
	}
	
    var rowsData = new Array();
    var allRows = datagrid.dataGridObj.datagrid('getRows');
	var allRowsLen = allRows.length;
	
    for(var i=0;i<allRowsLen;i++) {
		
		var isChecked = false;
		 for (var j=0;j<checkRowsLen;j++) {
			 if(checkRows[j].pk==allRows[i].pk){    //是否被选中
			    	isChecked = true;
			    	break;
			    }
		 }
		 if (isChecked) {
			var editors = datagrid.dataGridObj.datagrid('getEditors', i);	
			var lviCount = editors[0].target.numberbox('getValue');
			if (lviCount < 1) {
		 		top.layer.alert('入库数量不能小于"1"',{closeBtn :2,icon:7});
		 		return;
		 	}
		 	
		 	var lowValueItems = new Object();
			lowValueItems.lviCount = lviCount;
		 	lowValueItems.lviCategoryPK = categoryPk;
		 	lowValueItems.lviItemManagePK = allRows[i].pk;
		 	lowValueItems.lviName = allRows[i].imName;
		 	lowValueItems.lviType = allRows[i].imType;
		 	lowValueItems.lviSpecification = allRows[i].imSpecification;
		 	lowValueItems.lviMetricUnit = allRows[i].imMetricUnit;
		 	rowsData.push(lowValueItems);
		 }
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

