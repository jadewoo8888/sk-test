var mainObj = new Object();
var approvalBusiType = "SPYWLX_015";//物品申领审批路径
//var approvalModule;
//var approvalRole;
//加载完成执行 
$(function(){
	initAppend(); 		//加载附件页面
	getInfo();				//获取信息 
	initDataGrid();
	buttonBind();
});

//按钮事件 
function buttonBind(){
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
			{field:"ipDName",title:'物品名称',minwidth:80},
	        {field:"ipDType",title:'类别编码',minwidth:80,hidden:true},
	        {field:"ipDTypeDisplay",title:'类别',minwidth:80},
	        {field:"ipDSpecification",title:'规格型号',minwidth:80},
			{field:"ipDMetricUnit",title:'单位',minwidth:80},
			{field:"ipDApplyCount",title:'申购数量',minwidth:80},
			{field:"ipDApproveCount",title:'行装科领导审核数量',minwidth:80,editor:{ type:'numberbox',options:{min:0},align:'right',fmType:'int'}}
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
	}
	//编辑单元格的宽带会被框架样式（审批的样式）覆盖，这里处理覆盖的样式
	var width = $("td[field=ipDApproveCount]").children("div.datagrid-cell")[0].clientWidth;
	var cssWidth = 'width:'+width+'px!important;';
	$(".datagrid-cell-c1-ipDApproveCount").css("cssText",cssWidth);
}

//自定义查询条件
function setCustomQueryCondition() {
	var customQCArr = new Array();
	//采购申请条件
	var mpkQc = new Object();
	mpkQc.fn = 'ipDItemsPurchasePK';
	mpkQc.oper = ARY_STR_EQUAL[0];
	mpkQc.value1 = pk;
	customQCArr.push(mpkQc);
	//采购数量大于0
	var appCountQc = new Object();
	appCountQc.fn = 'ipDApplyCount';
	appCountQc.oper = ARY_STR_NOTEQUAL[0];
	appCountQc.value1 = '0';
	customQCArr.push(appCountQc);
    return customQCArr;
}

//获取信息 
function getInfo(){
	Ajax.service('ItemsPurchaseBO','findById',[pk],
			function(obj){
				mainObj = obj;
				//数据填充 
	      	 	dataFill(obj);
				
	      		//审批数据初始化
	      	 	setApprovalOption();
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

/*function getApprovalRoleFn() {
	approvalRole = approvalModule.curNodeInfo.node.approvalRole;
}*/
//审批数据初始化
function setApprovalOption() {
	var apprvalOption = {
		//getApprovalSuccFunc:getApprovalRoleFn,
		funcType:"DrawApprovalBar", 
		approvalBarDivID:"id_div_approvaloption", 
		approvalButtonBarDivID:"id_span_buttonArea", 
		isReadonly:false, 
		busiDeptCode:mainObj.ipDeptCode, 
		busiType:approvalBusiType, 
		busiPK:mainObj.pk, 
		busiOrgCode:mainObj.ipOrgCode, 
		menuId:"MENU_10_03_02", 
		approvalFunc:approvalsave,
		validateFunc:function(){
			$("#tabs").tabs("select",2);
			return true;
		},
		busiDefaultValue:{
			linker:top.strUserName,
			operator:top.strUserName,
			auditer:top.strUserName,
			checker:top.strUserName
		}
	};
	var approvalModule = new ApprovalModule(apprvalOption);
	$("#tabs").tabs({
		onSelect:function(title,index){
			//切换标签时改变校验信息的显示/隐藏
			if(index==2){
				$("body").find(".validatebox-tip-content").css("display","block");
				$("body").find(".validatebox-tip-content").next().css("display","block");
			}else{
				$("body").find(".validatebox-tip-content").css("display","none");
				$("body").find(".validatebox-tip-content").next().css("display","none");
			}
		}
	});
}

//审批操作
function approvalsave(type,data){
	var approvalPurchaseDetail = packageApprovalPurchaseDetail();
	
	$('body').addLoading({msg:'正在保存数据，请等待...'});			    //打开遮挡层
	Ajax.service(
 			'ItemsPurchaseBO',
 			'approvalItemsPurchase', 
 			[mainObj,data,getAppendData(),type,approvalPurchaseDetail],
 			function(data){		
				var tips = "保存信息成功！";
				if(data != null && type != "1"){
					var nextOrgName = data.nextOrgCodeDisplay;//新生成的审批信息的审批单位名称
					var nextSysOrgCode = data.nextOrgCode;//新生成的审批信息的审批单位
					var Name = data.itemName;//审批栏名称
					var applyStatus = data.applyStatus;//申请单状态
					var approvalStatus = data.approvalStatus;//审批状态
					
					if(applyStatus == "审批中"){//审批中，提示信息
						if(top.strFilterOrgCode == nextSysOrgCode){//审批时，如果下一个审批单位跟当前审批单位不是同一个单位时，提示：上报后将提交到XX审核；
							tips = "上报后将提交到'"+nextOrgName+"'审核";
						}else{//审批时，如果下一个审批单位跟当前审批单位是同一个单位时，提示：上报后将提交到“审批栏名称”；
							tips = "上报后将提交到'"+ Name+"'";
						}
					}else if(applyStatus == "已审批通过"){//审批结束 1、退回到申请人 2、审批结束
						strTips="申请单审批结束";
					}else{
						strTips="审批成功";
					}
				}
 				top.layer.alert(tips,{closeBtn :2,icon:6});
	    		$('body').removeLoading();     // 关闭遮挡层
	    		history.go(-2);

 			},function(){
				$("body").removeLoading();
				top.layer.alert('审批操作出问题了，请联系管理员。',{closeBtn :2,icon:5});
 			}
 	  );
}

/**
 * 打包采购明细
 * @returns {Array}
 */
function packageApprovalPurchaseDetail() {
	var row = datagrid.dataGridObj.datagrid('getRows');
	var rowLen = row.length;
    var rowsData = new Array();
    for(var i=0;i<rowLen;i++) {
		var editors = datagrid.dataGridObj.datagrid('getEditors', i);	
	 	
	 	var itemsPurchaseDetail = new Object();
	 	itemsPurchaseDetail.pk = row[i].pk;
	 	itemsPurchaseDetail.ipDApproveCount = editors[0].target.numberbox('getValue');
   		rowsData.push(itemsPurchaseDetail);
	}
    return rowsData;
}
/**
 * 设置附件
 **/
/*function setAppenFrame() {    
	var appendFrameObj = document.getElementById('id_iframe_append');
	appendFrameObj.src = contextPath+'/core/componentmodule/upload/listCommonUpload.jsp?busitype=TYYWLX_026&controltype='+STR_VIEW+'&businesscode='+pk;
}
*//** 
 * 获取附件数据
 **//*
function getAppendData() {
	var appendFrameObj = document.getElementById('id_iframe_append').contentWindow;
	var appendData = appendFrameObj.getAppendData();
	return appendData;
}*/

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