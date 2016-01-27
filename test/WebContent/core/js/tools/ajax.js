/**
 * @class 定义ajax请求处理
 */
var Ajax = {

    /**@private普通请求处理url*/
    requesturl : contextPath+"/service.do",
    /**@private附件文件上传处理url*/
    appendfileuploadurl : contextPath+"/appendupload.do", 
    /**@private图片上传处理url,暂时图片上传方法在ajax.js中没有，这里只是定义一个名词*/
    picuploadurl : contextPath+"/picupload.do", 
    /**@private文件（上传的附件，导出的文件，上传的图片(含缩略图)）下载处理url*/
    downloadurl : contextPath+"/download.do", 
    
    /**
     * 与后台交互的方法
     * @public
     * @param {String} busiClassType 业务类标识，字符串格式，必填
     * @param {String} busiFuncType 业务方法标识，字符串格式，必填
     * @param {Array} paramArr [入参1, 入参2,…] 数组形式，必填
     * @param {Function} successFunc 成功回调函数 ，必填，具体页面定义successFunc(data, textStatus)
     * @param {Function} failureFunc 异常回调函数 ，可选  具体页面定义failureFunc(XMLHttpRequest, textStatus, errorThrown)
     **/
    service:function(busiClassType,busiFuncType,paramArr,successFunc,failureFunc) {
        //唯一特殊处理，用于处理获取验证码
        if(busiClassType=='idUserLogin' && busiFuncType=='genVerifyCode'){
            $("#"+paramArr[0]).attr("src",Ajax.requesturl+'?cID='+busiClassType+'&mID='+busiFuncType+"&time="+new Date().getTime());
        } else {
        	var strContent = "";
        	if(paramArr!=null && paramArr.length>0){
        		var strJson = null;
        		for(var i=0;i<paramArr.length;i++){
        			strJson = JSON.stringify(paramArr[i]);
        			if(strJson.indexOf("#PARAMSPLIT#") != -1){
        			 	top.layer.alert('请求数据包含非法字符！',{closeBtn :2,icon:7});
        				return;
        			}
        			if(i == 0){
        				strContent = strJson;
        			}else{
        				strContent += "#PARAMSPLIT#" + strJson;
        			}
        		}
        	}
        	Ajax.service$jQAjax(busiClassType,busiFuncType,strContent,successFunc,failureFunc);
        }
    },
    
    /**
     * 私有函数，具体模块不应该直接调用该函数。
     * @param {String} busiClassType 业务类标识，字符串格式，必填
     * @param {String} busiFuncType 业务方法标识，字符串格式，必填
     * @param {String} strContent 入参，字符串格式，必填
     * @param {Function} successFunc 成功回调函数 ，必填
     * @param {Function} failureFunc 异常回调函数 ，可选
     * @private
     */
	service$jQAjax:function(busiClassType,busiFuncType,strContent,successFunc,failureFunc){
		//调用jquery的ajax
		jQuery.ajax({
			//业务类标识和业务方法标示通过get的方式传递
			url:Ajax.requesturl+'?cID='+busiClassType+'&mID='+busiFuncType,
			//提交方式为post  
			type:'POST',
			//不缓存
			cache:false,
			//post的数据
			data:strContent,
			dataType:'text',
			contentType:"application/json",
			//请求成功后的回调函数
			success: function(data, textStatus){
				//根据返回的data作处理
				//判定返回数据为json格式,将返回数据转换为json格式
				if(data!=null && data.length>0 && (data.charAt(0)=='{' || data.charAt(0)=='[')){
					data = eval("("+data+")");
					if(data.hasOwnProperty('sys_request_errorType')){
						var errorType = data['sys_request_errorType'];
						if(errorType == '1'){
						 	top.layer.alert('登陆已失效,请重新登录！',{closeBtn :2,icon:7});
 						}else if(errorType == '2'){
 							top.layer.alert('您的账号已在其他地方登录！',{closeBtn :2,icon:5});
						}else if(errorType == '3'){
							top.layer.alert('请求参数错误！',{closeBtn :2,icon:5});
						}else if(errorType == '4'){
							top.layer.alert('您的账号已被冻结！',{closeBtn :2,icon:7});
						}
						return;
					}
				}
                if(successFunc != null){
                	successFunc(data,textStatus);
				}
			},
                
			//请求失败时调用此函数
			error:function(xmlHttpRequest, textStatus, errorThrown){
                if(failureFunc != null){
                	failureFunc(xmlHttpRequest, textStatus, errorThrown);
                }else{
                	var status = xmlHttpRequest.status;
                	if(status == 500){
                		top.layer.alert('请求异常，请联系管理员',{closeBtn :2,icon:5});
                	}else if(status == 0 || status == 404){
                		top.layer.alert('请求地址不存在'+xmlHttpRequest.responseText,{closeBtn :2,icon:5});
                	}else{
                		top.layer.alert('请求异常',{closeBtn :2,icon:5});
                	}
                }
			}
		});
	},
    
    /**
     * 文件上传
     * @param paramstr url请求参数 如不为空，则会在.do后作为url参数添加,格式如 'busitype=addnew&random=test'
     * @param successFunc 请求成功回调函数
     * @param fileFormID 上传表单id，默认为id_fileForm
     **/
    upload:function(paramObj,successFunc,fileFormID) {
    	/** 若没有传递formid，则设置默认 **/
    	var fid = (fileFormID==undefined||fileFormID=='')?'id_fileForm':fileFormID;
    	var form = $("#"+fid);
    	
    	/** 处理url参数，添加到请求中 **/
    	var paramstr = $.param(paramObj, $.ajaxSettings.traditional);
    	var fileuploadurl = Ajax.appendfileuploadurl;
    	if(paramstr) {
    		fileuploadurl += '?' + paramstr;
    	}
    	/** 设置form参数 **/
        var options  = {  
            url:fileuploadurl,  
            type:'post',
            dataType:'json',
            success:function(data) {	
             	if(data!=null && data.length>0 && (data.charAt(0)=='{' || data.charAt(0)=='[')){
					data = eval("("+data+")");
 				}
 				if(successFunc != null){
                 	successFunc(data);
                }
            }  
        };
        form.ajaxSubmit(options);
    },
    /**
     * 下载请求处理方法
     * @param type 下载类型，EXPORTTASK（导出texporttask),COMMONAPPEND（通用附件 tappend），ASSETAPPEND(资产附件tassetappend）
     * @param paramType 传递的下载参数类型，PK（paramstr包含pk，后台根据下载类型和此pk查找相应的信息后进行下载），INFO（paramstr中包含具体的下载信息，后台根据下载类型和这些信息进行下载）
     * @param paramObj 向后台传递的下载参数对象
     **/
    download:function(type,paramType,paramObj) {
    	var paramStr = '';
    	for(var p in paramObj) {
    		paramStr += '&'+p.toLowerCase()+'='+paramObj[p];
    	}
    	paramStr = encodeURI(encodeURI(paramStr));
  		var form=$("<form>");
		form.attr("style","display:none");
		form.attr("target","");
		form.attr("method","post");
		form.attr("action",Ajax.downloadurl+"?type="+type+"&paramtype="+paramType+paramStr );
		$("body").append(form);
		form.submit();
    } ,
    
    /**
     * 获取资产图片请求url
     * @param sizeType 图片尺寸类型,ORIGINAL(原图),COM150(150尺寸的压缩图) 
     * @param paramType 传递的下载参数类型，PK（paramstr包含pk，后台根据下载类型和此pk查找相应的信息后进行下载），INFO（paramstr中包含具体的下载信息，后台根据下载类型和这些信息进行下载）
     * @param paramObj 向后台传递的下载参数对象
     **/
    getAssetPicUrl:function(sizeType,paramType,paramObj) {
    	var return_url = '';
    	var paramStr = '';
    	var type = 'ASSETPIC';
    	for(var p in paramObj) {
    		paramStr += '&'+p.toLowerCase()+'='+paramObj[p];
    	}
    	paramStr = encodeURI(encodeURI(paramStr));
		return_url = Ajax.downloadurl+"?type="+type+"&paramtype="+paramType+"&sizetype="+sizeType+paramStr;
		return return_url;
    }
};