//页面主表信息对象 
var clientObj = new Object();
/** 用于标识某个区域时候第一次打开，若第一次打开则同时初始化这个区域内的内容，并获取数据填充 **/
var initedAppendAreaFlag = false;
/**
 * 初始化入口
 **/
$(function () {
	initComBindFunc();
	initData();
});
 
/**
 * 页面组件绑定事件处理方法
 **/
function initComBindFunc() {
	$("#tabs").tabs({onSelect:tabSelect});
}

/**
 * 设置附件
 **/
function setAppenFrame() {
	var appendFrameObj = document.getElementById("id_iframe_append");
	appendFrameObj.src = contextPath + "/core/componentmodule/upload/listCommonUpload.jsp?busitype=TYYWLX_010&controltype=" + strBusiType + "&businesscode=" + pk;
}
/**
 * 初始化页面数据
 **/
function initData() {
	getClientInfoData();
}
/**
 * 获取主表信息
 **/
function getClientInfoData() {
	$("body").addLoading({msg:"\u83b7\u53d6\u6570\u636e\u4e2d\uff0c\u8bf7\u7a0d\u540e..."});
	Ajax.service("ClientBO", "findById", [pk], getClientInfoDataSuccFunc, getClientInfoDataFailureFunc);
}
/**
 * 获取参数信息成功回调函数
 **/
function getClientInfoDataSuccFunc(data) {
	clientObj = data;
	fillClientInfo();
	$("body").removeLoading();
}
/**
 * 获取信息失败回调函数
 **/
function getClientInfoDataFailureFunc() {
	$("body").removeLoading();
	top.layer.alert("\u83b7\u53d6\u5904\u7f6e\u5355\u57fa\u672c\u4fe1\u606f\u51fa\u73b0\u9519\u8bef\uff0c\u8bf7\u8054\u7cfb\u7ba1\u7406\u5458 ", {icon:5, closeBtn:2});
}
/**
 * 填充参数数据到页面中
 **/
function fillClientInfo() {
	$("#id_unitArea").val(formatMoney(clientObj.unitArea));
  	$("#id_hlcSecondEnprName").val(clientObj.hlcSecondEnprName);
	$("#id_linker").val(clientObj.linker);
	$("#id_hlcSecondtTel").val(clientObj.hlcSecondtTel);
	$("#id_unitAdress").val(clientObj.unitAdress);
	$("#id_ifCollection").val( clientObj.ifCollection);
	$("#id_ifHealthFee").val(clientObj.ifHealthFee);
	$("#id_unitAdress").val(clientObj.unitAdress);
	$("#id_lister").val(clientObj.lister);
	$("#id_listDate").val(clientObj.listDate);
	$("#id_remark").val(clientObj.remark);
}
 
/**
 * 标签切换处理
 **/
function tabSelect(title, index) {
	if (index == 0) {
	} else {
		if (index == 1) {
			if (!initedAppendAreaFlag) {
				initedAppendAreaFlag = true;
				setAppenFrame();
			}
		}
	}
}
