<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!DOCTYPE HTML>
<html> 
<head>
<script type="text/javascript" src="edititems.js"></script> 
<style>
@charset "utf-8";
textarea{resize:none;overflow:hidden;}
/*编辑页面公共样式star*/

/*编辑页面公共样式end*/
.panel-header, .panel-body{border-color:#E5E5E5;}
.biao .panel-body{border:1px solid rgb(180,180,180) !important;}
/*编辑区域信息*/
.editItem{height:26px;line-height:26px;vertical-align:middle;}
.editlogo{width:3px;height:20px;display:inline-block;background-color:#1fb5ad;margin-top:2px;margin-right:10px;float:left;}
.editTitle{display:inline-block;float:left;margin-right:20px;width:60px;font-size:13px;}
.editline{height:1px;border:none;border-top:1px solid rgb(210,210,210);position:relative;top:12px;}
.editTips{color:#666666;padding-left:90px;position:relative;top:-9px;}
/*保存、返回按钮*/
.Editinput{
width:100%;
position:fixed;
bottom:38px;
padding-top:5px;
padding-bottom:5px;
padding-left:400px;
background-color:rgba(180,180,180,0.5);
}
.colorblack{color: #000000;}
.notnullTip{color:red;vertical-align: middle;margin-left:3px;}
.Edit-Title1{width:200px;}
#id_unitAdress{width:638px;}
.EditPanel{padding-left:10px;}

.colorlink{color:#00afe8;cursor:pointer;}
</style>
<script>
//事务 
var business="${param.business}";
var pk="${param.pk}";
//var data_imType=${json:classify("STD_DYZT")};
</script>
</head>
<body class="edit_body" style="background-color:white;" >
	<div id="id_div_desc" class="head">
		<span class="head-title"></span>
		<span class="head-tx"></span>
	</div>
	
	<div class="EditPanel" id="EditPanel" >			
           	<div class="editItem">
				<hr  class="editline"/>
           	</div>
                     <table cellSpacing=1 cellPadding=0>
                     		<tr>
						<td   class="Edit-Title1">类目<span class="notnullTip">*</span></td>
						<td   class="Edit-Input1"><input type="text" id="id_imCategoryPK" fieldname="imCategoryPK" class="easyui-combobox"  editable="false" required="true"  missingMessage="必选项"  data-options="height:28,width:202,valueField:'pk',textField:'categoryName'"/></td>
						<td   class="Edit-Title2">类别<span class="notnullTip">*</span></td>
						<td   class="Edit-Input2">
						<input id="id_imType" fieldname="imType" class="easyui-combobox" editable="false" required="true"  missingMessage="必选项"  data-options="height:28,width:202,value:'WPLB_001',valueField:'classifyCode',textField:'classifyName',data:[{classifyCode:'WPLB_001',classifyName:'低值品'},{classifyCode:'WPLB_002',classifyName:'固定资产'}]" />
						</td>
					</tr>
					<tr>
						<td   class="Edit-Title1">名称<span class="notnullTip">*</span></td>
						<td   class="Edit-Input1"><input id="id_imName" fieldname="imName" class="easyui-validatebox" required="true"  validType="length[1,50]"  invalidMessage="不能超过50个字符！" missingMessage="不能为空"/></td>
						<td   class="Edit-Title2">资产分类代码<span id="span_imAssetType" class="notnullTip">*</span></td>
						<td   class="Edit-Input2"><input  id="id_imAssetType" fieldname="imAssetType" class="disableText" readonly="readonly"/></td>
					</tr>
					<tr> 
						<td   class="Edit-Title1">规格</td>
						<td   class="Edit-Input1"><input  id="id_imSpecification" fieldname="imSpecification" validType="length[1,50]" invalidMessage="不能超过50个字符" class="easyui-validatebox"/></td>
						<td   class="Edit-Title2">单位<span class="notnullTip">*</span></td>
						<td   class="Edit-Input2"><input id="id_imMetricUnit" fieldname="imMetricUnit" required="true" validType="length[1,50]" invalidMessage="不能超过50个字符" class="easyui-validatebox"/></td>					
					</tr>
					<tr>
						<td   class="Edit-Title1">备注</td>
						<td   class="Edit-Input-Merge" colspan="3"><textarea  id="id_imRemark" fieldname="imRemark" validType="length[1,125]" invalidMessage="不能超过125个字符" class="easyui-validatebox"></textarea></td>
					</tr>
			 </table> 
			 <div style="height:50px;">
			 </div>                           		
	</div>
			
	<div style="background-color:white;height:100px;"></div>
	<div class="Editinput"><input type="button" id="save" class="bt_ensure" onclick="savedata()" value="保存"></input><input id="return" type="button" class="bt_cancel" value="返回"></input></div>

	</body>
</html>

