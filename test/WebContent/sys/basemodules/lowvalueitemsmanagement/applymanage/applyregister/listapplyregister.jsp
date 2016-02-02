<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>

<!doctype html>
<html>
	<head>
		<script src="listapplyregister.js" language="javascript"
			type="text/javascript"></script>
	</head>

	<body class="list_body"> 
		<div class="head" id="id_div_desc">
			<span class="head-title">${html:menuname(null)}</span>
			<span class="head-tx">${html:menudesc(null)}</span>
		</div>
		<div id="id_div_basequery" class="shaixuan clearfloat">
			<div class="clearfloat">
				<input type="button" id="id_btn_addnew" class="bt_list_function" value="+ 新建" />
				<input type="button" id="id_btn_selecteColumns" class="bt_list_function" value="列选" />
				<input type="button" id="id_btn_export" class="bt_list_function" value="导出" />
			</div>
			<div class="clearfloat mtop10">
				<input id="category" class="easyui-combobox" placeholder="类目" qc={fn:'categoryManagementPK',oper:'0'} name="category"/>
				<input type="text" qc={fn:'orgCode',oper:'3'} placeholder="申领部门" class="shaixuan_txt float_left"  readonly="readonly" id="orgCode" name="orgCode"/>
				 <input class="shaixuan_txt float_left bt_edit_treeselect" style="width:50px" type="button" value="选择" id="department"/>
				<input type="text" qc={fn:'applyPerson',oper:'3'} placeholder="申领人" class="shaixuan_txt float_left"/>
				<input id="iamCheckFlag" class="easyui-combobox" placeholder="单据状态" qc={fn:'iamCheckFlag',oper:'0'} name="iamCheckFlag"/>	
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
