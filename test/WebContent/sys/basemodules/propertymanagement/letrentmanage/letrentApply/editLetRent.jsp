<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!DOCTYPE HTML>
<html> 
<head>
<link href="editLetRent.css" rel="stylesheet" type="text/css" />
<script src="editLetRent.js" type="text/javascript"></script>
<script>
//业务类型
var business="${param.business}";
//节点code
var pk="${param.pk}";
//物业pk
var unitpk="${param.unitpk}";
//招租方式
var data_letRentWay=${json:classify("STD_ZZFS")};
//拟出租用途
var data_planLetPurpose=${json:classify("STD_DYYT")};
//是、否 
var data_YesNo=${json:classify("STD_YesNo")};
//物业分类
var data_unitClassify=${json:classify("STD_DYFL")};

</script>
</head>
<body class="edit_body" style="background-color:white;" >
	<div id="id_div_desc" class="head">
		<span class="head-title"></span>
		<span class="head-tx"></span>
	</div>
	
	<div  id="tabs" class="easyui-tabs clearfloat">	
		<div title="基本信息" id="basic" > 
			<div class="EditPanel" id="EditPanel" >			
		           	<div class="editItem">
				   		<div class="editlogo"></div>
		           		<div class="editTitle">出租物业基本情况</div>						           			
						<hr  class="editline"/>
		           	</div>
                    <div   class="editTips">(以下用<span class="notnullTip" style="margin-right:3px;">*</span>标记为必填信息)</div> 	
                       <table cellSpacing=1 cellPadding=0>
                       		<tr>
								<td   class="Edit-Title1">申请单位</td>
								<td   class="Edit-Input1"><input  id="id_orgSysCode" fieldname="orgSysCode"  class="disableText" readonly="readonly"/></td>
								<td   class="Edit-Title2">申请日期<span class="notnullTip">*</span></td>
								<td   class="Edit-Input2"><input id="id_letRentDate" fieldname="letRentDate" /></td>
							</tr>
							<tr>
								<td   class="Edit-Title1">物业编号</td>
								<td   class="Edit-Input1"><input id="id_unitCode" fieldname="unitCode" /></td>
								<td   class="Edit-Title2">物业名称</td>
								<td   class="Edit-Input2"><input  id="id_unitName" fieldname="unitName" class="disableText" readonly="readonly"/></td>
							</tr>
							<tr> 
								<td   class="Edit-Title1">物业分类</td>
								<td   class="Edit-Input1"><input  id="id_unitClassify" fieldname="unitClassify" class="disableText" readonly="readonly"/></td>
								<td   class="Edit-Title2">物业面积</td>
								<td   class="Edit-Input2"><input id="id_unitArea" fieldname="unitArea" class="disableText" readonly="readonly"/></td>					
							</tr>
							<tr>
								<td   class="Edit-Title1">物业地址</td>
								<td   class="Edit-Input1"><input  id="id_unitAdress" fieldname="unitAdress" class="disableText" readonly="readonly"/></td>	
								<td   class="Edit-Title2">是否配备消防栓及消防喷淋系统</td>
								<td   class="Edit-Input2"><input id="id_ifFirePlug" fieldname="ifFirePlug" class="disableText" readonly="readonly"/></td>	
							</tr> 
					 </table> 
					 
					<div class="editItem">
				   		<div class="editlogo"></div>
		           		<div class="editTitle">出租物业信息</div>						           			
						<hr  class="editline"/>
		           	</div>
                    <div   class="editTips">左边为拟招租主要内容，右边为原租赁情况</div> 	
                                           <table cellSpacing=1 cellPadding=0>
                       		<tr>
								<td   class="Edit-Title1">租金起步价(元/月/平方米)<span class="notnullTip">*</span></td>
								<td   class="Edit-Input1"><input  id="id_letUpPrice" fieldname="letUpPrice" validType="length[1,15]" invalidMessage="不能超过15个字符" class="easyui-validatebox"/></td>
								<td   class="Edit-Title2">租金起步价(元/月/平方米)</td>
								<td   class="Edit-Input2"><input id="id_formerLetUpPrice" fieldname="formerLetUpPrice" class="disableText" readonly="readonly"/></td>
							</tr>
							<tr>
								<td   class="Edit-Title1">招租方式<span class="notnullTip">*</span></td>
								<td   class="Edit-Input1"><input id="id_letRentWay" fieldname="letRentWay" /></td>
								<td   class="Edit-Title2">期末租金 (元/月/平方米)</td>
								<td   class="Edit-Input2"><input  id="id_formerLastRent" fieldname="formerLastRent" maxlength="25" class="disableText" readonly="readonly"/></td>
							</tr>
							<tr> 
								<td   class="Edit-Title1">租赁期限(月)<span class="notnullTip">*</span></td>
								<td   class="Edit-Input1"><input  id="id_letTerm" fieldname="letTerm" validType="length[1,5]" invalidMessage="不能超过5个字符" class="easyui-validatebox"/></td>
								<td   class="Edit-Title2">租赁起止日</td>
								<td   class="Edit-Input2">
										<input id="id_formerStartDate" fieldname="formerStartDate" class="disableText" readonly="readonly" style="width:85px"/>
										<span style="display:inline-block;width:20px;text-align:center;">至</span>
										<input id="id_formerRealEndDate" fieldname="formerRealEndDate" class="disableText" readonly="readonly" style="width:85px"/>
								</td>					
							</tr>
							<tr>
								<td   class="Edit-Title1">月租金递增率(%)<span class="notnullTip">*</span></td>
								<td   class="Edit-Input1"><input  id="id_incrRate" fieldname="incrRate"/></td>	
								<td   class="Edit-Title2">月租金递增率(%)</td>
								<td   class="Edit-Input2"><input id="id_formerIncrRate" fieldname="formerIncrRate"  maxlength="25" class="disableText" readonly="readonly"/></td>	
							</tr>
							<tr>
								<td   class="Edit-Title1">递增周期(月)<span class="notnullTip">*</span></td>
								<td   class="Edit-Input1"><input  id="id_incrRound" fieldname="incrRound" validType="length[1,5]" invalidMessage="不能超过5个字符" class="easyui-validatebox"/></td>	
								<td   class="Edit-Title2">递增周期(月)</td>
								<td   class="Edit-Input2"><input id="id_formerIncrRound" fieldname="formerIncrRound"  maxlength="25" class="disableText" readonly="readonly"/></td>	
							</tr> 
							<tr>
								<td   class="Edit-Title1">租赁保证金(几倍月租金)<span class="notnullTip">*</span></td>
								<td   class="Edit-Input1"><input  id="id_rentMargin" fieldname="rentMargin" validType="length[1,15]" invalidMessage="不能超过15个字符" class="easyui-validatebox""/></td>	
								<td   class="Edit-Title2">租赁保证金(几倍月租金)</td>
								<td   class="Edit-Input2"><input id="id_formerRentMargin" fieldname="formerRentMargin"  maxlength="25" class="disableText" readonly="readonly"/></td>	
							</tr>
							<tr>
								<td   class="Edit-Title1">竟租保证金<span class="notnullTip">*</span></td>
								<td   class="Edit-Input1"><input  id="id_auctionMargin" fieldname="auctionMargin" validType="length[1,15]" invalidMessage="不能超过15个字符" class="easyui-validatebox"/></td>	
								<td   class="Edit-Title2">竟租保证金</td>
								<td   class="Edit-Input2"><input id="id_formerAuctionMargin" fieldname="formerAuctionMargin"  maxlength="25" class="disableText" readonly="readonly"/></td>	
							</tr>
							<tr>
								<td   class="Edit-Title1">免租金装修期(月)<span class="notnullTip">*</span></td>
								<td   class="Edit-Input1"><input  id="id_decorateperiod" fieldname="decorateperiod" validType="length[1,5]" invalidMessage="不能超过5个字符" class="easyui-validatebox"/></td>	
								<td   class="Edit-Title2">免租金装修期(月)</td>
								<td   class="Edit-Input2"><input id="id_formerDecorateperiod" fieldname="formerDecorateperiod"  maxlength="25" class="disableText" readonly="readonly"/></td>	
							</tr>
							<tr>
								<td   class="Edit-Title1">拟出租用途<span class="notnullTip">*</span></td>
								<td   class="Edit-Input1"><input  id="id_planLetPurpose" fieldname="planLetPurpose"/></td>	
								<td   class="Edit-Title2">原出租用途</td>
								<td   class="Edit-Input2"><input id="id_formerLetPurpose" fieldname="formerLetPurpose"  maxlength="25" class="disableText" readonly="readonly"/></td>	
							</tr>
							<tr>
								<td   class="Edit-Title1">竞租资格条件</td>
								<td   class="Edit-Input-Merge" colspan="3"><textarea  id="id_qualification" fieldname="qualification" validType="length[1,250]" invalidMessage="不能超过250个字符" class="easyui-validatebox"></textarea></td>
							</tr>
							<tr>
								<td   class="Edit-Title1">物业经营情况及拟定租金起步价的依据</td>
								<td   class="Edit-Input-Merge" colspan="3"><textarea  id="id_letRentGist" fieldname="letRentGist" validType="length[1,250]" invalidMessage="不能超过250个字符" class="easyui-validatebox"></textarea></td>
							</tr>   
					 </table> 
                    
					<div style="height:50px;"></div>                           		
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
	<div style="background-color:white;height:100px;"></div>
	<div class="Editinput"><input type="button" id="save" class="bt_ensure" value="保存"></input><input id="return" type="button" class="bt_cancel" value="返回"></input></div>

	</body>
</html>

