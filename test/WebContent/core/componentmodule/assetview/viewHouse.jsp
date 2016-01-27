<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>

<!DOCTYPE HTML>
<html>
	<head>
		<script src="viewHouse.js" language="javascript"></script>
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
				<i id="id_div_jbxx_titleIcon" class="titleIcon-close"></i><p>资产卡片</p>
			</div>
			<div class="EditPanel" style='margin-left: 20px'
				id="id_div_jbxx_area">
				<table class='View-Card-Table'>
					<tr>
						<td colspan="2" class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"assetRegAssetType")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_assetRegAssetType'>&nbsp;</span>
						</td>
						<td colspan="2" class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"eduAssetType")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_eduAssetType'>&nbsp;</span>
						</td>
					</tr>
					<tr>
						<td colspan="2" class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"assetRegAssetName")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_assetRegAssetName'>&nbsp;</span>
						</td>
						<td colspan="2" class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegBarCode")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegBarCode'>&nbsp;</span>
						</td>
					</tr>

					<tr>
						<td colspan="2" class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"assetRegEnprCode")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_assetRegEnprCode'>&nbsp;</span>
						</td>
						<td colspan="2" class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegDeptCode")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegDeptCode'>&nbsp;</span>
						</td>
					</tr>
					<tr>
						<td colspan="2" class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetOrigin")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_assetOrigin'>&nbsp;</span>
						</td>
						<td colspan="2" class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"assetRegObtainDate")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegObtainDate'>&nbsp;</span>
						</td>
					</tr>
					<tr>
						<td colspan="2" class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"assetRegUseStatus")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_assetRegUseStatus'>&nbsp;</span>
						</td>
						<td colspan="2" class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegMetricUnit")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegMetricUnit'>&nbsp;</span>
						</td>
					</tr>

					<tr>
						<td colspan='2' class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"assetRegCurArea")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_assetRegCurArea'>&nbsp;</span>
						</td>
						<td rowspan="3" class='View-Card-Td-MulRow'  
							style='width:20px;text-align: center'>
							卡
							<br />
							片
							<br />
							金
							<br />
							额
						</td>
						<td class='View-Card-Td-Title2' style='width:105px'>
							${html:cardField(param.cardpk,"assetRegIntrinsicCurValue")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegIntrinsicCurValue'>&nbsp;</span>
						</td>
					</tr>

					<tr>
						<td colspan="2" class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"enprPayArea")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_enprPayArea'>&nbsp;</span>
						</td>
						<td class='View-Card-Td-Title2' style='width:105px'>
							${html:cardField(param.cardpk,"assetRegDepreciation")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegDepreciation'>&nbsp;</span>
						</td>
					</tr>

					<tr>
						<td rowspan="6" class='View-Card-Td-MulRow'
							style='width:20px;text-align: center'>
							使
							<br />
							用
							<br />
							方
							<br />
							向
							<br />
							及
							<br />
							面
							<br />
							积
						</td>
						<td class='View-Card-Td-Title1' style='width:105px'>
							${html:cardField(param.cardpk,"selfArea")}
						</td>
						<td class='View-Card-Td-Input1' >
							<span id='id_selfArea'>&nbsp;</span>
						</td>
						<td class='View-Card-Td-Title2' style='width:105px'>
							${html:cardField(param.cardpk,"assetRegNetCurValue")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegNetCurValue'>&nbsp;</span>
						</td>
					</tr>
					<tr>
						<td class='View-Card-Td-Title1' style='width:105px'>
							${html:cardField(param.cardpk,"selfAreaLogistics")}
						</td>
						<td class='View-Card-Td-Input1' >
							<span id='id_selfAreaLogistics'>&nbsp;</span>
						</td>
						<td colspan="2" class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"rightsType")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_rightsType'>&nbsp;</span>
						</td>
					</tr>

					<tr>
						<td class='View-Card-Td-Title1' style='width:105px'>
							${html:cardField(param.cardpk,"leaseArea")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_leaseArea'>&nbsp;</span>
						</td>
						<td rowspan="3" class='View-Card-Td-MulRow'
							style='width:20px;text-align: center'>
							权
							<br /> 
							属
							<br />
							证
							<br />
							书
						</td>
						<td class='View-Card-Td-Title2' style='width:105px'>
							${html:cardField(param.cardpk,"rightsOwner")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_rightsOwner'>&nbsp;</span>
						</td>
					</tr>
					<tr>
						<td class='View-Card-Td-Title1' style='width:105px'>
							${html:cardField(param.cardpk,"lendArea")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_lendArea'>&nbsp;</span>
						</td>
						<td class='View-Card-Td-Title2' style='width:105px'>
							${html:cardField(param.cardpk,"rightsDate")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_rightsDate'>&nbsp;</span>
						</td>
					</tr>
					<tr>
						<td class='View-Card-Td-Title1' style='width:105px'>
							${html:cardField(param.cardpk,"unusedArea")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_unusedArea'>&nbsp;</span>
						</td>
						<td class='View-Card-Td-Title2' style='width:105px'>
							${html:cardField(param.cardpk,"rightsCode")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_rightsCode'>&nbsp;</span>
						</td>
					</tr>

					<tr>
						<td class='View-Card-Td-Title1' style='width:105px'>
							${html:cardField(param.cardpk,"otherArea")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_otherArea'>&nbsp;</span>
						</td>
						<td colspan='2' class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegDepreStatus")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegDepreStatus'>&nbsp;</span>
						</td>
					</tr>
					<tr>
						<td colspan="2" class='View-Card-Td-Title1' >
							${html:cardField(param.cardpk,"landUsingArea")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_landUsingArea'>&nbsp;</span>
						</td>
						<td colspan="2" class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegEnsureDate")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegEnsureDate'>&nbsp;</span>
						</td>
					</tr>

					<tr>
						<td colspan="2" class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"landOccupyArea")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_landOccupyArea'>&nbsp;</span>
						</td>
						<td colspan="2" class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"useDate")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_useDate'>&nbsp;</span>
						</td>
					</tr>
					<tr>
						<td colspan="2" class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"registArea")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_registArea'>&nbsp;</span>
						</td>
						<td colspan="2" class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegMaturityDate")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegMaturityDate'>&nbsp;</span>
						</td>
					</tr>

					<tr>
						<td rowspan="2" class='View-Card-Td-MulRow' 
							style='width:20px;text-align: center'>
							地
							<br />
							下
							<br />
							面
							<br />
							积
						</td>
						<td class='View-Card-Td-Title1' style='width:105px'>
							${html:cardField(param.cardpk,"underground")}
						</td>
						<td class='View-Card-Td-Input1' >
							<span id='id_underground'>&nbsp;</span>
						</td>
						<td colspan="2" class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegLister")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegLister'>&nbsp;</span>
						</td>
					</tr>

					<tr>
						<td class='View-Card-Td-Title1'  style='width:105px'>
							${html:cardField(param.cardpk,"useUnderground")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_useUnderground'>&nbsp;</span>
						</td>
						<td colspan="2" class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegListDate")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegListDate'>&nbsp;</span>
						</td>
					</tr>


					<tr>
						<td colspan='2' class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"assetMgr")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_assetMgr'>&nbsp;</span>
						</td>
						<td colspan='2' class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"accountType")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_accountType'>&nbsp;</span>
						</td>
					</tr>
					<tr>
						<td colspan='2' class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"district")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_district'>&nbsp;</span>
						</td>
						<td colspan='2' class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegVoucherNo")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegVoucherNo'>&nbsp;</span>
						</td>
					</tr>

					<tr>
						<td colspan='2' class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegManufacturer")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegManufacturer'>&nbsp;</span>
						</td>
						<td colspan='2' class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegPurseBearer")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegPurseBearer'>&nbsp;</span>
						</td>
					</tr>
					<tr>
						<td colspan='2' class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"assetRegShopSign")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_assetRegShopSign'>&nbsp;</span>
						</td>
						<td colspan='2' class='View-Card-Td-Title2'>
							${html:cardField(param.cardpk,"assetRegCurAccountDate")}
						</td>
						<td class='View-Card-Td-Input2'>
							<span id='id_assetRegCurAccountDate'>&nbsp;</span>
						</td>
					</tr>
					<tr>
						<td colspan='2' class='View-Card-Td-Title1'>
							${html:cardField(param.cardpk,"address")}
						</td>
						<td class='View-Card-Td-Input1'>
							<span id='id_address'>&nbsp;</span>
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
							${html:cardField(param.cardpk,"assetRegRemark")}
						</td>
						<td colspan='4' class='View-Card-Td-Input2' colspan='3'>
							<span id='id_assetRegRemark'>&nbsp;</span>
						</td>
					</tr>
				</table>
			</div>
			<div id='id_div_fsss_title' style='margin-top: 2px'
				class='divTitle'>
				<i id="id_div_fsss_titleIcon" class="titleIcon-open"></i><p>附属设施</p>
			</div> 
			<div id='id_div_fsss_gridarea' style="margin-left: 30px; display: none" class="biao">
				<table id="id_table_fsssgrid"></table>
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
			<div id='id_div_zctp_area' style="height:250px;margin-left: 30px; display: none" class="biao">
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
