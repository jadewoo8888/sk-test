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
	 		var html = "<a class='table_a_css' href='javascript:viewone(\""+row.pk+"\",\""+row.ipCategoryPKDisplay+"\")' >查看</a>";
	 		//审批按钮,状态为待审批or审批中，且审批人中包含当前用户时显示
			if ((row.ipApprovalFlag == 'WPSLZT_002' || row.ipApprovalFlag == 'WPSLZT_003') && row.allowApprPerson.indexOf('|'+ top.strUserAccount +'|')!=-1) {
				html += "<a href='javascript:void(0);' onclick='approval(\""+row.pk+"\",\""+row.categoryManagementPK+"\",\""+row.ipCategoryPKDisplay+"\")' >审批</a>  ";
			}
 			return html;
		}},
		
		//{field:"pk",title:'主键',minwidth:200, hidden:true},
		{field:"ipCode",title:'申购单号',minwidth:80},
		{field:"ipCategoryPKDisplay",title:'类目',minwidth:80},
        {field:"ipDeptCodeDisplay",title:'申领部门',minwidth:100},
        {field:"ipApplyPerson",title:'申购人',minwidth:80},
        {field:"ipApprovalFlagDisplay",title:'单据状态',minwidth:80},
        {field:"ipPurchaseDate",title:'申购日期',minwidth:80},
        {field:"ipPurchaseCountSum",title:'采购数量合计',minwidth:100},
        {field:"ipStoreCountSum",title:'入库数量合计',minwidth:100},
        {field:"ipRemark",title:'备注',minwidth:160}
	]];
	 
	 var dataGridOptions ={checkbox:false};
	 var dataGridOptions ={checkbox:true};
	 var customOptions = {tableID:'id_table_grid',classID:'ItemsPurchaseBO',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition,
			 orgField:"ipOrgCode",deptField:'ipDeptCode'};	 
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
		prompt:'申领部门',
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
/**
 * 类目下拉框
 */
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

//审批
function approval(pk,categoryPk,categoryName){
	location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/purchasemanage/purchaseapprove/editpurchaseapprove.jsp?pk='+pk+'&categoryPk='+categoryPk+'&categoryName='+categoryName+'&business='+STR_REGISTER_MODIFY;
}

/**
 * 查看
 **/
function viewone(pk,categoryName){
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
		content:contextPath+'/sys/basemodules/lowvalueitemsmanagement/purchasemanage/purchaseapprove/viewpurchaseapprove.jsp?pk='+pk+'&categoryName='+categoryName
	});
}
/**
 * 状态选择下拉框
 */
function setItemStatus(){
	 //申请单状态 查询条件控件初始化
	 $("#ipApprovalFlag").combobox({
		 data:[
			{classifyCode:'WPSLZT_001',classifyName:'全部'},
		 	{classifyCode:'WPSLZT_002,WPSLZT_003',classifyName:'待审批'},
		 	{classifyCode:'WPSLZT_001,WPSLZT_002,WPSLZT_003',classifyName:'已审批'}
		 ],
		 onSelect:function(data){
		 	if(data.classifyName == "待审批"){
		 		$("#ipApprovalFlag").attr('qc',"{fn:'ipApprovalFlag',oper:'"+ARY_STR_INCLUDE[0]+"'}");
		 	}else if(data.classifyName == "已审批"){
		 		$("#ipApprovalFlag").attr('qc',"{fn:'ipApprovalFlag',oper:'"+ARY_STR_NOTINCLUDE[0]+"'}");
		 	}else if(data.classifyName == "全部"){
		 		$("#ipApprovalFlag").attr('qc',"{fn:'ipApprovalFlag',oper:'"+ARY_STR_NOTEQUAL[0]+"'}");
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
	orgQc.value1 = '(AllowApprPerson like \'%|'+ top.strUserAccount +'|%\' or linkers like \'%|'+ top.strUserAccount +'|%\')  and ipApprovalFlag!=\'WPSLZT_001\'';
	customQCArr.push(orgQc);
	
    return customQCArr;
}
