/** 打开附件列表窗口的窗口对象，以下均称呼为打开窗口 **/
var openWindow = null;
/** 修改的附件信息对象  **/
var appendObj = new Object();

/**
 * 初始化方法，程序入口
 **/
$(function () {
	initComFunc();
	initOpenWindow();
	getDetailDataInfo();
});

/**
 *当前业务类型为修改附件时，从父窗口获取选中的需修改的附件信息对象
 */
function getDetailDataInfo() {
	if (strControlType == "MODIFY") {
		appendObj = openWindow.$('#'+areaID).data().getSelectedData();
		fillData(appendObj);
	}
}

/**
 * 填充附件信息对象到页面组件中
 **/
function fillData(appendObj) {
	$("#id_appendName").val(appendObj.appendName);
	$("#id_appendRemark").val(appendObj.appendRemark);
}

/**
 * 取得打开当前窗口的窗口的对象
 **/
function initOpenWindow() {  
	openWindow = window.open("", openWindowName);
}
/**
 * 为页面上的组件添加事件处理方法
 **/
 
function initComFunc() {
	$("#id_save").click(save);
	$("#id_cancel").click(cancel);
	$("#id_filePath").bind("change", filePathChange);
 }


/** 上传进度查询id，当每次上传时，随机生成一字符串，并传递到后台，前端通过此id到后台session获取此次上传的进度 **/
var progressID = '';
/** 进度组件对象 **/
var proObj = null;
/**
 * 保存
 **/
function save() {
	changeBtnDisabled(true);
	if (!validate()) {
		changeBtnDisabled(false);
		return;
	}
	if($("#id_filePath").val()!='') {
		proObj = $('#id_body_append').addProgressLoading({msg: '正在上传文件中，请稍后...'});
		progressID = Math.random().toString();
		var uploadOrgCode = '';
		if(strControlType == STR_REGISTER_ADDNEW) {
			uploadOrgCode = top.strFilterOrgCode;
		}  else {
			uploadOrgCode = appendObj.orgCode;
		}
		var paramObj = {busitype:FILE_TYPE_COMMONAPPEND,progressid:progressID,orgcode:uploadOrgCode};
		Ajax.upload(paramObj, uploadSuccesFunc);
		queryProgress();
	} else {
		$('#id_body_append').addLoading({msg: '正在保存，请稍后...'})
		var appendRow = appendObjFactory();
		openWindow.$('#'+areaID).data().callbackfunc(appendRow);
		$('#id_body_append').removeLoading();
		cancel();
	}
}

/**
 * 文件上传成功处理方法
 **/
function uploadSuccesFunc(data) {
	if (data.status == "success") {  
		var appendRow = appendObjFactory();
		var fileDetailArr = eval(data.detail);
 		appendRow.fileID = fileDetailArr[0]; 
		appendRow.fileType = fileDetailArr[1];
		appendRow.dateFloderName = fileDetailArr[2]; 
		if(strControlType == STR_REGISTER_ADDNEW) {
			appendRow.orgCode = top.strFilterOrgCode;
		}
		openWindow.$('#'+areaID).data().callbackfunc(appendRow);
		changeBtnDisabled(false);
		$('#id_body_append').removeLoading();
		cancel();
 	} else {
 		changeBtnDisabled(false);
		$('#id_body_append').removeLoading();
        top.layer.alert(data.detail,{closeBtn :2,icon:7});
	}
}

/**
 * 查询文件上传进度
 * 
 **/
function queryProgress( ) {
    requestProgress(queryProgressSerialA);
}

/**
 * 根据进度状态处理列表页面显示，并定时再次调用后台查询上传进度方法
 * queryProgressSerialA 和 queryProgressSerialB方法相当于互相调用，确保请求成功后再发送下一个请求
 * @param uploadProgressData 上传进度数据
 **/
function queryProgressSerialA(uploadProgressData) {
   updateProgress(uploadProgressData);
    setTimeout(function() {
    	requestProgress(queryProgressSerialB);
    },
    2000);
}
function queryProgressSerialB(uploadProgressData) {  
   	updateProgress(uploadProgressData);
    setTimeout(function() {
      requestProgress(queryProgressSerialA);
    },
    2000);
}

/**
 * 向后台查询上传进度的方法
 * @param successFunc 成功回调函数
 **/
function requestProgress(successFunc) {
	Ajax.service("UpLoadService", "getUpLoadProgressByProgressID", [progressID],
        function(data) {
            successFunc(data);
        }
    );
}


/**
 * 更新页面上传进度条显示 
 **/
function updateProgress(uploadProgressData) {
	if(uploadProgressData!=undefined&&uploadProgressData!=''&&uploadProgressData!='0') {
		proObj.update(uploadProgressData+'');
	}
}


function appendObjFactory() {
	appendObj.appendName = $("#id_appendName").val();
	appendObj.appendRemark = $("#id_appendRemark").val();
	if(strControlType == STR_REGISTER_ADDNEW) { 
		appendObj.rowStatus = INT_ROW_STATUS_INSERT;
 		appendObj.businessCode = strBusinessCode;
		appendObj.businessType = strBusiType;
	} else if(strControlType=='MODIFY') {
		if(appendObj.rowStatus==INT_ROW_STATUS_UNCHAG) {
			appendObj.rowStatus = INT_ROW_STATUS_UPDATE;
		}
	}
	return appendObj;
}

/**
 * 关闭当前窗口
 **/
function cancel() {
	var parentIndex = top.layer.getFrameIndex(window.name); 
	top.layer.close(parentIndex);
}

function validate() {
	var validateFlag = false;
	/**修改时，由于<input type='file'的输入框无法通过js赋值，有可能用户只是修改附件名称或备注，故这个不需校验必填 **/
	if (strControlType == "MODIFY") {
		if ($("#id_td_appendName").form("validate")) {
			validateFlag = true;
		}
	} else {
		if ($("#id_td_appendName").form("validate")&&$("#id_fileForm").form("validate")) {
			validateFlag = true;
		}
	}
	return validateFlag;
}
/**
 * 文件路径地址更改处理方法
 **/
function filePathChange() {
	var filePath = $("#id_filePath").val();
	if (filePath) {
		$("#id_appendName").val(filePath.substring(filePath.lastIndexOf("\\") + 1, filePath.lastIndexOf(".")));
	}
}

