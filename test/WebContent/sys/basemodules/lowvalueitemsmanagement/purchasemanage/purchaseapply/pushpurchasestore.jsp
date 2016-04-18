<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!DOCTYPE HTML>
<html> 
<head>
<title>采购申请-->入库</title>
<link href="pushpurchasestore.css" rel="stylesheet" type="text/css" />
<style>
.colorblack{color: #000000;}
.notnullTip{color:red;vertical-align: middle;margin-left:3px;}
.View-Title1{width:200px;}
.View-Title2{width:200px;}
.editTips{text-align:left;}
#id_unitAdress{width:638px;}
.EditPanel{padding-left:10px;}

.bt_ensure[type="button"]{
	width:auto;
    height: 18px;
    margin-left: 8px;
    text-indent: 0px;
    cursor: pointer;
    padding: 0px 10px;
    display: inline-block;
    color: #ffffff !important;
    text-align: center;
    font-size: 12px;
    line-height: 18px;
    border-radius: 2px;
    background-color: #1fb5ad;
    border: medium none;
}
</style> 
<script src="pushpurchasestore.js" type="text/javascript"></script>
<script src="${contextPath}/core/componentmodule/upload/jquery.commonupload.js" type="text/javascript"></script>
<script> 
//业务类型
var business=STR_REGISTER_ADDNEW;
//var categoryName="${param.categoryName}";
var categoryName="";
var ipCategoryPK = "${param.ipCategoryPK}";
var pk="${param.pk}";
</script>
</head>
<body class="edit_body" style="background-color:white;" >
	<div id="id_div_desc" class="head">
		<span class="head-title">物品入库</span>
		<span class="head-tx"></span>
	</div>
	
	<div  id="tabs" class="easyui-tabs clearfloat">	
		<div title="基本信息" id="basic" > 
			<div class="EditPanel" id="EditPanel" >			
		           	<div class="editItem">
						<hr  class="editline"/>
		           	</div>
                    <table cellSpacing=1 cellPadding=0>
                       		<tr>
								<td   class="Edit-Title1">申购部门</td>
								<td   class="Edit-Input1">
								<input id="id_ipDeptCode" fieldname="ipDeptCode" class="disableText" readonly="readonly"/>
								</td>
								<td   class="Edit-Title1">申购类目</td>
								<td   class="Edit-Input1">
								<input id="id_ipCategoryPK" fieldname="ipCategoryPK" class="disableText" readonly="readonly"/>
								</td>
							</tr>
							<tr>
								<td   class="Edit-Title1">申购人</td>
								<td   class="Edit-Input1"><input id="id_ipApplyPerson" fieldname="ipApplyPerson" class="disableText" readonly="readonly"/></td>
								
								<td   class="Edit-Title1">申购日期</td>
								<td   class="Edit-Input1"><input  id="id_ipPurchaseDate"  fieldname="ipPurchaseDate" class="disableText" readonly="readonly"/></td>
							</tr>
							
					<tr>
						<td colspan="4">
						<div class="biao" style="background-color: white;">
							<table id="id_table_grid">
							</table>
						</div>
						</td>
					</tr>
					
					<tr>
						<td class="Edit-Title1">备注</td><td  class="Edit-Input1" colspan="3"><textarea  id="id_ipRemark" fieldname="ipRemark" style='width:710px;resize: none' class="easyui-validatebox"   validType="length[1,250]"  invalidMessage="不能超过250个字符！" readonly="readonly"></textarea></td>
					</tr>
					</table> 
					
					 <div style="height:50px;">
					 </div>                           		
			</div>
		</div> 
	     
	     <!--  <div title="附件" id="attached">
			<div class="pd10">
			   <div class="editItem">
			   		<div class="editlogo"></div>
	           		<div class="editTitle">采购附件</div>						           			
					<hr  class="editline"/>
	           	</div>
	            <div   class="editTips"></div> 
	
				
			</div>	
	    </div>   -->
	    
	    <div title="附件信息">
		    <div id='id_div_appendarea' style="margin-top:8px;margin-left:30px;">
		    </div>
		</div>
	    
	</div>
	
	<div style="background-color:white;height:100px;"></div>
	
	
	<div class="Editinput">
		<input type="button" id="id_btn_storeing" class="bt_ensure" value="入库"></input>
		<input id="id_bt_return" type="button" class="bt_cancel" value="返回"></input>
	</div>

	</body>
</html>


