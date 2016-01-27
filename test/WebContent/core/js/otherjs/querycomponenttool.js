//////////////////查询组件的一些公用方法//////////////////////////
/**
 * 设置时间区间下拉组件
 * 组件的形式如：下拉，选项有全部、当天、一周内、一个月内
 * @param  id 组件id
 * @param  queryfield 查询字段
 **/
function setDateSectionCombobox(id, queryfield) {
	var datas = [];
	var today = getsearchDate("today");
	datas[0] = {"sql":" ", "value":"\u5168\u90e8"};
	datas[1] = {"sql":" " + queryfield + " = '" + today + "' ", "value":"\u5f53\u5929 "};
	datas[2] = {"sql":" " + queryfield + " > '" + getsearchDate("week") + "' and " + queryfield + " <= '" + today + "' ", "value":"1\u5468\u5185 "};
	datas[3] = {"sql":" " + queryfield + " > '" + getsearchDate("oneMonth") + "' and " + queryfield + " <= '" + today + "' ", "value":"1\u4e2a\u6708\u5185 "};
    //加载查询日期条件
	$("#" + id).combobox({data:datas, valueField:"sql", textField:"value", panelHeight:120, width:80});
}



/**
 * 以当天为基准，获取不同类型的日期
 **/
function getsearchDate(beday) {
	var d = new Date(Date.parse(top.serverDate.replace(/-/g,"/"))); 
	if (beday == "week") {
		d.setDate(d.getDate() - 7);
	}
	if (beday == "oneMonth") {
		d.setDate(d.getDate() - 30);
	}
	var month = d.getMonth() + 1;
	month = month > 9 ? month : "0" + month;
	var date = d.getDate();
	date = date > 9 ? date : "0" + date;
	return d.getFullYear() + "-" + month + "-" + date;
}

