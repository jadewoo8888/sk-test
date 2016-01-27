
function formatMoney(s, n) {
	n = n > 0 && n <= 20 ? n : 2;
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
	t = "";
	for (i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	return t.split("").reverse().join("") + "." + r;
}
function formatInt(s) { 
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")) + "";
	var l = s.split(".")[0].split("").reverse(), t = "";
	for (i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	return t.split("").reverse().join("");
}
/** 
 * 将字符串转换为数值，若包含千位符，需去掉。返回此字符串对应的数值
 * @param string sVal 数值字符串 
 * @return 去掉千位符号后的数值，若原来是整数，则返回整数，原来是浮点，则返回浮点
 */
function unformatMoney(val) {
	var returnVal = 0;
	if(typeof val === 'string') {
		val = val.replace(/,/g, "");
		if(val.indexOf('.')!=-1) {
			returnVal = parseFloat(val);
		} else {
			returnVal = parseInt(val);
		}
 	} else {
		returnVal =  val;
	}
	return returnVal;
}

/**
 * 格式化钱 小写的转化为大写
 **/
function moneyUpperCase(n){
	var strOutput = "";
  	var strUnit = '千百拾亿千百拾万千百拾元角分';
  	n += "00";
  	var intPos = n.indexOf('.');
	if (intPos >= 0){
  		n = n.substring(0, intPos) + n.substr(intPos + 1, 2);
  	}
  	strUnit = strUnit.substr(strUnit.length - n.length);
  	for (var i=0; i < n.length; i++){
		strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(n.substr(i,1),1) + strUnit.substr(i,1);
  	}
 	return strOutput;
}

 