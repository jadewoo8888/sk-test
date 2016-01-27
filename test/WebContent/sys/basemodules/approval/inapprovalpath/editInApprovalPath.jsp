<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
  <script>
	var mainpk='${param.pk}';
			
			
	</script>
  <script type="text/javascript" src="editInApprovalPath.js"></script>
  <style type="text/css">
body {
	background-color: #ebecec;
}

.table_view {
	padding: 10px;
	font-size: 14px;
	line-height: 28px;
	
}

.table_view label {
	width: 110px;
	display: block;
	float: left;
	margin: 0 auto;
	text-align: right;
	font-size: 14px;
	color: #474747;
}

input[type="text"] {
	height: 32px;
	width: 300px;
}

.txt_class {
   
    text-align:left;
	width: 140px;
	font-size: 12px;
	line-height: 20px;
	padding: 0px 8px;
	height: 26px;
	border: 1px solid #95B8E7;
}

.tb_row {
	padding-top: 5px;
	height: 28px;
	clear: both;
	padding-top: 20px;
}
</style>
	
	</head>
	<body class="table_view">

		<div class="tb_row">
			<label>
				单位名称：
			</label>
			<input type="text" class="easyui-validatebox txt_class"  readOnly="readOnly" placeholder="" id="orgSysCode" 
				required="true" />
		</div>
		<div class="tb_row">
			<label>
				业务类型：
			</label>
			<input type="text"   qc={fn:'busiType',oper:'0'} placeholder="业务类型"  id="busiType"  class="shaixuan_txt easyui-combobox" editable="false" data-options="valueField:'classifyCode',textField:'classifyName',value:'YWLX_001',data:${json:classify('STD_SPYWLX')},width:317,height:32,panelHeight:150 "   required="true"/>
		</div>
		<div style="margin-left: 200px; margin-top:100px; clear: both">
			<input type="button" value="保存" class="bt_ensure mright12"
				onclick="inapprovalpath_save()" />
			<input type="button" value="取消" class="bt_cancel" onclick="inapprovalpath_cancel()"/>
		</div>

	</body>
  </body>
</html>
