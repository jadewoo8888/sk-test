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
	getCategoryComboboxData();
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
			//if ((row.itemsApplyFlag == 'WPSLZT_002' || row.itemsApplyFlag == 'WPSLZT_003') && row.allowApprPerson.indexOf('|'+ top.strUserAccount +'|')!=-1) {
				html += "<a href='javascript:void(0);' onclick='approval(\""+row.pk+"\")' >审批</a>  ";
			//}
 			return html;
		}}, 
		//{field:"pk",title:'主键',minwidth:200, hidden:true},
		{field:"itemsApplyCode",title:'申领单号',minwidth:150},
		{field:"categoryManagementPKDisplay",title:'类目',minwidth:160},
        {field:"itemsApplyDeptCodeDisplay",title:'申领部门',minwidth:160},
        {field:"applyPersonDisplay",title:'申领人',minwidth:150},
        {field:"iamCheckFlagDisplay",title:'单据状态',minwidth:160},
        {field:"itemsIssueListerDisplay",title:'发放人',minwidth:160},
        {field:"itemsIssueDate",title:'发放日期',minwidth:150},
        {field:"itemsApplyRemark",title:'备注',minwidth:160}
	]];
	 var dataGridOptions ={};
	 var customOptions = {tableID:'id_table_grid',classID:'ItemsApplyManagementBO',columns:_columns,sortInfo:_sortInfo};
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

//审批
function approval(pk){
	location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/applymanage/applyapprove/editapplyapprove.jsp?pk='+pk+'&business='+STR_CHECK;
}

/**
 * 查看
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
		content:contextPath+'/sys/basemodules/lowvalueitemsmanagement/applymanage/applyregister/viewapplyregister.jsp?pk='+pk
	});
}

function getItemsApplyFlag() {
	var checkedQc = new Object();
	checkedQc.fn = '';
	checkedQc.oper = 14;
	var contratStatusDisplay=$('#itemsApplyFlag').combobox('getValue');
	
	if (contratStatusDisplay== '2'){
		checkedQc.value1 = "(ItemsApplyFlag = 'WPSLZT_001')";
	}else if(contratStatusDisplay== '3'){
		checkedQc.value1 = "(ItemsApplyFlag = 'WPSLZT_002')";
	}else if(contratStatusDisplay== '4'){
		checkedQc.value1 = "(ItemsApplyFlag = 'WPSLZT_003')";
	}else if(contratStatusDisplay== '5'){
		checkedQc.value1 = "(ItemsApplyFlag Not In ('WPSLZT_004','WPSLZT_005') )";
	}else{
		checkedQc.value1 = "(1=1)";
	}
    return checkedQc;
}
