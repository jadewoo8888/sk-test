/**
 * 
 */
//列表表格对象
var datagrid = null;

/**
 * 初始化方法
 **/ 
$(function () { 
	initApplyFlagCombo();
	initDataGrid();
	initComBindFunc(); 
	getCategoryComboboxData();
	initDeptBox();
});

function initApplyFlagCombo(){
	//申请单状态 查询条件控件初始化
	
	 $("#itemsApplyFlag").combobox({
		 data:[
			{classifyCode:'WPSLZT_001',classifyName:'全部'},
		 	{classifyCode:'WPSLZT_002,WPSLZT_003',classifyName:'待审批'},
		 	{classifyCode:'WPSLZT_001,WPSLZT_002,WPSLZT_003',classifyName:'已审批'}
		 ],
		 onSelect:function(data){
		 	if(data.classifyName == "待审批"){
		 		$("#itemsApplyFlag").attr('qc',"{fn:'itemsApplyFlag',oper:'"+ARY_STR_INCLUDE[0]+"'}");
		 	}else if(data.classifyName == "已审批"){
		 		$("#itemsApplyFlag").attr('qc',"{fn:'itemsApplyFlag',oper:'"+ARY_STR_NOTINCLUDE[0]+"'}");
		 	}else if(data.classifyName == "全部"){
		 		$("#itemsApplyFlag").attr('qc',"{fn:'itemsApplyFlag',oper:'"+ARY_STR_NOTEQUAL[0]+"'}");
		 	}
		 }
	 })
}



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
	 var customOptions = {tableID:'id_table_grid',classID:'CategoryManagementBO',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition};	 
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

//部门树回调函数

/**
 * 选择申领部门
 **/
function initDeptBox(){
	//资产分类代码搜索  
	$('#orgCode').searchbox({ 
		prompt:'申领部门',
		searcher:function(value,name){ 
				//选择资产分类树
		   		var treeValue = $('#orgCode').attr('treevalue');  
		 		var treeOption = {selType:'sgl',defaultSelecteds:treeValue,callBackFunction:acTreeCallBack};
			  	top.deptTree(treeOption);
		}
	});
	//禁止输入
	$('#orgCode').searchbox('textbox').attr('readonly',true);//禁用输入
	//资产分类树回调
	function acTreeCallBack(code,codeAndName){
		$('#orgCode').searchbox('setValue',codeAndName);
		$('#orgCode').attr('treevalue',code);
	}
}

function getCategoryComboboxData() {
	function ajaxCategory(){
		Ajax.service(
			'CategoryManagementBO',
			'findAll', 
			[],
			function(result){
				$('#category').combobox("loadData",result);
			}
		);
	}

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

/**
 * 新增
 **/
function addone() {
	/*if(!judgeOpeCollectOrg()) {
		return;
	}*/
 	window.location.href = "editapplyregister.jsp?busitype=add";
}

//修改
function modifyone(pk){
		location.href='editapplyregister.jsp?pk='+pk+'&busitype=modify';

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

//自定义查询条件
function setCustomQueryCondition() {
	var customQCArr = new Array();
	//审批人条件
	orgQc = new Object();
	orgQc.fn = '';
	orgQc.oper = ARY_STR_NULLOPER[0];
	orgQc.value1 = 'AllowApprPerson like \'%|'+ top.strUserAccount +'|%\' or linkers like \'%|'+ top.strUserAccount +'|%\'';
	customQCArr.push(orgQc);
	
    return customQCArr;
}
