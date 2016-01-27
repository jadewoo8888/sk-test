<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="framework.sys.constant.SessionConstants"%>
<%@page import="framework.modules.user.domain.User"%>
<%@page import="framework.sys.cache.UserLoginService"%>
<%
String path = request.getContextPath();
String strLoginUrl = request.getContextPath()+"/index.jsp";
User user = (User)session.getAttribute(SessionConstants.OPERATEUSER);
int status = 4;//4 包含2种情况，1）账号未登陆，非法访问 2）session超时
if(user != null){
	status = UserLoginService.getUserLoginStatus(user.getUserAccount());
}

%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title></title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
  </head>
  
  <body>
  	<%if(status==4){ %>
  	您可能未登录或已超时！
  	<%}else if(status==2){ %>
  	您的账号已被冻结！
  	<%}else if(status==3){ %>
  	您的账号已在其他地方登录！
  	<%} %>
    <a href="#" style="text-decoration:underline;font:italic;" onclick='javascript:window.top.location.href="<%=strLoginUrl%>";'>点击跳转至登录页面</a><br>
  </body>
</html>
