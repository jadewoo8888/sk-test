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
			if(row.letRentFlag=='ZJZZT_001'){
				oper_container += "<a href='javascript:void(0);' onclick='modify(\""+row.pk+"\")' >修改</a>  ";
				oper_container += "<a href='javascript:void(0);' onclick='delete_obj(\""+row.pk+"\")' >删除</a>  ";
				oper_container += "<a href='javascript:void(0);' onclick='report_obj(\""+row.pk+"\")' >上报</a>  ";
			}else if(row.letRentFlag=='ZJZZT_004'){
				//if(row.formerRealEndDate==null){				
				//}
				//else if(parseInt(row.formerRealEndDate.replace('-'))<parseInt(top.serverDate.replace('-'))){
					oper_container += "<a href='javascript:void(0);' onclick='reg_contract(\""+row.unitSysCode+"\")' >登记合同</a>  ";
				//}
			}
			
			oper_container += "<a href='javascript:void(0);' onclick='view(\""+row.pk+"\")' >查看</a>  ";
			
    	return oper_container;
        }},
		{field:"orgName",title:'申请单位',minwidth:200,align:'left',halign:'center'},
		{field:"letRentBarCode",title:'申请单号',minwidth:180,formatter:function(value,row,index){return "<a onclick='view(\""+row.pk+"\")' href='javascript:void(0);' >"+value+"</a>"}},
		{field:'unitCode',title:'物业编号',minwidth:180,formatter:function(value,row,index){return "<a onclick='viewUnit(\""+row.unitSysCode+"\")' href='javascript:void(0);' >"+value+"</a>"}},
		{field:'unitAdress',title:'物业地址',minwidth:200,align:'left',halign:'center'},
		{field:'unitArea',title:'物业面积',minwidth:120,align:'right',halign:'center',fmType:'money'},
		{field:"approvalProcess",title:'审批状态',minwidth:120},
		{field:"letRentFlagDisplay",title:'申请单状态',minwidth:120},
		{field:"planLetPurposeDisplay",title:'拟出租用途',minwidth:120}
	]];
	 var dataGridOptions ={checkbox:false}; 
	 var customOptions = {tableID:'tt',classID:'LetRentBO',columns:_columns,sortInfo:_sortInfo,
			 orgField:"orgSysCode"};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
	 
}
//登记合同
function reg_contract(unitsyscode){
	if(!judgeOpeCollectOrg()) {
		return;
	}
 	window.location.href =contextPath+ "/sys/basemodules/propertymanagement/contractmanage/contractregist/editContractRegist.jsp?busitype="+STR_REGISTER_ADDNEW+"&unitsyscode="+unitsyscode;
}
//出租申请删除 
function delete_obj(pk){
	if(judgeOpeCollectOrg()){
		//物业删除提交
		top.layer.open({
			title:'提示 ',
			icon: 3,
			area:['250px','150px'],
			btn:['确定','取消'],
			content:'确定删除出租申请吗？',
			shift:1,
			closeBtn :2,
			yes: function(index){
					//一般设定yes回调，必须进行手工关闭
	    	 		top.layer.close(index);	    	 		
					$('body').addLoading({msg:'正在删除数据，请等待...'});			  //打开遮挡层
					Ajax.service(
							'LetRentBO',
							'deleteLetRent', 
							 [[pk]],
							function(result){
								$('body').removeLoading();     // 关闭遮挡层
								
								if(result!=null&&result!=""){		
									top.layer.alert(result,{icon: 5, closeBtn:2});
								}else{
									top.layer.alert('出租申请删除成功 ',{icon: 6, closeBtn:2});
							    	//刷新
							    	 datagrid.query();
								}		
							}
						);		
			}
		});
	}
}
//出租申请上报 
function report_obj(pk){
	if(judgeOpeCollectOrg()){
		//物业删除提交
		top.layer.open({
			title:'提示 ',
			icon: 3,
			area:['250px','150px'],
			btn:['确定','取消'],
			content:'确定上报 吗？',
			shift:1,
			closeBtn :2,
			yes: function(index){
					//一般设定yes回调，必须进行手工关闭
	    	 		top.layer.close(index);	    	 		
					$('body').addLoading({msg:'正在上报，请等待...'});			  //打开遮挡层
					Ajax.service(
							'LetRentBO',
							'upreportLetRent', 
							 [[pk]],
							function(result){
								$('body').removeLoading();     // 关闭遮挡层
								
								if(result!=null&&result!=""){		
									top.layer.alert(result,{icon: 5, closeBtn:2});
								}else{
									top.layer.alert('上报 成功 ',{icon: 6, closeBtn:2});
							    	//刷新
							    	datagrid.query();
								}		
							}
						);		
			}
		});
	}
}
//出租申请新增
function add(){
	if(judgeOpeCollectOrg())
		location.href=contextPath+'/sys/basemodules/propertymanagement/letrentmanage/letrentApply/editLetRent.jsp?business='+STR_REGISTER_ADDNEW;
}
//出租申请修改
function modify(pk){
	if(judgeOpeCollectOrg())
		location.href=contextPath+'/sys/basemodules/propertymanagement/letrentmanage/letrentApply/editLetRent.jsp?pk='+pk+'&business='+STR_REGISTER_MODIFY;

}

//查看出租申请
function view(pk){
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
//查看物业
function viewUnit(unitsyscode){
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
//状态
function getUseCheckFlag(){
	var checkedQc = new Object();
	checkedQc.fn = '';
	checkedQc.oper = 14;
	var contratStatusDisplay=$('#useCheckFlag').combobox('getValue');
	
	if (contratStatusDisplay== '2'){
		checkedQc.value1 = "(LETRENTFLAG = 'ZJZZT_001')";
	}else if(contratStatusDisplay== '3'){
		checkedQc.value1 = "(LETRENTFLAG = 'ZJZZT_002')";
	}else if(contratStatusDisplay== '4'){
		checkedQc.value1 = "(LETRENTFLAG = 'ZJZZT_003')";
	}else if(contratStatusDisplay== '5'){
		checkedQc.value1 = "(LETRENTFLAG Not In ('ZJZZT_001','ZJZZT_002','ZJZZT_003') )";
	}else{
		checkedQc.value1 = "(1=1)";
	}
    return checkedQc;
}