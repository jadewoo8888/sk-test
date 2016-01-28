
//加载完成执行 
$(function(){	
	initData();
	//返回页面
	$("#return").click(function(){
		history.go(-1);
		});	
});


/**
 * 初始获取页面所需数据
 **/
function initData() {
	if(pk) {
		getTestById(pk);
	}
}

/** 
 * 根据编码获取信息
 **/
function getTestById(id) {
	$("body").addLoading({msg:"正在获取信息，请稍后..."});
	Ajax.service("TestBO", "findByProperty", ['id',id], getTestByIdSuccFunc, getTestByIdFailureFunc);
}

function getTestByIdSuccFunc(data) {
	callUpdateData(data);
	$("body").removeLoading();
}

/**
 * 物业选择回调方法
 **/
function callUpdateData(rows) {
	var row = rows[0];
	$("#name").val(row.name);
	$("#sex").val(row.sex);
}

function getTestByIdFailureFunc() {
	$("body").removeLoading();
	top.layer.alert("\u83b7\u53d6\u5904\u7f6e\u5355\u57fa\u672c\u4fe1\u606f\u51fa\u73b0\u9519\u8bef\uff0c\u8bf7\u8054\u7cfb\u7ba1\u7406\u5458 ", {icon:5, closeBtn:2});
}

//数据封装 
function dataPackage(busitype){
	var testObj = new Object();
	if (busitype == 'add') {
		testObj.name = $("#name").val();
		testObj.sex = $("#sex").val();
	} else {
		testObj.name = $("#name").val();
		testObj.sex = $("#sex").val();
		testObj.id = pk;
	}
	
	return testObj;
}


//显示新增成功信息
function showsucMassage(){
	top.layer.open({
		title:'提示',
		icon: 6,
		area:['280px','150px'],
		btn:['确定', '新建下一条'],
		content:'新增成功',
		shift:1,
		closeBtn :2,
		yes: function(index){
			 history.go(-1);
		    //一般设定yes回调，必须进行手工关闭

		    top.layer.close(index);
	    },
		cancel:function(index){
			 location.href=contextPath+"/test/edit.jsp?business=add";
	    }
	});
}

//显示修改成功信息
function modifyucMassage(){
	top.layer.confirm('修改成功', {
		icon: 6,
		shade : [0.4 ,'#000',true],
	    btn: ['确定'] //按钮
	}, function(index){
		//location.href=contextPath+"/sys/basemodules/rolemodules/listroleManager.jsp";
		history.go(-1);
		top.layer.close(index);
	});
}

//保存 
function savedata(){
	edit(busitype);
}

//新增角色修改 
function edit(busitype){
	// 验证通过则返回为true
	if($("#ff").form("validate")){
		var testObj=dataPackage(busitype);
		if (busitype == 'add') {
			submitAdd(testObj);
		} else {
			submitModify(testObj);
		}
	}else{
		 top.layer.alert('请填写完整内容',{icon:7,closeBtn :2}); 
	}
}

//提交新增
function submitAdd(submitPackage){
	 Ajax.service(
 			'TestBO',
 			'addTest', 
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
 			'TestBO',
 			'modifyTest', 
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
