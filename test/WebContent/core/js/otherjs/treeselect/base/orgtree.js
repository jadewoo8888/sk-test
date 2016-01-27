
/**
 * 调用单位树入口方法
 * @param options  参数
 * options包含的基本参数可参考treebase.js中的initialize方法的描述
 * rootCode 树的根节点单位代码,若没有设置，则取top.strFilterOrgCode作为根节点 *
 * @return 单位树对象
 **/
function orgTree(options) { 
	var tree = new OrgTree(options);
	tree.selectTree(); 
	return tree;
}
/** 创建单位树class，并继承TreeBase **/
var OrgTree = Class.create();
OrgTree.prototype = new TreeBase();
/** 单位树的基本属性设置 **/
OrgTree.prototype.str_title = "\u8bf7\u9009\u62e9\u5355\u4f4d";
OrgTree.prototype.str_ipt_search = "\u5355\u4f4d\u7f16\u7801\u6216\u540d\u79f0";
/** **/
OrgTree.prototype.selectTree = function () {
	this.init();
};
/**
 * 获取单位树数据
 **/
 
OrgTree.prototype.getData = function () {
	var thisObj = this;
 	if (this.options.rootCode == undefined) {
		this.queryCode = top.strFilterOrgCode;
	} else {
		this.queryCode = this.options.rootCode;
	}
	var orgTreeCacheData = this.getDataFromTopCache();
	if(orgTreeCacheData==null) {
		Ajax.service("OrgService", "getOrgTree", [this.queryCode], function (data) {
			thisObj.getOrgDataSuccessFun(data);
		},function() {thisObj.getDataFailureFun()});
	} else {
		this.getDataSuccessFun(orgTreeCacheData);
	}
	
};


/**
 * 获取单位树数据
 **/
OrgTree.prototype.getOrgDataSuccessFun = function (data) {
	this.updateDataForTopCache(data);
 	this.getDataSuccessFun(data);
};


/**
 *初始化tree的设置
 **/
OrgTree.prototype.initTreeSet = function () {
	var thisObj = this;
	this.tree_setting = {data:{simpleData:{enable:true, displayCode:"orgDisplayCode", idKey:"orgCode", pIdKey:"orgUpCode", rootPId:""}}, view:{selectedMulti:false, fontCss:function (treeId, treeNode) {
		return thisObj.getFontCss(treeId, treeNode);
	}, expandSpeed:"fast"}, callback:{onDblClick:function (event, treeId, treeNode) {
		thisObj.treeDoubleClick(event, treeId, treeNode);
	}}};
	if (this.options.selType == "mul") {
		this.tree_setting.check = {enable:true, chkStyle:"checkbox", chkboxType:{"Y":"ps", "N":"ps"}};
	}
};

/**
 *处理树节点显示的数据 
 **/
OrgTree.prototype.dealNoteViewData = function (jsonData) {
	for (var i = 0; i < jsonData.length; i++) {
   		jsonData[i].name = '['+jsonData[i].orgDisplayCode+']'+jsonData[i].orgName;
	}
};
 
/**
 * 从mainframe页面中获取缓存的树数据
 **/
OrgTree.prototype.getDataFromTopCache = function () {
	var return_data = null;
	var orgTreeCacheDataLen = top.orgTreeCacheData.length;
	for(var i=0;i<orgTreeCacheDataLen;i++) {
		if(top.orgTreeCacheData[i].key == this.queryCode ) {
			return_data = top.orgTreeCacheData[i].value;
			break;
		}
	}
 	return return_data;
};

/**
 * 从mainframe页面中获取缓存的树数据
 **/
OrgTree.prototype.updateDataForTopCache = function (data) { 
	var inFlag = false;
	var orgTreeCacheDataLen = top.orgTreeCacheData.length;		
	for(var i=0;i<orgTreeCacheDataLen;i++) {
		if(top.orgTreeCacheData[i].key == this.queryCode ) {
			inFlag = true;
		}
	}
	if(!inFlag) {
		var obj = {key:this.queryCode,value:data};
		top.orgTreeCacheData.push(obj);
	}
};


