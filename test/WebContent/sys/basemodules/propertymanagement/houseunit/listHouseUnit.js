/*
 * 
 * 查询预处理shaixuanBefore
 * */
//列表的datagrid对象
var datagrid;
//加载完成执行
$(function(){
	//设置合同状态下拉
	setContractStatus();
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
//初始化eaui
function initEasyui(){
	//物业用途
	if($('#unitPurpose')[0])
	$('#unitPurpose').combobox({    
	    data:data_unitPurpose,  
	    editable:false,
	    panelHeight:100,
	    multiple:true,
	    height:28,
	    width:120,
	    valueField:'classifyCode',
	    textField:'classifyName',
	    onLoadSuccess: function () { //数据加载完毕事件

        }  
	});
}
//创建组件
function initComponent(){
	initEasyui(); //初始化eaui
	
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
			if(row.useCheckFlag=='0'){
				oper_container += "<a href='javascript:void(0);' onclick='modify(\""+row.pk+"\")' >修改</a>  ";
				oper_container += "<a href='javascript:void(0);' onclick='logout(\""+row.pk+"\")' >注销</a>  ";
				oper_container += "<a href='javascript:void(0);' onclick='view(\""+row.pk+"\")' >查看</a>  ";
				if(row.canLeaseFlag=='0'){
					oper_container += "<a href='javascript:void(0);' onclick='contractApply(\""+row.pk+"\")' >出租申请</a>  ";
				}else if(row.canLeaseFlag=='3'){
					oper_container += "<a href='javascript:void(0);' onclick='reg_contract(\""+row.unitSysCode+"\")' >登记合同</a>  ";
				}
			}else{
				oper_container += "<a href='javascript:void(0);' onclick='unLogout(\""+row.pk+"\")' >撤销注销</a>  ";
			}			
			
    	return oper_container;
        }},
		{field:"unitCode",title:'物业编号',minwidth:180,halign:'center',formatter:function(value,row,index){return "<a onclick='view(\""+row.pk+"\")' href='javascript:void(0);' >"+value+"</a>"}},
		{field:"unitAdress",title:'物业地址',minwidth:200,align:'left',halign:'center'},
		{field:'unitArea',title:'物业面积',minwidth:100,align:'right',halign:'center',fmType:'money'},
		{field:'useLineMDDisplay',title:'使用状态',minwidth:120,halign:'center'},
		{field:'unitPurposeDisplay',title:'物业用途',minwidth:120},
		{field:"campusDisplay",title:'校区',minwidth:100,halign:'center'},
		{field:"contractDueDate",title:'合同到期日',minwidth:100},
		{field:"contratStatusDisplay",title:'合同状态',minwidth:120}
	/*	{field:"unitName",title:'物业名称',minwidth:120,hidden:true},
		{field:"unitClassify",title:'物业分类',minwidth:120,hidden:true},
		{field:"unitRemark",title:'备注',minwidth:120,hidden:true},
		{field:"ifFirePlug",title:'是否配备消防栓及消防喷淋系统',minwidth:180,hidden:true},
		{field:"contractCode",title:'合同编号',minwidth:120,hidden:true},
		{field:"hlcSecondEnprName",title:'承租人名称',minwidth:120,hidden:true},
		{field:"unitActuality",title:'物业现状',minwidth:120,hidden:true},
		{field:"canLeaseFlag",title:'业务状态',minwidth:120,hidden:true},
		{field:"useCheckFlag",title:'物业状态',minwidth:120,hidden:true},
		{field:"floorsNo",title:'所在楼层数',minwidth:120,hidden:true},
		{field:"clients",title:'委托单位',minwidth:120,hidden:true},
		{field:"usePeople",title:'使用人',minwidth:120,hidden:true},
		{field:"centralizePeople",title:'归口管理人',minwidth:120,hidden:true},
		{field:"useDept",title:'使用部门',minwidth:120,hidden:true},
		{field:"centralizeDept",title:'归口管理部门',minwidth:120,hidden:true},
		{field:"registerDate",title:'登记日期',minwidth:120,hidden:true},
		{field:"insertTime",title:'产生时间',minwidth:120,hidden:true},
		{field:"updatePerson",title:'最后修改人',minwidth:120,hidden:true},
		{field:"lastestUpdate",title:'最后修改时间',minwidth:120,hidden:true}*/
	]];
	 var dataGridOptions ={checkbox:true};
	 var customOptions = {tableID:'tt',classID:'HouseUnitBO',methodID:'getListForPageTranContratStatus',columns:_columns,sortInfo:_sortInfo,
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
//物业登记删除 
function delete_obj(){
	if(judgeOpeCollectOrg()){
		//取得选中资产
		var houseUnit=datagrid.getSelectedData();
		//没有选择资产，返回
		if(houseUnit.length==0){
				top.layer.alert('请选择要删除的记录 ',{icon: 5, closeBtn:2});
				return;
		}
		//获取选中资产pk，生成数组 
		for (var i in houseUnit){
			delete houseUnit[i].option;
			delete houseUnit[i].contratStatusDisplay;
			delete houseUnit[i].rn;
		}
		$("#delete").attr("disabled", true);                                                             //按钮不可点击
		
		//物业删除提交
		top.layer.open({
			title:'提示 ',
			icon: 3,
			area:['250px','150px'],
			btn:['确定','取消'],
			content:'确定删除物业吗？',
			shift:1,
			closeBtn :2,
			yes: function(index){
					//一般设定yes回调，必须进行手工关闭
	    	 		top.layer.close(index);	    	 		
					$('body').addLoading({msg:'正在删除数据，请等待...'});			  //打开遮挡层
					Ajax.service(
							'HouseUnitBO',
							'deleteHouseUnit', 
							 [houseUnit],
							function(result){
								$('body').removeLoading();     // 关闭遮挡层
								$("#delete").attr("disabled", false);                          // 按钮可点击
								
								if(result!=null&&result!=""){		
									top.layer.alert(result,{icon: 5, closeBtn:2});
								}else{
									top.layer.alert('物业删除成功 ',{icon: 6, closeBtn:2});
							    	//刷新
							    	 datagrid.query();
								}		
							}
						);
				
			},
			cancel: function(index){
					$("#delete").attr("disabled", false);                          // 按钮可点击
			}
		});
	}
}
//物业登记新增
function add(){
	if(judgeOpeCollectOrg())
		location.href=contextPath+'/sys/basemodules/propertymanagement/houseunit/editHouseUnit.jsp?business='+STR_REGISTER_ADDNEW;
}
//物业登记修改
function modify(pk){
	if(judgeOpeCollectOrg())
		location.href=contextPath+'/sys/basemodules/propertymanagement/houseunit/editHouseUnit.jsp?pk='+pk+'&business='+STR_REGISTER_MODIFY;

}
//物业登记注销
function logout(pk){
	if(judgeOpeCollectOrg()){
		//注销  	
		Ajax.service(
	  		'HouseUnitBO',
	  		'writeoffHouseUnit', 
	  		[[pk]],
	  		function(){
	  			top.layer.alert('注销成功', {icon: 6,closeBtn :2});
				//刷新
		    	 datagrid.query();
	  		},
	  		function(data){
	  			top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
	  		}
	  	);
	}
}
//撤销物业登记注销
function unLogout(pk){
	if(judgeOpeCollectOrg()){
		//注销  	
		Ajax.service(
	  		'HouseUnitBO',
	  		'unWriteoffHouseUnit', 
	  		[[pk]],
	  		function(){
	  			top.layer.alert('撤销注销成功', {icon: 6,closeBtn :2});
				//刷新
		    	 datagrid.query();
	  		},
	  		function(data){
	  			top.layer.alert('数据异常！', {icon: 5,closeBtn :2});
	  		}
	  	);
	}
}
//查看物业
function view(pk){
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
		content:contextPath+'/sys/basemodules/propertymanagement/houseunit/viewHouseUnit.jsp?pk='+pk
	});
}
//出租申请
function contractApply(unitpk){
		if(judgeOpeCollectOrg())
			location.href=contextPath+'/sys/basemodules/propertymanagement/letrentmanage/letrentApply/editLetRent.jsp?business='+STR_REGISTER_ADDNEW+'&unitpk=' + unitpk;

}
//合同状态
function getContractStatus(){
	var checkedQc = new Object();
	checkedQc.fn = '';
	checkedQc.oper = 14;
	var contratStatusDisplay=$('#contratStatusDisplay').combobox('getValue');
	debugger;
	if (contratStatusDisplay== '0'){
		checkedQc.value1 = "((canLeaseFlag = '0'))";
	}else if(contratStatusDisplay== '1'){
		checkedQc.value1 = "((canLeaseFlag = '1'))";
	}else if(contratStatusDisplay== '2'){
		checkedQc.value1 = "((canLeaseFlag = '2'))";
	}else if(contratStatusDisplay== '3'){
		checkedQc.value1 = "((canLeaseFlag = '3'))";
	}else{
		if(contratStatusDisplay== '41'){
			checkedQc.value1 = "((canLeaseFlag = '4') and contractDueDate < "+getTodayDate()+" )";
		}else if(contratStatusDisplay== '42'){
			checkedQc.value1 = "((canLeaseFlag = '4') and contractDueDate > "+getTodayDate()+" and contractDueDate < "+getPointDate(getTodayDate(),0,-1,0)+" ) ";
		}else if(contratStatusDisplay== '43'){
			checkedQc.value1 = "((canLeaseFlag = '4') and contractDueDate > "+getTodayDate()+" and contractDueDate < "+getPointDate(getTodayDate(),0,-2,0)+" ) ";
		}else if(contratStatusDisplay== '44'){
			checkedQc.value1 = "((canLeaseFlag = '4') and contractDueDate > "+getTodayDate()+" and contractDueDate < "+getPointDate(getTodayDate(),0,-3,0)+" ) ";
		}else if(contratStatusDisplay== '45'){
			checkedQc.value1 = "((canLeaseFlag = '4') and contractDueDate > "+getTodayDate()+" and contractDueDate < "+getPointDate(getTodayDate(),0,-6,0)+" ) ";
		}else if(contratStatusDisplay== '46'){
			checkedQc.value1 = "((canLeaseFlag = '4'))"
		}else{
			checkedQc.value1 = "(1=1)";
		}
	}
    return checkedQc;
}
//设置合同状态下拉
function setContractStatus(){
	//设置合同状态选择下拉框
	$("#contratStatusDisplay").combobox({
		valueField: 'value',
		textField: 'text',
		data:[{
			'value':"0",
			'text':'空闲'
		},{
			'value':"1",
			'text':'出租审批中'
		},{
			'value':'2',
			'text':'出租已审批'
		},{
			'value':'3',
			'text':'待签合同'
		},{
			'value':'41',
			'text':'合同已到期'
		},{
			'value':'42',
			'text':'一个月内到期'
		},{
			'value':'43',
			'text':'两个月内到期'
		},{
			'value':'44',
			'text':'三个月内到期'
		},{
			'value':'45',
			'text':'半年内到期'
		},{
			'value':'46',
			'text':'合同执行中'
		}],
		width:140,
		editable:false
	});
}