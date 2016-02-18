<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>

<!doctype html>
<html>
	<head>
		<script src="listissueitem.js" type="text/javascript"></script>
<script>
</script>
	</head>

	<body class="list_body"> 
		<div class="head" id="id_div_desc">
			<span class="head-title">${html:menuname(null)}</span>
			<span class="head-tx">${html:menudesc(null)}</span>
		</div>
		<div id="id_div_basequery" class="shaixuan clearfloat">
			<div class="clearfloat">
				<input type="button" id="id_btn_selecteColumns" class="bt_list_function" value="列选" />
				<input type="button" id="id_btn_export" class="bt_list_function" value="导出" />
			</div>
			<div class="clearfloat mtop10">
				<input id="category" class="easyui-combobox" placeholder="类目" qc={fn:'categoryManagementPK',oper:'0'} name="category"/>
				<input type="text" qc={fn:'ItemsApplyDeptCode',oper:'3'} placeholder="申领部门" class="shaixuan_txt float_left"  readonly="readonly" id="deptCode" name="deptCode"/>
				<input type="text" qc={fn:'applyPerson',oper:'3'} placeholder="申领人" class="shaixuan_txt float_left"/>
				<input type="text" qc={js:'getCheckStatus'}  placeholder="单据状态"  id="checkStatusDisplay" /> 
 				<input type="button" id="id_btn_query" value="查询"	 class="bt_query mleft5"/>
			</div>
			
		</div>

		<!--结束-->
		<div class="biao" style="background-color: white;">
			<table id="id_table_grid">
			</table>
		</div>

	</body>
</html>
