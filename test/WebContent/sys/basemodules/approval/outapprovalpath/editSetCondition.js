var item = [{itemName:'空',itemValue:''},
			{itemName:'单价',itemValue:'DJ'},
			{itemName:'总价',itemValue:'ZJ'},
			{itemName:'面积',itemValue:'MJ'},
			{itemName:'分类代码',itemValue:'FLDM'},
			{itemName:'处置形式',itemValue:'CZXS'},
			{itemName:'当月总价',itemValue:'DYZJ'},
			{itemName:'单位类型',itemValue:'DWLX'}];
			
var compareSign = [{compareName:'空',compareValue:''},
					{compareName:'等于',compareValue:'='},
					{compareName:'大于',compareValue:'>'},
					{compareName:'小于',compareValue:'<'},
					{compareName:'大于等于',compareValue:'>='},
					{compareName:'小于等于',compareValue:'<='},
					{compareName:'不等于',compareValue:'<>'},
					{compareName:'在..到..之间',compareValue:'between'}];

var compareSign2 = [{compareName:'空',compareValue:''},
                   {compareName:'是',compareValue:'in'},
                   {compareName:'不是',compareValue:'not in'},
                   {compareName:'包含',compareValue:'like'},
                   {compareName:'不包含',compareValue:'not like'}];

var compareSignVoid = [{compareName:'空',compareValue:''}];

var bracketL = [{bracketName:'空',bracketValue:''},
				{bracketName:'(',bracketValue:'('}];

var bracketR = [{bracketName:'空',bracketValue:''},
				{bracketName:')',bracketValue:')'}];

var relationSign = [{relationName:'空',relationValue:''},
					{relationName:'并且',relationValue:'and'},
					{relationName:'或',relationValue:'or'}];

var win = window.open('',windowName);

$(function(){
	initTable();
	iniItem($(".item"));
	iniCompare($(".compareSign"));
	bracket($(".bracketR"));
	bracket($(".bracketL"));
	iniRelation($(".relationSign"));
	isShowAddButton();
	
	//解除事件
	$('.datagrid-cell').unbind("mouseover");
	$(".condition").change(function(){
		sqlFacory($(this),"conditionCode",$(this).val());
	})
	$("#bt_area .bt_ensure").click(function(){
		save();
	})
	$("#bt_area .bt_cancel").click(function(){
		cancel();
	})
	//添加行
	$("#addCondition").click(function(){
		addCondition();
	})
	$("#removeCondition").click(function(){
		removeSqlRow();
	})
	
	reShowSql();
})

//基本信息
function initTable(){
	 var _sortInfo = {"sortPK" : "","sortSql" : "statNo Desc"};
	 var _columns =  
	 [[
        {field:"bracketL",title:'',minwidth:60},
        {field:"item",title:'项目',minwidth:100},
        {field:"compareSign",title:'比较符',minwidth:100},
        {field:"condition",title:'条件',minwidth:240},
        {field:"bracketR",title:'',minwidth:60},
        {field:"relationSign",title:'与下一条件的关系',minwidth:110}
	]];
	 var dataGridOptions ={checkbox:true,height:280,isQuery:false,pagination:false,rownumbers:false};
	 var customOptions = {tableID:'editSetConditionTable',columns:_columns,sortInfo:_sortInfo};	 
	 datagrid = new DataGrid(customOptions,dataGridOptions);
}
function iniItem(id){
	$(id).combobox({
		value:'',
		valueField:'itemValue',
		textField:'itemName',
		width:'80',
		panelHeight:'auto',
		data:item,
		onSelect:function (res){
			sqlFacory($(this),"itemCode",res.itemValue);
			if(res.itemValue == "FLDM" || res.itemValue == "DWLX" || res.itemValue == "CZXS"){
				$(this).parent().parent().parent().find(".compareSign").combobox({data:compareSign2});
			}else if(res.itemValue == ""){
				$(this).parent().parent().parent().find(".compareSign").combobox({data:compareSignVoid});
			}else{
				$(this).parent().parent().parent().find(".compareSign").combobox({data:compareSign});
			}
			$(this).parent().parent().parent().find(".condition").val("").change();
			sqlFacory($(this).parent().parent().next().find(".combo"),"compareSignCode","");
		}
	})
}
function iniCompare(id){
	$(id).combobox({
		value:'',
		valueField:'compareValue',
		textField:'compareName',
		width:'80',
		panelHeight:'auto',
		data:compareSignVoid,
		onSelect:function (res){
			sqlFacory($(this),"compareSignCode",res.compareValue);
			if(res.compareValue == "between"){
				var inputAmount = $(this).parent().parent().parent().find(".condition").length;
				if(inputAmount != 1)return;
				
				var copyConditionHtml = $(this).parent().parent().parent().find(".condition").parent().html();
				$(this).parent().parent().parent().find(".condition").after(copyConditionHtml);
				$(this).parent().parent().parent().find(".condition:last").bind("change",function(){
					sqlFacory($(this),"between",$(this).val());
				})
			}else{
				var inputAmount = $(this).parent().parent().parent().find(".condition").length;
				if(inputAmount == 1)return;
				$(this).parent().parent().parent().find(".condition:last").remove();
			}
		}
	})
}
function bracket(id){
	var useData = $(id).hasClass("bracketL")?bracketL:bracketR;
	$(id).combobox({
		value:'',
		valueField:'bracketValue',
		textField:'bracketName',
		width:'50',
		panelHeight:'auto',
		data:useData,
		onSelect:function (res){
			var className = $(id).hasClass("bracketL")?"bracketLCode":"bracketRCode";
			sqlFacory($(this),className,res.bracketValue);
		}
	})
}
function iniRelation(id){
	$(id).combobox({
		value:'',
		valueField:'relationValue',
		textField:'relationName',
		width:'80',
		panelHeight:'auto',
		data:relationSign,
		onSelect:function (res){
			sqlFacory($(this),"relationSignCode",res.relationValue);
		}
	})
}
//复制节点，添加到最后一行
function addCondition(){
	var trObj = $("#copyPoint");
	var rowId = $(".datagrid-btable tbody tr:last").attr("id");
	var rowName = rowId.substring(0,rowId.length-1)+1;
	var index = parseInt(rowId.substring(rowId.length-1,rowId.length))+1;
	createSqlRow();
	addRowData();
	constraint();
	
	$(".datagrid-btable tbody tr:last").find(".comboFlag").each(function(i,v){
		if($(this).hasClass("item")){
			iniItem($(this));
		}else if($(this).hasClass("compareSign")){
			iniCompare($(this));
		}else if($(this).hasClass("bracketL")){
			bracket($(this));
		}else if($(this).hasClass("bracketR")){
			bracket($(this));
		}else if($(this).hasClass("relationSign")){
			iniRelation($(this));
		}else if($(this).hasClass("condition")){
			$(this).bind("change",function(){
				sqlFacory($(this),"conditionCode",$(this).val());
			})
		}
	})
}
/**生成sql语句字符串通用方法
 * 
 * @param id		当前空间id
 * @param className	需要添加值的类名
 * @param value		添加的值
 * @return
 */
function sqlFacory(id,className,value){
	//假如比较符值为between，则value值为拼凑值
	if(className == "conditionCode"){
		value = value.trim().replace(/\s+/g,"");
		var itemValue = id.parent().parent().prev().prev().find(".item").combobox("getValue"); 
		if(id.parent().find(".condition").length != 1){
			value = value+","+id.next().val();
		}else if(!(itemValue == "FLDM" || itemValue == "DWLX" || itemValue == "CZXS") && value != ""){
			if(!/^\d+$/.test(value)){
				top.layer.alert("输入值必须为数字",{icon: 2, closeBtn:2});
				id.val("").change();
				return;
			}
		}
	}else if(className == "between"){
		value = id.prev().val()+","+value;
		className = "conditionCode";
	}else if(className == "compareSignCode"){
		//测试是否可以转义
	}
	
	var index = id.parent().parent().parent().attr("datagrid-row-index");
	if(index == undefined)
		index = id.parent().parent().attr("datagrid-row-index");
	$("#codeArea .codeRow:eq("+index+")").find("."+className).html(value);
	isShowAddButton();
}
//验证是否显示添加按钮
function isShowAddButton(){
	var isShow = true;
	var isSave = false;
	$("#codeArea .codeRow:last").find("div").each(function(){
		if(!$(this).hasClass("bracketLCode") && !$(this).hasClass("bracketRCode")){
			if($(this).html() == ""){
				isShow = false;
				if($(this).hasClass("relationSignCode")){
					isSave = true;
				}
			}else{
				isSave = false;
			}
		}
	})
	if(isShow){
		liberate();
	}else{
		constraint();
	}
	if(isSave){
		changeBtnDisabled(false);
	}else{
		changeBtnDisabled(true);
	}
}
//可进行保存与添加行操作
function liberate(){
	$("#addCondition").removeAttr("disabled");
	$("#addCondition").removeClass("bt_cancel");
	$("#addCondition").addClass("bt_edit_treeselect");
}
//不可进行保存与添加行操作
function constraint(){
	$("#addCondition").removeClass("bt_edit_treeselect");
	$("#addCondition").addClass("bt_cancel");
	$("#addCondition").attr("disabled","disabled");
}
//添加一行数据
function addRowData(){
	var rowIndex = $(".datagrid-row:last").attr("datagrid-row-index");
	datagrid.dataGridObj.datagrid('selectRow',rowIndex);  
    var rowParent = datagrid.dataGridObj.datagrid('getSelected');  
    var newRow = jQuery.extend(true, {}, rowParent);  
    rowIndex++;
    datagrid.dataGridObj.datagrid('insertRow',{  
        index:rowIndex,  
        row:newRow  
    });  
}
//创建显示sql语句的div
function createSqlRow(){
	var copyRow = $(".codeRow").html();
	$("#codeArea").append("<div class='codeRow'>"+copyRow+"</div>");
	$(".codeRow:last").find("div").html("");
}
//删除显示sql语句的div
function removeSqlRow(index){
	var selectedRows = datagrid.dataGridObj.datagrid('getSelections');
	$.each(selectedRows,function(i,v){
		var rowIndex = datagrid.dataGridObj.datagrid('getRowIndex',v);
		$("#codeArea .codeRow:eq("+rowIndex+")").remove();
		datagrid.dataGridObj.datagrid('deleteRow',rowIndex);  
	})
	isShowAddButton();
}
//取消
function cancel(){
	var parentIndex = top.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	top.layer.close(parentIndex); //再执行关闭 
}
//把得到的值传递到父页面
function save(){
	var sqlStr;
	var saveArr = [];
	$("#codeArea").find(".codeRow").each(function(i,v){
		sqlStr = "";
		$(this).find("div").each(function(){
			var str = $(this).html();
			//测试是否需要转义
			str = str.replace(/&lt;/g,"<");
			str = str.replace(/&gt;/g,">");
			if(str == "and" || str == "or"){
				str += "    ";
			}
			sqlStr += str+" ";
		})
		saveArr[i] = " "+sqlStr;
	})
	win.getConditionCode(saveArr);
	cancel();
}
//回显sql数据
function reShowSql(){
	var reShowArr = win.reShowConditionCode();
	$.each(reShowArr,function(i,v){
		var rowArr = v.split(" ");
		var footerIndex = 1; 	//脚标值
		console.log(rowArr)
		$("[datagrid-row-index = "+i+"] .bracketL").combobox("select",rowArr[footerIndex++]);
		$("[datagrid-row-index = "+i+"] .item").combobox("select",rowArr[footerIndex++]);
		if(rowArr[3] == "not"){
			$("[datagrid-row-index = "+i+"] .compareSign").combobox("select",rowArr[footerIndex++]+" "+rowArr[footerIndex++]);
		}else
			$("[datagrid-row-index = "+i+"] .compareSign").combobox("select",rowArr[footerIndex++]);
		if(rowArr[3] == "between"){
			var conditionArr = rowArr[footerIndex++].split(",");
			$("[datagrid-row-index = "+i+"] .condition:first").val(conditionArr[0]).change();
			$("[datagrid-row-index = "+i+"] .condition:last").val(conditionArr[1]).change();
		}else{
			$("[datagrid-row-index = "+i+"] .condition").val(rowArr[footerIndex++]).change();
		}
		$("[datagrid-row-index = "+i+"] .bracketR").combobox("select",rowArr[footerIndex++]);
		$("[datagrid-row-index = "+i+"] .relationSign").combobox("select",rowArr[footerIndex++]);
		if($("[datagrid-row-index = "+i+"] .relationSign").combobox("getValue") != "")
			$("#addCondition").click();
	})
}