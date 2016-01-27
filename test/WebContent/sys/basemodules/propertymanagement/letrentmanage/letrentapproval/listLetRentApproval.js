/*
 * 
 * 查询预处理shaixuanBefore
 * */
//列表的datagrid对象
var datagrid;
//加载完成执行
$(function(){
	//创建组件
	initComponent();
	//按钮事件绑定 
	buttonBind();	
	 
//jquery ready结束
});
//按钮事件绑定 
function buttonBind(){
	//执行查询操作
	$("#submit").click(function(){
		//查询
 		datagrid.query();
	})
   	//列选功能 
   	$("#selecteColumns").click(function(){
   		datagrid.showSelectListItem();
   	})
   	//导出功能  
   	$("#ouputColumns").click(function(){
   	 	datagrid.showExport();
   	})
} 
//创建组件
function initComponent(){
	//避免出现datagrid的滚动条被浏览器滚动条遮挡 
	$(window).resize(function (){
		$("#tt").datagrid("resize");
	});
	
	//创建列表datagrid
	 var _sortInfo = {"sortPK" : "pk","sortSql" : "lastestUpdate Desc"};
	 var _columns =  
	 [[
  		{field:'option',title:'操作',minwidth:180,formatter:function(value,row,index){
		var oper_container=''; 
			//审批按钮,状态为待审批or审批中，且审批人中包含当前用户时显示
			if((row.letRentFlag=='ZJZZT_002' || row.letRentFlag=='ZJZZT_003')&& row.allowApprPerson.indexOf('|'+ top.strUserAccount +'|')!=-1){
				oper_container += "<a href='javascript:void(0);' onclick='approval(\""+row.pk+"\")' >审批</a>  ";
			}
			oper_container += "<a href='javascript:void(0);' onclick='viewapply(\""+row.pk+"\")' >查看</a>  ";
			
    	return oper_container;
        }},
		{field:"orgName",title:'申请单位',minwidth:210,align:'left',halign:'center'},
		{field:"letRentCode",title:'申请单号',minwidth:180,formatter:function(value,row,index){return "<a onclick='viewapply(\""+row.pk+"\")' href='javascript:void(0);' >"+value+"</a>"}},
		{field:'unitCode',title:'物业编号',minwidth:180,formatter:function(value,row,index){return "<a onclick='view(\""+row.pk+"\")' href='javascript:void(0);' >"+value+"</a>"}},
		{field:'unitAdress',title:'物业地址',minwidth:200,align:'left',halign:'center'},
		{field:'unitArea',title:'物业面积',minwidth:120,halign:'center'},
		{field:"approvalProcess",title:'审批状态',minwidth:120},
		{field:"letRentFlagDisplay",title:'申请单状态',minwidth:120},
		{field:"planLetPurposeDisplay",title:'拟出租用途',minwidth:120}
	]];
	 var dataGridOptions ={checkbox:false}; 
	 var customOptions = {tableID:'tt',classID:'LetRentBO',columns:_columns,sortInfo:_sortInfo,
			 orgField:"orgSysCode",customQCFunc:setCustomQueryCondition};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
	 
	 //申请单状态 查询条件控件初始化
	 $("#letRentFlag").combobox({
		 data:[
			{classifyCode:'ZJZZT_001',classifyName:'全部'},
		 	{classifyCode:'ZJZZT_002,ZJZZT_003',classifyName:'待审批'},
		 	{classifyCode:'ZJZZT_001,ZJZZT_002,ZJZZT_003',classifyName:'已审批'}
		 ],
		 onSelect:function(data){
		 	if(data.classifyName == "待审批"){
		 		$("#letRentFlag").attr('qc',"{fn:'letRentFlag',oper:'"+ARY_STR_INCLUDE[0]+"'}");
		 	}else if(data.classifyName == "已审批"){
		 		$("#letRentFlag").attr('qc',"{fn:'letRentFlag',oper:'"+ARY_STR_NOTINCLUDE[0]+"'}");
		 	}else if(data.classifyName == "全部"){
		 		$("#letRentFlag").attr('qc',"{fn:'letRentFlag',oper:'"+ARY_STR_NOTEQUAL[0]+"'}");
		 	}
		 }
	 })
}

//出租申请审批
function approval(pk){
	//if(judgeOpeCollectOrg())
	location.href=contextPath+'/sys/basemodules/propertymanagement/letrentmanage/letrentapproval/editLetRent.jsp?pk='+pk+'&business='+STR_CHECK;
}

//查看物业
function view(pk){
	var unitsyscode = '';
	$.each(datagrid.dataGridObj.datagrid('getRows'),function(n,info) {
		if(info.pk == pk){
			unitsyscode = info.unitSysCode;
			return false;
		}
	});
	top.layer.open({
		type:2,
		title:'查看物业信息 ',
		shift:1,
		closeBtn :2,
		area:['900px','628px'],
		shade:false,
		zIndex:'2015', 
		success:function(layero){
	   		top.layer.setTop(layero); 
		},
		content:contextPath+'/sys/basemodules/propertymanagement/houseunit/viewHouseUnit.jsp?unitsyscode='+unitsyscode
	});
}

//查看出租申请
function viewapply(pk){
	top.layer.open({
		type:2,
		title:'查看出租申请信息 ',
		shift:1,
		closeBtn :2,
		area:['900px','628px'],
		shade:false,
		zIndex:'2015', 
		success:function(layero){
	   		top.layer.setTop(layero); 
		},
		content:contextPath+'/sys/basemodules/propertymanagement/letrentmanage/letrentApply/viewLetRent.jsp?pk='+pk
	});
}

//自定义查询条件
function setCustomQueryCondition() {
	var customQCArr = new Array();
	
	//审批人条件
	orgQc = new Object();
	orgQc.fn = '';
	orgQc.oper = ARY_STR_NULLOPER[0];
	orgQc.value1 = 'AllowApprPerson like \'%|'+ top.strUserAccount +'|%\' or linkers like \'%|'+ top.strUserAccount +'|%\'';
	customQCArr.push(orgQc);
	
    return customQCArr;
}