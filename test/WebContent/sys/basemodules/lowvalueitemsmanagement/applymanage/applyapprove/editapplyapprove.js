var mainObj = new Object();
var approvalBusiType = "SPYWLX_014";//物品申领审批路径
var approvalModule;
var approvalRole;//审批角色值 ，2：审核人，3：核准人
//加载完成执行 
$(function(){
	initAppend(); 		//加载附件页面
	getInfo();				//获取信息 
	//initDataGrid();
	buttonBind();
});

//按钮事件 
function buttonBind(){
	//返回页面
	$("#return").click(function(){history.go(-1);});
}

var approveStep = 0;

function getItemsApplyManagementByPk(itemsApplyMPK) {
	
	Ajax.service(
	  		'ItemsApplyManagementBO',
	  		'findById', 
	  		[itemsApplyMPK],
	  		function(obj){
	  			if (obj.linkers != null && obj.linkers != 'null') {
	  				var linkers = obj.linkers;
		  			approveStep =(linkers.split('|')).length - 1;
		  			//alert(approveStep)
	  			}
	  			
	  			initDataGrid();
	  		},
	  		function(data){
	  			top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
	  		}
	  	);
}


/**
 * 初始化表格信息，跟进审批角色初始化
 **/
function initDataGrid() {
	var iamListerCheckCountField = {field:"iamListerCheckCount",title:'经办人审核数量',minwidth:80,formatter:function(value){if (approveStep == 3 || approveStep == 4) return value;else return '';}};
	if (approvalRole == 2) {//审核人
		iamListerCheckCountField = {field:"iamListerCheckCount",title:'经办人审核数量',minwidth:80,editor:{ type:'numberbox',options:{min:0,width:80},align:'right',fmType:'int'}};
	}
	var iamLeaderCheckCountField = {field:"iamLeaderCheckCount",title:'行装科领导审核数量',minwidth:80,formatter:function(value){if (approveStep == 4) return value;else return '';}};
	if (approvalRole == 3) {//核准人
		iamLeaderCheckCountField = {field:"iamLeaderCheckCount",title:'行装科领导审核数量',minwidth:80,editor:{ type:'numberbox',options:{min:0,width:80},align:'right',fmType:'int'}};
	}
	
	 var _sortInfo = {"sortPK" : "pk","sortSql" : "lastestUpdate Desc"};
	 var _columns =  
	 [[
		{field:"imName",title:'物品名称',minwidth:80},
        {field:"imTypeDisplay",title:'类别',minwidth:80},
        {field:"imSpecification",title:'规格型号',minwidth:80},
		{field:"imMetricUnit",title:'单位',minwidth:80},
		{field:"iamApplyCount",title:'申领数量',minwidth:80},
		iamListerCheckCountField,
		iamLeaderCheckCountField
	]];
	 
	 var dataGridOptions ={rownumbers:false,checkbox:false,isQuery:true,pagination:false,height:'auto',onLoadSuccess:initEditCell};
	 
	 var customOptions = {tableID:'id_table_grid',classID:'ItemsApplyMDetailBO',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}

/**
 * 初始化可编辑单元格
 */
function initEditCell(){
	var row = datagrid.dataGridObj.datagrid('getRows');
	var rowLen = row.length;
	for (var i = 0; i < rowLen; i++) {
		datagrid.dataGridObj.datagrid('beginEdit', i);
	}
	//处理可编辑单元格输入框宽度
	if (approvalRole == 2) {
		var width = $("td[field=iamListerCheckCount]").children("div.datagrid-cell")[0].clientWidth;
		$(".datagrid-cell-c1-iamListerCheckCount").width(width);
	}
	if (approvalRole == 3) {
		var width = $("td[field=iamLeaderCheckCount]").children("div.datagrid-cell")[0].clientWidth;
		$(".datagrid-cell-c1-iamLeaderCheckCount").width(width);
	}
	
	
}

//自定义查询条件
function setCustomQueryCondition() {
	var customQCArr = new Array();
	//只查询本申领单的明细
	var mpkQc = new Object();
	mpkQc.fn = 'itemsApplyMPK';
	mpkQc.oper = ARY_STR_EQUAL[0];
	mpkQc.value1 = pk;
	customQCArr.push(mpkQc);
	//只查询明细申请数量大于0的
	var appCountQc = new Object();
	appCountQc.fn = 'iamApplyCount';
	appCountQc.oper = ARY_STR_NOTEQUAL[0];
	appCountQc.value1 = '0';
	customQCArr.push(appCountQc);
    return customQCArr;
}

//获取信息 
function getInfo(){
	Ajax.service('ItemsApplyManagementBO','findById',[pk],
			function(obj){
				mainObj = obj;
				//数据填充 
	      	 	dataFill(obj);
				
	      		//审批数据初始化
	      	 	setApprovalOption();
			},function(){
				top.layer.alert('数据异常 ',{closeBtn :2,icon:5});
			}
	);
}
//数据填充 
function dataFill(obj){
	$("#id_categoryManagementPK").val(obj.categoryName);
	$("#id_itemsApplyDeptCode").val(obj.itemsApplyDeptCodeDisplay);
	$("#id_applyPerson").val(obj.applyPersonDisplay);
	$("#id_itemsApplyDate").val(obj.itemsApplyDate);
	$("#id_itemsApplyRemark").val(obj.itemsApplyRemark);
}

function getApprovalRoleFn() {
	approvalRole = approvalModule.curNodeInfo.node.approvalRole;
	getItemsApplyManagementByPk(pk);
	//initDataGrid();
}
//审批数据初始化
function setApprovalOption() {
	var apprvalOption = {
		getApprovalSuccFunc:getApprovalRoleFn,
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
	approvalModule = new ApprovalModule(apprvalOption);
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
	var approvalItemMDtail = packageApprovalItemMDtail();
	
	$('body').addLoading({msg:'正在保存数据，请等待...'});			    //打开遮挡层
	Ajax.service(
 			'ItemsApplyManagementBO',
 			'approvalItemsApply', 
 			[mainObj,data,getAppendData(),type,approvalItemMDtail,approvalRole],
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

function packageApprovalItemMDtail() {
	var row = datagrid.dataGridObj.datagrid('getRows');
	var rowLen = row.length;
    var rowsData = new Array();
    for(var i=0;i<rowLen;i++) {
		var editors = datagrid.dataGridObj.datagrid('getEditors', i);	
	 	
	 	var itemsApplyMDetail = new Object();
	 	itemsApplyMDetail.pk = row[i].pk;
	 	if (approvalRole == 2) {
	 		itemsApplyMDetail.iamListerCheckCount = editors[0].target.numberbox('getValue');
	 	} else if (approvalRole == 3) {
	 		itemsApplyMDetail.iamLeaderCheckCount = editors[0].target.numberbox('getValue');
	 	}
   		rowsData.push(itemsApplyMDetail);
	}
    return rowsData;
}
/**
 * 设置附件
 **/
/*function setAppenFrame() {    
	var appendFrameObj = document.getElementById('id_iframe_append');
	appendFrameObj.src = contextPath+'/core/componentmodule/upload/listCommonUpload.jsp?busitype=TYYWLX_024&controltype='+STR_VIEW+'&businesscode='+pk;
}*/

/**
 * 设置附件
 **/
function initAppend() {
	var opt = {controlType:business,businessCode:pk,businessType:'TYYWLX_024'};
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