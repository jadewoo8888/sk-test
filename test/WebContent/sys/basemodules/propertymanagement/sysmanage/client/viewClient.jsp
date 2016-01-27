<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>
<%@ page language="java" import="framework.modules.user.domain.User"%>
<%@ page language="java" import="framework.sys.constant.SessionConstants"%>
<%
String pk = request.getParameter("pk");
String strBusiType = request.getParameter("busitype");
 %>
<!DOCTYPE HTML>
<html>
<head>
<script src="viewClient.js" type="text/javascript"></script>
<link href="editClient.css" rel="stylesheet" type="text/css" />
<script> 
var pk ="<%=pk%>";
var strBusiType ="<%=strBusiType%>";
</script>
</head>
<body class="edit_body">
	<div  id="tabs" class="easyui-tabs clearfloat" >
		<div title="基本信息"> 
		   	<div class="EditPanel">	         
		   		<form id="id_form" method="post" class="easyui-form" data-options="novalidate:true">
				<table  class="Edit-Card-Table">
					<tr>
 						<td class="View-Title1">承租人</td><td class="View-value1"><input id="id_hlcSecondEnprName" type="text" readonly="readonly" ></input> </td>
 					 	<td class="View-Title1">物业面积</td><td class="View-value1"><input id="id_unitArea" type="text" readonly="readonly" ></input> </td>
 					</tr>
					<tr>
						<td class="View-Title1">联系人</td><td class="View-value1"><input id="id_linker" type="text" readonly="readonly" ></input></td>
						<td class="View-Title1">联系电话</td><td class="View-value1"><input id="id_hlcSecondtTel" type="text" readonly="readonly"></input></td>
					</tr>
					<tr>
						<td class="View-Title1">物业地址</td><td  class="View-value1" colspan="3"><input id="id_unitAdress" style='width:620px' type="text" readonly="readonly"></input></td>
 					</tr>
 					<tr>
 					<td class="View-Title1">是否代收水电费</td><td  class="View-value1" ><input id="id_ifCollection" readonly="readonly"/>	</td>
 					<td class="View-Title1">是否代收物业卫生费</td><td  class="View-value1" ><input id="id_ifHealthFee" readonly="readonly"/>	</td>
 					</tr>
 					<tr>
						<td class="View-Title1">登记人</td><td class="View-value1"><input id="id_lister" type="text" readonly="readonly"></input></td>
						<td class="View-Title1">登记日期</td><td class="View-value1"><input id="id_listDate"  type="text" readonly="readonly"></input></td>
					</tr>
 					<tr>
						<td class="View-Title1">备注</td><td  class="View-value1" colspan="3"><textarea  id="id_remark" style='width:610px;resize: none' readonly="readonly"></textarea></td>
 					</tr>
				</table>
				</form>
			</div>	
			 
		</div>
		<div title="附件信息">
			<div style="margin-top:8px;margin-left:30px;">
				<iframe id='id_iframe_append' frameborder='no' border='0'  style='width:760px;height:350px'></iframe>
			</div>	
		</div>
	</div>
</body>
</html>
