//列表表格对象
var datagrid = null;

/**
 * 初始化方法
 **/ 
$(function () { 
	initDataGrid();
	initComBindFunc(); 
	initCategoryCombo();
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
 			return html;
		}}, 
		{field:"pk",title:'主键',minwidth:200, hidden:true},
		{field:"lviSRCategoryPKDisplay",title:'类目',minwidth:80},
        {field:"lviSRTypeDisplay",title:'类别',minwidth:80},
        {field:"lviSRName",title:'物品名称',minwidth:80},
        {field:"lviSRSpecification",title:'规格',minwidth:80},
		{field:"lviSRMetricUnit",title:'单位',minwidth:80},
		{field:"lviSRCount",title:'入库数量',minwidth:80},
        {field:"lviSRPerson",title:'入库人',minwidth:80},
		{field:"lviSRDate",title:'入库日期',minwidth:80},
		{field:"lviSRRemark",title:'备注',minwidth:150}
	]];
	 var dataGridOptions ={checkbox:true};
	 var customOptions = {tableID:'id_table_grid',classID:'LVIStoreRecordBO',columns:_columns,sortInfo:_sortInfo};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}

/**
 * 为页面上的组件添加事件处理方法
 **/
function initComBindFunc() {
	$("#id_btn_delete").click(function () {
		batchDelete();
	});
	$("#id_btn_return").click(function () {
		location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/lowvalueitemsmanage/listlowvalueitems.jsp';
	});
	//列选功能 
   	$("#id_btn_selecteColumns").click(function(){
   		datagrid.showSelectListItem();
   	})
	//查询按钮处理事件
	$("#id_btn_query").click(function () {
		datagrid.query();
	});
	$("#id_btn_export").click(function () {
		datagrid.showExport();
	}); 
	
	initCombobox();
}

/**
 * 类别下拉框
 */
function initCombobox() {
	if($('#lviSRType')[0])
		$('#lviSRType').combobox({    
		    data:data_lviSRType,  
		    editable:false,
		    panelHeight:100,
		    multiple:true,
		    height:28,
		    width:120,
		    valueField:'classifyCode',
		    textField:'classifyName',
		    onLoadSuccess: function () { //数据加载完毕事件

	        }  
		});
}

/**
 * 批量删除
 */
function batchDelete() {
	var lviStoreRecordList=datagrid.getSelectedData();
	//没有选择资产，返回

	if(lviStoreRecordList.length == 0){
			top.layer.alert('请选择要删除的记录 ',{icon: 5, closeBtn:2});
			return;
	}
	var pkArr = [];
	
	for (var i = 0; i < lviStoreRecordList.length; i++) {
		pkArr.push(lviStoreRecordList[i].pk);
	}
	$("#id_btn_delete").attr("disabled", true);                                                             //按钮不可点击
	
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
						'LVIStoreRecordBO',
						'deleteStoreRecordList', 
						 [pkArr],
						function(result){
							$('body').removeLoading();     // 关闭遮挡层

							$("#id_btn_delete").attr("disabled", false);                          // 按钮可点击

							
							if(result!=null&&result!=""){		
								top.layer.alert(result,{icon: 5, closeBtn:2});
								datagrid.query();
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
		'LVIStoreRecordBO',
		'deleteStoreRecordList', 
		[[pk]],
		deleteServiceSuccFunc,
		serviceFailureFunc
	);
}

/**
 * 删除请求成功回调函数
 **/
function deleteServiceSuccFunc(result) {
	if(result!="null"&&result.length>0){
		top.layer.alert(result,{icon: 5, closeBtn:2});
		datagrid.query();
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

//修改
function modifyone(pk){
		location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/lowvalueitemsmanage/lviStoreRecord/editlviStoreRecord.jsp?pk='+pk+'&business='+STR_REGISTER_MODIFY;

}
/**
 * 类目下拉框
 * 初始化类目下拉框。根据角色编码查找：下拉类目列表包含自己角色的和类目角色为空的
 */
function initCategoryCombo() {
	$('#category').combobox({
		onBeforeLoad: function(param){
			ajaxCategory();
		},
		valueField:'pk',
		textField:'categoryName',
		width:180,
		height:26,
		panelHeight:100,
		editable:false
	});
}

function ajaxCategory(){
	Ajax.service(
		'CategoryManagementBO',
		'findCategoryByGroupCode', 
		[top.strUserGroupCode],
		function(result){
			$('#category').combobox("loadData",result);
		}
	);
}

