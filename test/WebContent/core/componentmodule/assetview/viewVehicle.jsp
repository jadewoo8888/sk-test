<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>

<!DOCTYPE HTML>
<html>
	<head>
		<script src="viewVehicle.js" language="javascript"></script>
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
				<p>
					${html:cardName(param.cardpk)}
				</p>
			</div>
			<div id='id_div_jbxx_title' class='divTitle'>
				<i id="id_div_jbxx_titleIcon" class="titleIcon-close"></i><p>资产卡片</p>
			</div>
			<div class="EditPanel" style='margin-left: 20px' 
				id="id_div_jbxx_area">
				<table class='View-Card-Table'>
					<tr>
						<td colspan='2' class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"assetRegAssetType")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_assetRegAssetType'>&nbsp;</span>
						</td>
						<td colspan='2' class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"eduAssetType")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_eduAssetType'>&nbsp;</span>
						</td>
					</tr>
					<tr>
						<td colspan='2' class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"assetRegAssetName")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_assetRegAssetName'>&nbsp;</span>
						</td>
						<td colspan='2' class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegBarCode")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegBarCode'>&nbsp;</span>
						</td>
					</tr>
					<tr>
						<td colspan='2' class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"assetRegEnprCode")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_assetRegEnprCode'>&nbsp;</span>
						</td>
						<td colspan='2' class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegDeptCode")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegDeptCode'>&nbsp;</span>
						</td>
					</tr>
					<tr>
						<td colspan='2' class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetOrigin")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetOrigin'>&nbsp;</span>
						</td>
						<td colspan='2' class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"assetRegObtainDate")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_assetRegObtainDate'>&nbsp;</span>
						</td>
					</tr>
					<tr>
						<td colspan='2' class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"assetRegUseStatus")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_assetRegUseStatus'>&nbsp;</span>
						</td>
						<td colspan='2' colspan="2" class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegMetricUnit")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegMetricUnit'>&nbsp;</span>
						</td>
					</tr>
					<tr>
						<td colspan='2' class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegPurpose")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegPurpose'>&nbsp;</span>
						</td>
						<td colspan='2' class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"powerKind")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_powerKind'>&nbsp;</span>
						</td>
					</tr>
					<tr>
						<td colspan='2' class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"assetRegApplication")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_assetRegApplication'>&nbsp;</span>
						</td>
						<td colspan='2' class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"district")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_district'>&nbsp;</span>
						</td>
					</tr>
					<tr>
						<td rowspan="3" style='width:20px;text-align: center'
							class='View-Card-Td-MulRow'>
							行
							<br />
							驶
							<br />
							证
						</td>
						<td class='View-Card-Td-Title1'style='width:100px'>
							${html:cardField(param.cardpk,"rightsOwner")}
						</td>
						<td class='View-Card-Td-Input1' >
							<span id='id_rightsOwner'>&nbsp;</span>
						</td>
						<td rowspan="3" style='width:20px;text-align: center'
							class='View-Card-Td-MulRow'>
							卡
							<br />
							片
							<br />
							金
							<br />
							额
						</td>
						<td class='View-Card-Td-Title2' style='width:100px'>
							原值 ${html:cardField(param.cardpk,"assetRegIntrinsicCurValue")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegIntrinsicCurValue'>&nbsp;</span>
						</td>
					</tr>

					<tr>
						<td class='View-Card-Td-Title1'  style='width:100px'>
							${html:cardField(param.cardpk,"rightsDate")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_rightsDate'>&nbsp;</span>
						</td>
						<td class='View-Card-Td-Title2'  style='width:100px'>
							${html:cardField(param.cardpk,"assetRegDepreciation")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegDepreciation'>&nbsp;</span>
						</td>
					</tr>
					<tr>
						<td class='View-Card-Td-Title1'  style='width:100px'>
							${html:cardField(param.cardpk,"rightsCode")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_rightsCode'>&nbsp;</span>
						</td>
						<td class='View-Card-Td-Title2'  style='width:100px'>
							${html:cardField(param.cardpk,"assetRegNetCurValue")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegNetCurValue'>&nbsp;</span>
						</td>
					</tr>

					<tr>
						<td colspan='2' class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"cardNo")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_cardNo'>&nbsp;</span>
						</td>
						<td colspan='2' class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegDepreStatus")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegDepreStatus'>&nbsp;</span>
						</td>
					</tr>

					<tr>
						<td colspan='2' class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"vehicleHasCode")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_vehicleHasCode'>&nbsp;</span>
						</td>
						<td colspan='2' class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegEnsureDate")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegEnsureDate'>&nbsp;</span>
						</td>

					</tr>
					<tr>
						<td colspan='2' class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"vehicleCheckNo")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_vehicleCheckNo'>&nbsp;</span>
						</td>
					
						<td colspan="2" class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegMaturityDate")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegMaturityDate'>&nbsp;</span>
						</td>

					</tr>
					<tr>
						<td colspan='2' class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"vehicleType2")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_vehicleType2'>&nbsp;</span>
						</td>
						<td colspan="2" class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegUser")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegUser'>&nbsp;</span>
						</td>
					</tr>

					<tr>
						<td colspan="2" class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"vehiclePassengers")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_vehiclePassengers'>&nbsp;</span>
						</td>
						<td colspan="2" class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegLister")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegLister'>&nbsp;</span>
						</td>
					</tr>

					<tr>
						<td colspan="2" class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"engineNo")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_engineNo'>&nbsp;</span>
						</td>
						<td colspan="2" class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegListDate")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegListDate'>&nbsp;</span>
						</td>
					</tr>


					<tr>
						<td colspan="2" class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"carriageNo")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_carriageNo'>&nbsp;</span>
						</td>
						<td colspan='2' class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"accountType")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_accountType'>&nbsp;</span>
						</td>
					</tr>
					<tr>
						<td colspan="2" class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"assetRegShopSign")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_assetRegShopSign'>&nbsp;</span>
						</td>
						<td colspan='2' class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegVoucherNo")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegVoucherNo'>&nbsp;</span>
						</td>
					</tr>
					<tr>
						<td colspan="2" class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"assetRegSpecification")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_assetRegSpecification'>&nbsp;</span>
						</td>
						<td colspan='2' class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegPurseBearer")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegPurseBearer'>&nbsp;</span>
						</td>
					</tr>
					<tr>
						<td colspan="2" class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"exhaustPower")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_exhaustPower'>&nbsp;</span>
						</td>
						<td colspan='2' class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegCurAccountDate")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegCurAccountDate'>&nbsp;</span>
						</td>
					</tr>
					<tr>
						<td colspan="2" class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"assetRegRemark")}
						</td>
						<td colspan="4" class='View-Card-Td-Input2' colspan='3'>
							<span id='id_assetRegRemark'>&nbsp;</span>
						</td>
					</tr>
				</table>
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
							<span id="id_dpDeprFun"></span>
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
						<td class="View-Card-Td-Title2" id='id_td_dpSalvage'>
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
