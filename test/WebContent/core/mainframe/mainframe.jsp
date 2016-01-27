<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<%@ page language="java" import="framework.modules.user.domain.User"%>
<%@ page language="java"
	import="framework.modules.organization.domain.Organization"%>
<%@ page language="java"
	import="framework.sys.constant.SessionConstants"%>
<%@ page language="java"
	import="framework.sys.context.SpringContextUtil"%>
<%@page import="framework.sys.cache.UserLoginService"%>
<%@page import="framework.modules.homepage.bo.HomePageBO"%>
<%
	User LoginUser = (User) session.getAttribute(SessionConstants.ORIGINALLOGINUSER);//登录用户
	User OperateUser = (User) session.getAttribute(SessionConstants.OPERATEUSER);//当前操作用户
	Organization LoginUserOrg = (Organization) session.getAttribute(SessionConstants.ORIGINALLOGINUSERORGINFO);//登录用户单位信息
	Organization OperateUserOrg = (Organization) session.getAttribute(SessionConstants.OPERATEUSERORGINFO);//当前操作用户单位信息
	String pageUrl = ((HomePageBO) SpringContextUtil.getBean("HomePageBO")).getPageUrl(LoginUser.getDefaultHomePage());
%>
<!DOCTYPE HTML>
<html>
	<head>
		<!-- 参考自360官网帮助，令页面默认使用极速浏览模式 -->
		<meta name="renderer" content="webkit">
		<title>SCAM高校资产管理系统</title>
		<%@include file="/core/jspf/head.jspf"%>
		<script src="mainframe.js"
			language="javascript"></script>
		<script src="mainframecachedata.js"
			language="javascript"></script>
		<link href="${contextPath}/core/style/css/ui/mainframe.css"
			rel="stylesheet" type="text/css" />
		<script language="javascript">
   /** 操作用户的信息  **/  
  var strUserOrgCode = "<%=OperateUserOrg.getOrgCode()%>";//用户所属单位
  var strUserOrgName = "<%=OperateUserOrg.getOrgName()%>";//用户所属单位名称
  var strUserAccount = "<%=OperateUser.getUserAccount()%>";//用户账号
  var strUserName = "<%=OperateUser.getUserName()%>";//用户名称
  var strOrgIsCollect = "<%=OperateUserOrg.getOrgIsCollect()%>";//是否汇总,YesNo_001:是，YesNo_002:否
  var strOrgProperty = "<%=OperateUserOrg.getOrgProperty()%>";//单位会计执行制度,OrgProp_001:行政,OrgProp_002:事业,OrgProp_003	:企业化管理,OrgProp_004:民间,OrgProp_005:企业
  
  /** 单位树选中单位的单位信息,默认等于操作用户所属单位**/
  var strFilterOrgCode = "<%=OperateUser.getUserOrgCode()%>";//单位编码
  var strFilterOrgCodeDisplay = "<%=OperateUser.getUserOrgCodeDisplay()%>";//单位名称
  var strFilterOrgIsCollect = "<%=OperateUserOrg.getOrgIsCollect()%>";//是否汇总
  var strFilterOrgProperty = "<%=OperateUserOrg.getOrgProperty()%>";//单位会计执行制度
  
  /** 用户默认的操作界面地址 **/
  var pageUrl = "<%=pageUrl%>";
  /** 我的下载页面最后打开时间cookie信息名称 **/
  var downloadCookieName = strUserAccount+'downloadlastviewtime';
  /** 各大类资产的类别查询语句  **/ 
  var bigAssetTypeSqlArr = [${json:ac()}];
  
  
  
  </script>
  ${html:javascriptAC()}
	</head>
	<body style="overflow-y: hidden;"  onLoad="resize()" onresize='resize()'>
		<div id='id_div_iframe'
			style="width: expression(document . body .       clientWidth &amp; amp; amp; lt; 1280 ? '1280 px ' : '100%'); min-width: 1280px">
			<iframe id='id_iframe' name="name_iframe"
				onload='frameOnLoad()'
				style="width: 100%; height: 100%; z-index: 1;" frameborder="no"
				border="0" marginwidth="0" marginheight="0">
			</iframe>
		</div>
	</body>
</html>
