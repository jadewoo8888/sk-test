<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>
<%
String hlcpk = request.getParameter("hlcpk");
String hlccode = request.getParameter("hlccode");
String strBusiType = request.getParameter("busitype"); 
String unitSysCode = request.getParameter("unitsyscode");
unitSysCode = (unitSysCode==null)?"":unitSysCode;

 %>
<!DOCTYPE HTML>
<html>
<head>
<script src="editContractRegist.js" type="text/javascript"></script>
<script src="rentruleHandle.js" type="text/javascript"></script>
<script src="jzrieditor.js" type="text/javascript"></script>
<link href="editContractRegist.css" rel="stylesheet" type="text/css" />
<script>  
var hlcpk ="<%=hlcpk%>";
var hlccode ="<%=hlccode%>";
var strBusiType ="<%=strBusiType%>";
var unitSysCode = "<%=unitSysCode%>";
var paycycClassifyData=${json:classify("STD_PayCyc")};
</script>
</head>
<body class="edit_body">
	<div id="id_div_desc" class="head" >
		<span id="businesstext" class="head-title"></span>
		<span class="head-tx"></span>
	</div>
	
	<div  id="tabs" class="easyui-tabs clearfloat" >
		<div title="基本信息"> 
		   	<div class="EditPanel" style='margin-bottom:60px'>	         
		   		<form id="id_form" method="post" class="easyui-form" data-options="novalidate:true">
				<table  class="Edit-Card-Table">
					<tr> 
						<td class="Edit-Title1">物业编号<span class="font-red">*</span></td><td class="Edit-Input1"><input id="id_unitCode"  type="text"  class="easyui-searchbox txt_class disableText"  readonly="readonly" validType="length[1,120]" style='width:200px' invalidMessage="不能超过120个字符！" missingMessage="物业编号不能为空" required="true" ></input> </td>
 						<td class="Edit-Title1">物业面积</td><td class="Edit-Input1"><input id="id_unitArea"  type="text"   class="easyui-numberbox disableText" data-options="min:0,precision:2,groupSeparator:','" readonly="readonly"/></td>
 					</tr>
					<tr>
 						<td class="Edit-Title1">物业用途</td><td class="Edit-Input1"><input id="id_unitPurpose"  type="text"  class="disableText" readonly="readonly"/></td>
 						<td class="Edit-Title1">出租用途</td><td class="Edit-Input1"><input id="id_hlcPurpose"  type="text"  class="disableText" readonly="readonly"/></td>
					</tr>
					<tr>
						<td class="Edit-Title1">物业地址</td><td  class="Edit-Input1" colspan="3"><input id="id_unitAdress"  style='width:630px' type="text"  class="disableText" readonly="readonly"/></td>
 					</tr>
 					<tr>
 						<td class="Edit-Title1">出租人</td><td class="Edit-Input1"><input id="id_hlcFirstEnprName"  type="text"  class="disableText" readonly="readonly"/></td>
 						<td class="Edit-Title1">合同编号</td><td class="Edit-Input1"><input id="id_hlcBarCode"  placeholder="系统自动生成"  type="text"  class="disableText" readonly="readonly"/></td>
					</tr>
					<tr>
						<td class="Edit-Title1">承租人<span class="font-red">*</span></td><td class="Edit-Input1"><input id="id_hlcSecondEnprName"   class="easyui-validatebox"   validType="length[1,120]"  invalidMessage="不能超过120个字符！" required="true" missingMessage="承租人不能为空" type="text" ></input></td>
						<td class="Edit-Title1">签订日期<span class="font-red">*</span></td><td class="Edit-Input1"><input id="id_hlcRegDate" class="easyui-datebox" editable="false"   missingMessage="签订日期不能为空" data-options="width:200" required="required"  type="text" ></input></td>
					</tr>
					<tr>
						<td class="Edit-Title1">承租人证件类型<span class="font-red">*</span></td><td class="Edit-Input1"> <input type="text" id="id_hlcSecondPaperTyype"  class="easyui-combobox "  editable="false" required="true"  missingMessage="承租人证件类型不能为空"  data-options="height:28,width:202,valueField:'classifyCode',textField:'classifyName',data:${json:classify("STD_CZRZJLX")}"/> </td>		
						<td class="Edit-Title1">承租人证件号码<span class="font-red">*</span></td><td class="Edit-Input1"><input id="id_hlcSecondPaperNo"   class="easyui-validatebox"   validType="length[1,25]"  invalidMessage="不能超过25个字符！" required="true" missingMessage="承租人证件号码不能为空" type="text" ></input></td>
					</tr>
					<tr>
						<td class="Edit-Title1">承租人联系人<span class="font-red">*</span></td><td class="Edit-Input1"><input id="id_hlcSecondtname"   class="easyui-validatebox"   validType="length[1,25]"  invalidMessage="不能超过25个字符！" required="true" missingMessage="承租人联系人不能为空" type="text" ></input></td>
						<td class="Edit-Title1">承租人联系电话<span class="font-red">*</span></td><td class="Edit-Input1"><input id="id_hlcSecondtTel"   class="easyui-validatebox"   validType="length[1,25]"  invalidMessage="不能超过25个字符！" required="true" missingMessage="承租人联系电话不能为空" type="text" ></input></td>
					</tr>
					<tr>
						<td class="Edit-Title1">合同起始日期<span class="font-red">*</span></td><td class="Edit-Input1"><input id="id_hlcRegStartDate" class="easyui-datebox" editable="false"   missingMessage="合同开始日期不能为空" data-options="width:200" required="required"  type="text" ></input></td>
						<td class="Edit-Title1">合同结束日期<span class="font-red">*</span></td><td class="Edit-Input1"><input id="id_hlcRegEndDate" class="easyui-datebox" editable="false"   missingMessage="合同结束日期不能为空" data-options="width:200" required="required"  type="text" ></input></td>
					</tr>
					<tr>
						<td class="Edit-Title1">付款方式<span class="font-red">*</span></td><td class="Edit-Input1"><input type="text" id="id_hlcRentPayType"  class="easyui-combobox "  editable="false" required="true"  missingMessage="付款方式不能为空"  data-options="height:28,width:202,valueField:'classifyCode',textField:'classifyName',data:${json:classify("STD_PayType")}"/> </td>		
						<td class="Edit-Title1">租赁保证金<span class="font-red">*</span></td><td class="Edit-Input1"><input type="text"  id="id_hlcDeposit"  class="easyui-numberbox" data-options="min:0,precision:2,groupSeparator:','"  validType="length[1,16]"  invalidMessage="不能超过16位数！"  required="true"  missingMessage="租赁保证金必填"/></input></td>
					</tr>
					<tr>
						<td class="Edit-Title1">月租金<span class="font-red">*</span></td><td class="Edit-Input1"><input type="text"  id="id_hlcRuleRent"  class="easyui-numberbox" data-options="min:0,precision:2,groupSeparator:','"  validType="length[1,16]"  invalidMessage="不能超过16位数！"  required="true"  missingMessage="月租金必填"/></input></td>
						<td class="Edit-Title1">递增周期（月）<span class="font-red">*</span></td><td class="Edit-Input1"><input type="text"  id="id_hlcIncrRound"  class="easyui-numberbox" data-options="min:0,precision:0,groupSeparator:','"  validType="length[1,5]"  invalidMessage="不能超过5位数！"  required="true"  missingMessage="递增周期（月）必填"/></input></td>
					</tr>
					<tr>
						<td class="Edit-Title1">单价（元/平方米）<span class="font-red">*</span></td><td class="Edit-Input1"><input type="text"  id="id_hlcUintRuleRent"  class="easyui-numberbox" data-options="min:0,precision:2,groupSeparator:','"  validType="length[1,16]"  invalidMessage="不能超过16位数！"  required="true"  missingMessage="单价必填"/></input></td>
						<td class="Edit-Title1">递增率（%）<span class="font-red">*</span></td><td class="Edit-Input1"><input type="text"  id="id_hlcIncrRate"  class="easyui-numberbox" data-options="min:0,max:100,precision:2,groupSeparator:','"  validType="length[1,6]"  invalidMessage="不能超过6位数！"  required="true"  missingMessage="递增率必填"/></input></td>
					</tr>
					<tr><td colspan="2"><div class='id_div_rulebtnarea'><input id="id_btn_addRulerow" class="bt_editpanel" type="button" value="添加一行"/><input id="id_btn_deleteRulerow" class="bt_editpanel mleft5" type="button" value="删除一行"/>  </div>
					</td><td class="Edit-Title1">租金计算方式<span class="font-red">*</span></td><td><input type="text" id="id_hlcRentType"  class="easyui-combobox "  editable="false" required="true"  missingMessage="租金计算方式不能为空"  data-options="height:28,width:202,valueField:'classifyCode',textField:'classifyName',data:${json:classify("STD_RentType")}"/></td></tr>
					<tr>
					<td colspan="4">
					<div class="biao" style="margin-left:30px;margin-top:8px;">
						<table id="id_table_grid"></table>
					</div>
					
					</td>
					</tr>
					
					<tr>
						<td class="Edit-Title1">其他条款</td><td  class="Edit-Input1" colspan="3"><textarea  id="id_hlcOtherItem" style='width:710px;resize: none' class="easyui-validatebox"   validType="length[1,250]"  invalidMessage="不能超过250个字符！"></textarea></td>
					</tr>
					<tr>
						<td class="Edit-Title1">备注</td><td  class="Edit-Input1" colspan="3"><textarea  id="id_hlcFirstRepairItem" style='width:710px;resize: none' class="easyui-validatebox"   validType="length[1,250]"  invalidMessage="不能超过250个字符！"></textarea></td>
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
	
	<div id="id_div_secondStep"  class="Editinput" style="width:100%;position:fixed;bottom:38px;padding-top:3px;padding-bottom:3px;padding-left:400px;background-color:#CCCCCC;">
		<input type="button" class="bt_ensure" value="保存" id="id_btn_save"></input>
		<input type="button" class="bt_cancel" value="返回" id="id_btn_return"></input>
	</div>
</body>
</html>
