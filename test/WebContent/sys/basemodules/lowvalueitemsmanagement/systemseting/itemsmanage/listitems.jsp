<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>

<!doctype html>
<html>
	<head>
		<script src="listitems.js" language="javascript"
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
 				<!-- <input type="button" id="id_btn_modify" class="bt_list_function" value="修改" /> -->
				<input type="button" id="id_btn_selecteColumns" class="bt_list_function" value="列选" />
				<input type="button" id="id_btn_export" class="bt_list_function" value="导出" />
			</div>
			<div class="clearfloat mtop10">
				<input type="text" qc={fn:'iMitemPK',oper:'3'} placeholder="类目pk" class="shaixuan_txt float_left">
				<input type="text" qc={fn:'iMType',oper:'3'} placeholder="类别" class="shaixuan_txt float_left">
				<input type="text" qc={fn:'iMName',oper:'3'} placeholder="物品名称" class="shaixuan_txt float_left">
				<input type="text" qc={fn:'iMAssetType',oper:'3'} placeholder="资产类别" class="shaixuan_txt float_left">
				<input type="text" qc={fn:'iMSpecification',oper:'3'} placeholder="规格型号" class="shaixuan_txt float_left">
				<input type="text" qc={fn:'iMMetricUnit',oper:'3'} placeholder="计量单位" class="shaixuan_txt float_left">
				<input type="text" qc={fn:'iMRemark',oper:'3'} placeholder="名称" class="shaixuan_txt float_left">
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
