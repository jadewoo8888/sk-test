<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!DOCTYPE HTML>
<html> 
<head>
<link href="${contextPath}/sys/basemodules/lowvalueitemsmanagement/applymanage/applyapprove/editapplyapprove.css" rel="stylesheet" type="text/css" />
<link href="${contextPath}/sys/basemodules/approval/approvalmodule/ApprovalModule.css" rel="stylesheet" type="text/css" />
<script src="${contextPath}/sys/basemodules/approval/approvalmodule/ApprovalModule.js" type="text/javascript"></script>
<script src="${contextPath}/sys/basemodules/lowvalueitemsmanagement/applymanage/applyapprove/editapplyapprove.js" type="text/javascript"></script>
<script src="${contextPath}/core/componentmodule/upload/jquery.commonupload.js" type="text/javascript"></script>
<script> 
//查询pk
var pk="${param.pk}";
//业务类型
var business="${param.business}";
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
								<td   class="Edit-Input2"><input  id="id_itemsApplyDate" class="disableText" fieldname="itemsApplyDate" readonly="readonly"/></td>
							</tr>
							
					<!-- <tr>
						<td colspan="4">
						
						</td>
					</tr> -->
					
					<tr>
						<td class="Edit-Title1">备注</td><td  class="Edit-Input1" colspan="3"><textarea  id="id_itemsApplyRemark" fieldname="itemsApplyRemark" style='width:658px;resize: none' class="disableText" readonly="readonly"></textarea></td>
					</tr>
					</table> 
					
					 <div style="height:30px;">
					 </div>                           		
			</div>
			<div class="biao" style="background-color: white;margin-left: 270px; margin-bottom: 100px">
							<table id="id_table_grid">
							</table>
						</div>
		</div> 
	     
	     <!--  <div title="附件" id="attached">
			<div class="pd10">
			   <div class="editItem">
			   		<div class="editlogo"></div>
	           		<div class="editTitle">申领附件</div>						           			
					<hr  class="editline"/>
	           	</div>
	            <div   class="editTips"></div> 
	
				<div style="margin-top:8px;margin-left:30px;">
					<iframe id='id_iframe_append' frameborder='no' border='0'  style='width:760px;height:350px'></iframe>
				</div>	
			</div>	
	    </div>  --> 
	    
	    <div title="附件信息">
		    <div id='id_div_appendarea' style="margin-top:8px;margin-left:30px;">
		    </div>
		</div>
	    
	    <div title="审批意见" id="id_div_approvaloption">

	    </div>  
	    
	    <div title="审批路线图" id="approval_img">

	    </div>  
	     
	</div>
	<div style="background-color:white;height:100px;"></div>
	<div class="Editinput"><span id="id_span_buttonArea"></span><input id="return" type="button" class="bt_cancel" value="返回"></input></div>

	</body>
</html>


