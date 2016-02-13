<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>

<!doctype html>
<html>
	<head>
	<script type="text/javascript">
	var html = '<input type="button" id="test1" class="bt_list_function" value="test" onclick="test();"/>';
	html += '<p></p><input type="button" id="test2" class="bt_list_function" value="test" onclick="test();"/>';
	$(function () { 
		$("#id_btn_addnew").click(function () {//alert();
			//changePassword();
			//页面层
			layer.open({
			    type: 1,
			    skin: 'layui-layer-rim', //加上边框
			    area: ['420px', '240px'], //宽高
			    content: html
			});
		});
	});
	
	function test() {
		//alert();
		location.href=contextPath+'/test/openwindows/c.jsp?aa=中国';
	}
	
	function changePassword() {
		top.layer.open({
			type:2, title:"\u4fee\u6539\u5bc6\u7801", shift:1, shadeClose:true, closeBtn:2, area:["400px", "300px"], 
			content:contextPath+'/test/openwindows/b.jsp'});
	}
	
	
	</script>
	</head>

	<body class="list_body"> 
		<div class="head" id="id_div_desc">
			<span class="head-title">${html:menuname(null)}</span>
			<span class="head-tx">${html:menudesc(null)}</span>
		</div>
		<div id="id_div_basequery" class="shaixuan clearfloat">
			<div class="clearfloat">
				<input type="button" id="id_btn_addnew" class="bt_list_function" value="+ 新增" />
			</div>
		</div>
		
<div style="padding: 5px;text-align: center;">aa</div>
<div style="padding: 5px;text-align: center;">bb</div>
	</body>
</html>
