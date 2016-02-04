//基本信息数据包

var dataPackage={};

$(function(){
	setAppenFrame(); 		//加载附件页面
	initComponent();		//初始化组件

	initValidate();			//初始化校验

	initData();				//数据初始化  
	buttonBind();			//按钮事件
	limitInput();			//输入限制

});
/**
 * 设置附件
 **/
function setAppenFrame() {    
	var appendFrameObj = document.getElementById('id_iframe_append');
	appendFrameObj.src = contextPath+'/core/componentmodule/upload/listCommonUpload.jsp?busitype=TYYWLX_003&controltype='+business+'&businesscode='+pk;
}
/** 
 * 获取附件数据
 **/
function getAppendData() {
	var appendFrameObj = document.getElementById('id_iframe_append').contentWindow;
	var appendData = appendFrameObj.getAppendData();
	return appendData;
}

//数据初始化 
function initData(){
	//设置头信息

	if(business==STR_REGISTER_MODIFY){
		$('#id_div_desc .head-title').html('修改出租申请');
	}else{
		$('#id_div_desc .head-title').html('新增出租申请');
	}
	$('#id_orgSysCode').attr('value',top.strFilterOrgCodeDisplay);	
	$('#id_orgSysCode').attr('treevalue',top.strFilterOrgCode);

	//读取数据  
	if(business==STR_REGISTER_MODIFY){
		Ajax.service(
	  		'LetRentBO',
	  		'findById', 
	  		[pk],
	  		function(obj){
				//数据填充 
	      	 	dataFill(obj); 
	      	    //修改赋值,加入隐藏字段(取数据库信息，不作修改)
	      		dataPackage=obj;
	      		//特殊处理
	      		$('#id_unitCode').searchbox('setValue',obj.unitCode);
	      		$('#id_unitCode').attr('treevalue',obj.unitCode);
	      		$('#id_unitCode').attr('pk',obj.pk);
	  		},
	  		function(data){
	  			top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
	  		}
	  	);
	} 
	//加载物业信息
	if(unitpk!=undefined&&unitpk.length>0){
		Ajax.service(
		  		'HouseUnitBO',
		  		'findById', 
		  		[unitpk],
		  		initHouseUnitData,
		  		function(data){
		  			top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
		  		}
		  	);
	}
	function initHouseUnitData(result){
		var row=[];
		row[0]=result;
		updateContractSelectedData(row);
	}
}

/**
 * 打开物业选择树

 * */
function selectHouseUnit(){
	top.layer.open({type:2, title:"物业选择", shift:1, closeBtn:2, area:["1000px", "600px"], content:contextPath + "/sys/basemodules/propertymanagement/letrentmanage/letrentApply/listHouseUnitSelect.jsp?busitype=" + business + "&openwindowname=" + window.name});
}
/**
 * 物业树回调函数

 **/
function updateContractSelectedData(rows) {
	var row = rows[0];
	dataFill(row);
	//特殊处理
	$('#id_unitCode').searchbox('setValue',row.unitCode);
	$('#id_unitCode').attr('treevalue',row.unitCode);
	$('#id_unitCode').attr('pk',row.pk);
	
	getLastLentInfo(row.unitSysCode);
	dataPackage.unitSysCode=row.unitSysCode;
}
/**
 * 查找物业最后登记的出租信息
 **/
function getLastLentInfo(unitSysCode){
	Ajax.service(
 			'LetRentBO',
 			'getLastLetRent', 
 			[unitSysCode],
 			function(data){		
 					dataFill_lastLentInfo(data);
	    			$('body').removeLoading();     // 关闭遮挡层

 			},function(){
 					top.layer.alert('数据异常',{closeBtn :2,icon:5});
 			}
	);
}
//物业最后登记的出租信息填充
function dataFill_lastLentInfo(data){
	$('#id_formerLetUpPrice').val(data.letUpPrice);
	
	$('#id_formerLastRent').val(data.formerLastRent);
	
	$('#id_formerStartDate').val(data.formerStartDate);
	
	$('#id_formerRealEndDate').val(data.formerRealEndDate);
	
	$('#id_formerIncrRate').val(data.incrRate);
	
	$('#id_formerIncrRound').val(data.incrRound);
	
	$('#id_formerRentMargin').val(data.rentMargin);
	
	$('#id_formerAuctionMargin').val(data.auctionMargin);
	
	$('#id_formerDecorateperiod').val(data.decorateperiod);
	
	//原出租用途

	$('#id_formerLetPurpose').searchbox('select',data.planLetPurpose);

}

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
/**
 * 初始化组件

 */
function initComponent(){
	$('#id_unitCode').searchbox({ 
		searcher:function(value,name){ 
				selectHouseUnit();
		}, 
		width:200
	});
	//禁止输入
	$('#id_unitCode').searchbox('textbox').attr('readonly',true);//禁用输入
	//资产编号经过事件
	$('#id_unitCode').searchbox('textbox').addClass('colorlink');    
	//资产编号点击事件
	$('#id_unitCode').searchbox('textbox').click(function(e){
		if($(this).val()!=""){
			view($('#id_unitCode').attr('pk'));
		}
	});
	
	//是否配备消防栓及消防喷淋系统
	$('#id_ifFirePlug').combobox({    
	    data:data_YesNo,  
	    editable:false,
	    width:202,
	    valueField:'classifyCode',
	    textField:'classifyName',
	    hasDownArrow:false
	});
	$('#id_ifFirePlug').combobox('textbox').addClass('disableText');
	
	//物业分类
	$('#id_unitClassify').combobox({    
	    data:data_unitClassify,  
	    editable:false,
	    width:202,
	    valueField:'classifyCode',
	    textField:'classifyName',
	    hasDownArrow:false
	});
	$('#id_unitClassify').combobox('textbox').addClass('disableText');
	//物业面积
	$('#id_unitArea').numberbox({precision:2,groupSeparator:','});
	
	//申请日期
	$('#id_letRentDate').datebox({value:top.serverDate});
	
	//日期可编辑校验

	$('.datebox-f').datebox({validType:'sc_Date'});
	
	//租金起步价（元/月/平方米）：数值型，保留两倍小数

	$('#id_letUpPrice').numberbox({precision:2,groupSeparator:','});
	//原租金起步价（元/月/平方米）：数值型，保留两倍小数

	$('#id_formerLetUpPrice').numberbox({precision:2,groupSeparator:','});
	
	//期末租金 (元/月/平方米)：数值型，保留两倍小数

	$('#id_formerLastRent').numberbox({precision:2,groupSeparator:','});
	
	//招租方式
	$('#id_letRentWay').combobox({    
	    data:data_letRentWay,  
	    editable:false,
	    valueField:'classifyCode',
	    textField:'classifyName'
	});
	//	租赁期限（月）：正整数。

	$('#id_letTerm').numberbox({precision:0,groupSeparator:','});
	
	//	月租金递增率（%）：0~100的数值，保留两位小数
	$('#id_incrRate').numberbox({precision:2,max:100});
	//	原月租金递增率（%）：0~100的数值，保留两位小数
	$('#id_formerIncrRate').numberbox({precision:2,max:100});
	
	
	//	递增周期（月）：必填，正整数。

	$('#id_incrRound').numberbox({precision:0,groupSeparator:','});
	//	原递增周期（月）：必填，正整数。

	$('#id_formerIncrRound').numberbox({precision:0,groupSeparator:','});
	
	//	租赁保证金（几倍月租金）：数值型，保留两倍小数。

	$('#id_rentMargin').numberbox({precision:2,groupSeparator:','});
	//	原租赁保证金（几倍月租金）：数值型，保留两倍小数。

	$('#id_formerRentMargin').numberbox({precision:2,groupSeparator:','});
	
	//	竞租保证金：数值型，保留两倍小数。

	$('#id_auctionMargin').numberbox({precision:2,groupSeparator:','});
	//	原竞租保证金：数值型，保留两倍小数。

	$('#id_formerAuctionMargin').numberbox({precision:2,groupSeparator:','});
	
	//	免租金装修期（月）：必填，正整数，包含0。

	$('#id_decorateperiod').numberbox({precision:0,groupSeparator:','});
	//	原免租金装修期（月）：必填，正整数，包含0。

	$('#id_formerDecorateperiod').numberbox({precision:0,groupSeparator:','});
	
	//	拟出租用途：必填，元数据下拉，内容同出租物业管理中的用途。

	$('#id_planLetPurpose').combobox({    
	    data:data_planLetPurpose,  
	    editable:false,
	    valueField:'classifyCode',
	    textField:'classifyName'
	});
	//原出租用途

	$('#id_formerLetPurpose').combobox({    
	    data:data_planLetPurpose,  
	    editable:false,
	    width:202,
	    valueField:'classifyCode',
	    textField:'classifyName',
	    hasDownArrow:false
	});
	$('#id_formerLetPurpose').combobox('textbox').addClass('disableText');
}
//初始化校验

function initValidate(){
	$('#id_letUpPrice,#id_letTerm,#id_incrRate,#id_incrRound,#id_rentMargin,#id_auctionMargin,#id_decorateperiod').validatebox({
	    required: true,
	    missingMessage:'必填 ' 
	});
	
	
	//招租方式
	$('#id_letRentWay').combobox('textbox').validatebox({
	    required: true,
	    missingMessage:'必选 ' 
	});		
	//拟出租用途

	$('#id_planLetPurpose').combobox('textbox').validatebox({
	    required: true,
	    missingMessage:'必选 ' 
	});	
	
	//清除combox加载时验证产生样式 	
	$(".validatebox-invalid").removeClass("validatebox-invalid");
	$(".numberbox-f").removeAttr("required");
}
//按钮事件 
function buttonBind(){
	//返回页面
	$("#return").click(function(){history.go(-1);});
	//改变编辑状态

	$('#save').click(function(e){
		add();
	});
}
//新增操作
function add(){
	if($("#EditPanel").form("validate")){
		$("#save").attr("disabled", true);
		top.layer.open({
			title:'保存出租申请',
			icon: 3,
			area:['260px','150px'],
			btn:['确定', '取消'],
			content:'你确定要保存出租申请吗？',
			shift:1,
			closeBtn :2,
			yes: function(index){		    	 			    	 		
					 $('body').addLoading({msg:'正在保存数据，请等待...'});			    //打开遮挡层				    	
					 //基本信息数据包

					 var letrent=getDataPackage();					 
		    		 //附件数据包

					 var appendPackage= getAppendData(); 					 						 
		    		 //提交新增
		    		 if(business==STR_REGISTER_ADDNEW){
			    		 var submitPackage=[letrent,appendPackage,'addnew'];
			    		 submitAdd(submitPackage);
		    		 }
		    		
		    		 //提交修改
		    		 if(business==STR_REGISTER_MODIFY){
		    			 var submitPackage=[letrent,appendPackage,'modify'];
		    			 submitModify(submitPackage);	
		    		 }
		    		 
		    		 top.layer.close(index);												//一般设定yes回调，必须进行手工关闭

		    },
		    cancel: function(index){
				$("#save").attr("disabled", false);
			}
		});	
	}
}
//基本信息数据封装 
function getDataPackage(){	
	var inputs=$(".EditPanel input");
	if(inputs.length>0){
		for(var i=0;i<inputs.length;i++){			
			if(inputs[i].type!="button"){
				if(inputs[i].getAttribute('fieldname')!=undefined&&inputs[i].getAttribute('fieldname')!=""){
					if(inputs[i].getAttribute('treevalue')!=undefined&&inputs[i].getAttribute('treevalue')!=""){
								dataPackage[inputs[i].getAttribute('fieldname')]=inputs[i].getAttribute('treevalue');
					}else if($(inputs[i]).hasClass('numberbox-f')){
						  var num=$(inputs[i]).numberbox('getValue');
						  if(num==undefined||num==null||num.length==0)num=0;
						  		dataPackage[inputs[i].getAttribute('fieldname')]=num;
					}else if($(inputs[i]).hasClass('combobox-f')){
						  dataPackage[inputs[i].getAttribute('fieldname')]=$(inputs[i]).combobox("getValue");
					}else if($(inputs[i]).hasClass('datebox-f')){
						  dataPackage[inputs[i].getAttribute('fieldname')]=$(inputs[i]).datebox("getValue");
					}				
					else{
							if(inputs[i].value==inputs[i].placeholder){
								dataPackage[inputs[i].getAttribute('fieldname')]='';							
							}else{
								dataPackage[inputs[i].getAttribute('fieldname')]=inputs[i].value;
							}
					}	
				}
			}			
		}
	}

	var textareas=$(".EditPanel textarea");
	if(textareas.length>0){
		for(var i=0;i<textareas.length;i++){
			if(textareas[i].getAttribute('fieldname')!=undefined&&textareas[i].getAttribute('fieldname')!=""){
				dataPackage[textareas[i].getAttribute('fieldname')]=textareas[i].value;
			}
		}
	}
	//特殊字段
	dataPackage.orgName=top.strFilterOrgCodeDisplay;
	dataPackage.orgSysCode=top.strFilterOrgCode;
	dataPackage.ownerOrgName=top.strFilterOrgCodeDisplay;
	
	return dataPackage;
}
//提交新增
function submitAdd(submitPackage){
	 Ajax.service(
 			'LetRentBO',
 			'addLetRent', 
 			submitPackage,
 			function(data){					
	    			if(data!="null"&&data.length>0){
	    				top.layer.alert(data,{closeBtn :2,icon:5});
	    				$("#save").attr("disabled", false);
	    			}else{	    				
	    				top.layer.alert("保存出租申请成功",{closeBtn :2,icon:6});
	    				$('#return').click();          // 返回
	    			}	
	    			$('body').removeLoading();     // 关闭遮挡层

 			},function(){
 					$("#save").attr("disabled", false);
 					$('body').removeLoading();     // 关闭遮挡层

 					top.layer.alert('保存错误',{closeBtn :2,icon:5});
 			}
 	  );
}
//提交修改 
function submitModify(submitPackage){
	 Ajax.service(
 			'LetRentBO',
 			'modifyLetRent', 
 			submitPackage,
 			function(data){
 					$('body').removeLoading();     // 关闭遮挡层

	    			if(data!="null"&&data.length>0){
	    				top.layer.alert(data,{closeBtn :2,icon:5});
	    				$("#save").attr("disabled", false);
	    			}else{
	    				top.layer.open({
	    					title:'提示',
	    					icon: 6,
	    					area:['230px','140px'],
	    					btn:['确定'],
	    					content:'修改出租申请成功 ',
	    					shift:1,
	    					closeBtn :2,
	    					yes: function(index){	    					
	    					    	 //一般设定yes回调，必须进行手工关闭

	    					    	 top.layer.close(index);
	    					    	 history.go(-1);
	    				    }
	    				});					    				
	    			}			    			
 			},
 			function(){
 					$("#save").attr("disabled", false);
 					$('body').removeLoading();     // 关闭遮挡层

 					top.layer.alert('保存错误',{closeBtn :2,icon:5});
 			}
 	  );
}
//数据填充 (待完善 )
function dataFill(obj){
	  // 开始遍历赋值 
	  for(var p in obj){
		  if($("#id_"+p)&&obj[p]!=null){		     
			     if($("#id_"+p).hasClass("combobox-f")){
			    	$("#id_"+p).combobox('select',obj[p]);
			     }else if($("#id_"+p).hasClass("datebox-f")){
			    	$("#id_"+p).datebox('setValue',obj[p]);
			     }else if($("#id_"+p).hasClass("numberbox-f")){
			    	 $("#id_"+p).numberbox('setValue',obj[p]);
			     }else if(obj[p+"Display"]){	
			    	$("#id_"+p).attr('treevalue',obj[p]);
			    	if($("#id_"+p).next().hasClass("searchbox")){
			    		$("#id_"+p).searchbox('setValue',obj[p+"Display"]);
			    	}else{
			    		$("#id_"+p).val(obj[p+"Display"]);
			    	}
			     }else{
		  		 	$("#id_"+p).val(obj[p]);
			     }
		  }
	  }
}
//输入限制
function limitInput(){

}