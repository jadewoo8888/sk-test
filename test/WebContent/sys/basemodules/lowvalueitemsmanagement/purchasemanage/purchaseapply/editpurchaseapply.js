//列表表格对象
var datagrid = null;
//var mainObj = new Object();
var approvalBusiType = "SPYWLX_015";
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
	$("#id_ipCategoryPK").val(categoryName);
	if (pk) {
		//设置头信息
		$('#id_div_desc .head-title').html('修改采购申请');
		getItemsPurchaseByPk(pk);
	} else {
		$('#id_div_desc .head-title').html('新增采购申请');
		
		$("#id_ipDeptCode").val(top.strUserDeptName);
		$("#id_ipApplyPerson").val(top.strUserName);
		$("#id_ipPurchaseDate").val(serverDate);
	}
}

function getItemsPurchaseByPk(pk) {
	
	Ajax.service(
	  		'ItemsPurchaseBO',
	  		'findById', 
	  		[pk],
	  		function(obj){
	  		 	mainObj = obj;
				//数据填充 
	      	 	dataFill(obj);
	      	 	//审批数据初始化
	      	 	setApprovalOption(obj);
	  		},
	  		function(data){
	  			top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
	  		}
	  	);
}

function dataFill(obj) {
		$("#id_ipDeptCode").val(obj.ipDeptCodeDisplay);
		$("#id_ipApplyPerson").val(obj.ipApplyPersonDisplay);
		$("#id_ipPurchaseDate").val(obj.ipPurchaseDate);
		$("#id_ipRemark").val(obj.ipRemark);
}

/**
 * 初始化表格信息
 **/

function initAddDataGrid() {
	
	//自定义查询条件
	function setCustomQueryCondition(){
		var customQCArr = new Array();
		//类目条件
		var categoryQc = new Object();
		categoryQc.fn = 'imCategoryPK';
		categoryQc.oper = ARY_STR_EQUAL[0];
		categoryQc.value1 = categoryPk;
		customQCArr.push(categoryQc);
	    return customQCArr;
	}
	
	 var _sortInfo = {"sortPK" : "pk","sortSql" : "lastestUpdate Desc"};
	 var _columns =  
	 [[
		{field:"imName",title:'物品名称',minwidth:80},
        {field:"imTypeDisplay",title:'类别',minwidth:80},
        {field:"imSpecification",title:'规格型号',minwidth:80},
		{field:"imMetricUnit",title:'单位',minwidth:80},
		{field:"ipDApplyCount",title:'申购数量',minwidth:80,editor:{ type:'numberbox',options:{width:80},align:'right',fmType:'int'}},
		{field:"ipDApproveCount",title:'行装科领导审核数量',minwidth:80,formatter:function(value){if(value == '0') return ""}}
	]];
	 
	 var dataGridOptions ={rownumbers:false,checkbox:true,isQuery:true,pagination:false,height:'auto',onLoadSuccess:initEditCell};
	 
	 var customOptions = {tableID:'id_table_grid',classID:'ItemManageBO',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
	 
	 
}

function initModifyDataGrid() {
	
	//自定义查询条件
	function setCustomQueryCondition(){
		var customQCArr = new Array();
		//采购申请条件
		var qc = new Object();
		qc.fn = 'ipDItemsPurchasePK';
		qc.oper = ARY_STR_EQUAL[0];
		qc.value1 = pk;
		customQCArr.push(qc);
	    return customQCArr;
	}
	
	 var _sortInfo = {"sortPK" : "pk","sortSql" : "lastestUpdate Desc"};
	 var _columns =  
	 [[
		{field:"ipDName",title:'物品名称',minwidth:80},
        {field:"ipDType",title:'类别',minwidth:80},
        {field:"ipDSpecification",title:'规格型号',minwidth:80},
		{field:"ipDMetricUnit",title:'单位',minwidth:80},
		{field:"ipDApplyCount",title:'申购数量',minwidth:80,editor:{ type:'numberbox',options:{width:80},align:'right',fmType:'int'}},
		{field:"ipDApproveCount",title:'行装科领导审核数量',minwidth:80,formatter:function(value){if(value == '0') return ""}}
	]];
	 
	 var dataGridOptions ={rownumbers:false,checkbox:true,isQuery:true,pagination:false,height:'auto',onLoadSuccess:initEditCell};
	 
	 var customOptions = {tableID:'id_table_grid',classID:'ItemsPurchaseDetailBO',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}

function initEditCell(){
	var row = datagrid.dataGridObj.datagrid('getRows');
	var rowLen = row.length;
	for (var i = 0; i < rowLen; i++) {
		datagrid.dataGridObj.datagrid('beginEdit', i);
	}
}

function initDataGrid() {
	if (pk) {
		initModifyDataGrid();
	} else {
		initAddDataGrid();
	}
}



/**
 * 为页面上的组件添加事件处理方法
 **/
function initComBindFunc() {
	$("#id_btn_save").click(function () {
		save(false);
	});
	$("#id_btn_report").click(function () {
		save(true);
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

function save(ifReport) {
	var itemsPurchase = packageItemsPurchaseData();
	var itemsPurchaseMdetailList = packageItemsPurchaseDetailData();
	debugger;
	if (pk) {
		summitEdit(itemsPurchaseMdetailList,ifReport);
	} else {
		summitAdd(itemsPurchase,itemsPurchaseMdetailList,ifReport);
	}
}

function summitAdd(itemsPurchase,itemsPurchaseMdetailList,ifReport) {
	Ajax.service(
			'ItemsPurchaseBO',
			'addItemPurchase', 
			 [itemsPurchase,itemsPurchaseMdetailList,ifReport,getAppendData()],
			function(result){
				$('body').removeLoading();     // 关闭遮挡层
				//$("#id_btn_save").attr("disabled", false); // 按钮可点击
				if(result!=null&&result!=""){		
					top.layer.alert(result,{icon: 5, closeBtn:2});
				}else{
					top.layer.alert(ifReport?'上报成功 ':'保存成功',{icon: 6, closeBtn:2});
					history.go(-1);
				}		
			}
		);
};

function summitEdit(itemsPurchaseMdetailList,ifReport) {
	var ipRemark = $("#id_ipRemark").val();
	Ajax.service(
			'ItemsPurchaseBO',
			'modifyItemPurchase', 
			 [pk,ipRemark,itemsPurchaseMdetailList,ifReport,getAppendData()],
			function(result){
				$('body').removeLoading();     // 关闭遮挡层
				//$("#id_btn_save").attr("disabled", false); // 按钮可点击
				if(result!=null&&result!=""){		
					top.layer.alert(result,{icon: 5, closeBtn:2});
				}else{
					top.layer.alert(ifReport?'上报成功 ':'修改成功 ',{icon: 6, closeBtn:2});
					history.go(-1);
				}		
			}
		);
};

function packageItemsPurchaseData() {
	var itemsPurchase = new Object();
	itemsPurchase.ipCategoryPK = categoryPk;
	itemsPurchase.ipOrgCode = top.strFilterOrgCode;
	itemsPurchase.ipDeptCode = top.strUserDeptCode;
	itemsPurchase.ipApplyPerson = top.strUserAccount;
	itemsPurchase.ipPurchaseDate = $("#id_ipPurchaseDate").val();
	itemsPurchase.ipRemark = $("#id_ipRemark").val();
 	return itemsPurchase;
}

function packageItemsPurchaseDetailData() {
	
	var row = datagrid.dataGridObj.datagrid('getRows');
	var rowLen = row.length;
    var rowsData = new Array();
    for(var i=0;i<rowLen;i++) {
		var editors = datagrid.dataGridObj.datagrid('getEditors', i);	
	 	
	 	var itemsPurchaseDetail = new Object();
	 	itemsPurchaseDetail.ipDItemManagePK = row[i].pk;
	 	if (pk) {
	 		itemsPurchaseDetail.ipDName = row[i].ipDName;
		 	itemsPurchaseDetail.ipDName = row[i].ipDName;
		 	itemsPurchaseDetail.ipDSpecification= row[i].ipDSpecification;
		 	itemsPurchaseDetail.ipDMetricUnit= row[i].ipDMetricUnit;
	 	} else {
	 		itemsPurchaseDetail.ipDName = row[i].imName;
		 	itemsPurchaseDetail.ipDType = row[i].imType;
		 	itemsPurchaseDetail.ipDSpecification= row[i].imSpecification;
		 	itemsPurchaseDetail.ipDMetricUnit= row[i].imMetricUnit;
	 	}
	 	
	 	itemsPurchaseDetail.ipDApplyCount = editors[0].target.numberbox('getValue');
	 	
   		rowsData.push(itemsPurchaseDetail);
	}
	return rowsData;
}

/**
 * 设置附件
 **/
function setAppenFrame() {    
	var appendFrameObj = document.getElementById('id_iframe_append');
	appendFrameObj.src = contextPath+'/core/componentmodule/upload/listCommonUpload.jsp?busitype=TYYWLX_026&controltype='+business+'&businesscode='+pk;
}

/** 
 * 获取附件数据
 **/
function getAppendData() {
	var appendFrameObj = document.getElementById('id_iframe_append').contentWindow;
	var appendData = appendFrameObj.getAppendData();
	return appendData;
}

//审批数据初始化
function setApprovalOption(obj) {
	//初始化审批信息
	var apprvalOption = {
		funcType:"DrawApprovalBar", 
		approvalBarDivID:"id_div_approvaloption", 
		isReadonly:true, 
		busiDeptCode:obj.ipDeptCode, 
		busiType:approvalBusiType, 
		busiPK:obj.pk, 
		busiOrgCode:obj.ipOrgCode, 
		menuId:"MENU_10_03_01"
	};
	var am = new ApprovalModule(apprvalOption);
}
