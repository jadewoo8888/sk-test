  //////////////////////////////////////////////
  //此js文件用于定义前端缓存数据的变量定义及相关方法
  /////////////////////////////////////////////
  
///////////各类树选择控件的缓存数据////////////////
/** 单位树缓存数据**/
var orgTreeCacheData = new Array();
/** 部门树缓存数据**/
var deptTreeCacheData = new Array();
/** 教育16大类资产类别树缓存数据**/
var eduacTreeCacheData = new Array();
/** 国标6大类资产类别树缓存数据,分别按卡片模板(ctPK)和根节点(rootCode) **/
var acTreeCacheDataByCT = new Array();
var acTreeCacheDataByRT = new Array();
  
  
//////////////////////////////////////////////
//资产年限缓存及获取方法
//对外提供的方法为getAssetAge(assetRegAssetType, succCallBackFunc),调用方式:top.getAssetAge(assetRegAssetType, succCallBackFunc)
//////////////////////////////////////////////
/** 资产年限缓存数据 **/
var assetAgeCacheData = new Array();
/**
 * 对外暴露的获取资产年限数据的方法,先从assetAgeCacheData中查找，若没有则发送请求后台查找，并更新到assetAgeCacheData中。
 * @param assetRegAssetType 资产类别内码
 * @param succCallBackFunc 具体页面提供的成功回调方法，拥有一个参数，接收资产年限数值(null:没有找到对应的资产年限，其他数值：找到的资产年限)
 **/
function getAssetAge(assetRegAssetType, succCallBackFunc) {
	var return_data = getAssetAgeFromCache(assetRegAssetType);
	if (return_data) {
		succCallBackFunc(return_data);
	} else {
		getAssetAgeFromService(assetRegAssetType,succCallBackFunc);
	}
}
/**
 * 从缓存中查找对应的资产年限数据
 * @param assetRegAssetType 资产类别内码
 **/
function getAssetAgeFromCache(assetRegAssetType) {
	var return_data = null;
	var assetAgeCacheDataLen = assetAgeCacheData.length;
	for (var i = 0; i < assetAgeCacheDataLen; i++) {
		if (assetAgeCacheData.key == assetRegAssetType) {
			return_data = assetAgeCacheData.value;
			break;
		}
	}
	return return_data;
}
/**
 *  想后台发送获取资产年限数据的请求
 * @param assetRegAssetType资产类别内码
 * @param succCallBackFunc 参考：getAssetAge
 **/
function getAssetAgeFromService(assetRegAssetType, succCallBackFunc) {
	var thisObj = this;
	Ajax.service("AssetAgeBO", "getAssetAgeToAssetRegist", [assetRegAssetType], function(data) { getAssetAgeFromServiceSuccFunc(data,succCallBackFunc);},getAssetAgeFromServiceFailureFunc );
}
function getAssetAgeFromServiceSuccFunc(data,succCallBackFunc) {
	if (data==null||data=='null') {
		succCallBackFunc(null);
		return;
	}
	updateAssetAgeDataForCache(data);
	succCallBackFunc(data.assetAgeUseAge);
}
function getAssetAgeFromServiceFailureFunc(data) {
	top.layer.alert('获取资产年限数据出现错误',{icon:5,closeBtn :2});
}

/**
 * 更新assetAgeCacheData
 **/
function updateAssetAgeDataForCache (data) { 
	if(!data) {
		return;
	}
	var inFlag = false;
	var assetAgeCacheDataLen = assetAgeCacheData.length;		
	for(var i=0;i<assetAgeCacheDataLen;i++) {
		if(assetAgeCacheData[i].key == data.assetAgeAssetType) {
			inFlag = true;
		}
	}
	if(!inFlag) {
		var obj = {key:data.assetAgeAssetType,value:data};
		assetAgeCacheData.push(obj);
	}
};

