<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!DOCTYPE HTML>
<html> 
<head>
<link href="editapplyregister.css" rel="stylesheet" type="text/css" />
<script src="editapplyregister.js" type="text/javascript"></script>
<link href="${contextPath}/sys/basemodules/approval/approvalmodule/ApprovalModule.css" rel="stylesheet" type="text/css" />
<script src="${contextPath}/sys/basemodules/approval/approvalmodule/ApprovalModule.js" type="text/javascript"></script>
<script>
//业务类型
var business="${param.business}";
//
var categoryPk="${param.categoryPk}";
var pk="${param.pk}";
//var itemsApplyMPK = "${param.itemsApplyMPK}";
//
//var itemsApplyFlag = "WPSLZT_001";
var approvalFlag = "佛山市禅城区人民法院部门领导驳回";
var itemsApplyDeptCode = top.strUserDeptCode;
var applyPerson = top.strUserAccount;
var categoryName="${param.categoryName}";
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
								<td   class="Edit-Title2">申领部门</td>
								<td   class="Edit-Input2">
								<input id="id_itemsApplyDeptCode" fieldname="itemsApplyDeptCode" validType="length[1,50]" invalidMessage="不能超过25个字符" class="easyui-validatebox" readonly="readonly"/>
								</td>
								<td   class="Edit-Title2">申领类目</td>
								<td   class="Edit-Input2">
								<input id="id_categoryManagementPK" fieldname="categoryManagementPK" validType="length[1,50]" invalidMessage="不能超过25个字符" class="easyui-validatebox" readonly="readonly"/>
								</td>
							</tr>
							<tr>
								<td   class="Edit-Title2">申领人</td>
								<td   class="Edit-Input2"><input id="id_applyPerson" fieldname="applyPerson" validType="length[1,50]" invalidMessage="不能超过25个字符" class="easyui-validatebox" readonly="readonly"/></td>
								
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
						<td class="Edit-Title2">备注</td><td  class="Edit-Input2" colspan="3"><textarea  id="id_itemsApplyRemark" fieldname="itemsApplyRemark" style='width:710px;resize: none' class="easyui-validatebox"   validType="length[1,250]"  invalidMessage="不能超过250个字符！"></textarea></td>
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
	           		<div class="editTitle">资产附件</div>						           			
					<hr  class="editline"/>
	           	</div>
	            <div   class="editTips"></div> 
	
				<div style="margin-top:8px;margin-left:30px;">
					<iframe id='id_iframe_append' frameborder='no' border='0'  style='width:760px;height:350px'></iframe>
				</div>	
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

