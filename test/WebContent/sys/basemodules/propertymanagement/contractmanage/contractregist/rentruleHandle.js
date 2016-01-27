/** 此文件用于定义租赁规则列表相关的处理方法，包括各种事件处理，规则校验等 **/
/**
 * 租金结算方式combox选择事件处理方法
 * 按不同的下拉值，处理交租日期列的显示
 **/
function hlcRentRulePeriodSelect(record) {	
	var nextObj = $(this).parents("td[field=hlcRentRulePeriod]").next();
	var dayObj = nextObj.find('div[name=name_div_day]');
	var monthdayObj = nextObj.find('div[name=name_div_monthday]');
	if(record.classifyCode=='PayCyc_001') {
		dayObj.show();
		monthdayObj.hide();
	}else {
		dayObj.hide();
		monthdayObj.show();
	}
}   

/**
 * 租赁期限列表开始日期改变处理方法
 * 若前一行处于不可编辑状态，则认为前一行是不可更变的，不会改变前一行的结束日期值
 **/
function hlcRentRuleStartDateSelect(date) {
	var newStartDate = $(this).datebox("getValue");
	var currentRowObj = $(this).parents("tr .datagrid-row,datagrid-row-editing");
	var currentIndex = currentRowObj.attr("datagrid-row-index");
	if(currentIndex>0) {
		//先校验上一行时候处于不可编辑，即不能改变的租赁期限
		var prevRowObj = currentRowObj.prev();
		if(!prevRowObj.hasClass('datagrid-row-editing')) {
			return;
		}
		
		var preIndex = parseInt(currentIndex)-1;;
		var editors = datagrid.dataGridObj.datagrid('getEditors', preIndex);	
		var newStartDateBeforeDay = getPointDate(newStartDate,0,0,1)
		editors[1].target.datebox('setValue',newStartDateBeforeDay);
 	}
}

/**
 * 租赁期限列表结束日期改变处理方法
 * 若有下一行，且下一行处于可编辑状态，则令下一行的开始日期等于当前行结束日期+1天
 **/
function hlcRentRuleEndDateSelect() {
	var newEndDate = $(this).datebox("getValue");
	var currentRowObj = $(this).parents("tr .datagrid-row,datagrid-row-editing");
	var currentIndex = currentRowObj.attr("datagrid-row-index");
	//先校验有没有下一行，且下一行时候处于可编辑状态
	var nextRowObj = currentRowObj.next();
	if(nextRowObj.length>0 && nextRowObj.hasClass('datagrid-row-editing')) {
		var nextIndex = parseInt(currentIndex)+1;;
		var editors = datagrid.dataGridObj.datagrid('getEditors', nextIndex);	
		var newEndDateAfterDay = getPointDate(newEndDate,0,0,-1);
		editors[0].target.datebox('setValue',newEndDateAfterDay);
	}
}


/**
 * 月租金值改变处理方法
 * 当月租金值发生改变，对应的金额大写也要改变
 **/
function hlcRentRuleRentChange(newValue,oldValue) {
	if(newValue!=oldValue) {
		$(this).parents("td[field=hlcRentRuleRent]").next().find("div").text(moneyUpperCase(newValue));
	}
}

/**
 * 租金计算方式combox选择事件处理方法
**/
var lastTimeHlcRentType = '';//由于easyui的下拉无法记录上次的下拉值，这里定义变量手动记录
function hlcRentTypeOnSelect(record) {
	if(!checkBeforeHlcRentTypeChange()) {
		clearRuleGridRow();
		$('#id_hlcRentType').combobox('clear');
		lastTimeHlcRentType = '';
		return;
	}
	if(record.classifyCode != lastTimeHlcRentType) {
		clearRuleGridRow();
	} else {
		return;
	}
	lastTimeHlcRentType = record.classifyCode;
 
	var hlcRegStartDate =  $("#id_hlcRegStartDate").datebox("getValue");
	var hlcRegEndDate =  $("#id_hlcRegEndDate").datebox("getValue");
	var hlcRentRuleRentUpStr = moneyUpperCase(0.00);
	var tempHlcRentRulePK = Math.random();
	var rowData = {row: {hlcRentRulePK:tempHlcRentRulePK,hlcRentRuleStartDate:hlcRegStartDate,hlcRentRuleEndDate:hlcRegEndDate,hlcRentRuleRent:0.00,hlcRentRuleRentUp:hlcRentRuleRentUpStr}};
	addRow(rowData);
	if(record.classifyCode=='RentType_001') {
		var tempHlcRentRulePK2 = Math.random();
		var rowData2 = {row: {hlcRentRulePK:tempHlcRentRulePK2,hlcRentRuleStartDate:getPointDate(hlcRegEndDate,0,0,-1),hlcRentRuleEndDate:hlcRegEndDate,hlcRentRuleRent:0.00,hlcRentRuleRentUp:hlcRentRuleRentUpStr}};
		addRow(rowData2);
	}
}

/**
 * 点击租金计算方式时的处理方法
 **/
function checkBeforeHlcRentTypeChange() {
	var hlcRegStartDate =  $("#id_hlcRegStartDate").datebox("getValue");
	if(hlcRegStartDate=='') {
		checkLayerAlert('请输入合同起始日期！');
		return false;
	}
	var hlcRegEndDate =  $("#id_hlcRegEndDate").datebox("getValue");
	if(hlcRegEndDate=='') {
		checkLayerAlert('请输入合同结束日期！');
		return false;
	}
	if(hlcRegEndDate <= hlcRegStartDate) {
		checkLayerAlert('合同结束日期应大于合同起始日期！');
		return false;
	}
	
	return true;
}

/**
 * 清空租赁规则列表
 **/
function clearRuleGridRow() {
	datagrid.dataGridObj.datagrid('loadData', { total: 0, rows: [] });
}

/**
 * 添加一行租金规则按钮点击处理方法
 **/
function addRentRlueRow() {
 	if(!checkBeforeAddRentRlueRow()) {
 		return;
 	}
	var rows = datagrid.dataGridObj.datagrid('getRows');
 	var lastIndex = rows.length;
 	var newHlcRentRuleStartDate = "";	
 	if(lastIndex>0) {
 		var editors = datagrid.dataGridObj.datagrid('getEditors', lastIndex-1);	
  		var lastHlcRentRuleEndDate = editors[1].target.datebox('getValue');
  		newHlcRentRuleStartDate = getPointDate(lastHlcRentRuleEndDate,0,0,-1);
 	}
	
 	var hlcRentRuleRentUpStr = moneyUpperCase(0.00);
	var tempHlcRentRulePK = Math.random();
	var rowData = {row: {hlcRentRuleStartDate:newHlcRentRuleStartDate,hlcRentRulePK:tempHlcRentRulePK,hlcRentRuleRent:0.00,hlcRentRuleRentUp:hlcRentRuleRentUpStr}};
	addRow(rowData);
}

function addRow(rowData) {
	var rows = datagrid.dataGridObj.datagrid('getRows');
	var curIndex = rows.length;
	rowData.index = curIndex;
	datagrid.dataGridObj.datagrid('insertRow', rowData);
 	datagrid.dataGridObj.datagrid('beginEdit', curIndex);
}


/**
 * 新增租金规则前检查
 * @return true:检查通过 false：检查不通过
 **/
function checkBeforeAddRentRlueRow() {
	var hlcRentType = $("#id_hlcRentType").combobox("getValue");
	if(!hlcRentType) {
		checkLayerAlert('请先选择租金计算方式');
		return false;
	}
	var hlcRegStartDate =  $("#id_hlcRegStartDate").datebox("getValue");
	if(hlcRegStartDate=='') {
		checkLayerAlert('请输入合同起始日期！');
		return false;
	}
	var hlcRegEndDate =  $("#id_hlcRegEndDate").datebox("getValue");
	if(hlcRegEndDate=='') {
		checkLayerAlert('请输入合同结束日期！');
		return false;
	}
	
	return true;	
}


/**
 * 删除一行租金规则按钮点击处理方法
 **/
function deleteRentRlueRow() {
	if(!checkBeforeDeleteRentRlueRow()) {
 		return;
 	}
 	
	var selectData = datagrid.getSelectedData();
	if(selectData!=null) {
		var rowIndex = datagrid.dataGridObj.datagrid('getRowIndex',selectData[0])
		datagrid.dataGridObj.datagrid('deleteRow',rowIndex);
	}
}

/**
 * 删除租金规则前检查
 * @return true:检查通过 false：检查不通过
 **/
function checkBeforeDeleteRentRlueRow() {
	var hlcRentType = $("#id_hlcRentType").combobox("getValue");
	var row = datagrid.dataGridObj.datagrid('getRows');
	var rowLen = row.length;
	
	if(hlcRentType == "RentType_002") {
		if(rowLen == 1) {
			checkLayerAlert('当前选择的租金计算方式至少应存在一条租赁期限！');
			return false;
		}
	} else {
		if(rowLen == 2) {
			checkLayerAlert('当前选择的租金计算方式至少应存在两条租赁期限！');
			return false;
		}
	}
	
	return true;	
}

/**
 * 打包租金规则列表数据
 * 由于租金列表采用的是多行同时编辑，保存时也不取消编辑状态的处理（更方便用户输入）
 * 这里需要手动收集,请在必填性等校验后再调用此方法
 **/
function packageRentRuleData() {
	var row = datagrid.dataGridObj.datagrid('getRows');
	var rowLen = row.length;
    var rowsData = new Array();
    for(var i=0;i<rowLen;i++) {
		var editors = datagrid.dataGridObj.datagrid('getEditors', i);	
	 	var tempRowData = new Object();
		tempRowData.hlcRentRuleStartDate = editors[0].target.datebox('getValue');
		tempRowData.hlcRentRuleEndDate = editors[1].target.datebox('getValue');
		tempRowData.hlcRentRuleRent = editors[2].target.numberbox('getValue');
		tempRowData.hlcRentRulePeriod = editors[3].target.combobox('getValue');
		if(tempRowData.hlcRentRulePeriod=='PayCyc_001') {
			tempRowData.hlcRentRulePeriodDate = editors[4].target.find('input[name=name_input_dayday]').val();
		} else {
	 		tempRowData.hlcRentRulePeriodMonth = editors[4].target.find('input[name=name_input_monthdaymonth]').val()
			tempRowData.hlcRentRulePeriodDate = editors[4].target.find('input[name=name_input_monthdayday]').val()
 		}
   		rowsData.push(tempRowData);
	}
	return rowsData;
}


/**
 * 检查租金规则列表数据是否合法
 * @return true:检查通过 false：检查不通过
 **/
function checkRentRule() {
	var row = datagrid.dataGridObj.datagrid('getRows');
	if(row==null||row.length==0) {
		checkLayerAlert('请至少填写一条租期、租金信息！');	
		return false;
	}
	
	var hlcRegStartDate =  $("#id_hlcRegStartDate").datebox("getValue");
	var hlcRegEndDate =  $("#id_hlcRegEndDate").datebox("getValue");
	
	var strStartDate = "";//第一条租赁期限的开始日期
	var	strEndDate = ""//最后一条租赁期限的结束日期
	var rentRuleRowsData = packageRentRuleData();
    var rentRuleRowsDataLen = rentRuleRowsData.length;
    for(var i=0;i<rentRuleRowsDataLen;i++){
    	if (i == 0) { 
    		strStartDate = rentRuleRowsData[i].hlcRentRuleStartDate;
    		if(rentRuleRowsData[i].hlcRentRuleStartDate != hlcRegStartDate) {
    			checkLayerAlert('第一条租金规则的租赁起始日期必须等于"合同起始日期"！');
        		return false;
        	}
        }
        if(i==rentRuleRowsDataLen-1) {
            strEndDate = rentRuleRowsData[i].hlcRentRuleEndDate;
        	if(rentRuleRowsData[i].hlcRentRuleEndDate != hlcRegEndDate) {
    			checkLayerAlert('最后一条租金规则的结束日期必须等于"合同结束日期"！');
        		return false;
        	}
        }
        
        if(rentRuleRowsData[i].hlcRentRuleStartDate > rentRuleRowsData[i].hlcRentRuleEndDate) {
    		checkLayerAlert('第 '+(i+1)+' 条租金规则的开始日期不能大于结束日期！');
        	return false;
        }
        
        // 获取首期结束日期和下期开始日期比较天数是否连续
        if(i!=0) {
        	var iDiff = getDateDiff(rentRuleRowsData[i-1].hlcRentRuleEndDate, rentRuleRowsData[i].hlcRentRuleStartDate, getDays(rentRuleRowsData[i-1].hlcRentRuleEndDate)) - 1;
        	if (iDiff >= 1) {
        		checkLayerAlert("'第" + i + "期'的结束日期 与 '第" + (i+1) + "期'的开始日期相差" + iDiff + "天,天数必须连续，请重新选择！");
            	return false;
          	}
          	if (iDiff < 0) {
          		checkLayerAlert("'第" + (i+1) + "期'的开始日期 小于或等于 '第" + i + "结束日期'，请重新选择！");
            	return false;
          	}
        }
        
        /******************校验交租日期的第几月******************/
	    if(rentRuleRowsData[i].hlcRentRulePeriod != "PayCyc_001"){//非月结算的时候
	    	if (rentRuleRowsData[i].hlcRentRulePeriod == "PayCyc_002") {
	      		// 季度选项 只能填写1-3个月
	      		if (!(rentRuleRowsData[i].hlcRentRulePeriodMonth >= 1 && rentRuleRowsData[i].hlcRentRulePeriodMonth <= 3)) {
	      			checkLayerAlert("'第" + (i+1) + "期'的租金结算方式-季,因此月份只能填写1-3月！");
	        		return false;
	      			}
	    		} else if (rentRuleRowsData[i].hlcRentRulePeriod  == "PayCyc_003") {
	      			// 半年选项 只能填写1-6个月
	      			if (!(rentRuleRowsData[i].hlcRentRulePeriodMonth >= 1 && rentRuleRowsData[i].hlcRentRulePeriodMonth <= 6)) {
	      				checkLayerAlert("'第" + (i+1) + "期'的租金结算方式-半年,因此月份只能填写1-6月！");
	        			return false;
	      			}
	    		} else if (rentRuleRowsData[i].hlcRentRulePeriod  == "PayCyc_004") {
	      			// 年选项 只能填写1-12个月
	      			if (!(rentRuleRowsData[i].hlcRentRulePeriodMonth >= 1 && rentRuleRowsData[i].hlcRentRulePeriodMonth <= 12)) {
	      				checkLayerAlert("'第" + (i+1) + "期'的租金结算方式-年,因此月份只能填写1-12月！");
	        			return false;
	      			}
	    		}
	    }
	    
	      /************校验周期完整性***************/
	      var tempDiff = getMonthDiffNewSend(rentRuleRowsData[i].hlcRentRuleStartDate, rentRuleRowsData[i].hlcRentRuleEndDate);
	      var iMonth = 0;
	        	if (rentRuleRowsData[i].hlcRentRulePeriod == "PayCyc_001") {
	        		iMonth = 1;
	        	} else if (rentRuleRowsData[i].hlcRentRulePeriod == "PayCyc_002") {
	        		iMonth = 3;
	        	} else if (rentRuleRowsData[i].hlcRentRulePeriod == "PayCyc_003") {
	        		iMonth = 6;
	        	} else if (rentRuleRowsData[i].hlcRentRulePeriod == "PayCyc_004") {
	        		iMonth = 12;
	        	}
	        
	        	if (iMonth>0) {
	        		var tempdiv = tempDiff % iMonth;
 	        		if ((tempDiff<0 || tempdiv!=0) && !(i==0 && typeof(strOperateType)!='undefined' && strOperateType == 'change')) {
	        			checkLayerAlert("'第" + (i+1) + "期'不是租金结算方式的整数倍，请修改租期信息！");
            			return false;
	        		}
	        	}
        	
        //检查下一起始时间是否大于上一条结束时间
		if(i!=0 && rentRuleRowsData[i].hlcRentRuleStartDate < rentRuleRowsData[i-1].hlcRentRuleEndDate){
			checkLayerAlert('第 '+(i)+' 条租金规则的开始日期'+rentRuleRowsData[i].hlcRentRuleStartDate+'不能早于上一条的结束日期'+rentRuleRowsData[i-1].hlcRentRuleEndDate+'！');
			return false; 
		}
    }   
    
    //检查起始时间是否大于结束时间
	if(strStartDate > strEndDate){
		checkLayerAlert("租赁起始日期"+strStartDate+"不能大于租赁结束日期"+strEndDate);
	  	return false;
	}
	
    if( getMonthDiffNew(strStartDate, strEndDate) ==0 ){
	    checkLayerAlert("租赁起始日期"+strStartDate+"和租赁结束日期"+strEndDate+"不能少于1个月");
	    return false;
	}
	
	//特别注意：layer.confirm不是阻塞的，所以这里
	/**if( (strEndDate.substr(0,4) - strStartDate.substr(0,4))*12 + (strEndDate.substr(5,2)-strStartDate.substr(5,2)) >= 60 ){
		top.layer.confirm("租赁起始日期"+strStartDate+"和租赁结束日期"+strEndDate+"超过5年,请核实租赁期限是否超过5年！", {
    		closeBtn :2,
    		height:'',
    		btn: ['已核实','取消'] 
		}, function(index, layero){   
			top.layer.close(index);
			return true;
 		}, function(index){
    		top.layer.close(index);
    		return false;
		});
	} else { **/
	
	return true;
}

function checkLayerAlert(alertInfo) {
	top.layer.alert(alertInfo,{closeBtn :2,icon:7});
}