//列表表格对象
var datagrid = null;
var mainObj = new Object();
var approvalBusiType = "SPYWLX_014";
/**
 * 初始化方法
 **/ 
$(function () { 
	initDefaultValue();
	initDataGrid();
	initComBindFunc(); 
	setAppenFrame();
});

/**
 * 初始化默认值
 */
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
		$("#id_categoryManagementPK").val(categoryName);
	}
}

/**
 * 根据PK获取物品申领一条，并赋值给相应的字段
 * @param pk
 */
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
		//itemsApplyDeptCode = obj.itemsApplyDeptCode;
	 	//applyPerson = obj.applyPerson;
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
		{field:"iamApplyCount",title:'申领数量',minwidth:80,editor:{ type:'numberbox',options:{min:1},align:'right',fmType:'int'}},
		{field:"iamListerCheckCount",title:'经办人审核数量',minwidth:80,formatter:function(value){if(value == '0') return "";else return value;}},
		{field:"iamLeaderCheckCount",title:'行装科领导审核数量',minwidth:80,formatter:function(value){if(value == '0') return "";else return value;}}
	]];
	 
	 var dataGridOptions ={rownumbers:false,checkbox:true,isQuery:true,pagination:false,height:'auto',onLoadSuccess:initEditCell};
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
	//编辑单元格的宽带会被框架样式（审批的样式）覆盖，这里处理覆盖的样式
	var width = $("td[field=iamApplyCount]").children("div.datagrid-cell")[0].clientWidth;
	var cssWidth = 'width:'+width+'px!important;';
	$(".datagrid-cell-c1-iamApplyCount").css("cssText",cssWidth);
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
	itemsApplyQc.value1 = pk;
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
	var itemsApplyManagement = packageItemsApplyManData();
	var itemsApplyMdetailList = packageItemsApplyMDetailData();
	if (pk) {
		summitEdit(itemsApplyMdetailList,ifReport);
	} else {
		summitAdd(itemsApplyManagement,itemsApplyMdetailList,ifReport);
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
			 [pk,itemsApplyRemark,itemsApplyMdetailList,ifReport,getAppendData()],
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
	
	var row = datagrid.dataGridObj.datagrid('getRows');
	var rowLen = row.length;
    var rowsData = new Array();
    for(var i=0;i<rowLen;i++) {
		var editors = datagrid.dataGridObj.datagrid('getEditors', i);	
	 	
	 	var itemsApplyMDetail = new Object();
	 	itemsApplyMDetail.categoryManagementPK = categoryPk;
	 	itemsApplyMDetail.itemManagePK = row[i].pk;
	 	itemsApplyMDetail.orgCode = top.strFilterOrgCode;
	 	itemsApplyMDetail.itemsApplyDeptCode = top.strUserDeptCode;
	 	itemsApplyMDetail.imName = row[i].imName;
	 	itemsApplyMDetail.imAssetType = row[i].imAssetType;
	 	itemsApplyMDetail.imType = row[i].imType;
	 	itemsApplyMDetail.imSpecification= row[i].imSpecification;
	 	itemsApplyMDetail.imMetricUnit= row[i].imMetricUnit;
	 	itemsApplyMDetail.iamApplyCount = editors[0].target.numberbox('getValue');
	 	itemsApplyMDetail.iamItemManagePK = row[i].pk;
	 	
   		rowsData.push(itemsApplyMDetail);
	}
	return rowsData;
}

/**
 * 设置附件
 **/
function setAppenFrame() {    
	var appendFrameObj = document.getElementById('id_iframe_append');
	appendFrameObj.src = contextPath+'/core/componentmodule/upload/listCommonUpload.jsp?busitype=TYYWLX_024&controltype='+business+'&businesscode='+pk;
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
		menuId:"MENU_10_01_02", 
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
