<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!DOCTYPE HTML>
<html> 
<head>
<link href="viewpurchaseapply.css" rel="stylesheet" type="text/css" />
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
var pk="${param.pk}";
var categoryPk = '';
//业务类型
var business=STR_VIEW;
var categoryName="${param.categoryName}";
var approvalBusiType = "SPYWLX_015";//物品采购审批路径

var auditRoleName = '';//审核角色名称
var checkRoleName = '';//核准角色名称

//加载完成执行 
$(function(){
	initComBindFunc();
	initAppend(); 		//加载附件页面
	getInfo();				//获取信息
	getItemsPurchasByPk(pk);
});
function initComBindFunc() {
	$("#id_btn_return").click(function () {
		var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
        parent.layer.close(index);
	}); 
	$("#id_btn_export").click(function () {
		datagrid.showExport();
	}); 
	
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

var approveStep = 0;

function getItemsPurchasByPk(ipDItemsPurchasePK) {
	
	Ajax.service(
	  		'ItemsPurchaseBO',
	  		'findById', 
	  		[ipDItemsPurchasePK],
	  		function(obj){
	  			if (obj.linkers != null && obj.linkers != 'null') {
	  				var linkers = obj.linkers;
		  			approveStep =(linkers.split('|')).length - 1;
	  			}
	  			getCategoryByPk(obj.ipCategoryPK);
	  			//initDataGrid();
	  			getApproveRoleName();
	  		},
	  		function(data){
	  			top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
	  		}
	  	);
}

/**
 * 获取审批路径名称
 */
function getApproveRoleName() {
	Ajax.service(
				'InApprovalProcessBO',
				 'getApprovalRole',
				[approvalBusiType,top.strUserOrgCode],			
			function(data){
					if (data != null & data.length > 0) {
						auditRoleName = data[0];//审核角色名称
						checkRoleName = data[1];//核准角色名称
					}
					initDataGrid();
			  },
			function(){
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
		{field:"ipDName",title:'物品名称',minwidth:100},
        {field:"ipDTypeDisplay",title:'类别',minwidth:60},
        {field:"ipDSpecification",title:'规格型号',minwidth:60},
		{field:"ipDMetricUnit",title:'单位',minwidth:60},
		{field:"ipDApplyCount",title:'申购数量',minwidth:60},
		{field:"ipDApproveCount",title:checkRoleName+'审核数量',minwidth:120,formatter:function(value){if (approveStep == 2) return value;else return '';}},
		{field:"ipDPurchaseCount",title:'采购数量',minwidth:80,formatter:function(value){if (approveStep == 2) return value;else return '';}},
		{field:"ipDStoreCount",title:'已入库数量',minwidth:80,formatter:function(value){if (approveStep == 2) return value;else return '';}}
	]];
	 
	 var dataGridOptions ={rownumbers:false,checkbox:false,isQuery:true,pagination:false,width:690,height:'auto',onLoadSuccess:null};
	 
	 var customOptions = {tableID:'id_table_grid',classID:'ItemsPurchaseDetailBO',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}

//自定义查询条件
function setCustomQueryCondition() {
	var customQCArr = new Array();
	//采购申请条件
	var qc = new Object();
	qc.fn = 'ipDItemsPurchasePK';
	qc.oper = ARY_STR_EQUAL[0];
	qc.value1 = pk;
	customQCArr.push(qc);
	/* //采购数量大于0
	var appCountQc = new Object();
	appCountQc.fn = 'ipDApplyCount';
	appCountQc.oper = ARY_STR_NOTEQUAL[0];
	appCountQc.value1 = '0';
	customQCArr.push(appCountQc); */
    return customQCArr;
}

//获取信息 
function getInfo(){
	Ajax.service('ItemsPurchaseBO','findById',[pk],
			function(obj){
				dataFill(obj);	
				
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
			},function(){
				top.layer.alert('数据异常 ',{closeBtn :2,icon:5});
			}
	);
}
//数据填充 
function dataFill(obj){
	$("#id_ipDeptCode").val(obj.ipDeptCodeDisplay);
	$("#id_ipApplyPerson").val(obj.ipApplyPersonDisplay);
	$("#id_ipPurchaseDate").val(obj.ipPurchaseDate);
	$("#id_ipRemark").val(obj.ipRemark);
}

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
								<td   class="Edit-Title1">申购部门</td>
								<td   class="Edit-Input1">
								<input id="id_ipDeptCode" fieldname="ipDeptCode" class="disableText" readonly="readonly"/>
								</td>
								<td   class="Edit-Title1">申购类目</td>
								<td   class="Edit-Input1">
								<input id="id_ipCategoryPK" fieldname="ipCategoryPK" class="disableText" readonly="readonly"/>
								</td>
							</tr>
							<tr>
								<td   class="Edit-Title1">申购人</td>
								<td   class="Edit-Input1"><input id="id_ipApplyPerson" fieldname="ipApplyPerson" class="disableText" readonly="readonly"/></td>
								
								<td   class="Edit-Title1">申购日期</td>
								<td   class="Edit-Input1"><input  id="id_ipPurchaseDate"  fieldname="ipPurchaseDate" class="disableText" readonly="readonly"/></td>
							</tr>
							
					<!-- <tr>
						<td colspan="4">
						
						</td>
					</tr> -->
					
					<tr>
						<td class="Edit-Title1">备注</td><td  class="Edit-Input1" colspan="3"><textarea  id="id_ipRemark" fieldname="ipRemark" style='width:678px;resize: none' class="easyui-validatebox"   validType="length[1,250]"  invalidMessage="不能超过250个字符！"></textarea></td>
					</tr>
					</table> 
					
					 <div style="height:30px;">
					 </div>                           		
			</div>
			
			<div class="biao" style="background-color: white;margin-left: 216px; margin-bottom: 100px">
							<table id="id_table_grid">
							</table>
						</div>
						
		</div> 
	     
	      <!-- <div title="附件" id="attached">
			<div class="pd10">
			   <div class="editItem">
			   		<div class="editlogo"></div>
	           		<div class="editTitle">采购申请附件</div>						           			
					<hr  class="editline"/>
	           	</div>
	            <div   class="editTips"></div> 
	
				<div style="margin-top:8px;margin-left:30px;">
					<iframe id='id_iframe_append' frameborder='no' border='0'  style='width:760px;height:350px'></iframe>
				</div>	
			</div>	
	    </div>   -->
	    
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


