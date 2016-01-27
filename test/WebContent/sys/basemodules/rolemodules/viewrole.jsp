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
var groupCode='${param.groupCode}';

$(function(){	
    //初始化ztree 
	initzTree();
	//读取数据 
	getroledata("<%=user.getUserAccount()%>",groupCode);
		
	//返回页面
	$("#return").click(function(){
		history.go(-1);
	})
});
//加载完成执行 ,获取数据
function getroledata(usercode,groupCode){
  //获取角色数据  	
	Ajax.service(
  		'GroupBO',
  		'getGroupWithAclAuthID', 
  		[groupCode],
  		function(result){  			
      	 	var xml=result[1];     	 	
			xml=xml.replace(/\"/g,"");
      		xml=xml.replace(/<!--[\s\S]*-->/,"");
      		xml=xml.replace(/<?[\s\S]*?>/,"");   
            xml=xml.replace(/>\s?</g,"><");                //新加入 
      		var xmlObj=stringToXml(xml); 			
  			var menus=xmlObj.selectNodes("/menu/menu");
  			var Nodes=[]; 			
  			xmltozTreeJSON(Nodes,menus,null);
  			
  			//加载角色功能树
  			$.fn.zTree.init($("#rolefunctiontree"),setting2,Nodes); 
			//数据填充 
      	 	dataFill(result[0]);
  		},
  		function(data){
  			top.layer.alert('数据异常！', {icon: 4});
  		}
  );
	
}
//数据填充 
function dataFill(objdata){
	  var  seachid;
	  // 开始遍历 
	  for(var p in objdata){
		 if($("span[name='"+p+"']:eq(0)").length!=0){
	  		 $("span[name='"+p+"']").text(objdata[p]);
	  	  }
	  }
}

//设置zTree
function initzTree(){
	$.fn.zTree.init($("#rolefunctiontree"),setting2,null);
}
//角色功能zTree属性配置

var setting2 = {
		edit: {
			enable: true,			
			showRemoveBtn: false,
			showRenameBtn: false
			},
		data: {
				simpleData: {
				enable: true
				}
			},
		callback: {
				onClick:null
				}
	};
//将xml转换成zTreejson数组 
function xmltozTreeJSON(Nodes,menus,parentNode){		
	var jsonNodes="";
	for(var i=0;i<menus.length;i++){
		if(menus[i].nodeName=="#text") continue;
		jsonNodes={id:menus[i].getAttribute("id"),pId:parentNode==null?null:parentNode.getAttribute("id"),name:menus[i].getAttribute("name")};
		Nodes.push(jsonNodes);
		var menuchild=menus[i].childNodes;
		if(menuchild.length>0){
			xmltozTreeJSON(Nodes,menuchild,menus[i]);
			}			
	}
}
//关闭layer的iframe  
function  closeLayer(){
	var index = top.layer.getFrameIndex(window.name); //获取当前窗体索引
	top.layer.close(index); //执行关闭
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
			<tr><td class="View-Title1">角色：</td><td class="View-value1"><span  name="groupName" ></span></td></tr>
			<tr><td class="View-Title1">角色编码：</td><td class="View-value1"><span name="groupCode" ></span></td></tr>
			<tr><td class="View-Title1">角色说明：</td><td class="View-value1"><span  name="groupRemark"></span></td></tr>
			<tr><td class="View-Title1">单位级别：</td><td class="View-value1"><span name="groupOrgClassDisplay" ></span></td></tr>
			<tr><td class="View-Title1">角色类型：</td><td class="View-value1"><span name="groupTypeCodeDisplay" ></span></td></tr>
			<tr style="height:220px;"><td class="View-Title1"  style="vertical-align:top;padding-top:10px;">功能权限：</td>
				<td >
		 			<div style="height:220px;overflow-y:auto;">
						<ul id="rolefunctiontree" class="ztree"></ul>
		    		</div>
	    		</td>
    		</tr>		
		</table>
	</div>	
</body>
</html>
