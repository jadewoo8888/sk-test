//列表表格对象
var datagrid = null;
/**
 * 初始化方法
 **/ 
$(function () { 
	initDefaultValue();
	initDataGrid();
	initComBindFunc(); 
	initAppend();
});

/**
 * 初始化默认值
 */
function initDefaultValue() {
	getCategoryByPk(categoryPk);
	
	$("#id_itemsApplyDeptCode").val(top.strUserDeptName);
	$("#id_applyPerson").val(top.strUserName);
	$("#id_itemsApplyDate").val(serverDate);
	
}

function getCategoryByPk(categoryPk) {
	
	Ajax.service(
	  		'CategoryManagementBO',
	  		'findById', 
	  		[categoryPk],
	  		function(obj){
	  			categoryName = obj.categoryName;
	  			$("#id_categoryManagementPK").val(categoryName);
	  		},
	  		function(data){
	  			top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
	  		}
	  	);
}

function checkLviCount(value) {
	if(value < 1) {
		top.layer.alert('入库数量不能小于1',{closeBtn :2,icon:7});
	}
}

/**
 * 初始化表格信息
 **/
function initDataGrid() {
	 var _sortInfo = {"sortPK" : "pk","sortSql" : "lastestUpdate Desc"};
	 var _columns =  
	 [[
		{field:"imName",title:'物品名称',minwidth:180},
        {field:"imSpecification",title:'规格型号',minwidth:120},
		{field:"imMetricUnit",title:'单位',minwidth:80},
		{field:"lviCount",title:'入库数量',minwidth:120,editor:{ type:'numberbox',options:{onChange:checkLviCount,width:120},align:'right',fmType:'int'}}
	]];
	 
	 var dataGridOptions ={rownumbers:false,checkbox:true,isQuery:true,pagination:false,width:690,height:'auto',onLoadSuccess:initEditCell};
	 
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
	
	//只查询低值品
	var lvItemQc = new Object();
	lvItemQc.fn = 'imType';
	lvItemQc.oper = ARY_STR_EQUAL[0];
	lvItemQc.value1 = 'WPLB_001';
	customQCArr.push(lvItemQc);
	
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
	
	var checkRows = $('#id_table_grid').datagrid('getChecked');
	var checkRowsLen = checkRows.length;
	if (checkRowsLen < 1) {
		var msg = '请选择要入库的物品，并填写入库数量！';
		top.layer.alert(msg,{closeBtn :2,icon:7});
	} else {
		$("#id_btn_save").attr("disabled", true);
		top.layer.open({
			title:'保存低值品入库数量',
			icon: 3,
			area:['300px','150px'],
			btn:['确定', '取消'],
			content:'你确定要保存低值品入库数量吗？',
			shift:1,
			closeBtn :2,
			yes: function(index){
					$('body').addLoading({msg:'正在保存数据，请等待...'});			    //打开遮挡层		
					
					var lowValueItemsList = packagelowValueItemsData();
					
					Ajax.service(
							'LowValueItemsBO',
							'addLowValueItems', 
							 [lowValueItemsList,top.strFilterOrgCode,top.strUserDeptCode],
							function(result){
								$('body').removeLoading();     // 关闭遮挡层
								$("#id_btn_save").attr("disabled", false); // 按钮可点击
								
								if(result!=null&&result!=""){		
									top.layer.alert(result,{icon: 5, closeBtn:2});
								}else{
									top.layer.alert('入库成功 ',{icon: 6, closeBtn:2});
									history.go(-1);
								}		
							}
						);
					
		    		top.layer.close(index);	//一般设定yes回调，必须进行手工关闭

		    },
		    cancel: function(index){
				$("#id_btn_save").attr("disabled", false);
			}
		});	
	}
	
	
}

/**
 * 打包低值品仓库
 * @returns {Array}
 */
function packagelowValueItemsData() {
	
	var checkRows = $('#id_table_grid').datagrid('getChecked');//很奇怪，通过getChecked得到的列和编辑值顺序是倒过来的，即不对应。所以只能用笨的办法来处理。哎
	var checkRowsLen = checkRows.length;
    
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
		 		top.layer.alert('入库数量不能小于1',{closeBtn :2,icon:7});
		 		
		 		$('body').removeLoading();     // 关闭遮挡层
				$("#id_btn_save").attr("disabled", false); // 按钮可点击
				
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
function initAppend() {
	var opt = {controlType:business,businessCode:pk,businessType:'TYYWLX_025'};
	$('#id_div_appendarea').commonupload(opt);
}

/** 
 * 获取附件数据
 **/
function getAppendData() {
	var appendData = null;
	if($('#id_div_appendarea').data()) {
		appendData = $('#id_div_appendarea').data().getAppendData();
	}
	return appendData;
}

