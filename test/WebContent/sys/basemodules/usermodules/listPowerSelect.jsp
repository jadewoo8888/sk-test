<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String userName = request.getParameter("userName");
	String userid = request.getParameter("userid");
    userName = java.net.URLDecoder.decode(userName,"utf-8");
    userid = java.net.URLDecoder.decode(userid,"utf-8");
%>
<!doctype html>
<html>
	<head>
		<%@include file="/core/jspf/head.jspf"%>
		<script type="text/javascript" src="${contextPath}/core/js/tools/xmlstringtrans.js" ></script>
		<script>
			var userid = '<%=userid%>'; 
			var xmlData;
		</script>
		<script src="listPowerSelect.js" type="text/javascript"></script>
	</head>

	<body style="background-color: #ebecec;">

		<div class="clearfloat kuai">
			<div class="pd10 clearfloat">
				<div class="pd10_title">
					<span class="normal_title">账号：</span>
					<span class="normal_title"><%=userid%></span>
					<span class="normal_title">&nbsp;&nbsp;&nbsp;姓名：</span>
					<span class="normal_title"><%=userName%>
				</div>
				<div class="pd10_title">
					<span>*黑色字代表与对应的角色权限一致，灰色代表减少功能，红色代表新增功能</span>
				</div>
			</div>

			<div style="margin:0px 10px 0px 10px;background: #fff; padding-top: 10px; overflow:auto; height:300px">
				<div class='ztree' id='tsid_div_tree'></div>
			</div>
		</div>

		<div style="width:130px; margin:0 auto; background: #fff" id="buttonArea">
			<input type="button" value="确定" class="bt_ensure float_left" id="ok"></input>
			<input type="button" style="margin-left:10px;" value="取消" class="bt_cancel float_left" id="cancel"></input>
		</div>

	</body>
</html>
