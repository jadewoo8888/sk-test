var datagrid;
$(function(){
	var _columns;
	if(way){
		_columns =  
			[[
		   		{field:"groupTypeCode",title:'编码',halign:"center",align:"left",minwidth:200},
				{field:"groupTypeName",title:'名称',halign:"center",align:"left",minwidth:200},
				{field:'remark',title:'说明',halign:"center",align:"left",minwidth:248}
			]];
	}else{
		_columns =  
		[[
	   		{field:"userAccount",title:'账号',halign:"center",align:"left",minwidth:200},
			{field:"userName",title:'姓名',halign:"center",align:"left",minwidth:200},
			{field:'UserOrgCode',title:'所属单位',halign:"center",align:"left",minwidth:248},
			{field:'UserDepartmentCode',title:'所属部门',halign:"center",align:"left",minwidth:248},
			{field:'userGroupCodeDisplay',title:'所属组',halign:"center",align:"left",minwidth:248},
			{field:'UserRemark',title:'备注',halign:"center",align:"left",minwidth:248}
		]];
	}
	//初始化表格
	var _sortInfo = {"sortPK" : way?"groupTypeCode":"userAccount","sortSql" : "LastestUpdate Desc"};
	
	var dataGridOptions ={checkbox:true,height:450};
	var customOptions = {tableID:'accountTable',classID:way?'GroupTypeBO':'UserBO',columns:_columns,sortInfo:_sortInfo};
	datagrid = new DataGrid(customOptions,dataGridOptions);
	 
	//点击消除账号框中提示
   	$("#userAccount").focus(function(){
   		$(this).val('');
   		$(this).css("color","#333");
   	});
   	
   	//用户名框失去焦点事件
   	$("#userAccount").blur(function(){
   		if($(this).val() == ''){
   			$(this).val('账号');
   			$(this).css("color","#C6C6C6");
   		}
   	});
   	
	//点击消除用户名框中提示
   	$("#userName").focus(function(){
   		$(this).val('');
   		$(this).css("color","#333");
   	});
   	
   	//用户名框失去焦点事件
   	$("#userName").blur(function(){
   		if($(this).val() == ''){
   			$(this).val('姓名');
   			$(this).css("color","#C6C6C6");
   		}
   	});
   	
	//执行查询操作
   	$("[type=button]").click(function(){
		datagrid.query();
   	})
   	
	
})
//异步请求账号关联
function ajaxAssociateUser(){
	var rows = datagrid.getSelectedData();
	//把得到的关联用户参数传回编辑页面窗口
	var win = window.open('',parentwindowname);
	win.windowParameters(rows);
	cancel();
}

//取消
function cancel(){
	var parentIndex = top.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	top.layer.close(parentIndex); //再执行关闭 
}
