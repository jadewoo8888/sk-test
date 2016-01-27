<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
  <script src="editDefineProcess.js"></script>
     <script>
     var inApprovalPathPK='${param.inApprovalPathPK}';
     var processCode='${param.processCode}';
     var selectbtn='${param.selectbtn}';
     var pk='${param.pk}';
     var operate='${param.operate}';
   </script>
  <style>
.table_view {
	padding: 10px;
	font-size: 14px;
	line-height: 28px;
	
}

.table_view label {
	width: 200px;
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

textarea{
width:300px;
height:70px;
resize:none;
}
.txt_class {
    text-align:left;
	font-size: 12px;
	
	padding: 0px 8px;
	border: 1px solid #95B8E7;
}

.tb_row {
	clear:both;
	height: 28px;
	padding-top: 35px;
}
.buttonstyle{
float:left;
padding-left:5px;
}
#setcondtion {
    background: #1fb5ad none repeat scroll 0 0;
    border: medium none;
    border-radius: 2px;
    color: #ffffff ;
    cursor: pointer;
    display: inline-block;
    font-size: 12px;
    height: 26px;
    line-height: 24px;
    padding: 0 10px;
    text-align: center;
}

</style>
 </head>
  
  <body class="table_view">
        <table>
        <tr>
        	<td>
     			<div class="tb_row" >
					<label>审批栏名称：</label>
					<input type="text" class="easyui-validatebox txt_class" id="itemName" required="true" />
				</div>
			</td>
		</tr>
		<tr >
			<td>
				<div class="tb_row" style="display:block">
				<label>角色类型：</label>
				<textarea name="group" id="groupIDDisplay" class="txt_class" readonly="readonly" style="float:left"/></textarea>
				<div  class="buttonstyle">
				<input type="button" value="添加角色" onclick="createWindow('group')" class="bt_ensure "/>
				<br/>
				<input type="button" value="重置" onclick="resume('groupIDDisplay')" class="bt_ensure " />
				</div>
				</div>
		     </td>
		     <td>
				<div class="tb_row" >
					<label>权限人账号：</label>
					<textarea name="user" id="userID" class="txt_class" readonly="readonly" style="float:left"></textarea>
					<div class="buttonstyle">
					<input type="button" value="添加用户" onclick="createWindow('user')" class="bt_ensure " />
					<br/>
					<input type="button" value="重置" onclick="resume('userID')" class="bt_ensure " />
				    </div>
				</div>
			</td>
		</tr>
		<tr>
			<td>
				<div class="tb_row" >
				<label>是否可选择下一审批人：</label>
				<input type="text" class="easyui-combobox txt_class" editable="false" data-options="height:32,panelHeight:110,valueField:'value',textFiled:'text',data:[{text:'否',value:'0'},{text:'单选',value:'1'},{text:'多选',value:'2'}],value:'0'" id="isCanPoint" required="true" />
				</div>
			</td>
			<td>
				<div class="tb_row" >
				<label>　是否可跳到指定节点：</label>
				<input type="text" class="easyui-combobox txt_class" editable="false" data-options="height:32,panelHeight:70,valueField:'value',textFiled:'text',data:[{text:'是',value:'1'},{text:'否',value:'0'}],value:'0'" id="isCanNode" required="true" />
				</div>
			</td>
		</tr>
		<tr>
		   <td>
				<div class="tb_row" >
				<label>是否能审批其它部门：</label>
				<input type="text" class="easyui-combobox txt_class" editable="false" data-options="height:32,panelHeight:70,valueField:'value',textFiled:'text',data:[{text:'是',value:'1'},{text:'否',value:'0'}],value:'0'" id="isCanReadAll" required="true" />
				</div>
			</td>
			<td>
				<div class="tb_row" >
				<label>　是否可结束流程：</label>
				<input type="text" class="easyui-combobox txt_class" editable="false" data-options="height:32,panelHeight:70,valueField:'value',textFiled:'text',data:[{text:'是',value:'1'},{text:'否',value:'0'}],value:'0'" id="isCanEnd" required="true" />
				</div>
			</td>
		</tr>
		<tr>
		    <td>
				<div class="tb_row" >
				<label>是否可审批不同意：</label>
				<input type="text" class="easyui-combobox txt_class" id="pdBeCanApproveUnAgree" editable="false" data-options="height:32,panelHeight:110,valueField:'value',textFiled:'text',data:[{text:'否',value:'0'},{text:'退回到上一审批人',value:'1'},{text:'退回到申请人',value:'2'},{text:'结束审批',value:'3'},{text:'退回到指定节点',value:'4'},{text:'继续下一级审批',value:'5'}],value:'0'" required="true" />
				</div>
			</td>
			<td>
				<div class="tb_row" >
				<label>　是否可不填审批意见：</label>
				<input type="text" class="easyui-combobox txt_class" id="isNotOpinion" editable="false" data-options="height:32,panelHeight:70,valueField:'value',textFiled:'text',data:[{text:'是',value:'1'},{text:'否',value:'0'}],value:'0'" required="true" />
				</div>
			</td>
       </tr>
		<tr>
			<td>
				<div class="tb_row" >
				<label>　审批角色：</label>
				<input type="text" class="easyui-combobox txt_class" id="approvalRole" editable="false" data-options="height:32,panelHeight:110,valueField:'value',textFiled:'text',data:[{text:'否',value:'0'},{text:'经办人',value:'1'},{text:'审核人',value:'2'},{text:'核准人',value:'3'},],value:'0'" required="true" />
				</div>
			</td>
			<td>
				<div class="tb_row" >
				<label>　下一级审批条件：</label>
				<input type="text" class="easyui-combobox txt_class" id="nextCondition" editable="false" data-options="height:32,panelHeight:110,valueField:'value',textFiled:'text',data:[{text:'NoCondition',value:'0'},{text:'End',value:'1'},{text:'Other',value:'2'}],value:'0'" required="true" />
				<input type="button"  class="" id="setcondtion" value="设置条件"/>
				</div>
			</td>
		</tr>
		<tr>
			<td>
			<div style="margin-left: 400px; margin-top:100px; clear: both" id="div_button">
			<input type="button" value="保存" onclick="defineprocess_save()" class="bt_ensure mright12"
				onclick="defineprocess_save()" />
			<input type="button" value="取消" class="bt_cancel" onclick="defineprocess_cancel()"/>
			</div>
			</td>
		</tr>
	</table>
  </body>
</html>
