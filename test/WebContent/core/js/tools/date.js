/**
 * @function:获取系统当天日期。
 * @retinfo:系统当天日期。
 */
function getTodayDate(){
	var dateToday = new Date();
  var intYear = dateToday.getFullYear();
  var intMonth = dateToday.getMonth()+1;
  var intDate = dateToday.getDate();
  var intDay = dateToday.getDay();
  var ary_strWeek = new Array("日","一","二","三","四","五","六");
  // 月、日补齐两位
	var strYear = ""+intYear; 
	var strMonth = intMonth<10?"0"+intMonth:""+intMonth; 
	var strDate = intDate<10?("0"+intDate):intDate;
	
  return strYear+"-"+strMonth+"-"+strDate;
}

function getTodayTime() {
	var dateTime = getDateFormat(new Date(),"yyyy-MM-dd hh:mm:ss");
	return dateTime;
}

/**
 * @function:根据指定日期获取指定周开始/结束日期。
 * @retinfo:指定日期获取指定周开始/结束日期。
 */
function getThisWeekBeginDay(strDate,intWeekOffset,strBorE){
	var intYear = new Number(strDate.substring(0,4));
	var intMonth = new Number(strDate.substring(5,7));
	var intDate = new Number(strDate.substring(8,10));

	var datePoint = new Date(intYear,intMonth-1,intDate,0,0,0,0);
	var intDay = datePoint.getDay(); // 星期几
	var intOneDayMS = 24*60*60*1000; // 一天的毫秒数
	var intDatePointMS = datePoint.getTime(); // 指定日期的毫秒数
	var intDateRetMS = 0;
	// 获取开始日期
	if(strBorE=="B"){
	  intDateRetMS = intDatePointMS-intDay*intOneDayMS-intWeekOffset*7*intOneDayMS;
	}else if(strBorE=="E"){
	  intDateRetMS = intDatePointMS+(7-intDay)*intOneDayMS-intWeekOffset*7*intOneDayMS;
	}
	
	datePoint = new Date(intDateRetMS);

	var strRtnYear = ""+datePoint.getYear();
	var strRtnMonth = (datePoint.getMonth()+1)<10?("0"+(datePoint.getMonth()+1)):""+(datePoint.getMonth()+1);
	var strRtnDate = datePoint.getDate()<10?("0"+datePoint.getDate()):""+datePoint.getDate();

	return strRtnYear+"-"+strRtnMonth+"-"+strRtnDate;
}

/**
 * @function:根据指定日期获取该日期所属月份第一天。
 * @retinfo:指定日期所属月份第一天。
 */
function getThisMonthBeginDay(strDate){
	var intYear = new Number(strDate.substring(0,4));
	var intMonth = new Number(strDate.substring(5,7));

	var datePoint = new Date(intYear,intMonth-1,1);
	var strRtnYear = ""+datePoint.getYear();
	var strRtnMonth = (datePoint.getMonth()+1)<10?("0"+(datePoint.getMonth()+1)):""+(datePoint.getMonth()+1);
	var strRtnDate = datePoint.getDate()<10?("0"+datePoint.getDate()):""+datePoint.getDate();

	return strRtnYear+"-"+strRtnMonth+"-"+strRtnDate;
}

/**
 * @function:根据指定日期获取该日期所属年份第一天。
 * @retinfo:指定日期所属年份第一天。
 */
function getThisYearBeginDay(strDate){
	var intYear = new Number(strDate.substring(0,4));

	var datePoint = new Date(intYear,0,1);
	var strRtnYear = ""+datePoint.getYear();
	var strRtnMonth = (datePoint.getMonth()+1)<10?("0"+(datePoint.getMonth()+1)):""+(datePoint.getMonth()+1);
	var strRtnDate = datePoint.getDate()<10?("0"+datePoint.getDate()):""+datePoint.getDate();

	return strRtnYear+"-"+strRtnMonth+"-"+strRtnDate;
}

/**
 * @function:根据指定日期及年、月、日差量获取新指定日期。
 * @paratype:int，年份差量。
 * @paratype:int，月份差量。
 * @paratype:int，日期差量。
 * @retinfo:新指定日期。
 */
function getPointDate(strDate,intYearOffset,intMonthOffset,intDateOffset){
	var intYear = new Number(strDate.substring(0,4));
	var intMonth = new Number(strDate.substring(5,7));
	var intDate = new Number(strDate.substring(8,10));

	var datePoint = new Date(intYear - intYearOffset,intMonth - intMonthOffset - 1,intDate - intDateOffset);
	var strRtnYear = ""+datePoint.getFullYear();
	var strRtnMonth = (datePoint.getMonth()+1)<10?("0"+(datePoint.getMonth()+1)):""+(datePoint.getMonth()+1);
	var strRtbDate = datePoint.getDate()<10?("0"+datePoint.getDate()):""+datePoint.getDate();

	return strRtnYear+"-"+strRtnMonth+"-"+strRtbDate;
}

/**
 * @function:根据为该月最后一天添加上时间
 * @paratype:int，年份差量。
 * @paratype:int，月份差量。
 * @paratype:int，日期差量。
 * @retinfo:新指定日期。
 */
 function getLastestDate(strDate){
	var intYear = new Number(strDate.substring(0,4));
	var intMonth = new Number(strDate.substring(5,7));
	var intDate = new Number(strDate.substring(8,10));
	var dateF = "24:00:00";
	var datePoint = new Date(intYear,intMonth-1,intDate);
	var strRtnYear = ""+datePoint.getFullYear();
	var strRtnMonth = (datePoint.getMonth()+1)<10?("0"+(datePoint.getMonth()+1)):""+(datePoint.getMonth()+1);
	var strRtbDate = datePoint.getDate()<10?("0"+datePoint.getDate()):""+datePoint.getDate();
	return strRtnYear+"-"+strRtnMonth+"-"+strRtbDate+" "+dateF;
}
  /**
   * 取得两月份之差，strDate2-strDate1
   * 
   * @param strDate1
   * @param strDate2
   * @return
   */
 function getMonthDiff(strDate1,strDate2){
    var m1 = new Number(strDate1.substring(5,7));
    var m2 = new Number(strDate2.substring(5,7));
    var y1 = new Number(strDate1.substring(0,4));
    var y2 = new Number(strDate2.substring(0,4));
    return (y2-y1)*12+(m2-m1);
  }
  
  /**
   * 取两个日期月份之差，strDate2-strDate1
   * 例如：2010-02-01 - 2010-02-28，结果：1
   * @author 黄桂溶
   * @param strBeginDate 开始日期
   * @param strEndDate   结束日期
   * @return 月份差
   */
 function getMonthDiffNew(strDate1,strDate2){
    var m1 = new Number(strDate1.substring(5,7));
    var m2 = new Number(strDate2.substring(5,7));
    var y1 = new Number(strDate1.substring(0,4));
    var y2 = new Number(strDate2.substring(0,4));
    var d1 = new Number(strDate1.substring(8));
    var d2 = new Number(strDate2.substring(8));
    var month =(y2-y1)*12+(m2-m1);
    var day = d2 - d1 + 1;
    //月份相同时，如果两个日期相差的天数=该月的天数，那么月差+1(2010-02-01~~2010-02-28)
    if((m2-m1 == 0) && (day == getDays(strDate1))){
       month = month + 1
    }
    //如果结束时间的日<开始时间的日，并且结束时间的月份不是2、结束时间不是当月的最后一天，那么月差为0 
    // 2010-05-16~~2010-06-10 0
    else if((d2<d1) && (m2) != 2 && (d2 != getDays(strDate2))){
      month = month - 1
    }
    //月份相差1,如果结束时间的日<开始时间的日，且结束时间的月份为2、结束时间不是当月的最后一天,那么根据天差>=29为一个月，否则不足一个月
    //2010-01-12 ~~ 2010-02-12 结果0  2010-01-31 ~~ 2010-02-28 结果1
    else if((m2-m1 == 1) && (d2<d1) && (m2 == 2) && (day<29) && (d2 != getDays(strDate2))){
       month = month==0?0 : month-1;
    }else if((m2-m1 == 1) && (d2<d1) && (m2 == 2) && (day>=29) && (d2 != getDays(strDate2))){
       month = month+1;
    }
    return month;
  }
  
  /**
   * 取两个日期之差，精确到天数，strDate1-strDate2
   * 例如：2010-08-11 - 2010-09-05，结果：25天
   * @author 郑斌
   * @param strBeginDate 开始日期
   * @param strEndDate   结束日期
   * @param intDay   	 设置多少天为1个月与getDays()搭配使用
   * @return 日，格式：20
   * @throws Exception
   */
  function getDateDiff(strBeginDate, strEndDate, intDay) {
	  var iYear1 = new Number(strBeginDate.substr(0, 4));
	  var iYear2 = new Number(strEndDate.substr(0, 4));

	  var iMonth1 = new Number(strBeginDate.substr(5, 2));
	  var iMonth2 = new Number(strEndDate.substr(5, 2));
	  /****** 计算月份Begin ******/
	  var y = iYear2 - iYear1;
	  var m = iMonth2 - iMonth1;
	  m += y * 12;
	  /****** 计算月份End ******/
	  
	  /****** 计算天数Begin ******/
	  var d1 = new Number(strBeginDate.substr(8, 2));
	  var d2 = new Number(strEndDate.substr(8, 2));
	  var d = 0;
	  if (d2 < d1) {
		  m -= 1;
		  d = intDay - d1 + d2;
	  } else {
		  d = d2 - d1;
	  }
	  /****** 计算天数End ******/
	  /****** 组合返回值Begin ******/
	  d = d + m * 30;
	  /****** 组合返回值End ******/
	  return d;

  }
  
  /**
   * 根据日期，返回日期中月份部分的天数数量
   * 例如：2010-02-01，返回2月份的最高天数28天
   * @author 郑斌
   * @param strDate 日期
   * @return 天数，28
   * @throws Exception
   */
  function getDays(strDate) {
	  /****** 获取年、月Begin ******/
	  var y = new Number(strDate.substr(0, 4));
	  var m = new Number(strDate.substr(5, 2));
	  /****** 获取年、月End ******/
	  
	  /****** 计算天数Begin ******/
	  var d = 30;
	  if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
		  d = 31;
	  } else if (m == 2) {
		  // 闰年
		  if (y % 4 == 0 && y % 100 != 0) {
			  // 闰月
			  d = 29;
		  } else {
			  d = 28;
		  }
	  } 
	  /****** 计算天数End ******/
	  return d;
  }
  /**
   * 格式化显示日期时间
   * 例如：getDateFormat(new Date(),"yyyy-MM-dd hh:mm:ss")，返回2013-05-07 16:08:08
   * @author 范樽
   * @param date Date型日期 ，format格式
   * @return 格式化时间
   * @throws Exception
   */
  function getDateFormat(date,format) {
	var o = { 
		"M+" : date.getMonth()+1, //month 
		"d+" : date.getDate(), //day 
		"h+" : date.getHours(), //hour 
		"m+" : date.getMinutes(), //minute 
		"s+" : date.getSeconds() //second 
	}  
	//year
	if(/(y+)/.test(format)) { 
		format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	} 
	//milliseconds
	if(/(S+)/.test(format)) { 
		format = format.replace(RegExp.$1, RegExp.$1.length==1 ? date.getMilliseconds() : ("000"+ date.getMilliseconds()).substr((""+ date.getMilliseconds()).length)); 
	}
	for(var k in o) {  
		if(new RegExp("("+ k +")").test(format)) { 
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
		} 
	}  
	return format; 
  }
  
 /**
  * 取两个日期月份之差，strDate2-strDate1
  * 例如：2010-02-01 - 2010-02-28，结果：1
  * @param strDate1 开始日期
  * @param strDate2   结束日期
  * @return 月份差,不是完整月数返回-1
  */
function getMonthDiffNewSend(strDate1,strDate2){
   var m1 = new Number(strDate1.substring(5,7));
   var m2 = new Number(strDate2.substring(5,7));
   var y1 = new Number(strDate1.substring(0,4));
   var y2 = new Number(strDate2.substring(0,4));
   var d1 = new Number(strDate1.substring(8));
   var d2 = new Number(strDate2.substring(8));
   var month =(y2-y1)*12+(m2-m1);
   var day = d2 - d1 + 1;
   
   //月份相同时，如果两个日期相差的天数=该月的天数，那么月差+1(2010-02-01~~2010-02-28)
   if((m2-m1 == 0) && (day == getDays(strDate1))){
      month = month + 1;
   }
   //如果结束时间的日<开始时间的日，并且结束时间的月份不是2、结束时间不是当月的最后一天，那么月差为0 
   // 2010-05-16~~2010-06-10 0
   else if((d2<d1) && (m2) != 2 && (d2 != getDays(strDate2)) && day!=0){
     month = month - 1;
   }
   //月份相差1,如果结束时间的日<开始时间的日，且结束时间的月份为2、结束时间不是当月的最后一天,那么根据天差>=29为一个月，否则不足一个月
   //2010-01-12 ~~ 2010-02-12 结果0  2010-01-31 ~~ 2010-02-28 结果1
   else if((m2-m1 == 1) && (d2<d1) && (m2 == 2) && (day<28) && (d2 != getDays(strDate2))){
      month = month==0?0 : month-1;
   }else if((m2-m1 == 1) && (d2<d1) && (m2 == 2) && (day>=28) && (d2 != getDays(strDate2))){
      month = month+1;
   } else if (day == getDays(strDate2)) {
	   month = month+1;
   }
   if ((day==0 || day == getDays(strDate2)) && (m2) != 2 && (m1) != 2 ) {
	   
   } else if ((day==0 || day >=28) && (m2 == 2 || m1 == 2) ) {
	   
   } else {
	   month=-1;
   }
   
   return month;
 }

//格式化日期
function formatterDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
	+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
};