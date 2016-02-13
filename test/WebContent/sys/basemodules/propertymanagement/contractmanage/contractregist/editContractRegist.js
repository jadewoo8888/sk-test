//页面主表信息对象 
var contractObj = new Object();
//租金规则列表datagrid对象
var datagrid = null;
/** 用于标识某个区域时候第一次打开，若第一次打开则同时初始化这个区域内的内容，并获取数据填充 **/
var initedAppendAreaFlag = false;

/**
 * 初始化入口  
 **/
$(function () {
	initComBindFunc();
	initComDisplay();
	initData();
	initDataGrid();
	setDefaultValue();
	limitInput();
});

/**
 * 初始化设置页面组件的显示
 **/
function initComDisplay() {
	$(".combo input").removeClass("validatebox-invalid");
	$(".easyui-numberbox").removeAttr("required");
	$('#id_unitCode').searchbox('textbox').attr('readonly',true);//禁用输入
	
	if (strBusiType == STR_REGISTER_ADDNEW) {
		$('#id_div_desc .head-title').html('新增合同');
	}  
}

/**
 * 初始获取页面所需数据
 **/
function initData() {
	//若unitSysCode不为空，则表明是通过物业模块或出租模块链接过来新增合同的，需根据单元内部编码获取物业信息填充
	if(unitSysCode) {
		getHouseUnitByUnitSysCode(unitSysCode);
	}
}

/**
 * 初始化表格信息
 **/
function initDataGrid() {
	var _sortInfo = {"sortPK" : "hlcRentRulePK","sortSql" : "hlcRentRuleStartDate Asc"};
	 var _columns =  
	 [[
		{field:"hlcRentRuleStartDate",title:'租赁开始日期',minwidth:100, editor:'text'},
		{field:"hlcRentRuleEndDate",title:'租赁截止日期',minwidth:100, editor:{ type:'datebox',  options:{onSelect:hlcRentRuleEndDateSelect,editable:false,width:100,required:true}}},
		{field:"hlcRentRuleRent",title:'月租金（小写）',minwidth:110,editor:{ type:'numberbox',  options:{onChange:hlcRentRuleRentChange,min:0.00,precision:2,groupSeparator:',',width:100,required:true}},align:'right',fmType:'money'},
		{field:"hlcRentRuleRentUp",title:'月租金（大写）',minwidth:230},
		{field:"hlcRentRulePeriod",title:'租金结算方式',minwidth:100, editor:{ type:'combobox',options:{onSelect:hlcRentRulePeriodSelect,data:paycycClassifyData,editable:false,valueField:'classifyCode',textField:'classifyName',width:100,required:true}}},
		{field:"hlcRentRulePeriodDate",title:'交租日期',minwidth:150,editor:{ type:'skrqEdit',options:{width:100,required:true}}}
	]]; 
	 var dataGridOptions ={rownumbers:false,checkbox:false,isQuery:false,pagination:false,height:'auto',onLoadSuccess:null};
	 var customOptions = {tableID:'id_table_grid',classID:'HLCRentRlueBO',columns:_columns,sortInfo:_sortInfo,customQCFunc:null};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}

/** 
 * 根据物业内部编码获取物业信息
 **/
function getHouseUnitByUnitSysCode(unitSysCode) {
	$("body").addLoading({msg:"正在获取物业信息，请稍后..."});
	Ajax.service("HouseUnitBO", "findByProperty", ['unitSysCode',unitSysCode], getHouseUnitByUnitSysCodeSuccFunc, getHouseUnitByUnitSysCodeFailureFunc);
}

function getHouseUnitByUnitSysCodeSuccFunc(data) {
	callUpdateData(data);
	$("body").removeLoading();
}

function getHouseUnitByUnitSysCodeFailureFunc() {
	$("body").removeLoading();
	top.layer.alert("\u83b7\u53d6\u5904\u7f6e\u5355\u57fa\u672c\u4fe1\u606f\u51fa\u73b0\u9519\u8bef\uff0c\u8bf7\u8054\u7cfb\u7ba1\u7406\u5458 ", {icon:5, closeBtn:2});
}

/**
 * 设置附件
 **/
function setAppenFrame() {
	var appendFrameObj = document.getElementById("id_iframe_append");
	appendFrameObj.src = contextPath + "/core/componentmodule/upload/listCommonUpload.jsp?busitype=TYYWLX_006&controltype=" + strBusiType + "&businesscode=" + hlcpk;
}

/**
 * 输入限制
 **/
function limitInput() {
	$("#id_unitCode").next().find(".searchbox-text").validatebox({required:true, missingMessage:"\u627f\u79df\u4eba\u4e0d\u80fd\u4e3a\u7a7a"});
}

 	
/**
 * 设置默认值
 **/
function setDefaultValue() {
	if (strBusiType == STR_REGISTER_ADDNEW) {
		var orgName = top.strFilterOrgCodeDisplay;
		var index = orgName.indexOf(']');
		if(index!=-1) {
			orgName = orgName.substring(index+1);
		}
		$("#id_hlcFirstEnprName").val(orgName);
		$("#id_hlcRegDate").datebox("setValue", serverDate);
	}
} 

/**
 * 页面组件绑定事件处理方法
 **/
function initComBindFunc() {
	$("#id_btn_save").click(save);
	$("#id_btn_return").click(returnUpperLevel);
	$("#id_btn_addRulerow").click(addRentRlueRow);
	$("#id_btn_deleteRulerow").click(deleteRentRlueRow);
	$("#tabs").tabs({onSelect:tabSelect});
	$("#id_unitCode").searchbox({searcher:unitSearch});
	$('#id_hlcRentType').combobox({onSelect:hlcRentTypeOnSelect});
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
	top.layer.open({title:"\u4fdd\u5b58", icon:3, area:["330px", "160px"], btn:["\u786e\u5b9a", "\u53d6\u6d88"], content:"确定保存当前合同数据？", shift:1, closeBtn:2, yes:function (index) {
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
	var appendPackage = getAppendData();
	var rentRuleRowsData = packageRentRuleData();
	Ajax.service("HouseLeaseContractBO", "addHouseLeaseContract", [contractObj, rentRuleRowsData,appendPackage], saveServiceSuccessFunc, saveServiceFailureFunc);
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
		top.layer.open({title:"\u63d0\u793a", icon:6, area:["280px", "150px"], content:'合同数据保存成功', shift:1, closeBtn:2, yes:function (index) {
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

/**
 * 物业选择按钮点击处理方法
 **/
function unitSearch() {
	top.layer.open({type:2, title:"物业选择", shift:1, closeBtn:2, area:["1000px", "600px"], content:contextPath + "/sys/basemodules/propertymanagement/contractmanage/contractregist/listHouseUnitSelect.jsp?busitype=" + strBusiType + "&openwindowname=" + window.name});
}

/**
 * 物业选择回调方法
 **/
function callUpdateData(rows) {
	var row = rows[0];
	$("#id_unitCode").searchbox('setValue',row.unitCode);
	$("#id_unitArea").numberbox('setValue',row.unitArea);
	$("#id_unitPurpose").val(row.unitPurposeDisplay);
	$("#id_unitAdress").val(row.unitAdress);
	
	contractObj.unitPurpose = row.unitPurpose;
	contractObj.unitSysCode = row.unitSysCode;
	contractObj.unitName = row.unitName;
	 
	//获取此物业最后一条出租申请信息填充 
	getLastLentInfo(row.unitSysCode);
}

/**
 * 查找物业最后登记的出租信息
 **/
function getLastLentInfo(unitSysCode){
 	$('body').addLoading({msg:'正在获取最后的出租申请信息，请等待...'});
	Ajax.service(
 		'LetRentBO',
 		'getLastLetRent', 
 		[unitSysCode],
 		function(data){		
 			fillLastLentInfo(data);
 			$('body').removeLoading();
 		},function(){
 			top.layer.alert('数据异常',{closeBtn :2,icon:5});
 		}
	);
}

/**
 *物业最后登记的出租信息填充
 **/
function fillLastLentInfo(data){
	if(data==null) {
		return;
	}
	$("#id_hlcUintRuleRent").numberbox('setValue',data.letUpPrice);
	$("#id_hlcRuleRent").numberbox('setValue',data.letUpPrice*data.unitArea);
	$("#id_hlcDeposit").numberbox('setValue',data.rentMargin);
	$("#id_hlcIncrRound").numberbox('setValue',parseInt(data.incrRound));
	$("#id_hlcIncrRate").numberbox('setValue',parseFloat(data.incrRate));
	$("#id_hlcPurpose").val(data.planLetPurposeDisplay);
	contractObj.hlcPurpose = data.planLetPurpose;
}


/**
 * 数据封装，从页面中获取数据
 **/
function dataPackage() {
	//当没有单位编码，即承租人是手动填写，并非通过合同选择,注意：出租合同的打包是选择物业后就打包的。因其是元数据。
	if (strBusiType == STR_REGISTER_ADDNEW) {
		contractObj.hlcFirstEnprCode = top.strFilterOrgCode;
 	}
	contractObj.unitCode = $("#id_unitCode").searchbox('getValue');
	contractObj.unitArea = $("#id_unitArea").numberbox('getValue');
	contractObj.unitAdress = $("#id_unitAdress").val();
	contractObj.hlcFirstEnprName = $("#id_hlcFirstEnprName").val();
	contractObj.hlcSecondEnprName = $("#id_hlcSecondEnprName").val();
	contractObj.hlcRegDate = $("#id_hlcRegDate").datebox("getValue");
	contractObj.hlcSecondPaperTyype = $("#id_hlcSecondPaperTyype").combobox("getValue");
	contractObj.hlcSecondPaperNo = $("#id_hlcSecondPaperNo").val();
	contractObj.hlcSecondtname = $("#id_hlcSecondtname").val();
	contractObj.hlcSecondtTel = $("#id_hlcSecondtTel").val();
	contractObj.hlcRegStartDate = $("#id_hlcRegStartDate").datebox("getValue");
	contractObj.hlcRegEndDate = $("#id_hlcRegEndDate").datebox("getValue");
	contractObj.hlcRentPayType = $("#id_hlcRentPayType").combobox("getValue");
	contractObj.hlcDeposit = $("#id_hlcDeposit").numberbox('getValue');
	contractObj.hlcRuleRent = $("#id_hlcRuleRent").numberbox('getValue');
	contractObj.hlcIncrRound = $("#id_hlcIncrRound").numberbox('getValue');
	contractObj.hlcUintRuleRent = $("#id_hlcUintRuleRent").numberbox('getValue');
	contractObj.hlcIncrRate = $("#id_hlcIncrRate").numberbox('getValue');
	contractObj.hlcOtherItem = $("#id_hlcOtherItem").val();
	contractObj.hlcFirstRepairItem = $("#id_hlcFirstRepairItem").val();
	contractObj.hlcRentType = $("#id_hlcRentType").combobox("getValue");
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
	if (!$("#id_form").form("validate")) {
		return false;
	}
	if( $("#id_hlcRegDate").datebox("getValue")>serverDate) {
		checkLayerAlert('签订日期不能大于当前日期!');
		return false;
	}
	
	var hlcRegStartDate =  $("#id_hlcRegStartDate").datebox("getValue");
	var hlcRegEndDate =  $("#id_hlcRegEndDate").datebox("getValue");
	if(hlcRegStartDate >= hlcRegEndDate) {
		checkLayerAlert('合同结束日期必须大于合同起始日期!');
		return false;
	}
	
	if(!checkRentRule()) {
		return false;
	}
	
	return true;
}

/**
 * 警告提示语句公共弹出方法
 **/
function checkLayerAlert(alertInfo) {
	top.layer.alert(alertInfo,{closeBtn :2,icon:7});
}

/**
 * 返回上一级页面
 **/
function returnUpperLevel() {
	history.go(-1);
}