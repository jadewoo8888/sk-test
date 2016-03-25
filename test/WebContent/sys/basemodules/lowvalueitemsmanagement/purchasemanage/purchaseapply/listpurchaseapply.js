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
	initCategoryCombo();
	initDeptBox();
	
});


/**
 * 初始化表格信息
 **/
function initDataGrid() {
	 var _sortInfo = {"sortPK" : "pk","sortSql" : "lastestUpdate Desc"};
	//注：只有单据状态是“未提交”的才有【修改】、【删除】、【上报】操作；只有审批通过并且未入库的单据才有【入库前修改】、【入库】操作；所有状态的记录都有【查看】操作。
	//入库数量合计<采购数量合计即表示未入库
	 var _columns =  
	 [[
	 	{field:'option',title:'操作',minwidth:200,formatter:function(value,row,index){
	 		var html = "<a class='table_a_css' href='javascript:viewone(\""+row.pk+"\",\""+row.ipCategoryPKDisplay+"\")' >查看</a>";
			if (row.ipApprovalFlag == 'WPSLZT_001') {
				html += "<a href='javascript:void(0);' onclick='modifyone(\""+row.pk+"\",\""+row.ipCategoryPK+"\",\""+row.ipCategoryPKDisplay+"\")' >修改</a>";
				html += "<a class='table_a_css' href='javascript:deleteone(\""+row.pk+"\")' >删除</a>";
				html += "<a href='javascript:void(0);' onclick='reportone(\""+row.pk+"\")' >上报</a>  ";
			}
			if (row.ipApprovalFlag == 'WPSLZT_004' && (row.ipPurchaseCountSum == 0 || row.ipStoreCountSum  < row.ipPurchaseCountSum)) {
				html += "<a href='javascript:void(0);' onclick='modifyPushStore(\""+row.pk+"\",\""+row.ipCategoryPK+"\",\""+row.ipCategoryPKDisplay+"\")' >入库前修改</a>";
				html += "<a href='javascript:void(0);' onclick='pushPurchaseStore(\""+row.pk+"\",\""+row.ipCategoryPKDisplay+"\")' >入库</a>";
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
	 
	 var dataGridOptions ={checkbox:true};
	 var customOptions = {tableID:'id_table_grid',classID:'ItemsPurchaseBO',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition,
			 orgField:"ipOrgCode",deptField:'ipDeptCode'};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}

/**
 * 显示弹出类目列表窗口
 */
function showCategoryListLayer() {
	if(!judgeOpeCollectOrg()) {
		return;
	}
	Ajax.service(
		'CategoryManagementBO',
		'findCategoryByGroupCode', 
		[top.strUserGroupCode],
		showCategoryListSuccFunc
	);
}

/**
 * 类目列表窗口
 * @param result
 */
function showCategoryListSuccFunc(result) {
	
	var html = "";
	var len = result.length;
	for (var i = 0; i < len;i++) {
		html += '<div style="padding: 5px;text-align: center;"><input type="button" id="category'+i+'" class="bt_list_function" value="'+result[i].categoryName+'" onclick="toPurchaseapplyPage(\''+result[i].pk+'\',\''+result[i].categoryName+'\');"/></div>';
	}
	//页面层
	layer.open({
		title:'选择类目',
	    type: 1,
	    //skin: 'layui-layer-rim', //加上边框
	    area: ['180px', '220px'], //宽高
	    content: html
	});
	
	/*top.layer.open({//这种窗口与框架的一致，但onclick找不到toPurchaseapplyPage方法。
	title:'选择类目',
    type: 1,
    closeBtn :2,
   // skin: 'layui-layer-rim', //加上边框
    area: ['180px', '220px'], //宽高
    content: html
});*/
};

/**
 * 跳转采购申请页面
 * @param pk
 * @param categoryName
 */
function toPurchaseapplyPage(pk,categoryName) {
	location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/purchasemanage/purchaseapply/editpurchaseapply.jsp?categoryPk='+pk+'&categoryName='+categoryName+'&business='+STR_REGISTER_ADDNEW;
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

//修改
function modifyone(pk,categoryPk,categoryName){
	if(!judgeOpeCollectOrg()) {
		return;
	}
	location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/purchasemanage/purchaseapply/editpurchaseapply.jsp?pk='+pk+'&categoryPk='+categoryPk+'&categoryName='+categoryName+'&business='+STR_REGISTER_MODIFY;

}

//入库前修改
function modifyPushStore(pk,categoryPk,categoryName){
	if(!judgeOpeCollectOrg()) {
		return;
	}
	location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/purchasemanage/purchaseapply/editpurchasestore.jsp?pk='+pk+'&categoryPk='+categoryPk+'&categoryName='+categoryName+'&business='+STR_VIEW;
}

//入库
function pushPurchaseStore(pk,categoryName){
	if(!judgeOpeCollectOrg()) {
		return;
	}
	location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/purchasemanage/purchaseapply/pushpurchasestore.jsp?pk='+pk+'&categoryName='+categoryName+'&business='+STR_VIEW;
}
/**
 * 查看
 **/
function viewone(pk,categoryName){
	top.layer.open({
		type:2,
		title:'查看采购申请 ',
		shift:1,
		closeBtn :2,
		area:['900px','588px'],
		shade:false,
		zIndex:'2015', 
		success:function(layero){
	   		top.layer.setTop(layero); 
		},
		content:contextPath+'/sys/basemodules/lowvalueitemsmanagement/purchasemanage/purchaseapply/viewpurchaseapply.jsp?pk='+pk+'&categoryName='+categoryName
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
						'ItemsPurchaseBO',
						'deleteItemPurchase', 
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
		area:['320px','150px'],
		btn:['确定','取消'],
		content:'是否确认将申购单提交审批？',
		shift:1,
		closeBtn :2,
		yes: function(index){
				//一般设定yes回调，必须进行手工关闭

    	 		top.layer.close(index);	    	 		
				$('body').addLoading({msg:'正在上报，请等待...'});			  //打开遮挡层

				Ajax.service(
						'ItemsPurchaseBO',
						'upreportItemsPurchase', 
						 [pk],
						function(result){
							$('body').removeLoading();     // 关闭遮挡层

							
							if(result!=null&&result!=""){		
								top.layer.alert(result,{icon: 5, closeBtn:2});
							}else{
								top.layer.alert('申请提交成功 ',{icon: 6, closeBtn:2});
						    	//刷新
						    	datagrid.query();
							}		
						}
					);		
		}
	});
}

/**
 * 状态选择下拉框
 */
function setItemStatus(){
	//设置状态选择下拉框
	$("#itemStatusDisplay").combobox({
		valueField: 'value',
		textField: 'text',
		data:[{
			'value':'',
			'text':'全部'
		},{
			'value':"WPSLZT_001",
			'text':'未审批'
		},{
			'value':"WPSLZT_002",
			'text':'待审批'
		},{
			'value':'WPSLZT_003',
			'text':'审批中'
		},{
			'value':'WPSLZT_004,WPSLZT_005',
			'text':'已审批'
		},{
			'value':'stored',
			'text':'已入库'
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
		checkedQc.value1 = "((ipApprovalFlag = '"+itemStatusDisplay+"'))";
	} else if (itemStatusDisplay == 'WPSLZT_004,WPSLZT_005'){
		checkedQc.value1 = "((ipApprovalFlag in ('WPSLZT_004','WPSLZT_005')))";
	} else if (itemStatusDisplay == 'stored'){
		checkedQc.value1 = "((ipStoreCountSum != 0 and ipStoreCountSum  >= ipPurchaseCountSum))";
	} else {
		checkedQc.value1 = "(1=1)";
	}
    return checkedQc;
}
//自定义查询条件
function setCustomQueryCondition() {
	var customQCArr = new Array();
	//申购人，只取本申购人的
	var QC1 = new Object();
	QC1.fn = "ipApplyPerson";
	QC1.oper = ARY_STR_EQUAL[0];
	QC1.value1 = top.strUserAccount;
	customQCArr.push(QC1);
	
	return customQCArr;
}

