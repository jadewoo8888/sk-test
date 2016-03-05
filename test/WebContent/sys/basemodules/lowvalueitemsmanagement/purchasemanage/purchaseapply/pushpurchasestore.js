//列表表格对象
var datagrid = null;
var approvalBusiType = "SPYWLX_015";//物品采购审批路径
var isIncludeAsset = false;
//加载完成执行 
$(function(){
	setAppenFrame(); 		//加载附件页面
	getInfo();				//获取信息 
	isIncludeAssetFn();
	//initDataGrid();
	initComBindFunc();
});

/**
 * 是否包含固定物品
 */
function isIncludeAssetFn() {
	Ajax.service(
			'ItemsPurchaseDetailBO',
			'getIpDetailLisByIPPK', 
			 [pk],
			function(data){
				for (var i = 0; i < data.length; i++) {
					if (data[i].ipDType == 'WPLB_002') {
						isIncludeAsset = true;
						$("#id_btn_storeing").hide();
						break;
					}
				}	
				initDataGrid();
			},function(){
				top.layer.alert('数据异常 ',{closeBtn :2,icon:5});
			}
		);
	
}
/**
 * 初始化表格信息
 **/
function initDataGrid() {
	
	 var _sortInfo = {"sortPK" : "pk","sortSql" : "lastestUpdate Desc"};
	 var _columns =  
		 //全部是低值品时只支持批量入库；包含固定资产时，只支持单类物品入库，并且不能重复入库
	 [[	{field:'option',title:'操作',minwidth:80,hidden:!isIncludeAsset,formatter:function(value,row,index){
		 var html = "";
		 //已入库数量小于采购数量时，显示[入库]按钮
		 if (row.ipDStoreCount < row.ipDPurchaseCount) {
	 		html += '<div><input type="button" id="id_'+row.pk+'" class="bt_ensure" value="入库" onclick="pushStore(\''+row.pk+'\',\''+row.ipDType+'\',\''+row.ipDItemManagePK+'\')"/></div>';
		 }
 			return html;
		}}, 
		{field:"ipDName",title:'物品名称',minwidth:80},
        {field:"ipDTypeDisplay",title:'类别',minwidth:80},
        {field:"ipDSpecification",title:'规格型号',minwidth:80},
		{field:"ipDMetricUnit",title:'单位',minwidth:80},
		{field:"ipDApplyCount",title:'申购数量',minwidth:80},
		{field:"ipDApproveCount",title:'行装科领导审核数量',minwidth:80},
		{field:"ipDPurchaseCount",title:'采购数量',minwidth:80},
		{field:"ipDStoreCount",title:'已入库数量',minwidth:80}
	]];
	 
	 var dataGridOptions ={rownumbers:false,checkbox:false,isQuery:true,pagination:false,height:'auto',onLoadSuccess:null};
	 
	 var customOptions = {tableID:'id_table_grid',classID:'ItemsPurchaseDetailBO',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}

/*function test(data) {
	var rows = data.rows;
	for (var i = 0; i < rows.length; i++) {
		if (rows[i].ipDType == 'WPLB_002') {
			isIncludeAsset = true;
			$("#id_"+rows[i].pk).hide();
			break;
		}
	}
}*/
//自定义查询条件
function setCustomQueryCondition() {
	var customQCArr = new Array();
	//采购申请条件
	var qc = new Object();
	qc.fn = 'ipDItemsPurchasePK';
	qc.oper = ARY_STR_EQUAL[0];
	qc.value1 = pk;
	customQCArr.push(qc);
	//采购数量大于0
	var appCountQc = new Object();
	appCountQc.fn = 'ipDApplyCount';
	appCountQc.oper = ARY_STR_GREATER[0];
	appCountQc.value1 = '0';
	customQCArr.push(appCountQc);
    return customQCArr;
}

//获取信息 
function getInfo(){
	Ajax.service('ItemsPurchaseBO','findById',[pk],
			function(obj){
				dataFill(obj);	
			},function(){
				top.layer.alert('数据异常 ',{closeBtn :2,icon:5});
			}
	);
}
//数据填充 
function dataFill(obj){
	$("#id_ipCategoryPK").val(categoryName);
	$("#id_ipDeptCode").val(obj.ipDeptCodeDisplay);
	$("#id_ipApplyPerson").val(obj.ipApplyPersonDisplay);
	$("#id_ipPurchaseDate").val(obj.ipPurchaseDate);
	$("#id_ipRemark").val(obj.ipRemark);
}

/**
 * 打包采购单明细
 * @returns {Array}
 */
function packageItemsPurchaseDetailData() {
	
	var row = datagrid.dataGridObj.datagrid('getRows');
	var rowLen = row.length;
    var rowsData = new Array();
    for(var i=0;i<rowLen;i++) {
	 	
	 	var itemsPurchaseDetail = new Object();
	 	itemsPurchaseDetail.ipDItemManagePK = row[i].pk;
	 	
   		rowsData.push(itemsPurchaseDetail);
	}
	return rowsData;
}

/**
 * 入库操作
 * @param itemsPurchaseDetaiPk
 * @param ipDType
 * @param ipDItemManagePK
 */
function pushStore(itemsPurchaseDetaiPk,ipDType,ipDItemManagePK) {
	if (ipDType == 'WPLB_002') {//单类固定资产入库
		getItemByPk(ipDItemManagePK,itemsPurchaseDetaiPk);
	} else {
		Ajax.service(//单类低值品入库
				'ItemsPurchaseDetailBO',
				'pushOneStore', 
				 [itemsPurchaseDetaiPk],
				function(result){
					$('body').removeLoading();     // 关闭遮挡层
					//$("#id_btn_save").attr("disabled", false); // 按钮可点击
					if(result!=null&&result!=""){		
						top.layer.alert(result,{icon: 5, closeBtn:2});
					}else{
						top.layer.alert('入库成功',{icon: 6, closeBtn:2});
						//history.go(-1);
						 window.location.reload();
					}		
				}
			);
	}
	
}

/** 
 * 根据编码获取物品信息
 **/
function getItemByPk(ipDItemManagePK,itemsPurchaseDetaiPk) {
	Ajax.service(
	  		'ItemManageBO',
	  		'findById', 
	  		[pk],
	  		function(obj){
	  			storage(obj.imAssetType,itemsPurchaseDetaiPk);
	  		},
	  		function(data){
	  			top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
	  		}
	  	);
}
/**
*	入库接口
*	assetRegAssetType:物品所属资产类别
*	purchaseDetailPK:采购明细pk
**/
function storage(assetRegAssetType,purchaseDetailPK){
	var url = top.contextPath + '/sys/basemodules/asset/assetregister/editAsset.jsp';
	Ajax.service(			
			'CardTemplateBO',
			'getCardTemplateByAssetType', 
			 [[assetRegAssetType]],
			function(cardcode){
				if(cardcode!="null"){
					window.location.href = url +'?business='+STR_REGISTER_ADDNEW+'&purchaseDetailPK='+purchaseDetailPK+'&cardcode='+cardcode.pk+'&cardname='+encodeURI(encodeURI(cardcode.cardName));					
				}else{
					top.layer.alert('模板丢失 ',{closeBtn :2,icon:5});					
				}
			}
	);
}

/**
 * 批量入库
 */
function batchPushStore() {
	var row = datagrid.dataGridObj.datagrid('getRows');
	var rowLen = row.length;
    var itemsPurchaseDetaiPkArr = new Array();
    for(var i=0;i<rowLen;i++) {
    	itemsPurchaseDetaiPkArr.push(row[i].pk);
    }
    
    Ajax.service(
			'ItemsPurchaseDetailBO',
			'batchPushStore', 
			 [itemsPurchaseDetaiPkArr],
			function(result){
				$('body').removeLoading();     // 关闭遮挡层
				//$("#id_btn_save").attr("disabled", false); // 按钮可点击
				if(result!=null&&result!=""){		
					top.layer.alert(result,{icon: 5, closeBtn:2});
				}else{
					top.layer.alert('批量入库成功',{icon: 6, closeBtn:2});
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
	$("#id_btn_storeing").click(function () {
		batchPushStore();
	});
	$("#id_bt_return").click(function(){
		history.go(-1);
		});
	
}