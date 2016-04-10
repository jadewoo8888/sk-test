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
	//setAppenFrame();
	initAppend();
});

/**
 * 默认值
 * 
 **/
function initDefaultValue() {
	getCategoryByPk(categoryPk);
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

function getCategoryByPk(categoryPk) {
	
	Ajax.service(
	  		'CategoryManagementBO',
	  		'findById', 
	  		[categoryPk],
	  		function(obj){
	  			categoryName = obj.categoryName;
	  			$("#id_ipCategoryPK").val(categoryName);
	  		},
	  		function(data){
	  			top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
	  		}
	  	);
}

/**
 * 根据pk获取物品采购单
 * @param pk
 */
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
	      	 	//setApprovalOption(obj);
	  		},
	  		function(data){
	  			top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
	  		}
	  	);
}

function dataFill(obj) {
		$("#id_ipCategoryPK").val(categoryName);
		$("#id_ipDeptCode").val(obj.ipDeptCodeDisplay);
		$("#id_ipApplyPerson").val(obj.ipApplyPersonDisplay);
		$("#id_ipPurchaseDate").val(obj.ipPurchaseDate);
		$("#id_ipRemark").val(obj.ipRemark);
}

function checkIpDApplyCount(value) {
	if(value < 1) {
		top.layer.alert('申购数量不能小于"1"',{closeBtn :2,icon:7});
	}
}

/**
 * 初始化新增的物品采购表格
 **/
function initAddDataGrid() {
	
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
	
	 var _sortInfo = {"sortPK" : "pk","sortSql" : "lastestUpdate Desc"};
	 var _columns =  
	 [[
		{field:"imName",title:'物品名称',minwidth:80},
		{field:"imType",title:'类别编码',minwidth:80,hidden:true},
        {field:"imTypeDisplay",title:'类别',minwidth:80},
        {field:"imSpecification",title:'规格型号',minwidth:80},
		{field:"imMetricUnit",title:'单位',minwidth:80},
		{field:"ipDApplyCount",title:'申购数量',minwidth:80,editor:{ type:'numberbox',options:{onChange:checkIpDApplyCount,width:80},align:'right',fmType:'int'}},
		{field:"ipDApproveCount",title:'行装科领导审核数量',minwidth:80,formatter:function(value){if(value == '0') return ""}}
	]];
	 
	 var dataGridOptions ={rownumbers:false,checkbox:true,isQuery:true,pagination:false,height:'auto',onLoadSuccess:initEditCell1};
	 
	 var customOptions = {tableID:'id_table_grid',classID:'ItemManageBO',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}

/**
 * 初始化修改的物品采购表格
 **/
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
		{field:"ipDType",title:'类别编码',minwidth:80,hidden:true},
        {field:"ipDTypeDisplay",title:'类别',minwidth:80},
        {field:"ipDSpecification",title:'规格型号',minwidth:80},
		{field:"ipDMetricUnit",title:'单位',minwidth:80},
		{field:"ipDApplyCount",title:'申购数量',minwidth:80,editor:{ type:'numberbox',options:{onChange:checkIpDApplyCount},align:'right',fmType:'int'}},
		{field:"ipDApproveCount",title:'行装科领导审核数量',minwidth:80,formatter:function(value){if(value == '0') return ""; else return value;}}
	]];
	 
	 var dataGridOptions ={rownumbers:false,checkbox:true,isQuery:true,pagination:false,height:'auto',onLoadSuccess:initEditCell1};
	 
	 var customOptions = {tableID:'id_table_grid',classID:'ItemsPurchaseDetailBO',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}

/**初始化编辑的单元格**/
function initEditCell1(){
	var row = datagrid.dataGridObj.datagrid('getRows');
	var rowLen = row.length;
	for (var i = 0; i < rowLen; i++) {
		datagrid.dataGridObj.datagrid('beginEdit', i);
	}
	//编辑单元格的宽带会被框架样式（审批的样式）覆盖，这里处理覆盖的样式
	var width = $("td[field=ipDApplyCount]").children("div.datagrid-cell")[0].clientWidth;
	var cssWidth = 'width:'+width+'px!important;';
	$(".datagrid-cell-c1-ipDApplyCount").css("cssText",cssWidth);
}

/**
 * 初始化发放采购物品表格（当发放物品时，库存不够，然后就转到这里采购）
 **/
function initIssuePurchaseDataGrid() {
	
	//自定义查询条件
	function setCustomQueryCondition() {
		var customQCArr = new Array();
		//申购单pk条件
		var mpkQc = new Object();
		mpkQc.fn = 'itemsApplyMPK';
		mpkQc.oper = ARY_STR_EQUAL[0];
		mpkQc.value1 = ipItemsApplyMPK;
		customQCArr.push(mpkQc);
		
	    return customQCArr;
	}
	
	 var _sortInfo = {"sortPK" : "pk","sortSql" : "lastestUpdate Desc"};
	 var _columns =  
	 [[
		{field:"imName",title:'物品名称',minwidth:80},
		{field:"imType",title:'类别编码',minwidth:80},
        {field:"imTypeDisplay",title:'类别',minwidth:80},
        {field:"imSpecification",title:'规格型号',minwidth:80},
		{field:"imMetricUnit",title:'单位',minwidth:80},
		{field:"iamApplyCount",title:'申领数量',minwidth:80},
		{field:"iamLeaderCheckCount",title:'行装科领导审核数量',minwidth:80},
		{field:"ipDApplyCount",title:'申购数量',minwidth:80,editor:{ type:'numberbox',options:{onChange:checkIpDApplyCount},align:'right',fmType:'int'}}
	]];
	 
	 var dataGridOptions ={rownumbers:false,checkbox:false,isQuery:true,pagination:false,height:'auto',onLoadSuccess:initEditCell2};
	 
	 var customOptions = {tableID:'id_table_grid',classID:'ItemsApplyMDetailBO',methodID:'getListForPage',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}

/**初始化编辑的单元格**/
function initEditCell2(){
	var rows = datagrid.dataGridObj.datagrid('getRows');
	var rowLen = rows.length;
	for (var i = 0; i < rowLen; i++) {
		datagrid.dataGridObj.datagrid('beginEdit', i);
		var editors = datagrid.dataGridObj.datagrid('getEditors', i);
		var v = rows[i]['iamLeaderCheckCount'];
		editors[0].target.numberbox('setValue',v);
	}
	//编辑单元格的宽带会被框架样式（审批的样式）覆盖，这里处理覆盖的样式
	var width = $("td[field=ipDApplyCount]").children("div.datagrid-cell")[0].clientWidth;
	$(".datagrid-cell-c1-ipDApplyCount").width(width);
}

/**
 * 初始化表格
 */
function initDataGrid() {
	if (ipItemsApplyMPK) {//通过发放界面转到申购页面
		initIssuePurchaseDataGrid();
	} else {
		if (pk) {//直接修改
			initModifyDataGrid();
		} else {//新增
			initAddDataGrid();
		}
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
	/*$("#id_btn_query").click(function () {
		datagrid.query();
	});
	$("#id_btn_export").click(function () {
		datagrid.showExport();
	});*/ 
	$("#id_bt_return").click(function(){
		history.go(-1);
		});
	
}
/**
 * 
 * @param ifReport 是否上报
 */
function save(ifReport) {
	
	var checkRows = $('#id_table_grid').datagrid('getChecked');
	var checkRowsLen = checkRows.length;
	if (checkRowsLen < 1) {
		var msg = '请选择要采购的物品，并填写申购数量！';
		if (pk) {
			msg = '请选择要修改物品！';
		}
		top.layer.alert(msg,{closeBtn :2,icon:7});
	} else {
		$("#id_btn_save").attr("disabled", true);
		top.layer.open({
			title:'保存采购申请信息',
			icon: 3,
			area:['300px','150px'],
			btn:['确定', '取消'],
			content:'你确定要保存采购申请信息吗？',
			shift:1,
			closeBtn :2,
			yes: function(index){
					$('body').addLoading({msg:'正在保存数据，请等待...'});			    //打开遮挡层		
					
					var itemsPurchase = packageItemsPurchaseData();
					var itemsPurchaseMdetailList = packageItemsPurchaseDetailData();
					if (pk) {
						summitEdit(itemsPurchaseMdetailList,ifReport);
					} else {
						summitAdd(itemsPurchase,itemsPurchaseMdetailList,ifReport);
					}
		    		top.layer.close(index);	//一般设定yes回调，必须进行手工关闭

		    },
		    cancel: function(index){
				$("#id_btn_save").attr("disabled", false);
			}
		});	
	}
	
}

/**
 * 新增
 * @param itemsPurchase
 * @param itemsPurchaseMdetailList
 * @param ifReport 是否上报
 */
function summitAdd(itemsPurchase,itemsPurchaseMdetailList,ifReport) {
	Ajax.service(
			'ItemsPurchaseBO',
			'addItemPurchase', 
			 [itemsPurchase,itemsPurchaseMdetailList,ifReport,ipItemsApplyMPK,getAppendData()],
			function(result){
				$('body').removeLoading();     // 关闭遮挡层
				$("#id_btn_save").attr("disabled", false); // 按钮可点击
				if(result!=null&&result!=""){		
					top.layer.alert(result,{icon: 5, closeBtn:2});
				}else{
					top.layer.alert(ifReport?'上报成功 ':'保存成功',{icon: 6, closeBtn:2});
					//history.go(-1);
					location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/purchasemanage/purchaseapply/listpurchaseapply.jsp';
				}		
			}
		);
};

/**
 * 修改
 * @param itemsPurchaseMdetailList
 * @param ifReport 是否上报
 */
function summitEdit(itemsPurchaseMdetailList,ifReport) {
	var ipRemark = $("#id_ipRemark").val();
	Ajax.service(
			'ItemsPurchaseBO',
			'modifyItemPurchase', 
			 [pk,ipRemark,itemsPurchaseMdetailList,ifReport,ipItemsApplyMPK,getAppendData()],
			function(result){
				$('body').removeLoading();     // 关闭遮挡层
				$("#id_btn_save").attr("disabled", false); // 按钮可点击
				if(result!=null&&result!=""){		
					top.layer.alert(result,{icon: 5, closeBtn:2});
				}else{
					top.layer.alert(ifReport?'上报成功 ':'修改成功 ',{icon: 6, closeBtn:2});
					//history.go(-1);
					location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/purchasemanage/purchaseapply/listpurchaseapply.jsp';
				}		
			}
		);
};

/**
 * 打包采购单
 */
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

/**
 * 打包采购明细
 * @returns {Array}
 */
/*function packageItemsPurchaseDetailData() {
	
	var row = datagrid.dataGridObj.datagrid('getRows');
	var rowLen = row.length;
    var rowsData = new Array();
    for(var i=0;i<rowLen;i++) {
		var editors = datagrid.dataGridObj.datagrid('getEditors', i);	
	 	
	 	var itemsPurchaseDetail = new Object();
	 	
	 	if (pk) {//修改
	 		itemsPurchaseDetail.ipDType= row[i].ipDType;
		 	itemsPurchaseDetail.ipDName = row[i].ipDName;
		 	itemsPurchaseDetail.ipDSpecification= row[i].ipDSpecification;
		 	itemsPurchaseDetail.ipDMetricUnit= row[i].ipDMetricUnit;
	 		itemsPurchaseDetail.pk = row[i].pk;
	 	} else {//新增或者通过发放采购
	 		itemsPurchaseDetail.ipDName = row[i].imName;
		 	itemsPurchaseDetail.ipDType = row[i].imType;
		 	itemsPurchaseDetail.ipDSpecification= row[i].imSpecification;
		 	itemsPurchaseDetail.ipDMetricUnit= row[i].imMetricUnit;
		 	itemsPurchaseDetail.ipDItemManagePK = row[i].pk;
	 	}
	 	
	 	itemsPurchaseDetail.ipDApplyCount = editors[0].target.numberbox('getValue');
	 	
   		rowsData.push(itemsPurchaseDetail);
	}
	return rowsData;
}*/

/**
 * 
 * 打包采购明细
 */
function packageItemsPurchaseDetailData() {
	
	var checkRows = $('#id_table_grid').datagrid('getChecked');//很奇怪，通过getChecked得到的列和编辑值顺序是倒过来的，即不对应。所以只能用笨的办法来处理。哎
	var checkRowsLen = checkRows.length;
	/*if (checkRowsLen < 1) {
		var msg = '请选择要采购的物品，并填写申购数量！';
		if (pk) {
			msg = '请选择要修改物品！';
		}
		top.layer.alert(msg,{closeBtn :2,icon:7});
 		return;
	}*/
	
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
			 var editors = $('#id_table_grid').datagrid('getEditors', i);
			 
			 var itemsPurchaseDetail = new Object();
			 if (pk) {//修改
			 		itemsPurchaseDetail.pk = allRows[i].pk;//物品采购明细表PK
			 	} else {//新增或者通过发放采购
			 		itemsPurchaseDetail.ipDName = allRows[i].imName;
				 	itemsPurchaseDetail.ipDType = allRows[i].imType;
				 	itemsPurchaseDetail.ipDSpecification= allRows[i].imSpecification;
				 	itemsPurchaseDetail.ipDMetricUnit= allRows[i].imMetricUnit;
				 	itemsPurchaseDetail.ipDItemManagePK = allRows[i].pk;
			 	}
			 	
			 	var ipDApplyCount = editors[0].target.numberbox('getValue');
			 	if (ipDApplyCount < 1) {
			 		top.layer.alert('申购数量不能小于"1"',{closeBtn :2,icon:7});
			 		return;
			 	}
			 	itemsPurchaseDetail.ipDApplyCount = ipDApplyCount;
			 	
		   		rowsData.push(itemsPurchaseDetail);
		 }
	}
	return rowsData;
}

/**
 * 设置附件
 **/
/*function setAppenFrame() {    
	var appendFrameObj = document.getElementById('id_iframe_append');
	appendFrameObj.src = contextPath+'/core/componentmodule/upload/listCommonUpload.jsp?busitype=TYYWLX_026&controltype='+business+'&businesscode='+pk;
}*/

/**
 * 设置附件
 **/
function initAppend() {
	var opt = {controlType:business,businessCode:pk,businessType:'TYYWLX_026'};
	$('#id_div_appendarea').commonupload(opt);
}

/** 
 * 获取附件数据
 **/
/*function getAppendData() {
	var appendFrameObj = document.getElementById('id_iframe_append').contentWindow;
	var appendData = appendFrameObj.getAppendData();
	return appendData;
}*/

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
