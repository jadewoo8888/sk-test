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
	appendFrameObj.src = contextPath+'/core/componentmodule/upload/listCommonUpload.jsp?busitype=TYYWLX_002&controltype='+business+'&businesscode='+pk;
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
		$('#id_div_desc .head-title').html('修改物业');
	}else{
		$('#id_div_desc .head-title').html('新增物业');
	}
	
	$('#id_orgSysCode').attr('value',top.strFilterOrgCodeDisplay);	
	$('#id_orgSysCode').attr('treevalue',top.strFilterOrgCode);
	
	//读取数据  
	if(business==STR_REGISTER_MODIFY){
		Ajax.service(
	  		'HouseUnitBO',
	  		'findById', 
	  		[pk],
	  		function(obj){
				//数据填充 
	      	 	dataFill(obj);
	  		},
	  		function(data){
	  			top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
	  		}
	  	);
	}
	
}
//添加资产选择控件
function selectAsset(){
	openAssetSelect("sql","");
} 
//设置资产选择条件 （资产选择控件查询条件预设方法,编写脚本注意避免该同名方法  ）

function setAssetSelectQC(){
	var sql=""
	var qcArr = new Array();
	
	for(var i in cardType){
		if(cardType[i].pk=='2'){
			sql=cardType[i].sql;
			break;
		}
	}
	
	//选择同一大类的模板 	
	if(sql.length>0){		
		var obj = new Object();
		obj.fn = '';
		obj.oper = 14;
		obj.value1 =sql;
		qcArr.push(obj);
	}
	
	var obj1 = new Object();
	obj1.fn = 'assetRegCheckFlag';
	obj1.oper = ARY_STR_EQUAL[0];
	obj1.value1 ='SJZT_01';
	qcArr.push(obj1);

	if(qcArr.length>0){
		return qcArr;
	}else{
		return null;
	}	
}
//资产分类树回调
function updateAssetSelectedData(node){
	$('#id_assetSysCode').searchbox('setValue',node[0].assetRegAssetName);		
	$('#id_assetSysCode').attr('treevalue',node[0].assetRegAssetNo);
	$('#id_assetSysCode').attr('assetRegAssetType',node[0].assetRegAssetType);
	
	//从资产卡片中的地址中的物业地址读取
	if(node[0].address!=undefined){
		$('#id_unitAdress').val(node[0].address);
	}
}
//初始化组件
function initComponent(){
	$('#id_assetSysCode').searchbox({ 
		searcher:function(value,name){ 
				selectAsset();
		}, 
		width:200
	});
	//禁止输入
	$('#id_assetSysCode').searchbox('textbox').attr('readonly',true);//禁用输入
	//资产编号经过事件
	$('#id_assetSysCode').searchbox('textbox').addClass('colorlink');    
	//资产编号点击事件
	$('#id_assetSysCode').searchbox('textbox').click(function(e){
		if($(this).val()!=""){
			viewAsset($('#id_assetSysCode').attr('treevalue'),$('#id_assetSysCode').attr('assetRegAssetType'));
		}
	});
	//物业用途
	if($('#id_unitPurpose')[0])
	$('#id_unitPurpose').combobox({    
	    data:data_unitPurpose,  
	    editable:false,
	    valueField:'classifyCode',
	    textField:'classifyName',
	    onLoadSuccess: function () { //数据加载完毕事件

        }  
	});
	
	
	//物业分类/产权情况
	if($('#id_unitClassify')[0])
	$('#id_unitClassify').combobox({    
	    data:data_unitClassify,  
	    editable:false,
	    valueField:'classifyCode',
	    textField:'classifyName',
	    onLoadSuccess: function () { //数据加载完毕事件

        }  
	});
	
	//是否配备消防栓及消防喷淋系统
	if($('#id_ifFirePlug')[0])
	$('#id_ifFirePlug').combobox({    
	    data:data_ifFirePlug,  
	    editable:false,
	    panelHeight:80,
	    valueField:'classifyCode',
	    textField:'classifyName',
	    onLoadSuccess: function () { //数据加载完毕事件

        }  
	});	
	
	//使用状态
	if($('#id_useLineMD')[0])
	$('#id_useLineMD').combobox({    
	    data:data_useLineMD,  
	    editable:false,
	    valueField:'classifyCode',
	    textField:'classifyName',
	    onLoadSuccess: function () { //数据加载完毕事件
			$("#id_useLineMD").combobox('select','DYZT_002');
        },onSelect:function(value){ 
			if(value.classifyCode=='DYZT_002'){
				$('#id_unitPurpose,#id_ifFirePlug,#id_unitClassify').each(function(){
					$('#'+$(this).attr('id')+'_tip').removeClass('hidden');
					$(this).combobox('textbox').validatebox({
					    required: true,
					    missingMessage:'必选 ' 
					});		
				});
				
				$('#id_unitPurpose').combobox('loadData', data_unitPurpose);
				$('#id_ifFirePlug').combobox('loadData', data_ifFirePlug);
				$('#id_unitClassify').combobox('loadData', data_unitClassify);
			}else{				
				$('#id_unitPurpose,#id_ifFirePlug,#id_unitClassify').each(function(){
					if(!$('#'+$(this).attr('id')+'_tip').hasClass('hidden'))
						$('#'+$(this).attr('id')+'_tip').addClass('hidden');
					$(this).combobox('textbox').validatebox({required: false});	
				});
				
				$('#id_unitPurpose').combobox('loadData', data_unitPurpose2);
				$('#id_ifFirePlug').combobox('loadData', data_ifFirePlug2);
				$('#id_unitClassify').combobox('loadData', data_unitClassify2)
			}

			if(value.classifyCode=='DYZT_006'){
				$('#id_clients_tip').removeClass('hidden')
				$('#id_clients').validatebox({required: true, missingMessage:'必填 '});
			}else{
				if(!$('#id_clients_tip').hasClass('hidden'))
					$('#id_clients_tip').addClass('hidden')
					
				$('#id_clients').validatebox({required: false});
			}
			
			//清除combox加载时验证产生样式 	
			$(".validatebox-invalid").removeClass("validatebox-invalid");
			$(".validatebox-tip").remove();
        }
	});
	



	//校区
	if($('#id_campus')[0])
		$('#id_campus').combobox({    
		    data:data_campus,  
		    editable:false,
		    valueField:'classifyCode',
		    textField:'classifyName',
		    onLoadSuccess: function () { //数据加载完毕事件

	        }  
		});
}
//初始化校验
function initValidate(){	
	$('#id_unitCode,#id_unitName,#id_unitAdress,#id_floorsNo,#id_unitArea').validatebox({
	    required: true,
	    missingMessage:'必填 ' 
	});
	
	
	$('#id_useLineMD,#id_unitClassify').each(function(){
		$(this).combobox('textbox').validatebox({
		    required: true,
		    missingMessage:'必选 ' 
		});		
	});
	
	$('#id_assetSysCode').searchbox('textbox').validatebox({
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
			title:'保存物业',
			icon: 3,
			area:['250px','150px'],
			btn:['确定', '取消'],
			content:'你确定要保存物业吗？',
			shift:1,
			closeBtn :2,
			yes: function(index){		    	 			    	 		
					 $('body').addLoading({msg:'正在保存数据，请等待...'});			    //打开遮挡层				    					 
					 //基本信息数据包
					 var houseUnit=getDataPackage();
					 //附件数据包
					 var appendPackage= getAppendData(); 
					 
		    		 //提交新增
		    		 if(business==STR_REGISTER_ADDNEW){
			    		 var submitPackage=[houseUnit,appendPackage];
			    		 submitAdd(submitPackage);
		    		 }
		    		
		    		 //提交修改
		    		 if(business==STR_REGISTER_MODIFY){
		    			 var submitPackage=[houseUnit,appendPackage];
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
var dataPackage={};
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

	return dataPackage;
}
//提交新增
function submitAdd(submitPackage){
	 Ajax.service(
 			'HouseUnitBO',
 			'addNewHouseUnit', 
 			submitPackage,
 			function(data){					
	    			if(data!="null"&&data.length>0){
	    				top.layer.alert(data,{closeBtn :2,icon:5});
	    				$("#save").attr("disabled", false);
	    			}else{	    				
	    				top.layer.alert("保存物业成功",{closeBtn :2,icon:6});
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
 			'HouseUnitBO',
 			'modifyHouseUnit', 
 			submitPackage,
 			function(data){
 					$('body').removeLoading();     // 关闭遮挡层
	    			if(data!="null"&&data.length>0){
	    				top.layer.alert(data,{closeBtn :2,icon:5});
	    				$("#saveAsset").attr("disabled", false);
	    			}else{
	    				top.layer.open({
	    					title:'提示',
	    					icon: 6,
	    					area:['230px','140px'],
	    					btn:['确定'],
	    					content:'修改物业成功 ',
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
		  		 	//特殊字段处理
		  		 	if(p=='assetSysCode'){
		  		 		getAssetInfo(obj[p]);
		  		 		continue;
		  		 	}
		  		 	
		  		 	$("#id_"+p).val(obj[p]);		  		 	
			     }
		  }
	  }
	  //修改赋值,加入隐藏字段(取数据库信息，不作修改)
	  if(business==STR_REGISTER_MODIFY){
		  dataPackage=obj;
	  }
}
//输入限制
function limitInput(){
	$('#id_floorsNo').numberbox({   
	    min:0
	});	
	
	$('#id_unitArea').numberbox({   
	    precision:2,
	    groupSeparator:','
	});	
}
//获取卡片编号
function getAssetInfo(pk){
	Ajax.service(
	  		'AssetRegistBO',
	  		'findById', 
	  		[pk],
	  		function(obj){
	  			$('#id_assetSysCode').searchbox('setValue',obj.assetRegAssetName);		
	  			$('#id_assetSysCode').attr('treevalue',obj.assetRegAssetNo);
	  			$('#id_assetSysCode').attr('assetRegAssetType',obj.assetRegAssetType);
	  		},
	  		function(data){
	  			top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
	  		}
	  	);
}