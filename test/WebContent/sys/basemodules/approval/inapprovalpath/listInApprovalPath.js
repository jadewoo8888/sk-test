
var datagrid;
$(function(){
	//初始化
	initCompent();
	initTable();	
//	//查询事件
$('#submit').click(function(){
		datagrid.query();
	});
});
//
//初始化datagrid
function initTable(){
	var _sortInfo = {
			"sortPK" : "pk",
			"sortSql" : "lastestUpdate Desc"
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
						look =  "<a onclick='viewinapprovalpath(\""+row.pk+"\")' href='javascript:void(0);' >查看</a> ";;
				//		update = "<a onclick='editinapprovalpath(\""+row.pk+"\")' href='javascript:void(0);' >修改</a> ";
						update = "<a onclick='editinapprovalpath(\""+row.pk+"\""+","+"\""+row.orgSysCode+"\")' href='javascript:void(0);' >修改</a> ";
						return update+look;
		          }
		         },
				
				{
					field : "busiTypeDisplay",
					title : "业务类型",
					minwidth : 150,
					halign : "center",
					align : "left"
				},
				{
					field : "orgSysCodeDisplay",
					title : '单位名称',
					minwidth : 150,
					halign : "center",
					align : "left",
				},{
					field : "insertTime",
					title : "创建时间",
					minwidth : 150,
					halign : "center",
					align : "center"
				}, {
					field : "lastestUpdate",
					title : "最后更新时间",
					minwidth : 150,
					halign : "center",
					align : "center"
				}, {
					field : "updatePerson",
					title : "最后更新人",
					halign : "center",
					align : "center",
					minwidth : 150
				} ] ];

		var dataGridOptions = {
			checkbox : true,
			pagination : true
		};
		var customOptions = {
			tableID : 'inapprovalpathtable',
			classID : 'InApprovalPathBO',
			columns : _columns,
			sortInfo : _sortInfo,
			orgField : "orgSysCode"
		};

		datagrid = new DataGrid(customOptions, dataGridOptions);
}



//初始化页面
function initCompent() {
	//单位名称控件
	$('#orgSysCode').searchbox({
		searcher:function(value,name){ 
		// 选择资产分类树
   		var treeValue = $('#orgSysCode').attr('treevalue');  
 		var treeOption = {selType:'sgl',defaultSelecteds:treeValue,callBackFunction:orgTreeCallBack};
	  	top.orgTree(treeOption);
		}
	});

}


// 资产分类树回调
function orgTreeCallBack(code,codeAndName){
	$('#orgSysCode').searchbox('textbox').attr('readonly',true);// 禁用输入
	$('#orgSysCode').searchbox('setValue',codeAndName);
	$('#orgSysCode').attr('treevalue',code);
}

//删除事件
function deleteinapprovalpath(){
	var selected=$('#inapprovalpathtable').datagrid('getSelections');
	if(selected.length==0){
		top.layer.alert('请选择要删除的内部审批路径！');
		return;
	}
	top.layer.confirm("删除数据不可恢复，您确定要删除？",{
		btn : [ '确定', '取消' ],
		icon : 3
	}, function(index) {
		//删除数据
		if(selected.length==0){
			top.layer.alert('请选择要删除的内部审批路径！');
		}else{
			var inapprovalpatharr=[];
			var busiType;
			$(selected).each(function(){
				inapprovalpatharr.push(this.pk);
				busiType=this.busiType;
			});
		    Ajax.service('InApprovalPathBO', 'ifCanMoidfyOrDelete', [busiType],
		    		function(result){
		    	      if(result=='true'){
		    	    	  Ajax.service('InApprovalPathBO','delete_pk',[inapprovalpatharr],
		    				  		function(result){		  			
		    				  				top.layer.alert("删除内部审批路径成功！",{icon: 2});
		    				  				$('#inapprovalpathtable').datagrid('reload');
		    				  				$('#inapprovalpathtable').datagrid('uncheckAll');
		    				  				return;
		    				  			
		    				  		},
		    				  		function(data){
		    				  			top.layer.alert("数据异常！", {icon: 2});
		    				  			return;
		    				  		}
		    				  );
		    	      }else{
		    	    	  top.layer.alert('不可修改！',{icon: 0});
		    	    	  return;
		    	      }
		    }, function(){
		    	top.layer.alert("数据异常！",{icon: 0});
		    	return;
		    });
			
			
		}	
		
	},function(second){
		top.layer.close(second);
	});

}

//显示或隐藏某些列
function selecteColumns(){ 
	datagrid.showSelectListItem();
}

//导出
function exportTable(){
	datagrid.showExport();
}

//查看内部审批路线
function viewinapprovalpath(pk){
	top.layer.open({
		type:2,
		title:'查看内部审批路线',
		shift:1,
		closeBtn :2,
		area:['600px','350px'],
		shade:false,
		zIndex:'2016', 
		success:function(layero){
    		top.layer.setTop(layero); 
		},
		content:contextPath+'/sys/basemodules/approval/inapprovalpath/viewInApprovalPath.jsp?pk='+pk
	});
}
//修改内部审批路线
function editinapprovalpath(pk,orgSysCode){

	var content;
	if(pk==undefined){
		content="新增内部审批路线";
		path=contextPath+'/sys/basemodules/approval/inapprovalpath/editInApprovalPath.jsp?pk='+'';
	}
	if(pk!=undefined){
		var flag=true;
		Ajax.service('InApprovalPathBO', 'ifCanMoidfyOrDelete', [pk,orgSysCode],
				function(result){
			if(result=='false'){
				top.layer.alert("审批路线不可修改！", {icon: 0});
				flag=false;
				return;
			}
		},function(){
			top.layer.alert("数据异常！", {icon: 2});
			return;});
		var path;
		content="修改内部审批路线";
		path=contextPath+'/sys/basemodules/approval/inapprovalpath/editInApprovalPath.jsp?pk='+pk;
	}
	
		top.layer.open({
   			type:2,
   			title:content,
   			shift:1,
   			closeBtn :2,
   			area:['600px','350px'],
   			shade:false,
   			zIndex:'2015', 
   			success:function(layero){
   	    		top.layer.setTop(layero); 
   			},
   			content:path
   		});
}



//定义流程事件
function define_process(){
	var selectnode=$('#inapprovalpathtable').datagrid('getSelections');
	if(selectnode.length==0){
		top.layer.alert('请选择一条记录！',{icon: 0});
	}if(selectnode.length==1){
		var inApprovalPathPK;
       $(selectnode).each(function(){
    	   inApprovalPathPK=this.pk;
       });
		window.location="defineprocess/listDefineProcess.jsp?inApprovalPathPK="+inApprovalPathPK;
	}if(selectnode.length>1){
		top.layer.alert('只能选择一条记录！',{icon: 0});
	}
	
}