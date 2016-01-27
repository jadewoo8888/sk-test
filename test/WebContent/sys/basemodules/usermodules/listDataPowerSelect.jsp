<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%String userOrgCode = request.getParameter("userOrgCode");%>
<%String userDepartmentCode = request.getParameter("userDepartmentCode");%>
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
		<script src="treeselect2.js" language="javascript"></script>
		<script src="${contextPath}/core/js/ztree/jquery.ztree.core-3.5.js" language="javascript"></script>
		<script src="${contextPath}/core/js/ztree/jquery.ztree.excheck-3.5.min.js" language="javascript"></script>
		<link href="${contextPath}/core/js/ztree/zTreeStyle.css" rel="stylesheet"	type="text/css" />
		<script>
			//初始化变量
			var strFilterOrgCode;
			//获取单位代码
			var userOrgCode = "<%=userOrgCode%>";
			//获取用户id
			var userid = "<%=userid%>";
			//获取部门代码
			var userDepartmentCode = "<%=userDepartmentCode%>";
			var std = ${json:classify("STD_Purpose")};
		</script>
		<script src="listDataPowerSelect.js" type="text/javascript"></script>
		<style>
			input{margin-left:10px}
		</style>
		
	</head>

	<body style="background-color: #ebecec;">

		<div class="pd10 clearfloat">
			<!--基本信息-->
			<div class="pd10_title">
				<span class="normal_title">账号：</span>
				<span class="normal_title"><%=userid%></span>
				<span class="normal_title">&nbsp;&nbsp;&nbsp;姓名：</span>
				<span class="normal_title"><%=userName%></span>
				<input type="checkbox" id="onlyShowUser">只显示本用户</input>
			</div>
			
			<div class="clearfloat kuai">
				<!--标签页-->
				<div class="clearfloat">
					<div class="kuai_a clearfloat">
						<a href="#" id="unitDept" name="tag"></a>
						<a href="#" id="category" class="cur">类别权限</a>
						<a href="#" id="asset" >资产用途</a>
					</div>
				</div>

				<div id="searchBox" class="shuaixuan_top" style="background: #fff;padding-top: 10px;height:30px">
				</div>
				
				
				<div style="background: #fff;padding-top: 10px; overflow:auto; height:300px">
					<div class='ztree' id='tsid_div_tree'></div>
				</div>
			</div>
			
			<div style="width:130px; margin:0 auto; background: #fff" id="buttonArea">
				<input type="button" value="确定" class="bt_ensure float_left" id="ok"></input>
				<input type="button" value="取消" class="float_left bt_cancel" id="cancel"></input>
			</div>
 
		</div>



	</body>
</html>
