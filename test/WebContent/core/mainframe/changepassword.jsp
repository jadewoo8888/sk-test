<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/core/jspf/head.jspf"%>
<!doctype html>
<html>
	<head>
		<link href="changepassword.css" rel="stylesheet" type="text/css" />
		<script src="changepassword.js" language="javascript"></script>
		<script src="${contextPath}/core/js/tools/md5.js"
			language="javascript"></script>
	</head>
	<body>
		<div style="width: 350px; padding-top: 20px;">
			<table style="margin: auto;">
				<tr style='height: 60px'>
					<td class='labelTD'>
						<label>
							当前密码
						</label>
					</td>
					<td>
						<input class='input' type="password" id="oldPassword" />
					</td>
				</tr>
				<tr style='height: 50px'>
					<td class='labelTD'>
						<label>
							新密码
						</label>
					</td>
					<td>
						<input class='input' type="password" id="newPassword" />
					</td>
				</tr>
				<tr >
					<td></td>
					<td>
						<div class="ywz_zhuce_xiaoxiaobao" style='margin-left: 10px;margin-top:-10px'>
							<div class="ywz_zhuce_huixian" id='pwdLevel_1'>
							</div>
							<div class="ywz_zhuce_huixian" id='pwdLevel_2'>
							</div>
							<div class="ywz_zhuce_huixian" id='pwdLevel_3'>
							</div>
							<div class="ywz_zhuce_hongxianwenzi">
								弱
							</div>
							<div class="ywz_zhuce_hongxianwenzi">
								中
							</div>
							<div class="ywz_zhuce_hongxianwenzi">
								强
							</div>
						</div>
					</td>
				</tr>

				<tr style='height: 50px'>
					<td class='labelTD'>
						<label>
							确认新密码
						</label>
					</td>
					<td>
						<input class='input' type="password" id="verifyPassword" />
					</td>
				</tr>
				<tr style='height: 60px'>
					<td></td>
					<td style='text-align: center'>
						<input id="id_btn_submit" type="button" value="确定"
							class="bt_ensure">
						<input id="id_btn_cancel" type="button" value="取消"
							class="bt_cancel">
					</td>
				</tr>
			</table>
		</div>
	</body>
</html>
