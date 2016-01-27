<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!DOCTYPE HTML>
<html> 
<head>
<link href="editHouseUnit.css" rel="stylesheet" type="text/css" />
<style>
.colorblack{color: #000000;}
.notnullTip{color:red;vertical-align: middle;margin-left:3px;}
.View-Title1{width:200px;}
#id_unitAdress{width:638px;}
.EditPanel{padding-left:10px;}
.View-value-Merge{text-align:left;padding-left:10px;}
</style> 
<script> 
//查询pk
var pk="${param.pk}";
//查询unitsyscode
var unitsyscode="${param.unitsyscode}";
//业务类型
var business=STR_VIEW;
//加载完成执行 
$(function(){
	setAppenFrame(); 		//加载附件页面
	getInfo();				//获取信息 
});
//获取信息 
function getInfo(){
	if(pk != ''){
		Ajax.service('HouseUnitBO','findById',[pk],
				function(obj){
					dataFill(obj);			
				},function(){
					top.layer.alert('数据异常 ',{closeBtn :2,icon:5});
				}
		);
	}
	if(unitsyscode != ''){
		Ajax.service('HouseUnitBO','findByUnitSysCode',[unitsyscode],
				function(obj){
					dataFill(obj);			
				},function(){
					top.layer.alert('数据异常 ',{closeBtn :2,icon:5});
				}
		);
	}
}
//数据填充 
function dataFill(obj){
	  // 开始遍历赋值 
	  for(var p in obj){
		  var $element=$("#id_"+p);
		  if($element[0]&&obj[p]!=null){
	  		  //特殊字段处理
	  		  if(p=='assetSysCode'){
	  		 		getAssetInfo(obj[p]);
	  		 		continue;
	  		  }	 
	  		  
			  if(obj[p+"Display"]){
				  $element.html(obj[p+"Display"]);
			  }else{
				  $element.html(obj[p]);
			  }     			  	
		  }
	  }
}
//获取卡片编号
function getAssetInfo(pk){
	Ajax.service(
	  		'AssetRegistBO',
	  		'findById', 
	  		[pk],
	  		function(obj){
	  			$('#id_assetSysCode').html(obj.assetRegAssetName);		
	  		},
	  		function(data){
	  			top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
	  		}
	  	);
}
/**
 * 设置附件
 **/
function setAppenFrame() {    
	var appendFrameObj = document.getElementById('id_iframe_append');
	appendFrameObj.src = contextPath+'/core/componentmodule/upload/listCommonUpload.jsp?busitype=TYYWLX_002&controltype='+business+'&businesscode='+pk;
}
/** 
 * 获取附件数据
 **/
function getAppendData() {
	var appendFrameObj = document.getElementById('id_iframe_append').contentWindow;
	var appendData = appendFrameObj.getAppendData();
	return appendData;
}
</script>
</head>
<body class="edit_body" style="background-color:white;" >	
	<div  id="tabs" class="easyui-tabs clearfloat">	
		
		<div title="基本信息" id="basic" >
			<div class="ViewPanel">		
		           	<div class="editItem">
				   		<div class="editlogo"></div>
		           		<div class="editTitle">基本信息</div>						           			
						<hr  class="editline"/>
		           	</div>
		           	
                    <table class="View-Table">
	                    <tr>
							<td   class="View-Title1">所属单位</td>
							<td   class="View-value1"><span  id="id_orgSysCode"></span></td>
							<td   class="View-Title2">资产名称</td>
							<td   class="View-value2"><span id="id_assetSysCode"></span></td>
						</tr>
						<tr>
							<td   class="View-Title1">物业编号<span class="notnullTip">*</span></td>
							<td   class="View-value1"><span id="id_unitCode"></span></td>
							<td   class="View-Title2">物业名称<span class="notnullTip">*</span></td>
							<td   class="View-value2"><span  id="id_unitName"></span></td>
						</tr>
						<tr>
							<td   class="View-Title1">物业地址<span class="notnullTip">*</span></td>
							<td   class="View-value-Merge" colspan="3"><span id="id_unitAdress"></span></td>
						</tr>
						<tr> 
							<td   class="View-Title1">所在楼层<span class="notnullTip">*</span></td>
							<td   class="View-value1"><span  id="id_floorsNo"></span></td>
							<td   class="View-Title2">物业面积<span class="notnullTip">*</span></td>
							<td   class="View-value2"><span id="id_unitArea"></span></td>					
						</tr>
						<tr>
							<td   class="View-Title1">使用状态<span class="notnullTip">*</span></td>
							<td   class="View-value1"><span  id="id_useLineMD"></span></td>	
							<td   class="View-Title2">委托单位</td>
							<td   class="View-value2"><span id="id_clients"></span></td>	
						</tr> 
						<tr>
							<td   class="View-Title1">物业用途<span class="notnullTip">*</span></td>
							<td   class="View-value1"><span id="id_unitPurpose"></span></td>
							<td   class="View-Title2">物业分类/产权情况<span class="notnullTip">*</span></td>
							<td   class="View-value2"><span id="id_unitClassify"></span></td>
						</tr>
						<tr>
							<td   class="View-Title1">使用人</td>
							<td   class="View-value1"><span  id="id_usePeople"></span></td>	
							<td   class="View-Title2">归口管理人</td>
							<td   class="View-value2"><span id="id_centralizePeople"></span></td>	
						</tr> 
						<tr>
							<td   class="View-Title1">使用部门</td>
							<td   class="View-value1"><span  id="id_useDept"></span></td>
							<td   class="View-Title2">归口管理部门</td>
							<td   class="View-value2"><span id="id_centralizeDept"></span></td>
						</tr>
						<tr>
							<td   class="View-Title1">是否配备消防栓及消防喷淋系统</td>
							<td   class="View-value1"><span  id="id_ifFirePlug"></span></td>
							<td   class="View-Title2">校区</td>
							<td   class="View-value2"><span id="id_campus"></span></td>
						</tr>
						<tr>
							<td   class="View-Title1">备注</td>
							<td   class="View-value-Merge" colspan="3"><span  id="id_unitRemark" fieldname="unitRemark"></span></td>
						</tr>
			 		</table> 
					 <div style="height:50px;">
					 </div>                           		
			</div>
		</div>
		
		
		<div title="附件" id="attached">
			<div class="pd10">
			   <div class="editItem">
			   		<div class="editlogo"></div>
	           		<div class="editTitle">资产附件</div>						           			
					<hr  class="editline"/>
	           	</div>
	            <div   class="editTips"></div> 
	
				<div style="margin-top:8px;margin-left:30px;">
					<iframe id='id_iframe_append' frameborder='no' border='0'  style='width:760px;height:350px'></iframe>
				</div>	
			</div>	
	    </div>   
	     
	</div>
	</body>
</html>

