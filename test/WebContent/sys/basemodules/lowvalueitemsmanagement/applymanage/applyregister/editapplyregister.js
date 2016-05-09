//列表表格对象
var datagrid = null;
var mainObj = new Object();
var approvalBusiType = "SPYWLX_014";//物品申领审批路径

var auditRoleName = '';//审核角色名称
var checkRoleName = '';//核准角色名称

/**
 * 初始化方法
 **/ 
$(function () { 
	initDefaultValue();
	//getApproveRoleName();
	//initDataGrid();
	initComBindFunc(); 
	initAppend();
});

/**
 * 初始化默认值
 */
function initDefaultValue() {
	if (itemsApplyMPK) {
		//设置头信息
		$('#id_div_desc .head-title').html('修改申领登记');
		getItemsApplyByPk(itemsApplyMPK);
	} else {
		$('#id_div_desc .head-title').html('新增申领登记');
		getCategoryByPk(categoryPk);
		initDataGrid(false);
	}
}

function getCategoryByPk(categoryPk) {
	
	Ajax.service(
	  		'CategoryManagementBO',
	  		'findById', 
	  		[categoryPk],
	  		function(obj){
	  			categoryName = obj.categoryName;
	  			$("#id_categoryManagementPK").val(categoryName);
	  			$("#id_itemsApplyDeptCode").val(top.strUserDeptName);
	  			$("#id_applyPerson").val(top.strUserName);
	  			$("#id_itemsApplyDate").val(serverDate);
	  			$("#id_categoryManagementPK").val(categoryName);
	  		},
	  		function(data){
	  			top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
	  		}
	  	);
}

/**
 * 根据PK获取物品申领一条，并赋值给相应的字段
 * @param itemsApplyMPK
 */
function getItemsApplyByPk(itemsApplyMPK) {
	
	Ajax.service(
	  		'ItemsApplyManagementBO',
	  		'findById', 
	  		[itemsApplyMPK],
	  		function(obj){
	  		 	mainObj = obj;
				//数据填充 
	      	 	dataFill(obj);
	      	 	//审批数据初始化
	      	 	//setApprovalOption();
	  		},
	  		function(data){
	  			top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
	  		}
	  	);
}

/**
 * 字段赋值
 * @param obj
 */
function dataFill(obj) {
		categoryName = obj.categoryName;
		$("#id_categoryManagementPK").val(categoryName);
		$("#id_itemsApplyDeptCode").val(obj.itemsApplyDeptCodeDisplay);
		$("#id_applyPerson").val(obj.applyPersonDisplay);
		$("#id_itemsApplyDate").val(obj.itemsApplyDate);
		$("#id_itemsApplyRemark").val(obj.itemsApplyRemark);
		getApproveRoleName(obj.orgCode);
}

/**
 * 获取审批路径名称
 */
function getApproveRoleName(imOrgcode) {
	Ajax.service(
				'InApprovalProcessBO',
				 'getApprovalRole',
				[approvalBusiType,imOrgcode],			
			function(data){
					if (data != null & data.length > 0) {
						auditRoleName = data[0];//审核角色名称
						checkRoleName = data[1];//核准角色名称
					}
					initDataGrid(true);
			  },
			function(){
				  top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
			}
		);

}

function checkIamApplyCount(value) {
	if(value < 1) {
		top.layer.alert('申领数量不能小于1',{closeBtn :2,icon:7});
	}
}
/**
 * 初始化表格信息
 * isItemOrg 是否有单据单位
 **/
function initDataGrid(isItemOrg) {//新增时，读取物品列表。修改时，读取的是物品申领管理明细表
	
	 var _sortInfo = {"sortPK" : "pk","sortSql" : "lastestUpdate Desc"};
	 var _columns =  
	 [[
		{field:"imName",title:'物品名称',minwidth:isItemOrg ? 90:150},//物品和物品申领管理明细表的字段一样
        {field:"imTypeDisplay",title:'类别',minwidth:isItemOrg ? 60:120},//物品和物品申领管理明细表的字段一样
        {field:"imSpecification",title:'规格型号',minwidth:isItemOrg ? 70:120},//物品和物品申领管理明细表的字段一样
		{field:"imMetricUnit",title:'单位',minwidth:isItemOrg ? 50: 100},//物品和物品申领管理明细表的字段一样
		{field:"iamApplyCount",title:'申领数量',minwidth:isItemOrg ? 80 : 150,editor:{ type:'numberbox',options:{onChange:checkIamApplyCount,width:60},align:'right',fmType:'int'}},
		{field:"iamListerCheckCount",hidden:!isItemOrg,title:auditRoleName+'审核数量',minwidth:140,formatter:function(value){if(value == '0') return "";else return value;}},
		{field:"iamLeaderCheckCount",hidden:!isItemOrg,title:checkRoleName+'审核数量',minwidth:130,formatter:function(value){if(value == '0') return "";else return value;}}
	]];
	 
	 var dataGridOptions ={rownumbers:false,checkbox:true,isQuery:true,pagination:false,width:690,height:'auto',onLoadSuccess:initEditCell};
	 /**如果是新增，直接读取类目的所有物品**/
	 var classID = 'ItemManageBO';
	 var customQueryCondition = setCustomQueryCondition1;
	 if (business == STR_REGISTER_MODIFY) {//如果是修改，读取申领明细列表。
		 classID = 'ItemsApplyMDetailBO';
		 customQueryCondition = setCustomQueryCondition2;
	 }
	 var customOptions = {tableID:'id_table_grid',classID:classID,columns:_columns,sortInfo:_sortInfo,customQCFunc:customQueryCondition};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}
/**初始化编辑的单元格**/
function initEditCell(){
	var row = datagrid.dataGridObj.datagrid('getRows');
	var rowLen = row.length;
	for (var i = 0; i < rowLen; i++) {
		datagrid.dataGridObj.datagrid('beginEdit', i);
	}
}

//新增的自定义查询条件
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

//修改的自定义查询条件
function setCustomQueryCondition2() {
	var customQCArr = new Array();
	//单位条件
	var itemsApplyQc = new Object();
	itemsApplyQc.fn = 'itemsApplyMPK';
	itemsApplyQc.oper = ARY_STR_EQUAL[0];
	itemsApplyQc.value1 = itemsApplyMPK;
	customQCArr.push(itemsApplyQc);
    return customQCArr;
}

/**
 * 为页面上的组件添加事件处理方法
 **/
function initComBindFunc() {
	$("#id_btn_save").click(function () {
		save(false);
	});
	$("#id_btn_report").click(function () {
		save(true);//上报
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

/**
 * 
 * @param ifReport 是否上报
 */
function save(ifReport) {
	
	var checkRows = $('#id_table_grid').datagrid('getChecked');
	var checkRowsLen = checkRows.length;
	if (checkRowsLen < 1) {
		var msg = '请选择要申领的物品，并填写申领数量！';
		if (itemsApplyMPK) {
			msg = '请选择要修改物品！';
		}
		top.layer.alert(msg,{closeBtn :2,icon:7});
	} else {
		$("#id_btn_save").attr("disabled", true);
		top.layer.open({
			title:'保存申领登记信息',
			icon: 3,
			area:['300px','150px'],
			btn:['确定', '取消'],
			content:'你确定要保存申领登记信息吗？',
			shift:1,
			closeBtn :2,
			yes: function(index){
					$('body').addLoading({msg:'正在保存数据，请等待...'});			    //打开遮挡层		
					
					var itemsApplyManagement = packageItemsApplyManData();
					var itemsApplyMdetailList = packageItemsApplyMDetailData();
					if (itemsApplyMPK) {
						summitEdit(itemsApplyMdetailList,ifReport);
					} else {
						summitAdd(itemsApplyManagement,itemsApplyMdetailList,ifReport);
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
 * @param itemsApplyManagement 申购单
 * @param itemsApplyMdetailList 申购单明细列表
 * @param ifReport 是否上报
 */
function summitAdd(itemsApplyManagement,itemsApplyMdetailList,ifReport) {
	Ajax.service(
			'ItemsApplyManagementBO',
			'addItemApply', 
			 [itemsApplyManagement,itemsApplyMdetailList,ifReport,getAppendData()],
			function(result){
				$('body').removeLoading();     // 关闭遮挡层
				$("#id_btn_save").attr("disabled", false); // 按钮可点击
				if(result!=null&&result!=""){		
					top.layer.alert(result,{icon: 5, closeBtn:2});
				}else{
					top.layer.alert(ifReport?'上报成功 ':'保存成功',{icon: 6, closeBtn:2});
					history.go(-1);
				}		
			}
		);
};

/**
 * 修改
 * @param itemsApplyMdetailList 申购单明细列表
 * @param ifReport 是否上报
 */
function summitEdit(itemsApplyMdetailList,ifReport) {
	var itemsApplyRemark = $("#id_itemsApplyRemark").val();//备注
	Ajax.service(
			'ItemsApplyManagementBO',
			'modifyItemApply', 
			 [itemsApplyMPK,itemsApplyRemark,itemsApplyMdetailList,ifReport,getAppendData()],
			function(result){
				$('body').removeLoading();     // 关闭遮挡层
				$("#id_btn_save").attr("disabled", false); // 按钮可点击
				if(result!=null&&result!=""){		
					top.layer.alert(result,{icon: 5, closeBtn:2});
				}else{
					top.layer.alert(ifReport?'上报成功 ':'修改成功 ',{icon: 6, closeBtn:2});
					history.go(-1);
				}		
			}
		);
};

/**
 * 
 * 打包申购单
 */
function packageItemsApplyManData() {
	var itemsApplyMan = new Object();
 	itemsApplyMan.categoryName = categoryName;
 	itemsApplyMan.categoryManagementPK = categoryPk;
 	itemsApplyMan.orgCode = top.strFilterOrgCode;
 	itemsApplyMan.itemsApplyDeptCode = top.strUserDeptCode;
 	itemsApplyMan.applyPerson = top.strUserAccount;
 	//itemsApplyMan.approvalFlag = approvalFlag;
 	itemsApplyMan.itemsApplyDate = $("#id_itemsApplyDate").val();
 	itemsApplyMan.itemsApplyRemark = $("#id_itemsApplyRemark").val();
 	return itemsApplyMan;
}

/**
 * 
 * 打包申购单明细
 */
function packageItemsApplyMDetailData() {
	
	var checkRows = $('#id_table_grid').datagrid('getChecked');//很奇怪，通过getChecked得到的列和编辑值顺序是倒过来的，即不对应。所以只能用笨的办法来处理。哎
	var checkRowsLen = checkRows.length;
	
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
			 
			 var itemsApplyMDetail = new Object();
			 	//新增时，读取物品列表。修改时，读取的是物品申领管理明细表
			 	if (itemsApplyMPK) {//如果是修改
			 		itemsApplyMDetail.pk = allRows[i].pk;//物品申领管理明细表PK
			 	} else {
			 		itemsApplyMDetail.categoryManagementPK = categoryPk;
			 		itemsApplyMDetail.itemManagePK = allRows[i].pk;//物品PK
			 		itemsApplyMDetail.iamItemManagePK = allRows[i].pk;
			 		itemsApplyMDetail.imName = allRows[i].imName;
				 	itemsApplyMDetail.imAssetType = allRows[i].imAssetType;
				 	itemsApplyMDetail.imType = allRows[i].imType;
				 	itemsApplyMDetail.imSpecification= allRows[i].imSpecification;
				 	itemsApplyMDetail.imMetricUnit= allRows[i].imMetricUnit;
				 	itemsApplyMDetail.orgCode = top.strFilterOrgCode;
				 	itemsApplyMDetail.itemsApplyDeptCode = top.strUserDeptCode;
			 	}
			 	
			 	var appCount = editors[0].target.numberbox('getValue');
			 	if (appCount < 1) {
			 		top.layer.alert('申领数量不能小于1',{closeBtn :2,icon:7});
			 		
			 		$('body').removeLoading();     // 关闭遮挡层
					$("#id_btn_save").attr("disabled", false); // 按钮可点击
					
			 		return;
			 	}
			 	itemsApplyMDetail.iamApplyCount = appCount;
		   		rowsData.push(itemsApplyMDetail);
		 }
	}
	return rowsData;
}

/**
 * 设置附件
 **/
function initAppend() {
	var opt = {controlType:business,businessCode:itemsApplyMPK,businessType:'TYYWLX_024'};
	$('#id_div_appendarea').commonupload(opt);
}

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
function setApprovalOption() {
	var apprvalOption = {
		funcType:"DrawApprovalBar", 
		approvalBarDivID:"id_div_approvaloption", 
		approvalButtonBarDivID:"id_span_buttonArea", 
		isReadonly:false, 
		busiDeptCode:mainObj.itemsApplyDeptCode, 
		busiType:approvalBusiType, 
		busiPK:mainObj.pk, 
		busiOrgCode:mainObj.orgCode, 
		menuId:"M160113AB", 
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
 			'ItemsApplyManagementBO',
 			'approvalItemsApply', 
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
