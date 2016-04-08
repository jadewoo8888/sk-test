<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <script type="text/javascript" src="editcategory.js"></script> 
<script type="text/javascript">
//事务 
var business="${param.business}";
var pk="${param.pk}";
//角色编号 
var groupCode="${param.groupCode}";

</script>
<style type="text/css">
body{ width:100%;height:100%;}
form div{ margin-top:10px}
label{ width:80px; display:block; text-align:right; float:left; margin:0 auto;font-size:14px;color: #555;}
label span{color:red;}
form div input{margin-left:10px; width:200px; font-size:12px; line-height:20px; padding:0 8px; height:26px; border:1px solid #95B8E7;}

/*easyui控件样式*/
.combo{margin-left:10px;}
.validatebox-tip{margin-top: -2px}
.shaixuan .numberbox-f{height: 32px !important;width: 203px;margin-left: 10px;}
.notnullTip{color:red;vertical-align: middle;margin-left:3px;}
#submit{width:50px}
#return{width:50px}
</style>
</head> 
<body class="edit_body"> 
	<div id="id_div_desc" class="head" >
		<span id="businesstext" class="head-title">新增类目</span>
		<span class="head-tx"></span>
	</div>
	
	<div class="shaixuan clearfloat ">
		  	<form id="ff" method="post" style="width:400px; margin-left:50px; margin-top:50px">   
		  		<div class="EditPanel">
				    <div>   
				        <label for="type">名称<span class="notnullTip">*</span></label>
				        <input id="categoryName" name="categoryName" class="easyui-validatebox" required="true"  validType="length[1,50]"  invalidMessage="不能超过50个字符！" missingMessage="不能为空" />   
				    </div>   
				    <div style="height:30px">   
				        <label for="type">角色</label>
				        <input id="groupCode" name="groupCode"/>    
				    </div>  
				    <div>   
				        <label for="type">备注</label>
				        <input type="text" id="categoryRemark" name="categoryRemark"  class="easyui-validatebox"   validType="length[1,125]"  invalidMessage="不能超过125个字符！"/>   
				    </div>   
			    </div>
	    </form>
	</div>
		<div class="tb_row">
		    <div style="margin-left:150px;padding-top:15px;">
		    	<input type="button" id="submit"  onclick="savedata()" class="bt_ensure" value="保存" />  
		    	<input type="button" id="return" class="bt_cancel" value="返回" />
	    	</div>
	    </div>
	</div>
</body>
</html>
