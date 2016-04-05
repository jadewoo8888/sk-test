<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>
<%
	String strBusiType = request.getParameter("busitype");//业务类型
 	String strControlType = request.getParameter("controltype");//具体业务操作类型，与列表的strControlType不同，这里指的是列表新增，修改按钮对应的类型
	String strBusinessCode = request.getParameter("businesscode");//业务pk
	String openWindowName = request.getParameter("openwindowname");//打开选择附件页面的窗口名称
	String areaID = request.getParameter("areaid");//父窗口中，附件区域的id

%>
<!doctype html>
<html>
	<head>
		<script src="${contextPath}/core/js/tools/progress.js"
			language="javascript"></script>
		<script src="editCommonUpload.js" language="javascript"></script>
		<script>
		/** 初始化业务参数 **/ 
 		var strBusiType = "<%=strBusiType%>"; 
		var strBusinessCode = "<%=strBusinessCode%>";
		var strControlType = "<%=strControlType%>";
		var openWindowName = "<%=openWindowName%>";
		var areaID = "<%=areaID%>";
		</script>
		<style>
</style>
	</head>
	<body id='id_body_append' class="edit_body"
		style='width: 440px; overflow: hidden;'>
		<div class="EditPanel" style='margin-left:-15px' id="EditPanel">
			<table class='Edit-Card-Table'>
				<tr>
					<td class='Edit-Title1'>
						附件名称:
						<span style='color: red;'>*</span>
					</td>
					<td id='id_td_appendName' class='Edit-Input1'>
						<input type="text" style="width: 220px" id="id_appendName"
							class="easyui-validatebox" required="true" missingMessage="不能为空" />
					</td>
				</tr>
				<tr>
					<td class='Edit-Title1'>
						文件路径:
						<span style='color: red;'>*</span>
					</td>
					<td class='Edit-Input1'>
						<form method="post" id="id_fileForm" name="fileForm">
							<input type="file" style="width: 220px" id='id_filePath'
								class="easyui-validatebox" required="true"
								missingMessage="请选择文件 " name="filename">
						</form>
					</td>
				</tr>
				<tr>
					<td class='Edit-Title1'>
						备注:
						<span style='color: red;'>&nbsp;</span>
					</td>
					<td class='Edit-Input1'>
						<textarea rows="3" cols="25" id="id_appendRemark"
							style="width: 210px; resize: none"></textarea>
					</td>
				</tr>
			</table>
		</div>
		<div style="margin-left: 150px; margin-top: 15px" class="EditInput">
			<input type="button" id="id_save" class="bt_ensure" value="保存"></input>
			<input type="button" id="id_cancel" class="bt_cancel" value="返回"></input>
		</div>
	</body>
</html>
