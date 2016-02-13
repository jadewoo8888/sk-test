//列表表格对象
var datagrid = null;

/**
 * 初始化方法
 **/ 
$(function () { 
	initForm();
	initDataGrid();
	initComBindFunc(); 
	initCategoryCombo();
});

function initForm() {
	$("#id_itemsApplyDeptCode").val(top.strUserDeptName);
	//$("#id_categoryManagementPK").val(categoryName);
	$("#id_applyPerson").val(top.strUserName);
	$("#id_itemsApplyDate").val(serverDate);
	getCategoryByPk(categoryPk);
}

/** 
 * 根据编码获取信息
 **/
function getCategoryByPk(pk) {
	Ajax.service(
	  		'CategoryManagementBO',
	  		'findById', 
	  		[pk],
	  		function(obj){
				//数据填充 
	      	 	//dataFill(obj);
	  			categoryName = obj.categoryName;
	  			$("#id_categoryManagementPK").val(categoryName);
	  		},
	  		function(data){
	  			top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
	  		}
	  	);
}
/**
 * 初始化表格信息
 **/
function initDataGrid() {
	 var _sortInfo = {"sortPK" : "pk","sortSql" : "lastestUpdate Desc"};
	 var _columns =  
	 [[
		{field:"pk",title:'主键',minwidth:200, hidden:true},
		{field:"imName",title:'物品名称',minwidth:150},
        {field:"imTypeDisplay",title:'类别',minwidth:160},
        {field:"imSpecification",title:'规格型号',minwidth:160},
		{field:"imMetricUnit",title:'单位',minwidth:200},
		{field:"applyCount",title:'申领数量',minwidth:150,editor:{ type:'numberbox',align:'right',fmType:'int'}},
		{field:"checkCount",title:'经办人审核数量',minwidth:150,editor:{ type:'numberbox',align:'right',fmType:'int'}},
		{field:"leaderCheckCount",title:'行装科领导审核数量',minwidth:150,editor:{ type:'numberbox',align:'right',fmType:'int'}}
	]];
	 var dataGridOptions ={rownumbers:false,checkbox:false,isQuery:true,pagination:false,height:'auto',onLoadSuccess:null};
	 var customOptions = {tableID:'id_table_grid',classID:'ItemManageBO',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
	 
	 initdatagridEditFn();
}

function initdatagridEditFn() {
	datagrid.dataGridObj.datagrid({
		onDblClickCell: function(index,field,value){
			$(this).datagrid('beginEdit', index);
			var ed = $(this).datagrid('getEditor', {index:index,field:field});
			$(ed.target).focus();
		}
	});
};

//自定义查询条件
function setCustomQueryCondition() {
	var customQCArr = new Array();
	//单位条件
	var categoryQc = new Object();
	categoryQc.fn = 'imCategoryPK';
	categoryQc.oper = ARY_STR_EQUAL[0];
	categoryQc.value1 = "31fd2d39-49ab-42ec-bf2f-f1ff6d111e56";//31fd2d39-49ab-42ec-bf2f-f1ff6d111e56
	customQCArr.push(categoryQc);
    return customQCArr;
}

/**
 * 为页面上的组件添加事件处理方法
 **/
function initComBindFunc() {
	$("#id_btn_save").click(function () {
		save("WPSLZT_001");
	});
	$("#id_btn_report").click(function () {
		save("WPSLZT_002");
	});
	//查询按钮处理事件
	$("#id_btn_query").click(function () {
		datagrid.query();
	});
	$("#id_btn_export").click(function () {
		datagrid.showExport();
	}); 
	
	
}

function save(itemsApplyFlag) {
	
	var itemsApplyManagement = packageItemsApplyManData(itemsApplyFlag);
	var itemsApplyMdetailList = packageItemsApplyMDetailData();
	
	Ajax.service(
			'ItemsApplyManagementBO',
			'addItemApply', 
			 [itemsApplyManagement,itemsApplyMdetailList],
			function(result){
				$('body').removeLoading();     // 关闭遮挡层
				//$("#id_btn_save").attr("disabled", false); // 按钮可点击
				if(result!=null&&result!=""){		
					top.layer.alert(result,{icon: 5, closeBtn:2});
				}else{
					if (itemsApplyFlag == "WPSLZT_001") {
						top.layer.alert('保存成功 ',{icon: 6, closeBtn:2});
					} else {
						top.layer.alert('上报成功 ',{icon: 6, closeBtn:2});
					}
					
			    	//刷新
			    	 //datagrid.query();
				}		
			}
		);
}

function packageItemsApplyManData(itemsApplyFlag) {
	var itemsApplyMan = new Object();
	//itemsApplyMan.PK
	//itemsApplyMan.ItemsApplyCode
 	itemsApplyMan.categoryName = categoryName;
 	itemsApplyMan.categoryManagementPK = categoryPk;
 	itemsApplyMan.orgCode = top.strUserOrgCode;
 	itemsApplyMan.itemsApplyDeptCode = top.strUserDeptCode;
 	itemsApplyMan.applyPerson = top.strUserAccount;
 	itemsApplyMan.itemsApplyFlag = itemsApplyFlag;
 	itemsApplyMan.approvalFlag = approvalFlag;
 	return itemsApplyMan;
}

function packageItemsApplyMDetailData() {
	
	var row = datagrid.dataGridObj.datagrid('getRows');
	var rowLen = row.length;
    var rowsData = new Array();
    for(var i=0;i<rowLen;i++) {
		var editors = datagrid.dataGridObj.datagrid('getEditors', i);	
	 	
	 	var itemsApplyMDetail = new Object();
	 	//物品申领表PKitemsApplyMDetail.ItemsApplyMPK
	 	itemsApplyMDetail.categoryManagementPK = categoryPk;
	 	itemsApplyMDetail.itemManagePK = row[i].pk;
	 	itemsApplyMDetail.orgCode = top.strUserOrgCode;
	 	itemsApplyMDetail.itemsApplyDeptCode = top.strUserDeptCode;
	 	itemsApplyMDetail.imName = row[i].imName;
	 	itemsApplyMDetail.imAssetType = row[i].imAssetType;
	 	itemsApplyMDetail.imType = row[i].imType;
	 	itemsApplyMDetail.imSpecification= row[i].imSpecification;
	 	itemsApplyMDetail.imMetricUnit= row[i].imMetricUnit;
	 	itemsApplyMDetail.iamApplyCount = editors[0].target.numberbox('getValue');
	 	itemsApplyMDetail.iamListerCheckCount = editors[1].target.numberbox('getValue');
	 	itemsApplyMDetail.iamLeaderCheckCount = editors[2].target.numberbox('getValue');
	 	itemsApplyMDetail.iamItemManagePK = '';
	 	
   		rowsData.push(itemsApplyMDetail);
	}
	return rowsData;
}

/**
 * 新增
 **/
function addone() {
	/*if(!judgeOpeCollectOrg()) {
		return;
	}*/
 	window.location.href = "edititems.jsp?busitype=add";
}

//修改
function modifyone(pk){
		location.href='edititems.jsp?pk='+pk+'&busitype=modify';

}

/**
 * 删除
 **/
function deleteone(pk) {
	top.layer.open({
		title:'删除数据',
		icon: 3,
		area:['300px','160px'],
		btn:['确定', '取消'],
		content:'确定要删除选中的数据吗？',
		shift:1,
		closeBtn :2,
		yes: function(index){
			top.layer.close(index);
			deleteService(pk);		
	    }
	});	
}

/**
 * 发送删除请求
 **/
function deleteService(pk) {
	Ajax.service(
		'ItemManageBO',
		'deleteItem', 
		[pk],
		deleteServiceSuccFunc,
		serviceFailureFunc
	);
}

/**
 * 删除请求成功回调函数
 **/
function deleteServiceSuccFunc(data) {
	if(data!="null"&&data.length>0){
		top.layer.alert(data,{closeBtn :2,icon:5});
		changeBtnDisabled(false);
	}else{	    				
		top.layer.alert('删除成功 ',{icon:6,closeBtn :2});
		datagrid.query();
	}	
}

/**
 * 请求失败回调函数,删除，注销，撤销注销失败等均调用此方法
 **/
function serviceFailureFunc() {
	top.layer.alert('删除数据出现错误，请联系管理员 ',{icon:5,closeBtn :2});
} 


function initCategoryCombo() {
	$('#category').combobox({
		onBeforeLoad: function(param){
			ajaxCategory();
		},
		valueField:'pk',
		textField:'categoryName',
		width:180,
		height:26,
		panelHeight:100,
		editable:false
	});
}

function ajaxCategory(){
	Ajax.service(
		'CategoryManagementBO',
		'findAll', 
		[],
		function(result){
			$('#category').combobox("loadData",result);
		}
	);
}

function getImType() {
	var checkedQc = new Object();
	checkedQc.fn = '';
	checkedQc.oper = 14;
	var contratStatusDisplay=$('#imType').combobox('getValue');
	
	if (contratStatusDisplay== '2'){
		checkedQc.value1 = "(IMType = 'WPLB_001')";
	}else if(contratStatusDisplay== '3'){
		checkedQc.value1 = "(IMType = 'WPLB_002')";
	}else{
		checkedQc.value1 = "(1=1)";
	}
    return checkedQc;
}
