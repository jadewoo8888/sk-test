var TreeBase = Class.create();
TreeBase.prototype = {
    /** window 主div的html **/
    windowHtml: "<div id='tsid_div_windowmain' ><div id='tsid_div_toolbar' style='padding-left:10px;padding-top:5px'><table cellpadding='0' cellspacing='0' style='width:100%'><tr><td style='padding-left:2px'><input class='shaixuan_txt float_left gray_txt' id='tsid_ipt_search'  style='height:22px'   type='text'/><input type='button' id='tsid_btn_query' value='\u67e5\u8be2' style='margin-left:10px'  class='bt_ensure'> </td><td style='text-align:right;padding-right:2px'></td></tr></table></div><div style='height:408px;overflow:auto' > <div   class='ztree'  id='tsid_div_tree'></div></div><div id='tsid_div_bottbtn'  style='text-align:center;padding-top:5px;padding-bottom:10px' ><input type='button' id='tsid_btn_sure' value='\u786e\u5b9a'  class='bt_ensure'>&nbsp;&nbsp;&nbsp;<input type='button' id='tsid_btn_cancel' value='\u53d6\u6d88' class='bt_cancel'></div></div>",
    /** tree设置 **/
    tree_setting: {},
    /** ztree对象**/
    tree_zTreeObj: null,
    /** 窗口对象 **/
    treeSelectWindow: null,
    /** 搜索输入框文字**/
    str_ipt_search: "",
    /** 窗口标题栏文字 **/
    str_title: "", 
    /** 树数据中中文名称字段 **/
    realCHName: "",
    /** 向后台发送的查询编码 **/
    queryCode:null,
    /** 过滤的编码(对应树类型的数据内码)数组，当后台获取数据后，在前端按此数组过滤移除filterCodeArr节点及子节点的数据**/
    filterCodeArr:null,
    /** **/
    /**
	 * option包含的基本属性：
	 * busiType:业务类型
	 * defaultSelecteds：默认选中数据，格式:(1)数组['001002','001003'] (2):以','分隔的字符串'001002','001003'
	 * selType:选择类型 sgl(单选,默认) mul(多选)
	 * callBackFunction:回调函数
	 **/
    initialize: function(options) {
        this.options = $.extend({
            busiType: '',
            selType: 'sgl',
            defaultSelecteds: null,
            callBackFunction: null
        },
        options);
        this.options.defaultSelecteds = this.judgeAndTranArr(this.options.defaultSelecteds);
    },
    init: function() {
        var thisObj = this;
        if ($("#tsid_div_windowmain").length != 0) {
            $("#tsid_div_windowmain").remove();
        }							
        $("body").append(this.windowHtml);    
        this.initFunc();
        this.initTreeSet();
        this.initWindow();
        thisObj.beforeGetData();
       
    },
    /**
     * 向后台获取数据前的处理
     **/
    beforeGetData:function() {
    	var thisObj = this;
    	//通过提示层成功回调和延时执行两种方式，令页面尽量出现加载提示后才获取数据，以改进卡慢，改善用户体验
    	$("#tsid_div_windowmain").addLoading({msg:"\u52aa\u529b\u52a0\u8f7d\u6570\u636e\u4e2d\uff0c\u8bf7\u7a0d\u540e...", successcallback:function () {
			setTimeout(function () {
				thisObj.getData(); 
		    }, 200);}
		});
    },
    /**
 	* 设置组件绑定的方法
 	**/
    initFunc: function() {
        var thisObj = this;
        $("#tsid_btn_cancel").click(function() {
            thisObj.windowClose()
        });
        $("#tsid_btn_sure").click(function() {
            thisObj.sure()
        });
        $("#tsid_ipt_search").focus(function() {
            thisObj.searchInputFocus()
        });
        $("#tsid_btn_query").click(function() {
            thisObj.treeSearch()
        });
        $("#tsid_ipt_search").keydown(function(e) {
            thisObj.searchInputKeyDown(e)
        });
    },
    /**
	 * 初始化设置window
 	**/
    initWindow: function() {
        var thisObj = this;
        $("#tsid_ipt_search").val(this.str_ipt_search);
        this.treeSelectWindow = layer.open({
            type: 1,
            title: thisObj.str_title,
            area: ["500px", "516px"],
            shift: 1,
            closeBtn: 2,
            content: $("#tsid_div_windowmain"),
            cancel: function() {
                thisObj.windowClose()
            }
        });
    },
    /**
 	 * 获取数据成功的处理 
 	 **/
    getDataSuccessFun: function(jsonData) {
        if (typeof(jsonData) == "undefined") {
            return;
        }
        var afterFilterData = this.filterData(jsonData);
        //默认展开根节点
        afterFilterData[0].open = true;
        //处理树节点实际显示
        this.dealNoteViewData(afterFilterData);
        var treeDivID = $("#tsid_div_tree");
        $.fn.zTree.init(treeDivID, this.tree_setting, afterFilterData);
        this.tree_zTreeObj = $.fn.zTree.getZTreeObj("tsid_div_tree");
        this.setDefaultSelect(this.options.defaultSelecteds);
        $("#tsid_div_windowmain").removeLoading();
    },
    filterData:function(jsonData) {
    	if(!this.options.filterCodeArr) {
    		return jsonData;
    	} 
    	var afterFilterData = new Array();
    	var filterCodeArrLen = this.options.filterCodeArr.length;
    	var jsonDataLen = jsonData.length;
    	var idKey = this.tree_setting.data.simpleData.idKey;
    	var filterFlag = false;
    	/** 遍历请求获取的树数据，同时遍历需过滤的节点数组，当当前节点不属于过滤节点及子节点时添加到过滤后数据对象中 **/
    	for(var i=0;i<jsonDataLen;i++) {
    		filterFlag = false;
    		for(var j=0;j<filterCodeArrLen;j++) {
    			if(jsonData[i][idKey].indexOf(this.options.filterCodeArr[j])==0) {
    				filterFlag = true;
    				break;
    			}
     		}
     		if(!filterFlag) {
     			afterFilterData.push(jsonData[i]);
     		}
     	}
     	return afterFilterData;
    },
    /**
 	 * 获取数据失败的处理 
 	 **/
    getDataFailureFun: function() {
        top.layer.alert('获取树数据出现问题',{shadeClose:true,shift: 6,icon:5,closeBtn :2,time:2000});
        $("#tsid_div_windowmain").removeLoading();
    },
    /**
     * 处理树节点显示的数据 
     **/
    dealNoteViewData:function(jsonData) {
    },
    /**
  	* 设置默认选中，若选中的节点为父节点，会将其子节点也选中
  	* @param selectedsArr 默认选中项 格式如 ['001502','001503']
  	**/
    setDefaultSelect: function(selectedsArr) {
        if (selectedsArr == undefined || selectedsArr == null || selectedsArr.length == 0) {
            return;
        }
        var nodes = new Array();
        for (var i = 0; i < selectedsArr.length; i++) {
            var node = this.tree_zTreeObj.getNodeByParam(this.tree_zTreeObj.setting.data.simpleData.idKey, selectedsArr[i]);
            if (node != null) {
                if (this.options.selType == "mul") {
                    this.tree_zTreeObj.checkNode(node, true, true);
                    //末级节点
                    var parentNode = node.getParentNode();
                    if(parentNode!=null) {
                    	if (parentNode.getCheckStatus().half == true) {
                    		this.tree_zTreeObj.expandNode(parentNode, true, false, true);
                    	}
                    }
                } else {
                    this.tree_zTreeObj.selectNode(node);
                }
            }
        }
    },
    /**模糊查询输入框键盘事件处理方法 * */
    searchInputKeyDown: function(e) {
        if (e.keyCode == 13) {
            this.treeSearch();
        }
    },
    /**模糊查询 * */
    searchNodes: null,
    searchText: "",
    treeSearch: function() {
        var thisObj = this;
        this.searchText = $("#tsid_ipt_search").val();
        if (this.searchText == this.str_ipt_search || this.searchText == "") {
            return;
        }
        if (this.tree_zTreeObj == null) {
            return;
        }
        // 搜索前先将上次高亮的节点变回普通样式
        if(this.searchNodes) {
        	this.updateNodes(this.searchNodes, false);
        }
        //通过名称模糊搜索
        this.searchNodes = this.tree_zTreeObj.getNodesByFilter(function(node) {
            return thisObj.nodesFilter(node);
        });
       	if(this.searchNodes!=null&&this.searchNodes.length>0) {
       		this.updateNodes(this.searchNodes, true);
        	this.expandNodes(this.searchNodes);
       	} else {
       		top.layer.alert('没有查找到合适的记录',{shadeClose:true,shift: 6,icon:5,closeBtn :2,time:2000});
       	}
        
    },
    /**
  	 * 递归得到指定节点的父节点的父节点....直到根节点
  	 */
    getParentNodes_ztree: function(node) {
        if (node != null) {
            var parentNode = node.getParentNode();
            return this.getParentNodes_ztree(parentNode);
        } else {
            return node;
        }
    },
    /**
 	* 消除搜索文本框提示
 	**/
    searchInputFocus: function() {
        var searchObj = $("#tsid_ipt_search");
        if (searchObj.val() == this.str_ipt_search) {
            searchObj.val("");
            searchObj.css("color", "#333");
        }
    },
    /**
 	 *设置树节点字体样式，可用于设置字体高亮
 	 */
    getFontCss: function(treeId, treeNode) {
        return (treeNode.highlight) ? {
            color: "#A60000",
            "font-weight": "bold"
        }: {
            color: "#333",
            "font-weight": "normal"
        };
    },
    /**
 	 * 自定义节点搜索方法
 	 **/
    nodesFilter: function(node) {
        var filterFlag = false;
        /** 部门和单位树只需要搜索名称和外码 **/
        if (node.name.indexOf(this.searchText) != -1) {
            filterFlag = true;
        }
        return filterFlag;
    },
    /**
 	 * 更新节点显示高亮，并展开
 	 **/
    updateNodes: function(searchNodes, highlight) {
        if (searchNodes == null) {
            return;
        }
        for (var i = 0,
        l = searchNodes.length; i < l; i++) {
            searchNodes[i].highlight = highlight;
            this.tree_zTreeObj.updateNode(searchNodes[i]);
        }
    },

    /**
 	 * 展开节点
 	 **/
    expandNodes: function(searchNodes) {
        var thisObj = this;
        if (searchNodes == null) {
            return;
        }
        /** 遍历展开符合条件的节点 **/
        var searchNodesLen = searchNodes.length;
        for (var i = searchNodesLen; i > 0; i--) {
            var parentNode = searchNodes[i - 1].getParentNode();
            var parentNodes = this.getParentNodes_ztree(parentNode);
            this.tree_zTreeObj.expandNode(parentNodes, true, false, true);
            this.tree_zTreeObj.expandNode(parentNode, true, false, true);
        }

        /** 通过设置选中再取消选中这种特殊的方式，令页面无论是否出现滚动条，将页面定位到符合条件的第一个节点 **/
        setTimeout(function() {
            thisObj.tree_zTreeObj.selectNode(searchNodes[0]);
            thisObj.tree_zTreeObj.cancelSelectedNode(searchNodes[0]);
        },
        800);
    },
    /**
 	 * ztree双击处理
     **/
    treeDoubleClick: function(event, treeId, treeNode) {
        //双击节点
        if (treeNode != null) {
            //当前this.options.strstrSelType为单选时，双击返回
            if (this.options.selType == "sgl") {
                this.sure();
            }
        }
    },
    /**
 	 * 获取ztree选中数据
 	 * @return 数组 0:选中数据实际值 1：选中数据显示值
 	 **/
    getTreeSelectValue: function() {
        var returnValue = "";
        var returnDisplayValue = "";
        var selectNodes = null;
        if (this.options.selType == "sgl") {
            selectNodes = this.tree_zTreeObj.getSelectedNodes();
            for (var i = 0; i < selectNodes.length; i++) {
                returnValue += "," + selectNodes[i][this.tree_zTreeObj.setting.data.simpleData.idKey];
                returnDisplayValue += "," + selectNodes[i].name;
            }
        } else {
            if (this.options.busiType == "statictis") {
                selectNodes = this.tree_zTreeObj.getCheckedNodes();
                for (var i = 0; i < selectNodes.length; i++) {
                    returnValue += "," + selectNodes[i][this.tree_zTreeObj.setting.data.simpleData.idKey];
                    returnDisplayValue += "," + selectNodes[i].name;
                }
            } else {
                /** 当为多选时，若某个节点下的所有节点均选中，则只需要返回这个节点。 **/
                selectNodes = this.tree_zTreeObj.getCheckedNodes();
                for (var i = 0; i < selectNodes.length; i++) {
                    /** 当节点为全选（若有子节点，所有子节点也被选中则此节点为全选 **/
                    if (selectNodes[i].getCheckStatus().half == false) {
                        if (selectNodes[i].getParentNode() != null) {
                            /** 父节点非全选，则此节点需返回 **/
                            if (selectNodes[i].getParentNode().getCheckStatus().half == true) {
                                returnValue += "," + selectNodes[i][this.tree_zTreeObj.setting.data.simpleData.idKey];
                                returnDisplayValue += "," + selectNodes[i].name;
                            }
                        } else {
                            returnValue += "," + selectNodes[i][this.tree_zTreeObj.setting.data.simpleData.idKey];
                            returnDisplayValue += "," + selectNodes[i].name;
                        }
                    }
                }
            }
        }
        if (returnValue.length > 0) {
            returnValue = returnValue.substring(1);
            returnDisplayValue = returnDisplayValue.substring(1);
        }
        var arr_return = new Array();
        arr_return.push(returnValue);
        arr_return.push(returnDisplayValue);
        arr_return.push(selectNodes);
        return arr_return;
    },
    judgeAndTranArr: function(defaultSelecteds) {
        if (typeof(defaultSelecteds) == "string") {
            defaultSelecteds = defaultSelecteds.split(",");
        }
        return defaultSelecteds;
    },
    /**
 	 * 确定按钮处理方法
     **/
    sure: function() {
        var arr_select = this.getTreeSelectValue();
        //未选择任何节点则提示需要选择
        if (arr_select[0].length == 0) {
       		top.layer.alert(this.str_title,{shadeClose:true,shift: 6,icon:7,closeBtn :2,time:2000});
            return;
        }
        //关闭选择窗口，调用回调函数 
        this.windowClose();
        this.callCBFunc(arr_select);
    },
    /**
     * 调用回调函数
     **/
    callCBFunc:function(arr_select) {
  	  	if(this.options.callBackFunction) {
            this.options.callBackFunction(arr_select[0], arr_select[1], arr_select[2]);
        } else {
        	top.layer.alert("\u672a\u5b9a\u4e49\u56de\u8c03\u51fd\u6570",{shadeClose:true,shift: 6,icon:7,closeBtn :2,time:2000});
        }
    },
    /**
 	 * 关闭选择窗口的处理
 	 **/
    windowClose: function() {
        //销毁ztree
        if (this.tree_zTreeObj != null) {
            this.tree_zTreeObj.destroy();
        }
        layer.close(this.treeSelectWindow);
    }
}