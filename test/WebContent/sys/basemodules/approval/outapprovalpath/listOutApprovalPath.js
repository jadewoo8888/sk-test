var datagrid;
$(function(){	
	iniTables();
	windowResize();
	
	//浏览器宽度调整触发
	window.onresize = function(){
		setTimeout(windowResize,0);
	};
	//调整窗口大小
	function windowResize(){
		$("#registTable").datagrid("resize");
	}
	//初始化表格数据
	function iniTables(){
		var _sortInfo = {"sortPK" : "pk","sortSql" : "lastestUpdate Desc"};
		var _columns =  
		[[
			{field:'option',title:'操作',minwidth:100,formatter:function(value,row,index){
				var update,look;  
				update = "<a class='table_a_css' href='javascript:createWindow(\"修改外部路径设置\",\""+row.pk+"\")'>修改</a>   ";
				look = "<a class='table_a_css' href='javascript:createWindow(\"查看外部路径设置\",\""+row.pk+"\",\"true\")'>查看</a>   ";
				return update+look;
			}},
	   		{field:"busiTypeDisplay",title:'业务类型',minwidth:150,halign:"center",align:"left"},
			{field:"itemName",title:'审批栏名称',minwidth:150,halign:"center",align:"left"},
			{field:'orgSysCodeDisplay',title:'单位名称',minwidth:200,halign:"center",align:"left"},
			{field:'groupID',title:'权限人组号',minwidth:200,halign:"center",align:"left"},
			{field:'userID',title:'权限人账号',minwidth:200,halign:"center",align:"left"},
			{field:'nextOrgDisplay',title:'下一审批单位',minwidth:200,halign:"center",align:"left"},
			{field:'nextCondition',title:'下一级审批条件',minwidth:200,halign:"center",align:"left"},
			{field:'applicabilityDisplay',title:'适用范围',minwidth:200,halign:"center",align:"left"},
			{field:'updatePerson',title:'最后修改人',minwidth:200,halign:"center",align:"left",hidden:true},
			{field:'lastestUpdate',title:'最后修改时间',minwidth:200,halign:"center",align:"left",hidden:true}
		]];
		 
		var dataGridOptions ={checkbox:true};
		var customOptions = {tableID:'outApprovalPathTabel',classID:'OutApprovalPathBO',columns:_columns,sortInfo:_sortInfo,height:350,orgField:"orgSyscode"};
		 
		datagrid = new DataGrid(customOptions,dataGridOptions);
	}
	
	//触发查询
	$("#query").click(function(){
		datagrid.query();
	})
	
	
})
/**创建编辑窗口
 * 
 * @param title	弹出页面的标题
 * @param pk	传输的pk值
 * @param flag	查看标志（true则查看）
 * @return
 */
function createWindow(title,pk,flag){
	top.layer.open({
		type:2,
		title:title,
		shift:1,
		closeBtn :2,
		area:['750px','400px'],
		content:'/gdczsam/sys/basemodules/approval/outapprovalpath/editOutApprovalPath.jsp?readFlag='+flag+'&pk='+pk
	});
}

//显示或隐藏某些列
function selecteColumns(){ 
	datagrid.showSelectListItem();
}
//删除行数据
function deleteRows(){
	var selectedRowData = datagrid.getSelectedData();
	var pkArr = new Array();
	
	//非空提示
	if(selectedRowData.length == 0){
		top.layer.alert("至少选择一行信息",{icon:0,closeBtn:2})
		return;
	}
	
	$.each(selectedRowData,function(i,v){
		pkArr[i] = selectedRowData[i].pk;
	})
	top.layer.open({
		title:'警告',
		icon: 7,
		closeBtn:2,
		area:[250,150],
		btn:['确定', '取消'],
		content:"确定要进行删除操作？",
		yes: function(index){
			deleteEntry(pkArr);
		}
	});
}

//等待数据
function waiting(){
	$("body").addLoading({
        msg: '正在提交数据中，请稍后...'
    })
    changeBtnDisabled(true);
}
//结束等待
function overWait(){
	$("body").removeLoading()
	changeBtnDisabled(false);
}

//导出
function exportTable(){
	datagrid.showExport();
}
