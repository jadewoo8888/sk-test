<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
   <script type="text/javascript" src="listDefineProcess.js"></script>
   <script >
     var inApprovalPathPK='${param.inApprovalPathPK}';
   </script>
  </head>
  
	<body class="list_body">
        <div class="head"  id="id_div_desc">
			<span class="head-title">内部审批路径</span>
			<span class="head-tx">定义流程</span>
		</div>
		<!--查询操作-->
	<div id="id_div_basequery" class="shaixuan clearfloat">
		<div  class="clearfloat">
			<a href="javascript:void(0);"  id="previousnode"  onclick="addpreviousnode('btn_addlast')" class="bt_list_function">添加上一节点</a>
			<a href="javascript:void(0);"  id="nextnode"    onclick="addpreviousnode('btn_addnext')"   class="bt_list_function" >添加下一节点</a>
			<a href="javascript:void(0);"  id="previousnode"  onclick="movenode('btn_up')" class="bt_list_function">上移</a>
			<a href="javascript:void(0);"  id="nextnode"    onclick="movenode('btn_down')"   class="bt_list_function" >下移</a>
			<a href="javascript:void(0);"  id="delete_process"  onclick="deleteprocess()" class="bt_list_function">删除</a>
			<a href="javascript:void(0);"  id="selectColumns"  onclick="selecteColumns()" class="bt_list_function">列选</a>
			<a href="javascript:void(0);"  id="ouputColumns"    onclick="exportTable()"   class="bt_list_function" >导出</a>
		</div>	
		<div   class="mtop10 clearfloat">
			<input type="text"   qc={fn:'itemName',oper:'0'} placeholder="审批栏名称"  id="itemName"  class="shaixuan_txt"/>
			<input type="text"   qc={fn:'processCode',oper:'0'} placeholder="审批序号"  id="processCode"  class="shaixuan_txt "/>
			<input type="text"   qc={fn:'updatePerson',oper:'0'} placeholder="最后更新人"    class="shaixuan_txt"/>			
			<input id="time1"    qc={fn:'lastestUpdate',oper:'13'}    placeholder="最后更新时间" 	class="easyui-datebox" editable="fasle"/>
			<span  class="c_span">-</span>
			<input id="time2"    qc={fn:'lastestUpdate',oper:'12'}    placeholder="最后更新时间" class="easyui-datebox"   editable="fasle" />		
			<input type="button" id="submit" value="查询" class="bt_query mleft5"/>
		</div>		
	</div>
	<div class="biao clearfloat">
	    <table id="processtable"></table>
	</div>	
  	</body>
</html>
