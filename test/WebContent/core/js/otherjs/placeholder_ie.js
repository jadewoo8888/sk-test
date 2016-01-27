$(function(){ 
	setTimeout(function () {
		deal();
	},500);
});
function deal() {
//增加easyui的组件对placeholder的支持
$(".combo , .searchbox").prev().each(function(){
	var boxObj = $(this);
	var placeholder = boxObj.attr("placeholder");
	if(placeholder!=null&&placeholder.length>0){
		var tempObj = $(this).next().children('input').eq(0);
		tempObj.attr('placeholder',placeholder);
 			
 		/** ie下的特殊处理，由于ie下easyui的解析速度较慢，box类（datebox，combobox,searchbox）的setvalue会去掉了设置好的 placeholder显示，
 		故添加在一定时间后再设置**/	
		if(!placeholderSupport()){
			setTimeout(function () {
				if(tempObj.val() == '') {
		 			tempObj.addClass('gray_txt');
			  		tempObj.val(tempObj.attr('placeholder'));
			  	}
			},1200);
		} else {
			//ff下searchbox的placeholder字体太淡了，这里特殊处理下
			if(boxObj.next().hasClass('searchbox')) {
				tempObj.removeClass('searchbox-prompt');
			}
		}
	}
}); 

//判断浏览器是否支持 placeholder
if(!placeholderSupport()){
	 var intervalName; // 定时器句柄

    $('[placeholder]').focus(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
            input.val('');
            if(input.hasClass('gray_txt'))
            input.removeClass('gray_txt');
        }
        //加入定时器

        if($(this).hasClass('combo-text')){
        	intervalName = setInterval(function() { 
        		if(input.val()!= input.attr('placeholder'))
        			input.removeClass('gray_txt');
        	  },200);
        }
    }).blur(function() {
        var input = $(this);
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.addClass('gray_txt');
            input.val(input.attr('placeholder'));
        }
        //清除定时器

        if(intervalName!=undefined)
        clearInterval(intervalName);
    }).blur();
} 
}
 
function placeholderSupport() {
    return 'placeholder' in document.createElement('input');
}
//target==jquery 对象
function _getsearchvalue(target){
	if(placeholderSupport()){
		  return target[0].value;
	}else{
		  if(target[0].value==target.attr('placeholder')){
		  	 return "d";	 
		  }else{
		  	return target[0].value;
		  }
	}
}