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
<script type="text/javascript">
//事务 
var aa="${param.aa}";
alert(aa)
</script>
<style type="text/css">
</style>
</head> 
<body class="edit_body"> 
	<div id="id_div_desc" class="head" >
		<span id="businesstext" class="head-title">c</span>
		<span class="head-tx"></span>
	</div>
	
</body>
</html>
