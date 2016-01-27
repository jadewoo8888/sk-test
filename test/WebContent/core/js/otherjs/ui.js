// JavaScript Document
$(function(){
	$(".kuai_a>a").click(function(){
		var index = $(this).index(".kuai_a>a");
		$(this).addClass("cur").siblings().removeClass("cur");
		/*$(".biao").eq(index).show().siblings(".biao").hide();
		if(index == 0){
			tag1();
		}else{
			tag2();
		}*/
	})
		
	
	$(".li_div_span").toggle(
		function(){
			$(this).parents(".li_div").siblings('.erji').slideDown();
			$(this).parents(".li_div").addClass("cur");
			},
		function(){
			$(this).parents(".li_div").siblings('.erji').slideUp();
			$(this).parents(".li_div").removeClass("cur");
			}
		)
		
	$(".li_div2_span").toggle(
		function(){
			$(this).parents(".li_div2").siblings('.sanji').slideDown();
			$(this).parents(".li_div2").addClass("cur2");
			},
		function(){
			$(this).parents(".li_div2").siblings('.sanji').slideUp();
			$(this).parents(".li_div2").removeClass("cur2");
			}
		)
	
	$(".sanji").find("div:last").addClass("last");
	/*选择部门处使用*/
	$(".menu2").find("span").click(function(){
		$(".menu2>ul").removeClass("menu2_ul");
		$("#a1").show();
		$("#a2").hide();
		})
	
	$("#a1").click(function(){
		$(this).hide();
		$("#a2").show();
		$(".menu2>ul").addClass("menu2_ul");
		$(".erji").slideDown();
		$(".sanji").slideDown();
		})
		
	$("#a2").click(function(){
		$(this).hide();
		$("#a1").show();
		$(".menu2>ul").removeClass("menu2_ul");
		$(".erji").slideUp();
		$(".sanji").slideUp();
		})
		
	$("#a3").click(function(){
		$(this).hide();
		$("#a4").show();
		$("#a1").hide();
		$("#a2").show();
		$(".menu2>ul").addClass("menu2_ul");
		$(".menu2").find(".check").show();
		$(".erji").slideDown();
		$(".sanji").slideDown();
		})
		
	$("#a4").click(function(){
		$(this).hide();
		$("#a3").show();
		$("#a1").show();
		$("#a2").hide();
		$(".menu2>ul").removeClass("menu2_ul");
		$(".menu2").find(".check").hide();
		$(".erji").slideUp();
		$(".sanji").slideUp();
		})
		////////////////////////
			$(".closed").click(function(){
		$(".jiazai").hide();
		})
	 //设置样式更改		
	 changeStyleWhenMouseMove();
})

/** 
 * 当鼠标焦点及移出焦点的样式
 **/
function changeStyleWhenMouseMove() {
	$(".bt_blue").mouseover(function(){ 
		$(this).addClass("bt_blueon");
	});
	$(".bt_blue").mouseout(function(){
		$(this).removeClass("bt_blueon");
	});
	$(".bt_ora").mouseover(function(){
		$(this).addClass("bt_oraon");
	});
	$(".bt_ora").mouseout(function(){
		$(this).removeClass("bt_oraon");
	});
	$(".bt_lightblue").mouseover(function(){
		$(this).addClass("bt_lightblueon");
	});
	$(".bt_lightblue").mouseout(function(){
		$(this).removeClass("bt_lightblueon");
	});
	$(".bt_gray").mouseover(function(){
		$(this).addClass("bt_grayon");
	});
	$(".bt_gray").mouseout(function(){
		$(this).removeClass("bt_grayon");
	});
	//按钮鼠标点击事件 
	$('.bt_blue , .bt_lightblue , .bt_ora,.bt_gray').mousedown(function(){
		$(this).addClass("bt_clickdown");
    });
	 $(".bt_blue , .bt_lightblue , .bt_ora").mouseup(function(){
		$(this).removeClass("bt_clickdown");
    }).mouseout(function(){
		$(this).removeClass("bt_clickdown");
    });
}