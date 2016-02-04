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
				   		<div class="editlogo"></div>
		           		<div class="editTitle">基本基本信息</div>						           			
						<hr  class="editline"/>
		           	</div>
                    <div   class="editTips">(以下用<span class="notnullTip" style="margin-right:3px;">*</span>标记为必填信息)</div> 	
                       <table cellSpacing=1 cellPadding=0>
                       		<tr>
								<td   class="Edit-Title1">申领部门</td>
								<td   class="Edit-Input1"><input  id="id_orgSysCode" fieldname="orgSysCode"  class="disableText" readonly="readonly"/></td>
								<td   class="Edit-Title1">申领类目</td>
								<td   class="Edit-Input1"><input  id="id_orgSysCode" fieldname="orgSysCode"  class="disableText" readonly="readonly"/></td>
							</tr>
							<tr>
								<td   class="Edit-Title1">申领人</td>
								<td   class="Edit-Input1"><input  id="id_orgSysCode" fieldname="orgSysCode"  class="disableText" readonly="readonly"/></td>
								<td   class="Edit-Title2">申请日期<span class="notnullTip">*</span></td>
								<td   class="Edit-Input2"><input id="id_letRentDate" fieldname="letRentDate" /></td>
							</tr>
					 </table> 
					 
					 <div class="editItem">
				   		<div class="editlogo"></div>
		           		<div class="editTitle">物品信息</div>						           			
						<hr  class="editline"/>
		           	</div>
                          <table cellSpacing=1 cellPadding=0>
                          <tr><td>物品名称</td><td>类别</td><td>规格</td><td>单位</td></tr>
                       		
					 </table> 
					 
					
					 
                    
					<div style="height:50px;"></div>                           		
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

