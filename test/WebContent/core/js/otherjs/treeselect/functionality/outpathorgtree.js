
/**
 * 调用单位树入口方法
 * @param options  参数
 * options包含的基本参数可参考treebase.js中的initialize方法的描述
 * rootCode 树的根节点单位代码,若没有设置，则取top.strFilterOrgCode作为根节点 *
 * @return 单位树对象
 **/
function outPathOrgTree(options) { 
	var tree = new OutPathOrgTree(options);
	tree.selectTree();
	return tree;
}
var OutPathOrgTree = Class.create();
OutPathOrgTree.prototype = new OrgTree();
/** **/
OutPathOrgTree.prototype.selectTree = function () {
	this.init();
};
/**
 * 获取单位树数据
 **/
OutPathOrgTree.prototype.getData = function () {
	var thisObj = this;
 	if (this.options.rootCode == undefined) {
		this.queryCode = top.strFilterOrgCode;
	} else {
		this.queryCode = this.options.rootCode;
	}
	var queryOrgArr = this.getQueryOrgArr();
	Ajax.service("OrgService", "getOrgTreeByOrgCodeArr", [queryOrgArr], function (data) {
		thisObj.getOrgDataSuccessFun(data);
	},function() {thisObj.getDataFailureFun()});
};

/**
 * 获取单位树数据
 **/
OutPathOrgTree.prototype.getQueryOrgArr = function (data) {
	var lastestCode = this.queryCode;
	var queryOrgArr = new Array();
	while(lastestCode.length>0) {
		queryOrgArr.push(lastestCode);
		lastestCode = lastestCode.substring(0,lastestCode.length-3);
	}
	return queryOrgArr;
 };
 


/**
 * 获取单位树数据
 **/
OutPathOrgTree.prototype.getOrgDataSuccessFun = function (data) {
  	this.getDataSuccessFun(data);
  	this.tree_zTreeObj.expandAll(true);
};
 