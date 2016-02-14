//列表表格对象
var datagrid = null;
var mainObj = new Object();
var approvalBusiType = "SPYWLX_001";
/**
 * 初始化方法
 **/ 
$(function () { 
	setAppenFrame();
	initDefaultValue();
	initDataGrid();
	initComBindFunc(); 
	initCategoryCombo();
	//setApprovalOption();
});

/**
 * 设置附件
 **/
function setAppenFrame() {    
	var appendFrameObj = document.getElementById('id_iframe_append');
	appendFrameObj.src = contextPath+'/core/componentmodule/upload/listCommonUpload.jsp?busitype=TYYWLX_003&controltype='+business+'&businesscode='+pk;
}

/** 
 * 获取附件数据
 **/
function getAppendData() {
	var appendFrameObj = document.getElementById('id_iframe_append').contentWindow;
	var appendData = appendFrameObj.getAppendData();
	return appendData;
}

function initDefaultValue() {
	if (pk) {
		//设置头信息
		$('#id_div_desc .head-title').html('修改申领登记');
		getItemsApplyByPk(pk);
	} else {
		$('#id_div_desc .head-title').html('新增申领登记');
		
		$("#id_itemsApplyDeptCode").val(top.strUserDeptName);
		$("#id_applyPerson").val(top.strUserName);
		$("#id_itemsApplyDate").val(serverDate);
		//getCategoryByPk(categoryPk);
		$("#id_categoryManagementPK").val(categoryName);
	}
	
}

//审批数据初始化
function setApprovalOption() {
	var apprvalOption = {
		funcType:"DrawApprovalBar", 
		approvalBarDivID:"id_div_approvaloption", 
		approvalButtonBarDivID:"id_span_buttonArea", 
		isReadonly:false, 
		busiDeptCode:"", 
		busiType:approvalBusiType, 
		busiPK:mainObj.pk, 
		busiOrgCode:mainObj.orgCode, 
		menuId:"MENU_01_06_02_02", 
		approvalFunc:approvalsave,
		validateFunc:function(){
			$("#tabs").tabs("select",2);
			return true;
		},
		busiDefaultValue:{
			linker:top.strUserName,
			operator:top.strUserName,
			auditer:top.strUserName,
			checker:top.strUserName
		}
	};
	var am = new ApprovalModule(apprvalOption);
	$("#tabs").tabs({
		onSelect:function(title,index){
			//切换标签时改变校验信息的显示/隐藏
			if(index==2){
				$("body").find(".validatebox-tip-content").css("display","block");
				$("body").find(".validatebox-tip-content").next().css("display","block");
			}else{
				$("body").find(".validatebox-tip-content").css("display","none");
				$("body").find(".validatebox-tip-content").next().css("display","none");
			}
		}
	});
}

//审批操作
function approvalsave(type,data){
	$('body').addLoading({msg:'正在保存数据，请等待...'});			    //打开遮挡层
	Ajax.service(
 			'LetRentBO',
 			'approvalLetRent', 
 			[mainObj,data,getAppendData(),type],
 			function(data){		
				var tips = "保存信息成功！";
				if(data != null && type != "1"){
					var nextOrgName = data.nextOrgCodeDisplay;//新生成的审批信息的审批单位名称
					var nextSysOrgCode = data.nextOrgCode;//新生成的审批信息的审批单位
					var Name = data.itemName;//审批栏名称
					var applyStatus = data.applyStatus;//申请单状态
					var approvalStatus = data.approvalStatus;//审批状态
					
					if(applyStatus == "审批中"){//审批中，提示信息
						if(top.strFilterOrgCode == nextSysOrgCode){//审批时，如果下一个审批单位跟当前审批单位不是同一个单位时，提示：上报后将提交到XX审核；
							tips = "上报后将提交到'"+nextOrgName+"'审核";
						}else{//审批时，如果下一个审批单位跟当前审批单位是同一个单位时，提示：上报后将提交到“审批栏名称”；
							tips = "上报后将提交到'"+ Name+"'";
						}
					}else if(applyStatus == "已审批通过"){//审批结束 1、退回到申请人 2、审批结束
						strTips="申请单审批结束";
					}else{
						strTips="审批成功";
					}
				}
 				top.layer.alert(tips,{closeBtn :2,icon:6});
	    		$('body').removeLoading();     // 关闭遮挡层
	    		history.go(-2);

 			},function(){
				$("body").removeLoading();
				top.layer.alert('审批操作出问题了，请联系管理员。',{closeBtn :2,icon:5});
 			}
 	  );
}

function getItemsApplyByPk(pk) {
	
	Ajax.service(
	  		'ItemsApplyManagementBO',
	  		'findById', 
	  		[pk],
	  		function(obj){
	  		 	mainObj = obj;
				//数据填充 
	      	 	dataFill(obj);
	      	 	//审批数据初始化
	      	 	setApprovalOption();
	  		},
	  		function(data){
	  			top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
	  		}
	  	);
}

function dataFill(obj) {
		categoryName = obj.categoryName;
		$("#id_categoryManagementPK").val(categoryName);
		$("#id_itemsApplyDeptCode").val(obj.itemsApplyDeptCodeDisplay);
		$("#id_applyPerson").val(obj.applyPersonDisplay);
		$("#id_itemsApplyDate").val(obj.itemsApplyDate);
		$("#id_itemsApplyRemark").val(obj.itemsApplyRemark);
		itemsApplyDeptCode = obj.itemsApplyDeptCode;
	 	applyPerson = obj.applyPerson;
}
/** 
 * 根据编码获取信息
 **/
/*function getCategoryByPk(pk) {
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
}*/

function initEditCell(){
	var row = datagrid.dataGridObj.datagrid('getRows');
	var rowLen = row.length;
	for (var i = 0; i < rowLen; i++) {
		datagrid.dataGridObj.datagrid('beginEdit', i);
	}
}
/**
 * 初始化表格信息
 **/
function initDataGrid() {
	 var _sortInfo = {"sortPK" : "pk","sortSql" : "lastestUpdate Desc"};
	 var _columns =  
	 [[
		{field:"imName",title:'物品名称',minwidth:80},
        {field:"imTypeDisplay",title:'类别',minwidth:80},
        {field:"imSpecification",title:'规格型号',minwidth:80},
		{field:"imMetricUnit",title:'单位',minwidth:80},
		{field:"iamApplyCount",title:'申领数量',minwidth:80,editor:{ type:'numberbox',options:{width:80},align:'right',fmType:'int'}},
		{field:"iamListerCheckCount",title:'经办人审核数量',minwidth:80,formatter:function(value){if(value == '0') return ""}},
		{field:"iamLeaderCheckCount",title:'行装科领导审核数量',minwidth:80,formatter:function(value){if(value == '0') return ""}}
		//{field:"checkCount",title:'经办人审核数量',minwidth:80,editor:{ type:'numberbox',options:{width:180},align:'right',fmType:'int'}},
		//{field:"leaderCheckCount",title:'行装科领导审核数量',minwidth:80,editor:{ type:'numberbox',options:{width:180},align:'right',fmType:'int'}}
	]];
	 
	 var dataGridOptions ={rownumbers:false,checkbox:true,isQuery:true,pagination:false,height:'auto',onLoadSuccess:initEditCell};
	 
	 var classID = 'ItemManageBO';
	 var customQueryCondition = setCustomQueryCondition1;
	 if (business == 'modify') {
		 classID = 'ItemsApplyMDetailBO';
		 customQueryCondition = setCustomQueryCondition2;
	 }
	 var customOptions = {tableID:'id_table_grid',classID:classID,columns:_columns,sortInfo:_sortInfo,customQCFunc:customQueryCondition};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}



//自定义查询条件
function setCustomQueryCondition1() {
	var customQCArr = new Array();
	//单位条件
	var categoryQc = new Object();
	categoryQc.fn = 'imCategoryPK';
	categoryQc.oper = ARY_STR_EQUAL[0];
	categoryQc.value1 = categoryPk;
	customQCArr.push(categoryQc);
    return customQCArr;
}

//自定义查询条件
function setCustomQueryCondition2() {
	var customQCArr = new Array();
	//单位条件
	var itemsApplyQc = new Object();
	itemsApplyQc.fn = 'itemsApplyMPK';
	itemsApplyQc.oper = ARY_STR_EQUAL[0];
	itemsApplyQc.value1 = pk;
	customQCArr.push(itemsApplyQc);
    return customQCArr;
}

/**
 * 为页面上的组件添加事件处理方法
 **/
function initComBindFunc() {
	$("#id_btn_save").click(function () {
		save();
	});
	$("#id_btn_report").click(function () {
		report();
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

function save() {
	var itemsApplyFlag = "WPSLZT_001";
	var itemsApplyManagement = packageItemsApplyManData(itemsApplyFlag);
	var itemsApplyMdetailList = packageItemsApplyMDetailData();
	debugger;
	if (pk) {
		summitEdit(itemsApplyMdetailList);
	} else {
		summitAdd(itemsApplyManagement,itemsApplyMdetailList);
	}
}

function summitAdd(itemsApplyManagement,itemsApplyMdetailList) {
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
					top.layer.alert('保存成功 ',{icon: 6, closeBtn:2});
					history.go(-1);
				}		
			}
		);
};

function summitEdit(itemsApplyMdetailList) {
	var itemsApplyRemark = $("#id_itemsApplyRemark").val();
	Ajax.service(
			'ItemsApplyManagementBO',
			'modifyItemApply', 
			 [pk,itemsApplyRemark,itemsApplyMdetailList],
			function(result){
				$('body').removeLoading();     // 关闭遮挡层
				//$("#id_btn_save").attr("disabled", false); // 按钮可点击
				if(result!=null&&result!=""){		
					top.layer.alert(result,{icon: 5, closeBtn:2});
				}else{
					top.layer.alert('修改成功 ',{icon: 6, closeBtn:2});
					history.go(-1);
				}		
			}
		);
};

function packageItemsApplyManData(itemsApplyFlag) {
	var itemsApplyMan = new Object();
	//itemsApplyMan.PK
	//itemsApplyMan.ItemsApplyCode
 	itemsApplyMan.categoryName = categoryName;
 	itemsApplyMan.categoryManagementPK = categoryPk;
 	itemsApplyMan.orgCode = top.strUserOrgCode;
 	itemsApplyMan.itemsApplyDeptCode = itemsApplyDeptCode;
 	itemsApplyMan.applyPerson = applyPerson;
 	itemsApplyMan.itemsApplyFlag = itemsApplyFlag;
 	itemsApplyMan.approvalFlag = approvalFlag;
 	itemsApplyMan.itemsApplyDate = $("#id_itemsApplyDate").val();
 	itemsApplyMan.itemsApplyRemark = $("#id_itemsApplyRemark").val();
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
	 	//itemsApplyMDetail.iamListerCheckCount = editors[1].target.numberbox('getValue');
	 	//itemsApplyMDetail.iamLeaderCheckCount = editors[2].target.numberbox('getValue');
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
