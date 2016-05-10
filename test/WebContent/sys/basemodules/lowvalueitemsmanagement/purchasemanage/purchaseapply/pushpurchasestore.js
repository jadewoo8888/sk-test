//列表表格对象
var datagrid = null;
var approvalBusiType = "SPYWLX_015";//物品采购审批路径
var isIncludeAsset = false;//是否包含固定资产

var auditRoleName = '';//审核角色名称
var checkRoleName = '';//核准角色名称

//加载完成执行 
$(function(){
	initAppend();//加载附件页面
	getInfo();				//获取信息 
	//isIncludeAssetFn();
	initComBindFunc();
	getCategoryByPk(ipCategoryPK);
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
        {field:"ipDTypeDisplay",title:'类别',minwidth:60},
        {field:"ipDSpecification",title:'规格型号',minwidth:60},
		{field:"ipDMetricUnit",title:'单位',minwidth:50},
		{field:"ipDApplyCount",title:'申购数量',minwidth:60},
		{field:"ipDApproveCount",title:checkRoleName+'数量',minwidth:120},
		{field:"ipDPurchaseCount",title:'采购数量',minwidth:60},
		{field:"ipDStoreCount",title:'已入库数量',minwidth:80}
	]];
	 
	 var dataGridOptions ={rownumbers:false,checkbox:false,isQuery:true,pagination:false,height:'auto',width:690,onLoadSuccess:null};
	 
	 var customOptions = {tableID:'id_table_grid',classID:'ItemsPurchaseDetailBO',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
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
	//采购数量大于0
	var appCountQc = new Object();
	appCountQc.fn = 'ipDApplyCount';
	appCountQc.oper = ARY_STR_GREATER[0];
	appCountQc.value1 = '0';
	customQCArr.push(appCountQc);
    return customQCArr;
}
//获取类目
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
			},function(){
				top.layer.alert('数据异常 ',{closeBtn :2,icon:5});
			}
	);
}
//数据填充 
function dataFill(obj){
	$("#id_ipDeptCode").val(obj.ipDeptCodeDisplay);
	$("#id_ipApplyPerson").val(obj.ipApplyPersonDisplay);
	$("#id_ipPurchaseDate").val(obj.ipPurchaseDate);
	$("#id_ipRemark").val(obj.ipRemark);
	
	getApproveRoleName(obj.ipOrgCode);
}

/**
 * 获取审批路径名称
 */
function getApproveRoleName(ipOrgCode) {
	Ajax.service(
				'InApprovalProcessBO',
				 'getApprovalRole',
				[approvalBusiType,ipOrgCode],			
			function(data){
					if (data != null & data.length > 0) {
						auditRoleName = data[0];//审核角色名称
						checkRoleName = data[1];//核准角色名称
					}
					isIncludeAssetFn();
			  },
			function(){
				  top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
			}
		);

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
		pushOneAssetStore(ipDItemManagePK,itemsPurchaseDetaiPk);
	} else {
		pushOneStore(itemsPurchaseDetaiPk);
	}
	
}
/**
 * 单个低值品物品入库
 * @param itemsPurchaseDetaiPk
 */
function pushOneStore(itemsPurchaseDetaiPk) {
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
};


/** 
 * 单类固定资产入库
 * 说明：入库后的更新数据由系统集成的固定资产入库功能去调用java接口：
 * ItemsPurchaseDetailBO类的pushOneAssetStore_log_trans(String itemsPurchaseDetailPk, int assetCount)
 **/
function pushOneAssetStore(ipDItemManagePK,itemsPurchaseDetaiPk) {
	Ajax.service(
	  		'ItemManageBO',
	  		'findById', 
	  		[ipDItemManagePK],
	  		function(obj){
	  			storage(obj.imAssetType.split(','),itemsPurchaseDetaiPk);
	  		},
	  		function(data){
	  			top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
	  		}
	  	);
}
/**
*	入库接口（框架提供的）
*	assetRegAssetType:物品所属资产类别
*	purchaseDetailPK:采购明细pk
**/
function storage(assetRegAssetType,purchaseDetailPK){
	var url = top.contextPath + '/sys/basemodules/asset/assetregister/editAsset.jsp';
	Ajax.service(			
			'CardTemplateBO',
			'getCardTemplateByAssetType', 
			 [assetRegAssetType],
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
	
	$("#id_btn_storeing").attr("disabled", true);
	top.layer.open({
		title:'保存物品入库信息',
		icon: 3,
		area:['300px','150px'],
		btn:['确定', '取消'],
		content:'你确定要入库吗？',
		shift:1,
		closeBtn :2,
		yes: function(index){
				$('body').addLoading({msg:'正在保存数据，请等待...'});			    //打开遮挡层		
				
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
							$("#id_btn_storeing").attr("disabled", false); // 按钮可点击
							if(result!=null&&result!=""){		
								top.layer.alert(result,{icon: 5, closeBtn:2});
							}else{
								top.layer.alert('批量入库成功',{icon: 6, closeBtn:2});
								history.go(-1);
							}		
						}
					);
				
	    		top.layer.close(index);	//一般设定yes回调，必须进行手工关闭

	    },
	    cancel: function(index){
			$("#id_btn_storeing").attr("disabled", false);
		}
	});	
	
}

/**
 * 设置附件
 **/
function initAppend() {
	var opt = {controlType:business,businessCode:pk,businessType:'TYYWLX_026'};
	$('#id_div_appendarea').commonupload(opt);
}

/** 
 * 获取附件数据
 **/
function getAppendData() {
	var appendData = null;
	if($('#id_div_appendarea').data()) {
		appendData = $('#id_div_appendarea').data().getAppendData();
	}
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