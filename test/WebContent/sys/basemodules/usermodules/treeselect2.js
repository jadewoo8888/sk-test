
/**文件说明**/
/**1、使用此文件需要引入如下js文件**/
/***a、gdczsam/core/js/tools/ajax.js**/
/***b、gdczsam/core/js/ztree/jquery.ztree.core-3.5.js**/
/***c、gdczsam/core/js/ztree/jquery.ztree.excheck-3.5.min.js**/
/***d、gdczsam/core/js/ztree/zTreeStyle.css**/
/** tree设置 **/
var ts_tree_setting = {};
/** ztree对象**/
var ts_tree_zTreeObj = null;
/** 搜索输入框文字**/
var ts_str_ipt_search = "";
/** 初始化参数**/
var ts_strFieldName = "";
var ts_strBusiType = "";
var ts_strstrSelType = "";
var ts_callBackFunction = null;
/**
 * 方法入口
 *@param strFieldName 具体页面页面字段名称
 *@param strBusiType 业务类型 org(单位树),dept(部门树)
 *@param strstrSelType 选择类型 sgl(单选) mul(多选)
 *@param callBackFunction 回调函数 todo(参数)
 */
function selectTree(strFieldName, strBusiType, strstrSelType, callBackFunction,defaultSelecteds) {
	cleanInitPara();
	ts_strFieldName = strFieldName;
	ts_strBusiType = strBusiType;
	ts_strstrSelType = strstrSelType;
	ts_callBackFunction = callBackFunction;
	ts_arrDefaultSelecteds = defaultSelecteds;
	initAboujtBrowser();
	initTreeSet();
	getData();
}
/**
 * 由于浏览器的一些特殊设置
 **/
function initAboujtBrowser() {
	var bro = $.browser;
	//在火狐下，dialog不能正常居中，设置body的style="width:100%;height:100%;"
	if (bro.mozilla) {
		$("body").width("100%");
		$("body").height("100%");
	}
}
/**
 * 清空此js文件定义的变量
 **/
function cleanInitPara() {
	ts_str_ipt_search = "";
	ts_strFieldName = "";
	ts_strBusiType = "";
	ts_strstrSelType = "";
	ts_callBackFunction = null;
	ts_tree_setting = null;
	ts_arrDefaultSelecteds = null;
}
/**
 * 获取树数据
 **/
function getData() {
	if (ts_strBusiType == "dept") {
		getDeptData();
	} else if(ts_strBusiType == "org") {
		getOrgData();
	}else if(ts_strBusiType == "ac"){
		getCateData();
	}else if(ts_strBusiType == "classify"){
		getAssetData();
	}
}
/**
 * 获取部门树数据
 **/
function getDeptData() {
	if (typeof (strFilterOrgCode) == "undefined") {
		$.messager.alert("\u8b66\u544a", "\u672a\u5b9a\u4e49\u53d8\u91cf:strFilterOrgCode");
		return;
	}
	Ajax.service("DepartmentBO", "getDepartmentTree", [strFilterOrgCode], getDataSuccessFun);
}
/**勾选相对应的权限选项
 * ids		相对应的id数组集合
 */
function getReshowData(ids){
	var nodes = ts_tree_zTreeObj.transformToArray(ts_tree_zTreeObj.getNodes()); //将所有节点转换为数组
	if (nodes.length>0) {
		var markIndex = 0;//辅助自增变量
		for(var j=0;j<ids.length;j++){
	   		for(var i=0;i<nodes.length;i++){
		   		if(nodes[i].deptCode == ids[j]){
		   			ts_tree_zTreeObj.checkNode(nodes[i],true,true);
		   		}else if(nodes[i].orgCode == ids[j]){
		   			ts_tree_zTreeObj.checkNode(nodes[i],true,true);
		   		}else if(nodes[i].classifyCode == ids[j]){
		   			ts_tree_zTreeObj.checkNode(nodes[i],true,true);
		   		}else if(nodes[i].acCode == ids[j]){
		   			ts_tree_zTreeObj.checkNode(nodes[i],true,true);
		   		}else if(nodes[i].classifyCode == ids[j]){
		   			ts_tree_zTreeObj.checkNode(nodes[i],true,true);
		   		}
	   		}
		}
	} 
}
/**
 * 获取单位树数据
 **/
function getOrgData() {
	if (typeof (strFilterOrgCode) == "undefined") {
		$.messager.alert("\u8b66\u544a", "\u672a\u5b9a\u4e49\u53d8\u91cf:strFilterOrgCode");
		return;
	}
	Ajax.service("OrgService", "getOrgTree", [strFilterOrgCode], getDataSuccessFun);
}
/**
 * 获取分类树数据
 **/
function getCateData() {
	if (typeof (strFilterOrgCode) == "undefined") {
		$.messager.alert("\u8b66\u544a", "未定义变量:strFilterOrgCode");
		return;
	}
	Ajax.service("AssetClassifyService", "getACTree", [strFilterOrgCode], getDataSuccessFun);
}
/**
 * 给新数组赋值，目的是不引用原值的内存地址
 **/
function getAssetData() {
	var arr = new Array();
	for(var i = 0;i<std.length;i++){
		arr[i] = std[i];
	}
	getDataSuccessFun(arr);
}
/**
 * 获取数据的处理
 **/
function getDataSuccessFun(data) {
	var jsonData;
	if(ts_strBusiType == "classify"){
		for(var i = 0;i<data.length;i++){
			data[i].pid = "Syfx_0";
		}
		var obj = new Object();
		obj.classifyCode = "Syfx_0";
		obj.classifyName = "全部用途";
		obj.pid = "0";
		obj.open = true;
		
		data[data.length] = obj;
	}
	jsonData = eval(data);
	
	if (typeof (jsonData) == "undefined") {
		return;
	}
	for (var i = 0; i < jsonData.length; i++) {
	    //默认展开根节点下的节点
		if (i == 0) {
			jsonData[i].open = true;
		}
		if (ts_strBusiType == "dept") {
			jsonData[i].name = jsonData[i].deptName;
		} else if (ts_strBusiType == "org") {
			jsonData[i].name = jsonData[i].orgName;
		}else if(ts_strBusiType == "ac"){
			jsonData[i].name = jsonData[i].acName;
		}else if(ts_strBusiType == "classify"){
			jsonData[i].name = jsonData[i].classifyName;
		}
	}
	var treeDivID = $("#tsid_div_tree");
	$.fn.zTree.init(treeDivID, ts_tree_setting, jsonData);
	ts_tree_zTreeObj = $.fn.zTree.getZTreeObj("tsid_div_tree");
	getReshowData(ts_arrDefaultSelecteds);
}

/**
 *初始化tree的设置
 **/
function initTreeSet() {
	if (ts_strBusiType == "dept") {
		ts_tree_setting = {
				data:{
					simpleData:{
						enable:true, 
						idKey:"deptCode", 
						pIdKey:"deptParentCode", 
						rootPId:""
					}
				}, 
				view:{
					selectedMulti:false, 
					fontCss:getFontCss, 
					expandSpeed:"fast",
					dblClickExpand: true
				}, 
				callback:{
					onDblClick:treeDoubleClick
				}
		};
	}else if (ts_strBusiType == "org") {
		ts_tree_setting = {
				data:{
					simpleData:{
						enable:true, 
						idKey:"orgCode", 
						pIdKey:"orgUpCode", 
						rootPId:""
					}
				}, 
				view:{
					selectedMulti:false, 
					fontCss:getFontCss, 
					expandSpeed:"fast",
					dblClickExpand: true
				}, 
				callback:{
					onDblClick:treeDoubleClick
				}
		};
	}else if(ts_strBusiType == "ac"){
		ts_tree_setting = {
				data:{
					simpleData:{
						enable:true, 
						idKey:"acCode", 
						pIdKey:"acParentCode", 
						rootPId:""
					}
				}, 
				view:{
					selectedMulti:false, 
					fontCss:getFontCss, 
					expandSpeed:"fast",
					dblClickExpand: true
				}, 
				callback:{
					onDblClick:treeDoubleClick
				}
		};
	}else if(ts_strBusiType == "classify"){
		ts_tree_setting = {
			data:{
				simpleData:{
					enable:true, 
					idKey:"classifyCode", 
					pIdKey:"pid", 
					rootPId:""
				}
			}, 
			view:{
				selectedMulti:false, 
				fontCss:getFontCss, 
				expandSpeed:"fast",
				dblClickExpand: true
			}, 
			callback:{
				onDblClick:treeDoubleClick
			}
		};
		
	}
	if (ts_strstrSelType == "mul") {
		ts_tree_setting.check = {
	            enable: true,
	            chkStyle: "checkbox",
	            chkboxType: {
	                "Y": "ps",
	                "N": "ps"
	            }
        };
	}
}
/**
 * ztree双击处理
 **/
function treeDoubleClick(event, treeId, treeNode) {
 	//双击节点
	if (treeNode != null) {
	 	//当前strstrSelType为单选时，双击返回
		if (ts_strstrSelType == "sgl") {
			sure();
		}
	}
}
/**
 * 模糊查询输入框键盘事件处理方法
 **/
function searchInputKeyDown(e) {
	if (e.keyCode == 13) {
		treeSearch();
	}
}
/**
 * 模糊查询
 **/
var searchNodes = null;
function treeSearchName(id) {
	var searchText = $("#"+id+"Name").val();
	if (searchText == ts_str_ipt_search || searchText == "") {
		return;
	}
	if (ts_tree_zTreeObj == null) {
		return;
	}
	//搜索前先将上次高亮的节点变回普通样式
	updateNodes(searchNodes, false);
    //通过名称模糊搜索
	searchNodes = ts_tree_zTreeObj.getNodesByParamFuzzy(id+"Name", searchText, null);
	updateNodes(searchNodes, true);
	expandNodes(searchNodes);
}
/**
 * 更新节点显示高亮，并展开
 **/
function updateNodes(searchNodes, highlight) {
	if (searchNodes == null) {
		return;
	}
	for (var i = 0, l = searchNodes.length; i < l; i++) {
		searchNodes[i].highlight = highlight;
		ts_tree_zTreeObj.updateNode(searchNodes[i]);
	}
}
/**
 * 展开节点
 **/
function expandNodes(searchNodes) {
	if (searchNodes == null) {
		return;
	}
	for (var i = 0, l = searchNodes.length; i < l; i++) {
		var parentNode = searchNodes[i].getParentNode();
		var parentNodes = getParentNodes_ztree(parentNode);
		ts_tree_zTreeObj.expandNode(parentNodes, true, false, true);
		ts_tree_zTreeObj.expandNode(parentNode, true, false, true);
	}
}
/**
  * 递归得到指定节点的父节点的父节点....直到根节点
  */
function getParentNodes_ztree(node) {
	if (node != null) {
		var parentNode = node.getParentNode();
		return getParentNodes_ztree(parentNode);
	} else {
		return node;
	}
}
/**
 * 消除搜索文本框提示
 **/
function searchInputFocus() {
	var searchObj = $("#tsid_ipt_search");
	if (searchObj.val() == ts_str_ipt_search) {
		searchObj.val("");
		searchObj.css("color", "#333");
	}
}
/**
 *设置树节点字体样式，可用于设置字体高亮
 */
function getFontCss(treeId, treeNode) {
	return (!!treeNode.highlight) ? {color:"#A60000", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};
}
/**
 * 获取ztree选中数据
 * @return 数组 0:选中数据实际值 1：选中数据显示值
 **/
function getTreeSelectValue() {
	var returnValue = "";
	var returnDisplayValue = "";
	var selectNodes = null;
	var valueField = "";
	if(ts_strBusiType == "dept") {
		valueField = "deptCode";
	}else if(ts_strBusiType == "org") {
		valueField = "orgCode";
	}else if(ts_strBusiType == "ac"){
		valueField = "acCode"
	}else if(ts_strBusiType == "classify"){
		valueField = "classifyCode"
	}
	if (ts_strstrSelType == "sgl") {
		selectNodes = ts_tree_zTreeObj.getSelectedNodes();
		for (var i = 0; i < selectNodes.length; i++) {
            returnValue += "," + selectNodes[i][valueField];
            returnDisplayValue += "," + selectNodes[i].name;
        }
	} else {
		/** 当为多选时，若某个节点下的所有节点均选中，则只需要返回这个节点。 **/
		selectNodes = ts_tree_zTreeObj.getCheckedNodes();
		for (var i = 0; i < selectNodes.length; i++) {
            /** 当节点为全选（若有子节点，所有子节点也被选中则此节点为全选 **/
            if (selectNodes[i].getCheckStatus().half == false) {
                if (selectNodes[i].getParentNode() != null) {
                    /** 父节点非全选，则此节点需返回 **/
                    if (selectNodes[i].getParentNode().getCheckStatus().half == true) {
                        returnValue += "," + selectNodes[i][valueField];
                        returnDisplayValue += "," + selectNodes[i].name;
                    }
                } else {
                    returnValue += "," + selectNodes[i][valueField];
                    returnDisplayValue += "," + selectNodes[i].name;
                }
            }
        }
	}
	/*for (var i = 0; i < selectNodes.length; i++) {
		returnValue += "," + selectNodes[i][valueField];
		returnDisplayValue += "," + selectNodes[i].name;
	}*/
	if (returnValue.length > 0) {
		returnValue = returnValue.substring(1);
		returnDisplayValue = returnDisplayValue.substring(1);
	}
	var arr_return = new Array();
	arr_return.push(returnValue);
	arr_return.push(returnDisplayValue);
	return arr_return;
}

/**
 * 关闭选择窗口的处理
 **/
function dialogClose() {
	//销毁ztree
	if (ts_tree_zTreeObj != null) {
		ts_tree_zTreeObj.destroy();
	}
    //销毁dialog
	$("#tsid_div_dialogmain").dialog("destroy");
}

