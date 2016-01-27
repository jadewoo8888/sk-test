			//部门
	  		var saveDepartmentCode = "";
	  		var saveOrgCode = "";
	  		var password = "";
	  		var strFilterOrgCode = "";
	  		
	  		$(function(){
	  			initComFunc();
	  			var obj = new Object();
	  			//如果是修改用户信息，否则读取数据
	  			if(saveFlag !='null'){
	  				ajaxRead(userInfo);
	  				$(".pd10_title_span").html("修改用户")
  				}else{
  					$("input[name = userOrgCode]").val(top.strFilterOrgCodeDisplay);
					$("#userDepartmentCode").val("");
  					saveOrgCode = top.strFilterOrgCode;
  					strFilterOrgCode = saveOrgCode;
  				}
	  				
	  			$.extend($.fn.validatebox.defaults.rules, {    
		  			//用户名输入长度限制
			      	length: {    
				        validator: function(value, param){    
			            	return (value.length >= param[0]) && (value.length <= param[1]);   
				        },    
				        message: '长度不得少于{0}位或多于{1}位'   
				    },
		  			//用户名特殊字符判断
			      	userReg: {    
				        validator: function(value, param){    
			            	return /^([\u4E00-\u9FA5]|\w)*$/.test(value);   
				        },    
				        message: '用户名不能带特殊字符'   
				    },
				    //用户名首字母
				    headStr: {    
				        validator: function(value, param){   
				        	var m_reg = new RegExp(param[0]);
				        	return m_reg.test(value);
				        },    
				        message: '必须以字母开头'   
				    },
				    //手机号码位数判断
				    phoneNumber: {    
				        validator: function(value, param){   
				        	var reg = /^1[3|4|5|8|9]\d{9}$/;  
           					return reg.test(value); 
				        },    
				        message: '手机号码有误'   
				    },
				    // 确认密码 
				    verifyPassword: {    
				        validator: function(value, param){   
				        	return value == $(param[0]).val(); 
				        },    
				        message: '密码不一致'   
				    }
				});  
	  			
	  		
	  			//数据验证
	  			$("[name='userOrgCode']").validatebox({
	  				required:true,
	  				missingMessage:'单位必填!'
	  			});
	  			$("[name='userName']").validatebox({
	  				required:true,
	  				missingMessage:'名称必填!'
	  			});
	  			$("[name='userAccount']").validatebox({
	  				required:true,
	  				missingMessage:'账号必填!',
					validType:["userReg","length[4,25]"]
	  			});
	  			$("[name='userPassword']").validatebox({
	  				required:true,
	  				missingMessage:'密码必填!'
	  			});
	  			$("[name='verifyPassword']").validatebox({
	  				required:true,
	  				missingMessage:'确认密码必填!',
	  				validType:"verifyPassword[\"[name='userPassword']\"]"
	  			});
	  			$("[name='email']").validatebox({
	  				validType:'email'
	  			});
	  			$("[name='phoneNumber']").numberbox({
	  				validType:'phoneNumber'
	  			});
	  			$("[name='userDepartmentCode']").validatebox({
	  				required:true,
	  				missingMessage:'请选择一个部门'
	  			});
	  			
	  			// 触发提交事件
	  			$("#submit").click(function(){
	  				// 验证通过则返回为true
	  				if($("#ff").form("validate")){
	  			        changeBtnDisabled(true);
	  			        $("body").addLoading({msg:"正在验证信息，请稍等..."});
  						//修改
						if(saveFlag!='null'){
							userInfo = userFactory(obj);
							if(password != userInfo.userPassword){
								userInfo.userPassword = hex_md5(userInfo.userPassword);
							}
							ajaxModify(userInfo);
						//保存
						}else{
							userInfo = userFactory(obj);
							//加密密码
							userInfo.userPassword = hex_md5(userInfo.userPassword);
							userInfo.userCheckFlag = "SJZT_1";
							ajaxSave(userInfo);
						}
	  				}
	  			});
	  			
	  			//返回页面
	  			$("#return").click(function(){
	  				history.back();
	  			});
	  			
	  			//选择部门树
	  			$("#department").click(function(){
	  				var treeOption = {callBackFunction:departmentCallBack};
	  				top.deptTree(treeOption);
	  			}); 
	  			 
	  			//选择角色
				$('#userGroupCode').combobox({
					onBeforeLoad: function(param){
						if(strFilterOrgCode != "")
							ajaxRole(); 
					},
					valueField:'groupCode',
					textField:'groupName',
					width:220,
					height:24,
					panelHeight:100,
					editable:false,
					onSelect:groupComSelectFunc
				});
				
				//异步请求保存数据
				function ajaxSave(obj){
					top.layer.open({
						title:'信息',
						icon: 3,
						closeBtn:2,
						area:[250,150],
						btn:['确定', '取消'],
						content:"确定要进行保存操作？",
						yes: function(index){
							Ajax.service(
								'UserBO',
								'saveUser', 
								[obj],
								function(data){
									changeBtnDisabled(false);
									$("body").removeLoading();
									if(data=="null"){
										top.layer.alert('保存成功！',{icon: 1, closeBtn:2});
										location.href="/gdczsam/sys/basemodules/usermodules/listUserManager.jsp?menuid=MENU_01_04_01";
									}
									else
										top.layer.alert('保存失败',{icon: 2, closeBtn:2});
								}
							);
						},
						cancel:function(){
							changeBtnDisabled(false);
							$("body").removeLoading();
						}
					});
				}
				
				//角色加载
				function ajaxRole(){
					Ajax.service(
						'OrganizationBO',
						'findByProperty', 
						["orgCode",strFilterOrgCode],
						function(roleLevel){
							ajaxGetGroup(roleLevel);
						}
					);
				}
				//查询角色
				function ajaxGetGroup(roleLevel){
					Ajax.service(
							'GroupBO',
							'findAll', 
							[],
							function(roles){
								var result = showGroup(roleLevel,roles);
								$('#userGroupCode').combobox("loadData",result);
								if(saveFlag == "null"){
									$('#userGroupCode').combobox("select",result[0].groupCode);
								}
							}
					);
				}
							
				//异步请求读取数据
				function ajaxRead(id){
					Ajax.service(
						'UserBO',
						'findById', 
						[id],
						function(data){
							obj = data;
							$.each(data,function(i,k){
								//电话号码特殊处理
								if(i == "phoneNumber"){
									$("#phoneNumber").numberbox('setValue', parseInt(k));
								}else if(i == "userGroupCode"){
									//角色特殊处理
									$("#"+i).combobox("setValue",k);
								}
								else if(i == "defaultHomePage"){
									$("#"+i).combobox("setValue",k);
									getDefaultHomePageData(data.userGroupCode);
								}else if(i == "userDepartmentCode"){
									saveDepartmentCode = k;
								}else if(i == "userDepartmentCodeDisplay"){
									$("#userDepartmentCode").val(k);
								}else if(i == "userOrgCodeDisplay"){
									$("#userOrgCode").val(k);
								}else if(i == "userOrgCode"){
									strFilterOrgCode = k;
								}else{
									//其余规则
									$('input[name='+i+']').val(k);
								}
							})
							password = $("input[name = userPassword]").val();
							$("[name=verifyPassword]").val(password);
							$("[name=userAccount]").attr("readonly","readonly");
							$("[name=userAccount]").addClass("disableText");
							saveOrgCode = obj.userOrgCode;
							$('#userGroupCode').combobox("reload");
							var aa = $('#userGroupCode').combobox("getValue");
							$('#userGroupCode').combobox("select",aa);
							
						}
					);
				}
				
				//异步请求修改数据
				function ajaxModify(obj){
					top.layer.open({
						title:'提示',
						icon: 3,
						closeBtn:2,
						area:[250,150],
						btn:['确定', '取消'],
						content:"确定要进行保存操作？",
						yes: function(index){
							Ajax.service(
								'UserBO',
								'modify', 
								[obj],
								function(data){
									changeBtnDisabled(false);
									$("body").removeLoading();
									top.layer.alert('保存成功！',{icon: 1, closeBtn:2});
									location.href="/gdczsam/sys/basemodules/usermodules/listUserManager.jsp?menuid=MENU_01_04_01";
								},
								function(){
									changeBtnDisabled(false);
									$("body").removeLoading();
									top.layer.alert('保存失败',{icon: 2, closeBtn:2});
								}
							);
						},
						cancel:function(){
							changeBtnDisabled(false);
							$("body").removeLoading();
						}
					})
				}
				
				/*新增用户*/
				function userFactory(obj){
					obj.userAccount = $("input[name = userAccount]").val();
					obj.userName = $("input[name = userName]").val();
					obj.userOrgCode = saveOrgCode;
					obj.userPassword = $("input[name = userPassword]").val();
					obj.userGroupCode = $("input[name = userGroupCode]").val();
					obj.defaultHomePage = $("#defaultHomePage").combobox("getValue");
					obj.userDepartmentCode = saveDepartmentCode;
					obj.email = $("input[name= email]").val();
					obj.phoneNumber = $("input[name = phoneNumber]").val();
					obj.userRemark = $("input[name = userRemark]").val();
					return obj;
				}
				
				//部门树回调函数
				function departmentCallBack(code,codeAndName){
					saveDepartmentCode = code;
					$("#userDepartmentCode").val(codeAndName);
				}
	  		});
	  		
	  		
	/**
	 * 角色combox选择事件处理方法
	 **/  		
	function groupComSelectFunc(record) {
		$("#defaultHomePage").combobox("clear");
		getDefaultHomePageData(record.groupCode);
	}   
	
			
	/**
	 * 根据选中的角色类型获取相应的主页页面下拉数据
	 **/		
	function getDefaultHomePageData(groupCode) {
		Ajax.service(
			'GroupTypeBO',
			'getHomePageInfo', 
			[groupCode],
			getDefaultHomePageDataSuccFunc
		);
	}
	
	/**
	 * 获取主页页面下拉数据成功回调函数
	 **/
	function getDefaultHomePageDataSuccFunc(result) {
		$('#defaultHomePage').combobox("loadData",result);
		$('#defaultHomePage').removeClass("validatebox-invalid"); 	
	}	  	
	
	function initComFunc() {
		homePageComLoadSuccFunc();
		$("#defaultHomePage").combobox({onLoadSuccess:homePageComLoadSuccFunc});
	}

	function homePageComLoadSuccFunc() {
		$(".combo input").removeClass("validatebox-invalid"); 
	}	
	//返回要显示的角色组
	function showGroup(roleLevel,roles){
		var returnResult = [];
		var levelMd = roleLevel[0].assetMrgLevelMD;
		//使用单位
		if(levelMd == "ZCGLJC_004"){
			$.each(roles,function(i,v){
				var groupCode = v.groupCode.substring(0,1);
				if(groupCode == "3" || groupCode == "4"){
					returnResult[returnResult.length] = v;
				}
			})
		//财政单位
		}else if(levelMd == "ZCGLJC_001" || levelMd == "ZCGLJC_002" || levelMd == "ZCGLJC_005"){
			$.each(roles,function(i,v){
				var groupCode = v.groupCode.substring(0,1);
				if(groupCode != "0"){
					returnResult[returnResult.length] = v;
				}
			})
		//主管单位
		}else{
			$.each(roles,function(i,v){
				var groupCode = v.groupCode.substring(0,1);
				if(groupCode != "0" && groupCode != "1"){
					returnResult[returnResult.length] = v;
				}
			})
		}
		return returnResult;
	}