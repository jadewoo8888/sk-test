	
	//浏览器宽度调整触发
	window.onresize = function(){
		setTimeout(windowResize,0);
	};
	//调整窗口大小
	function windowResize(){
		$(".footer").css("top",$(document).height()-60);
	}
	//提交请求
	function submitAjax(){
		//禁用登陆按钮
		$("#denglu_a").attr("disabled","disabled");
		var username = $("input[name = 'userAccount']").val();
		var password = $("input[name = 'userPassword']").val();
		var validate = $("input[name = 'verifyCode']").val();
		
		if(username == "用户名"){
			$("#errorInfo").html("用户名不允许空值！").css({'color':'red','float':'right'});
			$("#denglu_a").removeAttr("disabled");
			$("input[name = 'userAccount']").focus();
			return;
		}else if(password == ""){
			$("#errorInfo").html("密码不允许空值！").css({'color':'red','float':'right'});
			$("#denglu_a").removeAttr("disabled");
    		$("input[name = 'showPassword']").focus();
			return;
		}else if(validate == "验证码" && sessionVC != ''){
			if(validate.length <4){
				$("#errorInfo").html("验证码不得小于4位").css({'color':'red','float':'right'});
			}else{
				$("#errorInfo").html("验证码不允许空值！").css({'color':'red','float':'right'});
			}
			$("#denglu_a").removeAttr("disabled");
			$("input[name = 'verifyCode']").focus();
			return;
		}
		
		//加密密码
		password = hex_md5(password);
		
		Ajax.service(
			'idUserLogin',
			'login',
			[{ userAccount:username,userPassword:password,verifyCode:validate}],
			function(data){
				if(data.type == 0){
					$("#denglu_a").removeAttr("disabled");
					setCookie();
					location="core/mainframe/mainframe.jsp";
				}else if(data.type == 2){
					//显示验证码
					$(".yanzheng").css("display","block");
					$(".yanzheng").val("验证码");
					$(".yanzheng>a").click();
					$("#denglu_a").removeAttr("disabled");
				}else{
					//把错误信息打印到页面
					$("#errorInfo").html(data.content).css({'color':'red','float':'right'});
					$("#denglu_a").removeAttr("disabled");
				}
			},function(){
				top.layer.alert('登陆发生异常，请稍后再试',{closeBtn :2,icon:7});
				$("#denglu_a").removeAttr("disabled");
			}
		);
		
	}
	
	//生成验证码
	function validateCode(){
		Ajax.service(
			'idUserLogin',
			'genVerifyCode',
			["validateImg"]
		);
	}
    
   	//如果选中记住密码则保存信息，否则删除cookie
    function setCookie(){
		if($(":checkbox").attr('checked') == 'checked'){
			var exp = 30;
	    	
			saveUserName(exp);
	        saveCheck(exp);
		}else{
			$.cookie('un',null);
			$.cookie('userMemoryCheck',null);
		}
    }
    
    //保存用户名
    function saveUserName(exp){
        var userName ='';
        //if(document.myform.userAccount.value != null)
        if($("input[name=userAccount]").val() != null)
        	userName = $("input[name=userAccount]").val();
        $.cookie('un', userName , { expires: exp });
    }
    
    //保存选中状态
    function saveCheck(exp){
        var checkbox =false;
        if($(":checkbox").attr('checked') == 'checked')
        	checkbox = true;
        $.cookie('userMemoryCheck', checkbox , { expires: exp });
    }
    
    //获取cookie信息
	function getCookie(key,cookie){
		var r=new RegExp(key+'=([^;]+)','i');
		var m=r.exec(cookie);
		if(m)return m[1];
		return '';
	}
	
	//回显cookie信息
    function show(){
        var strCookie = document.cookie;
        var userName ;
        var checkbox = $.cookie('userMemoryCheck');;
        if(checkbox == 'true'){
            userName = $.cookie('un');
            $("input[name=userAccount]").val(userName);
            $("input[name=select]").attr("checked",true);
            $("input[name = 'userAccount']").css("color","#333");
            //document.myform.userAccount.value = userName;
            //document.myform.select.checked = checkbox;
        }
    }
    
    //载入页面自动执行函数
    $(function(){
    	
    	//点击消除文本框中用户名提示
        $("input[name = 'userAccount']").focus(function(){
            	var username = $(this).val();
            	if(username == "用户名"){
            		$("input[name=userAccount]").val('');
            		//document.myform.userAccount.value = '';
            		$(this).css("color","#333");
            	}
        }) ;
    	
    	//点击消除文本框中密码提示
    	$("input[name = 'showPassword']").focus(function(){
    		$("input[name = 'showPassword']").hide();
    		$("input[name = 'userPassword']").show();
    		$("input[name = 'userPassword']").val('');
    		$("input[name = 'userPassword']").focus();
    		$("input[name = 'userPassword']").css("color","#333");
    	});
    	
    	//点击消除验证码框中提示
    	$(".yanzhengma").focus(function(){
    		$(this).val('');
    		$(this).css("color","#333");
    	});
    	
    	//密码框失去焦点事件
    	$("input[name = 'userPassword']").blur(function(){
    		if($(this).val() == ''){
    			$("input[name = 'showPassword']").show();
    	    	$("input[name = 'userPassword']").hide();
    	    	$("input[name = 'showPassword']").val('密码');
    	    	$("input[name = 'showPassword']").css("color","#C6C6C6");
    		}
    	});
    	
    	//用户名框失去焦点事件
    	$("input[name = 'userAccount']").blur(function(){
    		if($(this).val() == ''){
    			$(this).val('用户名');
    			$(this).css("color","#C6C6C6");
    		}
    	});
    	
    	//验证码框失去焦点事件
    	$(".yanzhengma").blur(function(){
    		if($(this).val() == ''){
    			$(this).val('验证码');
    			$(this).css("color","#C6C6C6");
    		}
    	});
    	
    	//鼠标经过登陆按钮变色
		$("#denglu_a").mouseover(function(){
			$("#denglu_a").css("background-color","#3fc2ee");
		});
		
		//鼠标离开登陆按钮还原色
		$("#denglu_a").mouseout(function(){
			$("#denglu_a").css("background-color","#00afe8");
		});
		
		//回车点击登录按钮
		$(document).keydown(function(event){ 
			var loginState = $("#denglu_a").attr("disabled");
			if(event.keyCode == 13 && loginState != "disabled"){
				$("#denglu_a").click();
			}
		});
		
		//如果监测到需要验证码，则显示验证码框
		if(sessionVC!=""){
			$(".yanzheng").css("display","block");
			validateCode();
		}
		//调整底部footer条的距离
		$(".footer").css("top",$(document).height()-60);
		
	})
