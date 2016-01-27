var winHeight = 0; //窗口高度
var frameDomJqObj = null;//mainfram.jsp中的iframe的document的jq对象
var contentframe = null;//普通功能页commonpage.jsp或（领导页个人页面中）中的内容ifram对象

/**
 * 方法入口 
 **/
$(function () {
	initParameter();
	initLayer();
  	//初始设置用户默认显示的界面page 
	initFramePage();
  	//初始化页面组件的事件处理
	initComFunc();
});
/**
 * 初始化页面需要的一些参数数据
 **/
function initParameter() {
 	//高度自适应
	if (window.innerHeight) {
		winHeight = window.innerHeight;
	} else {
		winHeight = document.documentElement.clientHeight;
	}
}

/**
 * 设置layer插件的扩展插件加载，样式等
 **/
function initLayer() {
	layer.config({
    	extend: 'extend/layer.ext.js'
	}); 
}

/**
 * 浏览器窗口大小改变的处理方法
 **/
function resize() {
	initParameter();
	$("#id_div_iframe").height(winHeight);
}/*
function resize(){
	topHeight = top.innerHeight;
    $('#id_div_iframe', parent.document).height(topHeight);
	
}*/
/**
 * 初始化用户默认的iframe界面页面
 **/
function initFramePage() {
	top.$("#id_div_iframe").addLoading({msg:"\u9875\u9762\u52a0\u8f7d\u4e2d\uff0c\u8bf7\u7a0d\u540e...", successcallback:function () {
		$("#id_iframe").attr("src", (contextPath + "/" + pageUrl));
	}});
}
/**
 * 初始化页面组件的各种事件处理方法
 **/
function initComFunc() {
}
/**
 * 所在单位及用户的显示
 **/
function initDisplay() {
	if(!frameDomJqObj) {
		return;
	}
	frameDomJqObj.find("#id_username").text(strUserName);
	frameDomJqObj.find("#id_curorgname").text(strFilterOrgCodeDisplay);
	//没有关联用户则不显示 切换用户，todo:用户表删除了关联账号字段了	
	frameDomJqObj.find("#id_changeuser").css("display", "none"); 
  	//使用单位不显示 切换单位
	if (strOrgIsCollect == "YesNo_002") {
		frameDomJqObj.find("#id_changeorg").css("display", "none");
	}
}
/**
 * 切换单位 
 **/
var oldFilterOrgCode = ""; //方便当切换单位后，还是原单位时不刷新页面
function changeOrg() {
	oldFilterOrgCode = strFilterOrgCode;
	var treeOption = {rootCode:strUserOrgCode, selType:"sgl", callBackFunction:changeOrgCallBack, defaultSelecteds:strFilterOrgCode};
	top.orgTree(treeOption);
}
/**
 * 修改密码
 **/
function changePassword() {
	top.layer.open({type:2, title:"\u4fee\u6539\u5bc6\u7801", shift:1, shadeClose:true, closeBtn:2, area:["400px", "300px"], content:"changepassword.jsp"});
}

/**
 * 我的下载
 **/
function mydownload() {
	downPageLayerIndex = top.layer.open({type:2, title:"\u6211\u7684\u4e0b\u8f7d", shift:1, closeBtn:2, area:["790px", "545px"], shadeClose:true, content:"mydownload.jsp"});
}
 
function downloadTip(tip) {
	layer.tips(tip, frameDomJqObj.find("#id_mydownload"), {tips:[4, "#56d6cf"], time:3000});
}
/**
 *切换单位回调函数
 **/
function changeOrgCallBack(value, displayValue, selectObjArr) {
	strFilterOrgCode = value;
	strFilterOrgCodeDisplay = displayValue;
	strFilterOrgIsCollect = selectObjArr[0].orgIsCollect;
	strFilterOrgProperty = selectObjArr[0].orgProperty;
	frameDomJqObj.find("#id_curorgname").text(displayValue);
	reloadCurPage();
}
/**
 * 切换单位后刷新当前页面
 * todo:主页等是否需要处理
 **/
function reloadCurPage() {
	var pageInfoArr = analysisNeddReloadPage();
	if (oldFilterOrgCode != strFilterOrgCode) {
		pageInfoArr[1].addLoading({msg:"\u9875\u9762\u52a0\u8f7d\u4e2d\uff0c\u8bf7\u7a0d\u540e...", successcallback:function () {
			var curWindow = window.open("", pageInfoArr[0]);
			curWindow.location.reload();
			pageInfoArr[1].removeLoading();
		}});
	}
}
/**
 * 普通页面切换单位树后重新加载的是iframe里面的iframe
 * 领导页和个人也只需重新加载mainframe中的iframe
 * 这里根据pageUrl判断需要重新加载的iframe名称和加载区域的jq对象
 **/
function analysisNeddReloadPage() {
	var pageInfoArr = new Array();
	pageInfoArr.push("name_mainiframe");
	pageInfoArr.push(frameDomJqObj.find("#id_div_mainiframe"));
	return pageInfoArr;
}
var needQueryExportStatusPKArr = new Array();
/**
 * 根据用户账号和我的下载最后打开时间获取数据
 * 返回的数据为数组 [0]未查看的任务数 [1]需要查询进度的任务pk数组
 **/
function getExportInfo() {
	var lastViewTime = $.cookie(downloadCookieName);
	if (lastViewTime == undefined) {
		lastViewTime = "";
	}
	Ajax.service("ExportTaskBO", "getExportInfo", [strUserAccount, lastViewTime], function (result) {
		getExportInfoSuccessFunc(result);
	});
}
/**
 * 根据返回的导出任务信息设置提示，并触发下一步查询
 * @param 数组 参考getExportInfo的描述
 **/
function getExportInfoSuccessFunc(result) {
	queryExportStatus(result[1]);
	if (result[0] > 0) { 
		downloadTip(result[0] + "\u4e2a\u6210\u529f\u5bfc\u51fa\u4efb\u52a1\u672a\u67e5\u770b");
		frameDomJqObj.find("#exportsuccess_count").css("display", "inline");
		frameDomJqObj.find("#exportsuccess_count").text(result[0]);
	} else {
		hiddeExportSuccessCount();
	}
}
/**
 * 隐藏导出成功小圆标，并重置成功数为0
 **/
function hiddeExportSuccessCount() {
	frameDomJqObj.find("#exportsuccess_count").text("0");
	frameDomJqObj.find("#exportsuccess_count").css("display", "none");
}
/**
 * 将传递的数据添加到需查询任务数组中，并调用查询方法
 * @param 新增的需查询的数据，当为string时（为pk），当为数组时（pk数组）
 **/
function queryExportStatus(data) {
	if (data != null) {
		if (typeof (data) == "string") {
			needQueryExportStatusPKArr.push(data);
		} else {
			if (data.length > 0) {
				needQueryExportStatusPKArr = needQueryExportStatusPKArr.concat(data);
			}
		}
	}
	requestExportStatus(queryExportStatusA);
}
/**
 *queryExportStatusA 和 queryExportStatusB 方法参考mydownload.js中的对应方法
 **/
function queryExportStatusA(data) {
	updateExportStatus(data);
	setTimeout(function () {
		requestExportStatus(queryExportStatusB);
	}, 3000);
}
function queryExportStatusB(data) {
	updateExportStatus(data);
	setTimeout(function () {
		requestExportStatus(queryExportStatusA);
	}, 3000);
}
/**
 * 向后台发送请求，查询相应任务的任务状态
 * @param successFunc 成功回调函数
 **/
function requestExportStatus(successFunc) {
	var needQueryExportStatusPKArr = getNeedQueryExportStatusPK();
	if (needQueryExportStatusPKArr == null || needQueryExportStatusPKArr.length == 0) {
		return;
	}
	Ajax.service("ExportTaskBO", "getExportStatusByPKArr", [needQueryExportStatusPKArr], function (data) {
		successFunc(data);
	});
}
/**
 * 获取需要查询导出状态的导出任务
 * @return 需要查询导出状态的导出任务数组
 **/
function getNeedQueryExportStatusPK() {
	return needQueryExportStatusPKArr;
}
/**
 * 根据导出任务状态数据处理缓存的需要查询导出状态的导出任务数组，并更新提示信息
 **/
function updateExportStatus(statusData) {
	if (statusData == null || statusData.length == 0) {
		return;
	}
	/** 第一步，去掉不需要再查询的任务数据 **/
	var thisFinishCount = 0;
	var thisFailureCount = 0;
	var statusDataLen = statusData.length;
	for (var i = 0; i < statusDataLen; i++) {
		if (statusData[i][1] == 2 || statusData[i][1] == 3) {
			if (statusData[i][1] == 2) {
				thisFinishCount++;
			} else {
				if (statusData[i][1] == 3) {
					thisFailureCount++;
				}
			}
			var needQueryExportStatusPKArrLen = needQueryExportStatusPKArr.length;
			for (var j = 0; j < needQueryExportStatusPKArrLen; j++) {
				if (needQueryExportStatusPKArr[j] == statusData[i][0]) {
					needQueryExportStatusPKArr.splice(j, 1);
					break;
				}
			}
		}
	}
	/** 更新页面提示信息 **/
	var downPageOpenStatus = checkDownPageOpenStatus();
 	if (downPageOpenStatus == 0) {
		if (thisFinishCount != 0) {
			downloadTip(thisFinishCount + "\u4e2a\u5bfc\u51fa\u4efb\u52a1\u5bfc\u51fa\u6210\u529f");
			frameDomJqObj.find("#exportsuccess_count").css("display", "inline");
			frameDomJqObj.find("#exportsuccess_count").text(Number(frameDomJqObj.find("#exportsuccess_count").text()) + thisFinishCount);
		}
		if (thisFailureCount != 0) {
			downloadTip(thisFailureCount + "\u4e2a\u5bfc\u51fa\u4efb\u52a1\u5bfc\u51fa\u5931\u8d25");
		}
	}
}

function checkDownPageOpenStatus() {
	var downIfrmeObj  = $("iframe[src='mydownload.jsp']");
	return downIfrmeObj.length;
}
/**
 * 返回选中菜单的节点对象,具体的属性可参考sysmenu.xml中配置的节点
 * 返回的对象通过getAttribute()方法调用。如：obj.getAttribute('name')
 * @return 选中菜单节点信息
 **/
function getSelectMenu() {
	var frameObj = $("#id_iframe").get(0).contentWindow;
	var menuNode = frameObj.menuNode;
	var selectMenuId = frameObj.selectMenuId;
	var selectTreeNodeObj;
	if (menuNode != undefined) {
		if (menuNode.length > 0) {
			if(selectMenuId[1]!=null){
				selectTreeNodeObj = menuNode[selectMenuId[0]].childNodes[selectMenuId[1]];
			}else{
				selectTreeNodeObj = menuNode[selectMenuId[0]];
			}
		}
	} else {
		menuNode = null;
	}
	return selectTreeNodeObj;
}
 
//系统退出
function exit() {
	top.layer.open({title:"\u63d0\u793a", icon:3, shadeClose:true, area:["250px", "150px"], btn:["\u786e\u5b9a", "\u53d6\u6d88"], shift:1, closeBtn:2, content:"\u4f60\u786e\u5b9a\u8981\u9000\u51fa\u7cfb\u7edf\u5417?", yes:function (index) {
		Ajax.service("idUserLogin", "logout", [strUserAccount], function (data) {
			window.location.href = contextPath + "/index.jsp";
		});        
	    //一般设定yes回调，必须进行手工关闭
		layer.close(index);
	}});
}
 
function frameOnLoad(data) { 
	if(!$("#id_iframe").attr("src")) {
		return;
	}
	frameDomJqObj = $($("#id_iframe").get(0).contentWindow.document);
	initDisplay();
	getExportInfo();
	$("#id_div_iframe").removeLoading();
	/** iframe的onload事件多做一步处理，某些浏览器（如ff）快速刷新页面时会有可能出现onload事件失效
	这里多调用resize，确保iframe外层div高度正确 **/
	resize();
}
 
