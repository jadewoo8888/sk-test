<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
	<script type="text/javascript" src="listInApprovalPath.js"></script>
  </head>
  
  	<body class="list_body">
        <div class="head"  id="id_div_desc">
			<span class="head-title">${html:menuname(null)}</span>
			<span class="head-tx">${html:menudesc(null)}</span>
		</div>
		<!--查询操作-->
	<div id="id_div_basequery" class="shaixuan clearfloat">
		<div  class="clearfloat">
			<a href="javascript:void(0);"  id="add_inapprovalpath" onclick="editinapprovalpath()" class="bt_list_function">新增</a>
			<a href="javascript:void(0);"  id="delete_inapprovalpath"  onclick="deleteinapprovalpath()" class="bt_list_function">删除</a>
			<a href="javascript:void(0);"  id="defineprocess"  onclick="define_process()" class="bt_list_function">定义流程</a>
			<a href="javascript:void(0);"  id="selectColumns"  onclick="selecteColumns()" class="bt_list_function">列选</a>
			<a href="javascript:void(0);"  id="ouputColumns"    onclick="exportTable()"   class="bt_list_function" >导出</a>
		</div>
			
		<div   class="mtop10 clearfloat">
			<input type="text"   qc={fn:'orgSysCode',oper:'0'} placeholder="单位名称"  id="orgSysCode"  class="shaixuan_txt easyui-searchbox"/>
			<input type="text"   qc={fn:'busiType',oper:'0'} placeholder="业务类型"  id="busiType"  class="shaixuan_txt easyui-combobox" editable="false" data-options="valueField:'classifyCode',textField:'classifyName',data:${json:classify('STD_SPYWLX')}"/>
			<input type="text"   qc={fn:'updatePerson',oper:'0'} placeholder="最后更新人"    class="shaixuan_txt"/>			
			<input id="time1"    qc={fn:'lastestUpdate',oper:'13'}    placeholder="最后更新时间" 	class="easyui-datebox" editable="fasle"/>
			<span  class="c_span">-</span>
			<input id="time2"    qc={fn:'lastestUpdate',oper:'12'}    placeholder="最后更新时间" class="easyui-datebox"   editable="fasle" />		
			<input type="button" id="submit" value="查询" class="bt_query mleft5"/>
		</div>		
	</div>
	<div class="biao clearfloat">
	    <table id="inapprovalpathtable"></table>
	</div>	
  	</body>
</html>
