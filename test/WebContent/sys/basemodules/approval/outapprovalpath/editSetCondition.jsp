<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!doctype html>
<html>
	<head>
		<%@include file="/core/jspf/head.jspf"%>
		<style>
			.bt_edit_treeselect{width:80px !important;}
			#editPanel td{text-align:center;height-line:60px}
			#editPanel td span{float:left;}
			#codeArea{width:700px;height:80px;overflow:auto;border:1px solid #ddd}
			#copyPoint{display:none}
			#bt_area{width:150px;margin:10px auto;}
			#addCondition{width:auto}
			.datagrid-cell{height:auto !important}
			.condition{width:100px !important}
			.EditPanel input{width:auto}
			.datagrid-cell-check{height:auto} 
			.datagrid-header-check{height:auto} 
			.codeRow{overflow:hidden}
			.codeRow div{float:left;min-width:10px;margin-left:10px;}
		</style>
		<script>var windowName = "${param.parentwindowname}";</script>
		<script src="editSetCondition.js"></script>
	</head>
	
	<body class="EditPanel">
		<div class="biao" style="margin-left:20px;">
			<input id="addCondition" type="button" class="bt_edit_treeselect" value="添加条件"/>
			<input id="removeCondition" type="button" class="bt_edit_treeselect" value="删除条件"/>
			<table width="700px" border="1" id="editSetConditionTable">
				<thead>
					<td></td>
					<td>项目</td>
					<td>比较符</td>
					<td>条件</td>
					<td></td>
					<td>与下一条件的关系</td>
				</thead>
				<tbody>
					<tr id="copyPoint">
						<td></td>
						<td>
							<input class="bracketL comboFlag" editable="false" />
						</td>
						<td>
							<input class="item comboFlag" editable="false" />
						</td>
						<td>
							<input class="compareSign comboFlag" editable="false"/>
						</td>
						<td>
							<input class="condition comboFlag"  />
						</td>
						<td>
							<input class="bracketR comboFlag" editable="false"/>
						</td>
						<td>
							<input class="relationSign comboFlag" editable="false"/>
						</td>
					</tr>
				</tbody>
			</table>
			<div id="editPanel">
				<span>公式转换编辑显示区</span>
				<div id="codeArea">
					<div class="codeRow">
						<div class="bracketLCode"></div>
						<div class="itemCode"></div>
						<div class="compareSignCode"></div>
						<div class="conditionCode"></div>
						<div class="bracketRCode"></div>
						<div class="relationSignCode"></div>
					</div>
				</div>
			</div>
		</div>
		<div id="bt_area">
			<input type="button" class="bt_ensure" value="保存"/>
			<input type="button" class="bt_cancel" value="取消"/>
		</div>
	</body>
</html>
