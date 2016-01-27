//获取此页面的index属性
var parentIndex = top.layer.getFrameIndex(window.name);

//资产分类代码
var code;
$(function() {
	
	init();
});

//初始化
function init(){

	//给单位赋值
	if(mainpk==''){
		//给默认单位赋值
		 $('#orgSysCode').val(top.strFilterOrgCodeDisplay);
	}
	if(mainpk!=''){
		Ajax.service('InApprovalPathBO', 'findById', [ mainpk ],
				function(result) {
					    // 给业务类型赋值
			         $('#orgSysCode').val(result.orgSysCodeDisplay);
					 $('#busiType').combobox('setValue',result.busiType);
					 
			}, function(data) {
				top.layer.alert('数据异常！', {icon : 4 });
			});
	}
}

//保存事件
function inapprovalpath_save(){
	var  inapprovalpath=new Object();
	inapprovalpath.pk=mainpk;
	inapprovalpath.busiType= $('#busiType').combobox('getValue');
	inapprovalpath.orgSysCode=top.strFilterOrgCode;
	Ajax.service( 'InApprovalPathBO', 'checkUnique',[mainpk,top.strFilterOrgCode,$('#busiType').combobox('getValue')] , 
			function(result){
				if(result=='true'){
					Ajax.service( 'InApprovalPathBO', 'modify', [inapprovalpath],
							function(){
							top.layer.alert('保存成功！', {icon : 1});
							top.contentframe.$('#inapprovalpathtable').datagrid("reload");
							top.layer.close(parentIndex);
							
							},function(){
							top.layer.alert('数据异常！', {icon : 2});
							});
						}else{
							top.layer.alert('已经创建此审批路线！', {icon : 0});
						}
					},
			function(){
				top.layer.alert('数据异常！', {icon : 2});
			}
		);
}

//取消事件
function inapprovalpath_cancel(){
	top.layer.close(parentIndex);
}





