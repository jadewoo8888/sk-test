<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!DOCTYPE HTML>
<html> 
<head>
<script type="text/javascript" src="editlviStoreRecord.js"></script> 
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
//var data_lviSRDate=${json:classify("STD_DYZT")};
</script>
</head>
<body class="edit_body" style="background-color:white;" >
	<div id="id_div_desc" class="head">
		<span class="head-title">修改低值品入库记录</span> 
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
								<td   class="Edit-Title1">类目</td>
								<td   class="Edit-Input1"><input type="text" id="id_lviSRCategoryPK" fieldname="lviSRCategoryPK" readonly="readonly"  missingMessage="必选项"/></td>
								<td   class="Edit-Title2">入库日期</td>
								<td   class="Edit-Input2">
								<input id="id_lviSRDate" fieldname="lviSRDate" readonly="readonly" required="true"  missingMessage="必选项"  data-options="height:28,width:202,value:'WPLB_001',valueField:'classifyCode',textField:'classifyName',data:[{classifyCode:'WPLB_001',classifyName:'低值品'},{classifyCode:'WPLB_002',classifyName:'固定资产'}]" />
								</td>
							</tr>
							
							<tr>
								<td   class="Edit-Title1">入库部门</td>
								<td   class="Edit-Input1"><input type="text" id="id_lviSRDeptCode" fieldname="lviSRDeptCode"  readonly="readonly" required="true"  missingMessage="必选项"  data-options="height:28,width:202,valueField:'pk',textField:'categoryName'"/></td>
								<td   class="Edit-Title2">入库人</td>
								<td   class="Edit-Input2">
								<input id="id_lviSRPerson" fieldname="lviSRPerson" readonly="readonly" required="true"  missingMessage="必选项"  data-options="height:28,width:202,value:'WPLB_001',valueField:'classifyCode',textField:'classifyName',data:[{classifyCode:'WPLB_001',classifyName:'低值品'},{classifyCode:'WPLB_002',classifyName:'固定资产'}]" />
								</td>
							</tr>
							
							<tr>
								<td  class="Edit-Title2">类别</td>
									<td   class="Edit-Input2">
									<input id="id_lviSRType" fieldname="lviSRType" readonly="readonly" missingMessage="必选项"  data-options="height:28,width:202,value:'WPLB_001',valueField:'classifyCode',textField:'classifyName',data:[{classifyCode:'WPLB_001',classifyName:'低值品'},{classifyCode:'WPLB_002',classifyName:'固定资产'}]" />
									</td>
								<td   class="Edit-Title1">物品名称</td>
								<td   class="Edit-Input1"><input id="id_lviSRName" fieldname="lviSRName" readonly="readonly" validType="length[1,50]" invalidMessage="不能超过25个字符" class="easyui-validatebox"/></td>
							</tr>
							
							<tr> 
								<td   class="Edit-Title1">规格</td>
								<td   class="Edit-Input1"><input  id="id_lviSRSpecification" fieldname="lviSRSpecification" readonly="readonly" validType="length[1,50]" invalidMessage="不能超过50个字符" class="easyui-validatebox"/></td>
								<td   class="Edit-Title2">单位</td>
								<td   class="Edit-Input2"><input id="id_lviSRMetricUnit" fieldname="lviSRMetricUnit" readonly="readonly" validType="length[1,50]" invalidMessage="不能超过50个字符" class="easyui-validatebox"/></td>					
							</tr>
							
							<tr>
								<td   class="Edit-Title1">入库数量<span class="notnullTip">*</span></td>
								<td colspan="3"><input id="id_lviSRCount" fieldname="lviSRCount" validType="length[1,50]" invalidMessage="不能超过50个字符" class="easyui-validatebox"/></td>
							</tr>
							<tr>
								<td   class="Edit-Title1">备注</td>
								<td   class="Edit-Input-Merge" colspan="3"><textarea  id="id_lviSRRemark" fieldname="lviSRRemark" validType="length[1,125]" invalidMessage="不能超过125个字符" class="easyui-validatebox"></textarea></td>
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
	           		<div class="editTitle">入库附件</div>						           			
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
	<div class="Editinput"><input type="button" id="save" class="bt_ensure" onclick="savedata()" value="保存"></input><input id="return" type="button" class="bt_cancel" value="返回"></input></div>

	</body>
</html>

