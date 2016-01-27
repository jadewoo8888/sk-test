<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/core/jspf/head.jspf"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <script type="text/javascript">
	$(function() {
		
		var pk = '${param.pk}';
		Ajax.service('InApprovalPathBO', 'findById', [ pk ],
				function(result) {
					
					//数据填充 
				dataFill2(result);

			}, function(data) {
				top.layer.alert('数据异常！', {
					icon : 4
				});
			});

		function dataFill2(objdata) {
			var seachid;
			// 开始遍历 
			for ( var p in objdata) {
				if ($("div[name='" + p + "']:eq(0)").length != 0) {
					$("div[name='" + p + "']").text(objdata[p]);
				}
			}
		}
	});
    
    </script>
	<style type="text/css">
body {
	width: 100%;
	height: 100%;
}

.functionTree {
	margin-top: 10px;
	height: 200px;
	overflow: auto;
}

/*表单字体样式*/
.table_view {
    
	padding: 10px;
	font-size: 14px;
	line-height: 28px;
	text-indent: 10px;
}

.table_view label {
	width: 100px;
	display: block;
	float: left;
	margin: 0 auto;
	text-align: right;
	font-size: 14px;
	color: #474747;
}

.table_view .tb_row {
	padding-top: 5px;
	height: 28px;
	clear: both;
}

.table_view .tb_row_value {
	float: left;
	margin-left: 10px;
	width: 300px;
	border: 1px solid #e2e2e2;
}
</style>
  </head>
  
  <body style="background-color: white;">
		<div class="table_view">
			<div class="tb_row">
				<div>
					<label>
						业务类型:
					</label>
					<div class="tb_row_value" name="busiTypeDisplay"></div>
				</div>
			</div>

			<div class="tb_row">
				<label>
					单位名称:
				</label>
				<div class="tb_row_value" name="orgSysCodeDisplay"></div>
			</div>

			<div class="tb_row">
				<div>
					<label>
						创建时间:
					</label>
					<div class="tb_row_value" name="insertTime"></div>
				</div>
			</div>
			<div class="tb_row">
				<div>
					<label>
						最后更新人:
					</label>
					<div class="tb_row_value" name="updatePerson"></div>
				</div>
			</div>

			<div class="tb_row">
				<div>
					<label>
						最后更新时间:
					</label>
					<div class="tb_row_value" name="lastestUpdate"></div>
				</div>
			</div>


		</div>
	</body>
</html>
