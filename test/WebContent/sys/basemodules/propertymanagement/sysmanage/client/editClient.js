//页面主表信息对象 
var clientObj = new Object();
/** 用于标识某个区域时候第一次打开，若第一次打开则同时初始化这个区域内的内容，并获取数据填充 **/
var initedAppendAreaFlag = false;
/**
 * 初始化入口
 **/
$(function () {
	initComBindFunc();
	initComDisplay();
	setDefaultValue();
	initData();
	limitInput();
});
/**
 * 初始化设置页面组件的显示
 **/
function initComDisplay() {
	$(".combo input").removeClass("validatebox-invalid");
	$(".easyui-numberbox").removeAttr("required");
	
	if (strBusiType == STR_REGISTER_ADDNEW) {
		$('#id_div_desc .head-title').html('新增客户信息');
	} else if(strBusiType == STR_REGISTER_MODIFY) {
		$('#id_div_desc .head-title').html('修改客户信息');
	}
}
/**
 * 设置附件
 **/
function setAppenFrame() {
	var appendFrameObj = document.getElementById("id_iframe_append");
	appendFrameObj.src = contextPath + "/core/componentmodule/upload/listCommonUpload.jsp?busitype=TYYWLX_010&controltype=" + strBusiType + "&businesscode=" + pk;
}
/**
 * 输入限制
 **/
function limitInput() {
	$('#id_hlcSecondEnprName').searchbox('textbox').validatebox({required:true,validType:'length[1,120]', invalidMessage:"不能超过120个字符！",missingMessage:"\u627f\u79df\u4eba\u4e0d\u80fd\u4e3a\u7a7a"});
}
/**
 * 设置默认值
 **/
function setDefaultValue() {
	if (strBusiType == STR_REGISTER_ADDNEW) {
		$("#id_lister").val(top.strUserName);
		$("#id_listDate").datebox("setValue", serverDate);
	}
}
/**
 * 页面组件绑定事件处理方法
 **/
function initComBindFunc() {
	$("#id_btn_save").click(save);
	$("#id_btn_return").click(returnUpperLevel);
	$("#tabs").tabs({onSelect:tabSelect});
	$("#id_hlcSecondEnprName").searchbox({searcher:contractSearch});
}
/**
 * 初始化页面数据
 **/
function initData() {
	if (strBusiType != STR_REGISTER_ADDNEW) {
		getClientInfoData();
	}
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
 	$("#id_unitArea").numberbox('setValue',row.unitArea);
 	$("#id_hlcSecondEnprName").searchbox('setValue',clientObj.hlcSecondEnprName);
	$("#id_linker").val(clientObj.linker);
	$("#id_hlcSecondtTel").val(clientObj.hlcSecondtTel);
	$("#id_unitAdress").val(clientObj.unitAdress);
	$("#id_ifCollection").combobox("select", clientObj.ifCollection);
	$("#id_ifHealthFee").combobox("select", clientObj.ifHealthFee);
	$("#id_unitAdress").val(clientObj.unitAdress);
	$("#id_lister").val(clientObj.lister);
	$("#id_listDate").datebox("setValue", clientObj.listDate);
	$("#id_remark").val(clientObj.remark);
}
/**
 * 保存
 **/
function save() { 
	changeBtnDisabled(true);
	$("body").addLoading({msg:"\u68c0\u67e5\u6570\u636e\u4e2d\uff0c\u8bf7\u7a0d\u540e..."});
	if (!checkBeforeSave()) {
		changeBtnDisabled(false);
		$("body").removeLoading();
		return;
	}
	$("body").removeLoading();
	top.layer.open({title:"\u4fdd\u5b58", icon:3, area:["330px", "160px"], btn:["\u786e\u5b9a", "\u53d6\u6d88"], content:"\u786e\u5b9a\u4fdd\u5b58\u5f53\u524d\u5ba2\u6237\u6570\u636e\u5417\uff1f", shift:1, closeBtn:2, yes:function (index) {
		top.layer.close(index);
		saveService();
	}, cancel:function (index) {
		top.layer.close(index);
		changeBtnDisabled(false);
		$("body").removeLoading();
	}});
}
/**
 * 保存发送保存请求
 **/
function saveService() {
	$("body").removeLoading();
	$("body").addLoading({msg:"\u6b63\u5728\u4fdd\u5b58\u6570\u636e\uff0c\u8bf7\u8010\u5fc3\u7b49\u5019..."});
	dataPackage();
	var methoID = '';
	if (strBusiType == STR_REGISTER_ADDNEW) {
		methoID = 'addNewClient';
	} else if(strBusiType == STR_REGISTER_MODIFY) {
		methoID = 'modifyClient';
	}
	
	var appendPackage = getAppendData();
	Ajax.service("ClientBO", methoID, [clientObj, appendPackage], saveServiceSuccessFunc, saveServiceFailureFunc);
}
/**
 * 保存发送保存请求成功回调函数
 **/
function saveServiceSuccessFunc(data) {
	changeBtnDisabled(false);
	$("body").removeLoading();
	if(data!="null"&&data.length>0){
		top.layer.alert(data,{closeBtn :2,icon:5});
		changeBtnDisabled(false);
	}else{	    				
		top.layer.open({title:"\u63d0\u793a", icon:6, area:["280px", "150px"], content:'客户数据保存成功', shift:1, closeBtn:2, yes:function (index) {
			top.contentframe.$("#id_table_grid").datagrid("reload");
			top.layer.close(index);
			returnUpperLevel();
		}, cancel:function (index) {
			top.contentframe.$("#id_table_grid").datagrid("reload");
			top.layer.close(index);
			returnUpperLevel();
		}});
	}	
}
/**
 * 保存发送保存请求失败回调函数
 **/
function saveServiceFailureFunc() {
	changeBtnDisabled(false);
	$("body").removeLoading();
	top.layer.alert("保存出现错误，请联系管理员 ", {icon:5, closeBtn:2});
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
function contractSearch() {
	top.layer.open({type:2, title:"合同选择", shift:1, closeBtn:2, area:["1000px", "600px"], content:contextPath + "/sys/basemodules/propertymanagement/sysmanage/client/listContractSelect.jsp?busitype=" + strBusiType + "&openwindowname=" + window.name});
}

/**
 * 合同选择回调方法
 **/
function updateContractSelectedData(rows) {
	var row = rows[0];
	$("#id_hlcSecondEnprName").searchbox('setValue',row.hlcSecondEnprName);
	$("#id_linker").val('');
	if(row.hlcSecondtname) {
		$("#id_linker").val(row.hlcSecondtname);
	}
	$("#id_hlcSecondtTel").val(''); 
	if(row.hlcSecondtTel) {
		$("#id_hlcSecondtTel").val(row.hlcSecondtTel); 
	}
	$("#id_unitAdress").val('');
	if(row.unitAdress) {
		$("#id_unitAdress").val(row.unitAdress);
	}
	$("#id_unitArea").numberbox('setValue','');
	if(row.unitArea) {
		$("#id_unitArea").numberbox('setValue',row.unitArea);
	}
	
	clientObj.hlcCode = row.hlcCode;
	clientObj.hlcBarCode = row.hlcBarCode;
	clientObj.hlcFirstEnprName = row.hlcFirstEnprName;
	clientObj.orgSysCode = row.hlcFirstEnprCode;
	clientObj.unitSysCode = row.unitSysCode;
	clientObj.unitName = row.unitName;
	clientObj.unitAdress = row.unitAdress;
	clientObj.hlcSecondtTel = row.hlcSecondtTel;
	clientObj.unitArea = row.unitArea;
	clientObj.unitPurpose = row.unitPurpose;
	
	clientObj.hlcRegStartDate = row.hlcRegStartDate;
	clientObj.hlcRegEndDate = row.hlcRegEndDate;
}

/**
 * 数据封装，从页面中获取数据
 **/
function dataPackage() {
	//当没有单位编码，即承租人是手动填写，并非通过合同选择
	if(!clientObj.orgSysCode) {
		clientObj.orgSysCode = top.strFilterOrgCode;
		clientObj.hlcFirstEnprName = top.strFilterOrgCodeDisplay;
	}
	
	clientObj.hlcSecondEnprName =$("#id_hlcSecondEnprName").searchbox('getValue');
	clientObj.linker = $("#id_linker").val();
	clientObj.hlcSecondtTel = $("#id_hlcSecondtTel").val();
	clientObj.unitAdress = $("#id_unitAdress").val();
	clientObj.ifCollection = $("#id_ifCollection").combobox("getValue");
	clientObj.ifHealthFee = $("#id_ifHealthFee").combobox("getValue");
	clientObj.lister = $("#id_lister").val();
	clientObj.listDate = $("#id_listDate").datebox("getValue");
	clientObj.remark = $("#id_remark").val();
}
/** 
 * 获取附件数据
 **/
function getAppendData() {
	var appendData = null;
	var appendFrameObj = document.getElementById("id_iframe_append").contentWindow;
	/** 这个判断是因为现在按标签初始化，若标签没有被点击，附件控件未被初始化 **/
	if (appendFrameObj.getAppendData) {
		appendData = appendFrameObj.getAppendData();
	}
	return appendData;
}
/**
 * 保存前数据检查
 * @return true:检查通过 false：检查不通过
 **/
function checkBeforeSave() {
	var checkFlag = true;
	if (!$("#id_form").form("validate")) {
		checkFlag = false;
	}
	return checkFlag;
}
/**
 * 返回上一级页面
 **/
function returnUpperLevel() {
	history.go(-1);
}

