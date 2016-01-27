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
<script src="editClient.js" type="text/javascript"></script>
<link href="editClient.css" rel="stylesheet" type="text/css" />
<script> 
var pk ="<%=pk%>";
var strBusiType ="<%=strBusiType%>";
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
						<td class="Edit-Title1">承租人<span class="font-red">*</span></td><td class="Edit-Input1"><input id="id_hlcSecondEnprName"  type="text"  class="easyui-searchbox txt_class"  style='width:200px' ></input> </td>
 						<td class="Edit-Title1">物业面积<span class="font-red">*</span></td><td class="Edit-Input1"><input id="id_unitArea"  type="text"   class="easyui-numberbox" data-options="min:0,precision:2,groupSeparator:','"  validType="length[1,16]"  invalidMessage="不能超过16位数！"  required="true"  missingMessage="物业面积必填"/></td>
 					</tr>
					<tr>
						<td class="Edit-Title1">联系人<span class="font-red">*</span></td><td class="Edit-Input1"><input id="id_linker"   class="easyui-validatebox"   validType="length[1,25]"  invalidMessage="不能超过25个字符！" required="true" missingMessage="联系人不能为空" type="text" ></input></td>
						<td class="Edit-Title1">联系电话<span class="font-red">*</span></td><td class="Edit-Input1"><input id="id_hlcSecondtTel"  class="easyui-validatebox"    validType="length[1,25]" invalidMessage="不能超过25个字符！"  missingMessage="联系电话不能为空" data-options="width:200" required="required" type="text"></input></td>
					</tr>
					<tr>
						<td class="Edit-Title1">物业地址<span class="font-red">*</span></td><td  class="Edit-Input1" colspan="3"><input id="id_unitAdress" class="easyui-validatebox"  style='width:605px'  validType="length[1,100]" invalidMessage="不能超过100个字符！"  missingMessage="物业地址不能为空" required="required" type="text"></input></td>
 					</tr>
 					<tr> 
 					<td class="Edit-Title1">是否代收水电费<span class="font-red">*</span></td><td  class="Edit-Input1" ><input id="id_ifCollection" class="easyui-combobox" editable="false" required="true" missingMessage="是否代收水电费不能为空"  style='width:200px' data-options="value:'是',valueField:'classifyCode',textField:'classifyName',data:[{classifyCode:'是',classifyName:'是'},{classifyCode:'否',classifyName:'否'}]"/>	</td>
 					<td class="Edit-Title1">是否代收物业卫生费<span class="font-red">*</span></td><td  class="Edit-Input1" ><input id="id_ifHealthFee" class="easyui-combobox" editable="false" required="true" missingMessage="是否代收物业卫生费不能为空"  style='width:200px'  data-options="value:'是',valueField:'classifyCode',textField:'classifyName',data:[{classifyCode:'是',classifyName:'是'},{classifyCode:'否',classifyName:'否'}]"/>	</td>
 					</tr>
 					<tr>
						<td class="Edit-Title1">登记人</td><td class="Edit-Input1"><input id="id_lister" class="easyui-validatebox" validType="length[1,25]"  invalidMessage="不能超过25个字符！" type="text"></input></td>
						<td class="Edit-Title1">登记日期</td><td class="Edit-Input1"><input id="id_listDate" class="easyui-datebox" editable="false" data-options="width:200"  type="text" ></input></td>
					</tr>
 					<tr>
						<td class="Edit-Title1">备注</td><td  class="Edit-Input1" colspan="3"><textarea  id="id_remark" style='width:595px;resize: none' class="easyui-validatebox"   validType="length[1,125]"  invalidMessage="不能超过125个字符！"></textarea></td>
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
