<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>
<%
	String openWindowName = request.getParameter("openwindowname");//打开选择图片页面的窗口名称
 %>
<!doctype html>
<html>
	<head>
		<link rel="stylesheet" type="text/css"
			href="${contextPath}/core/js/webuploader/webuploader.css">
		<link rel="stylesheet" type="text/css" href="editPicUpload.css">
		<script src="editPicUpload.js" language="javascript"></script>
		<script src="${contextPath}/core/js/webuploader/webuploader.min.js"
			language="javascript"></script>
		<script>
		/** 初始化业务参数 **/ 
 		var openWindowName = "<%=openWindowName%>"; 
		</script>
		<style>
</style>
	</head>
	<body id='id_body'
		style='width: 690px; height: 490px; overflow: hidden;'>
		<!--  todo ie下只能单选，需更换其他插件 -->
		<div id="uploader" class="wu-example">
			<div class="queueList" style='height: 410px'>
				<div id="dndArea" class="placeholder">
					<div id="filePicker"></div>
					<p id='id_p_drag' style='display:none' class='dragtip'>
						试试拖动图片到这里吧
					</p>
					<img class='bgtext' src='img/bgtext.png' />
				</div>
			</div>
			<div class="statusBar" style="display: none;">
				<div class="progress">
					<span class="text">0%</span>
					<span class="percentage"></span>
				</div>
				<div class="info"></div>
				<div class="btns">
					<div id="filePicker2"></div>
					<div class="uploadBtn">
						开始上传
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
