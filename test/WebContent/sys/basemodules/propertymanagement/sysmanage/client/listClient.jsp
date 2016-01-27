<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>

<!doctype html>
<html>
	<head>
		<script src="listClient.js" language="javascript"
			type="text/javascript"></script>
	</head>
 
	<body class="list_body"> 
		<div class="head" id="id_div_desc">
			<span class="head-title">${html:menuname(null)}</span>
			<span class="head-tx">${html:menudesc(null)}</span>
		</div>
		<!--查询操作-->
		<!--开始-->
		<div id="id_div_basequery" class="shaixuan clearfloat">
			<div class="clearfloat">
				<input type="button" id="id_btn_addnew" class="bt_list_function" value="+ 新增" />
 				<input type="button" id="id_btn_delete" class="bt_list_function" value="删除" />
				<input type="button" id="id_btn_selecteColumns" class="bt_list_function" value="列选" />
				<input type="button" id="id_btn_export" class="bt_list_function" value="导出" />
			</div>
			<div class="clearfloat mtop10">
				<input type="text" qc={fn:'hlcSecondEnprName',oper:'3'} placeholder="承租人" class="shaixuan_txt float_left">
				<input type="text" qc={fn:'unitAdress',oper:'3'} placeholder="物业地址" class="shaixuan_txt float_left">
				<input type="text" qc={fn:'unitPurpose',oper:'5'}  placeholder="物业用途"  id="unitPurpose" class="easyui-combobox "  editable="false"   data-options="panelHeight:100,multiple:true,height:28,width:120,valueField:'classifyCode',textField:'classifyName',data:${json:classify("STD_DYYT")}"/>   
 				<input  qc={fn:'clientStatus',oper:'5'} class="easyui-combobox"  data-options="value:'0',valueField:'classifyCode',textField:'classifyName',data:[{classifyCode:'0,1',classifyName:'全部'},{classifyCode:'0',classifyName:'正常'},{classifyCode:'1',classifyName:'已注销'}]" />			
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
