<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!DOCTYPE HTML>
<html> 
<head>
<link href="editHouseUnit.css" rel="stylesheet" type="text/css" />
<script src="editHouseUnit.js" type="text/javascript"></script>
<style>
.colorblack{color: #000000;}
.notnullTip{color:red;vertical-align: middle;margin-left:3px;}
.Edit-Title1{width:200px;}
#id_unitAdress{width:638px;}
.EditPanel{padding-left:10px;}

.colorlink{color:#00afe8;cursor:pointer;}
</style>
<script>
//业务类型
var business="${param.business}";
//节点code
var pk="${param.pk}";
//使用状态
var data_useLineMD=${json:classify("STD_DYZT")};
//物业用途
var data_unitPurpose=${json:classify("STD_DYYT")};
var data_unitPurpose2=${json:classify("STD_DYYT")};
//物业分类/产权情况
var data_unitClassify=${json:classify("STD_DYFL")};
var data_unitClassify2=${json:classify("STD_DYFL")};
//是否配备消防栓及消防喷淋系统
var data_ifFirePlug=${json:classify("STD_YesNo")};
var data_ifFirePlug2=${json:classify("STD_YesNo")};
//校区
var data_campus=${json:classify("STD_SSXQ")};
//卡片模板信息
var cardType=[${json:ac()}];
</script>
</head>
<body class="edit_body" style="background-color:white;" >
	<div id="id_div_desc" class="head">
		<span class="head-title"></span>
		<span class="head-tx"></span>
	</div>
	
	<div  id="tabs" class="easyui-tabs clearfloat">	
		<div title="基本信息" id="basic" > 
			<div class="EditPanel" id="EditPanel" >			
		           	<div class="editItem">
				   		<div class="editlogo"></div>
		           		<div class="editTitle">基本信息</div>						           			
						<hr  class="editline"/>
		           	</div>
                    <div   class="editTips">(以下用<span class="notnullTip" style="margin-right:3px;">*</span>标记为必填信息)</div> 	
                       <table cellSpacing=1 cellPadding=0>
                       		<tr>
								<td   class="Edit-Title1">所属单位</td>
								<td   class="Edit-Input1"><input  id="id_orgSysCode" fieldname="orgSysCode"  class="disableText" readonly="readonly"/></td>
								<td   class="Edit-Title2">资产名称<span class="notnullTip">*</span></td>
								<td   class="Edit-Input2"><input id="id_assetSysCode" fieldname="assetSysCode" /></td>
							</tr>
							<tr>
								<td   class="Edit-Title1">物业编号<span class="notnullTip">*</span></td>
								<td   class="Edit-Input1"><input id="id_unitCode" fieldname="unitCode" class="easyui-validatebox " data-options="validType:'sc_Numlimit[{length:4}]'"/></td>
								<td   class="Edit-Title2">物业名称<span class="notnullTip">*</span></td>
								<td   class="Edit-Input2"><input  id="id_unitName" fieldname="unitName"  validType="length[1,25]" invalidMessage="不能超过25个字符" class="easyui-validatebox"/></td>
							</tr>
							<tr>
								<td   class="Edit-Title1">物业地址<span class="notnullTip">*</span></td>
								<td   class="Edit-Input-Merge" colspan="3"><input id="id_unitAdress" fieldname="unitAdress" validType="length[1,250]" invalidMessage="不能超过250个字符" class="easyui-validatebox"/></td>
							</tr>
							<tr> 
								<td   class="Edit-Title1">所在楼层<span class="notnullTip">*</span></td>
								<td   class="Edit-Input1"><input  id="id_floorsNo" fieldname="floorsNo" validType="length[1,3]" invalidMessage="不能超过3个字符" class="easyui-validatebox"/></td>
								<td   class="Edit-Title2">物业面积<span class="notnullTip">*</span></td>
								<td   class="Edit-Input2"><input id="id_unitArea" fieldname="unitArea" validType="length[1,15]" invalidMessage="不能超过15个字符" class="easyui-validatebox"/></td>					
							</tr>
							<tr>
								<td   class="Edit-Title1">使用状态<span class="notnullTip">*</span></td>
								<td   class="Edit-Input1"><input  id="id_useLineMD" fieldname="useLineMD"/></td>	
								<td   class="Edit-Title2">委托单位<span id="id_clients_tip" class="notnullTip hidden">*</span></td>
								<td   class="Edit-Input2"><input id="id_clients" fieldname="clients"  validType="length[1,25]" invalidMessage="不能超过25个字符" class="easyui-validatebox"/></td>	
							</tr> 
							<tr>
								<td   class="Edit-Title1">物业用途<span id="id_unitPurpose_tip" class="notnullTip hidden">*</span></td>
								<td   class="Edit-Input1"><input  id="id_unitPurpose" fieldname="unitPurpose"/></td>
								<td   class="Edit-Title2">物业分类/产权情况<span id="id_unitClassify_tip" class="notnullTip hidden">*</span></td>
								<td   class="Edit-Input2"><input id="id_unitClassify" fieldname="unitClassify" /></td>
							</tr>
							<tr>
								<td   class="Edit-Title1">使用人</td>
								<td   class="Edit-Input1"><input  id="id_usePeople" fieldname="usePeople"  validType="length[1,25]" invalidMessage="不能超过25个字符" class="easyui-validatebox"/></td>	
								<td   class="Edit-Title2">归口管理人</td>
								<td   class="Edit-Input2"><input id="id_centralizePeople" fieldname="centralizePeople"  validType="length[1,25]" invalidMessage="不能超过25个字符" class="easyui-validatebox"/></td>	
							</tr> 
							<tr>
								<td   class="Edit-Title1">使用部门</td>
								<td   class="Edit-Input1"><input  id="id_useDept" fieldname="useDept" validType="length[1,25]" invalidMessage="不能超过25个字符" class="easyui-validatebox"/></td>
								<td   class="Edit-Title2">归口管理部门</td>
								<td   class="Edit-Input2"><input id="id_centralizeDept" fieldname="centralizeDept"  validType="length[1,25]" invalidMessage="不能超过25个字符" class="easyui-validatebox"/></td>
							</tr>
							<tr>
								<td   class="Edit-Title1">是否配备消防栓及消防喷淋系统<span id="id_ifFirePlug_tip" class="notnullTip hidden">*</span></td>
								<td   class="Edit-Input1"><input  id="id_ifFirePlug" fieldname="ifFirePlug" /></td>
								<td   class="Edit-Title2">校区</td>
								<td   class="Edit-Input2"><input id="id_campus" fieldname="campus"  /></td>
							</tr>
							<tr>
								<td   class="Edit-Title1">备注</td>
								<td   class="Edit-Input-Merge" colspan="3"><textarea  id="id_unitRemark" fieldname="unitRemark" validType="length[1,250]" invalidMessage="不能超过250个字符" class="easyui-validatebox"></textarea></td>
							</tr>
					 </table> 
					 <div style="height:50px;">
					 </div>                           		
			</div>
		</div>
		
		
		<div title="附件" id="attached">
			<div class="pd10">
			   <div class="editItem">
			   		<div class="editlogo"></div>
	           		<div class="editTitle">资产附件</div>						           			
					<hr  class="editline"/>
	           	</div>
	            <div   class="editTips"></div> 
	
				<div style="margin-top:8px;margin-left:30px;">
					<iframe id='id_iframe_append' frameborder='no' border='0'  style='width:760px;height:350px'></iframe>
				</div>	
			</div>	
	    </div>   
	     
	</div>
	<div style="background-color:white;height:100px;"></div>
	<div class="Editinput"><input type="button" id="save" class="bt_ensure" value="保存"></input><input id="return" type="button" class="bt_cancel" value="返回"></input></div>

	</body>
</html>

