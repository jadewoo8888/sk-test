<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%String userid = request.getParameter("userid");   %>	
<%String userConnection = request.getParameter("userConnection");   %>	
<!doctype html>
<html>
<head>
<%@include file="/core/jspf/head.jspf"%>
<script>
	var userid = "<%=userid%>";
	var userConnection = "<%=userConnection%>";
	var userConnections = [];
	userConnections = userConnection.split("|");
</script>
<script src="listUserAccount.js" language="javascript"></script>
<style>
	.combo {float:left}
</style>
</head>

<body style="background-color:#ebecec;">
	<!--用户切换-->
         
         <form>
			<div id="id_div_desc" class="pd10 clearfloat">
				<div class="pd10_title"><span class="normal_title">账号：</span><span class="normal_title" ><%=userid%></span></div>
				<div class="pd10_title"><span class="normal_title">关联账号：</span><span class="normal_title" ><%=userConnection%></span></div>
				
                <!--查询操作-->
                <!--开始-->
				<div id="id_div_basequery" class="shaixuan clearfloat">
					<div class="shaixuan_top">
						<input type="text" qc={fn:'userAccount',oper:'3'} id="userAccount" placeholder="账号"  class="shaixuan_txt float-left gray_txt" >
						<input type="text" qc={fn:'userName',oper:'3'} id="userName" placeholder="姓名" class="shaixuan_txt float-left gray_txt" >
						<input type="button" value="查询" class="bt_ora float-left">
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
				<input type="button" value="确定" class="bt_ora float_left" onclick="javascript:ajaxAssociateUser()"></input>
				<input type="button" value="取消" class="bt_gray float_left" onclick="javascript:cancel()"></input>
			</div>
		</form>
	

</body>
</html>
