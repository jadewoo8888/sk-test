var datagrid;
var inApprovalPathPK;
$(function(){
	//初始化
	initComPment();
	initTable();	

});



//初始化datagrid
function initTable(){
	var _sortInfo = {
			"sortPK" : "pk",
			"sortSql" : "processCode Asc"
		};
		var _columns = [ [
		          {
		             field : "operate",
		             title : "操作",
		             minwidth : 150,
		             halign : "center",
		             align : "center",
		             formatter : function(value, row, index) {
		        	  var update,look; 
						update = "<a onclick='editDefineProcess(\""+row.pk+"\")' href='javascript:void(0);' >修改</a> ";
						look = "<a onclick='viewDefineProcess(\""+row.pk+"\")' href='javascript:void(0);' >查看</a> ";
						return update+look;

		          }
		         },
				
				{
					field : "processCode",
					title : "审批序号",
					minwidth : 100,
					halign : "center",
					align : "center"
				},
				{
					field : "itemName",
					title : '审批栏名称',
					minwidth : 150,
					halign : "center",
					align : "left",
				},{
					field : "userID",
					title : "权限人账号",
					minwidth : 200,
					halign : "center",
					align : "left"
				}, {
					field : "groupIDDisplay",
					title : "角色类型",
					minwidth : 200,
					halign : "center",
					align : "left"
				}, {
					field : "lastestUpdate",
					title : "最近修改时间",
					halign : "center",
					align : "center",
					minwidth : 150
				}, {
					field : "updatePerson",
					title : "最近修改人",
					halign : "center",
					align : "center",
					minwidth : 150
				}] ];

		var dataGridOptions = {
			checkbox : true,
			pagination : true,
			singleSelect:true
		};
		var customOptions = {
			tableID : 'processtable',
			classID : 'InApprovalProcessBO',
			columns : _columns,
			sortInfo : _sortInfo,
			customQCFunc : setDatagridQc
		};

		datagrid = new DataGrid(customOptions, dataGridOptions);
}

//初始化页面
function initComPment() {
	//单位名称控件
	$('#orgSysCode').searchbox({
		searcher:function(value,name){ 
		// 选择资产分类树
   		var treeValue = $('#orgSysCode').attr('treevalue');  
 		var treeOption = {selType:'sgl',defaultSelecteds:treeValue,callBackFunction:orgTreeCallBack};
	  	top.orgTree(treeOption);
		}
	});
	//查询事件
	$('#submit').click(function(){
			datagrid.query();
		});
}


// 资产分类树回调
function orgTreeCallBack(code,codeAndName){
	$('#orgSysCode').searchbox('textbox').attr('readonly',true);// 禁用输入
	$('#orgSysCode').searchbox('setValue',codeAndName);
	$('#orgSysCode').attr('treevalue',code);
}

//自定义条件查询
function setDatagridQc(){
	var qcArr = new Array();
	qcArr[0] = new Object();
	qcArr[0].fn = 'inApprovalPathPK';
	qcArr[0].oper = 0;
	qcArr[0].value1 = inApprovalPathPK;
	return qcArr;
}

//显示或隐藏某些列
function selecteColumns(){ 
	datagrid.showSelectListItem();
}

//导出
function exportTable(){
	datagrid.showExport();
}


//添加上一节点方法
function addpreviousnode(value){
	var rows=$('#processtable').datagrid('getRows');
		if(rows.length!=0){
			var selectnode=$('#processtable').datagrid('getSelections');
			if(selectnode.length==0){
				top.layer.alert('请选择一条记录！',{icon : 2 });
				return;
			}if(selectnode.length>1){
				top.layer.alert('只能选择一条记录！',{icon : 2 });
				return;
			}else{
				var processCode;
				var pk;
				$(selectnode).each(function(){
					processCode=this.processCode;
					pk=this.pk;
				});
				window.location="editDefineProcess.jsp?inApprovalPathPK="+inApprovalPathPK+"&processCode="+processCode+'&selectbtn='+value+"&pk="+pk;
			   return;
			}
		}else{
			window.location="editDefineProcess.jsp?inApprovalPathPK="+inApprovalPathPK;
		}

	
}
//删除事件
function  deleteprocess(){
	var selected=$('#processtable').datagrid('getSelections');
	if(selected.length==0){
		top.layer.alert('请选择一条记录！',{icon : 2 });
		return;
	}if(selected.length>1){
		top.layer.alert('只能选择一条记录！',{icon : 2 });
		return;
	}
	if(selected.length==0){
		top.layer.alert('请选择要删除的记录！');
		return;
	}
	top.layer.confirm("删除数据不可恢复，您确定要删除？",{
		btn : [ '确定', '取消' ],
		icon : 3
	}, function(index) {
		//删除数据
		if(selected.length==0){
			top.layer.alert('请选择要删除的记录！',{icon : 2 });
			return;
		}else{
			var InApprovalProcesspk;
			$(selected).each(function(){
				InApprovalProcesspk=this.pk;
			});
			Ajax.service(
			  		'InApprovalProcessBO',
			  		'deleteInApprovalProcess', 
			  		[InApprovalProcesspk],
			  		function(result){		  			
			  				top.layer.alert("删除记录成功！",{icon : 1 });
			  				$('#processtable').datagrid('reload');
			  				$('#processtable').datagrid('uncheckAll');
			  		},
			  		function(data){
			  			top.layer.alert("数据异常！", {icon: 4});
			  			return;
			  		}
			  );
			
		}	
		
	},function(second){
		top.layer.close(second);
	});
	
}

//上移下移事件
function movenode(value){
	var selected=$('#processtable').datagrid('getSelections');
	if(selected.length==0){
		top.layer.alert('请选择一条记录！',{icon : 2 });
		return;
	}if(selected.length>1){
		top.layer.alert('只能选择一条记录！',{icon : 2 });
		return;
	}if(selected.length==1){
		var InApprovalProcesspk;
		var processCode;
		$(selected).each(function(){
			InApprovalProcesspk=this.pk;
			processCode=this.processCode;
			if(value=='btn_up'){
				var rows=$('#processtable').datagrid('getRows');
				var flag=false;
				$(rows).each(function(){
					if(this.processCode<processCode){
						flag=true;
					}
				});
				if(!flag){
					top.layer.alert('该流程已经是最小流程！',{icon : 2 });
					return ;
				}else{
					Ajax.service('InApprovalProcessBO','moveInApprovalProcess',[InApprovalProcesspk,value],
							function(){
						    top.layer.alert("移动成功！",{icon : 1 });
							$('#processtable').datagrid('reload');
					});
				}
			}
			if( value=='btn_down'){
				var rows=$('#processtable').datagrid('getRows');
				var flag=false;
				$(rows).each(function(){
					if(this.processCode>processCode){
						flag=true;
					}
				});
				if(!flag){
					top.layer.alert('该流程已经是最大流程！',{icon : 2 });
					return ;
				}else{
					Ajax.service('InApprovalProcessBO','moveInApprovalProcess',[InApprovalProcesspk,value],
							function(){
						top.layer.alert("移动成功！",{icon : 1 });
							$('#processtable').datagrid('reload');
					});
				}
				
			}
		});
		
	}
}

//修改事件
function editDefineProcess(value){
	var operate='edit';
	window.location="editDefineProcess.jsp?pk="+value+"&inApprovalPathPK="+inApprovalPathPK+"&operate="+operate;
}

//查看事件
function viewDefineProcess(value){
	top.layer.open({
		type:2,
		title:'查看内部审批路线',
		shift:1,
		closeBtn :2,
		area:['900px','500px'],
		shade:false,
		zIndex:'2016', 
		success:function(layero){
    		top.layer.setTop(layero); 
		},
		content:contextPath+"/sys/basemodules/approval/inapprovalpath/defineprocess/viewDefineProcess.jsp?pk="+value
	});
};
