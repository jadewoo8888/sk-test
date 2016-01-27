/** 租赁规则列表，交租日期自定义编辑器 **/
$.extend($.fn.datagrid.defaults.editors, {
	skrqEdit : {
    init: function(container, options) 
    { 	
    	var tempID1 = Math.random();
        var tempID2 = Math.random();
        var tempID3 = Math.random();
		var day = $('<div name="name_div_day" ><span>每月第</span><input id="'+tempID1+'" name="name_input_dayday" type="text" style="width:30px" value="1"  class="easyui-numberbox" data-options="maxWidth:30,min:1,max:31,precision:0"  ><span>天</span></div>');
		var monthday = $('<div name="name_div_monthday"  style="display:none;"><span>第</span><input id="'+tempID2+'" name="name_input_monthdaymonth" type="text" style="width:30px" value="1" class="easyui-numberbox" data-options="maxWidth:30,min:1,max:12,precision:0"  ><span>月第</span><input id="'+tempID3+'" name="name_input_monthdayday" type="text" value="1" style="width:30px" class="easyui-numberbox" data-options="maxWidth:30,min:1,max:31,precision:0" required="required"><span>天</span></div>');
		container.append(day);
		container.append(monthday);
		$.parser.parse(tempID1);    
		$.parser.parse(tempID2);
		$.parser.parse(tempID3);
        return container;    
    },
    getValue: function(target) 
    {   var curViewObj = $(target).children('div:visible');
    	var text = '';
    	if(curViewObj.attr('name')=='name_div_day') {
    		text = '每月第 '+curViewObj.find('input').val()+' 天';
    	} else {
    		text = '第 '+curViewObj.find('input').eq(0).val()+' 月第 '+curViewObj.find('input').eq(1).val()+' 天';
    	}
        return text;
    },
    setValue: function(target, value)
    {
        $(target).text(value);
    },
    resize: function(target, width)
    {
        var span = $(target);
        if ($.boxModel == true){
            span.width(width - (span.outerWidth() - span.width()) - 10);
        } else {
            span.width(width - 10);
        }
    }
    }
});