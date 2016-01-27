<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String userInfo = request.getParameter("userInfo");
	if(userInfo != null){
		userInfo = java.net.URLDecoder.decode(userInfo,"utf-8");
	}
%>
<!doctype html>
<html>
  <head>
  	<%@include file="/core/jspf/head.jspf"%>
	<script src="${contextPath}/core/js/ztree/jquery.ztree.core-3.5.js" language="javascript"></script>
	<script src="${contextPath}/core/js/ztree/jquery.ztree.excheck-3.5.min.js" language="javascript"></script>
	<script src="${contextPath}/core/js/tools/md5.js" language="javascript"></script>
	
	<link href="${contextPath}/core/js/ztree/zTreeStyle.css" rel="stylesheet"	type="text/css" />
	<link href="editCreateUser.css" rel="stylesheet"	type="text/css" />
	<script language="javascript">var saveFlag = userInfo = '<%=userInfo%>';</script>
	<script src="editCreateUser.js" language="javascript"></script>
	<style>
		.shaixuan .combo{margin-left:10px}
	</style>
  </head>
  <body style="background-color:#ebecec;">
  	<div class="pd10 clearfloat">
		<div class="pd10_title">
			<span class="pd10_title_span">新增用户</span>
		</div>
		<div class="shaixuan clearfloat ">
		  	<form id="ff" method="post" style="width:400px; margin-left:50px; margin-top:50px">   
		  		<div class="EditPanel">
				    <div>   
				        <label for="type">单位<span>*</span>:</label>
				        <input id="userOrgCode" name="userOrgCode" class="disableText" readonly="readonly"/>   
				    </div>   
				    <div>   
				        <label for="type">姓名<span>*</span>:</label>
				        <input type="text" name="userName" maxlength="50"/>   
				    </div>   
				    <div>   
				        <label for="type">账号<span>*</span>:</label>
				        <input type="text" name="userAccount" maxlength="25"/>   
				    </div>   
				    <div>   
				        <label for="type">密码<span>*</span>:</label>
				        <input type="password" name="userPassword" id="userPassword" />   
				    </div>   
				    <div>   
				        <label for="type">确认密码<span>*</span>:</label>
				        <input type="password" name="verifyPassword" />   
				    </div>   
				    <div style="height:30px">   
				        <label for="type">角色<span>*</span>:</label>
				        <input id="userGroupCode" name="userGroupCode" />   
				    </div>  
				     <div style="height:30px">   
				        <label for="type">默认主页面:</label>
 						<input id="defaultHomePage"  class="easyui-combobox "  editable="false"  data-options="height:24,width:220,valueField:'homePageCode',textField:'homePageName'"/>  	       
				    </div>
				    <div>   
				        <label for="type">部门<span>*</span>:</label>
				        <input type="text" id="userDepartmentCode" name="userDepartmentCode" readonly="readonly" /> 
				        <input class="bt_edit_treeselect" style="width:50px" type="button" value="选择" id="department"/> 
				    </div>   
				    <div>   
				        <label for="type">邮箱地址:</label>
				        <input type="text" name="email" maxlength="25"/>   
				    </div>   
				    <div>   
				        <label for="type">手机号码:</label>
				        <input type="text" id="phoneNumber" name="phoneNumber" maxlength="11"/>   
				    </div>   
				    <div>   
				        <label for="type">备注:</label>
				        <input type="text" name="userRemark" maxlength="125"/>   
				    </div>   
			    </div>
			    <div style="margin-left:80px">
			    	<input id="submit" type="button" value="保存" class="bt_ensure float_left">
			    	<input id="return" type="button" value="返回" class="bt_cancel float_left">
			    </div>
			</form>  
		</div>
	</div>
  </body>
</html>
