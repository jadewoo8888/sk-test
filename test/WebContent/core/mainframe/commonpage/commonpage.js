var winHeight=0;


/**
 * 方法入口
 **/
$(function(){
	initComFunc();
  	//初始化页面的显示
	getMenu(top.strUserAccount);
});
  
  
/**
 * 初始化页面组件的各种事件处理方法
 **/
function initComFunc() {
	$("#id_changeorg").click(top.changeOrg);
	$("#id_changepwd").click(top.changePassword);
	$("#id_mydownload").click(top.mydownload);
	$("#id_a_exit").click(top.exit);
	sunSystemTip();
}

function sunSystemTip() {
	$("#id_a_bbsbzxt").bind('mouseover',
   	 	function() {
        	layer.tips("财政部，教育部资产统计报表上报", "#id_a_bbsbzxt"); 
    });
    $("#id_a_fwglzxt").bind('mouseover',
    	function() {
        	layer.tips("在建工程管理,房屋、楼层、单元信息登记</br>房屋单元配套资产登记</br>经营性资产管理</br>使用情况分析", "#id_a_fwglzxt",{time:5000,area:["250px", "100px"]}); 
    });
    $("#id_a_zcpdzxt").bind('mouseover',
   		 function() {
        	layer.tips("实物盘点（条型码、二维码、RFID三种模式）</br>盘点结果分析</br>盘点结果处理", "#id_a_zcpdzxt",{time:5000,area:["270px", "80px"]}); 
    });
    $("#id_a_dzpglzxt").bind('mouseover',
    	function() {
        	layer.tips("购置管理</br>入库管理</br>领用管理</br>库存预警", "#id_a_dzpglzxt"); 
    });
    $("#id_a_cqdjzxt").bind('mouseover',
    	function() {
        	layer.tips("财政厅产权管理", "#id_a_cqdjzxt"); 
    });
    $("#id_a_jxyqzxt").bind('mouseover',
    	function() {
        	layer.tips("实验室管理</br>设备使用登记</br>大型设备共享</br>使用效率分析", "#id_a_jxyqzxt"); 
    });
}
   
function resize(){
 	winHeight = top.$('#id_div_iframe').height();
 	$("#id_div_layout").height(winHeight-80);
	$("#id_mainiframe").height(winHeight-84);
 	$("#id_div_layout").layout("resize",{});
}
/*
 * 导航栏
 */
//导航栏点击执行
function clickNAV1() {
}
//导航栏控制类 （绘制导航栏，相应导航点击事件）
var NAVControler = {painNAV:function (xml) {
	xml = "<menu>" + xml + "</menu>";
	var xmlObj = stringToXml(xml);
	var menus = xmlObj.selectNodes("./menu/menu");	     
	//获取导航栏数据		         	
	var navdiv = $(".nav")[0];
	navdiv.innerHTML = "";
	var ul = document.createElement("ul");
	navdiv.appendChild(ul);	
	   //生成概览
	var li = document.createElement("li");
	li.innerHTML = "<span class='Menu_view' onmouseover='this.style.cursor=\"pointer\"'  onclick='overviewclick()' id='Menu_view'>\u6982\u89c8</span>";
	ul.appendChild(li);
	   //标签生成 
	for (var i = 0; i < menus.length; i++) {
		var li = document.createElement("li");
		li.innerHTML = "<span   class='"+nav_imgs[menus[i].getAttribute("id")]+"' onmouseover='this.style.cursor=\"pointer\"' onclick='NAVControler.clickNAV(\"" + menus[i].getAttribute("id") + "\")' id='" + menus[i].getAttribute("id") + "'>" + menus[i].getAttribute("name") + "</span>";
		ul.insertBefore(li,ul.childNodes[0]);
		//ul.appendChild(li);
	}
	//导航点击样式改变 
	$(".nav ul li").each(function () {
		$(this).click(function () {
			var sp=$($(this).children("span")[0]);
			sp.addClass(nav_imgs['on'+sp.attr("id")]);
			$(this).siblings().each(function (){
				var sp_child=$($(this).children("span")[0]);
				if(sp_child.hasClass(nav_imgs['on'+sp_child.attr("id")]))
					sp_child.removeClass(nav_imgs['on'+sp_child.attr("id")]);
			});
		});	
	});	
}, clickNAV:clickNAV1};

//概览点击
function overviewclick() {
	document.getElementById("id_mainiframe").src = "overview.jsp";
}
/**
 * 菜单栏
 */
//菜单栏控制类
var selectMenuId=[];
var menuNode=[];
var menuNodeTemp=[];

var MenuControler = {	
	clickli:function(i ,j){	
		menuNode=menuNodeTemp;
		selectMenuId=[i,j];
	},
	painMENU:function (xml) {
		$("#id_div_test").addLoading({msg:'加载中，请等待...'});
		//获取 Memu 输出框 
		var menudiv = $("#id_div_leftmenu")[0];
		menudiv.innerHTML = "";
		var dl = document.createElement("dl");
		menudiv.appendChild(dl);
	    //解析xml
		xml = "<menu>" + xml + "</menu>";
		var xmlObj = stringToXml(xml);
		var menus = xmlObj.selectNodes("./menu/menu");	
		menuNodeTemp=menus;
	  	//标签生成
		for (var i = 0; i < menus.length; i++) {
			var dd = document.createElement("dd");
			dd.id = "dd" + menus[i].getAttribute("id");
			var htmlstr = "";
			htmlstr = "<div class='title'><i></i>" + menus[i].getAttribute("name") + "</div><ul class='leftmenu'>";
			var menuchild = menus[i].childNodes;
			if (menuchild.length > 0) {				
				if (menus[i].getAttribute("url") == "" ||menus[i].getAttribute("url") == "#"  || menus[i].getAttribute("url") == null){
					htmlstr = "<div class='title'><i></i>" + menus[i].getAttribute("name") + "</div><ul class='leftmenu'>";
				}else{
					var url=contextPath + menus[i].getAttribute("url") + "?menuid=" + menus[i].getAttribute("id");
					htmlstr = "<div class='title' onclick=\"contentFrameLoad(\'"+url+"\',"+i+")\"><i></i>" + menus[i].getAttribute("name") + "</div><ul class='leftmenu'>";
				}
				for (var j = 0; j < menuchild.length; j++) {
					var item = menuchild[j];
					if(item.nodeName=="#text") continue;
					if (item.getAttribute("url") == "" ||item.getAttribute("url") == "#" || item.getAttribute("url") == null) {
						htmlstr += "<li><a onclick='MenuControler.clickli("+i+","+j+")' href='menublank.jsp' target='name_mainiframe' >" + item.getAttribute("name") + "</a></li>";
					} else {
						htmlstr += "<li><a onclick='MenuControler.clickli("+i+","+j+")' href='"+contextPath + item.getAttribute("url") + "?menuid=" + item.getAttribute("id") + "' target='name_mainiframe' >" + item.getAttribute("name") + "</a></li>";
					}
				}
			}else{
				if (menus[i].getAttribute("url") == "" ||menus[i].getAttribute("url") == "#" || menus[i].getAttribute("url") == null){
					htmlstr = "<div class='title' onclick=\"contentFrameLoad(\'menublank.jsp\')\">" + menus[i].getAttribute("name") + "</div><ul class='leftmenu'>";
				}else{
					var url=contextPath + menus[i].getAttribute("url") + "?menuid=" + menus[i].getAttribute("id");
					htmlstr = "<div class='title' onclick=\"contentFrameLoad(\'"+url+"\',"+i+")\">" + menus[i].getAttribute("name") + "</a></div><ul class='leftmenu'>";
				}				
			}
			htmlstr += "</ul>";
			dd.innerHTML = htmlstr;
			dl.appendChild(dd);		
		}
		//关闭遮挡膜
		$("#id_div_test").removeLoading();	
	     //菜单栏的展示与收缩
		$(".title").toggle(function () {
			$(this).next(".leftmenu").show();
			$(this).addClass("leftbgclick");
			$(this).addClass("title_down");
		}, function () {
			if ($(this).hasClass("leftbgclick")) {
				$(this).next(".leftmenu").hide();
				$(this).removeClass("leftbgclick");
				$(this).removeClass("title_down");
			} else {
	           //优化菜单原来需要点击两次的操作  (待检查原因)
				$(this)[0].click();
			}
		});
	     //模拟点击左边菜单第一个目录
		/*
		var titles = $(".title");
		if (titles != undefined && titles[0] != undefined) {			
			titles[0].click();
			if($($(".title")[0]).next().find('a')[0])
			$($(".title")[0]).next().find('a')[0].click();
		}
		*/
		//动态样式
		dynamiccss();
	}
};
/*
 * 页面加载获取菜单
 * 
 */
function getMenu(usercode) {
	_setUsercode(usercode);	
   //加载导航栏信息 
	Ajax.service("idSysMenuService", "getLoginMenu", [usercode], function (result) {
	  //绑定导航栏点击事件 
		NAVControler.clickNAV = clickNAV;				
	  //导航栏加载json 
		NAVControler.painNAV(result.levelOneMenu);
	  //选中高亮
		var highLightMenuID = result.highLightMenuID;
		if (highLightMenuID != undefined && highLightMenuID.length > 0) {
			//var selectid = document.getElementById('MENU_06').parentNode;
			var selectid = document.getElementById(highLightMenuID).parentNode;
			$(selectid).children("span")[0].click();
			$($(selectid).children("span")[0]).addClass(nav_imgs['on'+selectid]);
		} else {
			var id = document.getElementById("Menu_view").parentNode;
			$(id).children("span")[0].click();
			//	$(id).addClass("Menu_view_on");
			document.getElementById("id_mainiframe").src = "overview.jsp";
		}		
	});
}
 
//动态样式
function dynamiccss() {
	//左边菜单鼠标经过样式改变
	$(".leftmenu li").mouseover(function () {
		$(this).addClass("leftbg_over");	//	leftbg_over
	});
	$(".leftmenu li").mouseout(function () {
		$(this).removeClass("leftbg_over");
	});
	//左边菜单点击样式改变 
	$("#id_div_leftmenu li").click(function () {
		addLoading_Win();													 //打开遮挡层
		$("#id_div_leftmenu li,#id_div_leftmenu div").removeClass("leftbgclick");
		$(this).addClass("leftbgclick");
	});	
	$("#id_div_leftmenu div").click(function () {
		$("#id_div_leftmenu li,#id_div_leftmenu div").removeClass("leftbgclick");
		$(this).addClass("leftbgclick");
	});	 
}
function   addLoading_Win(){$('body').addLoading({msg:'请等待...'});	}		    //打开遮挡层
function   removeLoading_Win(){$('body').removeLoading();   }					// 关闭遮挡层
//传入用户编码
var _usercode = "";
function _setUsercode(code) {
	_usercode = code;
}
//导航点击事件
function clickNAV(q) {	
//加载菜单栏信息 	
	Ajax.service("idSysMenuService", "getSubMenu", [_usercode, q], function (result) {
		MenuControler.painMENU(result.levelTwoMenu);
	});
}
function frameOnLoad() {
	 //获取内容iframe的window对象 
	top.contentframe = top.document.getElementById('id_iframe').contentWindow.document.getElementById('id_mainiframe').contentWindow;
	removeLoading_Win();
}
//跳转内容页面
function contentFrameLoad(url,level){
	top.document.getElementById('id_iframe').contentWindow.document.getElementById('id_mainiframe').contentWindow.location.href=url;
	if(level!=undefined){
		MenuControler.clickli(level,null);
	}
}