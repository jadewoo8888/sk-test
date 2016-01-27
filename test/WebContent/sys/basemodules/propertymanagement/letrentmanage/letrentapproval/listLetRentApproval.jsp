<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!DOCTYPE HTML>
<html>
<head>
<script src="listLetRentApproval.js" type="text/javascript"></script>
</head>
<body class="list_body"> 
	<div id="id_div_desc" class="head">
		<span class="head-title">${html:menuname(null)}</span>
		<span class="head-tx">${html:menudesc(null)}</span>
	</div>
	<!--操作-->	 
	<div id="id_div_basequery" class="shaixuan clearfloat" >
		<div class="clearfloat">
			<a class="bt_list_function"  id="selecteColumns" href="javascript:void(0)">列选</a>
			<a class="bt_list_function"  id="ouputColumns" href="javascript:void(0)">导出</a>
		</div>
	    <div class="clearfloat mtop10" >  
	    	<input type="text" qc={fn:'letRentCode',oper:'3'} placeholder="申请单号" class="shaixuan_txt" />	
			<input type="text" qc={fn:'unitCode',oper:'3'} placeholder="物业编号" class="shaixuan_txt" />
			<input type="text" qc={fn:'unitAdress',oper:'3'} placeholder="物业地址" class="shaixuan_txt" />
			
			<input type="text" qc={fn:'planLetPurpose',oper:'0'}  placeholder="拟出租用途"  id="planLetPurpose" class="easyui-combobox "  editable="false"   data-options="multiple:true,panelHeight:200,height:28,width:120,valueField:'classifyCode',textField:'classifyName',data:${json:classify("STD_DYYT")}"/>   
			<input type="text" qc={fn:'letRentFlag',oper:'0'}  placeholder="申请单状态"  id="letRentFlag" class="easyui-combobox "  editable="false"   data-options="panelHeight:200,height:28,width:120,valueField:'classifyCode',textField:'classifyName'"/>   
				 
			<input type="button" id="submit" value="查询" class="bt_query mleft5"/>
		</div>
	</div>
	<div class="biao" style="background-color:white;">
		<table id="tt">   
		</table>
	</div>
</body>
</html>
