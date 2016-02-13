<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>

<!doctype html>
<html>
	<head>
		<script src="listapplyregister.js" type="text/javascript"></script>
<script >
//单据状态
//var data_itemsApplyFlag=${json:classify("WPSLZT")};
//data_itemsApplyFlag.push({classifyCode:' ',classifyName:'全部'})
</script>
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
				<!--<input id="category" class="easyui-combobox" placeholder="类目" qc={fn:'categoryManagementPK',oper:'0'} name="category"/>
				 <input type="text" qc={fn:'orgCode',oper:'3'} placeholder="申领部门" class="shaixuan_txt float_left"  readonly="readonly" id="orgCode" name="orgCode"/>-->
				<input type="text" qc={fn:'applyPerson',oper:'3'} placeholder="申领人" class="shaixuan_txt float_left"/>
 				<!-- <input type="text" qc={js:'getItemsApplyFlag'}  placeholder="状态"  id="itemsApplyFlag" class="easyui-combobox "  editable="false"   
					data-options="panelHeight:100,height:28,width:120,valueField:'classifyCode',textField:'classifyName',data:[{classifyCode:1,classifyName:'全部'},{classifyCode:2,classifyName:'未提交'},{classifyCode:3,classifyName:'待审批'},{classifyCode:4,classifyName:'审批中'},{classifyCode:5,classifyName:'已审批'}]"/> -->
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
