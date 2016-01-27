<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%String pk = request.getParameter("pk"); %>
<%String readFlag = request.getParameter("readFlag"); %>
<!doctype html>
<html>
	<head>
		<%@include file="/core/jspf/head.jspf"%>
		<script src="${contextPath}/core/js/otherjs/generalpage.js" language="javascript"></script>
		<script src="editOutApprovalPath.js" language="javascript"></script>
		<script language="javascript">
			var pk = "<%=pk%>";
			var readFlag = "<%=readFlag%>";
		</script>
		<style>
			#editBox {margin: 15px 10px}
			.label {width: 80px;display: block;float: left;text-align: right}
			.txt_class {width: 140px;font-size: 12px;line-height: 20px;padding:0 8px;height:26px;border:1px solid #95B8E7;}
			.row2{width:350px;float:left;height:32px}
			.date{width:300px;float:left;line-height: 24px;color: #474747;height: 28px;padding-bottom: 5px;}
			.row2 span{width:120px;}
			.marginL{margin-left:5px}
			.bg_gray{background:#f5f5f5}
			.combo_row{width: 350px;float: left;line-height: 24px;color: #474747;height: 28px;padding-bottom: 5px;}
			.combo{margin-left:4px;}
			.combo_row .label {width: 120px;display: block;float: left;text-align: right}
			.searchbox{margin-left:4px;}
			.textGroup{overflow:hidden;width:700px;}
			.textGroup span{float:left;width:120px;text-align:right;}
			.textGroup textArea{width:450px;margin-left:4px;height:55px;}
			.textGroup .bt_edit_treeselect{width:auto;margin-bottom:5px;}
			.setting{margin-top:5px;float:left;margin-left:-10px;margin-top:5px}
		</style>
	</head>

	<body style="background-color:#ebecec;">
		<div class="clr kuai" id="baseInfo">
			<div class="clr">
				<div class="kuai_a clr">
					<a href="#" class="cur">基本信息</a>
				</div>
			</div>
			
			<div class="biao clr" id="validateForm">
				<div class="form clr EditPanel" style="padding-bottom:5px;">
					<div class="row2">
						<span>单位名称：</span>
						<input id="orgSysCodeDisplay" class="txt_class	disableText" readonly="readonly"/>
					</div>
					
					<div class="combo_row">
						<span class="label">业务类型：</span>
						<input id="busiType"  class="easyui-combobox" editable="false" data-options="
						value:'YWLX_001',valueField:'classifyCode',textField:'classifyName',data:${json:classify('STD_SPYWLX')}"/>
					</div>
					
					<div class="row2"><span>审批栏名称：</span><input id="itemName" class="txt_class" style="margin-left:4px;"/></div>
					
					<div class="combo_row">
						<span class="label">是否可审批不同意：</span>
						<input id="pdBeCanApproveUnAgree"  class="easyui-combobox" editable="false" data-options="
						value:'1',valueField:'approvalValue',textField:'approvalName',data:
						[{approvalValue:'1',approvalName:'退回到上一审批人'},{approvalValue:'2',approvalName:'退回到申请人'},
						{approvalValue:'3',approvalName:'结束审批'},{approvalValue:'4',approvalName:'退回到指定节点'},
						{approvalValue:'5',approvalName:'继续下一级审批'},{approvalValue:'0',approvalName:'否'}]"/>
					</div>
					
					<div class="combo_row" style="clear:both">
						<span class="label">适用范围：</span>
						<input id="applicability"  class="easyui-combobox" editable="false" data-options="
						value:'SBSYFW_001',valueField:'classifyCode',textField:'classifyName',data:${json:classify('STD_SBSYFW')}" 
						qc={fn:'assetRegCheckFlag',oper:'5'} />
					</div>
					
					<div class="combo_row">
						<span class="label" >下一审批单位：</span>
						<input type="text" id="nextOrgDisplay"  placeholder="所属单位" class="shaixuan_txt float_left" >
					</div>
					
					<div class="combo_row" style="margin-top:4px;margin-bottom:4px">
						<span class="label">下一级审批条件：</span>
						<input id="nextCondition"  class="easyui-combobox" editable="false" data-options="
						value:'0',valueField:'conditionValue',textField:'conditionName',data:
						[{conditionValue:'0',conditionName:'NoCondition'},{conditionValue:'1',conditionName:'End'},
						{conditionValue:'2',conditionName:'Other'}]"/>
					</div>
					<div class="setting">
						<input id="setting" type="button" class="bt_edit_treeselect" value="设置"/>
					</div>
					
					<div class="textGroup" >
						<span>权限人角色类型号：</span>
						<textArea class="txt_class" id="groupIDDisplay"></textArea>
						<input id="addGroup" type="button" class="bt_edit_treeselect" value="添加角色类型"/>
						<input type="button" class="bt_edit_treeselect reset" value="重置"/>
					</div>
					<div class="textGroup" >
						<span>权限人账号：</span>
						<textArea class="txt_class" id="userID"></textArea>
						<input id="addUser" type="button" class="bt_edit_treeselect" value="添加账号"/>
						<input type="button" class="bt_edit_treeselect reset" value="重置"/>
					</div>
				</div>
			</div>
		</div>
				
				
		<div class="clr kuai">
			<div style="width:130px; margin:0 auto" id="buttonArea">
		    	<input id="save" type="button" value="保存" class="bt_ensure float_left">
		    	<input id="cancel" style="margin-left:10px" type="button" value="返回" class="bt_cancel float_left">
			</div>
		</div>
	</body>
</html>
