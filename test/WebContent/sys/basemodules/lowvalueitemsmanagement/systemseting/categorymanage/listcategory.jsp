<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>

<!doctype html>
<html>
	<head>
		<script src="listcategory.js" language="javascript"
			type="text/javascript"></script>
	</head>
<style>
		.combo {float:left}
		.table_a_css:hover{ color:#00E8D8}
	</style>
	
	<body class="list_body"> 
		<div class="head" id="id_div_desc">
			<span class="head-title">${html:menuname(null)}</span>
			<span class="head-tx">${html:menudesc(null)}</span>
		</div>
		<div id="id_div_basequery" class="shaixuan clearfloat">
			<div class="clearfloat">
				<input type="button" id="id_btn_addnew" class="bt_list_function" value="+ 新建" />
				<!-- <input type="button" id="id_btn_delete" class="bt_list_function" value="删除" /> -->
 				<!-- <input type="button" id="id_btn_modify" class="bt_list_function" value="修改" /> -->
				<!-- <input type="button" id="id_btn_selecteColumns" class="bt_list_function" value="列选" /> -->
				<input type="button" id="id_btn_export" class="bt_list_function" value="导出" />
			</div>
			<div class="clearfloat mtop10">
				<input type="text" qc={fn:'categoryName',oper:'3'} placeholder="名称" class="shaixuan_txt float_left">
				<input id="role" class="easyui-combobox" placeholder="请选择角色" qc={fn:'groupCode',oper:'5'} name="role">
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
