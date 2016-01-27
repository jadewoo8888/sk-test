
/** 表格对象 **/
var fspjDataGrid = null;
var smzqDataGrid = null;
/** 用于标识某个区域时候第一次打开，若第一次打开则同时初始化这个区域内的内容，并获取数据填充 **/
var initedFspjFlag = false;
var initedZcfjFlag = false;
var initedZctpFlag = false;
var initedZjxxFlag = false;
var initedSmzqFlag = false;
/**
 * 初始化方法
 **/
$(function () {
	initComFunc();
	initGetData();
	initAssetPhotoLayer();
});
/**
 * 为页面上的组件添加事件处理方法
 **/
function initComFunc() {
	$("#id_div_jbxx_title").click(jbxxTitleClick);
	$("#id_div_zcsmzq_title").click(smzqTitleClick);
	$("#id_div_kpzjxx_title").click(kpzjxxTitleClick);
	$("#id_div_fspj_title").click(fspjTitleClick);
	$("#id_div_zcfj_title").click(zcfjTitleClick);
	$("#id_div_zctp_title").click(zctpTitleClick);
 }

function initAssetPhotoLayer() { 
	top.layer.ready(function(){
		top.layer.photos({ 
			photos: $('#id_div_zctp_area')
		});
	});
}

function bindAssetPhotoClick() { 
  	$('#id_div_zctp_area img').click( 
  		function () {
  			top.layer.photos({ 
        		photos: $('#id_div_zctp_area')
    		});
  		}
    );
}
/** 
 * 初始化获取数据方法
 **/
function initGetData() {
	getAssetData();
}

/**
 * 获取资产数据
 **/
function getAssetData() {
	$("#id_div_jbxx_area").addLoading({msg:"\u52aa\u529b\u52a0\u8f7d\u6570\u636e\u4e2d\uff0c\u8bf7\u7a0d\u540e..."});
    //获取角色数据  	
	Ajax.service("AssetRegistBO", "findById", [assetRegAssetNo], getAssetDataSuccessFunc, getAssetDataFailureFunc);
}
/**
 * 获取资产数据成功处理方法
 **/
function getAssetDataSuccessFunc(result) {
	$("#id_div_jbxx_area").removeLoading();
	fillAssetData(result);
	dealDeprParamDisplay(result.dpDeprFun);
}

/**
 * 获取资产数据失败处理方法
 **/
function getAssetDataFailureFunc() {
	top.layer.alert("\u6570\u636e\u5f02\u5e38\uff01", {icon:4});
	$("#id_div_jbxx_area").removeLoading();
}
/**
 * 资产数据填充到页面元素中
 **/
function fillAssetData(assetDataObj) {
	for (var p in assetDataObj) {
		if ($("#id_" + p)) {
			if (assetDataObj[p + "Display"]) {
				if (assetDataObj[p + "Display"] != null) {
					$("#id_" + p).text(assetDataObj[p + "Display"]);
				}
			} else {
				if (assetDataObj[p] != null) {
					$("#id_" + p).text(assetDataObj[p]);
				}
			}
		}
	}
}

/**
 * 处理折旧方式不同，折旧参数字段名称的不同显示
 **/
function dealDeprParamDisplay(dpDeprFun) {
	var dpyearText = '';
	var dpSalvageText = '';
 	switch(dpDeprFun) {
		case 'DeprFun_001': dpyearText = '折旧年限';dpSalvageText = '残值率(%)';break;
		case 'DeprFun_002': dpyearText = '总工作量';dpSalvageText = '残值率(%)';break;
		case 'DeprFun_003': dpyearText = '折旧年限';dpSalvageText = '预计净残值';break;
		case 'DeprFun_004': dpyearText = '折旧年限';dpSalvageText = '预计净残值';break;
		default:dpyearText = '折旧年限';dpSalvageText = '残值率(%)';  
	}
	$('#id_td_dpyear').text(dpyearText);
	$('#id_td_dpSalvage').text(dpSalvageText);
}
/**
 * 卡片基本信息标题栏点击处理方法
 **/
function jbxxTitleClick() {
	treatTitleIcon($("#id_div_jbxx_titleIcon"));
	$("#id_div_jbxx_area").slideToggle("fast");
}
/**
 * 卡片折旧信息标题栏点击处理方法
 **/
function kpzjxxTitleClick() {
	treatTitleIcon($("#id_div_kpzjxx_titleIcon"));
	$("#id_div_kpzjxx_area").slideToggle("fast");
}
/**
 * 卡片生命周期标题栏点击处理方法
 **/
function smzqTitleClick() {
	if (initedSmzqFlag == false) {
		initedSmzqFlag = true;
		initSmzqDataGrid();
	}
	treatTitleIcon($("#id_div_zcsmzq_titleIcon"));
	$("#id_div_zcsmzq_gridarea").slideToggle("fast");
}
function treatTitleIcon(iconObj) {
	if (iconObj.hasClass("titleIcon-open")) {
		iconObj.attr("class", "titleIcon-close");
	} else {
		iconObj.attr("class", "titleIcon-open");
	}
}
/**
 * 附属信息信息标题栏点击处理方法
 **/
function fspjTitleClick() {
	if (initedFspjFlag == false) {
		initedFspjFlag = true;
		initFspjDataGrid();
	}
	treatTitleIcon($("#id_div_fspj_titleIcon"));
	$("#id_div_fspj_gridarea").slideToggle("fast");
}

/**
 * 资产附件信息标题栏点击处理方法
 **/
function zcfjTitleClick() {
	if (initedZcfjFlag == false) {
		initedZcfjFlag = true;
		initAppenFrame();
 	}
	treatTitleIcon($("#id_div_zcfj_titleIcon"));
	$("#id_div_zcfj_gridarea").slideToggle("fast");
}

/**
 * 资产图片信息标题栏点击处理方法
 **/
function zctpTitleClick() {
	if (initedZctpFlag == false) {
		initedZctpFlag = true;
		initPicArea();
  	}
	treatTitleIcon($("#id_div_zctp_titleIcon"));
	$("#id_div_zctp_area").slideToggle("fast");
}


/**
 * 设置附件区域指向
 **/
function initAppenFrame() {
	var appendFrameObj = document.getElementById("id_iframe_append");
	appendFrameObj.src = contextPath + "/core/componentmodule/upload/listAssetUpload.jsp?controltype=VIEW&assetregassetno=" + assetRegAssetNo;
}

function initPicArea() { 
	var opt = {pk:assetRegAssetNo};
	$('#id_div_zctp_area').picmanager(opt);
}

/**
 * 初始化附属配件表格
 **/ 
function initFspjDataGrid() {
	var _sortInfo = {"sortPK":"arAccessoryPK", "sortSql":"lastestUpdate Desc"};
	var _columns = [[{field:"arAccessoryName", title:"配件名称", minwidth:270, align:"center", halign:"center"}, {field:"arAccessoryAssetValue", title:"\u539f\u503c\uff08\u5143 \uff09 ", minwidth:180, align:"center", halign:"center"}, {field:"arAccessoryPurchaseDate", title:"\u8d2d\u7f6e\u65e5\u671f", minwidth:140, align:"center", halign:"center"}]];
	var _dataGridOptions = {checkbox:false, height:250, width:900, pagination:false};
	var _customOptions = {tableID:"id_table_fspjgrid ", classID:"AssetRegistAccessoryBO", columns:_columns, sortInfo:_sortInfo, customQCFunc:setFspjDatagridQc};
	fspjDataGridObj = new DataGrid(_customOptions, _dataGridOptions);
}
/** 
 * 初始化生命周期表格
 **/
function initSmzqDataGrid() {
	var _sortInfo = {"sortPK":"abipk", "sortSql":"lastestUpdate Desc"};
var _columns = [[{field:"abibusiPk", title:"\u4e1a\u52a1\u5355\u53f7", minwidth:100, align:"center", halign:"center"}, {field:"abibusiTypeDisplay", title:"\u4e1a\u52a1\u7c7b\u578b", minwidth:100, align:"center", halign:"center"}, {field:"abipk", formatter:function (value, row, index) {
		return "";
	}, title:"\u4e1a\u52a1\u8bf4\u660e", minwidth:120, align:"center", halign:"center"}, {field:"updatePerson", title:"\u7ecf\u529e\u4eba", minwidth:80, align:"center", halign:"center"}, {field:"abidate", title:"\u7ecf\u529e\u65e5\u671f", minwidth:80, align:"center", halign:"center"}]];	var _dataGridOptions = {checkbox:false, height:250, width:900, pagination:false};
	var _customOptions = {tableID:"id_table_smzqgrid", classID:"AssetBusiInfoBO", columns:_columns, sortInfo:_sortInfo, customQCFunc:setSmzqDatagridQc};
	smzqDataGrid = new DataGrid(_customOptions, _dataGridOptions);
}
/**
 * 附属信息表格自定义查询条件定义方法
 **/
function setFspjDatagridQc() {
	var qcArr = new Array();
	qcArr[0] = new Object();
	qcArr[0].fn = "arAssetregAssetno";
	qcArr[0].oper = 0;
	qcArr[0].value1 = assetRegAssetNo;
	return qcArr;
}
/**
 * 生命周期表格自定义查询条件定义方法
 **/
function setSmzqDatagridQc() {
	var qcArr = new Array();
	qcArr[0] = new Object();
	qcArr[0].fn = "abiassetPk";
	qcArr[0].oper = 0;
	qcArr[0].value1 = assetRegAssetNo;
	return qcArr;
}

