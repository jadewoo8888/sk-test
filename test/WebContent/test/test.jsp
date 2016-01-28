<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>

<!doctype html>
<html>
	<head>
		<script src="test.js" language="javascript"
			type="text/javascript"></script>
	</head>

	<body class="list_body"> 
		<div class="head" id="id_div_desc">
			<span class="head-title">${html:menuname(null)}</span>
			<span class="head-tx">${html:menudesc(null)}</span>
		</div>
		<div id="id_div_basequery" class="shaixuan clearfloat">
			<div class="clearfloat">
				<input type="button" id="id_btn_addnew" class="bt_list_function" value="+ 新增" />
				<input type="button" id="id_btn_delete" class="bt_list_function" value="删除" />
 				<input type="button" id="id_btn_print" class="bt_list_function" value="打印" />
				<input type="button" id="id_btn_selecteColumns" class="bt_list_function" value="列选" />
				<input type="button" id="id_btn_export" class="bt_list_function" value="导出" />
			</div>
			<div class="clearfloat mtop10">
				<input type="text" qc={fn:'name',oper:'3'} placeholder="姓名" class="shaixuan_txt float_left">
				<input type="text" qc={fn:'sex',oper:'3'} placeholder="性别" class="shaixuan_txt float_left">
 				<input type="button" id="id_btn_query" value="查询"	 class="bt_query mleft5">
			</div>
		</div>

		<!--结束-->
		<div class="biao" style="background-color: white;">
			<table id="id_table_grid">
			</table>
		</div>

	</body>
</html>
