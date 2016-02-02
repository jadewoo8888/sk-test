<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>

<!doctype html>
<html>
	<head>
	<script type="text/javascript">
	$(function () { 
		$("#id_btn_addnew").click(function () {//alert();
			top.layer.closeAll();
			location.href=contextPath+'/test/openwindows/c.jsp?aa=test';
		});
	});
	
	
	
	
	
	</script>
	</head>

	<body class="list_body"> 
		<div id="id_div_basequery" class="shaixuan clearfloat">
			<div class="clearfloat">
				<input type="button" id="id_btn_addnew" class="bt_list_function" value="新增" />
			</div>
		</div>


	</body>
</html>
