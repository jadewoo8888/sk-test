var openWindow = null;//打开当前窗口的窗口对象
var fileCount = 0; // 添加的文件数量
var maxFileCount = 20; //最多一次上传的文件数量
var maxFileSize = 100 * 1024 * 1024; //文件总大小 100m
var maxFileSingleSize = 20 * 1024 * 1024; //单个文件最大大小 20m
var fileSize = 0; // 添加的文件总大小
var thumbnailWidth = 150; // 缩略图大小
var thumbnailHeight = 150;
var percentages = {}; // 所有文件的进度信息，key为file id
var state = 'pedding'; // 可能有pedding, ready, confirm, done.
var $wrap = null;
var $queue = null; // 图片容器
var $upload = null; // 上传按钮
var $statusBar = null; // 状态栏，包括进度和控制按钮
var $info = null; // 文件总体选择信息。
var $placeHolder = null; //// 没选择文件之前的内容。
var $progress = null; // 总体进度条
var uploader = null;
var successUploadInfo = new Array();
var failureUploadInfo = new Array();

/**
 * 初始化方法
 **/
$(function() {
    if (!checkBrowserSupport()) {
        top.layer.alert('浏览器不支持图片上传！如果你使用的是IE浏览器，请尝试升级 FlashPlayer后重试！', {
            shadeClose: true,
            closeBtn: 2,
            icon: 7
        });
        return;
    }
    checkBrowserSupport();
    initOpenWindow();
    initComDisplay();
    initComBindFunc();
    initUploadParameter();
    initUpload();
});

/**
 * 检查浏览器的支持
 * false:不支持 true:支持
 **/
function checkBrowserSupport() {
    var supFlag = true;
    if (!WebUploader.Uploader.support()) {
        supFlag = false;
    }
    return supFlag;
}

/**
 * 初始化设置页面组件的显示
 **/
function initComDisplay() {
    /** ie浏览器不显示支持拖拽的提示 **/
    if (!$.browser.msie) {
        $('#id_p_drag').show();
    }
}

function initUploadParameter() {
    $wrap = $('#uploader');
    $queue = $('<ul class="filelist"></ul>').appendTo($wrap.find('.queueList')); // 图片容器
    $queueList = $wrap.find('.queueList');
    $upload = $wrap.find('.uploadBtn'); // 上传按钮
    $statusBar = $wrap.find('.statusBar'); // 状态栏，包括进度和控制按钮
    $info = $statusBar.find('.info'); //// 文件总体选择信息。
    $placeHolder = $wrap.find('.placeholder') //// 没选择文件之前的内容。
    $progress = $statusBar.find('.progress').hide(); //// 总体进度条
}

function initUpload() {
	var paramStr = assembleRequertPara();
    uploader = WebUploader.create({
        pick: {
            id: '#filePicker',
            label: '点击选择图片'
        },
        dnd: '#uploader .queueList',

        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },
        compress:false,

        // swf文件路径
        swf: contextPath+'/core/js/webuploader/Uploader.swf',
        disableGlobalDnd: false,
        prepareNextFile: true,
        server: Ajax.picuploadurl+'?'+paramStr,
        fileNumLimit: maxFileCount,
        fileSizeLimit: maxFileSize,
        fileSingleSizeLimit: maxFileSingleSize
    });

    // 添加“添加文件”的按钮，
    uploader.addButton({
        id: '#filePicker2',
        label: '继续添加'
    });

    uploader.onUploadProgress = function(file, percentage) {
        var $li = $('#' + file.id),
        $percent = $li.find('.progress span');

        $percent.css('width', percentage * 100 + '%');
        percentages[file.id][1] = percentage;
        updateTotalProgress();
    };

    uploader.onFileQueued = function(file) {
        fileCount++;
        if (fileCount > maxFileCount) {
            top.layer.alert('一次最多选择上传' + maxFileCount + '张图片!', {
                shadeClose: true,
                closeBtn: 2,
                icon: 7
            });
            return;
        }
        fileSize += file.size;
        if (fileCount === 1) {
            $placeHolder.addClass('element-invisible');
            $queueList.height(350);
            $statusBar.show();
        }
        addFile(file);
        setState('ready');
        updateTotalProgress();
    };

    uploader.onFileDequeued = function(file) {
        fileCount--;
        fileSize -= file.size;

        if (!fileCount) {
            setState('pedding');
        }

        removeFile(file);
        updateTotalProgress();
    };
    
    uploader.onUploadSuccess = function( file, response ) {
    	var uploadFlag = false;
    	if(response.status == "success") {
    	    var picInfo = tranResponseToPicInfo(file,response);
    		successUploadInfo.push(picInfo);
    		uploadFlag =  true;  
    	} else {
    		failureUploadInfo.push(file.id);
    	}
    	return uploadFlag;
    };
    uploader.onUploadFinished = function () {
    	setState('confirm');
    	var resultInfoStr = "共成功上传："+successUploadInfo.length+" 张图片。";
    	if(failureUploadInfo.length>0) {
    		resultInfoStr += "上传失败："+failureUploadInfo.length+"张图片。";
    	} 
    	top.layer.open({
			title:'上传结果提示',
			icon: 6,
			area:['280px','180px'],
			content:resultInfoStr,
			shift:1,
			closeBtn :0,
			yes: function(index){
  		   	 	top.layer.close(index);
  		   	 	callOpenBackFunc();
  		   	 	cancel();
  	   		},
			cancel:function(index){
  		   	 	top.layer.close(index);
  		   	 	callOpenBackFunc();
  		   	 	cancel();
 	    	}
		});
    	
    };
    uploader.onStartUpload = function () {
    	 setState('uploading');
    };
    uploader.onError = function(code) {
        switch (code) {
        case 'F_DUPLICATE':
            text = '文件已经添加了哦!';
            break;
        case 'Q_TYPE_DENIED':
            text = '非图片文件类型!';
            break;
        case 'Q_EXCEED_SIZE_LIMIT':
            text = '文件总大小超过了限制值:' + maxFileSize / 1024 / 1024 + "mb!";
            break;
        case 'F_EXCEED_SIZE':
            text = '文件大小超过了限制值:' + maxFileSingleSize / 1024 / 1024 + "mb!";
            break;
        case 'Q_EXCEED_NUM_LIMIT':
            text = '文件数量超过了限制值:' + maxFileCount + "张!";
            break;
        default:
            text = '出现错误，代码:' + code;
            break;
        }
        top.layer.alert(text, {
            shadeClose: true,
            closeBtn: 2,
            icon: 7
        });
    };

    $upload.on('click',
    function() {
        if ($(this).hasClass('disabled')) {
            return false;
        }

        if (state === 'ready') {
            uploader.upload();
        }  
    });

    $info.on('click', '.retry',
    function() {
        uploader.retry();
    });

    $info.on('click', '.ignore',
    function() {
        alert('todo');
    });

    $upload.addClass('state-' + state);
    updateTotalProgress();

}

// 当有文件添加进来时执行，负责view的创建
function addFile(file) {
    var $li = $('<li id="' + file.id + '">' + '<p class="title">' + file.name + '</p>' + '<p class="imgWrap"></p>' + '<p class="progress"><span></span></p>' + '</li>'),

    $btns = $('<div class="file-panel">' + '<span class="cancel">删除</span>').appendTo($li),
    $prgress = $li.find('p.progress span'),
    $wrap = $li.find('p.imgWrap'),
    $info = $('<p class="error"></p>'),

    showError = function(code) {
        switch (code) {
        case 'exceed_size':
            text = '文件大小超出';
            break;

        case 'interrupt':
            text = '上传暂停';
            break;

        default:
            text = '上传失败，请重试';
            break;
        }

        $info.text(text).appendTo($li);
    };

    if (file.getStatus() === 'invalid') {
        showError(file.statusText);
    } else {
    var imgd = new Image();//构造JS的Image对象  
          // @todo lazyload
        $wrap.text('预览中');
        uploader.makeThumb(file,
        function(error, src) {  
            if (error) {
                $wrap.text('不能预览');
                return;
            }
            var img = $('<img  src="' + src + '">'); 
            $wrap.empty().append(img);
        },
        150, 150);

        percentages[file.id] = [file.size, 0];
        file.rotation = 0;
    }

    file.on('statuschange',
    function(cur, prev) {
        if (prev === 'progress') {
            $prgress.hide().width(0);
        } else if (prev === 'queued') {
            $li.off('mouseenter mouseleave');
            $btns.remove();
        }

        // 成功
        if (cur === 'error' || cur === 'invalid') {
            alert('文件上传错误'+file.statusText);
            showError(file.statusText);
            percentages[file.id][1] = 1;
        } else if (cur === 'interrupt') {
            showError('interrupt');
        } else if (cur === 'queued') {
            percentages[file.id][1] = 0;
        } else if (cur === 'progress') {
            $info.remove();
            $prgress.css('display', 'block');
        } else if (cur === 'complete') {
            $li.append('<span class="success"></span>');
        }

        $li.removeClass('state-' + prev).addClass('state-' + cur);
    });

    $li.on('mouseenter',
    function() {
        $btns.stop().animate({
            height: 30
        });
    });

    $li.on('mouseleave',
    function() {
        $btns.stop().animate({
            height: 0
        });
    });

    $btns.on('click', 'span',
    function() {
        var index = $(this).index(),
        deg;

        switch (index) {
        case 0:
            uploader.removeFile(file);
            return;

        case 1:
            file.rotation += 90;
            break;

        case 2:
            file.rotation -= 90;
            break;
        }

        if (supportTransition) {
            deg = 'rotate(' + file.rotation + 'deg)';
            $wrap.css({
                '-webkit-transform': deg,
                '-mos-transform': deg,
                '-o-transform': deg,
                'transform': deg
            });
        } else {
            $wrap.css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + (~~ ((file.rotation / 90) % 4 + 4) % 4) + ')');
        }
    });
    $li.appendTo($queue);
}

// 负责view的销毁
function removeFile(file) {
    var $li = $('#' + file.id);

    delete percentages[file.id];
    updateTotalProgress();
    $li.off().find('.file-panel').off().end().remove();
}

function updateTotalProgress() {
    var loaded = 0,
    total = 0,
    spans = $progress.children(),
    percent;

    $.each(percentages,
    function(k, v) {
        total += v[0];
        loaded += v[0] * v[1];
    });

    percent = total ? loaded / total: 0;

    spans.eq(0).text(Math.round(percent * 100) + '%');
    spans.eq(1).css('width', Math.round(percent * 100) + '%');
    updateStatus();
}
function setState(val) {
    var file, stats;

    if (val === state) {
        return;
    }

    $upload.removeClass('state-' + state);
    $upload.addClass('state-' + val);
    state = val;

    switch (state) {
    case 'pedding':
        $placeHolder.removeClass('element-invisible');
        $queue.parent().removeClass('filled');
        $queue.hide();
        $queueList.height(400);
        $statusBar.addClass('element-invisible');
        uploader.refresh();
        break;

    case 'ready':
        $placeHolder.addClass('element-invisible');
        $('#filePicker2').removeClass('element-invisible');
        $queue.parent().addClass('filled');
        $queue.show();
        $statusBar.removeClass('element-invisible');
        uploader.refresh();
        break;

    case 'uploading':
        $('#filePicker2').addClass('element-invisible');
        $progress.show();
        $upload.text('上传中').addClass('disabled');
        break;
    case 'confirm':
        $progress.hide();
        $upload.text('开始上传').addClass('disabled');

        stats = uploader.getStats();
        if (stats.successNum && !stats.uploadFailNum) {
            setState('finish');
            return;
        }
        break;
    case 'finish':
        $upload.text('完成上传').addClass('disabled');
        stats = uploader.getStats();
        if (stats.successNum) {
         } else {
            // 没有成功的图片，重设
            state = 'done';
            //location.reload();
        }
        break;
    }
    updateStatus();
}

function updateStatus() {
    var text = '',stats;

    if (state === 'ready') {
        text = '选中' + fileCount + '张图片，共' + WebUploader.formatSize(fileSize) + '。';
    } else if (state === 'confirm') {
        stats = uploader.getStats();
        if (stats.uploadFailNum) {
            text = '已成功上传' + stats.successNum + '张图片，' + stats.uploadFailNum + '张图片上传失败，<a class="retry" href="#">重新上传</a>失败图片或<a class="ignore" href="#">忽略</a>'
        }

    } else {
        stats = uploader.getStats();
        text = '共' + fileCount + '张（' + WebUploader.formatSize(fileSize) + '），已上传' + stats.successNum + '张';

        if (stats.uploadFailNum) {
            text += '，失败' + stats.uploadFailNum + '张';
        }
    }

    $info.html(text);
}

function assembleRequertPara() {
	var progressID = Math.random().toString();//这个暂时用不上
	var paramObj = {busitype:FILE_TYPE_ASSETPIC,orgcode:top.strFilterOrgCode,progressid:progressID};
	var paramstr = $.param(paramObj, $.ajaxSettings.traditional);
	return paramstr;
}

function tranResponseToPicInfo(file,response) {
	var picInfo = new Object();
	if(response.status != "success") {
		return null;
	}
	var fileDetailArr = eval(response.detail);
	picInfo.orgCode = top.strFilterOrgCode;
	picInfo.fileID = fileDetailArr[0];
	picInfo.compressFileID = fileDetailArr[1];
	picInfo.fileType = fileDetailArr[2];
	picInfo.dateFloderName = fileDetailArr[3];
	picInfo.fileName = file.name.substring(0, file.name.lastIndexOf("."));
	return picInfo;
}

function callOpenBackFunc() { 
	 openWindow.$('#id_div_picarea').data().callbackfunc(successUploadInfo);
}

/**
 * 页面组件绑定事件处理方法
 **/
function initComBindFunc() {
    $("#id_img_addpic").click(addPicBtnClickFunc);
}
function addPicBtnClickFunc() {
    $("#id_div_welcomearea").fadeOut("slow");
    $("#id_div_uploadarea").fadeIn("slow");
    setTimeout(function() {
        $("#id_file_upload").click();
    },
    1000);
}

/**
 * 取得打开当前窗口的窗口的对象
 **/
function initOpenWindow() {   
	openWindow = window.open("",  openWindowName);
}

/**
 * 普通函数
 */
function cancel(){
	var parentIndex = top.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	top.layer.close(parentIndex); //再执行关闭 
}