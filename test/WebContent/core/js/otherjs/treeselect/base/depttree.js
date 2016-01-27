
/**
 * 部门树入口方法
 * @param options 参数
 * options包含的基本参数可参考treebase.js中的initialize方法的描述
 * rootCode 树的根节点单位代码,若没有设置，则取top.strFilterOrgCode作为根节点
 * @return 资产类别树对象
 **/
function deptTree(options) {
	var tree = new DeptTree(options);
	tree.selectTree();
	return tree;
}
/** 创建部门树class，并继承TreeBase **/
var DeptTree = Class.create();
DeptTree.prototype = new TreeBase();
/** 部门树的基本属性设置 **/
DeptTree.prototype.str_title = "\u8bf7\u9009\u62e9\u90e8\u95e8";
DeptTree.prototype.str_ipt_search = "\u90e8\u95e8\u7f16\u7801\u6216\u540d\u79f0";
/** **/
DeptTree.prototype.selectTree = function () {
	this.init();
};
/**
 * 获取部门树数据
 **/
DeptTree.prototype.getData = function () {
	var thisObj = this;
	if (this.options.rootCode == undefined) {
		this.queryCode = top.strFilterOrgCode;
	} else {
		this.queryCode = this.options.rootCode;
	}
	var deptTreeCacheData = this.getDataFromTopCache();
	if(deptTreeCacheData==null) {
		Ajax.service("DepartmentBO", "getDepartmentTree", [this.queryCode], function (data) {
		thisObj.getDeptDataSuccessFun(data);
	},function() {thisObj.getDataFailureFun()});
	} else {
		this.getDataSuccessFun(deptTreeCacheData);
	}
};

/**
 * 获取部门树数据成功处理方法
 **/
DeptTree.prototype.getDeptDataSuccessFun = function (data) {
	this.updateDataForTopCache(data);
 	this.getDataSuccessFun(data);
};

/**
 *初始化tree的设置
 **/
DeptTree.prototype.initTreeSet = function () {
	var thisObj = this;
	this.tree_setting = {data:{simpleData:{enable:true, displayCode:"deptDisplayCode", idKey:"deptCode", pIdKey:"deptParentCode", rootPId:""}}, view:{selectedMulti:false, fontCss:function (treeId, treeNode) {
		return thisObj.getFontCss(treeId, treeNode);
	}, expandSpeed:"fast"}, callback:{onDblClick:function (event, treeId, treeNode) {
		thisObj.treeDoubleClick(event, treeId, treeNode);
	}}};
	if (this.options.selType == "mul") {
		this.tree_setting.check = {enable:true, chkStyle:"checkbox", chkboxType:{"Y":"ps", "N":"ps"}};
	}
	//资产统计部门选择树处理
	if (this.options.busiType == "statictis") {
		this.tree_setting.check = {enable:true, chkStyle:"checkbox", chkboxType:{"Y":"", "N":""}};
	}
};

/**
 *处理树节点显示的数据 
 **/
DeptTree.prototype.dealNoteViewData = function (jsonData) {
	for (var i = 0; i < jsonData.length; i++) {
   		jsonData[i].name = '['+jsonData[i].deptDisplayCode+']'+jsonData[i].deptName;
	}
};

/**
 * 从mainframe页面中获取缓存的树数据
 **/
DeptTree.prototype.getDataFromTopCache = function () {
	var return_data = null;
	var dataLen = top.deptTreeCacheData.length;
	for(var i=0;i<dataLen;i++) {
		if(top.deptTreeCacheData[i].key == this.queryCode ) {
			return_data = top.deptTreeCacheData[i].value;
			break;
		}
	}
 	return return_data;
};

/**
 * 从mainframe页面中获取缓存的树数据
 **/
DeptTree.prototype.updateDataForTopCache = function (data) { 
	var inFlag = false;
	var dataLen = top.deptTreeCacheData.length;		
	for(var i=0;i<dataLen;i++) {
		if(top.deptTreeCacheData[i].key == this.queryCode ) {
			inFlag = true;
		}
	}
	if(!inFlag) {
		var obj = {key:this.queryCode,value:data};
		top.deptTreeCacheData.push(obj);
	}
};

