/*************************************此工具类用于处理xml和string的转换******************/

/**
 * 字符串转换成xml对象
 * @param {String} xmlString
 * @return {XML对象}
 */
function stringToXml(xmlString){
	var xmlobject = null;
	if(window.ActiveXObject || ("ActiveXObject" in window)){
		xmlobject = new ActiveXObject("Microsoft.XMLDOM");
		xmlobject.async = "false";
		xmlobject.loadXML(xmlString);
	}else{
		var parser = new DOMParser();
		xmlobject = parser.parseFromString(xmlString, "text/xml");
	}
	return xmlobject;
}

/**
 * xml对象转换成字符串
 * @param {XML对象} xmlObject
 * @return {String}
 */
function xmlToString(xmlObject){
	if(window.ActiveXObject || ("ActiveXObject" in window)){
		return xmlObject.xml;
	}else{
		return (new XMLSerializer()).serializeToString(xmlObject);
	}
}

//统一浏览器xpath查找
if(!window.ActiveXObject && !("ActiveXObject" in window)){
	XMLDocument.prototype.selectSingleNode = Element.prototype.selectSingleNode = function (sXpath){
		var xpathObj=new XPathEvaluator();
		var result = xpathObj.evaluate(sXpath,this,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
		return result.singleNodeValue;
	};
	
	XMLDocument.prototype.selectNodes = Element.prototype.selectNodes = function (sXpath){
		var xpathObj = new XPathEvaluator();
		var result = xpathObj.evaluate(sXpath, this ,null, XPathResult.ORDERED_NODE_ITEARTOR_TYPE , null );
		var nodes = new Array();
		var node;
		while((node = result.iterateNext()) != null){
			nodes.push(node);
		}
		return nodes;
	};
}