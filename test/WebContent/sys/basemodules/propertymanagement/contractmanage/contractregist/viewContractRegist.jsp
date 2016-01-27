<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page import="framework.modules.propertymanagement.contractmanage.dao.HouseLeaseContractDAO"%>
<%@page import="framework.sys.context.SpringContextUtil"%>
<%@page import="framework.modules.propertymanagement.contractmanage.domain.HouseLeaseContract"%>
<%@include file="/core/jspf/head.jspf"%>
<%@ page language="java" import="framework.modules.user.domain.User"%>
<%@ page language="java" import="framework.sys.constant.SessionConstants"%>
<%
/** 由于历史原因，合同相关的表有些存储的是合同内部编码，有些合同pk，为简化处理，根据fieldname判断传递的字段类型，确定hlcpk，js中均已hlcpk查询合同相关  **/
String fieldName = request.getParameter("fieldname");
String fieldValue = request.getParameter("fieldvalue");
String strBusiType = request.getParameter("busitype");

String hlcpk = "";
if(fieldName.equalsIgnoreCase("hlcpk")) {
	hlcpk = fieldValue;
} else if(fieldName.equalsIgnoreCase("hlccode")){
	HouseLeaseContractDAO houseLeaseContractDAO =  (HouseLeaseContractDAO)SpringContextUtil.getBean("HouseLeaseContractDAO");
	HouseLeaseContract houseLeaseContract = (HouseLeaseContract)houseLeaseContractDAO.findByProperty("hlcCode",fieldValue).get(0);
	hlcpk = houseLeaseContract.getHlcpk();
}
%>
<!DOCTYPE HTML>
<html>
<head>
<script src="viewContractRegist.js" type="text/javascript"></script>
<link href="editContractRegist.css" rel="stylesheet" type="text/css" />
<script> 
var hlcpk ="<%=hlcpk%>";
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
		</div>
	</div>
</body>
</html>
