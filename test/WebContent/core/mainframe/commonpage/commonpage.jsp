<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<%@ page language="java" import="framework.modules.user.domain.User"%>
<%@ page language="java"
	import="framework.modules.organization.domain.Organization"%>
<%@ page language="java"
	import="framework.sys.constant.SessionConstants"%>
<!DOCTYPE HTML>
<html>
	<head>
		<!-- 参考自360官网帮助，令页面默认使用极速浏览模式 -->
		<meta name="renderer" content="webkit">
		<title>SCAM高校资产管理系统</title>
		<%@include file="/core/jspf/head.jspf"%>
		<link href="${contextPath}/core/style/css/ui/mainframe.css"
			rel="stylesheet" type="text/css" />
		<script src="${contextPath}/core/mainframe/commonpage/commonpage.js"
			language="javascript"></script>
		<script src="${contextPath}/core/mainframe/commonpage/nav_img.js"
			language="javascript"></script>
		<script src="${contextPath}/core/js/tools/xmlstringtrans.js"
			language="javascript"></script>
		<script language="javascript">
  </script>
		<style type="text/css">
.shadowboxH {
	display: none;
	-moz-border-border: 6px;
	-webkit-border-radius: 6px;
	border-radius: 6px;
	box-shadow: 3px 3px 4px #0066CC;
	-moz-box-shadow: 3px 3px 4px #0066CC;
	-webkit-box-shadow: 3px 3px 4px #0066CC;
	filter: progid :     DXImageTransform .     Microsoft .  
		  Shadow(Strength =     4, Direction =     135, Color =     '#0066CC')
		;
}

.shadowboxH div {
	-moz-border-border: 6px;
	-webkit-border-radius: 6px;
	border-radius: 6px;
}

.columnover {
	font-weight: bold;
	position: relative;
	top: -2px;
}

.clickdown {
	position: relative;
	top: 0px !important;
}

.arrow-up {
	width: 0;
	height: 0;
	border-left: 8px solid transparent;
	border-right: 8px solid transparent;
	border-bottom: 8px solid #fff;
	margin-bottom: 0px;
	margin-left: 6px;
	margin-top: 4px;
}

/*待修改*/
.demo {
	background: rgb(240, 240, 240);
}

.navimg {
	white: 50px;
	position: absolute;
	top: 30px;
	left: 950px;
	z-index: 22222222;
	color: white;
	text-align: center;
}

.navimg2 {
	white: 50px;
	position: absolute;
	top: 30px;
	left: 1000px;
	z-index: 22222222;
	color: white;
	text-align: center;
}

.ex-count {
	background-color: #F59105;
	border-radius: 5px 5px 5px 5px;
	color: #fff;
	display: inline-block;
	font-size: 10px;
	line-height: 10px;
	min-width: 10px;
	padding: 1px 2px;
	position: absolute;
	text-align: center;
	top: 4px;
	margin: 0px 0px 0px -12px;
}
#id_div_leftmenu dl{padding-bottom:20px;}
</style>
	</head>
	<body style="overflow-y: hidden;" onResize="resize()" onLoad="resize()">
		<div
			style="width: expression(document .   body .   clientWidth &amp; lt; 1280 ? '1280 px ' : '100%'); min-width: 1280px; position: relative; z-index: 100">
			<div class="header">
				<div class="logo">
					<%-- <img src="${contextPath}/core/style/images/ui/logo1.png"> --%>
				<img src="${contextPath}/core/style/images/ui/" width="348" height="80">
				</div>
				<div class="qiehuan" id="qiehuan">
					<%-- 主系统
					<i class="caret"></i>
					<div class="menu-select">
						<a id='id_a_bbsbzxt' href="#">报表上报子系统</a>
						<a id='id_a_fwglzxt' href="#">房屋管理子系统</a>
						<a id='id_a_zcpdzxt' href="#">资产盘点子系统</a>
						<a id='id_a_dzpglzxt' href="#">低值品管理子系统</a>
						<a id='id_a_cqdjzxt' href="#">产权登记子系统</a>
						<a id='id_a_jxyqzxt' href="#">教学仪器子系统</a>
						<a href="${contextPath}/core/mainframe/propertymanagementpage/mainpage.jsp">物业经营子系统</a>
					</div> --%>
				</div>
				<div class="nav"></div>
			</div>
		</div>

		<div
			style="width: expression(document.body.clientWidth &amp; lt; 1280 ? '1280 px ' : '100%'); min-width: 1280px;">
			<div id="id_div_layout" class="easyui-layout" style="width: 100%; height: 600px; border: 0px; overflow: hidden;">
				<div id='id_div_test' region="west" split="false" style="overflow-y:auto;overflow-x:hidden;">
					<div id="id_div_leftmenu" class="left" style="height:100%;width:100%;overflow-x:hidden;"></div>
				</div>
				<div region="center" style="overflow: hidden; border: 0px;">
					<div class="location demo">
						<div id='id_div_userdisplay' class="float_left mleft30">
							<span>帐号：</span>
							<span id="id_username"></span>
							<span id="id_changeuser"><a href="javascript:void(0);">【切换】
							</a> <select style='display: none' id="id_userSelectCom"></select> </span>
						</div>
						<div id='id_div_orgdisplay' class="float_left mleft30">
							<span>单位：</span>
							<span id="id_curorgname"></span>
							<a href="javascript:void(0);" id="id_changeorg">【切换】</a>
						</div>

						<div class="float_right mright12">
							<a href="javascript:void(0);" id="id_mydownload">我的下载</a>
							<i id="exportsuccess_count" style='display: none'
								class="ex-count">0</i>
							<span>|</span>
							<a href="javascript:void(0);" id="id_changepwd">修改密码</a>
							<span>|</span>
							<a href="javascript:void(0);">帮助</a>
							<span>|</span>
							<a id="id_a_exit" href="javascript:void(0);" 
								style="cursor: pointer">退出</a>
						</div>
					</div>
					<div id='id_div_mainiframe'> 
						<iframe src="" id="id_mainiframe" name="name_mainiframe" onload='frameOnLoad()'
							style="width: 100%; height: 100%; z-index: 1;" frameborder="no"
							border="0" marginwidth="0" marginheight="0">
						</iframe>
					</div>
				</div>
			</div>
		</div>

	</body>
</html>
