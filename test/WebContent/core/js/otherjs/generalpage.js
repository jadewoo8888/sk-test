//////////////////列表及编辑页面相关的公共js方法//////////////////////////
/**
 * 打开资产选择页面,具体页面可定义两个方法：
 * 方法1：需要时定义，getAssetSelectedData,返回已选中的资产数据assetRegAssetNo(6.0中相当于pk)数组,若没有数据时返回null即可
 * 方法2：必须定义，updateAssetSelectedData(selectRowData)，用于接收返回的资产对象数组
 * 方法3：需要时定义，setAssetComponentQC，返回页面自定义资产查询条件，若业务类型有一些除了assetcheckflag和资产状态status以外的查询条件,均在次方法内定义返回
 *
 * @param strSelecttype 选择类型，mul：多选 sgl:单选
 * @param strBusitype 业务类型，目前可定义的业务类型有：
 * @param strBusiPK 业务主键pk
 * 1、assetregbill（入库单登记-->选择未对账资产）
 * 2、assetaccount（资产入账-->选择未对账资产）
 * 3、assetwriteoff（资产处置）
 * 4、assetissue（低值易耗品-->资产发放）
 **/
function openAssetSelect(strSelecttype, strBusitype,strBusiPK) {
	top.layer.open({type:2, title:"\u8d44\u4ea7\u9009\u62e9", shift:1, closeBtn:2, area:["1240px", "600px"], content:contextPath + "/core/componentmodule/assetselect/listAssetSelect.jsp?selecttype=" + strSelecttype + "&busitype=" + strBusitype + "&busipk="+strBusiPK+"&openwindowname=" + window.name});
}
/*
 * 汇总单位判断（用户操作单位）
 * return：true：该单位不是汇总单位，false：该单位是汇总单位
 */
function judgeOpeCollectOrg() {
	if (top.strFilterOrgIsCollect != "YesNo_001") {
		return true;
	}
	top.layer.alert("\u6c47\u603b\u5355\u4f4d\u4e0d\u80fd\u6267\u884c\u8be5\u64cd\u4f5c ", {shadeClose:true,closeBtn:2, icon:5});
	return false;
}
/*
 * 汇总单位判断（用户所属单位）
 * return:回值：true：该单位不是汇总单位，false：该单位是汇总单位
 */
function judgeUserCollectOrg() {
	if (top.strOrgIsCollect != "YesNo_001") {
		return true;
	}
	top.layer.alert("\u6c47\u603b\u5355\u4f4d\u4e0d\u80fd\u6267\u884c\u8be5\u64cd\u4f5c ", {shadeClose:true,closeBtn:2, icon:5});
	return false;
}
/** 默认设置不可编辑状态的按钮名称数组  **/
var defaultdisableBtnValueArr = ["\u786e\u5b9a", "\u4fdd\u5b58", "\u5ba1\u6279", "\u540c\u610f", "\u4e0d\u540c\u610f"];
/**
 * 设置按钮不可编辑状态，用于提交请求时，防止重复点击按钮导致重复提交
 * 保存前调用此方法(true)设置按钮不可编辑，保存成功或失败时调用方法(false)，移除按钮的不可编辑状态
 * @param disFlag 不可编辑状态 true：不可编辑 false:可编辑
 * @param btnValueArr 需要设置不可编辑的按钮名称数组，若没有特殊需求，可不传递此参数，将使用默认值
 **/
function changeBtnDisabled(disFlag, btnValueArr) {
	if (btnValueArr != undefined && btnValueArr != null) {
		defaultdisableBtnValueArr = btnValueArr;
	}
	var btns = $("input:button");
	btns.each(function (index, element) {
		var inArrayIndex = $.inArray($(this).val(), defaultdisableBtnValueArr);
		if (inArrayIndex != -1) {
			$(this).attr("disabled", disFlag);
		}
	});
}
/**
  * 查看资产明细,先按资产类别获取资产所属大类信息，再按不同模板打开相应查看页面
  * @param assetRegAssetNo  资产内部编号(6.0升级为主键)
  * @param assetRegAssetType  资产分类代码
  * @return
  */
function viewAsset(assetRegAssetNo, assetRegAssetType) { 
 	//匹配资产的查看模板  
 	var bigAssetTypeArr = top.getAssetBigType(assetRegAssetType);
 	openAssetDetailPage(bigAssetTypeArr[1],assetRegAssetNo);
}

/** 
 * 打开资产查看明细页面
 * @param cardpk 资产模板pk
 * @param assetRegAssetNo 资产内部编号(6.0升级为主键)
 **/
function openAssetDetailPage(cardpk,assetRegAssetNo) {
	if (cardpk != null && cardpk != undefined && cardpk != null) {
		var assetPageName = "";
		if (cardpk == "1") {
			assetPageName = "viewLand";
		} else if(cardpk == "2"){ 
			assetPageName = "viewHouse";
		}else if(cardpk == "3"){
			assetPageName = "viewVehicle";
		}else{
			assetPageName = "viewCommon";
		}
		top.layer.open({type:2, title:"\u67e5\u770b\u8d44\u4ea7", shift:1, closeBtn:2, area:["1000px", "580px"], shade:false, maxmin:true, zIndex:layer.zIndex, success:function (layero) {
			top.layer.setTop(layero);
		}, content:contextPath + "/core/componentmodule/assetview/" + assetPageName + ".jsp?assetRegAssetNo=" + assetRegAssetNo + "&cardpk=" + cardpk});
	} else {
		top.layer.alert("\u6a21\u677f\u4e22\u5931 ", {closeBtn:2, icon:5});
	}
}

/**
 * 获取资产大类中文名称
 * @param assetTypeCode 六大类资产类别内部编码
 * @return 编码所对应的资产大类中文名
 **/
function getBigAssetTypeName(assetTypeCode) {
	var return_bigAssetTypeName = '';
	var prefixCode = assetTypeCode.substring(0,6);
	switch(prefixCode){
		case "001001":
			return_bigAssetTypeName = "土地、房屋及构筑物";
			break;
		case "001002":
			return_bigAssetTypeName = "通用设备";
			break;
		case "001003":
			return_bigAssetTypeName = "专用设备"
			break;
		case "001004":
			return_bigAssetTypeName = "文物和陈列品"
			break;
		case "001005":
			return_bigAssetTypeName = "图书、档案"
			break;
		case "001006":
			return_bigAssetTypeName = "家具、用具、装具及动植物"
			break;
		default:return_bigAssetTypeName = '';
	}
	return return_bigAssetTypeName;
}

/**
 * 查看物业单元明细
 * @param pk 单元pk
 **/
function viewHouseUnit(pk) { 
	top.layer.open({
		type:2,
		title:'物业信息查看',
		shift:1,
		closeBtn :2,
		area:['900px','628px'],
		shade:false,
		zIndex:layer.zIndex, 
		success:function(layero){
	   		top.layer.setTop(layero); 
		},
		content:contextPath+'/sys/basemodules/propertymanagement/houseunit/viewHouseUnit.jsp?pk='+pk
	});
}


/**
 * 查看合同明细
 * @param fieldName查询值类型，分别为hlcpk或hlccode，则对应的fieldvalue传递相应字段值
 * @param fieldValue,hlcpk 或 hlccode
 **/
function viewContract(fieldName,fieldValue) { 
	top.layer.open({
		type:2,
		title:'合同信息查看',
		shift:1,
		closeBtn :2,
		area:['1100px','650px'],
		shade:false,
		zIndex:layer.zIndex, 
		success:function(layero){
	   		top.layer.setTop(layero); 
		},
		content:contextPath+'/sys/basemodules/propertymanagement/contractmanage/contractregist/viewContractRegist.jsp?fieldname='+fieldName+'&fieldvalue='+fieldValue+'&busitype='+STR_VIEW
	});
}

//兼容没有trim方法的浏览器
if (!String.prototype.trim) {
		String.prototype.trim = function () {
		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};
}