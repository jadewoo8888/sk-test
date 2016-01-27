/** 
 * @必填参数：无
 * @可选参数：
 *  z: 蒙版叠放层级
 *  msg: 文字说明
 *  successcallback:绘画成功回调函数
 *  iconType: 图标类型，当前有0~2三种
 *  top: 提示框距离蒙版顶部距离
 *  br: 文字与图标是否换行显示
 *  maskColor: 蒙版颜色
 *  fontSize: 消息框字体大小 
 *  fontFamily: 消息框字体样式
 *  fontWeight: 消息框字体粗细
 *  imgHeight: 图标高度（宽度同比缩放）  
 *  borderStyle: 消息框边框样式
 *  borderColor: 消息框边框颜色
 *  borderWidth: 消息框边框粗细（0px为不显示）
 *  opacity: 蒙版透明度
 * @调用方法：
 *  $(selector).addLoading([option]) //根据入参options显示遮罩层，若原已有遮罩层则重新加载
 *  $(selector).addProgressLoading([option]) //参数与addLoading方法的参数一样，只是会返回一个进度条对象。外部通过调用此对象的update方法更改进度显示
 *	$(selector).removeLoading()	//关闭当前元素启用的遮罩层
 *	$(selector).toggleLoading([option])	//切换遮罩层状态（若原先为开启，则改为关闭；若原先为关闭，则开启）
 *	$(selector).isLoading()	//判断当前是否启用了遮罩层，返回布尔值
 * @demo：
 *  $(".shaixuan").addLoading();	//使用默认样式的遮罩层
 *  $(".shaixuan").addProgressLoading();//使用默认样式的进度遮罩层
 *  $(".shaixuan").addLoading({br:false,msg:'加载中，请等待...'});
 *  $(".shaixuan").removeLoading();
 *  $(".shaixuan").toggleLoading({br:false,msg:'加载中，请等待...'});
 *  $(".shaixuan").isLoading();	//结果为true或者false
 */  
(function($){  
    $.fn.extend({
    	/*根据入参options显示遮罩层，若原已有遮罩层则重新加载*/
        addLoading: function(options){
            //若无遮罩，添加遮罩层    
            if($(this).children(".x-loading-wanghe").length == 0){ 
                $(this).prepend("<div class='x-loading-wanghe'><div class='loading-msgCrust'><img class='loading-msgIcon' /><span class='loading-msg'></span></div><div class='loading-mask'></div></div>");
            }  
            var $crust = $(this).children(".x-loading-wanghe").eq(0);
            var $mask = $crust.children(".loading-mask");
            var $msgCrust = $crust.children(".loading-msgCrust");
            var $msgIcon = $msgCrust.children(".loading-msgIcon");
            var $msg = $msgCrust.children(".loading-msg");            
            //获取目标div大小
            var w = $(this).outerWidth();
            var h = $(this).outerHeight();
            
            // 扩展参数   
            var op = $.extend({  
                z: 99,      //蒙版叠放层级
                msg:'数据加载中...',  
                iconType: 1,
                iconUrl: "/gdczsam/core/js/layer/skin/default/",
                top:h/2-25, //提示框距离蒙版顶部距离
                br:true,    //文字与图标是否换行显示
                maskColor:'#AAAAAA',    //蒙版颜色
                fontSize:'15px',
                fontFamily:'微软雅黑',
                fontWeight: 500,
                imgHeight:'30px',   //图标高度（宽度同比缩放）  
                borderStyle: 'solid',   //消息框边框样式
                borderColor:'#6bc4f5',
                borderWidth: '1px',     //消息框边框粗细（0px为不显示）
                opacity:0.5    //蒙版透明度
            },options);
            switch(op.iconType){
            	case 0:
            		op.iconUrl += "loading-0.gif"; 
            		break;
            	case 1:
            		op.iconUrl += "loading-1.gif"; 
            		break;
            	case 2:
            		op.iconUrl += "loading-2.gif"; 
            		break;   
            	default:
            		op.iconUrl += "loading-2.gif";         	
            }              

			//调整对象定位属性，防止定位出现差错
            if($(this).css("position")=="static")  
                $(this).css("position","relative");
            
            //遮罩层属性和内容
            $crust.css({
                'position': 'absolute',  
                'z-index': op.z,  
                'display':'none',  
                'width':'100%', 
                'height':'100%',
                'text-align':'center',  
                'vertical-align':'middle',
                'top': '0px',  
                'left': '0px'
            });
            $mask.css({
                'position': 'absolute',  
                'width':'100%',  
                'height':'100%',  
                'background-color':op.maskColor,  
                'top': '0px',  
                'left': '0px',  
                'opacity':op.opacity  
            });
            $msgCrust.css({
                    'position': 'relative', 
                    'z-index': 1, 
                    'top':op.top,
                    'display':'inline-block',
                    'background-color':'#efefef',  
                    'padding':'5px',  
                    'color':'#000000',
                    'border-style': op.borderStyle,  
                    'border-width': op.borderWidth,  
                    'border-color': op.borderColor,
                    'text-align':'center',  
                    'opacity':0.9  
            });
            $msgIcon.attr("src",op.iconUrl);
            $msgIcon.css({
                    'margin-left':'3px',  
                    'vertical-align':'middle',
                    'height': op.imgHeight
            });
            if(op.br){
            	$msgIcon.css({
            		"display":"block",
            		"margin":"auto"
            	});
            }else{
            	$msgIcon.css({
            		"display":"inline",
            		"margin":"3px"
            	});
            }
            $msg.html(op.msg);
            $msg.css({
                    'position': 'relative',  
                    'margin-left': '5px', 
                    'margin-right': '5px',  
                    'vertical-align':'middle',
                    'text-align':'left',  
                    'font-family':op.fontFamily,  
                    'font-size':op.fontSize,
                    'font-weight':op.fontWeight
            });            
            $crust.fadeIn(200,op.successcallback);  
        },
        addProgressLoading:function(options) {
        	this.addLoading(options);
        	$(this).find(".x-loading-wanghe").eq(0).append("<div id='id_div_progress'></div>");
 			var $progressDiv = $(this).find("#id_div_progress");
 			var h = $(this).outerHeight();
 			$progressDiv.css({
                    'position': 'relative',
                    'margin':'0 auto',
                    'width':'230px',
                    'z-index': 1, 
                    'top':h/2-15,
                    'display':'block',
                    'padding':'5px',  
                    'color':'#000000',
                    'text-align':'center'
            });
 			var pro = new progress({
        		width: 220,
        		//进度条宽度
        		height: 20,
        		//进度条高度
        		bgColor: "#3E4E5E",
        		//背景颜色
        		proColor: "#009988",
       		 	//前景颜色
        		fontColor: "#FFFFFF",
        		//显示字体颜色
        		val: 0,
        		//默认值
        		text: "当前进度为#*val*#%",
        		//显示文字信息
        		showPresent: true
    		});
    		var dd = $('#id_div_progress')[0];
    		dd.appendChild(pro.getBody());
    		return pro;        
 		},
        /*关闭当前元素启用的遮罩层*/  
        removeLoading: function(){
        	$(this).children(".x-loading-wanghe").fadeOut(200);
        },
        /*切换遮罩层状态（若原先为开启，则改为关闭；若原先为关闭，则开启）*/
        toggleLoading: function(options){
        	var $crust = $(this).children(".x-loading-wanghe");
        	if($crust.is(":visible")){
        		$(this).removeLoading();
        	}else{
        		$(this).addLoading(options);
        	}
        },
        /*判断当前是否启用了遮罩层，返回布尔值*/
        isLoading: function(){
        	return $(this).children(".x-loading-wanghe").is(":visible");
        }
    });  
})(jQuery);  
