var oldcategoryName = '';
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
		//$('#categoryName').addClass('disableText');
		//$('#categoryName').attr('readonly',true);//禁用输入
	} else {
		//$('#groupCode').combobox('setValues','')
	}
}

/** 
 * 根据编码获取信息
 **/
function getCategoryByPk(pk) {
	$("body").addLoading({msg:"正在获取信息，请稍后..."});
	Ajax.service("CategoryManagementBO", "findByProperty", ['pk',pk], getCategoryByPkSuccFunc, getCategoryByPkFailureFunc);
}

function getCategoryByPkSuccFunc(data) {
	callUpdateData(data);
	$("body").removeLoading();
}

/**
 * 选择回调方法
 **/
function callUpdateData(rows) {
	var row = rows[0];
	oldcategoryName = row.categoryName;
	$("#categoryName").val(oldcategoryName);
	$("#categoryRemark").val(row.categoryRemark);
	if (row.groupCode != null) {
		$('#groupCode').combobox('setValues',row.groupCode.split(','));
	}
	
}

function getCategoryByPkFailureFunc() {
	$("body").removeLoading();
	top.layer.alert("\u83b7\u53d6\u5904\u7f6e\u5355\u57fa\u672c\u4fe1\u606f\u51fa\u73b0\u9519\u8bef\uff0c\u8bf7\u8054\u7cfb\u7ba1\u7406\u5458 ", {icon:5, closeBtn:2});
}

//数据封装 
function dataPackage(business){
	var categoryObj = new Object();
	categoryObj.categoryName = $("#categoryName").val();
	categoryObj.categoryRemark = $("#categoryRemark").val();
	//categoryObj.groupCode = $("input[name = groupCode]").val();
	categoryObj.groupCode = $('#groupCode').combobox('getValues').join();
	
	if (pk) {
		categoryObj.pk = pk;
		categoryObj.editedName = true;
		if (oldcategoryName == categoryObj.categoryName) {
			categoryObj.editedName = false;
		}
	}
	
	return categoryObj;
}

//保存 
function savedata(){
	edit(business);
}

//新增修改 
function edit(business){
	// 验证通过则返回为true
	if($("#ff").form("validate")){
		var categoryObj = dataPackage(business);
		if (business == STR_REGISTER_ADDNEW) {
			submitAdd(categoryObj);
		} else {
			submitModify(categoryObj);
		}
	}else{
		 top.layer.alert('请填写完整内容',{icon:7,closeBtn :2}); 
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
 			'CategoryManagementBO',
 			'modifyCategory', 
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
		value: groupCode == 'null' ? "" : groupCode,
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


