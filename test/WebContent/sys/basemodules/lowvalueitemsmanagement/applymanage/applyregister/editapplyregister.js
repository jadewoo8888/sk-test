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
			html += "<a class='table_a_css' href='javascript:viewone(\""+row.pk+"\")' >查看</a>";
			html += "<a href='javascript:void(0);' onclick='reportone(\""+row.pk+"\")' >上报</a>  ";
 			return html;
		}}, 
		//{field:"pk",title:'主键',minwidth:200, hidden:true},
		{field:"itemsApplyCode",title:'申领单号',minwidth:150},
        {field:"categoryNameDisplay",title:'类目',minwidth:160},
        {field:"orgCodeDisplay",title:'申领部门',minwidth:160},
        {field:"applyPersonDisplay",title:'申领人',minwidth:150},
        {field:"iamCheckFlagDisplay",title:'单据状态',minwidth:160},
        {field:"itemsIssueListerDisplay",title:'发放人',minwidth:160},
        {field:"itemsIssueDate",title:'发放日期',minwidth:150},
        {field:"itemsApplyRemark",title:'备注',minwidth:160}
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

//删除 
function deleteone(pk){
	//删除提交
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
						'LetRentBO',
						'deleteLetRent', 
						 [[pk]],
						function(result){
							$('body').removeLoading();     // 关闭遮挡层

							
							if(result!=null&&result!=""){		
								top.layer.alert(result,{icon: 5, closeBtn:2});
							}else{
								top.layer.alert('删除成功 ',{icon: 6, closeBtn:2});
						    	//刷新
						    	 datagrid.query();
							}		
						}
					);		
		}
	});
}

