//回调函数
function callBackFunction(a,b,c){
	alert(a);
	alert(b);
	alert(c);
};
var nowTitle = false;
var userInfo = "";
$(function(){
	ajaxPower();
	//单位
	function unit(){
		var orgCodeArr = "";
		strFilterOrgCode = userOrgCode;
		if(userInfo.orgAuth != null){
			orgCodeArr = userInfo.orgAuth.split("|");
		}
		selectTree("userOrgCode", "org", "mul", callBackFunction,orgCodeArr);
		$("#searchBox>input").remove();
		
		$("#searchBox").append("<input id='unitName' class='shaixuan_txt float-left gray_txt' type='text' value='单位名称'/>");
		$("#searchBox").append("<input id='org' type='button' value='查询' class='bt_query float-left'>");
		
		textTips("unitName","单位名称");
		
		$("#ok").attr("title","org");
		ajaxFindUserData();
	};
	//部门
	function dept(){
		var orgCodeArr = "";
		if(userInfo.orgAuth != null){
			orgCodeArr = userInfo.orgAuth.split("|");
		}
		//截取部门前一段代码
		userDepartmentCode = userDepartmentCode.split("-")[0];
		strFilterOrgCode = userDepartmentCode;
		
		selectTree("userDepartment", "dept", "mul", callBackFunction,orgCodeArr);
		$("#searchBox>input").remove();
		
		$("#searchBox").append("<input id='deptName' class='shaixuan_txt float-left gray_txt' type='text' value='部门名称'/>");
		$("#searchBox").append("<input id='dep' type='button' value='查询' class='bt_query float-left'>");
		
		textTips("deptName","部门名称");
		
		$("#ok").attr("title","dept");
		ajaxFindUserData();
	};
	//单位或部门点击事件
	$("#unitDept").click(function(){
		if($(this).html() == "部门权限"){
			dept();
		}else{
			unit();
		}
	})
	
	//分类
	$("#category").click(function(){
		var classify = "";
		if(userInfo.classifyAuth != null){
			classify = userInfo.classifyAuth.split("|");
		}
		strFilterOrgCode = "001";
		selectTree("userOrgCode", "ac", "mul", callBackFunction,classify);
		$("#searchBox>input").remove();
		
		$("#searchBox").append("<input id='acName' class='shaixuan_txt float-left gray_txt' type='text' value='分类名称'/>");
		$("#searchBox").append("<input id='ac' type='button' value='查询' class='bt_query float-left'>");
		
		textTips("acName","分类名称");
		
		$("#ok").attr("title","cate");
		ajaxFindUserData();
	});
	//资产用途
	$("#asset").click(function(){
		var asset = "";
		if(userInfo.assetPurposeAuth != null){
			asset = userInfo.assetPurposeAuth.split("|");
		}
		$("#searchBox>input").remove();
		selectTree("userOrgCode", "classify", "mul", callBackFunction,asset);
		$("#ok").attr("title","asset");
		ajaxFindUserData();
	});
	
	
	//异步获取当前用户权限级别
	function ajaxPower(){
		Ajax.service(
			"OrgService", 
			"getVOByOrgCode", 
			[userOrgCode], 
			function(data){
				ajaxFindUserData(data);
			}
		);
	}
	//异步查询用户数据
	function ajaxFindUserData(powerData){
		waiting();
		Ajax.service(
			"UserDataAuthBO", 
			"findById", 
			[userid], 
			function(data){
				overWait();
				userInfo = data;
				if(userInfo.onlyReadSelf == 1){
					$("#onlyShowUser").attr("checked",true);
				}
				if(powerData == undefined){
					return;
				}
				if(powerData.orgIsCollect == "YesNo_001"){
					$("#unitDept").html("单位权限");
					$("#unitDept").click();
					$("#ok").attr("title","unit");
				}else{
					$("#unitDept").html("部门权限");
					$("#unitDept").click();
					$("#ok").attr("title","dept");
				}
			}
		);
	}
	//文本框提示
	function textTips(id,text){
		//点击消除框中提示
	   	$("#"+id).focus(function(){
	   		$(this).val('');
	   		$(this).css("color","#333");
	   	});
	   	
	   	//框失去焦点事件
	   	$("#"+id).blur(function(){
	   		if($(this).val() == ''){
	   			$(this).val(text);
	   			$(this).css("color","#C6C6C6");
	   		}
	   	});
   	};
   	//执行查询操作
   	$("[type=button]").live("click",function(){
   		var id = $(this).attr("id");
   	 	if(id == "dep"){
   	 		treeSearchName("dept");
   	 	}else if(id == "org"){
   			treeSearchName("org");
   	 	}else if(id == "ac"){
   			treeSearchName("ac");
   	 	}
   	})
   	
   	//回车监听
	$(document).keydown(function(event){ 
		if(event.keyCode == 13){
			$("[type=button]").click();
		}
	});
   	//关闭窗口
   	$("#cancel").click(function(){
   		cancel();
   	})
   	//只看本用户
   	$("#onlyShowUser").change(function(){
   		var flag = $(this).is(':checked')?1:0;
   		var tipsText = $(this).is(':checked')?"确认":"取消";
   		top.layer.open({
			title:'信息',
			icon: 3,
			closeBtn:2,
			area:[250,150],
			btn:['确定', '取消'],
			content:"是否"+tipsText+"是否只看本用户？",
			yes: function(index){
		   		Ajax.service(
					"UserDataAuthBO", 
					"saveOrsAuthForUser", 
					[userid,flag], 
					function(data){
						top.layer.open({
							title:'信息',
							icon: 1,
							closeBtn:2,
							area:[250,150],
							btn:['确定'],
							content:"只看本用户项保存成功！",
							yes: function(index){
								top.layer.close(index);
							}
						})
					}
				);
   			}
   		})
   	})
   	
   	//取消
   	function cancel(){
   		var parentIndex = top.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
   		top.layer.close(parentIndex); //再执行关闭 
   	}
   	//确认选择权限
   	$("#ok").click(function(){
   		//获取勾选项目的值
   		var selected = getTreeSelectValue();
   		//格式化值
   		selected = strReplace(selected[0]);
   		
   		var title = $(this).attr("title");
   		if( title == "unit"){
   			ajaxSaveOrgAndDeptSelect(selected);
   		}else if(title == "dept"){
   			ajaxSaveOrgAndDeptSelect(selected);
   		}else if(title == "cate"){
   			ajaxSaveCategorySelect(selected);
   		}else if(title == "asset"){
   			ajaxSaveAsset(selected);
   		}
   	})
   	
   	//替换所有逗号，换成竖杠
   	function strReplace(str){
   		return str.replace(/(\,)/g,"|");
   	}
   	//异步保存部门、单位所选权限
   	function ajaxSaveOrgAndDeptSelect(str){
   		top.layer.open({
			title:'信息',
			icon: 3,
			closeBtn:2,
			area:[250,150],
			btn:['确定', '取消'],
			content:"确定进行权限保存操作吗",
			yes: function(index){
		   		Ajax.service(
					"UserDataAuthBO", 
					"saveOrgDeptDataAuthForUser", 
					[userid,str], 
					function(data){
						top.layer.open({
							title:'信息',
							icon: 1,
							closeBtn:2,
							area:[250,150],
							btn:['确定', '返回列表页面'],
							content:"保存成功,需要保留在本页面吗？",
							yes: function(index){
								top.layer.close(index);
							},
							cancel:function(){
								cancel();
							}
						})
					}
				);
		   	}
   		})
   	}
   	//异步保存分类所选权限
   	function ajaxSaveCategorySelect(str){
   		top.layer.open({
			title:'信息',
			icon: 3,
			closeBtn:2,
			area:[250,150],
			btn:['确定', '取消'],
			content:"确定进行权限保存操作吗？",
			yes: function(index){
		   		Ajax.service(
					"UserDataAuthBO", 
					"saveACAuthForUser", 
					[userid,str], 
					function(data){
						top.layer.open({
							title:'信息',
							icon: 1,
							closeBtn:2,
							area:[250,150],
							btn:['确定', '取消'],
							content:"保存成功,需要保留在本页面吗？",
							yes: function(index){
								top.layer.close(index);
							},
							cancel:function(){
								cancel();
							}
						})
					}
				);
		   	}
   		})
   	}
   	//异步保存资产用途
   	function ajaxSaveAsset(str){
   		top.layer.open({
   			title:'信息',
   			icon: 3,
   			closeBtn:2,
   			area:[250,150],
   			btn:['确定', '取消'],
   			content:"确定进行资产用途保存操作吗？",
   			yes: function(index){
   			Ajax.service(
				"UserDataAuthBO", 
				"saveAPAuthForUser", 
				[userid,str], 
				function(data){
					top.layer.open({
						title:'信息',
						icon: 1,
						closeBtn:2,
						area:[250,150],
						btn:['确定', '取消'],
						content:"保存成功,需要保留在本页面吗？",
						yes: function(index){
							top.layer.close(index);
						},
						cancel:function(){
							cancel();
						}
					})
				}
   			);
   		}
   		})
   	}
})
function waiting(){
	$("body").addLoading({msg:"正在努力加载中，请稍等...."})
}
function overWait(){
	$("body").removeLoading();
}
//取消确认
function judge(){
	var result = false;
	top.layer.open({
		title:'信息',
		icon: 3,
		closeBtn:2,
		area:[250,150],
		btn:['确定', '取消'],
		content:"是否放弃修改本页面？",
		yes: function(index){
			result = true;
		}
	})
	return result 
}