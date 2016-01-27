<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>

<%@ page import="framework.sys.constant.SessionConstants"%>
<% String validateCode = (String)session.getAttribute(SessionConstants.VERIFYCODE);%>

<!DOCTYPE HTML>
<html>
<head>
	<title>SCAM高校资产管理系统</title>
    <link href="${contextPath}/core/style/css/ui/index.css" rel="stylesheet" type="text/css" />
	<script src="${contextPath}/core/js/tools/md5.js" language="javascript"></script>
	<!-- 获取后端验证码session值 -->
	<script language="javascript">var sessionVC = "<%=validateCode==null?"":validateCode%>";</script>
	<script src="index.js" language="javascript"></script>
</head>

<body id="denglu" onload="show()">


	<div class="main">
	
		<div class="bg_main">
			<div class="denglu">
				<div class="denglu_title">欢迎登录</div>
				<div class="pd20 clr">
					<div name="myform"  method ='post' >
						<input type="text" name="userAccount" class="txt_input"  value="用户名">
						<input type="text" name="showPassword" class="txt_input"  value="密码" >
						<input type="password" style="display:none;color:#c6c6c6;" autocomplete="off" name="userPassword"  class="txt_input" >
						<div class="yanzheng" style="display:none">
							<input type="text" maxlength="4" name="verifyCode" class="yanzhengma" value="验证码" >
							<img id="validateImg" >
							<a style="cursor:pointer" onclick="validateCode()">换一换</a>
						</div>
						<div class="dianxuan">
							<div style="float:left"><input name="select" type="checkbox" >记住用户名</input></div><span id="errorInfo"></span>
						</div>
						<input type="button" style="width:295px" id="denglu_a" value="登录" onclick='submitAjax()'>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="footer">研发单位：广州市盛祺计算机信息技术有限公司</div>
</body>
</html>
