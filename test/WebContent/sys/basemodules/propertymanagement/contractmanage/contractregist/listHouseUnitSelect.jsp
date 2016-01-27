<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String strBusiType = request.getParameter("busitype");//业务类型
 	String openWindowName = request.getParameter("openwindowname");//调用窗口名字
%>
<!doctype html>
<html>
	<head>
		<%@include file="/core/jspf/head.jspf"%>
		<script src="listHouseUnitSelect.js" language="javascript"></script>
 		<script>
			/** 初始化业务参数 **/
			var strBusiType = "<%=strBusiType%>";
  			var openWindowName = "<%=openWindowName%>";
		</script>
		<style>
</style>
	</head>
	<body style="background-color: #ebecec;">
		<div id="id_div_desc" class="pd10 clearfloat">
            <!--查询区域-->
			<div id="id_div_basequery" class="shaixuan clearfloat">
				<div class="shaixuan_top">
					<input type="text" qc={fn:'unitCode',oper:'3'} placeholder="物业编号" class="shaixuan_txt" />	
					<input type="text" qc={fn:'unitAdress',oper:'3'} placeholder="物业地址" class="shaixuan_txt" />
					<input type="text" qc={fn:'unitPurpose',oper:'5'}  placeholder="物业用途"  id="unitPurpose" class="easyui-combobox "  editable="false"   data-options="panelHeight:100,multiple:true,height:28,width:120,valueField:'classifyCode',textField:'classifyName',data:${json:classify("STD_DYYT")}"/>   		
				
					<input type="button" style="margin-left:10px" value="查询"  id = 'id_btn_query' class="bt_query float-left">
				</div>
			</div>
			
			<!--表格区域-->
			<div class="clearfloat kuai">
				<div class="biao clearfloat">
					<table id="id_table_grid">
					</table>
				</div>
			</div>
		</div>
		
		<div  style="width: 130px; height:30px;margin: 0 auto;margin-top:10px" >
			<input type="button" value="确定" id='id_btn_sure'  class="bt_ensure float_left"></input>
			<input type="button" value="取消" id='id_btn_cancel'  class="bt_cancel float_left"></input>
		</div>
	</body>
</html>
