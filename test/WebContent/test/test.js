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
	var _sortInfo = {"sortPK" : "id","sortSql" : "id Desc"};
	 var _columns =  
	 [[
	 	{field:'option',title:'操作',minwidth:150,formatter:function(value,row,index){
			var html = "<a href='javascript:void(0);' onclick='modifyone(\""+row.id+"\")' >修改</a>";
			html += "<a class='table_a_css' href='javascript:deleteone(\""+row.id+"\")' >删除</a>";
			html += "<a class='table_a_css' href='javascript:viewone(\""+row.id+"\")' >查看</a>";
 			return html;
		}}, 
		{field:"id",title:'编号',minwidth:200, hidden:true},
		{field:"sex",title:'性别',minwidth:150, hidden:true},
        {field:"name",title:'姓名',minwidth:160},
        {field:"sexDisplay",title:'性别',minwidth:150}
	]];
	 var dataGridOptions ={};
	 var customOptions = {tableID:'id_table_grid',classID:'TestBO',columns:_columns,sortInfo:_sortInfo};	 
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
 	window.location.href = "edit.jsp?busitype=add";
}

//修改
function modifyone(pk){
		location.href=contextPath+'/test/edit.jsp?pk='+pk+'&busitype=modify';

}

/**
 * 删除
 **/
function deleteone(pk) {
	top.layer.open({
		title:'删除合同信息',
		icon: 3,
		area:['300px','160px'],
		btn:['确定', '取消'],
		content:'确定要删除选中的合同信息吗？',
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
		'TestBO',
		'deleteTest', 
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

/**
 * 查看客户信息单
 **/
function viewone(pk){
	top.layer.open({
		type:2,
		title:'查看物业信息 ',
		shift:1,
		closeBtn :2,
		area:['450px','228px'],
		shade:false,
		zIndex:'2015', 
		success:function(layero){
	   		top.layer.setTop(layero); 
		},
		content:contextPath+'/test/view.jsp?pk='+pk
	});
}

function deleteMulti() {
	//取得选中资产
	var testList=datagrid.getSelectedData();
	//没有选择资产，返回

	if(testList.length==0){
			top.layer.alert('请选择要删除的记录 ',{icon: 5, closeBtn:2});
			return;
	}
	var idArr = [];
	
	//获取选中资产pk，生成数组 
	for (var i in testList){
		idArr.push(testList[i].id);
	}
	$("#id_btn_delete").attr("disabled", true);                                                             //按钮不可点击
	
	//物业删除提交
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
						'TestBO',
						'deleteTestByIds', 
						 [idArr],
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