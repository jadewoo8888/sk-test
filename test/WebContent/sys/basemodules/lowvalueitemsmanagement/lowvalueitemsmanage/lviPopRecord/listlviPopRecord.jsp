<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>

<!doctype html>
<html>
<head>
<script src="listlviPopRecord.js" language="javascript" type="text/javascript"></script>
<script>
var data_lviPRType=${json:classify("STD_WPLB")};
</script>
</head>

<body class="list_body">
	<div class="head" id="id_div_desc">
		<span class="head-title">低值品出库记录</span>
		<span class="head-tx">用于查看低值品出库记录</span>
	</div>
	<div id="id_div_basequery" class="shaixuan clearfloat">
		<div class="clearfloat">
			<input type="button" id="id_btn_return" class="bt_list_function"
				value="返回" />
			<input type="button" id="id_btn_selecteColumns" class="bt_list_function" value="列选" />
			<input type="button" id="id_btn_export"
				class="bt_list_function" value="导出" />
		</div>
		<div class="clearfloat mtop10">
			<input id="category" class="easyui-combobox" placeholder="类目" qc={fn:'lviPRCategoryPK',oper:'0'} name="category"/>
			<input type="text" qc={fn:'lviPRType',oper:'5'}  placeholder="类别"  id="itemType"/> 
			<input type="text" qc={fn:'lviPRName',oper:'3'} placeholder="物品名称" class="shaixuan_txt float_left"/>
			<input type="text" qc={fn:'lviPRSpecification',oper:'3'} placeholder="规格" class="shaixuan_txt float_left"/>
			<input type="text" qc={fn:'lviPRCount',oper:'3'} placeholder="出库数量" class="shaixuan_txt float_left"/>
			<input type="text" qc={fn:'lviPRPerson',oper:'3'} placeholder="发放人" class="shaixuan_txt float_left"/>
			<input type="text" qc={fn:'lviPRApplyPerson',oper:'3'} placeholder="领用人" class="shaixuan_txt float_left"/>
			<input type="text" qc={fn:'lviPRDate',oper:'3'} placeholder="发放日期" class="shaixuan_txt float_left"/>
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
