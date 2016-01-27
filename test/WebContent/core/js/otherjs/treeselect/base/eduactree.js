/**
 * 教育资产类别树入口方法
 * @param options 参数
 * options包含的基本参数可参考treebase.js中的initialize方法的描述
 * rootCode 树的根节点教育资产类别代码,若没有设置或为空，则按‘001’作为根节点取数
 * @return 教育资产类别树对象 
 **/
function eduacTree(options) {
	var tree = new EduACTree(options);
	tree.selectTree();
	return tree;
}
/** 创建教育资产类别树class，并继承TreeBase **/
var EduACTree = Class.create();
EduACTree.prototype = new TreeBase();
/** 教育资产类别树的基本属性设置 **/
EduACTree.prototype.str_title = "请选择教育资产类别";
EduACTree.prototype.str_ipt_search = "编码、名称或别名"
/** **/
EduACTree.prototype.selectTree = function () {
	this.init();
};
EduACTree.prototype.getData = function () {
	this.getACDataByRootCode();
};

/**
 * 根据设定的根节点，获取树数据
 **/
EduACTree.prototype.getACDataByRootCode = function() {
	var thisObj = this;
 	if (this.options.rootCode == undefined || this.options.rootCode == '') {
		this.queryCode = '001';
	} else {
		this.queryCode = this.options.rootCode;
	}
	var eduacTreeCacheData = thisObj.getEduACDataFromTopCache();
	if (eduacTreeCacheData == null) {
		Ajax.service("EduAssetClassifyService", "getEduACTree", [this.queryCode], function (data) {
			thisObj.getEduACDataSuccessFun(data);
		},function() {thisObj.getDataFailureFun()});
	} else {
		this.getDataSuccessFun(eduacTreeCacheData);
	}
};
 

/**
 *教育资产类别树从后台获取成功的处理方法
 * todo
 **/
EduACTree.prototype.getEduACDataSuccessFun = function (data) {
	this.updateEduACDataForTopCache(data);
	this.getDataSuccessFun(data);
};
 
/**
 *初始化tree的设置
 **/
EduACTree.prototype.initTreeSet = function () {
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
EduACTree.prototype.dealNoteViewData = function (jsonData) {
	for (var i = 0; i < jsonData.length; i++) {
   		jsonData[i].name = '['+jsonData[i].acDisplayCode+']'+jsonData[i].acName;
	}
};

/**
 * 自定义节点搜索方法
 **/
EduACTree.prototype.nodesFilter = function(node) {
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
EduACTree.prototype.getEduACDataFromTopCache = function () {
	var return_data = null;
 	var cacheDataLen = top.eduacTreeCacheData.length;
	for(var i=0;i<cacheDataLen;i++) {
		if(top.eduacTreeCacheData[i].key == this.queryCode ) {
			return_data = top.eduacTreeCacheData[i].value;
			break;
		}
	}
 	return return_data;
};

/**
 * 从mainframe页面中获取缓存的树数据
 **/
EduACTree.prototype.updateEduACDataForTopCache = function (data) {
	var inFlag = false;
	var cacheDataLen = top.eduacTreeCacheData.length;		
	for(var i=0;i<cacheDataLen;i++) {
		if(top.eduacTreeCacheData[i].key == this.queryCode ) {
			inFlag = true;
		}
	}
	if(!inFlag) {
		var obj = {key:this.queryCode,value:data};
		top.eduacTreeCacheData.push(obj);
	}
};

