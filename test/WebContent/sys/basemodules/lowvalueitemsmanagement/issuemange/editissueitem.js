var assetApplyItemAssetTypeArr = new Array();//固定资产类物品的资产类别编码数组
var assetApplyItemPkArr = new Array();//固定资产类物品PK数组
var assetRegAssetNoArr = new Array();//被选择了的固定资产编码数组
var assetRegAssetTypeQC = "";//固定资产查询条件:根据固定资产编码模糊查询 AND (assetRegAssetType like '固定资产编码1%' or assetRegAssetType like '固定资产编码2%' or assetRegAssetType like '固定资产编码3%')

var approvalBusiType = "SPYWLX_014";//物品申领审批路径
var auditRoleName = '';//审核角色名称
var checkRoleName = '';//核准角色名称

//加载完成执行 
$(function(){
	setAppenFrame(); 		//加载附件页面
	getInfo();				//获取信息 
	getApproveRoleName();
	//initDataGrid();
	buttonBind();
});

//按钮事件 
function buttonBind(){
	$("#id_bt_issue").click(function () {
		issueButtonOper();
	});
	$("#id_bt_purchase").click(function () {
		purchaseFn();
	});
	//返回页面
	$("#return").click(function(){history.go(-1);});
}

/**
 * 获取审批路径名称
 */
function getApproveRoleName() {
	Ajax.service(
				'InApprovalProcessBO',
				 'getApprovalRole',
				[approvalBusiType,top.strUserOrgCode],			
			function(data){
					if (data != null & data.length > 0) {
						auditRoleName = data[0];//审核角色名称
						checkRoleName = data[1];//核准角色名称
					}
					initDataGrid();
			  },
			function(){
				  top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
			}
		);

}

/**
 * 初始化表格信息
 **/
function initDataGrid() {
	
	 var _sortInfo = {"sortPK" : "pk","sortSql" : "lastestUpdate Desc"};
	 var _columns =  
	 [[
		{field:"imName",title:'物品名称',minwidth:100},
        {field:"imTypeDisplay",title:'类别',minwidth:60},
        {field:"imSpecification",title:'规格型号',minwidth:60},
		{field:"imMetricUnit",title:'单位',minwidth:40},
		{field:"iamApplyCount",title:'申领数量',minwidth:70},
		{field:"iamListerCheckCount",title:auditRoleName+'审核数量',minwidth:150},
		{field:"iamLeaderCheckCount",title:checkRoleName+'审核数量',minwidth:130},
		{field:"itemStoreCount",title:'库存',minwidth:40,formatter:function(value,row,index){
			if (value < row.iamLeaderCheckCount) {
				return '<span style="color: red">'+value+'</span>';
			} else {
				return value;
			}
		}}
	]];
	 
	 var dataGridOptions ={rownumbers:false,checkbox:false,isQuery:true,pagination:false,width:670,height:'auto',onLoadSuccess:ifShowIssueBtFn};
	 
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
 *根据条件显示发放或者申购
 */
function ifShowIssueBtFn() {
	var ifIssue = true;
	var row = datagrid.dataGridObj.datagrid('getRows');
	for (var i = 0; i < row.length; i++) {
		if (row[i].itemStoreCount < row[i].iamLeaderCheckCount) {//如果库存小于审核数量，则显示申购
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

/**
 * 
 * 打包申购单明细
 */
function packageItemsApplyMDetailData() {
	var row = datagrid.dataGridObj.datagrid('getRows');
	var rowLen = row.length;
    var rowsData = new Array();
    for(var i=0;i<rowLen;i++) {
		var editors = datagrid.dataGridObj.datagrid('getEditors', i);	
	 	
	 	var itemsApplyMDetail = new Object();
	 	itemsApplyMDetail.categoryManagementPK = categoryPk;
	 	itemsApplyMDetail.pk = row[i].pk;
	 	itemsApplyMDetail.imType = row[i].imType;
	 	itemsApplyMDetail.imAssetType = row[i].imAssetType;
   		rowsData.push(itemsApplyMDetail);
	}
	return rowsData;
}

/**物品发放**/
function issueItems() {
	var pkArr = new Array();
	var rowsData = packageItemsApplyMDetailData();
	for (var i = 0; i < rowsData.length; i++) {
		pkArr.push(rowsData[i].pk);
	}
	
	Ajax.service(
			'ItemsApplyMDetailBO',
			'issueItems', 
			 [itemsApplyMPK,top.strUserName,pkArr,assetRegAssetNoArr],
			function(result) {
				$('body').removeLoading();     // 关闭遮挡层
				$("#id_bt_issue").attr("disabled", false); // 按钮可点击
				if(result!=null&&result!=""){		
					top.layer.alert(result,{icon: 5, closeBtn:2});
				}else{
					top.layer.alert('发放成功',{icon: 6, closeBtn:2});
					history.go(-1);
				}		
			}
		);
}


/**发放按钮操作**/
function issueButtonOper() {
	
	$("#id_bt_issue").attr("disabled", true);// 按钮可点击
	top.layer.open({
		title:'物品发放',
		icon: 3,
		area:['300px','150px'],
		btn:['确定', '取消'],
		content:'你确定要发放物品吗？',
		shift:1,
		closeBtn :2,
		yes: function(index){
				$('body').addLoading({msg:'正在保存数据，请等待...'});			    //打开遮挡层		
				
				assetApplyItemAssetTypeArr.length = 0;//固定资产类物品的资产类别编码数组
				assetApplyItemPkArr.length = 0;//固定资产类物品PK数组
				assetRegAssetNoArr.length = 0;//被选择了的固定资产编码数组
				assetRegAssetTypeQC = "";//固定资产查询条件
				
				var rowsData = packageItemsApplyMDetailData();
				for (var i = 0; i < rowsData.length; i++) {
					if (rowsData[i].imType == 'WPLB_002') {//如果是固定资产
						assetApplyItemPkArr.push(rowsData[i].pk);//固定资产类物品PK数值
						assetApplyItemAssetTypeArr.push(rowsData[i].imAssetType);//固定资产类物品的资产类别编码
					}
				}
				
				showAssetSelPage();

	    },
	    cancel: function(index){
			$("#id_bt_issue").attr("disabled", false);
		}
	});	
	
	
}

//显示固定资产发放选择页面，如果有多少个固定资产就弹出多少个选择页面
function showAssetSelPage() {
	if (assetApplyItemPkArr.length > 0) {
		
		genAssetRegAssetTypeQC(assetApplyItemAssetTypeArr[0]);//拼接查询sql
		
		openAssetSelect('mul','assetissue',assetApplyItemPkArr[0]);//打开资产选择页面
	} else {//固定资产选择完成后，就调用后台，更新后台信息
		issueItems();
	}
	$('body').removeLoading();     // 关闭遮挡层
	$("#id_bt_issue").attr("disabled", false); // 按钮可点击
}
/**
 * 根据资产分类值拼接资产查询条件（框架提供的函数名）
 * @param imAssetTypeArrStr 资产分类值
 */
function genAssetRegAssetTypeQC(imAssetTypeArrStr) {
	assetRegAssetTypeQC = " AND (";
		
	var imAssetTypeArr = imAssetTypeArrStr.split(',');
	for (var i = 0; i < imAssetTypeArr.length; i++) {
		if (i != imAssetTypeArr.length - 1) {
			assetRegAssetTypeQC += "assetRegAssetType like '"+imAssetTypeArr[i]+"%' or ";
		} else {
			assetRegAssetTypeQC += "assetRegAssetType like '"+imAssetTypeArr[i]+"%'";
		}
	}
	
	assetRegAssetTypeQC +=") ";
}

/**
 * （框架提供的函数名）
 * 固定资产查询条件：1、使用人为空；2、固定资产编码；3、本用户的机构编号
 */
function setAssetSelectQC() {
var customQCArr = new Array();
	assetQc = new Object();
	assetQc.fn = '';
	assetQc.oper = ARY_STR_NULLOPER[0];
	assetQc.value1 = "(assetRegUserId IS NULL OR assetRegUserId='') AND (assetRegUser IS NULL OR assetRegUser='') "+assetRegAssetTypeQC+" AND assetRegEnprCode = '"+top.strUserOrgCode+"'";
	customQCArr.push(assetQc);
    return customQCArr;
	
}
/**
 *  选择资产分类后的回调函数
 * @param selectRowData
 */
function updateAssetSelectedData(selectRowData) {
	for (var i = 0; i < selectRowData.length; i++) {
		assetRegAssetNoArr.push(selectRowData[i].assetRegAssetNo);//把选择了的固定资产编码存放起来，以便更新
	}
	
	assetApplyItemAssetTypeArr.shift();//选择确定完成之后，就删除固定资产类物品的资产类别编码数组的当前值（即第一个元素）
	assetApplyItemPkArr.shift();//选择确定完成之后，就删除固定资产类物品的PK数组的当前值（即第一个元素）
	showAssetSelPage();//选择确定完成之后，接着显示第二个页面选择，直到所有固定资产类物品选择资产完成
}

/**申购**/
function purchaseFn() {
	location.href=contextPath+'/sys/basemodules/lowvalueitemsmanagement/purchasemanage/purchaseapply/editpurchaseapply.jsp?ipItemsApplyMPK='+itemsApplyMPK+'&categoryPk='+categoryPk+'&business=issuePurchaseOpr';
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