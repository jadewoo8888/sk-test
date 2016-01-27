<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<script type="text/javascript">
	var assetRegAssetNo = "${param.assetRegAssetNo}";
	</script><script type="text/javascript" src="viewLand.js"></script>
    <link href="viewasset.css" rel="stylesheet" type="text/css" />
		
	</head>
	<body>
           
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
			<i id="id_div_jbxx_titleIcon" class="titleIcon-close"></i>
			<p>
				资产卡片
			</p>
		</div>
		<!-- class='View-Card-Table' -->
		<div class="EditPanel" id="id_div_jbxx_area"
			style="margin-left: 20px;">
			<table class='View-Card-Table' border="1" width=900
				bordercolor="d2d2d2">
				<tr>
					<td class="View-Card-Td-Title1" colspan="2">
						${html:cardField(param.cardpk,"assetRegAssetType")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_assetRegAssetTypeDisplay'>&nbsp;</span>
					</td>
					<td class="View-Card-Td-Title1" colspan="2">
						${html:cardField(param.cardpk,"eduAssetType")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_eduAssetTypeDisplay'>&nbsp;</span>
					</td>
				</tr>
				<tr>
					<td class="View-Card-Td-Title1" colspan="2">
						${html:cardField(param.cardpk,"assetRegAssetName")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_assetRegAssetName'>&nbsp;</span>
					</td>
					<td class="View-Card-Td-Title2" colspan="2">
						${html:cardField(param.cardpk,"assetRegBarCode")}
					</td>
					<td class='View-Card-Td-Input2' colspan="2">
						<span id='id_assetRegBarCode'>&nbsp;</span>
					</td>
				</tr>
				<tr>
					<td class="View-Card-Td-Title1" colspan="2">
						${html:cardField(param.cardpk,"assetRegEnprCode")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_assetRegEnprCodeDisplay'>&nbsp;</span>
					</td>
					<td class="View-Card-Td-Title1" colspan="2">
						${html:cardField(param.cardpk,"assetRegDeptCode")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_assetRegDeptCodeDisplay'>&nbsp;</span>
					</td>
				</tr>

				<tr>
					<td class="View-Card-Td-Title1" colspan="2">
						${html:cardField(param.cardpk,"assetOrigin")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_assetOriginDisplay'>&nbsp;</span>
					</td>
					<td class="View-Card-Td-Title1" colspan="2">
						${html:cardField(param.cardpk,"assetRegObtainDate")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_assetRegObtainDate'>&nbsp;</span>
					</td>
				</tr>


				<tr>
					<td class="View-Card-Td-Title1" colspan="2">
						${html:cardField(param.cardpk,"assetRegUseStatus")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_assetRegUseStatusDisplay'>&nbsp;</span>
					</td>
					<td class="View-Card-Td-Title2" colspan="2">
						${html:cardField(param.cardpk,"assetRegMetricUnit")}
					</td>
					<td class='View-Card-Td-Input2' colspan="2">
						<span id='id_assetRegMetricUnit'>&nbsp;</span>
					</td>
				</tr>
				<tr>
					<td class="View-Card-Td-Title1" colspan="2">
						${html:cardField(param.cardpk,"assetRegCurArea")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_assetRegCurArea'>&nbsp;</span>
					</td>
					<td class="View-Card-Td-Title2" colspan="2">
						${html:cardField(param.cardpk,"powerKind")}
					</td>
					<td class='View-Card-Td-Input2' colspan="2">
						<span id='id_powerKindDisplay'>&nbsp;</span>
					</td>
				</tr>
				<tr>
					<td class="View-Card-Td-Title1" colspan="2" rowspan="1">
						其中：${html:cardField(param.cardpk,"registArea")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2" rowspan="1">
						<span id='id_registArea'>&nbsp;</span>
					</td>
					<td  rowSpan=2>
						<DIV align=center style="width:20px;text-align: center">
							卡
							<BR>
							片
							<BR>
							金
							<BR>
							额
						</DIV>
					</td>


					<td class='View-Card-Td-Title1' colspan="1" rowspan="1" >
						${html:cardField(param.cardpk,"assetRegIntrinsicCurValue")}
					</td>
					<td class='View-Card-Td-Input1' colspan="1" rowspan="1">
						<span id='id_assetRegIntrinsicCurValue'>&nbsp;</span>
					</td>
				</tr>


				<tr>
					<TD class="Standard-CardStencilImporTdStyle" rowSpan=6 >
						<DIV align=center class="fontfamily" style="width:20px;text-align: center">
							使
							<BR>
							用
							<BR>
							方
							<BR>
							向
							<BR>
							及
							<BR>
							面
							<BR>
							积
						</DIV>
					</TD>
					<td class='View-Card-Td-Title1' colspan="1">
						${html:cardField(param.cardpk,"selfArea")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_selfArea'>&nbsp;</span>
					</td>
					<td colspan="1" class='View-Card-Td-Title1'>
						${html:cardField(param.cardpk,"assetRegNetCurValue")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_assetRegNetCurValue'>&nbsp;</span>
					</td>
				</tr>

				<tr>
					<td class="View-Card-Td-Title1" colspan="1">
						${html:cardField(param.cardpk,"selfAreaLogistics")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_selfAreaLogistics'>&nbsp;</span>
					</td>
					<td class="View-Card-Td-Title1" colspan="2">
						${html:cardField(param.cardpk,"rightsType")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_rightsTypeDisplay'>&nbsp;</span>
					</td>
				</tr>

				<tr>
					<td class="View-Card-Td-Title1" colspan="1">
						${html:cardField(param.cardpk,"leaseArea")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_leaseArea'>&nbsp;</span>
					</td>
					<td rowSpan="3" >
						<div align="center" style="width:20px;text-align: center">
							权
							<br />
							属
							<br />
							证
							<br />
							书
						</div>
					</td>
					<td class="View-Card-Td-Title1" colspan="1" width="116">
						${html:cardField(param.cardpk,"rightsOwner")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_rightsOwner'>&nbsp;</span>
					</td>
				</tr>

				<tr>
					<td class="View-Card-Td-Title1">
						${html:cardField(param.cardpk,"lendArea")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_lendArea'>&nbsp;</span>
					</td>
					<td class="View-Card-Td-Title1">
						${html:cardField(param.cardpk,"rightsDate")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_rightsDate'>&nbsp;</span>
					</td>
				</tr>
				<tr>
					<td class="View-Card-Td-Title1">
						${html:cardField(param.cardpk,"unusedArea")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_unusedArea'>&nbsp;</span>
					</td>
					<td class="View-Card-Td-Title1">
						${html:cardField(param.cardpk,"rightsCode")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_rightsCode'>&nbsp;</span>
					</td>
				</tr>
				<tr>
					<td class="View-Card-Td-Title1">
						${html:cardField(param.cardpk,"otherArea")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_otherArea'>&nbsp;</span>
					</td>
					<td class="View-Card-Td-Title1" colspan="2">
						${html:cardField(param.cardpk,"assetRegLister")}
					</td>
					<td class='View-Card-Td-Input1'>
						<span id='id_assetRegLister'>&nbsp;</span>
					</td>
				</tr>
				<tr>
					<td class="View-Card-Td-Title1" colspan="2">
						${html:cardField(param.cardpk,"assetRegMaturityDate")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_assetRegMaturityDate'>&nbsp;</span>
					</td>
					<td class="View-Card-Td-Title1" colspan="2">
						${html:cardField(param.cardpk,"assetRegListDate")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_assetRegListDate'>&nbsp;</span>
					</td>
				</tr>
				<tr>
					<td class="View-Card-Td-Title1" colspan="2">
						${html:cardField(param.cardpk,"landUseForWhat")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_landUseForWhat'>&nbsp;</span>
					</td>
					<td class="View-Card-Td-Title1" colspan="2">
						${html:cardField(param.cardpk,"accountType")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_accountTypeDisplay'>&nbsp;</span>
					</td>
				</tr>
				<tr>
					<td class="View-Card-Td-Title1" colspan="2">
						${html:cardField(param.cardpk,"assetMgr")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_assetMgr'>&nbsp;</span>
					</td>
					<td class="View-Card-Td-Title1" colspan="2">
						${html:cardField(param.cardpk,"assetRegVoucherNo")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_assetRegVoucherNo'>&nbsp;</span>
					</td>
				</tr>
				<tr>
					<td class="View-Card-Td-Title1" colspan="2">
						${html:cardField(param.cardpk,"district")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_district'>&nbsp;</span>
					</td>
					<td class="View-Card-Td-Title1" colspan="2">
						${html:cardField(param.cardpk,"assetRegPurseBearer")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_assetRegPurseBearer'>&nbsp;</span>
					</td>
				</tr>
				<tr>
					<td class="View-Card-Td-Title1" colspan="2">
						${html:cardField(param.cardpk,"useNo")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_useNo'>&nbsp;</span>
					</td>
					<td class="View-Card-Td-Title1" colspan="2">
						${html:cardField(param.cardpk,"assetRegCurAccountDate")}
					</td>
					<td class='View-Card-Td-Input1' colspan="2">
						<span id='id_assetRegCurAccountDate'>&nbsp;</span>
					</td>
				</tr>
				<tr>
					<td class="View-Card-Td-Title1" colspan="2">
						${html:cardField(param.cardpk,"address")}
					</td>
					<td class='View-Card-Td-Input1' colspan="6">
						<span id='id_address'>&nbsp;</span>
					</td>
				</tr>
				<tr>
					<td class="View-Card-Td-Title1" colspan="2">
						${html:cardField(param.cardpk,"assetRegRemark")}
					</td>
					<td class='View-Card-Td-Input1' colspan="6">
						<span id='id_assetRegRemark'>&nbsp;</span>
					</td>
				</tr>
			</table>
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

		<div id='id_div_zcsmzq_title' class='divTitle '>
			<i id="id_div_zcsmzq_titleIcon" class="titleIcon-open"></i>
			<p>
				业务信息
			</p>
		</div>
		<div id='id_div_zcsmzq_gridarea'
			style="margin-left: 30px; margin-top: 10px; display: none"
			class="biao">
			<table id="id_table_smzqgrid" width=900></table>
		</div>
	</body>
</html>
