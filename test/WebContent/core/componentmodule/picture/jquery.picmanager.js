
/**
 * controlType:控制类型， STR_REGISTER_ADDNEW,STR_REGISTER_MODIFY,STR_VIEW
 * busiType：业务类型
 * pk 业务主键pk,可能为空，当新增时 
 **/
jQuery.fn.extend({picmanager:function (options) {
	var _self = this, _this = $(this);
	var op = jQuery.extend({controlType:STR_VIEW, busiType:"", pk:""}, options || {});
	var picWidth = 155;//缩略图宽度,图宽度150，还有一些边框线宽度
	var rowMaxPicCount = 0; //图像区域每行没最多容纳的图片数(含点击新增图标)
	var $ul = null;//图片区域图片容器对象
	var completePicData = new Array();//用于存放图片数据，包括图片区域内新增，修改，删除的数据，最后交由具体业务页面后台处理
	/**
	 * 方法入口
	 **/
	function init() {
		initParameter();
		initDisplay();
		initData();
	}
	/**
	 * 初始化计算相关参数
	 **/
	function initParameter() {
		var areaWidth = _this.width();
		var picPadding = 20;
		areaWidth = areaWidth - 20;//左右10边距
		if (areaWidth) {
		} else {
		}
		rowMaxPicCount = (areaWidth + 20) / (150 + picPadding);
		rowMaxPicCount = parseInt(rowMaxPicCount);
	}
	/**
	 * 重新设置layer的预览，添加和删除图片后都需要调用
	 **/
	function reAssetPhotoLayer() {
		top.layer.ready(function () {
			top.layer.photos({
				photos:_this,
				area:'auto'
			});
		});
	}
	function initDisplay() {
		$ul = $("<ul class=\"ulfilelist\"></ul>").appendTo(_this); // 图片容器
		//若不是查看，添加添加图片图标
		if (op.controlType != STR_VIEW) {
			createAddCoin();
		}
	}
	function createAddCoin() {
		var $li = $("<li id=\"id_li_addpicicon\" class=\"addpicicon\"></li>");
		$ul.append($li);
		$li.click(addPic);
	}
	function initData() {
		if (!op.pk) {
			return;
		}
		getPicInfoData();
	}
	function getPicInfoData() {
		_this.addLoading({msg:"\u83b7\u53d6\u8d44\u4ea7\u56fe\u7247\u6570\u636e\u4e2d..."});
		Ajax.service("AssetPictureBO", "getPicDataByAssetregAssetNo", [op.pk], getPicInfoDataSuccFunc, getPicInfoDataFailureFunc);
	}
	function getPicInfoDataSuccFunc(data) {
		_this.removeLoading();
		if (data == null || data.length == 0) {
			drawNoDataTip();
			return;
		}
		var dataLen = data.length;
		for (var i = 0; i < dataLen; i++) {
			drawOnePic(data[i]);
		}
		reAssetPhotoLayer();
	}
	
	function getPicInfoDataFailureFunc() {
		_this.removeLoading();
		top.layer.alert("\u83b7\u53d6\u8d44\u4ea7\u56fe\u7247\u6570\u636e\u51fa\u73b0\u9519\u8bef\uff0c\u8bf7\u8054\u7cfb\u7ba1\u7406\u5458 ", {icon:5, closeBtn:2});
	}
	
	function drawNoDataTip() {
		if (op.controlType == STR_VIEW) {
			_this.empty();
			$span = $("<span class='notdatatip'>没有图片数据</span>").appendTo(_this);
		}
	} 
	
	function addPic() {
		var index = top.layer.open({type:2, title:"\u56fe\u7247\u4e0a\u4f20", area:["690px", "500px"], shift:1, closeBtn:2, content:contextPath + "/core/componentmodule/picture/editPicUpload.jsp?openwindowname=" + window.name});
	}
	function addPicCallBackFunc(successUploadInfo) {
		if (successUploadInfo == null && successUploadInfo.length == 0) {
			return;
		}
		var successUploadInfoLen = successUploadInfo.length;
		for (var i = 0; i < successUploadInfoLen; i++) {
			successUploadInfo[i].rowStatus = INT_ROW_STATUS_INSERT;
			completePicData.push(successUploadInfo[i]);
			drawOnePic(successUploadInfo[i]);
		}
		reAssetPhotoLayer();
	}
	/**
 	 * 在completePicData中删除图片数据，会判断当前数据是此次新增还是已存在数据库。仅在completePicData中删除或新增，不向后台发送删除请求
     * @param picture 删除的图片信息
     **/
	function deletePicture(picture) {
		var inCompletePicDataFlag = false;
		
		//目前completePicData中只存在新增，删除(已存在于数据库)的图片数据
		var completePicDataLen = completePicData.length;
		for (var j = 0; j < completePicDataLen; j++) {
			//此图片是此次新增，然后点击删除触发
			if (picture.fileID == completePicData[j].fileID) {
				completePicData.splice(j, 1);
				inCompletePicDataFlag = true;
				break;
			}
		}
		//非此次新增的图片触发的删除，即存在于数据库中
		if (!inCompletePicDataFlag) {
			picture.rowStatus = INT_ROW_STATUS_DELETE;
			completePicData.push(picture);
		}
	}
	function getPictureDataFunc() {
		return completePicData;
	}
	function drawOnePic(picture) {
		var $li = $("<li title=\"" + picture.fileName + "\" id=\"" + picture.fileID + "\">" + "<p class=\"title\">" + picture.fileName + "</p>" + "<p class=\"imgWrap\"></p>" + "</li>"), $btns = $("<div class=\"file-panel\">" + "<span class=\"cancel\">\u5220\u9664</span>").appendTo($li);
		$ul.append($li);
		$wrap = $li.find("p.imgWrap");
		$wrap.text("\u9884\u89c8\u4e2d");
		var img = $("<img width=\"150\" height=\"150\" alt=\""+ picture.fileName+"\" src =\"" + Ajax.filedownloadurl + "\">");
		var picComUrl = Ajax.getAssetPicUrl("COM150", "INFO", picture);
		var picOriUrl = Ajax.getAssetPicUrl("ORIGINAL", "INFO", picture);
		img.attr("src", picComUrl);
		img.attr("layer-src", picOriUrl);
		$wrap.empty().append(img);
		if (op.controlType != STR_VIEW) {
			$li.on("mouseenter", function () {
				$btns.stop().animate({height:30});
			});
			$li.on("mouseleave", function () {
				$btns.stop().animate({height:0});
			});
			//todo 重新调用绘画layer预览图
			$btns.on("click", "span", function () {
				deletePicture(picture);
				$li.remove();
				reAssetPhotoLayer();
			});
		}
	}
	var myObj = {callbackfunc:addPicCallBackFunc, getPictureData:getPictureDataFunc};
	$(this).data(myObj);
	//方法入口
	init();
}});

