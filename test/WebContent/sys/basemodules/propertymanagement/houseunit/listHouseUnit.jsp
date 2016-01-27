<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!DOCTYPE HTML>
<html>
<head>
<script src="listHouseUnit.js" type="text/javascript"></script>
<script>
//物业用途
var data_unitPurpose=${json:classify("STD_DYYT")};
data_unitPurpose.push({classifyCode:' ',classifyName:'全部'})
</script>
</head>
<body class="list_body"> 
	<div id="id_div_desc" class="head">
		<span class="head-title">${html:menuname(null)}</span>
		<span class="head-tx">${html:menudesc(null)}</span>
	</div>
	<!--操作-->	 
	<div id="id_div_basequery" class="shaixuan clearfloat" >
		<div class="clearfloat">
			<a href="javascript:add()" class="bt_list_function"   name="">+ 新建</a>
			<a href="javascript:void(0)"  id="delete" onclick="delete_obj()" class="bt_list_function">删除</a>
			<a class="bt_list_function"  id="selecteColumns" href="javascript:void(0)">列选</a>
			<a class="bt_list_function"  id="ouputColumns" href="javascript:void(0)">导出</a>
		</div>
	    <div class="clearfloat mtop10" >  
	    	<input type="text" qc={fn:'unitCode',oper:'3'} placeholder="物业编号" class="shaixuan_txt" />	
			<input type="text" qc={fn:'unitAdress',oper:'3'} placeholder="物业地址" class="shaixuan_txt" />
			<input type="text" qc={fn:'unitPurpose',oper:'5'}  placeholder="物业用途"  id="unitPurpose"/>   
			<input type="text" qc={js:'getContractStatus'}  placeholder="合同状态"  id="contratStatusDisplay" />   
			<input type="text" qc={fn:'useCheckFlag',oper:'5'}  placeholder="物业状态"  id="useCheckFlag" class="easyui-combobox "  editable="false"   data-options="panelHeight:100,height:28,width:120,valueField:'classifyCode',textField:'classifyName',data:[{classifyCode:'0',classifyName:'使用中'},{classifyCode:'1',classifyName:'已注销'},{classifyCode:' ',classifyName:'全部'}]"/>   
				 
			<input type="button" id="submit" value="查询" class="bt_query mleft5"/>
		</div>
	</div>
	<div class="biao" style="background-color:white;">
		<table id="tt">   
		</table>
	</div>
		
</body>
</html>
