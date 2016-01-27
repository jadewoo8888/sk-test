
var dataGrid = null;//资产选择表格
var previewDataGrid = null//预览资产的表格
var openWindow = null; //打开资产选择窗口的窗口对象，以下均称呼为打开窗口
var columns = null;
/**
 * 初始化方法
 **/
$(function () {
	initOpenWindow();
	initComDisplay();
	initComDisplayByBusitype();
	initComTipsByBusitype();
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
	if (strSelectType == "mul") {
		$("#id_div_preview").css("display", "block");
	} else {
		$("#id_div_addselectedhr").css("display", "none");
		$("#id_btn_addselected").css("display", "none");
	}
}
/**
 * 根据业务类型，设置页面上的组件显示
 **/
function initComDisplayByBusitype() {
	if (strBusiType == "assetbatchupdate") {
		$($("#id_div_basequery .combo")[0]).hide();
	} else if (strBusiType == "depreciation") {
		$("#id_btn_selectall").show();
	} 
	//设置土地类类下拉不显示
	else if(strBusiType == "assetwriteoff") {
	}
}

function initComTipsByBusitype() {
	$("#id_btn_addselected").bind('mouseover',function() {layer.tips("将待选资产列表的选中数据添加到已选资产列表中","#id_btn_addselected", {time:3000});});
	$("#id_btn_selectall").bind('mouseover',function() {layer.tips("按当前查询条件，选中此条件下的所有数据返回","#id_btn_selectall", {time:4000});});
}
/**
 * 初始
 **/
var _sortInfo = {"sortPK":"assetRegAssetNo", "sortSql":"lastestUpdate Desc"};
function initDataGrid() {
	initSelectDataGrid();
	if (strSelectType == "mul") {
		initPreViewDataGrid();
	}
}

/**
 * 初始化资产选择区域表格
 **/
var assetColumns = [[{field:"assetRegDeptCodeDisplay", title:"\u6240\u5c5e\u90e8\u95e8", halign:"center", align:"left", minwidth:200}, {field:"assetRegBarCode", title:"\u5361\u7247\u7f16\u53f7", halign:"center", align:"left", minwidth:200},{field:"assetRegAssetName", title:"\u8d44\u4ea7\u540d\u79f0", halign:"center", align:"left", minwidth:220},{field:"assetRegAssetTypeDisplay", title:"\u8d44\u4ea7\u5206\u7c7b\u4ee3\u7801", halign:"center", align:"left", minwidth:180}, {field:"assetRegIntrinsicCurValue", fmType:"money", title:"\u539f\u503c", halign:"center", align:"right", minwidth:130}, {field:"assetRegObtainDate", title:"\u53d6\u5f97\u65e5\u671f", halign:"center", align:"left", minwidth:100}, {field:"assetRegSpecification", title:"\u89c4\u683c\u578b\u53f7", halign:"center", align:"left", minwidth:100}]];
function initSelectDataGrid() {
	/** 设置datagrid排序及字段显示 **/
	var _columns = new Array();
	_columns = _columns.concat(assetColumns);
	/** 调用打开窗口的方法，获取默认选中的资产数据 **/
	var selectedAssetData = null;
	/** 根据多选单选设置datagrid的显示 **/
	var dataGridOptions = null;
	if (strSelectType == "mul") {
		dataGridOptions = {onDblClickRow:rowDbClick, checkbox:true, height:350, onLoadSuccess:dataGridOnLoadSuccess};
	} else {
		dataGridOptions = {onDblClickRow:rowDbClick, checkbox:false, height:410};
	}
	var customOptions = {customQCFunc:setCustomQueryCondition, selectedRowData:selectedAssetData, tableID:"id_table_grid", classID:"AssetRegistBO",methodID:"getListForPageForAssetSelect", columns:_columns, sortInfo:_sortInfo};
	dataGrid = new DataGrid(customOptions, dataGridOptions);
}

/**
 * 初始化资产预览区域表格 
 **/
function initPreViewDataGrid() {
	/** 设置datagrid排序及字段显示 **/
	var _columns = new Array();
	_columns = _columns.concat(assetColumns);
	/** 初始化预览表格 **/
	var prewDataGridOptions = {onDblClickRow:rowDbClick, pagination:false, isQuery:false, checkbox:true, height:350};
	var previewCustomOptions = {tableID:"id_table_previewgrid", classID:null, columns:_columns, sortInfo:_sortInfo};
	previewDataGrid = new DataGrid(previewCustomOptions, prewDataGridOptions);
	//queryPreViewData();
}
/**
 * 向后台获取资产预览区域的资产数据
 **/
function queryPreViewData() {
	var _qcInfo = new Array();
	var qcObj = getDefaultAssetQueryObj();
	if (qcObj) {
		qcObj.oper = ARY_STR_INCLUDE[0];
		_qcInfo.push(qcObj);
		Ajax.service("AssetRegistBO", "getListForPage", [1, 1000000, _qcInfo, _sortInfo], function (data) {
			previewDataGrid.dataGridObj.datagrid("loadData", data);
		});
	}
}
/**
 * 取得默认资产，拼接in查询字符串
 **/
function getDefaultAssetQueryObj() {
	var qcObj = null;
	if (openWindow.getAssetSelectedData != undefined) {
		var data = openWindow.getAssetSelectedData();
		if (data == undefined || data == null || data.length == 0) {
			return;
		}
		var sqlStr = "";
		var dataLen = data.length;
		for (var i = 0; i < dataLen; i++) {
			sqlStr += "," + data[i];
		}
		if (sqlStr.length > 0) {
			sqlStr = sqlStr.substring(1);
		}
		qcObj = new Object();
		qcObj.fn = "assetRegAssetNo";
		qcObj.value1 = sqlStr;
	}
	return qcObj;
}
/**
 * 根据业务类型，设置实际的查询条件
 * 其中需注意：有关资产业务状态(status)和入账状态(assetregcheckflag)的判断交由了后台代码控制
 **/
function setCustomQueryCondition() {
	var customQCArr = new Array();
	if (strSelectType == "mul") {
		/**添加查询条件，过滤默认资产数据 **/
		var defaultQCObj = getDefaultAssetQueryObj();
		if (defaultQCObj) {
			defaultQCObj.oper = ARY_STR_NOTINCLUDE[0];
			customQCArr.push(defaultQCObj);
		}
		/** 添加查询条件，过滤预览区域的资产数据 **/
		if (previewDataGrid != null) {
			var rows = previewDataGrid.dataGridObj.datagrid("getData").rows;
			if (rows != null && rows.length > 0) {
				var notInSql = mosaicInSql(rows);
				//单位条件
				var notInAssetQc = new Object();
				notInAssetQc.fn = "assetRegAssetNo";
				notInAssetQc.oper = ARY_STR_NOTINCLUDE[0];
				notInAssetQc.value1 = notInSql;
				customQCArr.push(notInAssetQc);
			}
		}
	}
	/** 添加页面自定义的查询条件 **/
	setAssetComponentQC(customQCArr);
	/** 传递当前业务类型到后台，后台查询时需特殊处理下，去掉此条件 **/
	var specialDealQC = new Object();
	specialDealQC.fn = "busitypespecialdeal";
	specialDealQC.oper = ARY_STR_LIKE[0];
	specialDealQC.value1 = strBusiType;
	customQCArr.push(specialDealQC);
	/** 添加单位过滤条件  **/
	var orgQC = new Object();
	orgQC.fn = "AssetRegEnprCode";
	orgQC.oper = ARY_STR_LIKE[0];
	orgQC.value1 = top.strFilterOrgCode + "%";
	customQCArr.push(orgQC);
	
	return customQCArr;
}
/**
 *  添加页面自定义的查询条件
 */
function setAssetComponentQC(customQCArr) {
	if (openWindow.setAssetSelectQC != undefined) {
		var _SelectAssetQCAttr = openWindow.setAssetSelectQC();
		if (_SelectAssetQCAttr != null) {
			for (var i in _SelectAssetQCAttr) {
				customQCArr.push(_SelectAssetQCAttr[i]);
			}
		}
	} else {
		return;
	}
}
/**
 * 为页面上的组件添加事件处理方法
 **/
function initComFunc() {
	//查询按钮处理事件
	$("#id_btn_query").click(function () {
		dataGrid.query();
	});
	$("#id_btn_addselected").click(addSelectedData);
	$("#id_btn_selectall").click(selectedAllData);
	$("#id_div_title").click(datagridTitleClick);
	$("#id_div_previewtitle").click(predatagridTitleClick);
	$("#id_btn_deletepvselected").click(deletePVSelected);
	$("#id_btn_sure").click(sure);
	$("#id_btn_cancel").click(cancel);
	
	initSearchBox();								//选择资产分类树
//	$("#selectType").click(selectAssetType);
}
/**
 * 确定处理方法
 **/
function sure() {
	var data = null;
	if (strSelectType == "mul") {
		data = previewDataGrid.dataGridObj.datagrid("getData").rows;
	} else {
		data = dataGrid.getSelectedData();
	}
	if (data.length > 0) {
		callUpdateAssetSelectedData(data);
	} else {
		top.layer.open({title:"\u63d0\u793a", area:["250px", "150px"], icon:7, closeBtn:2, content:"\u6ca1\u6709\u9009\u4e2d\u4efb\u4f55\u8d44\u4ea7\u6570\u636e", shift:6});
	}
}
/**
 * 取消按钮点击处理方法
 **/
function cancel() {
	/** 先检查有没有选中资产，有则提示没有则直接关闭 **/
	var length = 0;
	if (strSelectType == "mul") {
		var data = previewDataGrid.dataGridObj.datagrid("getData");
		length = data.rows.length;
	} else {
		var selectedData = dataGrid.getSelectedData();
		length = selectedData.length;
	}
	if (length > 0) {
		top.layer.open({title:"\u63d0\u793a", icon:3, area:["300px", "160px"], btn:["\u786e\u5b9a", "\u53d6\u6d88"], shift:1, closeBtn:2, content:"\u5df2\u9009\u4e2d\u8d44\u4ea7\u6570\u636e\uff0c\u786e\u5b9a\u5173\u95ed\u7a97\u53e3?", yes:function (index) {
	    //一般设定yes回调，必须进行手工关闭
			top.layer.close(index);
			closeWindow();
		}});
	} else {
		closeWindow();
	}
}
/**
 * 关闭资产选择控件窗口
 **/
function closeWindow() {
	var parentIndex = top.layer.getFrameIndex(window.name);
	top.layer.close(parentIndex);
}
/**
 * 添加选中资产按钮处理方法，当单选时调用打开窗口的接收方法，当多选时，将数据更新到预览表格
 **/
function addSelectedData() {
	var selectedData = dataGrid.getSelectedData();
	if (selectedData == null || selectedData.length == 0) {
		return;
	}
	/** 将添加按钮设为不可编辑 **/
	$("#id_btn_addselected").attr("disabled", true);
	if (strSelectType == "mul") {
		var data = previewDataGrid.dataGridObj.datagrid("getData");
		data.rows = data.rows.concat(selectedData);
		data.total = data.rows.length;
		previewDataGrid.setRowNum(data.rows);
		previewDataGrid.dataGridObj.datagrid("loadData", data);
		/**将数据放到预览区域后再重新查询数据 **/
		dataGrid.query();
	}
}
/**
 * 选择全部资产，返回当前页面的查询条件
 **/
function selectedAllData() {
	var qcInfo = dataGrid.getQueryCondition();
	callUpdateQCData(qcInfo);
}

function datagridTitleClick(){
	 $("#id_div_grid").slideToggle("fast");
	 treatTitleIcon($("#id_i_titleIcon"));
}

function predatagridTitleClick(){
	 $("#id_div_previewgrid").slideToggle("fast");
	 treatTitleIcon($("#id_i_previewtitleIcon"));
}

/**
 * 选择资产分类代码
 **/
function initSearchBox(){
	//资产分类代码搜索  
	$('#assetRegAssetType').searchbox({ 
		prompt:'资产分类代码',
		searcher:function(value,name){ 
				//选择资产分类树
		   		var treeValue = $('#assetRegAssetType').attr('treevalue');  
		 		var treeOption = {selType:'sgl',defaultSelecteds:treeValue,callBackFunction:acTreeCallBack};
			  	top.acTree(treeOption);
		}
	});
	//禁止输入
	$('#assetRegAssetType').searchbox('textbox').attr('readonly',true);//禁用输入
	//资产分类树回调
	function acTreeCallBack(code,codeAndName){
		$('#assetRegAssetType').searchbox('setValue',codeAndName);
		$('#assetRegAssetType').attr('treevalue',code);
	}
}
/**
 * 删除预览grid选中的数据
 **/
function deletePVSelected() {
	var selectedRowData = previewDataGrid.getSelectedData();
	if (selectedRowData == null || selectedRowData.length == 0) {
		return;
	}
	var rows = previewDataGrid.dataGridObj.datagrid("getData").rows;
	/** 复制最初始的表格行数据和选中数据 **/
	var originRows = new Array();
	originRows = originRows.concat(rows);
	var originselectedRowData = new Array();
	originselectedRowData = originselectedRowData.concat(selectedRowData);
	/** 遍历在预览表格中删除选中的资产数据 **/
	var rowsLen = originRows.length;
	var selectedRowDataLen = originselectedRowData.length;
	for (var i = 0; i < selectedRowDataLen; i++) {
		for (var j = 0; j < rowsLen; j++) {
			if (originRows[j][previewDataGrid.customOptions.sortInfo.sortPK] == originselectedRowData[i][previewDataGrid.customOptions.sortInfo.sortPK]) {
				var index = previewDataGrid.dataGridObj.datagrid("getRowIndex", originRows[j][previewDataGrid.customOptions.sortInfo.sortPK]);
				previewDataGrid.dataGridObj.datagrid("deleteRow", index);
			}
		}
	}
	/** 重新计算预览区域的数据的行号 **/
	var data = previewDataGrid.dataGridObj.datagrid("getData");
	previewDataGrid.setRowNum(data.rows);
	previewDataGrid.dataGridObj.datagrid("loadData", data);
	/**将数据放到预览区域后再重新查询数据 **/
	dataGrid.query();
}
/**
 * 单选时，列表行双击处理方法
 **/
function sglDbClick() {
	var selectedData = dataGrid.getSelectedData();
	callUpdateAssetSelectedData(selectedData);
}
function rowDbClick(index, row) {
	viewAsset(row.assetRegAssetNo, row.assetRegAssetType);
}
function callUpdateAssetSelectedData(selectedData) {
	if (openWindow.updateAssetSelectedData != undefined) {
		openWindow.updateAssetSelectedData(selectedData);
		closeWindow();
	} else {
		top.layer.alert("\u8bf7\u5728\u8c03\u7528\u7a97\u53e3Jsp\u5185\u5b9a\u4e49\u7ed3\u675f\u9009\u4e2d\u8d44\u4ea7\u6570\u636e\u7684\u65b9\u6cd5\uff1aupdateAssetSelectedData(data)", {closeBtn:2, icon:7});
	}
}
function callUpdateQCData(qcData) {
	if (openWindow.updateQCData != undefined) {
		openWindow.updateQCData(qcData);
		closeWindow();
	} else {
		top.layer.alert("\u8bf7\u5728\u8c03\u7528\u7a97\u53e3Jsp\u5185\u5b9a\u4e49\u7ed3\u675f\u9009\u4e2d\u8d44\u4ea7\u6570\u636e\u7684\u65b9\u6cd5\uff1aupdateQCData(data)", {closeBtn:2, icon:7});
	}
}
/**
 * 资产选择datagrid数据加载成功后的处理方法
 **/
function dataGridOnLoadSuccess(data) {
	/** 将添加按钮设为可编辑 **/
	$("#id_btn_addselected").attr("disabled", false);
}
/**
 * 将一些资产数据的pk拼接为以‘,’分割的字符串
 * @return  aaa,bbb,ccc
 **/
function mosaicInSql(assetArr) {
	var return_inSqlStr = "";
	if (assetArr == null || assetArr.length == 0) {
		return return_inSqlStr;
	}
	var assetArrLength = assetArr.length;
	for (var i = 0; i < assetArrLength; i++) {
		return_inSqlStr += "," + assetArr[i].assetRegAssetNo;
	}
	if (return_inSqlStr.length > 0) {
		return_inSqlStr = return_inSqlStr.substring(1);
	}
	return return_inSqlStr;
}


function treatTitleIcon(iconObj){
 	if(iconObj.hasClass("titleIcon-open")){
 		iconObj.attr("class", "titleIcon-close");
 	}else{
 		iconObj.attr("class", "titleIcon-open");
 	}
 }
