<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <script type="text/javascript" src="edititems.js"></script> 
<script type="text/javascript">
//事务 
var busitype="${param.busitype}";
var pk="${param.pk}";

</script>
<style type="text/css">
body{ width:100%;height:100%;}

.functioninput{
	width:80px;
	height:260px;
	float:left;
	margin-left:10px;
}
/*表单字体样式*/
.table_edit{
font-size: 14px;
background-color:white;
height:480px;
margin-left:25px;
}
.table_edit label{
width:100px;
display:block;
float:left; 
margin:0 auto;
text-align:right;
color:#474747;
}
.tb_row input{margin-left:10px;}
.tb_row label span{color:red;}
.table_edit .tb_row{height:38px;line-height:36px;clear:both;}
/*加入横线,不要横线去掉改样式*/
/*
.table_edit .tb_row{border-bottom:1px solid #F7F7F7;}
*/
.table_edit .tb_row_zd{height:260px;line-height:260px;clear:both;margin-top:5px;}
</style>
</head> 
<body class="edit_body"> 
	<div id="id_div_desc" class="head" >
		<span id="businesstext" class="head-title">新增物品</span>
		<span class="head-tx"></span>
	</div>
	
	<div style="background-color:white;padding:10px;">
	<div class="table_edit  EditPanel">
		<form id="ff" method="post" class="easyui-form" data-options="novalidate:true">
	     
	     <div  	class="tb_row">   
	        <label>类目<span>*</span>:</label>
	        <input type="text" id="category"  class="easyui-combobox "  editable="false" required="true"  missingMessage="必选项"  data-options="height:28,width:202,valueField:'pk',textField:'categoryName'"/>   
	    </div>
	    
	    <!-- <div   class="tb_row">   
	        <label>名称<span>*</span>:</label>
	        <input type="text" id ="iMCategoryPK" name="categoryName"  class="easyui-validatebox" required="true" missingMessage="不能为空" />   
	    </div> 
	    
	    <div   class="tb_row">   
	        <label>备注<span>*</span>:</label>
	        <input type="text" id="categoryRemark" name="categoryRemark" class="easyui-validatebox" required="true" missingMessage="不能为空"/>   
	    </div>  -->
	    	    
	   <!-- <div  	class="tb_row">   
	        <label>角色类型<span>*</span>:</label>
	        <input type="text" id="groupTypeCode"  class="easyui-combobox "  editable="false" required="true"  missingMessage="必选项"  data-options="height:28,width:202,valueField:'groupTypeCode',textField:'groupTypeName'"/>   
	    </div> -->
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
