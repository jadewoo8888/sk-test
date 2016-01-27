<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

   <script >
     var pk='${param.pk}';
   </script>
   <script src="viewDefineProcess.js"></script>
  <head>
<style type="text/css">
.table_view {
	padding: 10px;
	font-size: 14px;
	line-height: 28px;
	
}

.table_view label {
	width: 170px;
	display: block;
	float: left;
	margin: 0 auto;
	text-align: right;
	font-size: 14px;
	color: #474747;
}

input[type="text"] {
	height: 25px;
	width: 200px;
}

textarea{
width:200px;
height:100px;
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
	padding-top: 20px;
}

</style>
  </head>
      <body class="table_view">
        <table>
        <tr>
        	<td>
     			<div class="tb_row" >
					<label>审批栏名称：</label>
					<input type="text" class=" txt_class" id="itemName" readonly="readonly"/>
				</div>
			</td>
		</tr>
		<tr >
			<td>
				<div class="tb_row" style="display:block">
				<label>角色类型：</label>
				<textarea name="group" id="groupIDDisplay" class="txt_class" readonly="readonly" style="float:left"/></textarea>
				</div>
		     </td>
		     <td>
				<div class="tb_row" >
					<label>权限人账号：</label>
					<textarea name="user" id="userID" class="txt_class" readonly="readonly" style="float:left"></textarea>
				</div>
			</td>
		</tr>
		<tr>
			<td>
				<div class="tb_row" >
				<label>是否可选择下一审批人：</label>
				<input type="text" class="txt_class" readonly="readonly"  id="isCanPoint"  />
				</div>
			</td>
			<td>
				<div class="tb_row" >
				<label>　是否可跳到指定节点：</label>
				<input type="text" class=" txt_class" readonly="readonly"  id="isCanNode"  />
				</div>
			</td>
		</tr>
		<tr>
		   <td>
				<div class="tb_row" >
				<label>是否能审批其它部门：</label>
				<input type="text" class=" txt_class"  readonly="readonly"  id="isCanReadAll"/>
				</div>
			</td>
			<td>
				<div class="tb_row" >
				<label>　是否可结束流程：</label>
				<input type="text" class=" txt_class" readonly="readonly"   id="isCanEnd" />
				</div>
			</td>
		</tr>
		<tr>
		    <td>
				<div class="tb_row" >
				<label>是否可审批不同意：</label>
				<input type="text" class=" txt_class" id="pdBeCanApproveUnAgree"  readonly="readonly" />
				</div>
			</td>
			<td>
				<div class="tb_row" >
				<label>　是否可不填审批意见：</label>
				<input type="text" class=" txt_class" id="isNotOpinion"  readonly="readonly" />
				</div>
			</td>
       </tr>
		<tr>
			<td>
				<div class="tb_row" >
				<label>　审批角色：</label>
				<input type="text" class=" txt_class" id="approvalRole" readonly="readonly"/>
				</div>
			</td>
			<td>
				<div class="tb_row" >
				<label>　下一级审批条件：</label>
				<input type="text" class="txt_class" id="nextCondition" readonly="readonly"/>
				</div>
			</td>
		</tr>
	</table>
  </body>
</html>
