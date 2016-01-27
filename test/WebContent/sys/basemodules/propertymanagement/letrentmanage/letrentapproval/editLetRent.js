//页面主表信息对象 var mainObj = new Object();
var approvalBusiType = "SPYWLX_001";
$(function(){
	setAppenFrame(); 		//加载附件页面
	initData();				//数据初始化	buttonBind();			//按钮事件});
/**
 * 设置附件
 **/
function setAppenFrame() {    
	var appendFrameObj = document.getElementById('id_iframe_append');
	appendFrameObj.src = contextPath+'/core/componentmodule/upload/listCommonUpload.jsp?busitype=TYYWLX_003&controltype='+STR_VIEW+'&businesscode='+pk;
}/**  * 获取附件数据 **/function getAppendData() {	var appendFrameObj = document.getElementById('id_iframe_append').contentWindow;	var appendData = appendFrameObj.getAppendData();	return appendData;}

//数据初始化 
function initData(){
	//设置头信息	$('#id_div_desc .head-title').html('出租审批');
	//读取数据  
	Ajax.service(
  		'LetRentBO',
  		'findById', 
  		[pk],
  		function(obj){  			mainObj = obj;			//数据填充 
      	 	dataFill(obj);      	 	//审批数据初始化      	 	setApprovalOption();
  		},
  		function(data){
  			top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
  		}
  	);
}//审批数据初始化function setApprovalOption() {	var apprvalOption = {		funcType:"DrawApprovalBar", 		approvalBarDivID:"id_div_approvaloption", 		approvalButtonBarDivID:"id_span_buttonArea", 		isReadonly:false, 		busiDeptCode:"", 		busiType:approvalBusiType, 		busiPK:mainObj.pk, 		busiOrgCode:mainObj.orgSysCode, 		menuId:"MENU_01_06_02_02", 		approvalFunc:approvalsave,		validateFunc:function(){			$("#tabs").tabs("select",2);			return true;		},		busiDefaultValue:{			linker:top.strUserName,			operator:top.strUserName,			auditer:top.strUserName,			checker:top.strUserName		}	};	var am = new ApprovalModule(apprvalOption);	$("#tabs").tabs({		onSelect:function(title,index){			//切换标签时改变校验信息的显示/隐藏			if(index==2){				$("body").find(".validatebox-tip-content").css("display","block");				$("body").find(".validatebox-tip-content").next().css("display","block");			}else{				$("body").find(".validatebox-tip-content").css("display","none");				$("body").find(".validatebox-tip-content").next().css("display","none");			}		}	});}

//查看物业
function view(pk){
	top.layer.open({
		type:2,
		title:'查看物业信息 ',
		shift:1,
		closeBtn :2,
		area:['900px','628px'],
		shade:false,
		zIndex:'2015', 
		success:function(layero){
	   		top.layer.setTop(layero); 
		},
		content:contextPath+'/sys/basemodules/propertymanagement/houseunit/viewHouseUnit.jsp?pk='+pk
	});
}

//按钮事件 
function buttonBind(){	//返回页面
	$("#return").click(function(){history.go(-1);});
}
//审批操作
function approvalsave(type,data){	$('body').addLoading({msg:'正在保存数据，请等待...'});			    //打开遮挡层	Ajax.service( 			'LetRentBO', 			'approvalLetRent',  			[mainObj,data,getAppendData(),type], 			function(data){						var tips = "保存信息成功！";				if(data != null && type != "1"){					var nextOrgName = data.nextOrgCodeDisplay;//新生成的审批信息的审批单位名称					var nextSysOrgCode = data.nextOrgCode;//新生成的审批信息的审批单位					var Name = data.itemName;//审批栏名称					var applyStatus = data.applyStatus;//申请单状态					var approvalStatus = data.approvalStatus;//审批状态										if(applyStatus == "审批中"){//审批中，提示信息						if(top.strFilterOrgCode == nextSysOrgCode){//审批时，如果下一个审批单位跟当前审批单位不是同一个单位时，提示：上报后将提交到XX审核；							tips = "上报后将提交到'"+nextOrgName+"'审核";						}else{//审批时，如果下一个审批单位跟当前审批单位是同一个单位时，提示：上报后将提交到“审批栏名称”；							tips = "上报后将提交到'"+ Name+"'";						}					}else if(applyStatus == "已审批通过"){//审批结束 1、退回到申请人 2、审批结束						strTips="申请单审批结束";					}else{						strTips="审批成功";					}				} 				top.layer.alert(tips,{closeBtn :2,icon:6});	    		$('body').removeLoading();     // 关闭遮挡层	    		history.go(-2); 			},function(){				$("body").removeLoading();				top.layer.alert('审批操作出问题了，请联系管理员。',{closeBtn :2,icon:5}); 			} 	  );}

//数据填充
function dataFill(obj){		// 开始遍历赋值 	for(var p in obj){		if(p=='ifFirePlug'){						if(obj[p]=='YesNo_001'){				$('#id_ifFirePlug').html('是');			}else{				$('#id_ifFirePlug').html('否');			}						continue;		}				var $element=$("#id_"+p);				if($element[0]&&obj[p]!=null){							if(obj[p+"Display"]){				$element.html(obj[p+"Display"]);			}else{				$element.html(obj[p]);			} 						}	}
}