<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>
<%@ page language="java" import="framework.modules.user.domain.User"%>
<%@ page language="java" import="framework.sys.constant.SessionConstants"%>
<%
request.setCharacterEncoding("utf-8");
User user =(User)session.getAttribute(SessionConstants.OPERATEUSER);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <script type="text/javascript" src="${contextPath}/sys/basemodules/rolemodules/editrole.js"></script> 
	<script type="text/javascript" src="${contextPath}/core/js/tools/xmlstringtrans.js" ></script>
<script type="text/javascript">
//角色编号 
var groupCode="${param.groupCode}";
//事务 
var business="${param.business}";
//操作用户  
var userAccount="<%=user.getUserAccount()%>";
//单位级别 
var groupOrgClassData=${json:classify("STD_OrgClass")};
</script>
<style type="text/css">
body{ width:100%;height:100%;}

.functioninput{
	width:80px;
	height:260px;
	float:left;
	margin-left:10px;
}
.functionTree{
	float:left;
 	margin-left:10px; 
 	width:200px;
 	height:260px;
 	padding-top:10px;
 	border: 1px solid #e2e2e2;
 	overflow:auto;
 }
/*easyui控件样式*/
.combo{margin-left:10px;}
.combo{border-color:#e2e2e2;}
/*表单字体样式*/
.table_edit{
font-size: 14px;
background-color:white;
height:480px;
margin-left:25px;
}
.table_edit label{
width:100px;
display:block;
float:left; 
margin:0 auto;
text-align:right;
color:#474747;
}
.tb_row input{margin-left:10px;}
.tb_row label span{color:red;}
.table_edit .tb_row{height:38px;line-height:36px;clear:both;}
/*加入横线,不要横线去掉改样式*/
/*
.table_edit .tb_row{border-bottom:1px solid #F7F7F7;}
*/
.table_edit .tb_row_zd{height:260px;line-height:260px;clear:both;margin-top:5px;}
</style>
</head> 
<body class="edit_body"> 
	<div id="id_div_desc" class="head" >
		<span id="businesstext" class="head-title">新增角色</span>
		<span class="head-tx"></span>
	</div>
	
	<div style="background-color:white;padding:10px;">
	<div class="table_edit  EditPanel">
		<form id="ff" method="post" class="easyui-form" data-options="novalidate:true">
		<input id="groupCheckFlag" type="hidden" name="groupCheckFlag" />
	     
	    <div   class="tb_row">   
	        <label>角色<span>*</span>:</label>
	        <input type="text" name="groupName"  class="easyui-validatebox" required="true" missingMessage="不能为空" />   
	    </div> 
	    
	    <div   class="tb_row">   
	        <label>角色编码<span>*</span>:</label>
	        <input type="text" id="groupCode" name="groupCode" class="easyui-validatebox" required="true" missingMessage="不能为空"/>   
	    </div> 
	    	    
	    <div 	class="tb_row">   
	        <label>角色说明<span>*</span>:</label>
	        <input type="text" name="groupRemark" class="easyui-validatebox" required="true" missingMessage="不能为空"/>   
	    </div> 
	    
	    <div  	class="tb_row">   
	        <label>单位级别<span>*</span>:</label>
	        <input type="text" id="groupOrgClass"  class="easyui-combobox "  editable="false" required="true"  missingMessage="必选项"  data-options="height:28,width:202,valueField:'classifyCode',textField:'classifyName'"/>   
	    </div>
	    <div  	class="tb_row">   
	        <label>角色类型<span>*</span>:</label>
	        <input type="text" id="groupTypeCode"  class="easyui-combobox "  editable="false" required="true"  missingMessage="必选项"  data-options="height:28,width:202,valueField:'groupTypeCode',textField:'groupTypeName'"/>   
	    </div>
	     
	    <div  	class="tb_row_zd">
            <label>功能权限:</label>
            <div  class="functionTree">
            	<div>
					<ul id="rolefunctiontree" class="ztree"></ul>
		    	</div>
            </div>
            <div  class="functioninput">
            	<input type="button" style="margin-top:150px"  onclick="selectFunction('<%=user.getUserAccount()%>')" class="bt_editpanel"  value="选择"></input>
            </div>
        </div>
	    </form>
	</div>
		<div class="tb_row">
		    <div style="margin-left:150px;padding-top:15px;">
		    	<input type="button" id="submit"  onclick="savedata()" class="bt_ensure" value="保存" />  
		    	<input type="button" id="return" class="bt_cancel" value="返回" />
	    	</div>
	    </div>
	</div>
</body>
</html>
