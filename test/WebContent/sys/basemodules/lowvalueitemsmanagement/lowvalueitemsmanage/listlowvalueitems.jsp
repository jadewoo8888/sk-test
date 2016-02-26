<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>

<!doctype html>
<html>
<head>
<script src="listlowvalueitems.js" language="javascript" type="text/javascript"></script>
<script>
var data_imType=${json:classify("STD_WPLB")};
//data_imType.push({classifyCode:' ',classifyName:'全部'})
</script>
</head>

<body class="list_body">
	<div class="head" id="id_div_desc">
		<span class="head-title">${html:menuname(null)}</span> <span
			class="head-tx">${html:menudesc(null)}</span>
	</div>
	<div id="id_div_basequery" class="shaixuan clearfloat">
		<div class="clearfloat">
			<input type="button" id="id_btn_pushstore" class="bt_list_function" value="入库" /> 
			<input type="button" id="id_btn_issueitem" class="bt_list_function" value="发放" />
			<input type="button" id="id_btn_pushstorerecord" class="bt_list_function" value="入库记录" />
			<input type="button" id="id_btn_popstorerecord" class="bt_list_function" value="出库记录" />
			<input type="button" id="id_btn_selecteColumns" class="bt_list_function" value="列选" />
			<input type="button" id="id_btn_export" class="bt_list_function" value="导出" />
		</div>
		<div class="clearfloat mtop10">
			<input id="category" class="easyui-combobox" placeholder="类目" qc={fn:'lviCategoryPK',oper:'0'} name="category"/>
			<input type="text" qc={fn:'lviType',oper:'5'}  placeholder="类别"  id="lviType"/> 
			<input type="text" qc={fn:'lviName',oper:'3'} placeholder="物品名称" class="shaixuan_txt float_left"/>
			<input type="text" qc={fn:'lviSpecification',oper:'3'} placeholder="规格" class="shaixuan_txt float_left"/>
			<input type="text" qc={fn:'lviCount',oper:'3'} placeholder="库存" class="shaixuan_txt float_left"/>
			<input type="button" id="id_btn_query" value="查询" class="bt_query mleft5">
		</div>
	</div>

	<!--结束-->
	<div class="biao" style="background-color: white;">
		<table id="id_table_grid">
		</table>
	</div>

</body>
</html>
