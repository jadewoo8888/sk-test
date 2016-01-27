var datagrid;
$(function(){
	//datagrid对象
	
	iniTables();
	windowResize();
	
	//浏览器宽度调整触发
	window.onresize = function(){
		setTimeout(windowResize,0);
	}; 
	//调整窗口大小
	function windowResize(){
		$("#userManagerTable").datagrid("resize");
	}
	//初始化表体
	function iniTables(){ 
		var _sortInfo = {"sortPK" : "userAccount","sortSql" : "LastestUpdate Desc"};
		var _columns =  
		[[
		   {field:'option',title:'操作',minwidth:300,formatter:function(value,row,index){
				var update,disable,dataRole,functionRole; 
				var userAccount = encodeURI(encodeURI(row.userAccount));
				update = "<a class='table_a_css' href='editCreateUser.jsp?userInfo="+userAccount+"'>修改</a>   ";
				if(row.userCheckFlag == "SJZT_04")
					disable = "<a class='table_a_css' href='javascript:ajaxOnOff(\""+row.userAccount+"\",true)'>启用</a>   ";
				else
					disable = "<a class='table_a_css' href='javascript:ajaxOnOff(\""+row.userAccount+"\",false)'>禁用</a>   ";
				dataRole = "<a class='table_a_css' href='javascript:dataPower(\""+row.userAccount+"\",\""+row.userName+"\",\""+row.userOrgCode+"\",\""+row.userDepartmentCode+"\")' >数据权限</a>   ";
				functionRole = "<a class='table_a_css' href='javascript:power(\""+row.userAccount+"\",\""+row.userName+"\")' >功能权限</a>   ";
				
				return update+disable+dataRole+functionRole;
		   }},
		   {field:"userAccount",title:'账号',minwidth:150,halign:"center",align:"left"},
		   {field:"userName",title:'姓名',minwidth:150,halign:"center",align:"left"},
		   {field:'userGroupCodeDisplay',title:'角色',minwidth:150},
		   {field:'defaultHomePageDisplay',title:'主页页面',minwidth:120},
		   {field:'userCheckFlagDisplay',title:'状态',minwidth:50},
		   {field:'insertTime',title:'创建时间',minwidth:200,formatter:function(value,row,index){
			   if(value!=null)
				   return value.split(":")[0]+":"+value.split(":")[1];
		   }},
		   {field:"assetRegLister",title:'登记人',minwidth:120,hidden:true},
		   {field:"updatePerson",title:'最后修改人',minwidth:120,hidden:true},
		   {field:"lastestUpdate",title:'最后修改时间',minwidth:120,hidden:true}
		]];
		 
		var dataGridOptions ={checkbox:false};
		var customOptions = {tableID:'userManagerTable',classID:'UserBO',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition};
		 
		datagrid = new DataGrid(customOptions,dataGridOptions);
	}
	
	//角色加载
	function ajaxRole(){
		Ajax.service(
			'GroupBO',
			'findAll', 
			[],
			function(result){
				$('#role').combobox("loadData",result);
			}
		);
	}
	
	//选择角色
	$('#role').combobox({
		onBeforeLoad: function(param){
			ajaxRole();
		},
		valueField:'groupCode',
		textField:'groupName',
		width:180,
		height:26,
		panelHeight:100,
		editable:false
	});
	
   	//显示或隐藏某些列
   	$("#selecteColumns").click(function(){
   		datagrid.showSelectListItem();
   	})
   	
   	//执行查询操作
   	$("[type=button]").click(function(){
   		datagrid.query(); 
   	})
//jquery函数结束	
})

	//功能权限
	function power(userid,userName){
		userid = encodeURI(encodeURI(userid));
		userName = encodeURI(encodeURI(userName));
		top.layer.open({
			type:2,
			title:'功能权限',
			shift:1,
			closeBtn :2,
			area:['800px','510px'],
			content:"/gdczsam/sys/basemodules/usermodules/listPowerSelect.jsp?userid="+
						userid+"&userName="+userName
		});
	};
	
	//数据权限
	function dataPower(userid,userName,userOrgCode,userDepartmentCode){
		userid = encodeURI(encodeURI(userid));
		userName = encodeURI(encodeURI(userName));
		top.layer.open({
			type:2,
			title:'数据权限',
			shift:1,
			closeBtn :2,
			area:['800px','530px'],
			content:"/gdczsam/sys/basemodules/usermodules/listDataPowerSelect.jsp?userid="+
						userid+"&userName="+userName+"&userOrgCode="+userOrgCode+
						"&userDepartmentCode="+userDepartmentCode
		});
	};
	
	//启用禁用
	function ajaxOnOff(userid,flag){
		var tips = flag?"启用":"禁用";
		top.layer.open({
			title:'信息',
			icon: 3,
			closeBtn:2,
			area:[250,150],
			btn:['确定', '取消'],
			content:"确定"+tips+"吗?",
			yes: function(index){
				Ajax.service(
					'UserBO',
					'restrictUser', 
					[userid,flag],
					function(result){
						$('#userManagerTable').datagrid("reload");   
						top.layer.close(index);
					}
				);
			}
		});
	}
	//账号关联
	function ajaxUserAccount(userid,userConnection){
		top.layer.open({
			type:2,
			title:'账号关联',
			shift:1,
			closeBtn :2,
			area:['800px','600px'],
			content:'/gdczsam/sys/basemodules/usermodules/listUserAccount.jsp?userid='+
		    		userid+"&userConnection="+userConnection
		});
 	}
	//获取角色值
	function getRoleValue(){
		var value = $("input[name='role']").val();
		if(value=='')
			value= "%"+value+"%";
		return value;
	}
	//自定义查询条件
	function setCustomQueryCondition() {
		var customQCArr = new Array();
		//单位条件
		var orgQc = new Object();
 		orgQc.fn = 'UserOrgCode';
		orgQc.oper = ARY_STR_LIKE[0];
		orgQc.value1 = top.strFilterOrgCode+"%";
		customQCArr.push(orgQc);
	    return customQCArr;
	}
	//导出
	function exportTable(){
		datagrid.showExport();
	}
