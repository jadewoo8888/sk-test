<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!DOCTYPE HTML>
<html> 
<head>
<link href="${contextPath}/sys/basemodules/lowvalueitemsmanagement/issuemange/editissueitem.css" rel="stylesheet" type="text/css" />
<script src="${contextPath}/sys/basemodules/lowvalueitemsmanagement/issuemange/editissueitem.js" type="text/javascript"></script>
<script> 
//查询pk
var pk="${param.pk}";//物品申领表PK
var categoryPk="${param.categoryPk}";//类目表PK
var categoryName="${param.categoryName}";
//业务类型
var business="${param.business}";
</script>
</head>
<body class="edit_body" style="background-color:white;" >
	<div id="id_div_desc" class="head">
		<span class="head-title">物品发放</span>
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
						<td class="Edit-Title1">备注</td><td  class="Edit-Input1" colspan="3"><textarea  id="id_itemsApplyRemark" fieldname="itemsApplyRemark" style='width:710px;resize: none' class="disableText"  readonly="readonly"></textarea></td>
					</tr>
					</table> 
					
					 <div style="height:50px;">
					 </div>                           		
			</div>
		</div> 
	     
	      <div title="附件" id="attached">
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
	    </div>  
	</div>
	<div style="background-color:white;height:100px;"></div>
	<div class="Editinput"><span id="id_span_buttonArea"></span>
		<input id="id_bt_issue" type="button" class="bt_ensure" value="发放"></input>
		<input id="id_bt_purchase" type="button" class="bt_ensure" value="申购"></input>
		<input id="return" type="button" class="bt_cancel" value="返回"></input>
	</div>

	</body>
</html>


