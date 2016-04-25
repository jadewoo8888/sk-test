/**
 * 
 */
//列表表格对象
var datagrid = null;

/**
 * 初始化方法
 **/ 
$(function () { 
	setCheckStatus();
	initDataGrid();
	initComBindFunc(); 
	initCategoryCombo();
	initDeptBox();
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
	 		//只有单据状态是“待发放”和“采购中”的才有【发放】操作
			if ((row.iamCheckFlag == 'FSCCQWPFS_002' || row.iamCheckFlag == 'FSCCQWPFS_003')) {
				html += "<a href='javascript:void(0);' onclick='issueone(\""+row.pk+"\",\""+row.categoryManagementPK+"\")' >发放</a>  ";
			}
 			return html;
		}}, 
		{field:"itemsApplyCode",title:'申领单号',minwidth:80},
		{field:"categoryManagementPKDisplay",title:'类目',minwidth:80},
        {field:"itemsApplyDeptCodeDisplay",title:'申领部门',minwidth:100},
        {field:"applyPersonDisplay",title:'申领人',minwidth:80},
        {field:"iamCheckFlagDisplay",title:'单据状态',minwidth:80},
        {field:"itemsIssueListerDisplay",title:'发放人',minwidth:80},
        {field:"itemsIssueDate",title:'发放日期',minwidth:100},
        {field:"itemsApplyRemark",title:'备注',minwidth:160}
	]];
	 
	 var dataGridOptions ={checkbox:false};
	 var customOptions = {tableID:'id_table_grid',classID:'ItemsApplyManagementBO',methodID:'getListForPageItemStatus',columns:_columns,sortInfo:_sortInfo,
			 orgField:"orgCode",customQCFunc:setCustomQueryCondition};	 
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

//发放
function issueone(pk,categoryPk,categoryName){
	location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/issuemange/editissueitem.jsp?pk='+pk+'&categoryPk='+categoryPk+'&business='+STR_REGISTER_ADDNEW;
}

/**
 * 查看
 **/
function viewone(pk){
	top.layer.open({
		type:2,
		title:'查看物品发放信息 ',
		shift:1,
		closeBtn :2,
		area:['1024px','600px'],
		shade:false,
		zIndex:'2015', 
		success:function(layero){
	   		top.layer.setTop(layero); 
		},
		content:contextPath+'/sys/basemodules/lowvalueitemsmanagement/applymanage/applyregister/viewapplyregister.jsp?pk='+pk+'&business='+STR_VIEW
	});
}

function getCheckStatus(){
	var checkedQc = new Object();
	checkedQc.fn = '';
	checkedQc.oper = 14;
	var checkStatusDisplay=$('#checkStatusDisplay').combobox('getValue');
	if (checkStatusDisplay != '' && checkStatusDisplay != '全部') {
		checkedQc.value1 = "((iamCheckFlag = '"+checkStatusDisplay+"'))";
	} else {
		checkedQc.value1 = "(1=1)";
	}
    return checkedQc;
}
//设置状态下拉
function setCheckStatus(){
	//设置状态选择下拉框

	$("#checkStatusDisplay").combobox({
		valueField: 'value',
		textField: 'text',
		data:[
		   {
			'value':"全部",
			'text':'全部'
			},
			{
				'value':"FSCCQWPFS_002",
				'text':'待发放'
			},{
				'value':"FSCCQWPFS_004",
				'text':'已发放'
			},{
				'value':'FSCCQWPFS_003',
				'text':'采购中'
			}],
		width:140,
		editable:false
	});
};

//自定义查询条件
function setCustomQueryCondition() {
	var customQCArr = new Array();
	//物品发放条件
	var Qc = new Object();
	Qc.fn = 'ItemsApplyFlag';
	Qc.oper = ARY_STR_EQUAL[0];
	Qc.value1 = 'WPSLZT_004';//已审批通过
	customQCArr.push(Qc);
    return customQCArr;
}
