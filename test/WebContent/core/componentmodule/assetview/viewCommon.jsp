<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>

<!DOCTYPE HTML>
<html>
	<head>
		<script src="viewCommon.js" language="javascript"></script>
		<link href="viewasset.css" rel="stylesheet" type="text/css" />
		<script>
		//卡片pk 
		var assetRegAssetNo="${param.assetRegAssetNo}";
		</script>
		<style type="text/css">
</style>
	</head>
	<body>
		<div id="tabs">
			<div id='id_div_button_area' class="toolbar">
				<input type="button" value="返回" class="toolbar-btn">
				<input type="button" value="变动" class="toolbar-btn-disabled"
					disabled="disabled">
				<input type="button" value="处置" class="toolbar-btn-disabled"
					disabled="disabled">
				<input type="button" value="拆分" class="toolbar-btn-disabled"
					disabled="disabled">
				<input type="button" value="打印条码" class="toolbar-btn-disabled"
					disabled="disabled">
				<input type="button" value="打印卡片" class="toolbar-btn-disabled"
					disabled="disabled">
				<input type="button" value="导出卡片" class="toolbar-btn-disabled"
					disabled="disabled">
			</div>
			<div class='bigTitle'>
				<p>${html:cardName(param.cardpk)}</p>
			</div>
			<div id='id_div_jbxx_title' class='divTitle'>
				<i id="id_div_jbxx_titleIcon" class="titleIcon-close"></i>
				<p>
					资产卡片
				</p>
			</div>
			<div class="EditPanel" style='margin-left: 20px'
				id="id_div_jbxx_area">
				${html:cardView(param.cardpk)}
			</div>
		 
		 	 <div id='id_div_fspj_title' style='margin-top: 2px'
				class='divTitle'>
				<i id="id_div_fspj_titleIcon" class="titleIcon-open"></i><p>附属配件</p>
			</div> 
			<div id='id_div_fspj_gridarea' style="margin-left: 30px; display: none" class="biao">
				<table id="id_table_fspjgrid"></table>
			</div>
			<div id='id_div_zcfj_title' style='margin-top: 2px' class='divTitle'>
				<i id="id_div_zcfj_titleIcon" class="titleIcon-open"></i><p>资产附件</p>
			</div> 
			<div id='id_div_zcfj_gridarea' style="margin-left: 30px; display: none" class="biao">
				<iframe id='id_iframe_append' frameborder='no' border='0' style='width: 900px; height: 300px'></iframe>
			</div>
			<div id='id_div_zctp_title' style='margin-top: 2px' class='divTitle'>
				<i id="id_div_zctp_titleIcon" class="titleIcon-open"></i><p>资产图片</p>
			</div> 
			<div id='id_div_zctp_area' style="height:250px;margin-left: 30px; display: none;text-align:center;" class="biao">
 			</div>
			<div id='id_div_kpzjxx_title' style='margin-top: 2px;'
				class='divTitle'>
				<i id="id_div_kpzjxx_titleIcon" class="titleIcon-open"></i><p>折旧信息</p>
			</div>
			<div class="EditPanel" style="margin-left: 20px; display: none"
				id='id_div_kpzjxx_area'>
				<table class="View-Card-Table">
					<tr>
						<td class="View-Card-Td-Title1">
							折旧方式：
						</td>
						<td class="View-Card-Td-Input1">
							<span id="id_dpDeprFunDisplay"></span>
						</td>
						<td class="View-Card-Td-Title2"></td>
						<td class="View-Card-Td-Input2"></td>
					</tr>
					<tr>
						<td class="View-Card-Td-Title1" id='id_td_dpyear'>
							折旧年限：
						</td>
						<td class="View-Card-Td-Input1">
							<span id="id_dpyear"></span>
						</td>
						<td class="View-Card-Td-Title2"  id='id_td_dpSalvage'>
							预计净残值：
						</td>
						<td class="View-Card-Td-Input2">
							<span id="id_dpsalvage"></span>
						</td>
					</tr> 
					<tr> 
						<td class="View-Card-Td-Title1">
							首次折旧日期：
						</td>
						<td class="View-Card-Td-Input1">
							<span id="id_assetRegfirstDeprDate"></span>
						</td>
						<td class="View-Card-Td-Title2">
							上次折旧日期：
						</td>
						<td class="View-Card-Td-Input2">
							<span id="id_assetRegLastDeprDate"></span>
						</td>
					</tr>
				</table>
			</div>

			<div id='id_div_zcsmzq_title' style='margin-top: 2px'
				class='divTitle'>
				<i id="id_div_zcsmzq_titleIcon" class="titleIcon-open"></i><p>业务信息</p>
			</div>
			<div id='id_div_zcsmzq_gridarea'
				style="margin-left: 30px; display: none" class="biao">
				<table id="id_table_smzqgrid"></table>
			</div>
		</div>
	</body>
</html>
