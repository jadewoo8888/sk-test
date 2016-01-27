var appendDatagrid;//列表datagrid对象
var completeRowData = null;//用于存放完整的列表数据，包括列表上已删除的数据，最后交由具体业务页面后台处理
var iframeWidth = 0;//附件列表页面所处的iframe窗口的宽度 
var intObj = null;//父iframe窗口宽度定时计算器对象

$(function() {
	intObj = self.setInterval("initBeforeInit()",100)
});


/**
 * 页面初始化前的处理
 * 目前会先计算父ifram窗口的宽度以用来作为列表的宽度。
 * 由于加载快慢的原因，父窗口的宽度需定时计算，知道获取后才进行页面初始化
 **/
function initBeforeInit() {
	iframeWidth = $('body').parent().width();
	if(iframeWidth) {
		window.clearInterval(intObj);
		init();
	}
}

/**
 * 初始化
 **/
function init() {
	initComDisplay();
	initComFunc(); 
	initDataGrid();
}

function initDataGrid() {
  /** 初始化表格 **/
    var _sortInfo = {
        "sortPK": "fileID",
        "sortSql": "lastestUpdate Desc"
    };
    var _columns = [[{
        field: "appendName",
        title: "附件名称",
        halign: "center",
        align: "center",
        minwidth: 220,
        formatter: function(value, row, index) {
        	var content = "";
            content = "<a  href='javascript:downLoad(\""+row.fileID+"\")'>"+row.appendName+"."+row.fileType+"</a>";
            return content;
        }
    },
   	{
        field: "appendRemark",
        title: "备注",
        halign: "center",
        align: "center",
        minwidth: 300
   	 }]];
    var dataGridOptions = {
        onLoadSuccess: onloadSuccess,
        rownumbers: true,
        height:280,
        width:iframeWidth,
        checkbox: false,
        pagination:false
    };
    var customOptions = {
        tableID: "id_grid_table",
        classID: "AppendBO",
        columns: _columns,
        sortInfo: _sortInfo,
        customQCFunc: setCustomQC
    };  
    appendDatagrid = new DataGrid(customOptions, dataGridOptions);
}

function initComDisplay() {
	if(strControlType==STR_VIEW) {
		$('#id_div_listbtn').css('display','none');
	} else {
		$('#id_div_listbtn').css('display','block');
	}
}


function initComFunc() {
	$('#id_btn_add').click(addAppend);
	$('#id_btn_delete').click(deleteAppend);
	$('#id_btn_modify').click(modifyAppend);
}

/**
 * 第一次数据加载时，获取最初始的列表数据，并复制存放
 **/
function onloadSuccess(data) {  
	if(completeRowData == undefined || completeRowData == null) {
		completeRowData = new Array();
		completeRowData = completeRowData.concat(data.rows);
	}
}

function datagridResize() {
	appendDatagrid.dataGridObj.datagrid("resize"); 
}

function addAppend() {
	top.layer.open({
		type:2,
		title:'新增上传附件',
		shift:1,
		closeBtn :2,
		area:['440px','220px'],
		content:contextPath+'/core/componentmodule/upload/editCommonUpload.jsp?controltype='+STR_REGISTER_ADDNEW
	});
}

/** 
 * 删除附件
 **/
function deleteAppend() {
	var selectedData = appendDatagrid.getSelectedData();
	if(selectedData.length == 0) {
		return; 
	}
	top.layer.open({
		title:'提示 ',
		icon: 3,
		area:['260px','180px'],
		btn:['确定','取消'],
		content:'确定删除当前选中附件吗？',
		shift:1,
		closeBtn :2,
		yes: function(index){
			deleteAppendFromGrid(selectedData);	
			top.layer.close(index);	
		},
		cancel: function(index){}
	});
}


/**
 * 从datagrid表格中删除附件数据，不会向后台发送删除请求，只是将需删除的数据从表格中移除，并按实际记录到completeRowData中
 * @param selectedData 选中删除的附件数据
 **/
function deleteAppendFromGrid(selectedData) {
  	var selectedDataLen = selectedData.length;
	for(var i=0;i<selectedDataLen;i++) {
	 	var completeRowDataLen = completeRowData.length;
		for (var j = 0; j < completeRowDataLen; j++) {
            if (selectedData[i].fileID ==completeRowData[j].fileID) {
             	if(completeRowData[j].rowStatus == INT_ROW_STATUS_INSERT) {
             	    completeRowData.splice(j, 1);
            	} else {
            		completeRowData[j].rowStatus = INT_ROW_STATUS_DELETE;
            	}
                break;
            }
        } 
		var rowIndex = appendDatagrid.dataGridObj.datagrid("getRowIndex",selectedData[i].fileID);
		appendDatagrid.dataGridObj.datagrid("deleteRow",rowIndex)
	}
	/** 更新行号字段 **/
	var data = appendDatagrid.dataGridObj.datagrid("getData"); 
	appendDatagrid.setRowNum(data.rows);
	appendDatagrid.dataGridObj.datagrid("loadData", data); 
}

/**
 * 修改附件
 **/
function modifyAppend() {
	var selectedData = appendDatagrid.getSelectedData();
	if(selectedData.length == 0) {
		return; 
	}
	top.layer.open({
		type:2,
		title:'修改上传附件',
		shift:1,
		closeBtn :2,
		area:['440px','220px'],
		content:contextPath+'/core/componentmodule/upload/editCommonUpload.jsp?controltype='+STR_REGISTER_MODIFY+'&busitype='+strBusiType+'&businesscode='+strBusinessCode
	});
}

function addAppendRow(appendRow) {
	var rowIndex = appendDatagrid.dataGridObj.datagrid("getRowIndex",appendRow.fileID);
	var data = appendDatagrid.dataGridObj.datagrid("getData"); 
  	/**  **/
	if(rowIndex!=-1) {
		var rowsLen = data.rows.length;
        for (var j = 0; j < rowsLen; j++) {
            if (appendRow.fileID == data.rows[j].fileID) {
               	data.rows[j] = appendRow;
                break;
            }
        }
		appendDatagrid.dataGridObj.datagrid("refreshRow",rowIndex);
		
		var completeRowDataLen = completeRowData.length;
		for (var j = 0; j < rowsLen; j++) {
            if (appendRow.fileID ==completeRowData[j].fileID) {
               	completeRowData[j] = appendRow;
                break;
            }
        }
	} else {
		completeRowData.push(appendRow);
		data.rows.splice(0,0,appendRow);
		data.total = data.rows.length;
		appendDatagrid.setRowNum(data.rows);
		appendDatagrid.dataGridObj.datagrid("loadData", data);
	}
};

function getAppendData(){
	if(completeRowData!=null)
	appendDatagrid.getSelectedFilterObj(completeRowData);
  	return completeRowData;
}

//返回列表查询条件数组
function setCustomQC(){ 
	var qcArr = new Array();
	/** 等于当前业务单据pk  **/
	qcArr[0] = new Object();
	qcArr[0].fn = 'businessCode';
	qcArr[0].oper = 0;
	qcArr[0].value1 = strBusinessCode;
	
	qcArr[1] = new Object();
	qcArr[1].fn = 'businessType';
	qcArr[1].oper = 0;
	qcArr[1].value1 = strBusiType;
	
	return qcArr;
}

function downLoad(fileID) {
	var paramObj = null;
	var data = appendDatagrid.dataGridObj.datagrid("getData").rows; 
 	var dataLen = data.length;
 	for(var i=0;i<dataLen;i++) {
 		if(data[i].fileID == fileID) {
 			paramObj = data[i];
 			break;
 		}
 	}	  
 	Ajax.download(FILE_TYPE_COMMONAPPEND,'info',paramObj);
}
