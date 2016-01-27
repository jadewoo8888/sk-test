<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>
<%
 	String strAssetRegAssetNo = request.getParameter("assetregassetno");
	strAssetRegAssetNo = strAssetRegAssetNo == null?"":strAssetRegAssetNo;
	String strControlType = request.getParameter("controltype");//具体业务操作类型，新增 或 修改 或 查看
	strControlType = strControlType == null ? "VIEW" : strControlType;
%>
<!doctype html>
<html>
	<head>
		<script src="listAssetUpload.js" language="javascript"></script>
		<script>
			/** 初始化业务参数 **/
			var strAssetRegAssetNo = "<%=strAssetRegAssetNo%>";
			var strControlType = "<%=strControlType%>";
			window.name = 'listassetupload';
		</script>
<style> 
.biao .panel-body{border:1px solid rgb(180,180,180) !important;}
</style>
	</head>
	<body>
		<div class="clr">
			<div id='id_div_listbtn' class="clearfloat" style="display:none;margin-left:8px;margin-bottom:8px;">
				<div class="clearfloat">
					<input type='button' id='id_btn_add' class="bt_green" value='+ 新增' />
					<input type='button' id='id_btn_modify' class="bt_green" value='修改' />
					<input type='button' id='id_btn_delete' class="bt_green" value='删除' />
				</div>
			</div>
			<div class="biao">
				<table id="id_grid_table">
				</table>
			</div>
		</div>
	</body>
</html>
