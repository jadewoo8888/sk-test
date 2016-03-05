//加载完成执行 
$(function(){
	setAppenFrame(); 		//加载附件页面
	getInfo();				//获取信息 
	initDataGrid();
	buttonBind();
});

//按钮事件 
function buttonBind(){
	$("#id_bt_issue").click(function () {
		issueFn();
	});
	$("#id_bt_purchase").click(function () {
		purchaseFn();
	});
	//返回页面
	$("#return").click(function(){history.go(-1);});
}
/**
 * 初始化表格信息
 **/
function initDataGrid() {
	
	 var _sortInfo = {"sortPK" : "pk","sortSql" : "lastestUpdate Desc"};
	 var _columns =  
	 [[
		{field:"imName",title:'物品名称',minwidth:80},
        {field:"imTypeDisplay",title:'类别',minwidth:80},
        {field:"imSpecification",title:'规格型号',minwidth:80},
		{field:"imMetricUnit",title:'单位',minwidth:80},
		{field:"iamApplyCount",title:'申领数量',minwidth:80},
		{field:"iamListerCheckCount",title:'经办人审核数量',minwidth:80},
		{field:"iamLeaderCheckCount",title:'行装科领导审核数量',minwidth:80},
		{field:"itemStoreCount",title:'库存',minwidth:80,formatter:function(value,row,index){
			if (value < row.iamLeaderCheckCount) {
				return '<span style="color: red">'+value+'</span>';
			} else {
				return value;
			}
		}}
	]];
	 
	 var dataGridOptions ={rownumbers:false,checkbox:false,isQuery:true,pagination:false,height:'auto',onLoadSuccess:ifShowIssueBtFn};
	 
	 var customOptions = {tableID:'id_table_grid',classID:'ItemsApplyMDetailBO',methodID:'getListForPage',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}

//自定义查询条件
function setCustomQueryCondition() {
	var customQCArr = new Array();
	//单位条件
	var mpkQc = new Object();
	mpkQc.fn = 'itemsApplyMPK';
	mpkQc.oper = ARY_STR_EQUAL[0];
	mpkQc.value1 = itemsApplyMPK;
	customQCArr.push(mpkQc);
	
	var appCountQc = new Object();
	appCountQc.fn = 'iamApplyCount';
	appCountQc.oper = ARY_STR_NOTEQUAL[0];
	appCountQc.value1 = '0';
	customQCArr.push(appCountQc);
	
    return customQCArr;
}
/**
 *根据条件显示发放或者采购
 */
function ifShowIssueBtFn() {
	var ifIssue = true;
	var row = datagrid.dataGridObj.datagrid('getRows');
	for (var i = 0; i < row.length; i++) {
		if (row[i].itemStoreCount < row[i].iamLeaderCheckCount) {
			ifIssue = false;
			break;
		}
	}
	
	if (ifIssue) {
		$('#id_bt_issue').show();
		$('#id_bt_purchase').hide();
	} else {
		$('#id_bt_issue').hide();
		$('#id_bt_purchase').show();
	}
}

//获取信息 
function getInfo(){
	Ajax.service('ItemsApplyManagementBO','findById',[itemsApplyMPK],
			function(obj){
				//数据填充 
	      	 	dataFill(obj);
				
			},function(){
				top.layer.alert('数据异常 ',{closeBtn :2,icon:5});
			}
	);
}
//数据填充 
function dataFill(obj){
	$("#id_categoryManagementPK").val(obj.categoryName);
	$("#id_itemsApplyDeptCode").val(obj.itemsApplyDeptCodeDisplay);
	$("#id_applyPerson").val(obj.applyPersonDisplay);
	$("#id_itemsApplyDate").val(obj.itemsApplyDate);
	$("#id_itemsApplyRemark").val(obj.itemsApplyRemark);
}

/**低值品发放**/
function issueFn() {
	
	var row = datagrid.dataGridObj.datagrid('getRows');
	var rowLen = row.length;
    var pkArr = new Array();
    for(var i=0;i<rowLen;i++) {
		var editors = datagrid.dataGridObj.datagrid('getEditors', i);	
		pkArr.push(row[i].pk);
	}
    //assetTypeFn();
   Ajax.service(
			'ItemsApplyMDetailBO',
			'issueItems', 
			 [itemsApplyMPK,pkArr],
			function(result){
				$('body').removeLoading();     // 关闭遮挡层
				//$("#id_btn_save").attr("disabled", false); // 按钮可点击
				if(result!=null&&result!=""){		
					top.layer.alert(result,{icon: 5, closeBtn:2});
				}else{
					top.layer.alert('发放成功',{icon: 6, closeBtn:2});
					history.go(-1);
				}		
			}
		);
}
//固定资产发放
function assetTypeFn() {
	
	openAssetSelect('mul','assetissue',itemsApplyMPK);
}

/**固定资产查询条件：1、使用人为空；2、类别为固定资产；3、本用户的机构编号**/
function setAssetComponentQC() {
var customQCArr = new Array();
	assetQc = new Object();
	assetQc.fn = '';
	assetQc.oper = ARY_STR_NULLOPER[0];
	assetQc.value1 = "(assetRegUserId IS NULL OR assetRegUserId='') AND (assetRegUser IS NULL OR assetRegUser='')  AND assetRegAssetType = 'WPLB_002' AND assetRegEnprCode = '"+top.strUserOrgCode+"'";
	customQCArr.push(assetQc);
    return customQCArr;
	
}

function updateAssetSelectedData(selectRowData) {debugger;
	alert(selectRowData)
}

/**申购**/
function purchaseFn() {
	//location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/purchasemanage/purchaseapply/editpurchaseapply.jsp?pk="+pk+"&categoryPk='+categoryPk+'&categoryName='+categoryName+'&business='+STR_REGISTER_ADDNEW;
	location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/purchasemanage/purchaseapply/editpurchaseapply.jsp?ipItemsApplyPK='+itemsApplyMPK+'&categoryPk='+categoryPk+'&categoryName='+categoryName+'&business=issuePurchaseOpr';
}
/**
 * 设置附件
 **/
function setAppenFrame() {    
	var appendFrameObj = document.getElementById('id_iframe_append');
	appendFrameObj.src = contextPath+'/core/componentmodule/upload/listCommonUpload.jsp?busitype=TYYWLX_024&controltype='+STR_VIEW+'&businesscode='+itemsApplyMPK;
}
/** 
 * 获取附件数据
 **/
function getAppendData() {
	var appendFrameObj = document.getElementById('id_iframe_append').contentWindow;
	var appendData = appendFrameObj.getAppendData();
	return appendData;
}