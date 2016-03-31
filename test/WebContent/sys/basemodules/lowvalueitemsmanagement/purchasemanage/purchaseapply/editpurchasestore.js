//列表表格对象
var datagrid = null;
var approvalBusiType = "SPYWLX_015";//物品采购审批路径
//加载完成执行 
$(function(){
	setAppenFrame(); 		//加载附件页面
	getInfo();				//获取信息 
	getCategoryByPk(categoryPk);
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
		{field:"ipDName",title:'物品名称',minwidth:80},
        {field:"ipDTypeDisplay",title:'类别',minwidth:80},
        {field:"ipDSpecification",title:'规格型号',minwidth:80},
		{field:"ipDMetricUnit",title:'单位',minwidth:80},
		{field:"ipDApplyCount",title:'申购数量',minwidth:80},
		{field:"ipDApproveCount",title:'行装科领导审核数量',minwidth:80},
		{field:"ipDPurchaseCount",title:'采购数量',minwidth:80,editor:{ type:'numberbox',options:{width:80,value:'1'},align:'right',fmType:'int'}}
	]];
	 
	 var dataGridOptions ={rownumbers:false,checkbox:false,isQuery:true,pagination:false,height:'auto',onLoadSuccess:initEditCell};
	 
	 var customOptions = {tableID:'id_table_grid',classID:'ItemsPurchaseDetailBO',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}
/**初始化编辑的单元格**/
function initEditCell(){
	var row = datagrid.dataGridObj.datagrid('getRows');
	var rowLen = row.length;
	for (var i = 0; i < rowLen; i++) {
		datagrid.dataGridObj.datagrid('beginEdit', i);
		var editors = datagrid.dataGridObj.datagrid('getEditors', i);
		if (row[i].ipDPurchaseCount == 0) {
			editors[0].target.numberbox('setValue',row[i].ipDApproveCount);
		}
	}
	//编辑单元格的宽带会被框架样式（审批的样式）覆盖，这里处理覆盖的样式
	var width = $("td[field=ipDPurchaseCount]").children("div.datagrid-cell")[0].clientWidth;
	var cssWidth = 'width:'+width+'px!important;';
	$(".datagrid-cell-c1-ipDPurchaseCount").css("cssText",cssWidth);
}

//自定义查询条件
function setCustomQueryCondition() {
	var customQCArr = new Array();
	//采购申请条件
	var qc = new Object();
	qc.fn = 'ipDItemsPurchasePK';
	qc.oper = ARY_STR_EQUAL[0];
	qc.value1 = pk;
	customQCArr.push(qc);
	//申购数量大于0
	var appCountQc = new Object();
	appCountQc.fn = 'ipDApplyCount';
	appCountQc.oper = ARY_STR_GREATER[0];
	appCountQc.value1 = '0';
	customQCArr.push(appCountQc);
    return customQCArr;
}

function getCategoryByPk(categoryPk) {
	
	Ajax.service(
	  		'CategoryManagementBO',
	  		'findById', 
	  		[categoryPk],
	  		function(obj){
	  			categoryName = obj.categoryName;
	  			$("#id_ipCategoryPK").val(categoryName);
	  		},
	  		function(data){
	  			top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
	  		}
	  	);
}


//获取信息 
function getInfo(){
	Ajax.service('ItemsPurchaseBO','findById',[pk],
			function(obj){
				dataFill(obj);	
				
				//初始化审批信息
				/*var apprvalOption = {
					funcType:"DrawApprovalBar", 
					approvalBarDivID:"id_div_approvaloption", 
					isReadonly:true, 
					busiDeptCode:obj.ipDeptCode, 
					busiType:approvalBusiType, 
					busiPK:obj.pk, 
					busiOrgCode:obj.ipOrgCode, 
					menuId:"MENU_10_03_01"
				};
				var am = new ApprovalModule(apprvalOption);*/
			},function(){
				top.layer.alert('数据异常 ',{closeBtn :2,icon:5});
			}
	);
}
//数据填充 
function dataFill(obj){
	//$("#id_ipCategoryPK").val(categoryName);
	$("#id_ipDeptCode").val(obj.ipDeptCodeDisplay);
	$("#id_ipApplyPerson").val(obj.ipApplyPersonDisplay);
	$("#id_ipPurchaseDate").val(obj.ipPurchaseDate);
	$("#id_ipRemark").val(obj.ipRemark);
}

/**
 * 打包采购明细
 * @returns {Array}
 */
function packageItemsPurchaseDetailData() {
	
	var row = datagrid.dataGridObj.datagrid('getRows');
	var rowLen = row.length;
    var rowsData = new Array();
    for(var i=0;i<rowLen;i++) {
		var editors = datagrid.dataGridObj.datagrid('getEditors', i);	
	 	
	 	var itemsPurchaseDetail = new Object();
	 	itemsPurchaseDetail.pk = row[i].pk;
	 	itemsPurchaseDetail.ipDPurchaseCount = editors[0].target.numberbox('getValue');
	 	
   		rowsData.push(itemsPurchaseDetail);
	}
	return rowsData;
}

/**
 * 保存采购明细（入库前修改）
 */
function save() {
	var purchaseDetailList = packageItemsPurchaseDetailData();
	
	Ajax.service(
			'ItemsPurchaseDetailBO',
			'modifyPurchaseCount', 
			 [purchaseDetailList,pk],
			function(result){
				$('body').removeLoading();     // 关闭遮挡层
				//$("#id_btn_save").attr("disabled", false); // 按钮可点击
				if(result!=null&&result!=""){		
					top.layer.alert(result,{icon: 5, closeBtn:2});
				}else{
					top.layer.alert('修改采购数量成功',{icon: 6, closeBtn:2});
					history.go(-1);
				}		
			}
		);
}
/**
 * 设置附件
 **/
function setAppenFrame() {    
	var appendFrameObj = document.getElementById('id_iframe_append');
	appendFrameObj.src = contextPath+'/core/componentmodule/upload/listCommonUpload.jsp?busitype=TYYWLX_026&controltype='+business+'&businesscode='+pk;
}
/** 
 * 获取附件数据
 **/
function getAppendData() {
	var appendFrameObj = document.getElementById('id_iframe_append').contentWindow;
	var appendData = appendFrameObj.getAppendData();
	return appendData;
}

/**
 * 为页面上的组件添加事件处理方法
 **/
function initComBindFunc() {
	$("#id_btn_save").click(function () {
		save();
	});
	$("#id_bt_return").click(function(){
		history.go(-1);
		});
	
}