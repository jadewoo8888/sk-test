var mainObj = new Object();
var approvalBusiType = "SPYWLX_014";//物品申领审批路径
//加载完成执行 
$(function(){
	setAppenFrame(); 		//加载附件页面
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
		{field:"imName",title:'物品名称',minwidth:80},
        {field:"imTypeDisplay",title:'类别',minwidth:80},
        {field:"imSpecification",title:'规格型号',minwidth:80},
		{field:"imMetricUnit",title:'单位',minwidth:80},
		{field:"iamApplyCount",title:'申领数量',minwidth:80},
		{field:"iamListerCheckCount",title:'经办人审核数量',minwidth:80,formatter:function(value){if(value == '0') return ""}},
		{field:"iamLeaderCheckCount",title:'行装科领导审核数量',minwidth:80,formatter:function(value){if(value == '0') return ""}}
	]];
	 
	 var dataGridOptions ={rownumbers:false,checkbox:false,isQuery:true,pagination:false,height:'auto',onLoadSuccess:null};
	 
	 var customOptions = {tableID:'id_table_grid',classID:'ItemsApplyMDetailBO',columns:_columns,sortInfo:_sortInfo,customQCFunc:setCustomQueryCondition};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}

//自定义查询条件
function setCustomQueryCondition() {
	var customQCArr = new Array();
	//单位条件
	var itemsApplyQc = new Object();
	itemsApplyQc.fn = 'itemsApplyMPK';
	itemsApplyQc.oper = ARY_STR_EQUAL[0];
	itemsApplyQc.value1 = pk;
	customQCArr.push(itemsApplyQc);
    return customQCArr;
}

//获取信息 
function getInfo(){
	Ajax.service('ItemsApplyManagementBO','findById',[pk],
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
	$("#id_categoryManagementPK").val(obj.categoryName);
	$("#id_itemsApplyDeptCode").val(obj.itemsApplyDeptCodeDisplay);
	$("#id_applyPerson").val(obj.applyPersonDisplay);
	$("#id_itemsApplyDate").val(obj.itemsApplyDate);
	$("#id_itemsApplyRemark").val(obj.itemsApplyRemark);
}

//审批数据初始化
function setApprovalOption() {
	var apprvalOption = {
		funcType:"DrawApprovalBar", 
		approvalBarDivID:"id_div_approvaloption", 
		approvalButtonBarDivID:"id_span_buttonArea", 
		isReadonly:false, 
		busiDeptCode:mainObj.itemsApplyDeptCode, 
		busiType:approvalBusiType, 
		busiPK:mainObj.pk, 
		busiOrgCode:mainObj.orgCode, 
		menuId:"MENU_10_01_02", 
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
	var am = new ApprovalModule(apprvalOption);
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
	$('body').addLoading({msg:'正在保存数据，请等待...'});			    //打开遮挡层
	Ajax.service(
 			'ItemsApplyManagementBO',
 			'approvalItemsApply', 
 			[mainObj,data,getAppendData(),type],
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
 * 设置附件
 **/
function setAppenFrame() {    
	var appendFrameObj = document.getElementById('id_iframe_append');
	appendFrameObj.src = contextPath+'/core/componentmodule/upload/listCommonUpload.jsp?busitype=TYYWLX_024&controltype='+STR_VIEW+'&businesscode='+pk;
}
/** 
 * 获取附件数据
 **/
function getAppendData() {
	var appendFrameObj = document.getElementById('id_iframe_append').contentWindow;
	var appendData = appendFrameObj.getAppendData();
	return appendData;
}