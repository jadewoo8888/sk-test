<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!DOCTYPE HTML>
<html> 
<head>
<link href="editpurchaseapply.css" rel="stylesheet" type="text/css" />
<script src="editpurchaseapply.js" type="text/javascript"></script>
<link href="${contextPath}/sys/basemodules/approval/approvalmodule/ApprovalModule.css" rel="stylesheet" type="text/css" />
<script src="${contextPath}/sys/basemodules/approval/approvalmodule/ApprovalModule.js" type="text/javascript"></script>
<script src="${contextPath}/core/componentmodule/upload/jquery.commonupload.js" type="text/javascript"></script>
<script>
//业务类型
var business="${param.business}";
var categoryPk="${param.categoryPk}";
//var categoryName="${param.categoryName}";
var categoryName="";
var pk="${param.pk}";
var ipItemsApplyMPK = "${param.ipItemsApplyMPK}";
</script>
<style type="text/css">
.datagrid-cell-check input{height:18px;width:15px;}
.datagrid-header-check input{height:18px;width:15px;}
</style>
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
								<td   class="Edit-Input1"><input id="id_ipApplyPerson" class="disableText" readonly="readonly"/></td>
								
								<td   class="Edit-Title1">申购日期</td>
								<td   class="Edit-Input1"><input  id="id_ipPurchaseDate"  fieldname="ipPurchaseDate" class="disableText" readonly="readonly"/></td>
							</tr>
							
					<!-- <tr>
						<td colspan="4">
						
						</td>
					</tr> -->
					
					<tr>
						<td class="Edit-Title1">备注</td><td  class="Edit-Input1" colspan="3"><textarea  id="id_ipRemark" fieldname="ipRemark" style='width:680px;resize: none' class="easyui-validatebox"   validType="length[1,125]"  invalidMessage="不能超过125个字符！"></textarea></td>
					</tr>
					</table> 
					
					 <div style="height:30px;">
					 </div>                           		
			</div>
			
			<div class="biao" style="background-color: white;margin-left: 220px; margin-bottom: 100px">
				<table id="id_table_grid">
				</table>
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
	    <!--审批按钮栏  -->
	<div class="Editinput"><span id="id_span_buttonArea"></span><input id="return" type="button" class="bt_cancel" value="返回"></input></div>
	</div>
	
	<div style="background-color:white;height:100px;"></div>
	
	
	<div class="Editinput">
		<input type="button" id="id_btn_save" class="bt_ensure" value="保存"></input>
		<input type="button" id="id_btn_report" class="bt_ensure" value="上报"></input>
		<input id="id_bt_return" type="button" class="bt_cancel" value="返回"></input>
	</div>

	</body>
</html>

