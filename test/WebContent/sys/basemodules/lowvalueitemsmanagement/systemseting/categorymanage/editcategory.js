//加载完成执行 
$(function(){	
	initData();
	initRoleCombo();
	//返回页面
	$("#return").click(function(){
		history.go(-1);
		});	
	
	//编辑事务读取数据 
	if(business==STR_REGISTER_ADDNEW){
		$("#businesstext").html("修改类目 ");
	}
});


/**
 * 初始获取页面所需数据
 **/
function initData() {
	if(pk) {
		getCategoryByPk(pk);
	}
}

/** 
 * 根据编码获取信息
 **/
function getCategoryByPk(pk) {
	
	$("body").addLoading({msg:"正在获取信息，请稍后..."});
	Ajax.service(
	  		'CategoryManagementBO',
	  		'findById', 
	  		[pk],
	  		function(obj){
	  			groupCode = obj.groupCode;
	  			$("#categoryName").val(obj.categoryName);
	  			$("#categoryRemark").val(obj.categoryRemark);
	  			if (obj.groupCode != null) {
	  				$('#groupCode').combobox('setValues',obj.groupCode.split(','));
	  			}
	  			
	  			$("body").removeLoading();
	  			
	  		},
	  		function(data){
	  			top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
	  		}
	  	);
}

//数据封装 
function dataPackage(business){
	var categoryObj = new Object();
	categoryObj.categoryName = $("#categoryName").val();
	categoryObj.categoryRemark = $("#categoryRemark").val();
	categoryObj.groupCode = $('#groupCode').combobox('getValues').join();
	
	if (pk) {
		categoryObj.pk = pk;
	}
	
	return categoryObj;
}

//保存 
function savedata(){
	edit(business);
}

//新增修改 
function edit(business){
	
	if($("#ff").form("validate")){
		$("#submit").attr("disabled", true);
		top.layer.open({
			title:'保存类目',
			icon: 3,
			area:['260px','150px'],
			btn:['确定', '取消'],
			content:'你确定要保存类目吗？',
			shift:1,
			closeBtn :2,
			yes: function(index){		    	 			    	 		
					 $('body').addLoading({msg:'正在保存数据，请等待...'});			    //打开遮挡层	
					 
					 var categoryObj = dataPackage(business);
						if (business == STR_REGISTER_ADDNEW) {
							submitAdd(categoryObj);
						} else {
							submitModify(categoryObj);
						}
		    		 
		    		 top.layer.close(index);												//一般设定yes回调，必须进行手工关闭

		    },
		    cancel: function(index){
				$("#submit").attr("disabled", false);
			}
		});	
	}
	
}

//提交新增
function submitAdd(submitPackage){
	 Ajax.service(
 			'CategoryManagementBO',
 			'addCategory', 
 			[submitPackage],
 			function(data){					
	    			if(data!="null"&&data.length>0){
	    				top.layer.alert(data,{closeBtn :2,icon:5});
	    				$("#submit").attr("disabled", false);
	    			}else{	    				
	    				top.layer.alert("保存成功",{closeBtn :2,icon:6});
	    				$('#return').click();          // 返回
	    			}	
	    			$('body').removeLoading();     // 关闭遮挡层

 			},function(){
 					$("#submit").attr("disabled", false);
 					$('body').removeLoading();     // 关闭遮挡层

 					top.layer.alert('保存错误',{closeBtn :2,icon:5});
 			}
 	  );
}

//提交修改 
function submitModify(submitPackage){
	 Ajax.service(
 			'CategoryManagementBO',
 			'modifyCategory', 
 			[submitPackage],
 			function(data){
 					$('body').removeLoading();     // 关闭遮挡层

	    			if(data!="null"&&data.length>0){
	    				top.layer.alert(data,{closeBtn :2,icon:5});
	    				$('body').removeLoading();     // 关闭遮挡层
	    				$("#submit").attr("disabled", false);
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
 					$("#submit").attr("disabled", false);
 					$('body').removeLoading();     // 关闭遮挡层

 					top.layer.alert('保存错误',{closeBtn :2,icon:5});
 			}
 	  );
}

//初始化角色下拉列表
function initRoleCombo() {
	
	//选择角色
	$('#groupCode').combobox({
		onBeforeLoad: function(param){
			ajaxRole();
		},
		valueField:'groupCode',
		textField:'groupName',
		width:220,
		multiple:true,
		value: groupCode,
		//height:26,
		//panelHeight:100,
		editable:false
	});
	
}

//角色加载
function ajaxRole(){
	Ajax.service(
		'GroupBO',
		'findAll', 
		[],
		function(result){
			//result.push({groupCode:'',groupName:'无'});
			$('#groupCode').combobox("loadData",result);
		}
	);
}


