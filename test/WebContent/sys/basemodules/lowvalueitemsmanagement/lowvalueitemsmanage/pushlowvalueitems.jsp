<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!DOCTYPE HTML>
<html> 
<head>
<link href="pushlowvalueitems.css" rel="stylesheet" type="text/css" />
<script src="pushlowvalueitems.js" type="text/javascript"></script>
<script>
//业务类型
var business="${param.business}";
var categoryPk="${param.categoryPk}";
var pk="${param.pk}";
var categoryName="${param.categoryName}";
</script>
<style type="text/css">
.datagrid-cell-check input{height:18px;width:15px;}
.datagrid-header-check input{height:18px;width:15px;}
</style>
</head>
<body class="edit_body" style="background-color:white;" >
	<div id="id_div_desc" class="head">
		<span class="head-title">低值品入库</span>
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
								<td   class="Edit-Title1">入库类目</td>
								<td   class="Edit-Input1">
								<input id="id_categoryManagementPK" fieldname="categoryManagementPK" class="disableText" readonly="readonly"/>
								</td>
								<td   class="Edit-Title1">入库日期</td>
								<td   class="Edit-Input1"><input  id="id_itemsApplyDate"  fieldname="itemsApplyDate" class="disableText" readonly="readonly"/></td>
							</tr>
							<tr>
							<td   class="Edit-Title1">入库部门</td>
								<td   class="Edit-Input1">
								<input id="id_itemsApplyDeptCode" fieldname="itemsApplyDeptCode" class="disableText" readonly="readonly"/>
								</td>
								<td   class="Edit-Title1">入库人</td>
								<td   class="Edit-Input1"><input id="id_applyPerson" fieldname="applyPerson" class="disableText" readonly="readonly"/></td>
								
							</tr>
							
					<tr>
						<td colspan="4">
						<div class="biao" style="background-color: white;">
							<table id="id_table_grid">
							</table>
						</div>
						</td>
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
	           		<div class="editTitle">入库附件</div>						           			
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
	<div class="Editinput"><input type="button" id="id_btn_save" class="bt_ensure" value="保存"></input><input id="id_bt_return" type="button" class="bt_cancel" value="返回"></input></div>

	</body>
</html>

