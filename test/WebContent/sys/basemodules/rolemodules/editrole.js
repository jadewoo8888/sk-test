//角色类型
var	groupTypeData;

//将xml转换成zTreejson数组 
function xmltozTreeJSON(Nodes,menus,parentNode){		
	var jsonNodes="";
	for(var i=0;i<menus.length;i++){
		if(menus[i].nodeName=="#text") continue;
		jsonNodes={id:menus[i].getAttribute("id"),pId:parentNode==null?null:parentNode.getAttribute("id"),name:menus[i].getAttribute("name")};
		Nodes.push(jsonNodes);
		var menuchild=menus[i].childNodes;
		if(menuchild.length>0){
			xmltozTreeJSON(Nodes,menuchild,menus[i]);
			}			
	}
}
////////////////////////////////////////数据初始化部分star 
//角色功能zTree属性配置
var setting2 = {
		edit: {
			enable: true,			
			showRemoveBtn: false,
			showRenameBtn: false
			},
		data: {
				simpleData: {
				enable: true
				}
			},
		callback: {
				onClick:null
				}
	};
//设置zTree
function initzTree(){
	$.fn.zTree.init($("#rolefunctiontree"),setting2,null);
}
//加载完成执行 ,获取数据
function getroledata(usercode,groupCode){
  //获取角色数据  	
	Ajax.service(
  		'GroupBO',
  		'getGroupWithAclAuthID', 
  		[groupCode],
  		function(result){
      	 	var xml=result[1];
			xml=xml.replace(/\"/g,"");
      		xml=xml.replace(/<!--[\s\S]*-->/,"");
      		xml=xml.replace(/<?[\s\S]*?>/,"");
      		xml=xml.replace(/>\s?</g,"><");                //新加入 
  			var xmlObj=stringToXml(xml);
  			var menus=xmlObj.selectNodes("/menu/menu");
  			var Nodes=[];
  			xmltozTreeJSON(Nodes,menus,null);
  			//加载角色功能树
  			$.fn.zTree.init($("#rolefunctiontree"),setting2,Nodes); 
			//数据填充 
      	 	dataFill(result[0]);
  		},
  		function(data){
  			top.layer.alert('数据异常', {icon: 4,closeBtn :2});
  		}
  );
	
}
//数据填充 
function dataFill(objdata){
	  var  seachid;
	  // 开始遍历 
	  for(var p in objdata){
		  if(p=="groupOrgClass"){
			  $('#groupOrgClass').combobox('select',objdata[p]);
		  } else if(p=="groupTypeCode") {
		 	 $('#groupTypeCode').combobox('select',objdata[p]);
		  }
		  else if($("input[name='"+p+"']:eq(0)").length!=0){
	  		 $("input[name='"+p+"']")[0].value=objdata[p];
	  	  }
	  }
}


function getGroupTypeComboboxData() {
	Ajax.service(
		'GroupTypeBO',
		'findAll', 
		[],
		getGroupTypeComboboxDataSuccFunc
	);
}

function getGroupTypeComboboxDataSuccFunc(result) {
	for(var i=0;i<result.length;i++){
		if(result[i].groupTypeCode=="001"||result[i].groupTypeCode.substr(0,1)=="4"){
			result.splice(i, 1);
			i=i-1;
		}
	}
	groupTypeData=result;
	$('#groupTypeCode').combobox("loadData",result);  
}
////////////////////////////////////////数据初始化部分end 

//功能选择zTree属性配置  
var setting = {
	check: {
		enable: true, //开启checkbox
		nocheckInherit: false,//子节点自动继承父节点无checkbox 哪怕子节点设置了nocheck：true也无用
        chkboxType:{"Y":"ps"}
		},
	edit: {           //设为编辑模式，取消节点超链接
		enable: true,			
		showRemoveBtn: false,
		showRenameBtn: false
		},
	data: {
		simpleData: {
		enable: true
		}
		},
	callback: {
			onClick:null
	}
};
//选择角色功能 
function selectFunction(usercode){
	layer.open({ 
		title:'角色功能授权', 
		shade :false,
		area:['250px','300px'],
		btn:['确定', '取消'],
		content:'<div id="selectFunction" class="pd10"><div><ul id="selecttree" class="ztree"></ul></div></div>',
		shift:1,
		closeBtn :2,
		yes: function(index){
			//授权
			Authorize();
		    //一般设定yes回调，必须进行手工关闭
		    layer.close(index);
	    },
		cancel:function(index){
	    	layer.close(index);
	    }
	});
	//获取运行时菜单 
	Ajax.service(
    		'idSysMenuService',
    		'getSysMenu', 
    		[usercode],
    		function(data){
    				data=data.replace(/\"/g,"");
        			data=data.replace(/<!--[\s\S]*-->/,"");
        			data=data.replace(/<?[\s\S]*?>/,"");
        			data=data.replace(/>\s?</g,"><");                //新加入 
    				var xmlObj=stringToXml(data);
    				var menus=xmlObj.selectNodes("/menu/menu");
    				var Nodes=[];
    				xmltozTreeJSON(Nodes,menus,null);
    				//加载系统树
    				$.fn.zTree.init($("#selecttree"),setting,Nodes);
    				//设置节点选中 
    				var selectzTree = $.fn.zTree.getZTreeObj("selecttree");
    				var rolezTree = $.fn.zTree.getZTreeObj("rolefunctiontree");
    				var rolenodes=rolezTree.getNodes();
    				if(rolenodes!=null){
        				//节点选中 
    					selectedNode(selectzTree,rolenodes);
    				}
    			}
    ); 
}
//设置节点选中  
function selectedNode(zTree,Nodes){
	 for(var k=0;k<Nodes.length;k++){
		 var selectnode=zTree.getNodeByParam("id",Nodes[k].id);		 
		 if(Nodes[k].children!=null){			 
			 selectedNode(zTree,Nodes[k].children);
		 }else{
			 zTree.checkNode(selectnode, true, true);
		 }
	 }
}
//节点复制含pid
function cloneNode2(node){	
	  var cloneNode;
	  if(node.url==undefined){
		  var cloneNode={id:node.id,name:node.name,pId:node.pId};
	  }else{
		  var cloneNode={id:node.id,name:node.name,url:node.url,pId:node.pId};
	  }
	   return cloneNode;
	}
//节点授权
function Authorize(){	
   var selectzTree = $.fn.zTree.getZTreeObj("selecttree")
   var nodes1=selectzTree.getCheckedNodes(true);
   var NODE=[];
   for(var i=0;i<nodes1.length;i++){
	   NODE.push(cloneNode2(nodes1[i]));
   }
   $.fn.zTree.init($("#rolefunctiontree"),setting2,NODE);
}

//新增角色修改 
function editrole(_business){
	if(_business==STR_REGISTER_MODIFY)_business="modifyGroup";
	// 验证通过则返回为true
	if($("#ff").form("validate")){
		top.layer.open({
			title:'保存角色',
			icon: 3,
			area:['250px','150px'],
			btn:['确定', '取消'],
			content:'你确定要保存角色吗？',
			shift:1,
			closeBtn :2,
			yes: function(index){
					 var zTree = $.fn.zTree.getZTreeObj("rolefunctiontree"); 
			    	 var menuids=getzTreeIDs(zTree.getNodes());
			    	 menuids=menuids.substring(0,menuids.length-1);
			    	 var group=dataPackage(_business);
			    	 Ajax.service(
			    			'GroupBO',
			    			 _business, 
			    			[group,menuids],
			    			function(data){
				    			if(data!="null"&&data.length>0){
				    				data=data.replace(/\"/g,'');
				    				data=data.replace(/\！/g,'');
				    				top.layer.alert(data,{icon:5,closeBtn :2});
				    			}else{
				    				if(_business=="modifyGroup"){
				    					modifyucMassage();
				    				
				    				}else if(_business=="saveGroup"){
				    					showsucMassage();
				    				}
				    			}			    			
			    			}
			    	  );			      
			    	 //一般设定yes回调，必须进行手工关闭
			    	 top.layer.close(index);
		    }
		});		
	}else{
		 top.layer.alert('请填写完整内容',{icon:7,closeBtn :2}); 
	}
}

//数据封装 
function dataPackage(business){
	var dataPackage={};
	var inputs=$("input"); 
	if(inputs.length>0){
		for(var i=0;i<inputs.length;i++){			
			if(inputs[i].type=="text"){
				if(inputs[i].name!=undefined&&inputs[i].name!="")  {
				dataPackage[inputs[i].name]= inputs[i].value ;
				}
				
			}			
		}
	}
	if(business=="modifyGroup"){
		dataPackage.groupCheckFlag = $("#groupCheckFlag").val();
	}
	dataPackage.groupTypeCode=$("#groupTypeCode").combobox("getValue");	
	dataPackage.groupOrgClass=$("#groupOrgClass").combobox("getValue");	
	return dataPackage;
}

//获取zTree所有树节点的id值 
function getzTreeIDs(nodes){
	var zTreeids="";
	if(nodes!=null){
		for(var i=0;i<nodes.length;i++){
			zTreeids+=nodes[i].id+"|";
			var nodechild=nodes[i].children;
			if(nodechild!=undefined&&nodechild.length>0){
				zTreeids+=getzTreeIDs(nodechild);
			}
		}
	}
	return 	zTreeids;
}

//显示新增成功信息
function showsucMassage(){
	top.layer.open({
		title:'提示',
		icon: 6,
		area:['280px','150px'],
		btn:['确定', '新建下一条'],
		content:'新增成功',
		shift:1,
		closeBtn :2,
		yes: function(index){
			//location.href=contextPath+"/sys/basemodules/rolemodules/listroleManager.jsp";
			 history.go(-1);
		    //一般设定yes回调，必须进行手工关闭
		    top.layer.close(index);
	    },
		cancel:function(index){
			 location.href=contextPath+"/sys/basemodules/rolemodules/editrole.jsp?business=saveGroup";
	    }
	});
}

//显示修改成功信息
function modifyucMassage(){
	top.layer.confirm('修改成功', {
		icon: 6,
		shade : [0.4 ,'#000',true],
	    btn: ['确定'] //按钮
	}, function(index){
		//location.href=contextPath+"/sys/basemodules/rolemodules/listroleManager.jsp";
		history.go(-1);
		top.layer.close(index);
	});
}

//加载完成执行 
$(function(){	
    //初始化ztree 
	initzTree();
	initComFunc();
	getGroupTypeComboboxData();
	//编辑事务读取数据 
	if(business==STR_REGISTER_MODIFY){
		$("#businesstext").html("修改角色 ");
		$("#groupCode")[0].readOnly=true;
		$("#groupCode").addClass('disableText');
		getroledata(userAccount,groupCode);		
	}
	//清除combox加载时验证产生样式 	
	$(".combo input").removeClass("validatebox-invalid"); 	
	//返回页面
	$("#return").click(function(){
		history.go(-1);
		});	
	//创建单位类型combobox
	if(groupOrgClassData!=undefined){
		for(var i in groupOrgClassData){
			if(groupOrgClassData[i].classifyCode=="OrgClass_000"){
					groupOrgClassData.splice(i, 1);
			}
		}

		$("#groupOrgClass").combobox({
			data:groupOrgClassData,
			onSelect:function(value){ 
					if(groupTypeData!=undefined){
						 setOrgClassFilter(value.classifyCode)
					}
			},
			onLoadSuccess:function(){
				
			}
		});
	}
});
//过滤角色类型(单位角色联动)
function setOrgClassFilter(OrgClass){
	var groupTypeCurData=[];                    
	for(var i in groupTypeData){
		if(OrgClass=='OrgClass_000'){
			if(groupTypeData[i].groupTypeCode.substr(0,1)=='0'){
				groupTypeCurData.push(groupTypeData[i]);
			}		
		}else if(OrgClass=='OrgClass_001'){
			if(groupTypeData[i].groupTypeCode.substr(0,1)=='1'){
				groupTypeCurData.push(groupTypeData[i]);
			}		
		}else if(OrgClass=='OrgClass_002'){
			if(groupTypeData[i].groupTypeCode.substr(0,1)=='2'){
				groupTypeCurData.push(groupTypeData[i]);
			}		
		}else if(OrgClass=='OrgClass_003'){
			if(groupTypeData[i].groupTypeCode.substr(0,1)=='3'){
				groupTypeCurData.push(groupTypeData[i]);
			}		
		}		
	}
	if(groupTypeCurData.length>0){
		var groupTypeCode=$('#groupTypeCode').combobox('getValue');
		$('#groupTypeCode').combobox('setValue','');
		if(groupTypeCode.length>0)
		for(var j in groupTypeCurData){
			if(groupTypeCurData[j].groupTypeCode==groupTypeCode){
				$('#groupTypeCode').combobox('select',groupTypeCode);
			}
		}
		$('#groupTypeCode').combobox("loadData",groupTypeCurData); 
	}
}

function initComFunc() {
	$("#groupTypeCode").combobox({onLoadSuccess:groupTypeComLoadSuccFunc});
}

function groupTypeComLoadSuccFunc() {
	$(".combo input").removeClass("validatebox-invalid"); 
}

//保存 
function savedata(){
	editrole(business);
}