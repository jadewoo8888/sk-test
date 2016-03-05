//加载完成执行 
$(function(){	
	initData();
	initCategoryCombo();
	initAssetTypeBox();
	
});


/**
 * 初始获取页面所需数据
 **/
function initData() {
	//返回页面
	$("#return").click(function(){
		history.go(-1);
		});	
	
	$('#id_imType').combobox({  
        onChange:function(){  
        	imTypeChangeFn(); 
        }
        });  
	
	//编辑事务读取数据 
	if(business=="modify"){
		$("#businesstext").html("修改类目 ");
	}
	
	$('#span_imAssetType').hide();
	
	if(pk) {
		getItemByPk(pk);
		$('#id_imName').addClass('disableText');
		$('#id_imName').attr('readonly',true);//禁用输入
	}
}

/** 
 * 根据编码获取信息
 **/
function getItemByPk(pk) {
	Ajax.service(
	  		'ItemManageBO',
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
		  		 	/*if(p=='assetSysCode'){
		  		 		getAssetInfo(obj[p]);
		  		 		continue;
		  		 	}*/
		  		 	
		  		 	$("#id_"+p).val(obj[p]);		  		 	
			     }
		  }
	  }
	  //修改赋值,加入隐藏字段(取数据库信息，不作修改)
	  if(business==STR_REGISTER_MODIFY){
		  dataPackage=obj;
	  }
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

	return dataPackage;
}

//保存 
function savedata(){
	if($("#EditPanel").form("validate")){
		$("#save").attr("disabled", true);
		edit(business);
	}else{
		 top.layer.alert('请填写完整内容',{icon:7,closeBtn :2}); 
	}
}

//新增修改 
function edit(business){
	var itemObj = getDataPackage();
	if (business == 'add') {
		submitAdd(itemObj);
	} else {
		itemObj.pk = pk;
		submitModify(itemObj);
	}
}

//提交新增
function submitAdd(submitPackage){
	 Ajax.service(
 			'ItemManageBO',
 			'addItem', 
 			[submitPackage],
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
}

//提交修改 
function submitModify(submitPackage){
	 Ajax.service(
 			'ItemManageBO',
 			'modifyItem', 
 			[submitPackage],
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
	    					content:'修改成功 ',
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
/**
 * 类目下拉框
 */
function initCategoryCombo() {
	Ajax.service(
		'CategoryManagementBO',
		'findCategoryByGroupCode', 
		[top.strUserGroupCode],
		initCategoryComboSuccFunc
	);
}

function initCategoryComboSuccFunc(result) {
	$('#id_imCategoryPK').combobox("loadData",result);  
	 if (result.length > 0) {
		 $('#id_imCategoryPK').combobox('select', result[0].pk);
     }
	 
}

/**
 * 选择资产分类代码
 **/
function initAssetTypeBox(){
	//资产分类代码搜索  
	$('#id_imAssetType').searchbox({ 
		prompt:'资产分类代码',
		searcher:function(value,name){ 
				//选择资产分类树
		   		var treeValue = $('#id_imAssetType').attr('treevalue');  
		 		var treeOption = {selType:'sgl',defaultSelecteds:treeValue,callBackFunction:acTreeCallBack};
			  	top.acTree(treeOption);
		}
	});
	//禁止输入
	$('#id_imAssetType').searchbox('textbox').attr('readonly',true);//禁用输入
	//资产分类树回调
	function acTreeCallBack(code,codeAndName){
		$('#id_imAssetType').searchbox('setValue',codeAndName);
		$('#id_imAssetType').attr('treevalue',code);
	}
}

/**
 * 类别选择：当是固定资产时，资产分类代码是必填
 */
function imTypeChangeFn() {
	var type = $('#id_imType').combobox('getValue');
	if (type == 'WPLB_002') {
		$('#span_imAssetType').show();
	} else {
		$('#span_imAssetType').hide();
	}
}
