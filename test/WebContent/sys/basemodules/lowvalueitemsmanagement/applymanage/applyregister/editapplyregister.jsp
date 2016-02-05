<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!DOCTYPE HTML>
<html> 
<head>
<link href="editapplyregister.css" rel="stylesheet" type="text/css" />
<script src="editapplyregister.js" type="text/javascript"></script>
<script>
//业务类型
var business="${param.business}";
//节点code
var pk="${param.pk}";
//物业pk
var unitpk="${param.unitpk}";
//招租方式
var data_letRentWay=${json:classify("STD_ZZFS")};
//拟出租用途

var data_planLetPurpose=${json:classify("STD_DYYT")};
//是、否 
var data_YesNo=${json:classify("STD_YesNo")};
//物业分类
var data_unitClassify=${json:classify("STD_DYFL")};

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
						<hr  class="editline"/>
		           	</div>
                    <div   class="editTips">(以下用<span class="notnullTip" style="margin-right:3px;">*</span>标记为必填信息)</div> 	
                       <table cellSpacing=1 cellPadding=0>
                       		<tr>
								<td   class="Edit-Title1">类目<span class="notnullTip">*</span></td>
								<td   class="Edit-Input1"><input type="text" id="id_imCategoryPK" fieldname="imCategoryPK" class="easyui-combobox"  editable="false" required="true"  missingMessage="必选项"  data-options="height:28,width:202,valueField:'pk',textField:'categoryName'"/></td>
								<td   class="Edit-Title2">类别<span class="notnullTip">*</span></td>
								<td   class="Edit-Input2">
								<input id="id_imType" fieldname="imType" class="easyui-combobox" editable="false" required="true"  missingMessage="必选项"  data-options="height:28,width:202,value:'WPLB_001',valueField:'classifyCode',textField:'classifyName',data:[{classifyCode:'WPLB_001,WPLB_002',classifyName:'全部'},{classifyCode:'WPLB_001',classifyName:'低值品'},{classifyCode:'WPLB_002',classifyName:'固定资产'}]" />
								</td>
							</tr>
							<tr>
								<td   class="Edit-Title1">名称<span class="notnullTip">*</span></td>
								<td   class="Edit-Input1"><input id="id_imName" fieldname="imName" validType="length[1,50]" invalidMessage="不能超过25个字符" class="easyui-validatebox"/></td>
								
								<td   class="Edit-Title2">资产分类代码<span class="notnullTip">*</span></td>
								<td   class="Edit-Input2"><input  id="id_imAssetType" fieldname="imAssetType"/></td>
							</tr>
					 </table> 
					
					<div class="biao" style="background-color: white;">
						<table id="id_table_grid">
						</table>
					</div>
					
					 <div style="height:50px;">
					 </div>                           		
			</div>
		</div> 
	     
	</div>
	<div style="background-color:white;height:100px;"></div>
	<div class="Editinput"><input type="button" id="save" class="bt_ensure" value="保存"></input><input id="return" type="button" class="bt_cancel" value="返回"></input></div>

	</body>
</html>

