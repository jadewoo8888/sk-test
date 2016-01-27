//初始化
$(function(){	
	extendEasyuiValidate();//扩展easyui的校验
});

//扩展easyui的searchbox
/*    id: searchbox的id
 *handle：{
 *		   setDefaultData:[], 														  //默认显示的数据
 * 		   requestOption:{BO:'AssetClassifyService',method:'searchAssetClassify'},    //ajax的参数
 * 		   param:{code:'acCode',text:'acDisplayCode,acName',						  //code:隐藏值，text：显示参数用，分隔
 * 		   format:function(text){return '['+text[0]+']'+text[1]}}					  //对显示参数进行格式化
 * 		   }
 */
function extendSearchbox(id,handle){
	$('#'+id).searchbox('textbox').focus(
			function(){
				if($(this).val().length==0){
					var sbSelectPanel;
					if(!$('#'+id+'_sp')[0]){
						//创建下拉面板
						creatSelectPanel(id,$(this));
						update_SearchboxItem(id,$('#'+id+'_sp'),[{name:'默认1',code:'1'},{name:'默认2',code:'2'}],{name:'name',value:'code'});
					}
				}else{
					
				}
			}
	).blur(
			function(){
			}
	).bind("input propertychange", function() {	
		if(!$('#'+id+'_sp')[0]){
			//创建下拉面板
			creatSelectPanel(id,$(this));
		}
		
		if(handle.requestOption!=undefined){
			if($(this).val().length>0){
				var cardPk=null,isLeaf=0;
				if(handle.param.cardPk!=undefined)
					cardPk=handle.param.cardPk;
				if(handle.param.isLeaf!=undefined)
					isLeaf=handle.param.isLeaf;
				
				Ajax.service(			
						handle.requestOption.BO,
						handle.requestOption.method, 
						[{displayCode:$(this).val(),isLeaf:isLeaf,cardPk:cardPk}],
						function(Items){
							if(Items!=''&&Items!='null'){
								$('#'+id+'_sp').show();
								update_SearchboxItem(id,$('#'+id+'_sp'),Items,{name:handle.param.text,value:handle.param.code,format:handle.param.format});
							}else{
								$('#'+id+'_sp').hide();
							}
						}
				);
			}else{
				$('#'+id).attr('treevalue','');				//移除选中值
				$('#'+id+'_sp').show();
				update_SearchboxItem(id,$('#'+id+'_sp'),[{name:'默认1',code:'12'},{name:'默认2',code:'123'}],{name:'name',value:'code'})
			}
		}
	});		
	$('body').click(function(e){
			var obj=e.srcElement ? e.srcElement : e.target;
			if($('#'+id+'_sp')[0])
			if(!$('#'+id+'_sp').parent()[0].contains(obj))
				$('#'+id+'_sp').remove();
	});
}

function update_SearchboxItem(id,$SelectPanel,data,dataOption){
	$SelectPanel.empty();
	var selectItem=$('<ul></ul>');
	for(var i in data){
		var li_text=[];
		var texts=dataOption.name.split(',')
		for(var j in texts){
			li_text.push(data[i][texts[j]]);			
		}
		if(dataOption.format!=undefined){
			li_text=dataOption.format(li_text);
		}else{			
			li_text=li_text.join('');
		}

		var $li=$('<li code=\''+data[i][dataOption.value]+'\'>'+li_text+'</li>');
		$li.css("padding","3px 0px");
		$li.css("cursor","pointer");
		$li.css("-webkit-user-select","none");
		$li.css("-moz-user-select","none");
		$li.css("-ms-user-select","none");
		$li.css("user-select","none");

		$li.click(function(){			
				click_searchboxItem($(this),id);
			}
		).hover(
				function(){
					$(this).addClass("combobox-item-hover"); 	//鼠标经过添加hover样式
				},
				function(){
					$(this).removeClass("combobox-item-hover"); //鼠标离开移除hover样式
				}
		);		
		selectItem.append($li);
	}
	$SelectPanel.append(selectItem);	
}
function click_searchboxItem($this,id){
	$('#'+id).searchbox('setValue',$this.html());
	$('#'+id).attr('treevalue',$this.attr('code'));
	$('#'+id+'_sp').remove();
}
//创建下拉面板
function creatSelectPanel(id,searchboxInput){
	var panelWidth=200;
	var inputTop=searchboxInput.offset().top;
	var inputLeft= searchboxInput.offset().left;
	var inputWidth=searchboxInput.width();
	var inputHeight=searchboxInput.height();
	var X=inputLeft;
	var Y=inputTop+inputHeight+1;					
	var sbSelectPanel=$('<div id=\''+id+'_sp\' style=\'position:absolute;display:inline-block;height:200px;\'></div>');        //创建一个搜索框下拉选择面板										
	sbSelectPanel[0].style.width = panelWidth +'px';
	sbSelectPanel[0].style.top = Y +'px';
	sbSelectPanel[0].style.left = X +'px';
	sbSelectPanel[0].style.backgroundColor='white';
	sbSelectPanel.css("z-index","100");	
	sbSelectPanel.css("text-indent","5px");
	sbSelectPanel.css("border","1px solid #f0f0f0");
	sbSelectPanel.css("font-size","12px");					
	searchboxInput.after(sbSelectPanel);
}
/*
*/
//扩展easyui的校验
function extendEasyuiValidate(){
	$.extend($.fn.validatebox.defaults.rules, {  
	    //用户账号验证(只能包括 _ 数字 字母)   
	    code: {//param的值为[]中值  
	        validator: function (value, param) {  
					if($(param[0]).attr('placeholder')==value){
						return true;
					}
	                if (!/^[\w\d_-]*$/.test(value)) {  
	                    return false;  
	                } else {  
	                    return true;  
	                }  
	        }, message: '用户名只能数字、字母、下划线和横线组成'  
	    },
	    greaterNum: {//param的值为[]中值  
	        validator: function (value, param) {
                   if( parseFloat(value)> parseFloat(param[0]))
                	   return true;
                   return false;
		    }, message: '输入值必须大于{0}'   
		},
		sc_Date:{
			validator: function (date, param){
			 		var reg =/^\1|2\d{3}-\d{2}-\d{2}$/;    //匹配日期  yyyy-MM-dd 
			 		
			 		if(param!=undefined&&param[0]!=undefined&&param[0].placeholder!=undefined&&param[0].placeholder==date){
			 			return true;
			 		}
			 		
			 		if(reg.test(date)){
			 			if(checkDate(date)){
			 				 return true;
			 			}else{
			 				$.fn.validatebox.defaults.rules.sc_Date.message ='无效日期';
			 			}
			 		}else{
			 			$.fn.validatebox.defaults.rules.sc_Date.message ='日期不符合yyyy-MM-dd格式';
			 		}
			 		return false;			 		
			}
		},
		sc_Numlimit:{
			validator: function (value, param){ 		
		 		var reg = new RegExp("^[0-9]*$");
		 	    if(!reg.test(value)){ 
		 	    	if(param!=undefined&&param[0]!=undefined&&param[0].length!=undefined){
		 	    		$.fn.validatebox.defaults.rules.sc_Numlimit.message ='请输入'+param[0].length+'位数字';
		 	    	}else{
		 	    		$.fn.validatebox.defaults.rules.sc_Numlimit.message ='请输入数字';
		 	    	}		 	    	
		 	    }else{
		 	    	if(value.length!=param[0].length){
		 	    		$.fn.validatebox.defaults.rules.sc_Numlimit.message ='请输入'+param[0].length+'位数字';
		 	    	}else{
		 	    		return true;
		 	    	}		 	    	
		 	    }
		 		return false;			 		
			}
		}
	});
}
//检查日期合法
function checkDate(date){  
    //检查日期的有效性  
        var tempArr = date.split("-");    
        if(parseInt(tempArr[1],'10') == 0 || parseInt(tempArr[1],'10') > 12){//月份  
            return false;  
        }  
        var lastday=new Date(parseInt(tempArr[0],'10'),parseInt(tempArr[1],'10'),0);//获取当月的最后一天日期          
        if(parseInt(tempArr[2],'10')== 0 || parseInt(tempArr[2],'10') > lastday.getDate()){//当月的日  
            return false;  
        }   

        var myDate = new Date(parseInt(tempArr[0],'10'),parseInt(tempArr[1])-1,parseInt(tempArr[2],'10'));                  
        if(myDate=="Invalid Date") {          
            return false;  
        } 

    return true;  
}  