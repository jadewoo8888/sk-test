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
	initCategoryCombo();
	initDeptBox();
	setItemStatus();
});


/**
 * 初始化表格信息
 **/
function initDataGrid() {
	 var _sortInfo = {"sortPK" : "pk","sortSql" : "lastestUpdate Desc"};
	 var _columns =  
	 [[
	 	{field:'option',title:'操作',minwidth:150,formatter:function(value,row,index){
	 		var html = "<a class='table_a_css' href='javascript:viewone(\""+row.pk+"\")' >查看</a>";
	 		//审批按钮,状态为待审批or审批中，且审批人中包含当前用户时显示
			if ((row.itemsApplyFlag == 'WPSLZT_002' || row.itemsApplyFlag == 'WPSLZT_003') && row.allowApprPerson.indexOf('|'+ top.strUserAccount +'|')!=-1) {
				html += "<a href='javascript:void(0);' onclick='approval(\""+row.pk+"\")' >审批</a>  ";
			}
 			return html;
		}}, 
		{field:"itemsApplyCode",title:'申领单号',minwidth:80},
		{field:"categoryManagementPKDisplay",title:'类目',minwidth:80},
        {field:"itemsApplyDeptCodeDisplay",title:'申领部门',minwidth:100},
        {field:"applyPersonDisplay",title:'申领人',minwidth:80},
        {field:"itemsApplyFlagDisplay",title:'单据状态',minwidth:80},
        {field:"itemsIssueListerDisplay",title:'发放人',minwidth:80},
        {field:"itemsIssueDate",title:'发放日期',minwidth:100},
        {field:"itemsApplyRemark",title:'备注',minwidth:160}
	]];
	 
	 var dataGridOptions ={checkbox:false};
	 var customOptions = {tableID:'id_table_grid',classID:'ItemsApplyManagementBO',methodID:'getListForPageItemStatus',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition,
			 orgField:"orgCode",deptField:'itemsApplyDeptCode'};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
	 
}

/**
 * 为页面上的组件添加事件处理方法
 **/
function initComBindFunc() {
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
 * 选择申领部门
 **/
function initDeptBox(){
	//申领部门搜索  
	$('#deptCode').searchbox({ 
		//prompt:'申领部门',
		searcher:function(value,name){ 
				//选择申领部门树
		   		var treeValue = $('#deptCode').attr('treevalue');  
		 		var treeOption = {selType:'sgl',defaultSelecteds:treeValue,callBackFunction:acTreeCallBack};
			  	top.deptTree(treeOption);
		}
	});
	//禁止输入
	$('#deptCode').searchbox('textbox').attr('readonly',true);//禁用输入
	//申领部门树回调
	function acTreeCallBack(code,codeAndName){
		$('#deptCode').searchbox('setValue',codeAndName);
		$('#deptCode').attr('treevalue',code);
	}
}

/**初始化类目下拉框。根据角色编码查找：下拉类目列表包含自己角色的和类目角色为空的**/
function initCategoryCombo() {
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

//审批页面
function approval(pk){
	location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/applymanage/applyapprove/editapplyapprove.jsp?pk='+pk+'&business='+STR_VIEW;
}

/**
 * 查看页面
 **/
function viewone(pk){
	top.layer.open({
		type:2,
		title:'查看登记信息 ',
		shift:1,
		closeBtn :2,
		area:['900px','628px'],
		shade:false,
		zIndex:'2015', 
		success:function(layero){
	   		top.layer.setTop(layero); 
		},
		content:contextPath+'/sys/basemodules/lowvalueitemsmanagement/applymanage/applyregister/viewapplyregister.jsp?pk='+pk+'&business='+STR_VIEW
	});
}

function setItemStatus(){
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

//自定义查询条件
function setCustomQueryCondition() {
	var customQCArr = new Array();
	
	//审批人条件
	orgQc = new Object();
	orgQc.fn = '';
	orgQc.oper = ARY_STR_NULLOPER[0];
	orgQc.value1 = '(AllowApprPerson like \'%|'+ top.strUserAccount +'|%\' or linkers like \'%|'+ top.strUserAccount +'|%\')  and itemsApplyFlag!=\'WPSLZT_001\'';
	customQCArr.push(orgQc);
	
    return customQCArr;
}
