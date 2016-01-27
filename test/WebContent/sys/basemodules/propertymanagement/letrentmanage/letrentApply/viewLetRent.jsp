<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!DOCTYPE HTML>
<html> 
<head>
<link href="editLetRent.css" rel="stylesheet" type="text/css" />
<link href="${contextPath}/sys/basemodules/approval/approvalmodule/ApprovalModule.css" rel="stylesheet" type="text/css" />
<style>
.colorblack{color: #000000;}
.notnullTip{color:red;vertical-align: middle;margin-left:3px;}
.View-Title1{width:200px;}
.View-Title2{width:200px;}
.editTips{text-align:left;}
#id_unitAdress{width:638px;}
.EditPanel{padding-left:10px;}
</style> 
<script src="${contextPath}/sys/basemodules/approval/approvalmodule/ApprovalModule.js" type="text/javascript"></script>
<script> 
//查询pk
var pk="${param.pk}";
//业务类型
var business=STR_VIEW;
//加载完成执行 
$(function(){
	setAppenFrame(); 		//加载附件页面
	getInfo();				//获取信息 
});
//获取信息 
function getInfo(){
	Ajax.service('LetRentBO','findById',[pk],
			function(obj){
				dataFill(obj);	
				
				//初始化审批信息
				var apprvalOption = {
					funcType:"DrawApprovalBar", 
					approvalBarDivID:"id_div_approvaloption", 
					isReadonly:true, 
					busiDeptCode:"", 
					busiType:"SPYWLX_001", 
					busiPK:obj.pk, 
					busiOrgCode:obj.orgSysCode, 
					menuId:"MENU_01_06_02_02"
				};
				var am = new ApprovalModule(apprvalOption);
			},function(){
				top.layer.alert('数据异常 ',{closeBtn :2,icon:5});
			}
	);
}
//数据填充 
function dataFill(obj){
	  // 开始遍历赋值 
	  for(var p in obj){
		  if(p=='ifFirePlug'){
			  if(obj[p]=='YesNo_001'){
				  $('#id_ifFirePlug').html('是');
			  }else{
				  $('#id_ifFirePlug').html('否');
			  }
			  continue;
		  }
		  
		  var $element=$("#id_"+p);
		  if($element[0]&&obj[p]!=null){	
				  if(obj[p+"Display"]){
					  $element.html(obj[p+"Display"]);
				  }else{
					  $element.html(obj[p]);
				  }     			  	
		  }
	  }
}
/**
 * 设置附件
 **/
function setAppenFrame() {    
	var appendFrameObj = document.getElementById('id_iframe_append');
	appendFrameObj.src = contextPath+'/core/componentmodule/upload/listCommonUpload.jsp?busitype=TYYWLX_003&controltype='+business+'&businesscode='+pk;
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
		           		<div class="editTitle">出租物业基本情况</div>						           			
						<hr  class="editline"/>
		           	</div>
		           	
                    <table class="View-Table">
                       		<tr>
								<td   class="View-Title1">申请单位</td>
								<td   class="View-value1"><span  id="id_orgSysCode" ></span></td>
								<td   class="View-Title2">申请日期</td>
								<td   class="View-value2"><span id="id_letRentDate" ></span></td>
							</tr>
							<tr>
								<td   class="View-Title1">物业编号</td>
								<td   class="View-value1"><span id="id_unitCode"></span></td>
								<td   class="View-Title2">物业名称</td>
								<td   class="View-value2"><span  id="id_unitName" ></span></td>
							</tr>
							<tr> 
								<td   class="View-Title1">物业分类</td>
								<td   class="View-value1"><span  id="id_unitClassify" ></span></td>
								<td   class="View-Title2">物业面积</td>
								<td   class="View-value2"><span id="id_unitArea"></span></td>					
							</tr>
							<tr>
								<td   class="View-Title1">物业地址</td>
								<td   class="View-value1"><span  id="id_unitAdress"></span></td>	
								<td   class="View-Title2">是否配备消防栓及消防喷淋系统</td>
								<td   class="View-value2"><span id="id_ifFirePlug"></span></td>	
							</tr> 
			 		</table> 
			 		
                    <div class="editItem">
				   		<div class="editlogo"></div>
		           		<div class="editTitle">出租物业信息</div>						           			
						<hr  class="editline"/>
		           	</div>
                    <div   class="editTips">左边为拟招租主要内容，右边为原租赁情况</div> 	
                    <table class="View-Table">
                       		<tr>
								<td   class="View-Title1">租金起步价(元/月/平方米)</td>
								<td   class="View-value1"><span  id="id_letUpPrice"></span></td>
								<td   class="View-Title2">租金起步价(元/月/平方米)</td>
								<td   class="View-value2"><span id="id_formerLetUpPrice"></span></td>
							</tr>
							<tr>
								<td   class="View-Title1">招租方式</td>
								<td   class="View-value1"><span id="id_letRentWay" ></span></td>
								<td   class="View-Title2">期末租金 (元/月/平方米)</td>
								<td   class="View-value2"><span id="id_formerLastRent"></span></td>
							</tr>
							<tr> 
								<td   class="View-Title1">租赁期限(月)</td>
								<td   class="View-value1"><span  id="id_letTerm"></span></td>
								<td   class="View-Title2">租赁起止日</td>
								<td   class="View-value2">
										<span id="id_formerStartDate" style="width:85px"></span>
										<span style="display:inline-block;width:20px;text-align:center;">至</span>
										<span id="id_formerRealEndDate" style="width:85px"></span>
								</td>					
							</tr>
							<tr>
								<td   class="View-Title1">月租金递增率(%)</td>
								<td   class="View-value1"><span  id="id_incrRate"></span></td>	
								<td   class="View-Title2">月租金递增率(%)</td>
								<td   class="View-value2"><span id="id_formerIncrRate"></span></td>	
							</tr>
							<tr>
								<td   class="View-Title1">递增周期(月)</td>
								<td   class="View-value1"><span  id="id_incrRound"></span></td>	
								<td   class="View-Title2">递增周期(月)</td>
								<td   class="View-value2"><span id="id_formerIncrRound"></span></td>	
							</tr> 
							<tr>
								<td   class="View-Title1">租赁保证金(几倍月租金)</td>
								<td   class="View-value1"><span  id="id_rentMargin"></span></td>	
								<td   class="View-Title2">租赁保证金(几倍月租金)</td>
								<td   class="View-value2"><span id="id_formerRentMargin"></span></td>	
							</tr>
							<tr>
								<td   class="View-Title1">竟租保证金</td>
								<td   class="View-value1"><span  id="id_auctionMargin"></span></td>	
								<td   class="View-Title2">竟租保证金</td>
								<td   class="View-value2"><span id="id_formerAuctionMargin"></span></td>	
							</tr>
							<tr>
								<td   class="View-Title1">免租金装修期(月)</td>
								<td   class="View-value1"><span  id="id_decorateperiod"></span></td>	
								<td   class="View-Title2">免租金装修期(月)</td>
								<td   class="View-value2"><span id="id_formerDecorateperiod"></span></td>	
							</tr>
							<tr>
								<td   class="View-Title1">拟出租用途</td>
								<td   class="View-value1"><span  id="id_planLetPurpose"></span></td>	
								<td   class="View-Title2">原出租用途</td>
								<td   class="View-value2"><span id="id_formerLetPurpose" ></span></td>	
							</tr>
							<tr>
								<td   class="View-Title1">竞租资格条件</td>
								<td   class="Edit-Input-Merge" colspan="3"><span  id="id_qualification"></span></td>
							</tr>
							<tr>
								<td   class="View-Title1">物业经营情况及拟定租金起步价的依据</td>
								<td   class="View-value-Merge" colspan="3"><span id="id_letRentGist" fieldname="letRentGist"></span></td>
							</tr>   
					 </table>    		
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
	    
	    <div title="审批意见" id="id_div_approvaloption">

	    </div>  
	    
	    <div title="审批路线图" id="approval_img">

	    </div> 
	</div>
	</body>
</html>

