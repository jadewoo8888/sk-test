
/**
 * 资产统计功能部门树入口方法
 * @param options 参数
 * options包含的基本参数可参考treebase.js中的initialize方法的描述
 * rootCode 树的根节点单位代码,若没有设置，则取top.strFilterOrgCode作为根节点
 * @return 资产类别树对象
 **/
function statictisDeptTree(options) {
	var tree = new StatictisDeptTree(options);
	tree.selectTree();
	return tree;
}
var StatictisDeptTree = Class.create();
StatictisDeptTree.prototype = new DeptTree();
/** **/
StatictisDeptTree.prototype.selectTree = function () {
	this.init();
};
/**
 *初始化tree的设置
 **/
StatictisDeptTree.prototype.initTreeSet = function () {
	var thisObj = this;
	this.tree_setting = {data:{simpleData:{enable:true, displayCode:"deptDisplayCode", idKey:"deptCode", pIdKey:"deptParentCode", rootPId:""}}, view:{selectedMulti:false, fontCss:function (treeId, treeNode) {
		return thisObj.getFontCss(treeId, treeNode);
	}, expandSpeed:"fast"}, callback:{onDblClick:function (event, treeId, treeNode) {
		thisObj.treeDoubleClick(event, treeId, treeNode);
	}}};
	this.tree_setting.check = {enable:true, chkStyle:"checkbox", chkboxType:{"Y":"", "N":""}};
};
/**
 *初始化tree的设置
 **/
StatictisDeptTree.prototype.getTreeSelectValue = function () {
	var returnValue = "";
	var returnDisplayValue = "";
	var returnNodes = null;
	var selectNodes = null;
	selectNodes = this.tree_zTreeObj.getCheckedNodes();
	returnNodes = selectNodes;
	for (var i = 0; i < selectNodes.length; i++) {
		returnValue += "," + selectNodes[i][this.tree_zTreeObj.setting.data.simpleData.idKey];
		returnDisplayValue += "," + selectNodes[i].name;
	}
	if (returnValue.length > 0) {
		returnValue = returnValue.substring(1);
		returnDisplayValue = returnDisplayValue.substring(1);
	}
	var arr_return = new Array();
	arr_return.push(returnValue);
	arr_return.push(returnDisplayValue);
	arr_return.push(returnNodes);
	return arr_return;
};

