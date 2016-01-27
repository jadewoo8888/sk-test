/* jQuery ListBox Plugin
*  Version: 1.1.0
*  Author: Joseph Chan(think8848)
*  Contact: QQ: 166156888 Blog: http://think8848.cnblogs.com
*  Company: http://www.cleversoft.com */
(function ($) {
    $.fn.listbox = function (options) {
        var self = this;
        var el = self.get(0); 
        if (typeof options == 'string') { 
            var list = el.list;
            if (options in list) {
                var args = $.makeArray(arguments).slice(1);
                return list[options].apply(list, args);
            } else {
                throw 'clever listbox not contains such function';
            }
        }
        function build() {
            return $.extend({
                removeItem: el.list ? $.proxy(el.list.removeItem, el.list) : null,
                addRange: el.list ? $.proxy(el.list.addRange, el.list) : null,
                addItem: el.list ? $.proxy(el.list.addItem, el.list) : null,
                removeRange: el.list ? $.proxy(el.list.removeRange, el.list) : null,
                getDatas: el.list ? $.proxy(el.list.getDatas, el.list) : null,
                getData: el.list ? $.proxy(el.list.getData, el.list) : null,
                clearDisplay: el.list ? $.proxy(el.list.clearDisplay, el.list) : null,
                clearData: el.list ? $.proxy(el.list.clearData, el.list) : null,
                getSelected: el.list ? $.proxy(el.list.getSelected, el.list) : null,
                getDataByID: el.list ? $.proxy(el.list.getDataByID, el.list) : null,
                setSelection: el.list ? $.proxy(el.list.setSelection, el.list) : null,
                reload: el.list ? $.proxy(el.list.reload, el.list) : null,
                upRange: el.list ? $.proxy(el.list.upRange, el.list) : null,
                downRange: el.list ? $.proxy(el.list.downRange, el.list) : null
            }, self);
        }
        function fillData(data, ajaxsettings) {
            if (data) {
            	for (var i = 0; i < data.length; i++) {
                	list.addItem(data[i]);
              	}
            }
        }
        if (el.list) {return build(); }
        var defaults = {
            dnd: false,
            dndscope: new Date().getTime(),
            height: 'auto',
            width: 'auto',
            data: [],
            multiselect: false,
            ajaxsettings: {},
            selectchange: function (data) { return false; }
        };
        var options = $.extend(defaults, options || {});
        var ts = $(el);
        var list = {
            p: options,
            addRange: function (data) {
                 for (var i = 0; i < data.length; i++) {
                    this.addItem(data[i]);
                    this.p.data.push(data[i]);
                 }
            },
            selected: function () { return list.p.selectchange; },
            addItem: function (data) {
                var finallyData = data;
                if (data instanceof Array || (!('value' in data) || (!'text' in data))) {
                    finallyData.value = data[0];
                    finallyData.text = data[1];
                }
                var item = $('<li class="ui-menu-item ui-corner-all"><a  style="font-size:14px" id="' + finallyData.value + '" class="ui-corner-all" tabindex="-1">' + finallyData.text + '</a>');
                ts.append(item);
                $('a', item).click(function () {
                    var a = $(this);
                    var e = arguments[0] || window.event;
                    var parent = item.parent();
                    var items = $('>li', parent);
                    if (list.p.multiselect && e.ctrlKey) {
                        if (a.hasClass('ui-state-active')) {
                            a.removeClass('ui-state-active');
                        } else {
                            a.addClass('ui-state-active');
                        }
                    } else {
                        var selectedItem = $('a.ui-state-active', parent).parent();
                        $('a', parent).removeClass('ui-state-active');
                        if (selectedItem.size() == 0 || items.index(selectedItem) != items.index(item)) {
                            a.addClass('ui-state-active');
                        }
                    }
                    a.blur();
                    var current = $(this).parents('ul:first').get(0).list;
                    current.selected()(current.getSelected());
                })
                .mouseover(function () {
                    if (!$(this).hasClass('ui-state-active')) {
                        $(this).addClass('ui-state-hover');
                    }
                }).mouseout(function () {
                    $(this).removeClass('ui-state-hover');
                });
                if (list.p.dnd) {
                }
            },
            removeRange: function (data) {
                if (data && data instanceof Array) {
                    for (var i = 0; i < data.length; i++) {
                        this.removeItem(data[i]);
                    }
                }
                 this.reload();
            },
            removeItem: function (data) {
                var key = data;
                if (data instanceof jQuery) {
                    key = this.getData(data).value;
                }
                else if (typeof data == 'object') {
                    key = data.value;
                }
                var dataLen =this.p.data.length;
                 for(var i=0;i<dataLen;i++) {  
                	if(data.value ==this.p.data[i].value ) {
                 	this.p.data.splice(i,1);
                 	break;
                 	}
                }
                ts.find('a[id="' + key + '"]').remove();
            },
            getData: function (a) {
                if (a) {
                    if (!(a instanceof jQuery)) {
                        a = $(a);
                    }
                    return { value: a.attr('id'), text: a.text() };
                } else {
                    return null;
                }
            },
            getSelected: function () {
                var selected = $('a.ui-state-active', ts);
                var result = [];
                selected.each(function () {
                    result.push(list.getData(this));
                });
                return result;
            },
            getDataByID: function (id) {
            	var result = [];
            	var item = ts.find('a[id="' + id + '"]');
            	if(item.length>0) {
            		result.push({ value: item.attr('id'), text: item.text() })
            	} 
            	return result;
            },
            getDatas: function () {
                var result = [];
                $('>li>a:first-child', ts).each(function () {
                    result.push(list.getData(this));
                });
                return result;
            },
            setSelection: function (value) {
                $('a', ts).removeClass('ui-state-active').parent().css('margin-top', '');
                $('a[id="' + value + '"]', ts).addClass('ui-state-active');
            },
            clearDisplay: function () {
                ts.empty();
             },
            clearData:function () {
            	list.p.data = []; 
            },
            reload: function (options) { 
                list.p = $.extend(list.p, options || {});
                list.clearDisplay();
                fillData(list.p.data, list.p.ajaxsettings);
            },
            upRange:function(data) {
            	if(data==undefined||data==null||data.length==0) {
            		return;
            	}
            	var tempValue = null;
             	for (var i = 0; i < list.p.data.length; i++) {
            		if(data[0].value==list.p.data[i].value) {
             			if(i==0) {
            				return;
            			} 
            			tempValue = list.p.data[i-1];
            			list.p.data[i-1] = list.p.data[i];
            			list.p.data[i] = tempValue;
            			this.reload();
            			this.setSelection(data[0].value);
            			break;
            		}
               	}
            },
            downRange:function(data) {
            	if(data==undefined||data==null||data.length==0) {
            		return;
            	}
            	var tempValue = null;
            	for (var i = 0; i < list.p.data.length; i++) {
            		if(data[0].value==list.p.data[i].value) {
            			if(i==list.p.data.length-1) {
            				return;
            			}
            			tempValue = list.p.data[i+1];
            			list.p.data[i+1] = list.p.data[i];
            			list.p.data[i] = tempValue;
            			this.reload();
            			this.setSelection(data[0].value);
            			break;
            		}
               	}
            }
        }
        el.list = list;
        self.addClass('cleverlistbox ui-menu ui-widget ui-widget-content ui-corner-all');
        if (typeof list.p.height == 'number' || (typeof list.p.height != 'string' && list.p.height.toLowerCase() != 'auto')) {
            self.css('overflow-y', 'auto');
            self.css('overflow-x', 'hidden');
            self.height(list.p.height);
        }
        if (typeof list.p.width == 'number' || (typeof list.p.width != 'string' && list.p.width.toLowerCase() != 'auto')) {
            self.width(list.p.width);
        } else {
            self.width(self.parent().width() - 2);
        }
        fillData(list.p.data, list.p.ajaxsettings);
        return build();
    }
})(jQuery);