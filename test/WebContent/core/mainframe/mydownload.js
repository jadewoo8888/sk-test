var datagrid;
var serviceClassID = "ExportTask";
var getProgressmethodID = "get_exportprogressbypkarr";
var lastViewTime = $.cookie(top.downloadCookieName); 


$(function() {
	/** 处理下载成功数小圆标 **/
	top.hiddeExportSuccessCount();
  	  	
  	/** 获取我的页面的上次打开时间 **/  	
	if(lastViewTime==undefined) {
		lastViewTime = '';
	}
	initDataGrid();
    
    /** 记录这次打开我的下载页面的时间 **/
	recordLastViewTime();
});

function initDataGrid() {
  /** 初始化表格 **/
    var _sortInfo = {
        "sortPK": "pk",
        "sortSql": "checkFlag asc,finishTime Desc"
    };
    var _columns = [[{ 
        field: "fileName",
        title: "\u6587\u4ef6\u540d\u79f0",
        halign: "center",
        align: "center",
        minwidth: 280,
        formatter: function(value, row, index) {
            return row.downFileName +"."+ row.fileType;
        }
    },
    {
        field: "checkFlag",
        title: "导出进度",
        halign: "center",
        align: "center",
        minwidth: 200,
        formatter: function(value, row, index) {
            var content = "";
            if (row.checkFlag == 0) {
                content = "\u672a\u5f00\u59cb";
            } else {
                if (row.checkFlag == 2) {
                    content = "\u5df2\u5b8c\u6210";
                } else {
                    if (row.checkFlag == 3) {
                        content = "\u4efb\u52a1\u5931\u8d25";
                    }else  {
                    content = "<div id='"+row.pk+"'></div>";
                }
                } 
            }
            return content;
        }
    },
    {
        field: "finishTime",
        title: "\u5b8c\u6210\u65f6\u95f4",
        halign: "center",
        align: "center",
        minwidth: 140
    },
    {
        field: "operation",
        title: "\u64cd\u4f5c",
        halign: "center",
        align: "center",
        minwidth: 130,
         formatter: function(value, row, index) {
            var content = "";
            if (row.checkFlag == 2) {
                content = "<a  href='javascript:downLoad(\""+row.pk+"\")'>下载</a>";
                if(row.finishTime>=lastViewTime) {
            		content+= "<span style='color:red'>*</span>";
            	}
            } 
            return content;
        }
    }]];
    var dataGridOptions = {
        onLoadSuccess: onloadSuccessFunc,
        onDblClickRow:onDblClickRowFunc,
        checkbox: false,
        rownumbers: false,
        width:775,
        height: 480
    };
    var customOptions = {
        tableID: "id_grid",
        classID: "ExportTaskBO",
        columns: _columns,
        sortInfo: _sortInfo,
        customQCFunc: setCustomQC
    };
    datagrid = new DataGrid(customOptions, dataGridOptions);
}

/**
 * 记录打开我的页面的时间，格式为yyyy-MM-dd hh:mm:ss
 **/
function recordLastViewTime() {
 	/** 删除原来的此页面的cookie **/
	if ($.cookie(top.downloadCookieName) != null) {
    	$.removeCookie(top.downloadCookieName);
    } 
    var lastViewTime = getTodayTime();
    $.cookie(top.downloadCookieName, lastViewTime); 
 }


/**
 * 设置列表自定义查询条件
 **/
function setCustomQC() {
    var qcArr = new Array();
    qcArr[0] = new Object();
    qcArr[0].fn = "taskSubmitUserAccount";
    qcArr[0].oper = 0;
    qcArr[0].value1 = top.strUserAccount;
    return qcArr;
}

/**
 * 页面数据加载成功处理方法，调用向后台查询导出进度的方法
 * 
 **/
function onloadSuccessFunc(data) {
    requestProgress(queryProgressSerialA);
}

/**
 * 行双击处理方法
 * @param rowIndex 行编号
 * @param rowData 行数据
 **/
function onDblClickRowFunc(rowIndex, rowData) {
	if(rowData.checkFlag == 2) {
		downLoad(rowData.pk);
	}
}

/**
 * 根据进度状态处理列表页面显示，并定时再次调用后台查询导出进度方法
 * queryProgressSerialA 和 queryProgressSerialB方法相当于互相调用，确保请求成功后再发送下一个请求
 * @param exportProgressData 需要查询导出进度的导出任务的进度状态数据
 **/
function queryProgressSerialA(exportProgressData) {
    updateProgress(exportProgressData);
    setTimeout(function() {
    	requestProgress(queryProgressSerialB);
    },
    2000);
}
function queryProgressSerialB(exportProgressData) {  
    updateProgress(exportProgressData);
    setTimeout(function() {
      requestProgress(queryProgressSerialA);
    },
    2000);
}

/**
 * 向后台查询导出进度的方法
 * @param successFunc 成功回调函数
 **/
function requestProgress(successFunc) {
 	var needQueryexportTaskPKArr = getNeedQueryProgressPK();
    if (needQueryexportTaskPKArr == null || needQueryexportTaskPKArr.length == 0) {
        return;
    }
  Ajax.service(serviceClassID, getProgressmethodID, [needQueryexportTaskPKArr],
        function(data) {
            successFunc(data);
 });
}

/** 用于存放进度条对象 **/
var proObjArr = new Array();
/**
 * 更新列表显示
 * @param exportProgressData 需要查询导出进度的导出任务的进度状态数据
 **/
function updateProgress(exportProgressData) {
    if (exportProgressData == null || exportProgressData.length == 0) {
        return;
    }  
    var data = datagrid.dataGridObj.datagrid("getData");
    var exportProgressDataLen = exportProgressData.length;  
    var rowsLen = data.rows.length;
    for (var i = 0; i < exportProgressDataLen; i++) {
        for (var j = 0; j < rowsLen; j++) {
            if (exportProgressData[i].exportTaskPK == data.rows[j].pk) {
                data.rows[j].finishTime = exportProgressData[i].finishTime;
                data.rows[j].checkFlag = exportProgressData[i].checkFlag;
                break;
            }
        }
    }
   
    for (var i = 0; i < exportProgressDataLen; i++) {
        if (exportProgressData[i].checkFlag == 2||exportProgressData[i].checkFlag == 3) {
			datagrid.dataGridObj.datagrid("refreshRow",datagrid.dataGridObj.datagrid("getRowIndex",exportProgressData[i].exportTaskPK) );
 		} else if (exportProgressData[i].checkFlag == 1) {  
            var proObj = getProObj(exportProgressData[i].exportTaskPK);
            if (proObj == null) {
                proObj = new Array();
                proObj.push(exportProgressData[i].exportTaskPK);
                proObj.push(addNewPro(exportProgressData[i].exportTaskPK));
                proObjArr.push(proObj);
            } else {
            	proObj[1].update(exportProgressData[i].progress+'');
            }
        }

    }

}

/**
 * 新增一个进度条
 **/
function addNewPro(id) {
    var pro = new progress({
        width: 190,
        //进度条宽度
        height: 20,
        //进度条高度
        bgColor: "#3E4E5E",
        //背景颜色
        proColor: "#009988",
        //前景颜色
        fontColor: "#FFFFFF",
        //显示字体颜色
        val: 0,
        //默认值
        text: "当前进度为#*val*#%",
        //显示文字信息
        showPresent: true
    });
    var dd = $('#'+id)[0];
    dd.appendChild(pro.getBody());
    return pro;
}

/**
 * 从缓存的进度条对象数组中获取相应的进度条对象
 * @param pk 导出任务pk 
 **/
function getProObj(pk) {
    var return_pro = null;
    var proObjArrLen = proObjArr.length;
    for (var i = 0; i < proObjArrLen; i++) {
        var pro = proObjArr[i];
        if (pro[0] == pk) {
            return_pro = pro;
            break;
        }
    }
    return return_pro;
}

/**
 * 获取需要查询导出进度的导出任务的pk数组
 * @return 需要查询进度的任务pk数组
 **/
function getNeedQueryProgressPK() {
    var rows = datagrid.dataGridObj.datagrid("getData").rows;
    if (rows == null || rows.length == 0) {
        return null;
    }
    var needQueryexportTaskPKArr = new Array();
    var rowsLen = rows.length;
    
    /** 遍历列表数据，任务状态为0（未开始）和 1（进行中）的数据都需要查询导出进度 **/
    for (var i = 0; i < rowsLen; i++) {
        if (rows[i].checkFlag == 1 || rows[i].checkFlag==0) {
            needQueryexportTaskPKArr.push(rows[i].pk);
        }
    }
    return needQueryexportTaskPKArr;
}

/**  
 * 发送文件下载请求
 **/
function downLoad(pk) {
	/** 更新当前行显示 **/
	lastViewTime = $.cookie(top.downloadCookieName); 
	datagrid.dataGridObj.datagrid("refreshRow",datagrid.dataGridObj.datagrid("getRowIndex",pk) );
	var paramObj = new Object();
	paramObj.pk = pk;
	Ajax.download(FILE_TYPE_EXPORTTASK,'PK',paramObj);
}
