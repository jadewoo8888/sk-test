			
			//zTree属性配置 
			var setting = {
				check: {
					enable: true, //开启checkbox
					nocheckInherit: false,//子节点自动继承父节点无checkbox 哪怕子节点设置了nocheck：true也无用
					halfCheck:true,
			        chkboxType:{
						"Y": "ps",
		                "N": "ps"
		            }
				},
				data: {
					simpleData: {
						enable: true
					}
				},
				view:{
					fontCss:getFontCss
				},
				callback: {
				}
			};
			//原始权限，在树中显示被勾选值
			var markOriginalId = new Array();
			var cancelPower = null;
			
			var ztree;
			//原始、新增、删减权限颜色指示
			function getFontCss(treeId, treeNode) {
				if(treeNode.highlight == 1){//新增
					return {color:"#A60000", "font-weight":"bold"};
				}else if(treeNode.highlight == 2){//删减
					return {color:"#ccc", "font-weight":"bold"};
				}else{//原始
					return {color:"#333", "font-weight":"normal"};
				}
			};
			//jquery函数
			$(function() {
				//显示功能权限树
				ajaxGetTreeData();
				//确定按钮事件
				$("#ok").click(function(){
					var selected = getTreeSelectValue();
					selected = strReplace(selected[0]);
					ajaxSaveData(selected);
				});
				
				//关闭窗口
				$("#cancel").click(function() {
					cancel();
				});
				
				//取消
			   	function cancel(){
			   		var parentIndex = top.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
			   		top.layer.close(parentIndex); //再执行关闭 
			   	}
				//选取删减权限项
				function selectCancel(selected){
					var unChecked = "";
					var searchNodes;
					//对比当前选中项与原始权限项
					for(var j=0;j<markOriginalId.length;j++){
						var flag = false;
						for(var i=0;i<selected.length;i++){
							if(markOriginalId[j] == selected[i].id)
								flag = true;
						}
						if(!flag){
							unChecked += markOriginalId[j]+"|";
						}
					}
					if(unChecked != ""){
						unChecked = unChecked.replace(/\|$/, '');
						cancelPower = unChecked;
					}
				}
				
				//替换所有逗号，换成竖杠
			   	function strReplace(str){
			   		return str.replace(/(\,)/g,"|");
			   	}
			   	/**回显数据
			   	 * nodes	数组节点
			   	 * data		包含原始、新增、删减数据
			   	 * treeObj	树元素对象
			   	 */
			   	function reShowTreeData(nodes,data,treeObj){
			   		//var name =window.dialogArguments.form.name.value;  //取得父窗口要回显的值 
			   		var original=newOption=cancelOption= "";
			   		if(data.groupMenuID != null)
			   			original = data.groupMenuID.split("|");	//原始选项
			   		if(data.userAddMenuID != null)
			   			newOption = data.userAddMenuID.split("|");//新增选项
			   		if(data.userMinusMenuID != null)
			   			cancelOption = data.userMinusMenuID.split("|");//删除选项
			   		ztree = treeObj;
			   		
			   		getShowData(nodes,original,treeObj,1);
			   		getShowData(nodes,newOption,treeObj,2);
			   		getShowData(nodes,cancelOption,treeObj,3);
			   	}
			   	/**勾选相对应的权限选项
			   	 * nodes	数组节点
			   	 * ids		相对应的id数组集合
			   	 * treeObj	树元素对象
			   	 * state	文字样式状态	1.黑色 2.变红色 3.变灰色
			   	 */
			   	function getShowData(nodes,ids,treeObj,state){
			   		if (nodes.length>0) {
			   			var markIndex = 0;//辅助自增变量
			   			for(var j=0;j<ids.length;j++){
					   		for(var i=0;i<nodes.length;i++){
					   			if(nodes[i].isParent)
					   				continue;
						   		if(nodes[i].id == ids[j]){
						   			if(state == 1){
						   				treeObj.checkNode(nodes[i],true,true);
//								   		nodes[i].checked = true;
//								   		treeObj.updateNode(nodes[i]);
								   		markOriginalId[markIndex++] = ids[j];
						   			}else if(state == 2){
//						   				nodes[i].checked = true;
						   				//变红色
						   				nodes[i].highlight = 1;
								   		treeObj.updateNode(nodes[i]);
								   		treeObj.checkNode(nodes[i],true,true);
						   			}else if(state == 3){
//						   				nodes[i].checked = false;
						   				//变灰色
						   				nodes[i].highlight = 2;
								   		treeObj.updateNode(nodes[i]);
						   				treeObj.checkNode(nodes[i],false,true);
						   			}
						   		}
					   		}
			   			}
			   		} 
			   	}
				//显示树数据
				function ajaxGetTreeData() {
					Ajax.service(	
								'idSysMenuService', 
								'getMenuByUserID', 
								[ top.strUserAccount ],
							function(data) {
								xmlData = data;
								var Nodes = [];
								
								xmlData=xmlData.replace(/\"/g,"");
			        			xmlData=xmlData.replace(/<!--[\s\S]*-->/,"");
			        			xmlData=xmlData.replace(/<?[\s\S]*?>/,"");
			    				var xmlObj=stringToXml(xmlData);
			    				DeletXmleData(xmlObj);
			    				var menus=xmlObj.selectNodes("/menu/menu");
			    				xmltozTreeJSON(Nodes, menus,null);
			    				
								$.fn.zTree.init($("#tsid_div_tree"),setting,Nodes); 
								var treeObj = $.fn.zTree.getZTreeObj("tsid_div_tree");
								var node = treeObj.transformToArray(treeObj.getNodes()); //将所有节点转换为数组
								ajaxGetModifyData(node,treeObj);
							}
					);		
				}
				//删除xml url节点
				function DeletXmleData(xmlObj){
					var menuArr = xmlObj.getElementsByTagName("menu");
					$.each(menuArr,function(k,v){
						$(this).removeAttr("url");
					})
				}
				//判断浏览器类型返回xml对象
				function createXml(str){
				　　if(document.all){
					　　var xmlDom=new ActiveXObject("Microsoft.XMLDOM")
					　　xmlDom.loadXML(str)
					　　return xmlDom
				　　}
				　　else
				　　		return new DOMParser().parseFromString(str, "text/xml")
			　　} 
				/**异步保存所选选项
				 * selected		新增权限
				 * cancelPower	删减权限
				 */
				function ajaxSaveData(selected) {
					top.layer.open({
						title:'信息',
						icon: 3,
						closeBtn:2,
						area:[250,150],
						btn:['确定', '取消'],
						content:"确定保存吗？",
						yes: function(index){
							top.layer.close(index);
							Ajax.service(	
								'UserBO', 
								'saveMenuForUser', 
								[ userid,selected,cancelPower],
								function(data) {
									top.layer.open({
										title:'信息',
										icon: 1,
										closeBtn:2,
										area:[250,150],
										btn:['确定'],
										content:"保存成功！",
										yes: function(success){
											top.layer.close(success);
											cancel();
										}
									});
								}
							);
						}
					});
				}
				//异步获取被授权用户
				function ajaxGetModifyData(node,treeObj) {
					Ajax.service(	
							'idSysMenuService', 
							'getMenuIDByUserID', 
							[userid],
							function(data) {
								reShowTreeData(node,data,treeObj);
							}
					);
				}
				
		
				//将xml转换成json数组 
				function xmltozTreeJSON(Nodes, xmlData, parentNode) {
					var jsonNodes = "";
					for ( var i = 0; i < xmlData.length; i++) {
						if(xmlData[i].nodeName=="#text") continue;
						jsonNodes = {
							id : xmlData[i].getAttribute("id"),
							pId : parentNode == null ? null : parentNode.getAttribute("id"),
							name : xmlData[i].getAttribute("name"),
							url : xmlData[i].getAttribute("url")
						};
						Nodes.push(jsonNodes);
						var menuchild = xmlData[i].childNodes;
						if (menuchild.length > 0) {
							xmltozTreeJSON(Nodes, menuchild, xmlData[i]);
						}
					}
					return Nodes;
				}
				//获取选中的选项的ID值跟文本值
				function getTreeSelectValue() {
					var returnValue = "";
					var returnDisplayValue = "";
					var selectNodes = null;
					
					var ts_tree_zTreeObj = $.fn.zTree.getZTreeObj("tsid_div_tree");
					//获取所有选中项
					selectNodes = ts_tree_zTreeObj.getCheckedNodes();
					//选出被删减的权限
					selectCancel(selectNodes);
					
					//排除原始权限选项加入到新增权限选项
					for (var i = 0; i < selectNodes.length; i++) {
						var temp = true;
						for(var j=0;j<markOriginalId.length;j++){
							//排除原始权限选项
							if(selectNodes[i].id == markOriginalId[j]){
								temp = false;
								break;
							}
						}
						if(temp){
							returnValue += "," + selectNodes[i].id;
							returnDisplayValue += "," + selectNodes[i].name;
						}
					}
					if (returnValue.length > 0) {
						returnValue = returnValue.substring(1);
						returnDisplayValue = returnDisplayValue.substring(1);
					}
					
					var arr_return = new Array();
					arr_return.push(returnValue);
					arr_return.push(returnDisplayValue);
					return arr_return;
				}
			})