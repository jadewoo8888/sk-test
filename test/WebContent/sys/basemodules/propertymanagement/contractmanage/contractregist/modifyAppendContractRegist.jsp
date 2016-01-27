<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>
<%@ page language="java" import="framework.modules.user.domain.User"%>
<%@ page language="java" import="framework.sys.constant.SessionConstants"%>
<%
String hlcpk = request.getParameter("hlcpk");
%>
<!DOCTYPE HTML>
<html>
<head>
<script src="modifyAppendContractRegist.js" type="text/javascript"></script>
<link href="editContractRegist.css" rel="stylesheet" type="text/css" />
<script> 
var hlcpk ="<%=hlcpk%>";
</script>
</head>
<body class="edit_body">
	<div id="id_div_desc" class="head" >
		<span id="businesstext" class="head-title"></span>
		<span class="head-tx"></span>
	</div>
	<div  id="tabs" class="easyui-tabs clearfloat" >
		<div title="基本信息"> 
		   	<div class="EditPanel">	         
		   		<form id="id_form" method="post" class="easyui-form" data-options="novalidate:true">
				<table  class="Edit-Card-Table">
					<tr>
						<td class="View-Title1">物业编号</td><td class="View-value2"><input id="id_unitCode"  type="text" readonly="readonly"  /></td>
 						<td class="View-Title1">物业面积</td><td class="View-value2"><input id="id_unitArea"  type="text" readonly="readonly"  /></td>
 					</tr>
					<tr>
 						<td class="View-Title1">物业用途</td><td class="View-value2"><input id="id_unitPurpose"  type="text" readonly="readonly"/></td>
 						<td class="View-Title1">出租用途</td><td class="View-value2"><input id="id_hlcPurpose"  type="text" readonly="readonly"/></td>
					</tr>
					<tr>
						<td class="View-Title1">物业地址</td><td  class="View-value2" colspan="3"><input id="id_unitAdress" type="text" readonly="readonly"/></td>
 					</tr>
 					<tr>
 						<td class="View-Title1">出租人</td><td class="View-value2"><input id="id_hlcFirstEnprName"  type="text" readonly="readonly"/></td>
 						<td class="View-Title1">合同编号</td><td class="View-value2"><input id="id_hlcBarCode" type="text" readonly="readonly"/></td>
					</tr>
					<tr>
						<td class="View-Title1">承租人</td><td class="View-value2"><input id="id_hlcSecondEnprName" readonly="readonly"  type="text" /></td>
						<td class="View-Title1">签订日期</td><td class="View-value2"><input id="id_hlcRegDate" type="text" readonly="readonly"/></td>
					</tr>
					<tr>
						<td class="View-Title1">承租人证件类型</td><td class="View-value2"> <input type="text" id="id_hlcSecondPaperTyype" readonly="readonly" /> </td>		
						<td class="View-Title1">承租人证件号码</td><td class="View-value2"><input id="id_hlcSecondPaperNo" type="text" readonly="readonly" /></td>
					</tr>
					<tr>
						<td class="View-Title1">承租人联系人</td><td class="View-value2"><input id="id_hlcSecondtname"  readonly="readonly" type="text" /></td>
						<td class="View-Title1">承租人联系电话</td><td class="View-value2"><input id="id_hlcSecondtTel" readonly="readonly" type="text" /></td>
					</tr>
					<tr>
						<td class="View-Title1">合同起始日期</td><td class="View-value2"><input id="id_hlcRegStartDate" readonly="readonly"  type="text" /></td>
						<td class="View-Title1">合同结束日期</td><td class="View-value2"><input id="id_hlcRegEndDate" type="text"  readonly="readonly" /></td>
					</tr>
					<tr>
						<td class="View-Title1">付款方式</td><td class="View-value2"><input type="text" id="id_hlcRentPayType"   readonly="readonly"/> </td>		
						<td class="View-Title1">租赁保证金</td><td class="View-value2"><input type="text"  id="id_hlcDeposit"  readonly="readonly" /></td>
					</tr>
					<tr>
						<td class="View-Title1">月租金</td><td class="View-value2"><input type="text"  id="id_hlcRuleRent" readonly="readonly" /></td>
						<td class="View-Title1">递增周期（月）</td><td class="View-value2"><input type="text"  id="id_hlcIncrRound"   readonly="readonly"  /></td>
					</tr>
					<tr>
						<td class="View-Title1">单价（元/平方米）</td><td class="View-value2"><input type="text"  id="id_hlcUintRuleRent"  readonly="readonly" /></td>
						<td class="View-Title1">递增率（%）</td><td class="View-value2"><input type="text"  id="id_hlcIncrRate"  readonly="readonly" /></td>
					</tr>
 					<tr><td class="View-Title1">租金计算方式</td><td class="View-value2"><input type="text" id="id_hlcRentType" readonly="readonly" /></td><td></td><td></td></tr>
					<tr> 
					<td colspan="4">
					<div class="biao" style="margin-left:30px;margin-top:8px;">
						<table id="id_table_grid"></table>
					</div>
					</td>
					</tr>
					
					<tr>
						<td class="View-Title1">其他条款</td><td  class="View-value2" colspan="3"><textarea  id="id_hlcOtherItem" style='width:710px;resize: none' readonly="readonly"></textarea></td>
					</tr>
					<tr>
						<td class="View-Title1">备注</td><td  class="View-value2" colspan="3"><textarea  id="id_hlcFirstRepairItem" style='width:710px;resize: none' readonly="readonly"></textarea></td>
					</tr>
				</table>
				</form>
			</div>	
			
		</div>
		<div title="附件信息">
			<div style="margin-top:8px;margin-left:30px;">
				<iframe id='id_iframe_append' frameborder='no' border='0'  style='width:760px;height:350px'></iframe>
			</div>	
			<div id="id_div_secondStep"  class="Editinput" style="width:100%;position:fixed;bottom:38px;padding-top:3px;padding-bottom:3px;padding-left:400px;background-color:#CCCCCC;">
				<input type="button" class="bt_ensure" value="保存" id="id_btn_save"></input>
				<input type="button" class="bt_cancel" value="返回" id="id_btn_return"></input>
			</div>
		</div>
	</div>
</body>
</html>
