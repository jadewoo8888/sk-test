<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!DOCTYPE HTML>
<html> 
<head>
<link href="viewapplyregister.css" rel="stylesheet" type="text/css" />
<link href="${contextPath}/sys/basemodules/approval/approvalmodule/ApprovalModule.css" rel="stylesheet" type="text/css" />
<style>
.colorblack{color: #000000;}
.notnullTip{color:red;vertical-align: middle;margin-left:3px;}
.View-Title1{width:200px;}
.View-Title2{width:200px;}
.editTips{text-align:left;}
#id_unitAdress{width:638px;}
.EditPanel{padding-left:10px;}
</style> 
<script src="${contextPath}/sys/basemodules/approval/approvalmodule/ApprovalModule.js" type="text/javascript"></script>
<script src="${contextPath}/core/componentmodule/upload/jquery.commonupload.js" type="text/javascript"></script>
<script> 
//查询pk
var itemsApplyMPK="${param.pk}";
//业务类型
var business=STR_VIEW;

//var mainObj = new Object();
var approvalBusiType = "SPYWLX_014";//物品申领审批路径

//加载完成执行 
$(function(){
	initComBindFunc();
	initAppend();//加载附件页面
	getInfo();				//获取信息 
	getItemsApplyManagementByPk(itemsApplyMPK);
	//initDataGrid();
});

/**
 * 为页面上的组件添加事件处理方法
 **/
function initComBindFunc() {
	$("#id_btn_return").click(function () {
		var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
        parent.layer.close(index);
	}); 
	$("#id_btn_export").click(function () {
		datagrid.showExport();
	}); 
	
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
		{field:"iamApplyCount",title:'申领数量',minwidth:80},
		{field:"iamListerCheckCount",title:'经办人审核数量',minwidth:80,formatter:function(value){if (approveStep == 3 || approveStep == 4) return value;else return '';}},
		{field:"iamLeaderCheckCount",title:'行装科领导审核数量',minwidth:80,formatter:function(value){if (approveStep == 4) return value;else return '';}}
	]];
	 
	/*  if (approveStep == 3) {alert()
		 _columns.push({field:"iamListerCheckCount",title:'经办人审核数量',minwidth:80});
	 } else if (approveStep == 4) {
		 _columns.push({field:"iamListerCheckCount",title:'经办人审核数量',minwidth:80});
		 _columns.push({field:"iamLeaderCheckCount",title:'行装科领导审核数量',minwidth:80});
	 } */
	 
	 var dataGridOptions ={rownumbers:false,checkbox:false,isQuery:true,pagination:false,height:'auto',onLoadSuccess:null};
	 
	 var customOptions = {tableID:'id_table_grid',classID:'ItemsApplyMDetailBO',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}

/**
 * 
 *自定义查询条件
 * 查询该申领单下所有不为0的明细
 */
function setCustomQueryCondition() {
	var customQCArr = new Array();
	
	var mpkQc = new Object();
	mpkQc.fn = 'itemsApplyMPK';
	mpkQc.oper = ARY_STR_EQUAL[0];
	mpkQc.value1 = itemsApplyMPK;
	customQCArr.push(mpkQc);
	
	var appCountQc = new Object();
	appCountQc.fn = 'iamApplyCount';
	appCountQc.oper = ARY_STR_NOTEQUAL[0];
	appCountQc.value1 = '0';//
	customQCArr.push(appCountQc);
    return customQCArr;
}

//获取信息 
function getInfo(){
	Ajax.service('ItemsApplyManagementBO','findById',[itemsApplyMPK],
			function(obj){
				dataFill(obj);	
				
				//初始化审批信息
				var apprvalOption = {
					funcType:"DrawApprovalBar", 
					approvalBarDivID:"id_div_approvaloption", 
					isReadonly:true, 
					busiDeptCode:obj.itemsApplyDeptCode, 
					busiType:approvalBusiType, 
					busiPK:obj.pk, 
					busiOrgCode:obj.orgCode, 
					menuId:"MENU_10_01_02"
				};
				var am = new ApprovalModule(apprvalOption);
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
</script>
</head>
<body class="edit_body" style="background-color:white;" >
	<div id="id_div_desc" class="head">
		<span class="head-title"></span>
		<span class="head-tx"></span>
	</div>
	
	<div  id="tabs" class="easyui-tabs clearfloat">	
		<div title="基本信息" id="basic" > 
			<div class="EditPanel" id="EditPanel" >			
		           	<div class="editItem">
						<hr  class="editline"/>
		           	</div>
                    <table cellSpacing=1 cellPadding=0>
                       		<tr>
								<td   class="Edit-Title1">申领部门</td>
								<td   class="Edit-Input1">
								<input id="id_itemsApplyDeptCode" fieldname="itemsApplyDeptCode" class="disableText" readonly="readonly"/>
								</td>
								<td   class="Edit-Title2">申领类目</td>
								<td   class="Edit-Input2">
								<input id="id_categoryManagementPK" fieldname="categoryManagementPK"  class="disableText" readonly="readonly"/>
								</td>
							</tr>
							<tr>
								<td   class="Edit-Title1">申领人</td>
								<td   class="Edit-Input1"><input id="id_applyPerson" fieldname="applyPerson" class="disableText" readonly="readonly"/></td>
								
								<td   class="Edit-Title2">申领日期</td>
								<td   class="Edit-Input2"><input  id="id_itemsApplyDate"  fieldname="itemsApplyDate" readonly="readonly"/></td>
							</tr>
							
					<tr>
						<td colspan="4">
						<div class="biao" style="background-color: white;">
							<table id="id_table_grid">
							</table>
						</div>
						</td>
					</tr>
					
					<tr>
						<td class="Edit-Title1">备注</td><td  class="Edit-Input1" colspan="3"><textarea  id="id_itemsApplyRemark" fieldname="itemsApplyRemark" style='width:580px;resize: none' class="disableText"  readonly="readonly"></textarea></td>
					</tr>
					</table> 
					
					 <div style="height:50px;">
					 </div>                           		
			</div>
		</div> 
	     
	    <div title="附件信息">
		    <div id='id_div_appendarea' style="margin-top:8px;margin-left:30px;">
		    </div>
		</div>
	    
	    <div title="审批意见" id="id_div_approvaloption">

	    </div>  
	    
	    <div title="审批路线图" id="approval_img">

	    </div> 
	</div>
	<div id="id_div_secondStep"  class="Editinput" style="width:100%;position:fixed;bottom:38px;padding-top:3px;padding-bottom:3px;padding-left:400px;background-color:#CCCCCC;">
		<input type="button" class="bt_ensure" value="导出" id="id_btn_export"></input>
		<input type="button" class="bt_cancel" value="返回" id="id_btn_return"></input>
	</div>
	</body>
</html>


