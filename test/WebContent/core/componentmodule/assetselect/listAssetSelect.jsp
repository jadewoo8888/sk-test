<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String strBusiType = request.getParameter("busitype");//业务类型
	String strSelectType = request.getParameter("selecttype");//多选单选类型
	String openWindowName = request.getParameter("openwindowname");//调用窗口名字
%>
<!doctype html>
<html>
	<head>
		<%@include file="/core/jspf/head.jspf"%>
		<script src="listAssetSelect.js" language="javascript"></script>
		<link href="listAssetSelect.css" rel="stylesheet" type="text/css" />
		<script>
			/** 初始化业务参数 **/
			var strBusiType = "<%=strBusiType%>";
			var strSelectType = "<%=strSelectType%>"
 			var openWindowName = "<%=openWindowName%>";
 			
 			
		</script>
		<style>
</style>
	</head>
	<body style="background-color: #ebecec;">
		<!-- 描述区域  -->
		<div id="id_div_desc" class="pd10 clearfloat"></div>

		<!--基本查询区域-->
		<div id="id_div_basequery" class="shaixuan clearfloat">
			<div class="shaixuan_top">
			<input type="text"  class="easyui-combobox"  qc={fn:'',oper:'14'}  editable="false"  placeholder="卡片大类"  data-options="valueField:'sql',textField:'cardname',data:[${json:ac()}]" />
			<!--   待删除
			<input type="text" id="assetRegAssetType" qc={fn:'assetRegAssetType',oper:'11'} placeholder="资产分类代码" class="shaixuan_txt fl" readonly />
			<input type="button" value="" id="selectType" class="shaixuan_sub1 float_left" />
			 -->
			<input id="assetRegAssetType" qc={fn:'assetRegAssetType',oper:'11'} 	placeholder="资产分类代码" />		
			<input type="text" id="assetRegBarCode" qc={fn:'assetRegBarCode',oper:'3'} placeholder="卡片编号"  class="shaixuan_txt" />
			<input type="text" id="assetRegAssetName" qc={fn:'assetRegAssetName',oper:'3'} placeholder="资产名称"  class="shaixuan_txt" />
			<input  qc={fn:'assetRegIntrinsicCurValue',oper:'13'} type="text"  class="easyui-numberbox shaixuan_txt float_left" placeholder='原值'  data-options="min:0,precision:2"  ></input>  
			<span class='fl'>-</span>
			<input  qc={fn:'assetRegIntrinsicCurValue',oper:'12'}  type="text" class="easyui-numberbox shaixuan_txt float_left" placeholder='原值'  data-options="min:0,precision:2"  ></input>  
			<input type="button" id='id_btn_query' style="margin-left: 10px"
					value="查询" class="bt_query float-left">
			</div>
		</div>

		<!--表格-->
		<div class="clearfloat kuai" style='background-color:white;'>
			<div id='id_div_title' style='width:100px;float:left;padding-left:10px'><i id="id_i_titleIcon" class="titleIcon-close"></i><span style='color: #000000;font-size:18px;font-weight: bold;'>待选资产</span></div>
			<div style='float: left;width:5px;' id='id_div_addselectedhr'>
				<hr style="border:0;background-color:#1fb5ad;height:25px;width:1px;margin:0 0 0 0">
			</div> 
			<div style='float:left;'>
				<input type="button" id='id_btn_addselected'
					style="margin-left: 10px;" value="选择资产" class="bt_list_function float-left">
				<input type="button" id='id_btn_selectall'
					style="margin-left: 10px;display:none"value="选择全部资产" class="bt_list_function float-left">
			</div>
		</div>
		<div id='id_div_grid' class="biao clearfloat">
			<table id="id_table_grid">
			</table> 
		</div>
		<!-- 分割线 
		<div style='margin-top:10px;width:100%'><hr style="border:0;background-color:#1fb5ad;height:1px;width:1100px;margin:0 0 0 0"></div>
		-->
		<!-- 预览表格 -->
		<div class="clearfloat kuai" id="id_div_preview" style='background-color:white;display: none;margin-top:10px'>
			<div id='id_div_previewtitle' style='width:100px;float:left;padding-left:10px'><i id="id_i_previewtitleIcon" class="titleIcon-close"></i><span style='color: #000000;font-size:18px;font-weight: bold;'>已选资产</span></div>
			<div style='float: left;width:5px;'>
				<hr style="border:0;background-color:#1fb5ad;height:25px;width:1px;margin:0 0 0 0">
			</div>
			<div style='float:left;'>
				<input type="button" id='id_btn_deletepvselected'
					style="margin-left: 10px;" value="删除" class="bt_list_function float-left" >
			</div>
		</div>
		<div id='id_div_previewgrid'class="biao clearfloat">
			<table id="id_table_previewgrid">
			</table>
		</div>
		
		<div  style="width: 130px; height:30px;margin: 0 auto;margin-top:10px" >
			<input type="button" value="确定" id='id_btn_sure'  class="bt_ensure float_left"></input>
			<input type="button" value="取消" id='id_btn_cancel'  class="bt_cancel float_left"></input>
		</div>

	</body>
</html>
