
/**
 * controlType:控制类型， STR_REGISTER_ADDNEW,STR_REGISTER_MODIFY,STR_VIEW
 * assetRegAssetNo：资产内部编号,可能为空，当新增时 
 **/
jQuery.fn.extend({assetupload:function (options) {
	var _self = this, _this = $(this);
	var appendDatagrid = null;
	var parentAreaWidth = 0;
	var parentAreaHeight = 0;
	var completeRowData = null;
	var listHtml = "<div class='clr' style=''><div id='id_div_listbtn' class='clearfloat' style='display:none;margin-left:8px;margin-bottom:8px;'><div class='clearfloat'><input type='button' id='id_btn_add' class='bt_green' value='+ 新增' /><input type='button' id='id_btn_modify' class='bt_green' style='margin-left:8px' value='修改' /><input type='button' id='id_btn_delete' class='bt_green'  style='margin-left:8px' value='删除' /></div></div><div class='biao'><table id='id_appendgrid_table'><input type='button' ></table></div></div>";
	var op = jQuery.extend({controlType:STR_VIEW, assetRegAssetNo:""}, options || {});
	/**
	 * 方法入口
	 **/
	function init() {
		initParameter();
		initDisplay();
		initComDisplay();
		initComFunc();
		initDataGrid();
	}
	/** 
	 * 初始化基础参数
	 **/
	function initParameter() {
		parentAreaWidth = _this.width();
		parentAreaHeight = _this.height();
		if(parentAreaWidth<20) {
			parentAreaWidth = 800;
		}
		if(parentAreaHeight<20) {
			parentAreaHeight = 280;
		}
 	} 
	/**
	 * 初始化列表html
	 **/
	function initDisplay() {
		_this.append(listHtml);
	}
	/**
	 *根据业务类型设置页面显示
	 **/
	function initComDisplay() {
		if (op.controlType == STR_VIEW) {
			$("#id_div_listbtn").css("display", "none");
		} else {
			$("#id_div_listbtn").css("display", "block");
		}
	}
	/**
	 * 为页面组件绑定事件处理方法
	 **/
	function initComFunc() {
		$("#id_btn_add").click(addAppend);
		$("#id_btn_delete").click(deleteAppend);
		$("#id_btn_modify").click(modifyAppend);
	}
	/**
	 * 初始化附件列表
	 **/
	function initDataGrid() {
		/** 初始化表格 **/
		var _sortInfo = {"sortPK":"fileID", "sortSql":"lastestUpdate Desc"};
		var _columns = [[{field:"appendName", title:"\u9644\u4ef6\u540d\u79f0", halign:"center", align:"center", minwidth:220}, {field:"appendRemark", title:"\u5907\u6ce8", halign:"center", align:"center", minwidth:300}]];
		var dataGridOptions = {onDblClickRow:rowDbClick, onLoadSuccess:onloadSuccess, rownumbers:true, height:parentAreaHeight,width:parentAreaWidth,checkbox:false, pagination:false};
		var customOptions = {tableID:"id_appendgrid_table", classID:"AssetAppendBO", columns:_columns, sortInfo:_sortInfo, customQCFunc:setCustomQC};
		appendDatagrid = new DataGrid(customOptions, dataGridOptions);
	}
 
	/**
 	* 第一次数据加载时，获取最初始的列表数据，并复制存放
 	**/
	function onloadSuccess(data) {
		if (completeRowData == undefined || completeRowData == null) {
			completeRowData = new Array();
			completeRowData = completeRowData.concat(data.rows);
		}
	}
	
	/**
	 * 设置附件列表自定义查询条件
	 **/
	function setCustomQC() {
		var qcArr = new Array();
 		qcArr[0] = new Object();
		qcArr[0].fn = 'assetRegAssetNo';
		qcArr[0].oper = 0; 
		qcArr[0].value1 = op.assetRegAssetNo;
		return qcArr;
	}
	/**
	 * 附件列表双击处理方法
	 **/
	function rowDbClick(index, row) {
		downLoad(row);
 	}
 	/**
 	 * 新增按钮点击处理方法
 	 **/
	function addAppend() {
		top.layer.open({type:2, title:"\u65b0\u589e\u4e0a\u4f20\u9644\u4ef6", shift:1, closeBtn:2, area:["440px", "220px"], content:contextPath + "/core/componentmodule/upload/editAssetUpload.jsp?controltype=" + STR_REGISTER_ADDNEW + "&openwindowname=" + window.name + "&areaid=" + _this.attr("id")});
	}
	/**
	 * 修改按钮点击处理方法
	 **/
	function modifyAppend() {
		var selectedData = appendDatagrid.getSelectedData();
		if (selectedData.length == 0) {
			return;
		}
		top.layer.open({type:2, title:"\u4fee\u6539\u4e0a\u4f20\u9644\u4ef6", shift:1, closeBtn:2, area:["440px", "220px"], content:contextPath + "/core/componentmodule/upload/editAssetUpload.jsp?controltype=" + STR_REGISTER_MODIFY + "&assetregassetno=" + op.assetRegAssetNo + "&openwindowname=" + window.name + "&areaid=" + _this.attr("id")});
	}
	
	/** 
	 * 删除附件
	 **/
	function deleteAppend() {
		var selectedData = appendDatagrid.getSelectedData();
		if (selectedData.length == 0) {
			return;
		}
		top.layer.open({title:"\u63d0\u793a ", icon:3, area:["260px", "180px"], btn:["\u786e\u5b9a", "\u53d6\u6d88"], content:"\u786e\u5b9a\u5220\u9664\u5f53\u524d\u9009\u4e2d\u9644\u4ef6\u5417\uff1f", shift:1, closeBtn:2, yes:function (index) {
			deleteAppendFromGrid(selectedData);
			top.layer.close(index);
		}, cancel:function (index) {
		}});
	}
	
	/**
	 * 从datagrid表格中删除附件数据，不会向后台发送删除请求，只是将需删除的数据从表格中移除，并按实际记录到completeRowData中
	 * @param selectedData 选中删除的附件数据
	 **/
	function deleteAppendFromGrid(selectedData) {
		var selectedDataLen = selectedData.length;
		for (var i = 0; i < selectedDataLen; i++) {
			var completeRowDataLen = completeRowData.length;
			for (var j = 0; j < completeRowDataLen; j++) {
				if (selectedData[i].fileID == completeRowData[j].fileID) {
					if (completeRowData[j].rowStatus == INT_ROW_STATUS_INSERT) {
						completeRowData.splice(j, 1);
					} else {
						completeRowData[j].rowStatus = INT_ROW_STATUS_DELETE;
					}
					break;
				}
			}
			var rowIndex = appendDatagrid.dataGridObj.datagrid("getRowIndex", selectedData[i].fileID);
			appendDatagrid.dataGridObj.datagrid("deleteRow", rowIndex);
		}
		/** 更新行号字段 **/
		var data = appendDatagrid.dataGridObj.datagrid("getData");
		appendDatagrid.setRowNum(data.rows);
		appendDatagrid.dataGridObj.datagrid("loadData", data);
	}
	
	function addAppendRow(appendRow) {
		var rowIndex = appendDatagrid.dataGridObj.datagrid("getRowIndex", appendRow.fileID);
		var data = appendDatagrid.dataGridObj.datagrid("getData");
		/**  **/
		if (rowIndex != -1) {
			var rowsLen = data.rows.length;
			for (var j = 0; j < rowsLen; j++) {
				if (appendRow.fileID == data.rows[j].fileID) {
					data.rows[j] = appendRow;
					break;
				}
			}
			appendDatagrid.dataGridObj.datagrid("refreshRow", rowIndex);
			var completeRowDataLen = completeRowData.length;
			for (var j = 0; j < rowsLen; j++) {
				if (appendRow.fileID == completeRowData[j].fileID) {
					completeRowData[j] = appendRow;
					break;
				}
			}
		} else {
			completeRowData.push(appendRow);
			data.rows.splice(0, 0, appendRow);
			data.total = data.rows.length;
			appendDatagrid.setRowNum(data.rows);
			appendDatagrid.dataGridObj.datagrid("loadData", data);
		}
	}
	/**
	 * 获取附件列表数据
	 **/
	function getAppendData() {
		if (completeRowData != null) {
			appendDatagrid.getSelectedFilterObj(completeRowData);
		}
		return completeRowData;
	}
	/**
	 * 获取附件列表当前选中行
	 **/
	function getSelectedData() {
		var selectedData = appendDatagrid.getSelectedData();
		if (selectedData.length == 0) {
			return null;
		}
		return selectedData[0];
	}
	/**
	 * 附件下载
	 **/
	function downLoad(row) {
		Ajax.download(FILE_TYPE_ASSETAPPEND, "info", row);
	}
	
	/** 将一些属性方法打包到areaid的元素中，方便使用 **/
	var myObj = {callbackfunc:addAppendRow, getAppendData:getAppendData, getSelectedData:getSelectedData, downLoad:downLoad};
	$(this).data(myObj);
	
	/** 方法入口 **/
	init();
}});

