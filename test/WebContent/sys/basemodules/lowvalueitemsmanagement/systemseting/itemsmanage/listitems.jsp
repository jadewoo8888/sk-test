<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>

<!doctype html>
<html>
<head>
<script src="listitems.js" language="javascript" type="text/javascript"></script>
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
			<input type="button" id="id_btn_addnew" class="bt_list_function"
				value="+ 新增" /> <input type="button" id="id_btn_export"
				class="bt_list_function" value="导出" />
		</div>
		<div class="clearfloat mtop10">
			<input id="category" class="easyui-combobox" placeholder="类目" qc={fn:'imCategoryPK',oper:'0'} name="category"/>
			<!-- <input  qc={fn:'imType',oper:'5'} class="easyui-combobox"  data-options="value:'WPLB_001',valueField:'classifyCode',textField:'classifyName',data:[{classifyCode:'WPLB_001,WPLB_002',classifyName:'全部'},{classifyCode:'WPLB_001',classifyName:'低值品'},{classifyCode:'WPLB_002',classifyName:'固定资产'}]" /> -->
			<!-- <input type="text" qc={fn:'letRentFlag',oper:'0'}  placeholder="申请单状态"  id="letRentFlag" class="easyui-combobox "  editable="false"   data-options="panelHeight:200,height:28,width:120,valueField:'classifyCode',textField:'classifyName'"/>  -->
			<!-- <input type="text" qc={fn: 'imType',oper:'5'}  placeholder="类别" id="imType" />  -->
			<input type="text" qc={fn:'imType',oper:'5'}  placeholder="类别"  id="imType"/> 
			<input type="text" qc={fn:'imName',oper:'3'} placeholder="名称" class="shaixuan_txt float_left"/>
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
