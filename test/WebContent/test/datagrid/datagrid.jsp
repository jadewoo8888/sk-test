<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script>
		function formatPrice(val,row){
			if (val < 20){
				return '<span style="color:red;">('+val+')</span>';
			} else {
				return val;
			}
		}
	</script>
</head>
<body>
	<h1>DataGrid</h1>
	
	<table id="tt" title="Formatting Columns" class="easyui-datagrid" style="width:550px;height:250px"
			url="datagrid_data.json"
			singleSelect="true" iconCls="icon-save">
		<thead>
			<tr>
				<th field="itemid" width="80">Item ID</th>
				<th field="productid" width="80">Product ID</th>
				<th field="listprice" width="80" align="right" formatter="formatPrice">List Price</th>
				<th field="unitcost" width="80" align="right">Unit Cost</th>
				<th field="attr1" width="100">Attribute</th>
				<th field="status" width="60" align="center">Stauts</th>
			</tr>
		</thead>
	</table>
	
</body>
</html>