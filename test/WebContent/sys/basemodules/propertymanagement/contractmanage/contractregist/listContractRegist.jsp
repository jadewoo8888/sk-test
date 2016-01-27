<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>

<!doctype html>
<html>
	<head>
		<script src="listContractRegist.js" language="javascript"
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
 				<input type="button" id="id_btn_print" class="bt_list_function" value="打印合同" />
				<input type="button" id="id_btn_selecteColumns" class="bt_list_function" value="列选" />
				<input type="button" id="id_btn_export" class="bt_list_function" value="导出" />
			</div>
			<div class="clearfloat mtop10">
				<input type="text" qc={fn:'hlcBarCode',oper:'3'} placeholder="合同编号" class="shaixuan_txt float_left">
				<input type="text" qc={fn:'hlcSecondEnprName',oper:'3'} placeholder="承租人" class="shaixuan_txt float_left">
				<input type="text" qc={fn:'unitAdress',oper:'3'} placeholder="物业地址" class="shaixuan_txt float_left">
				<input  qc={fn:'hlcCheckFlag',oper:'5'} class="easyui-combobox"  data-options="value:'SJZT_01',valueField:'classifyCode',textField:'classifyName',data:[{classifyCode:'SJZT_01,SJZT_02,SJZT_03',classifyName:'全部'},{classifyCode:'SJZT_01',classifyName:'执行中'},{classifyCode:'SJZT_02',classifyName:'已中止'},{classifyCode:'SJZT_03',classifyName:'已终止'}]" />			
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
