<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!DOCTYPE HTML>
<html> 
<head>
<link href="editapplyregister.css" rel="stylesheet" type="text/css" />
<script src="editapplyregister.js" type="text/javascript"></script>
<script>
//业务类型
var business="${param.business}";
//
var categoryPk="${param.categoryPk}";
//
var categoryName = "";
//var itemsApplyFlag = "WPSLZT_001";
var approvalFlag = "佛山市禅城区人民法院部门领导驳回";
//var categoryName="${param.categoryName}";
/* //招租方式
var data_letRentWay=${json:classify("STD_ZZFS")};
//拟出租用途

var data_planLetPurpose=${json:classify("STD_DYYT")};
//是、否 
var data_YesNo=${json:classify("STD_YesNo")};
//物业分类
var data_unitClassify=${json:classify("STD_DYFL")}; */

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
								<input id="id_itemsApplyDeptCode" fieldname="itemsApplyDeptCode" validType="length[1,50]" invalidMessage="不能超过25个字符" class="easyui-validatebox" readonly="readonly"/>
								</td>
								<td   class="Edit-Title2">申领类目</td>
								<td   class="Edit-Input2">
								<input id="id_categoryManagementPK" fieldname="categoryManagementPK" validType="length[1,50]" invalidMessage="不能超过25个字符" class="easyui-validatebox" readonly="readonly"/>
								</td>
							</tr>
							<tr>
								<td   class="Edit-Title1">申领人</td>
								<td   class="Edit-Input1"><input id="id_applyPerson" fieldname="applyPerson" validType="length[1,50]" invalidMessage="不能超过25个字符" class="easyui-validatebox" readonly="readonly"/></td>
								
								<td   class="Edit-Title2">申领日期</td>
								<td   class="Edit-Input2"><input  id="id_itemsApplyDate"  fieldname="itemsApplyDate" readonly="readonly"/></td>
							</tr>
					 </table> 
					
					<div class="biao" style="background-color: white;">
						<table id="id_table_grid">
						</table>
					</div>
					
					 <div style="height:50px;">
					 </div>                           		
			</div>
		</div> 
	     
	</div>
	<div style="background-color:white;height:100px;"></div>
	<div class="Editinput">
		<input type="button" id="id_btn_save" class="bt_ensure" value="保存"></input>
		<input type="button" id="id_btn_report" class="bt_ensure" value="上报"></input>
		<input id="return" type="button" class="bt_cancel" value="返回"></input>
	</div>

	</body>
</html>

