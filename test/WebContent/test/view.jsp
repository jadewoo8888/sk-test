<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>
<%@ page language="java" import="framework.modules.user.domain.User"%>
<%@ page language="java" import="framework.sys.constant.SessionConstants"%>
<%
User user =(User)session.getAttribute(SessionConstants.OPERATEUSER);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<script type="text/javascript" src="${contextPath}/core/js/tools/xmlstringtrans.js" ></script>
<script type="text/javascript">
//查询pk
var pk="${param.pk}";

$(function(){	
	//读取数据 
	getInfo();
		
	//返回页面
	$("#return").click(function(){
		history.go(-1);
	})
});

//获取信息 
function getInfo(){
	if(pk != ''){
		Ajax.service('TestBO','findById',[pk],
				function(obj){
					dataFill(obj);			
				},function(){
					top.layer.alert('数据异常 ',{closeBtn :2,icon:5});
				}
		);
	}
}
//数据填充 
function dataFill(objdata){
	// 开始遍历 
	  for(var p in objdata){
		 if($("span[name='"+p+"']:eq(0)").length!=0){
	  		 $("span[name='"+p+"']").text(objdata[p]);
	  	  }
	  }
}
</script>
<style type="text/css">
body{ width:100%;height:100%;}
.functionTree{
 	margin-top:10px;
 	height:200px;
 	overflow:auto;
 }
</style>
</head> 
<body style="view_body"> 
   	<div class="ViewPanel">
		<table class="Edit-Card-Table">
			<tr><td class="View-Title1">姓名：</td><td class="View-value1"><span  name="name" ></span></td></tr>
			<tr><td class="View-Title1">性别：</td><td class="View-value1"><span name="sex" ></span></td></tr>
		</table>
	</div>	
</body>
</html>
