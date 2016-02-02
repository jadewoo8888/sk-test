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
			//html += "<a class='table_a_css' href='javascript:deleteone(\""+row.id+"\")' >删除</a>";
			html += "<a class='table_a_css' href='javascript:viewone(\""+row.pk+"\")' >查看</a>";
 			return html;
		}}, 
		{field:"pk",title:'主键',minwidth:200, hidden:true},
		{field:"categoryName",title:'名称',minwidth:150},
        {field:"categoryRemark",title:'备注',minwidth:160},
        {field:"groupCodeDisplay",title:'所属角色组',minwidth:160}
	]];
	 var dataGridOptions ={};
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
	$("#id_btn_delete").click(function () {
		deleteMulti();
	}); 
	//查询按钮处理事件
	$("#id_btn_query").click(function () {
		datagrid.query();
	});
	$("#id_btn_selecteColumns").click(function () {
		datagrid.showSelectListItem();
	});
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
 	window.location.href = "editcategroy.jsp?busitype=add";
}

//修改
function modifyone(pk){
		location.href='editcategroy.jsp?pk='+pk+'&busitype=modify';

}

/**
 * 查看类目信息单
 **/
function viewone(pk){
	top.layer.open({
		type:2,
		title:'查看类目信息 ',
		shift:1,
		closeBtn :2,
		area:['450px','228px'],
		shade:false,
		zIndex:'2015', 
		success:function(layero){
	   		top.layer.setTop(layero); 
		},
		content:contextPath+'/sys/basemodules/lowvalueitemsmanagement/systemseting/categorymanage/viewcategory.jsp?pk='+pk
	});
}

function deleteMulti() {
	//取得选中类目
	var categoryList=datagrid.getSelectedData();
	//没有选择类目，返回

	if(categoryList.length==0){
			top.layer.alert('请选择要删除的记录 ',{icon: 5, closeBtn:2});
			return;
	}
	var pkArr = [];
	
	//获取选中类目pk，生成数组 
	for (var i in categoryList){
		pkArr.push(categoryList[i].pk);
	}
	$("#id_btn_delete").attr("disabled", true);                                                             //按钮不可点击
	
	//类目删除提交
	top.layer.open({
		title:'提示 ',
		icon: 3,
		area:['250px','150px'],
		btn:['确定','取消'],
		content:'确定删除吗？',
		shift:1,
		closeBtn :2,
		yes: function(index){
				//一般设定yes回调，必须进行手工关闭

    	 		top.layer.close(index);	    	 		
				$('body').addLoading({msg:'正在删除数据，请等待...'});			  //打开遮挡层

				Ajax.service(
						'CategoryManagementBO',
						'deleteCategory', 
						 [pkArr],
						function(result){
							$('body').removeLoading();     // 关闭遮挡层

							$("#id_btn_delete").attr("disabled", false);                          // 按钮可点击

							
							if(result!=null&&result!=""){		
								top.layer.alert(result,{icon: 5, closeBtn:2});
							}else{
								top.layer.alert('删除成功 ',{icon: 6, closeBtn:2});
						    	//刷新
						    	 datagrid.query();
							}		
						}
					);
			
		},
		cancel: function(index){
				$("#id_btn_delete").attr("disabled", false);                          // 按钮可点击

		}
	});
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
