<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>

<!doctype html>
<html>
<head>
<script src="listOutApprovalPath.js" language="javascript" type="text/javascript"></script>
<style>
	.combo {float:left}
	.clearBoth{clear:both}
	.pdt10{padding-top:10px}
	.searchbox{float:left;}
</style>
</head>

<body style="background-color:#ebecec;">
        
		<div class="pd10 clearfloat">
			<div class="head" id="id_div_desc"> 
				<span class="head-title">${html:menuname(null)}</span>
				<span class="head-tx">${html:menudesc(null)}</span>
			</div>
               <!--查询操作-->
               <!--开始-->
			<div id="id_div_basequery" class="shaixuan clearfloat">
				<div>
					<a id="createEntry" href="javascript:createWindow('新增入库单')" class="bt_list_function float_left">+新建</a>
					<a id="deleteEntry" href="javascript:deleteRows()" class="bt_list_function float_left">删除</a>
					<a href="javascript:selecteColumns()" class="bt_list_function float_left">列选</a>
					<a href="javascript:exportTable()" class="bt_list_function float_left">导出</a>
				</div>
				<div class="shaixuan_top clearBoth pdt10">
					<input type="text"   qc={fn:'orgSysCode',oper:'0'} placeholder="单位名称"  id="orgSysCode"  class="shaixuan_txt easyui-searchbox"/>
					<input type="text"   qc={fn:'busiType',oper:'0'} placeholder="业务类型"  id="busiType"  class="shaixuan_txt easyui-combobox" editable="false" data-options="valueField:'classifyCode',textField:'classifyName',data:${json:classify('STD_SPYWLX')}"/>
					<input type="text"   qc={fn:'updatePerson',oper:'0'} placeholder="最后更新人"    class="shaixuan_txt"/>			
					<input id="time1"    qc={fn:'lastestUpdate',oper:'13'}    placeholder="最后更新时间" 	class="easyui-datebox" editable="fasle"/>
					<span  class="c_span">-</span>
					<input id="time2"    qc={fn:'lastestUpdate',oper:'12'}    placeholder="最后更新时间" class="easyui-datebox"   editable="fasle" />
					<input type="button" id="query" value="查询" class="bt_query float_left">
				</div>
			</div>
               
              <!--结束-->
			<div class="biao clearfloat">
				<table id="outApprovalPathTabel">
				</table>
			</div>
		</div>

</body>
</html>
