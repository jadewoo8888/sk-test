/**
 * 
 */
//列表表格对象
var datagrid = null;

/**
 * 初始化方法
 **/ 
$(function () { 
	setItemStatus();
	initDataGrid();
	initComBindFunc(); 
	getCategoryComboboxData();
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
			if (row.itemsApplyFlag == 'WPSLZT_001') {
				html += "<a href='javascript:void(0);' onclick='modifyone(\""+row.pk+"\",\""+row.categoryManagementPK+"\")' >修改</a>";
				html += "<a class='table_a_css' href='javascript:deleteone(\""+row.pk+"\")' >删除</a>";
				html += "<a href='javascript:void(0);' onclick='reportone(\""+row.pk+"\")' >上报</a>  ";
			}
 			return html;
		}}, 
		//{field:"pk",title:'主键',minwidth:200, hidden:true},
		{field:"itemsApplyCode",title:'申领单号',minwidth:80},
		{field:"categoryManagementPKDisplay",title:'类目',minwidth:80},
        {field:"itemsApplyDeptCodeDisplay",title:'申领部门',minwidth:100},
        {field:"applyPersonDisplay",title:'申领人',minwidth:80},
        {field:"itemStatusDisplay",title:'单据状态',minwidth:80},
        {field:"itemsIssueListerDisplay",title:'发放人',minwidth:80},
        {field:"itemsIssueDate",title:'发放日期',minwidth:100},
        {field:"itemsApplyRemark",title:'备注',minwidth:160}
	]];
	 
	 var dataGridOptions ={checkbox:true};
	 var customOptions = {tableID:'id_table_grid',classID:'ItemsApplyManagementBO',methodID:'getListForPageItemStatus',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition,
			 orgField:"orgCode",deptField:'itemsApplyDeptCode'};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}

function showCategoryListLayer() {
	if(!judgeOpeCollectOrg()) {
		return;
	}
	Ajax.service(
		'CategoryManagementBO',
		'findAll', 
		[],
		showCategoryListSuccFunc
	);
}

function showCategoryListSuccFunc(result) {
	
	var html = "";
	var len = result.length;
	for (var i = 0; i < len;i++) {
		html += '<div style="padding: 5px;text-align: center;"><input type="button" id="category'+i+'" class="bt_list_function" value="'+result[i].categoryName+'" onclick="toAddApplyPage(\''+result[i].pk+'\',\''+result[i].categoryName+'\');"/></div>';
	}
	//页面层
	layer.open({
		title:'选择类目',
	    type: 1,
	    skin: 'layui-layer-rim', //加上边框
	    area: ['180px', '220px'], //宽高
	    content: html
	});
};

function toAddApplyPage(pk,categoryName) {
	location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/applymanage/applyregister/editapplyregister.jsp?categoryPk='+pk+'&categoryName='+categoryName+'&business='+STR_REGISTER_ADDNEW;
};

/**
 * 为页面上的组件添加事件处理方法
 **/
function initComBindFunc() {
	$("#id_btn_addnew").click(function () {
		//addone();
		showCategoryListLayer();
		
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

//修改
function modifyone(pk,categoryPk){
	if(!judgeOpeCollectOrg()) {
		return;
	}
	location.href='editapplyregister.jsp?pk='+pk+'&categoryPk='+categoryPk+'&business='+STR_REGISTER_MODIFY;

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

//删除 
function deleteone(pk){
	if(!judgeOpeCollectOrg()) {
		return;
	}
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
						'ItemsApplyManagementBO',
						'deleteItemApply', 
						 [pk],
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

//上报 
function reportone(pk){
	if(!judgeOpeCollectOrg()) {
		return;
	}
	top.layer.open({
		title:'提示 ',
		icon: 3,
		area:['250px','150px'],
		btn:['确定','取消'],
		content:'确定上报吗？',
		shift:1,
		closeBtn :2,
		yes: function(index){
				//一般设定yes回调，必须进行手工关闭

    	 		top.layer.close(index);	    	 		
				$('body').addLoading({msg:'正在上报，请等待...'});			  //打开遮挡层

				Ajax.service(
						'ItemsApplyManagementBO',
						'upreportItemsApply', 
						 [pk],
						function(result){
							$('body').removeLoading();     // 关闭遮挡层

							
							if(result!=null&&result!=""){		
								top.layer.alert(result,{icon: 5, closeBtn:2});
							}else{
								top.layer.alert('上报 成功 ',{icon: 6, closeBtn:2});
						    	//刷新
						    	datagrid.query();
							}		
						}
					);		
		}
	});
}

function setItemStatus(){
	//设置状态选择下拉框
	$("#itemStatusDisplay").combobox({
		valueField: 'value',
		textField: 'text',
		data:[{
			'value':"WPSLZT_001",
			'text':'未上报'
		},{
			'value':"WPSLZT_002",
			'text':'已上报'
		},{
			'value':'WPSLZT_003',
			'text':'审批中'
		},{
			'value':'FSCCQWPFS_001',
			'text':'已审批'
		},{
			'value':'FSCCQWPFS_003',
			'text':'采购中'
		},{
			'value':'FSCCQWPFS_002',
			'text':'待发放'
		},{
			'value':'FSCCQWPFS_004',
			'text':'已发放'
		}],
		width:140,
		editable:false
	});
}

function getItemStatus() {
	var checkedQc = new Object();
	checkedQc.fn = '';
	checkedQc.oper = 14;
	var itemStatusDisplay=$('#itemStatusDisplay').combobox('getValue');
	
	if (itemStatusDisplay == 'WPSLZT_001' || itemStatusDisplay == 'WPSLZT_002' || itemStatusDisplay == 'WPSLZT_003') {
		checkedQc.value1 = "((itemsApplyFlag = '"+itemStatusDisplay+"'))";
	} else if (itemStatusDisplay == 'FSCCQWPFS_001' || itemStatusDisplay == 'FSCCQWPFS_002' || itemStatusDisplay == 'FSCCQWPFS_003' || itemStatusDisplay == 'FSCCQWPFS_004'){
		checkedQc.value1 = "((iamCheckFlag  = '"+itemStatusDisplay+"'))";
	} else {
		checkedQc.value1 = "(1=1)";
	}
    return checkedQc;
}
//自定义查询条件
function setCustomQueryCondition() {
	var customQCArr = new Array();
	
	var QC1 = new Object();
	QC1.fn = "applyPerson";
	QC1.oper = ARY_STR_EQUAL[0];
	QC1.value1 = top.strUserAccount;
	customQCArr.push(QC1);
	
	return customQCArr;
}

/*function setCustomQueryCondition() {
	var customQCArr = new Array();
	//审批人条件
	orgQc = new Object();
	orgQc.fn = '';
	orgQc.oper = ARY_STR_NULLOPER[0];
	orgQc.value1 = 'AllowApprPerson like \'%|'+ top.strUserAccount +'|%\' or Linkers like \'%|'+ top.strUserAccount +'|%\'';
	customQCArr.push(orgQc);
	
    return customQCArr;
}*/
