<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!doctype html>
<html>
<head>
	<%@include file="/core/jspf/head.jspf"%>
	<script src="listUserManager.js" language="javascript"></script>
	<style>
		.combo {float:left}
		.table_a_css:hover{ color:#00E8D8}
	</style>
</head>

<body style="background-color:#ebecec;">
        
		
		<div class="pd10 clr">
			<div class="head" id="id_div_desc">
				<span class="head-title">${html:menuname(null)}</span>
				<span class="head-tx">${html:menudesc(null)}</span>
			</div>
               <!--查询操作-->
               <!--开始-->
			<div id="id_div_basequery" class="shaixuan clr">
				<div class="" style="margin-top:3px; height:30px">    
					<a title="创建一个新的用户" style="margin-left:5px;" href="editCreateUser.jsp" class="bt_list_function" name="righthtml">+ 新增</a>  
					<a title="显示或者隐藏某些列" style="margin-left:5px;" class="bt_list_function" id="selecteColumns" href="#">列选</a>  
					<a title="导出页面" style="margin-left:5px;" class="bt_list_function" href="javascript:exportTable()">导出</a>  
				</div>
				<div class="shaixuan_top" style="height:30px">
					<input type="text" id="userAccount"  placeholder="账号" qc={fn:'userAccount',oper:'3'} class="shaixuan_txt float_left" >
					<input type="text" id="userName" placeholder="姓名" qc={fn:'userName',oper:'3'} class="shaixuan_txt float_left" >
					<input id="role" class="easyui-combobox" placeholder="请选择角色" qc={fn:'userGroupCode',oper:'0'} name="role">
					<input type="button" value="查询" class="bt_query float_left">
				</div>
				
			</div>
               
            <!--表格-->
			<div class="biao">
				<table id="userManagerTable">
				</table>
			</div>
		</div>

</body>
</html>
