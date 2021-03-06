var lviSRItemManagePK;
//加载完成执行 
$(function(){	
	initData();
	initAppend(); 		//加载附件页面
	//返回页面
	$("#return").click(function(){
		history.go(-1);
		});	
});


/**
 * 初始获取页面所需数据
 **/
function initData() {
	getLVIStoreRecordByPk(pk);
}

/** 
 * 根据编码获取信息
 **/
function getLVIStoreRecordByPk(pk) {
	Ajax.service(
	  		'LVIStoreRecordBO',
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

//数据填充 (待完善 )
function dataFill(obj){debugger;
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
	  //修改赋值,加入隐藏字段(取数据库信息，不作修改)
	  if(business==STR_REGISTER_MODIFY){
		  dataPackage=obj;
	  }
	  
	  lviSRItemManagePK = obj.lviSRItemManagePK;
}

//基本信息数据封装 
function getDataPackage(){	
	var dataPackage={};
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
	
	dataPackage['pk'] = pk;
	dataPackage['lviSRItemManagePK'] = lviSRItemManagePK;
	return dataPackage;
}

//保存 
function savedata(){
	
	if($("#EditPanel").form("validate")){
		$("#save").attr("disabled", true);
		top.layer.open({
			title:'保存低值品入库记录',
			icon: 3,
			area:['320px','150px'],
			btn:['确定', '取消'],
			content:'你确定要保存低值品入库记录吗？',
			shift:1,
			closeBtn :2,
			yes: function(index){		    	 			    	 		
					 $('body').addLoading({msg:'正在保存数据，请等待...'});			    //打开遮挡层				    	
					 var storeRecordObj = getDataPackage();
					 Ajax.service(
					 			'LVIStoreRecordBO',
					 			'modifyStoreRecord', 
					 			[storeRecordObj],
					 			function(data){					
						    			if(data!="null"&&data.length>0){
						    				top.layer.alert(data,{closeBtn :2,icon:5});
						    				$("#save").attr("disabled", false);
						    			}else{	    				
						    				top.layer.alert("保存成功",{closeBtn :2,icon:6});
						    				$('#return').click();          // 返回
						    			}	
						    			$('body').removeLoading();     // 关闭遮挡层

					 			},function(){
					 					$("#save").attr("disabled", false);
					 					$('body').removeLoading();     // 关闭遮挡层

					 					top.layer.alert('保存错误',{closeBtn :2,icon:5});
					 			}
					 	  );
		    		 
		    		 top.layer.close(index);												//一般设定yes回调，必须进行手工关闭

		    },
		    cancel: function(index){
				$("#save").attr("disabled", false);
			}
		});	
	}
	
}

/**
 * 设置附件
 **/
function initAppend() {
	var opt = {controlType:business,businessCode:pk,businessType:'TYYWLX_025'};
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