var wayFlag;
var groupValue = "";
var groupValueDisplay = "";
var userValue = "";
var node;
var deptcodes = "";
var conditon="";
$(function() {
	init();
});

// 重置功能
function resume(value) {
	$('#' + value).val('');
	if (value == 'groupIDDisplay') {
		groupValue = "";
		groupValueDisplay = "";
	}
	if (value == 'userID') {
		userValue = "";
		deptcodes = "";
	}
}

// 弹出选择列表
function createWindow(value) {

	if (value == 'user') {
		wayFlag = false;
		title = "添加用户";
	}
	if (value == 'group') {
		wayFlag = true;
		title = "添加角色";
	}
	top.layer
			.open( {
				type : 2,
				title : title,
				shift : 1,
				closeBtn : 2,
				area : [ '750px', '500px' ],
				content : contextPath
						+ '/sys/basemodules/approval/outapprovalpath/listUserAndGroupSelect.jsp?parentwindowname='
						+ window.name + '&way=' + wayFlag
			});
}

// 获取子窗口返回的值
function windowParameters(rows) {

	var data = "";
	if (wayFlag) {// 填写组号
		var grouptemp = "";
		$.each(rows, function(i, v) {
			data += "|[" + v.groupTypeCode + "]" + v.groupTypeName;
			grouptemp += "|" + v.groupTypeCode;
		})
		if (groupValue != "") {
			groupValue = groupValue + grouptemp;
		} else {
			groupValue = groupValue + grouptemp.substring(1);
		}
		if (groupValueDisplay != "") {
			groupValueDisplay = groupValueDisplay + data;
		} else {
			groupValueDisplay = groupValueDisplay + data.substring(1);
		}
		groupValue = unique(groupValue);
		groupValueDisplay = unique(groupValueDisplay);
		$("#groupIDDisplay").val(groupValueDisplay)
	} else {// 填写账号
		var depttemp = "";
		$.each(rows, function(i, v) {
			data += "|" + v.userAccount;
			depttemp += "|" + v.userDepartmentCode;
		})
		if (userValue != '') {
			userValue = userValue + data;
		} else {
			userValue = userValue + data.substring(1);
		}
		if (deptcodes != '') {
			deptcodes = deptcodes + depttemp;
		} else {
			deptcodes = deptcodes + depttemp.substring(1);
		}
		userValue = unique(userValue);
		deptcodes = unique(deptcodes);
		$("#userID").val(userValue);
	}
}

// 初始化
function init() {
	$('#setcondtion').attr("disabled", "disabled");
	$('#setcondtion').css("background", "#ebecec");
	$('#nextCondition').combobox( {
		'onSelect' : function(record) {
			if (record.text == 'Other') {
				$('#setcondtion').removeAttr("disabled") ;
				$('#setcondtion').css("background", "#1fb5ad");
			} else {
				$('#setcondtion').attr("disabled", "disabled");
				$('#setcondtion').css("background", "#ebecec");
			}
		}
	});
	$("#setcondtion").click(function(){
		var title = "条件设置编辑"
			top.layer.open({
				type:2,
				title:title,
				shift:1,
				closeBtn :2,
				area:['750px','600px'],
				content: contextPath+'/sys/basemodules/approval/outapprovalpath/editSetCondition.jsp?parentwindowname='+window.name
			});
	});
	if (operate == 'edit') {
		initedit();
	}
	
	
}

//获取sql语句查询条件
function getConditionCode(data){
	sqlArr = data;
	conditionFactory();
}
//回显下一审批单位的sql语句
function reShowConditionCode(){
	var condtionArr = conditon.split(/\s\s\s\s\s/);
	return condtionArr;
}

//组装sql条件语句
function conditionFactory(){
	if(sqlArr.length>0){
		conditon = "";
		$.each(sqlArr,function(i,v){
			conditon += v;
		})
	}
}
// 保存事件

function defineprocess_save() {
	var itemName = $('#itemName').val();
	if (itemName == '') {
		top.layer.alert('请填写审批栏名称！', {
			icon : 2
		});
		return;
	}
	if (groupValue == '' && userValue == '') {
		top.layer.alert('请至少填写<角色类型>和<权限人账号>其中一个！', {
			icon : 2
		});
		return;
	} else {
		if (operate != 'edit') {
			var InApprovalProcess = new Object();
			Ajax.service('InApprovalPathBO', 'findById', [ inApprovalPathPK ],
					function(result) {
						assign(result);
					}, function() {
						top.layer.alert('数据异常，请联系管理员!', {
							icon : 2
						});
					});
			return;
		}
		if (operate == 'edit') {
			if (node != undefined) {
				var InApprovalProcess = new Object();
				InApprovalProcess.pk = node.pk;
				InApprovalProcess.inApprovalPathPK = node.inApprovalPathPK;
				InApprovalProcess.busiType = node.busiType;
				InApprovalProcess.orgSysCode = node.orgSysCode;
				InApprovalProcess.processCode = node.processCode;
				InApprovalProcess.itemName = $('#itemName').val();
				InApprovalProcess.groupID = groupValue;
				InApprovalProcess.userID = userValue;
				InApprovalProcess.deptcodes = deptcodes;
				InApprovalProcess.isCanPoint = $('#isCanPoint').combobox(
						'getValue');
				InApprovalProcess.isCanNode = $('#isCanNode').combobox(
						'getValue');
				InApprovalProcess.isCanReadAll = $('#isCanReadAll').combobox(
						'getValue');
				InApprovalProcess.isCanEnd = $('#isCanEnd')
						.combobox('getValue');
				InApprovalProcess.pdBeCanApproveUnAgree = $(
						'#pdBeCanApproveUnAgree').combobox('getValue');
				InApprovalProcess.isNotOpinion = $('#isNotOpinion').combobox(
						'getValue');
				InApprovalProcess.approvalRole = $('#approvalRole').combobox(
						'getValue');
				InApprovalProcess.nextCondition = $('#nextCondition').combobox(
						'getValue');
				InApprovalProcess.nextCondition = $('#nextCondition').combobox(
						'getValue');
				InApprovalProcess.condition = '';
				Ajax
						.service(
								'InApprovalProcessBO',
								'modifyInApprovalProcess',
								[ InApprovalProcess ],
								function() {
									top.layer.alert('保存成功!', {
										icon : 1
									});
									window.location = "listDefineProcess.jsp?inApprovalPathPK="
											+ inApprovalPathPK;
								}, function() {
									top.layer.alert('数据异常，请联系管理员!', {
										icon : 2
									});
								});
			}
		}

	}
}

// 赋值函数
function assign(object) {
	var InApprovalProcess = new Object();
	InApprovalProcess.inApprovalPathPK = object.pk;
	InApprovalProcess.busiType = object.busiType;
	InApprovalProcess.orgSysCode = object.orgSysCode;
	InApprovalProcess.itemName = $('#itemName').val();
	InApprovalProcess.groupID = groupValue;
	InApprovalProcess.userID = userValue;
	InApprovalProcess.deptcodes = deptcodes;
	InApprovalProcess.isCanPoint = $('#isCanPoint').combobox('getValue');
	InApprovalProcess.isCanNode = $('#isCanNode').combobox('getValue');
	InApprovalProcess.isCanReadAll = $('#isCanReadAll').combobox('getValue');
	InApprovalProcess.isCanEnd = $('#isCanEnd').combobox('getValue');
	InApprovalProcess.pdBeCanApproveUnAgree = $('#pdBeCanApproveUnAgree')
			.combobox('getValue');
	InApprovalProcess.isNotOpinion = $('#isNotOpinion').combobox('getValue');
	InApprovalProcess.approvalRole = $('#approvalRole').combobox('getValue');
	InApprovalProcess.nextCondition = $('#nextCondition').combobox('getValue');
	if($('#nextCondition').combobox('getValue')==2){
		InApprovalProcess.condition=conditon;
	}else{
		InApprovalProcess.condition = '';
	}
	
	Ajax
			.service(
					'InApprovalProcessBO',
					'addNewInApprovalProcess',
					[ InApprovalProcess, pk, processCode, selectbtn ],
					function(result) {
						top.layer
								.confirm(
										'保存成功！',
										{
											btn : [ '确定' ],
											icon : 1
										},
										function(index) {
											window.location = contextPath
													+ '/sys/basemodules/approval/inapprovalpath/defineprocess/listDefineProcess.jsp?inApprovalPathPK='
													+ inApprovalPathPK;
											top.layer.close(index);
										});
					}, function() {
						top.layer.alert('数据异常！', {
							icon : 2
						});
					});
}

// 初始化修改
function initedit() {
	Ajax.service('InApprovalProcessBO', 'findById', [ pk ], function(result) {
		node = result;
		$.each(result, function(id, value) {
			if (id == "itemName") {
				$("#" + id).val(value);
			}
			if (id == "groupID" || id == "userID") {
				if (value == null) {
					value = "";
				}

				$("#" + id).val(value);

			}
			if (id == "groupIDDisplay") {
				$("#groupIDDisplay").val(value);
				if (value == null) {
					value = "";
				}
				groupValueDisplay = value;

			}
			if (id == "groupID") {
				groupValue = value;
			}
			if (id == "userID") {
				userValue = value;
			}
			if (id == "deptcodes") {
				if (value == null) {
					value = "";
				}
				deptcodes = value;
			}
			if (id == "isCanPoint") {
				$("#isCanPoint").combobox("setValue", value);
			}
			if (id == "isCanNode") {
				$("#isCanNode").combobox("setValue", value);
			}
			if (id == "isCanReadAll") {
				$("#isCanReadAll").combobox("setValue", value);
			}
			if (id == "isCanEnd") {
				$("#isCanEnd").combobox("setValue", value);
			}
			if (id == "pdBeCanApproveUnAgree") {
				$("#pdBeCanApproveUnAgree").combobox("setValue", value);
			}
			if (id == "isNotOpinion") {
				$("#isNotOpinion").combobox("setValue", value);
			}
			if (id == "approvalRole") {
				$("#approvalRole").combobox("setValue", value);
			}
			if (id == "nextCondition") {
				$("#nextCondition").combobox("setValue", value);
			}
			if (id == "condition") {
			
				//$("#condition").combobox("setValue", value);
				if(value!=null && value!=undefined && value!=''){
					$('#setcondtion').removeAttr("disabled") ;
					$('#setcondtion').css("background", "#1fb5ad");
					conditon=value;
				}
			}
		})
	}, function() {
		top.layer.alert('数据异常！', {
			icon : 2
		});
	});
}
// 取消事件
function defineprocess_cancel() {
	window.location = "listDefineProcess.jsp?inApprovalPathPK="
			+ inApprovalPathPK;
}

// 去除重复
function unique(str) {
	var arry = [];
	arry = str.split('|');
	var result = [], hash = {};
	for ( var i = 0, elem; (elem = arry[i]) != null; i++) {
		if (!hash[elem]) {
			result.push(elem);
			hash[elem] = true;
		}
	}
	var string = result.join('|');
	return string;

}
