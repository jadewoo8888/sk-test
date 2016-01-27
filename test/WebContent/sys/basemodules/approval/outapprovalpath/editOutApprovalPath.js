var saveOrgCode;	//单位编码
var treeCode;		//树编码
var obj = new Object();			//存储、修改对象
var wayFlag = true;		//指定弹出窗口显示内容标识
var sqlArr = [];

var groupValue = "";
$(function(){	
	
	if(pk!="undefined"){
		ajaxReadData(pk);
	}else{
		$("#orgSysCodeDisplay").val(top.strFilterOrgCodeDisplay);
		saveOrgCode = top.strFilterOrgCode;
		pk = "";
	}
	
	if(readFlag == "true"){
		$(".row2>input").attr("disabled","disabled");
		$(".date>input").attr("disabled","disabled");
		$("#funBtnLayer").css("display","none");
		$("#save").css("display","none");
	}
	
	//初始化样式
	$(".combo_row").next(".row2").css("clear","both");
	$("#setting").attr("disabled","disabled").addClass("bt_cancel").removeClass("bt_edit_treeselect");
	/**
	 * 事件
	 */
	$("#cancel").click(function(){cancel()});
	$("#save").click(function(){
		if($("#validateForm").form("validate")){
			top.layer.open({
				title:'信息',
				icon: 3,
				closeBtn:2,
				area:[250,150],
				btn:['确定', '取消'],
				content:"确定要进行保存操作？",
				yes: function(index){
					top.layer.close(index);
					waiting('努力加载数据中，请稍后...');
					uniqueValidate(objFactory());
				},
				cancel:function(index){
					overWait();
				}
			})
		}
	});
	$("#setting").click(function(){
		var title = "条件设置编辑"
		top.layer.open({
			type:2,
			title:title,
			shift:1,
			closeBtn :2,
			area:['750px','600px'],
			content:'/gdczsam/sys/basemodules/approval/outapprovalpath/editSetCondition.jsp?parentwindowname='+window.name
		});
	})
	$("#addGroup").click(function(){
		wayFlag = true;
		createWindow("添加组");
	})
	$("#addUser").click(function(){
		wayFlag = false;
		createWindow("添加用户");
	})
	$(".reset").click(function(){
		$(this).prev().prev().val("");
	})
	$("#nextOrgDisplay").searchbox({
		searcher:function(value,name){ 
			if(readFlag != "true"){
				var treeOption = {'callBackFunction':callBackOrgTree};
				top.outPathOrgTree(treeOption);
			}
		},
		width:218
	})
	$('#nextOrgDisplay').searchbox('textbox').attr('readonly',true);//禁用搜索框的输入功能
	/***
	 * easyui控件
	 */
	$("#busiType").combobox({
		width:218,
		panelHeight:100
	})
	$("#pdBeCanApproveUnAgree").combobox({
		width:218,
		panelHeight:100
	})
	$("#applicability").combobox({
		width:218,
		panelHeight:100
	})
	$("#nextCondition").combobox({
		width:218,
		panelHeight:100,
		onSelect:function(param){
			if(param.conditionValue == 2){
				$("#setting").removeAttr("disabled").addClass("bt_edit_treeselect").removeClass("bt_cancel");
			}else{
				$("#setting").attr("disabled","disabled").removeClass("bt_edit_treeselect").addClass("bt_cancel");
			}
		}
	})
	
	
//jquery结束  	
})
//格式化对象值
function objFactory(){
	obj.orgSysCode = saveOrgCode;
	obj.busiType = $("#busiType").combobox("getValue");
	obj.itemName = $("#itemName").val();
	obj.pdBeCanApproveUnAgree = $("#pdBeCanApproveUnAgree").combobox("getValue");
	obj.applicability = $("#applicability").combobox("getValue");
	obj.nextOrg = treeCode;
	obj.nextCondition = $("#nextCondition").combobox("getValue");
	obj.groupID = groupValue;
	obj.userID = $("#userID").val();
	return obj;
}
//组装sql条件语句
function conditionFactory(){
	if(sqlArr.length>0){
		obj.condition = "";
		$.each(sqlArr,function(i,v){
			obj.condition += v;
		})
	}
}
/**异步保存
 * outApprovalPath	外部路径对象
 */
function ajaxSave(outApprovalPath){
	Ajax.service(
		'OutApprovalPathBO',
		'modifyOutApprovalPath', 
		[outApprovalPath],
		function(data){
			top.layer.alert('保存成功！',{icon: 1, closeBtn:2});
			overWait();
			top.contentframe.$('#outApprovalPathTabel').datagrid("reload");
			cancel();
		},
		errorFunction
	);
};
/**异步检查唯一性
 * 
 * @param 	orgSysCode单位内部编码
 * @param 	busiType业务类型（对应表中BusiType字段)
 * @param 	applicability  适用范围
 * @return	返回true则唯一
 */
function uniqueValidate(obj){
	Ajax.service(
		'OutApprovalPathBO',
		'checkUnique', 
		[pk,obj.orgSysCode,obj.busiType,obj.applicability],
		function(data){
			//唯一
			if(data){
				ajaxSave(obj);
			}
		},
		function(){
			overWait();
		}
	);
}
//读取入库单信息
function ajaxReadData(pk){
	Ajax.service(
		'OutApprovalPathBO',
		'findById', 
		[pk],
		function(data){
			$.each(data,function(i,v){
				if(i == "pdBeCanApproveUnAgree" || i == "applicability" || i == "busiType" ){
					$("#"+i).combobox("setValue",v)
				}else if(i == "nextOrgDisplay"){
					$("#"+i).searchbox("setValue",v)
				}else if(i == "nextOrg"){
					treeCode = v;
				}else if(i == "orgSysCode"){
					saveOrgCode = v;
				}else if(i == "groupID"){
					groupValue = v;
				}else if(i == "nextCondition"){
					$("#"+i).combobox("select",v);
				}else if(i == "condition"){
					sqlArr = v;
				}
				$("#"+i).val(v);
			})
			obj = data;
			if(readFlag == "true"){
				$("#baseInfo input").attr("disabled","disabled").addClass("disableText");
				$("#baseInfo [type='button']").hide();
				$("#baseInfo .easyui-combobox").combobox({ disabled: true });
				$("#baseInfo textArea").attr("disabled","disabled").addClass("disableText");
			}
		}
	)
}
//弹出选择列表
function createWindow(title){
	top.layer.open({
		type:2,
		title:title,
		shift:1,
		closeBtn :2,
		area:['750px','500px'],
		content:'/gdczsam/sys/basemodules/approval/outapprovalpath/listUserAndGroupSelect.jsp?parentwindowname='+window.name+'&way='+wayFlag
	});
}
//取消
function cancel(){
	var parentIndex = top.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	top.layer.close(parentIndex); //再执行关闭 
}

//后台调用失败
function errorFunction(){
	overWait();
	top.layer.alert('调用失败，请联系管理员',{icon: 5, closeBtn:2});
}
//处理数据状态
function waiting(msg){
	$("body").addLoading({
        msg: msg
    })
    changeBtnDisabled(true);
}
//结束查询状态
function overWait(){
	$("body").removeLoading()
    changeBtnDisabled(false);
}
//单位树回调函数
function callBackOrgTree(code,name){
	$("#nextOrgDisplay").searchbox("setValue",name);
	treeCode = code;
}
//获取子窗口返回的值
function windowParameters(rows){
	var data = "";
	if(wayFlag){//填写组号
		$.each(rows,function(i,v){
			data  += "|["+v.groupTypeCode+"]"+v.groupTypeName;
			groupValue += "|"+v.groupTypeCode;
		})
		groupValue = groupValue.substring(1);
		$("#groupIDDisplay").val(data.substring(1));
	}else{//填写账号
		$.each(rows,function(i,v){
			data  += "|"+v.userAccount;
		})
		$("#userID").val(data.substring(1));
	}
}
//获取sql语句查询条件
function getConditionCode(data){
	sqlArr = data;
	conditionFactory();
	console.log(sqlArr);
}
//回显下一审批单位的sql语句
function reShowConditionCode(){
	var condtionArr = obj.condition.split(/\s\s\s\s\s/);
	return condtionArr;
}