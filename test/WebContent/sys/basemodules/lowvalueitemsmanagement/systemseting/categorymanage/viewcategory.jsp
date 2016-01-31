<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
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
		Ajax.service('CategoryManagementBO','findById',[pk],
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
</style>
</head> 
<body style="view_body"> 
   	<div class="ViewPanel">
		<table class="Edit-Card-Table">
			<tr><td class="View-Title1">类目名称：</td><td class="View-value1"><span  name="categoryName" ></span></td></tr>
			<tr><td class="View-Title1">备注：</td><td class="View-value1"><span name="categoryRemark" ></span></td></tr>
		</table>
	</div>	
</body>
</html>
