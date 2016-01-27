<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%String way = request.getParameter("way");   %>	
<%String parentwindowname = request.getParameter("parentwindowname");   %>	
<!doctype html>
<html>
	<head>
		<%@include file="/core/jspf/head.jspf"%>
		<script>
			var way = "<%=way%>";
			way = way=="true"?true:false;
			var parentwindowname = "<%=parentwindowname%>";
		</script>
		<script src="listUserAndGroupSelect.js" language="javascript"></script>
		<style>
			.combo {float:left}
		</style>
	</head>
	
	<body style="background-color:#ebecec;">
		<div id="id_div_desc" class="pd10 clearfloat">
			
               <!--查询操作-->
               <!--开始-->
			<div id="id_div_basequery" class="shaixuan clearfloat">
				<div class="shaixuan_top">
					<input type="text" qc={fn:'userAccount',oper:'3'} id="userAccount" placeholder="账号"  class="shaixuan_txt float-left gray_txt" >
					<input type="text" qc={fn:'userName',oper:'3'} id="userName" placeholder="姓名" class="shaixuan_txt float-left gray_txt" >
					<input type="button" style="margin-left:10px" value="查询" class="bt_query float-left">
				</div>
			</div>
               
               <!--结束-->
			<div class="clearfloat kuai">
				<div class="biao clearfloat">
					<table id="accountTable">
					</table>
				</div>
			</div>
		</div>
		<div style="width:130px; margin:0 auto" id="buttonArea">
			<input type="button" value="确定" class="bt_ensure float_left" onclick="javascript:ajaxAssociateUser()"></input>
			<input type="button" style="margin-left:10px" value="取消" class="bt_cancel float_left" onclick="javascript:cancel()"></input>
		</div>
	
	</body>
</html>
