
/**
 * 资产类别树入口方法
 * @param options 参数
 * options包含的基本参数可参考treebase.js中的initialize方法的描述
 * rootCode 树的根节点资产类别代码,若没有设置或为空，则按‘001’作为根节点取数
 * ctPK 卡片模板pk，若设置此属性，则按此属性获取树数据，否则按rootCode取数
 * @return 资产类别树对象 
 **/
function acTree(options) {
	var tree = new ACTree(options);
	tree.selectTree();
	return tree;
}
/** 创建资产类别树class，并继承TreeBase **/
var ACTree = Class.create();
ACTree.prototype = new TreeBase();
/** 资产类别树的基本属性设置 **/
ACTree.prototype.str_title = "\u8bf7\u9009\u62e9\u8d44\u4ea7\u7c7b\u522b";
ACTree.prototype.str_ipt_search = "编码、名称或别名";
/** **/
ACTree.prototype.selectTree = function () {
	this.init();
};
ACTree.prototype.getData = function () {
	if(this.options.ctPK!=undefined) {
		this.getACDataByCTPK();
	} else {
		this.getACDataByRootCode();
	}
};

/**
 * 根据设定的根节点，获取树数据
 **/
ACTree.prototype.getACDataByRootCode = function() {
	var thisObj = this;
 	if (this.options.rootCode == undefined || this.options.rootCode == '') {
		this.queryCode = '001';
	} else {
		this.queryCode = this.options.rootCode;
	}
	var acTreeCacheData = thisObj.getACDataFromTopCache();
	if (acTreeCacheData == null) {
		Ajax.service("AssetClassifyService", "getACTree", [this.queryCode], function (data) {
			thisObj.getACDataSuccessFun(data);
		},function() {thisObj.getDataFailureFun()});
	} else {
		this.getDataSuccessFun(acTreeCacheData);
	}
};

/**
 * 根据设定的卡片模板pk，获取对应模板的树数据
 **/
ACTree.prototype.getACDataByCTPK = function() {
	var thisObj = this;
	this.queryCode = this.options.ctPK;
	var acTreeCacheData = thisObj.getACDataFromTopCache();
	if (acTreeCacheData == null) {
		Ajax.service("AssetClassifyService", "getACTreeByCardTemplate", [this.queryCode], function (data) {
		thisObj.getACDataSuccessFun(data);
	});
	} else {
		this.getDataSuccessFun(acTreeCacheData);
	}
};

/**
 *资产类别 树从后台获取成功的处理方法
 * todo
 **/
ACTree.prototype.getACDataSuccessFun = function (data) {
	this.updateACDataForTopCache(data);
	this.getDataSuccessFun(data);
};
 
/**
 *初始化tree的设置
 **/
ACTree.prototype.initTreeSet = function () {
	var thisObj = this;
	this.tree_setting = {data:{simpleData:{enable:true, displayCode:"acDisplayCode", idKey:"acCode", pIdKey:"acParentCode", rootPId:""}}, view:{selectedMulti:false, fontCss:function (treeId, treeNode) {
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
ACTree.prototype.dealNoteViewData = function (jsonData) {
	for (var i = 0; i < jsonData.length; i++) {
   		jsonData[i].name = '['+jsonData[i].acDisplayCode+']'+jsonData[i].acName;
	}
};

/**
 * 自定义节点搜索方法
 **/
ACTree.prototype.nodesFilter = function(node) {
        var filterFlag = false;
        /** 部门和单位树只需要搜索名称和外码 **/
        if (node.name.indexOf(this.searchText) != -1) {
            filterFlag = true;
        }
       	/** 资产树多搜索一个别名 **/
        if(node.acNameAlias) {
        	if (node.acNameAlias.indexOf(this.searchText) != -1) {
            	filterFlag = true;
        	}
        }
        return filterFlag;
};


/**
 * 从mainframe页面中获取缓存的树数据
 **/
ACTree.prototype.getACDataFromTopCache = function () {
	var return_data = null;
	var cacheData = null;
	if(this.options.ctPK!=undefined) {
		cacheData = top.acTreeCacheDataByCT;
 	} else {
 		cacheData = top.acTreeCacheDataByRT;
 	}
 	var cacheDataLen = cacheData.length;
	for(var i=0;i<cacheDataLen;i++) {
		if(cacheData[i].key == this.queryCode ) {
			return_data = cacheData[i].value;
			break;
		}
	}
 	return return_data;
};

/**
 * 从mainframe页面中获取缓存的树数据
 **/
ACTree.prototype.updateACDataForTopCache = function (data) {
	var cacheData = null;
	if(this.options.ctPK!=undefined) {
		cacheData = top.acTreeCacheDataByCT;
 	} else {
 		cacheData = top.acTreeCacheDataByRT;
 	}

	var inFlag = false;
	var cacheDataLen = cacheData.length;		
	for(var i=0;i<cacheDataLen;i++) {
		if(cacheData[i].key == this.queryCode ) {
			inFlag = true;
		}
	}
	if(!inFlag) {
		var obj = {key:this.queryCode,value:data};
		cacheData.push(obj);
	}
};

