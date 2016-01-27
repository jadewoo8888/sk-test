<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>

<!doctype html>
<html>
<head>
<script>
$(function(){
	//避免出现datagrid的滚动条被浏览器滚动条遮挡 
	$(window).resize(function (){
		$("#roletable").datagrid("resize");
	});
		//执行查询操作
   	$("#submit").click(function(){
		datagrid.query();       
   	})
   	
	 var _sortInfo = {"sortPK" : "GroupCode","sortSql" : "LastestUpdate Desc"};
	 var _columns =  
	 [[
  		{field:'option',title:'操作',minwidth:200 ,formatter:function(value,row,index){
		var editgroup,searchgroup,deletegroup; 
		editgroup = "<a href='editrole.jsp?business="+STR_REGISTER_MODIFY+"&groupCode="+row.groupCode+"'>修改</a>  ";
		deletegroup = "<a onclick='deleterole(\""+row.groupCode+"\")' href='javascript:void(0);'>删除 </a>";
		searchgroup ="<a onclick='viewrole(\""+row.groupCode+"\")' href='javascript:void(0);' >查看</a>  ";
    	return editgroup+deletegroup+searchgroup;
        }},
		{field:"groupName",title:'角色',minwidth:200,align:'left',halign:'center'},
		{field:"groupCode",title:'角色编码',minwidth:200,align:'left',halign:'center'},
		{field:"groupOrgClassDisplay",title:'单位级别',minwidth:200},
		{field:"groupTypeCodeDisplay",title:'角色类型',minwidth:200},
		{field:"groupRemark",title:'角色说明',minwidth:320,align:'left',halign:'center'},
		{field:"lastestUpdate",title:'更新时间',minwidth:180}
	]];	 
	 var dataGridOptions ={checkbox:false,rownumbers:true};
	 var customOptions = {tableID:'roletable',classID:'GroupBO',columns:_columns,sortInfo:_sortInfo};	 
	 var datagrid = new DataGrid(customOptions,dataGridOptions);
   	//列选功能 
   	$("#selecteColumns").click(function(){ 
   		datagrid.showSelectListItem();
   	});
	//导出功能  
   	$("#ouputColumns").click(function(){
   	 	datagrid.showExport();
   	});	   
})
//查看角色弹窗
function viewrole(groupCode){
	top.layer.open({
		type:2,
		title:'查看角色',
		shift:1,
		closeBtn :2,
		area:['410px','490px'],
		shade:false,
		zIndex:'2015', 
		success:function(layero){
    		top.layer.setTop(layero); 
		},
		content:'/gdczsam/sys/basemodules/rolemodules/viewrole.jsp?groupCode='+groupCode
	});
}
//删除角色 
function deleterole(groupCode){
	top.layer.open({
		title:'删除角色',
		icon: 3,
		area:['250px','150px'],
		btn:['确定', '取消'],
		content:'你确定要删除角色吗？',
		shift:1,
		closeBtn :2,
		yes: function(index){
				//删除角色 
				Ajax.service(
						'GroupBO',
						'delete_withcheck', 
						[groupCode],
						function(result){
							if(result=='null'){
								top.layer.alert('删除成功 ',{icon:6});
								$('#roletable').datagrid('reload'); 
							}else{
								top.layer.alert(result,{icon:5});
							}
						}
				);
	    	 //一般设定yes回调，必须进行手工关闭 
		    	 top.layer.close(index); 
	    }
	});	
}
</script>
<style type="text/css">
.combo-text{overflow:hidden;text-overflow:ellipsis;-o-text-overflow:ellipsis;white-space:nowrap;}
</style>
</head>

<body style="background-color:#ebecec;">
	<!--用户切换-->
	<div class="pd10 clr">			
    	<div id="id_div_desc" class="head">
			<span class="head-title">${html:menuname(null)}</span>
			<span class="head-tx">${html:menudesc(null)}</span>
		</div>
          <!--操作-->
		<div  id='id_div_basequery' class="shaixuan clearfloat">
			<div class="clearfloat">
				<a href="editrole.jsp?business=saveGroup" class="bt_list_function"   name="righthtml">+ 创建角色</a>  
				<a class="bt_list_function"  id="selecteColumns" href="javascript:void(0)">列选</a>
				<a class="bt_list_function"  id="ouputColumns" href="javascript:void(0)">导出</a>
			</div>
			<div class="clearfloat mtop10"> 
				<input type="text" qc={fn:'groupName',oper:'3'} placeholder="角色"  class="shaixuan_txt float_left" >
				<input type="text" qc={fn:'groupOrgClass',oper:'5'}  placeholder="单位类型"  id="groupOrgClass" class="easyui-combobox "  editable="false"   data-options="panelHeight:100,multiple:true,height:28,width:120,valueField:'classifyCode',textField:'classifyName',data:${json:classify("STD_OrgClass")}"/>   
 				<input class="easyui-datebox"  qc={fn:'lastestUpdate',oper:'13'}   placeholder='更新时间'  editable="fasle">
				<span class='fl mleft5'>-</span>
				<input class="easyui-datebox"  qc={fn:'lastestUpdate',oper:'12'}   placeholder='更新时间'  editable="fasle">
				<input type="button" value="查询" class="bt_query float_left mleft5" id="submit">  
			</div> 
		</div>
		<div class="biao">
			<table id="roletable">   
			</table>
		</div>
	</div>
  </body>
</html>