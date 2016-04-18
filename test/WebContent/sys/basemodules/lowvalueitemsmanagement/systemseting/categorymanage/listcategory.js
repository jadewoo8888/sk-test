/**
 * 
 */
//列表表格对象
var datagrid = null;

/**
 * 初始化方法
 **/ 
$(function () { 
	initDataGrid();
	initComBindFunc(); 
	initRoleCombo();
});

/**
 * 初始化表格信息
 **/
function initDataGrid() {
	 var _sortInfo = {"sortPK" : "pk","sortSql" : "lastestUpdate Desc"};
	 var _columns =  
	 [[
	 	{field:'option',title:'操作',minwidth:150,formatter:function(value,row,index){
			var html = "<a href='javascript:void(0);' onclick='modifyone(\""+row.pk+"\")' >修改</a>";
			html += "<a class='table_a_css' href='javascript:deleteone(\""+row.pk+"\")' >删除</a>";
			//html += "<a class='table_a_css' href='javascript:viewone(\""+row.pk+"\")' >查看</a>";
 			return html;
		}}, 
		//{field:"pk",title:'主键',minwidth:200, hidden:true},
		{field:"categoryName",title:'名称',minwidth:150},
		{field:"groupCodeDisplay",title:'适用角色组',minwidth:160},
        {field:"categoryRemark",title:'备注',minwidth:160}
	]];
	 var dataGridOptions ={checkbox:false};
	 var customOptions = {tableID:'id_table_grid',classID:'CategoryManagementBO',columns:_columns,sortInfo:_sortInfo};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}


/**
 * 为页面上的组件添加事件处理方法
 **/
function initComBindFunc() {
	$("#id_btn_addnew").click(function () {
		addone();
	});
	/*$("#id_btn_delete").click(function () {
		deleteMulti();
	}); */
	//查询按钮处理事件
	$("#id_btn_query").click(function () {
		datagrid.query();
	});
	/*$("#id_btn_selecteColumns").click(function () {
		datagrid.showSelectListItem();
	});*/
	$("#id_btn_export").click(function () {
		datagrid.showExport();
	}); 
	
	
}

/**
 * 新增
 **/
function addone() {
	/*if(!judgeOpeCollectOrg()) {
		return;
	}*/
 	window.location.href = "editcategroy.jsp?business="+STR_REGISTER_ADDNEW;
}

//修改
function modifyone(pk){
		location.href='editcategroy.jsp?pk='+pk+'&business='+STR_REGISTER_MODIFY;

}

/**
 * 删除
 **/
function deleteone(pk) {
	top.layer.open({
		title:'删除数据',
		icon: 3,
		area:['300px','160px'],
		btn:['确定', '取消'],
		content:'确定要删除选中的数据吗？',
		shift:1,
		closeBtn :2,
		yes: function(index){
			top.layer.close(index);
			deleteService(pk);		
	    }
	});	
}

/**
 * 发送删除请求
 **/
function deleteService(pk) {
	Ajax.service(
		'CategoryManagementBO',
		'deleteCategory', 
		[pk],
		deleteServiceSuccFunc,
		serviceFailureFunc
	);
}

/**
 * 删除请求成功回调函数
 **/
function deleteServiceSuccFunc(data) {
	if(data!="null"&&data.length>0){
		top.layer.alert(data,{closeBtn :2,icon:5});
		changeBtnDisabled(false);
	}else{	    				
		top.layer.alert('删除成功 ',{icon:6,closeBtn :2});
		datagrid.query();
	}	
}

/**
 * 请求失败回调函数,删除，注销，撤销注销失败等均调用此方法
 **/
function serviceFailureFunc() {
	top.layer.alert('删除数据出现错误，请联系管理员 ',{icon:5,closeBtn :2});
} 

//初始化角色下拉列表
function initRoleCombo() {
	//选择角色
	$('#role').combobox({
		onBeforeLoad: function(param){
			ajaxRole();
		},
		valueField:'groupCode',
		textField:'groupName',
		width:180,
		height:26,
		multiple:true,
		panelHeight:100,
		editable:false
	});
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
