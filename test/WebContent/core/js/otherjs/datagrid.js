 /**
 * @class 处理数据列表相关
 * 对外暴露的方法有：
 * showSelectListItem:列选 
 * showExport:导出
 * getSelectedData：获取列表选中数据对象的数组
 * getSelectedDataPKArr：获取列表选中数据的idfield字段的数组
 * setRowNum:对传递进来的列表数据添加行号
 * filterFieldObj:获取过滤rn、ck、option字段的对象
 * getSelectedFilterObj(data):获取过滤参数中带有的rn、ck、option字段的对象
 * sortColumns(showFieldStr):根据以‘,’分隔的字段名字符串，返回调整顺序,是否显示后的column配置
 * showColumns(showFieldsStr):显示指定的列(按顺序)，其余将被隐藏, 不会重新获取数据
 * calculateSubTotalData(rows):根据传递的行数据，合计行数据的数值字段
 * getQueryCondition():获取查询条件对象集合
 *
 **/
var DataGrid = Class.create();
DataGrid.prototype = {
    /** 
     * 初始构造方法
     *
     * @param dataGridOptions 与datagrid相关的属性集合，包含easyui的datagrid的所有属性(某些属性会因自定义属性而失效)，以及一些自定义的属性。
     * 1、easyui的datagrid属性：
     * singleSelect:无效，由自定义属性checkbox控制。
     * url:无效，通过指定的类和方法获取数据。
     * showFooter:若customOptions中的subtotal或total为true（显示小计或合计行)，则showFooter强制为true
     *
     * 2、自定义属性： 
     * isQuery:是否向后台查询数据,默认为true,当为false时，需要手动设置data数据
     * checkbox: 行复选框,true:显示  false:不显示。当设置有复选框的时候，则表格默认能多选。否则只能选择一条数据
     * rniscontinuou: 这个属性当rownumbers为true时才生效。当为true时,行号翻页时也会连续，否则每页都从1开始.
     * onBeforeLoadData:方法，在成功获取数据后，loaddata前调用，方便实际业务修改列表数据。传入的参数为rows（行数据集合)
     *
     * @param customOptions 与具体业务相关的属性集合,包含如下属性
     * tableID：类对象所对应的列表<table>的id
     * queryAreaID:查询区域容器元素的id，没有设置则收集查询条件时，搜索整个页面元素，有则搜索此元素内元素
     * sortInfo:对象，包含唯一标示字段和查询排序字段,格式如：{"sortPK" : "GroupCode","sortSql" : "LastestUpdate Desc,UpdatePerson Asc"},sortPK和sortSql必须有值,否则后台查询会有问题;
     * classID：请求处理的类对外暴露的类ID
     * methodID：请求处理的类对外暴露的方法ID 
     * exportCurrentMethodID:导出当前页的方法ID
     * exportAllMethodID:导出所有的方法ID
     * total:是否显示合计行 true:显示，false:不显示，默认不显示
     * subtotal:是否显示小计行，true：显示，false：不显示，默认不显示
     * columns:[[]]数组,因可设置合并行，合并列，列表字段信息。若需合计则添加sum属性，若true，则表明为数值，需合计.格式如[{field:AssetRegAssetName,sum:true,title:资产名称,align:center,formatter:formatterfunction},{另一个字段信息}]
     * 字段的配置可参考datagrid的column配置,添加了额外的自定义属性如下：
     * sum：是否小计合计 true:是 默认false；
     * fmType:格式化类型，目前可设置:money(添加千位分隔符，保留两位小数),int(添加千位分隔符)
     * getMethod:后台代码使用，用于导出时对值进行处理，令输出与页面值相匹配
     *
     * customSortSqlFunc:属性接收一个方法，无参，有返回值，返回sql排序部分的语句，用于需要动态设置排序条件时，若无设置此属性，则会按照默认设置的sortInfo属性对象内的sortSql属性值排序。
     * todo
     * multiPageSelect:是否开启翻页记忆，只在列表支持多选情况下有效。默认为false  
     * selectedRowData:数组，选中行的唯一字段数据数组。如：sortInfo中的sortPK配置为useraccount,则传入['用户账号1','用户账号2']
     * //下面是查询相关的属性
     * customQCFunc: 设置自定义查询条件方法，具体业务页面通过调用这个属性所对应的方法设置自定义的查询条件，方法应返回数组形式的查询条件集合
     * baseQueryDivID: 基本查询区域的div的id,若为空则默认为： id_div_basequery
     * seniorQueryDivID:高级查询区域的div的id,若为空则默认为： id_div_seniorquery
     * //下面是查询，数据权限相关属性
     * orgField:单位内部编码字段名 
     * deptField:部门编码字段名
     * assetTypeField:资产类别字段名
     * userAccountField:用户账号字段名
     * assetNOField:资产内部编码字段名
     * assetPurposeField:资产用途字段名
     **/
    initialize: function(customOptions, dataGridOptions) {
        this.dataGridOptions = dataGridOptions == null ? {}: dataGridOptions;
        this.customOptions = customOptions == null ? {}: customOptions;
        /** 检查一些重要设置属性,不存在问题则结束,这个方法以后删除 **/
        if (!this._checkOptionImportSet()) {
            return;
        }
        this.dataGridObj = $('#' + customOptions.tableID); 
        
        $('#cardhead').css("display","block"); 
      	this._initAndSetDefaultVar();
        this._setDataGridOptionsDefault();
        this._setcustomOptionsDefault();
        this._setDataGridSeting();
    },
    /**
     * 为当前对象初始化一些私有属性，并设置默认值
     **/
    _initAndSetDefaultVar:function() {
    	this.lsWindow = null;
        this.exWindow = null;
        this.tempQueryInfo = null;
      	this.pageName = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1, window.location.pathname.indexOf("."));
        this.selectedRowData = null;
        
    },
    /**
     * 对dataGridOptions 和 customOptions里面的一些重要属性进行检查提示
     **/
    _checkOptionImportSet: function() {
        var flag = true;
        /** 检查dataGridOptions的重要属性 **/
        /** 检查customOptions的重要属性 **/
        if (this.customOptions.tableID == undefined || this.customOptions.tableID == null) {
            flag = false;
            top.layer.alert('请定义customOptions属性:tableID',{shadeClose:true,closeBtn :2,icon:7});
        }
        if (this.dataGridOptions.isQuery && (this.customOptions.sortInfo == undefined || this.customOptions.sortInfo == null)) {
            flag = false;
            top.layer.alert('请定义customOptions属性:sortInfo',{shadeClose:true,closeBtn :2,icon:7});
        }
        if (this.dataGridOptions.isQuery && (this.customOptions.classID == undefined || this.customOptions.classID == null)) {
            flag = false;
            top.layer.alert('请定义customOptions属性:classID',{shadeClose:true,closeBtn :2,icon:7});
        }
        if (this.customOptions.columns == undefined || this.customOptions.columns == null) {
            flag = false;
            top.layer.alert('请定义customOptions属性:columns',{shadeClose:true,closeBtn :2,icon:7});
        }
        return flag;
    },
    /**
     * 设置datagrid的默认属性
     **/
    _setDataGridOptionsDefault: function() {

        /** 默认向后台查询数据 **/
        this.dataGridOptions.isQuery = (this.dataGridOptions.isQuery == undefined || this.dataGridOptions.isQuery == null) ? true: this.dataGridOptions.isQuery;
        /** 默认当前页码：1**/
        this.dataGridOptions.pageNumber = (this.dataGridOptions.pageNumber == undefined || this.dataGridOptions.pageNumber == null) ? 1 : this.dataGridOptions.pageNumber;
        /** 默认加载提示:正在加载数据**/
        this.dataGridOptions.loadMsg = (this.dataGridOptions.loadMsg == undefined || this.dataGridOptions.loadMsg == null) ? "正在加载数据": this.dataGridOptions.loadMsg;
        /**默认指定高度，而不自动根据该行的内容。设置为false可以提高负载性能。**/
        this.dataGridOptions.autoRowHeight = (this.dataGridOptions.autoRowHeight == undefined || this.dataGridOptions.autoRowHeight == null) ? false: this.dataGridOptions.autoRowHeight;
        /**默认显示行号 **/
        this.dataGridOptions.rownumbers = (this.dataGridOptions.rownumbers == undefined || this.dataGridOptions.rownumbers == null) ? true: this.dataGridOptions.rownumbers;
        /**默认显示复选框 **/
        this.dataGridOptions.checkbox = (this.dataGridOptions.checkbox == undefined || this.dataGridOptions.checkbox == null) ? true: this.dataGridOptions.checkbox;
        /**默认显示分页**/
        this.dataGridOptions.pagination = (this.dataGridOptions.pagination == undefined || this.dataGridOptions.pagination == null) ? true: this.dataGridOptions.pagination;
        if(this.dataGridOptions.pagination) {
         	/** 默认每页行数：20**/
        	this.dataGridOptions.pageSize = (this.dataGridOptions.pageSize == undefined || this.dataGridOptions.pageSize == null) ? 20 : this.dataGridOptions.pageSize;
        	/** 默认行数下拉：10，20，50**/
        	this.dataGridOptions.pageList = (this.dataGridOptions.pageList == undefined || this.dataGridOptions.pageList == null) ? [10, 20, 50] : this.dataGridOptions.pageList;
        }
        /** 禁止列宽自适应 **/
        this.dataGridOptions.fitColumns = false;
        /** 确保设置url失效 **/
        this.dataGridOptions.url = null;
        /** 确保选中行的时候复选框也被选中 **/
        this.dataGridOptions.checkOnSelect = true;
        /** 确保选中复选框的时候也被选中行**/
        this.dataGridOptions.selectOnCheck = true;
        /**默认高度 **/
        if (this.dataGridOptions.height == undefined || this.dataGridOptions.height == null) {
            this.dataGridOptions.height = this._calculateDefaultDataGridHeight();
        }

        /**设置显示行号**/
        if (this.dataGridOptions.rownumbers != undefined && this.dataGridOptions.rownumbers == true) {
            var cols = [{
                field: 'rn',
                title: '行号',
                minwidth: 50
            }];
            this.customOptions.columns[0] = cols.concat(this.customOptions.columns[0]);
        }

        /**设置显示行复选框,若设置不显示复选框，则列表只能选中单行数据singleSelect = true **/
        if (this.dataGridOptions.checkbox != undefined && this.dataGridOptions.checkbox == true) {
            var cols = [{
                field: 'ck',
                checkbox: true,
                minwidth: 30
            }];
            this.customOptions.columns[0] = cols.concat(this.customOptions.columns[0]);
            this.dataGridOptions.singleSelect = false;
        } else {
            this.dataGridOptions.singleSelect = true;
        }

        /** 若显示小计行，则显示行脚**/
        if ((this.customOptions.subtotal != undefined && this.customOptions.subtotal == true) || (this.customOptions.total != undefined && this.customOptions.total == true)) {
            this.dataGridOptions.showFooter = true;
        }
        
        /*设置表格标题水平方向的位置*/
        this._setColumnDefaultHalign();
    },
    
    /**
     * 设置默认的表格标题在水平方向上的位置，默认居中，跟列的halign属性有关
     * @private
     */
    _setColumnDefaultHalign:function(){
    	if(this.customOptions.columns!=null){
    		for(var i=0;i<this.customOptions.columns.length;i++){
    			for(var j=0;j<this.customOptions.columns[i].length;j++){
    				if(!this.customOptions.columns[i][j].hasOwnProperty("halign")){
    					this.customOptions.columns[i][j]["halign"] = "center";
    				}
    			}
    		}
    	}
    },
    
    /**
     * 计算列表的datagrid的默认高度 
     **/
    _calculateDefaultDataGridHeight: function() {
        /** body的高度用了一个偷懒的方法,减去62是根据各个边框的padding计算的 **/ 
        var bodyHeight = document.documentElement.clientHeight - 90;
        var queryDivHeight = $('#id_div_basequery').height();
        var descriptionDivHeight = $('#id_div_desc').height();
        var datagridHeigth = bodyHeight - (descriptionDivHeight == undefined ? 0 : (descriptionDivHeight + 10)) - (queryDivHeight == undefined ? 0 : (queryDivHeight));
        return datagridHeigth;
    },

    /**
     * 设置表格业务相关的默认值
     **/
    _setcustomOptionsDefault: function() {
        this.customOptions.methodID = (this.customOptions.methodID == undefined || this.customOptions.methodID == null) ? 'getListForPage': this.customOptions.methodID;
        this.customOptions.exportCurrentMethodID = (this.customOptions.exportCurrentMethodID == undefined || this.customOptions.exportCurrentMethodID == null) ? 'add_exportCurrent': this.customOptions.methodID;
        this.customOptions.exportAllMethodID = (this.customOptions.exportAllMethodID == undefined || this.customOptions.exportAllMethodID == null) ? 'add_exportAll': this.customOptions.exportAllMethodID;
        this.customOptions.baseQueryDivID = (this.customOptions.baseQueryDivID == undefined || this.customOptions.baseQueryDivID == null) ? 'id_div_basequery': this.customOptions.baseQueryDivID;
        this.customOptions.seniorQueryDivID = (this.customOptions.seniorQueryDivID == undefined || this.customOptions.seniorQueryDivID == null) ? 'id_div_seniorquery': this.customOptions.seniorQueryDivID;
        this.customOptions.multiPageSelect = (this.customOptions.multiPageSelect == undefined || this.customOptions.multiPageSelect == null) ? false: this.customOptions.multiPageSelect;
        this.customOptions.total = (this.customOptions.total == undefined || this.customOptions.total == null) ? false: this.customOptions.total;
        this.customOptions.subtotal = (this.customOptions.subtotal == undefined || this.customOptions.subtotal == null) ? false: this.customOptions.subtotal;
        if (this.customOptions.total && (this.customOptions.methodID == 'getListForPage' || this.customOptions.methodID == 'queryAssetListForPage')) {
            this.customOptions.methodID = this.customOptions.methodID + 'WithSum';
        }
    },

    /**
     * 设置datagrid的属性
     **/
    _setDataGridSeting: function() {
        var showFields = $.cookie(this.pageName + '_showListItem'); 
        var hideFields = $.cookie(this.pageName + '_hideListItem'); 
        var sortColumns = this.sortColumns(showFields,hideFields);
        var thisObj = this; 
        this.dataGridObj.datagrid({
            idField: thisObj.customOptions.sortInfo.sortPK,
            columns: sortColumns,

            //暂时只添加如下的属性，有需要可添加,但如下属性请勿设置：url，rownumbers
            fitColumns: thisObj.dataGridOptions.fitColumns,
            striped: thisObj.dataGridOptions.striped,
            sortName: thisObj.dataGridOptions.sortName,
            singleSelect: thisObj.dataGridOptions.singleSelect,
            pagination: thisObj.dataGridOptions.pagination,
            pageNumber: thisObj.dataGridOptions.pageNumber,
            pageSize: thisObj.dataGridOptions.pageSize,
            pageList: thisObj.dataGridOptions.pageList,
            autoRowHeight: thisObj.dataGridOptions.autoRowHeight,
            toolbar: thisObj.dataGridOptions.toolbar,
            rowStyler: thisObj.dataGridOptions.rowStyler,
            editors: thisObj.dataGridOptions.editors,
            showHeader: thisObj.dataGridOptions.showHeader,
            showFooter: thisObj.dataGridOptions.showFooter,
            height: thisObj.dataGridOptions.height,
            width: thisObj.dataGridOptions.width,
            view: thisObj.dataGridOptions.view,
            loadMsg: '',
            onDblClickRow: function (rowIndex, rowData) {
           		thisObj. _rowDBClickFunc(rowIndex, rowData);
            },
            onClickRow: function (rowIndex, rowData) {
           		thisObj. _rowClickFunc(rowIndex, rowData);
            },
            onCheck:function (rowIndex,rowData) { 
            	thisObj. _onCheckFunc(rowIndex, rowData);
            },
            onUncheck:function (rowIndex,rowData) { 
            	thisObj. _onUncheckFunc(rowIndex, rowData);
            },
            onCheckAll:function (rows) { 
            	thisObj. _onCheckAllFunc(rows);
            },
            onUncheckAll:function (rows) { 
            	thisObj. _onUncheckAllFunc(rows);
            },
            onBeforeLoad: function(param) {
                thisObj._onBeforeLoadFunc(param);
            },
            onLoadSuccess: function(data) {
                thisObj._onLoadSuccessFunc(data);
            }
        });
    },

    /**
     * 向后台发送请求前的处理参数
     **/
    _onBeforeLoadFunc: function(param) {
         if (this.dataGridOptions.isQuery) {
            this._formalQuery();
        }
    },

    /**
	 * 点击查询处理方法
	 **/
    query: function() {
        /** 将页码设为默认1 **/
        var opts = this.dataGridObj.datagrid('options');
        var pager = this.dataGridObj.datagrid('getPager');
        opts.pageNumber = 1;
        pager.pagination('refresh', {
            pageNumber: 1
        });
        this._formalQuery();
    },
    /**
     * 正式获取查询条件
     **/
    _formalQuery: function() {
        /** 加载提示 **/
        $("#" + this.customOptions.tableID).parent().parent().addLoading({
            msg: '努力加载数据中，请稍后...'
        });
        /**取查询条件**/
        var qcInfo = this.getQueryCondition(); 
        /**取排序条件**/
        var sortInfo = this._getSortCondition();
        /**取分页信息**/
        var paginationInfo = this._getPaginationInfo();
        /** 请求数据 **/
        this._sendQueryRequest(qcInfo, sortInfo, paginationInfo);
    },
    /**
     * 根据页面是否显示分页设置分页信息
     **/
    _getPaginationInfo: function() {
        var paginationInfo = null;
        if (this.dataGridOptions.pagination == true) {
            paginationInfo = this.dataGridObj.datagrid('getPager').data("pagination").options;
        } else {
            /** 没有设置分页，则意味着获取所有数据 **/
            paginationInfo = new Object();
            paginationInfo.pageNumber = 1;
            if(this.dataGridOptions.pageSize == undefined||this.dataGridOptions.pageSize==0) {
            	paginationInfo.pageSize = 100000000;
            } else {
                paginationInfo.pageSize = this.dataGridOptions.pageSize;
            }
        }
        return paginationInfo;
    },
    /**
	 * 向后台请求获取数据
	 **/
    _sendQueryRequest: function(qcInfo, sortInfo, paginationInfo) {
        var thisObj = this;
        /** 请求普通列表数据 **/
        Ajax.service(this.customOptions.classID, this.customOptions.methodID, [paginationInfo.pageNumber, paginationInfo.pageSize, qcInfo, sortInfo],
        function(data) {
            thisObj._queryRequestSuccessFunc(data)
        },function(xmlHttpRequest, textStatus, errorThrown) {
        	thisObj._queryRequestFailureFunc(xmlHttpRequest, textStatus, errorThrown);
        });
    },
    /**
	 * 后台列表数据请求成功处理方法
	 **/
    _queryRequestSuccessFunc: function(result) {
    	if(result.rows==null) {
    		result.rows = [];
    	}
    
        /** 处理行号  **/
        if (this.dataGridOptions.rownumbers != undefined && this.dataGridOptions.rownumbers == true) {
            this.setRowNum(result.rows);
        }
        if (this.dataGridOptions.onBeforeLoadData != undefined) {
            this.dataGridOptions.onBeforeLoadData(result.rows);
        }
        var footArr = new Array();
        if (this.customOptions.total && result.totalRow != undefined) {
            var totalData = this.calculateTotalData(result.totalRow);
            footArr.push(totalData); 
        } 
        result.footer = footArr; 
        this.dataGridObj.datagrid('loadData', result);
        this.addNoRecordsTips();
        $("#" + this.customOptions.tableID).parent().parent().removeLoading();
    },
    /**
     * 为列表添加无记录提示语，当列表没记录时才会添加到页面上。该方法需要在datagrid绘制表格后调用
     */
    addNoRecordsTips:function(){
    	if (!this.dataGridObj.datagrid('getRows').length){
    		var opts = this.dataGridObj.datagrid('options');
    		if(opts.closeEmptyMsg && opts.closeEmptyMsg==true){
    			return;
    		}
    		var dgBody = this.dataGridObj.datagrid('getPanel').find('div.datagrid-body');
    		var msg = opts.emptyMsg || '没有找到相关记录!';
    		msg = '<p>' + msg + '</p>'
    		var d = $('<div class="datagrid-body-emptytips"></div>').html(msg).appendTo(dgBody);
    	}
    },
      /**
	 * 后台列表数据请求失败处理方法
	 **/
    _queryRequestFailureFunc: function(xmlHttpRequest, textStatus, errorThrown) {
    	var thisObj = this;
    	/** 当菜单点击过快，上次请求未发出就刷新页面会导致xmlHttpRequest.status=0（请求未初始化），这种情况不需要提示错误 **/
      	if(xmlHttpRequest.status!=0) {
       		$("#" + thisObj.customOptions.tableID).parent().parent().removeLoading();        	
 			top.layer.alert('获取数据出现问题了，赶紧联系管理员吧。',{closeBtn :2,icon:5});
      	}
    },
    /**
     * 根据cookie数据及最初始的columns数据，对字段进行排序及设置是否显示
     **/
    sortColumns: function(showFields,hideFields) {
        var sortcolumns = new Array();
        sortcolumns[0] = new Array();
        /** 没有cookie数据 **/
        if (showFields == undefined) {
            sortcolumns = this.customOptions.columns;
        } else {
            /** 复制最初始的columns数据 **/
            var originColumns = new Array();
            originColumns[0] = new Array();
            originColumns[0] = originColumns[0].concat(this.customOptions.columns[0]);

            /** 特殊处理行号和复选框 **/
            if (originColumns[0][0].field == 'ck') {
                originColumns[0][0].hidden = false;
                sortcolumns[0].push(originColumns[0][0]);
                originColumns[0].splice(0, 1);
            }
            if (originColumns[0][0].field == 'rn') {
                originColumns[0][0].hidden = false;
                sortcolumns[0].push(originColumns[0][0]);
                originColumns[0].splice(0, 1);
            }
            if (originColumns[0][0].field == 'option') {
                originColumns[0][0].hidden = false;
                sortcolumns[0].push(originColumns[0][0]);
                originColumns[0].splice(0, 1);
            }
            /** 遍历显示的字段cookie数据，取得这些字段信息，设置为显示，并按顺序存放**/
            var showFieldArr = showFields.split(',');
            for (var i = 0; i < showFieldArr.length; i++) {
                for (var j = 0; j < originColumns[0].length; j++) {
                    if (originColumns[0][j].field == showFieldArr[i]) {
                        originColumns[0][j].hidden = false;
                        sortcolumns[0].push(originColumns[0][j]);
                        originColumns[0].splice(j, 1);
                        break;
                    }
                }
            }
            
            /** 不属于显示字段cookie数据的字段,且存在于隐藏字段cookie中的字段，均设置为隐藏 。
             不属于隐藏字段cookie的字段（如列表后来新增字段）则按新增字段的设置，不作更改**/
            if(hideFields) {
            	var hideFieldArr = hideFields.split(',');
            	for (var i = 0; i < hideFieldArr.length; i++) {
            		for (var j = 0; j < originColumns[0].length; j++) {
            			if (originColumns[0][j].field == hideFieldArr[i]) {
            				originColumns[0][j].hidden = true;
            			}
            		}
            	}
            }
            
            //合并隐藏的数组字段 
            sortcolumns[0] = sortcolumns[0].concat(originColumns[0]);
        }  
        return sortcolumns;
    },
    /**
	 * 获取查询条件对象集合
	 **/
    getQueryCondition: function() {
        var queryInfo = new Array();

        /** 获取权限相关的查询条件 **/
        var authQueryInfo = this._getAuthQueryCondition();
        if (authQueryInfo != null && authQueryInfo != []) {
            queryInfo = queryInfo.concat(authQueryInfo);
        }

        /** 获取自定义查询条件 **/
        var customQueryInfo = this._getCustomQueryCondition();
        if (customQueryInfo != null && customQueryInfo != []) {
            queryInfo = queryInfo.concat(customQueryInfo);
        }

        /** 获取基本查询区域查询条件 **/
        var baseQueryInfo = this._getBaseQueryCondition();
        if (baseQueryInfo != null && baseQueryInfo != []) {
            queryInfo = queryInfo.concat(baseQueryInfo);
        }

        /** 获取高级查询区域查询条件 **/
        var seniorQueryInfo = this._getSeniorQueryCondition();
        if (seniorQueryInfo != null && seniorQueryInfo != []) {
            queryInfo = queryInfo.concat(seniorQueryInfo);
        }
        return queryInfo;
    },
    /**
     *  获取权限相关的查询条件
     **/
    _getAuthQueryCondition: function() {
        var authQueryInfo = new Array();
        if (this.customOptions.orgField) {
            var orgQC = new Object();
            orgQC.fn = this.customOptions.orgField;
            orgQC.oper = ARY_STR_LIKE[0];
            orgQC.value1 = top.strFilterOrgCode + "%";
            authQueryInfo.push(orgQC);
        }
        return authQueryInfo;
    },
    /**
     *  获取基本查询区域查询条件
     **/
    _getBaseQueryCondition: function() {
        var qcObjArr = $('#' + this.customOptions.baseQueryDivID + " [qc]");
        var baseQueryInfo = this._packageQueryConditions(qcObjArr);
        return baseQueryInfo;
    },
    /**
     *  获取高级查询区域查询条件
     **/
    _getSeniorQueryCondition: function() {
        var qcObjArr = $('#' + this.customOptions.seniorQueryDivID + " [qc]");
        var seniorQueryInfo = this._packageQueryConditions(qcObjArr);
        return seniorQueryInfo;
    },
    /**
     * 根据qc属性对应的jq对象集合，获取打包这些集合所对应的查询对象集合
     **/
    _packageQueryConditions: function(qcObjArr) {
        if (qcObjArr == null || qcObjArr == []) {
            return null;
        }
        var queryInfoArr = new Array();
        var objArrLen = qcObjArr.size();
        var queryCondition = null;
        for (var i = 0; i < objArrLen; i++) {
            queryCondition = this._packageQueryCondition(qcObjArr.eq(i));
            if (queryCondition != null) {
            	if(queryCondition instanceof  Array) { alert('sdf');
            		queryInfoArr = queryInfoArr.concat(queryCondition);
            	} else {
            		queryInfoArr.push(queryCondition);
            	}
            }
        }
        return queryInfoArr;
    },
    /**
     * 根据qc属性对应的jq对象，封装打包对象对应的查询对象
     **/
    _packageQueryCondition: function(eleObj) {
        var qcAttr = eleObj.attr('qc');
        var qcObj = null;
        try {
            qcObj = eval("(" + qcAttr + ")");
        } catch(e) {
         	top.layer.alert('qc属性配置有误，无法转换为json对象。配置：'+qcAttr,{closeBtn :2,icon:7});
            return;
        }
        /**包含js属性，则意味着自定义方法返回此组件的查询条件**/
        if (qcObj.hasOwnProperty('js')) {
            var jsFunc = eval(qcObj.js);
            qcObj = jsFunc();
        } else {
            var value = this._getQueryValue(eleObj, qcObj);
            if (value == null) {
                qcObj = null;
            } else {
                qcObj.value1 = value;
            }
        }
        return qcObj;
    },
    /**
      * 获取查询值
      **/
    _getQueryValue: function(eleObj, qcObj) {
        /** 有value1属性，则实际查询值就是value1，否则获取组件值，并根据oper获取查询洗值 **/
        if (qcObj.hasOwnProperty('value1')) {
            realQueryValue = qcObj.value1;
        } else {
            realQueryValue = this._getQueryComponentValue(eleObj, qcObj);
        }
        return realQueryValue;
    },

    /**
     * 根据组件对象，通过样式判断组件的类型，从而获取组件值。并根据操作符类型对组件值做处理
     **/
    _getQueryComponentValue: function(eleObj, qcObj) {
        var value = '';
        var className = $(eleObj).attr('class');
        /** easyui下拉**/
        if (className != undefined && className.indexOf('combobox-f') != -1) {
            var valueArr = $(eleObj).combobox('getValues');
            if (valueArr.length == 0 || valueArr[0].replace(' ','')  == '' || valueArr[0].indexOf('全部') != -1 || valueArr[0] == $(eleObj).attr('placeholder')) {
                value = null;
            } else {
                if (qcObj.oper == ARY_STR_INCLUDE[0] || qcObj.oper == ARY_STR_NOTINCLUDE[0] || qcObj.oper == ARY_STR_LIKE_OR[0]) {
                    var addStr = '';
                    if (qcObj.oper == ARY_STR_LIKE_OR[0]) {
                        addStr = '%';
                    }
                    for (var i = 0; i < valueArr.length; i++) {
                        value += "," + valueArr[i] + addStr;
                    }
                    if (value.length > 0) {
                        value = value.substring(1);
                    }
                } else if (qcObj.oper == ARY_STR_LIKE[0]) {
                    value = '%' + valueArr[0] + '%';
                } else {
                    value = valueArr[0];
                }
            }
        }
        /** eayui日期 **/
        else if (className != undefined && className.indexOf('datebox-f') != -1) {
            value = $(eleObj).datebox('getValue');
            if (value == undefined || value == '' || value == $(eleObj).attr('placeholder')) {
                value = null;
            } else {
                /** 通过长度判断是否包含时分秒，小于等于加上24:00:00,这样查出来的数据才准确 **/
                if (qcObj.oper == ARY_STR_LESS_EQUAL[0] && value.length < 11) {
                    value += ' 24:00:00';
                }
            }
        }
        /** easyui数值 **/
        else if (className != undefined && className.indexOf('numberbox-f') != -1) {
            value = $(eleObj).numberbox('getValue');
            if (value == '' || value == $(eleObj).attr('placeholder')) {
                value = null;
            }
        }
        /** 文本或树 **/
        else {
            var nextNode = $(eleObj).next('');
            var nextClassName = nextNode.attr('class');
            if (nextClassName != undefined && nextClassName.indexOf('searchbox') != -1) {
                value = $(eleObj).attr('treevalue');  
            } else {
                value = $(eleObj).val();
            }
            if (value == undefined || value == '' || value == $(eleObj).attr('placeholder')) {
                value = null;
            } else {
                if (qcObj.oper == ARY_STR_LIKE[0] || qcObj.oper == ARY_STR_NOTLIKE) {
                	/** 判断是否包含特殊需转义字符 **/
                	if(!this.judgeContainEscapeChar(value) ) {
                		value = "%" + value + "%";
                	} else {
                	    value = "%" + this._dealEscapeChar(value) + "%";
                	}
                } else if (qcObj.oper == ARY_STR_INCLUDE[0] || qcObj.oper == ARY_STR_NOTINCLUDE[0] || qcObj.oper == ARY_STR_LIKE_OR[0]) {
                    var valueArr = value.split(',');
                    value = '';
                    var addStr = '';
                    if (qcObj.oper == ARY_STR_LIKE_OR[0]) {
                        addStr = '%';
                    }
                    for (var i = 0; i < valueArr.length; i++) {
                        value += "," + valueArr[i] + addStr;
                    }
                    if (value.length > 0) {
                        value = value.substring(1);
                    }
                }
            }
        }
        return value;
    },
    /**
     * 判断文本输入框输入内容是否包含特殊需转义字符,如：%或&或_或/
     * @return false:不包含 true:包含
     **/
    judgeContainEscapeChar:function(value) {
    	var return_flag = false;
    	if(value.indexOf('%')!=-1||value.indexOf('_')!=-1||value.indexOf('&')!=-1||value.indexOf('/')!=-1) {
    		return_flag = true;
     	}
     	return return_flag;
    },
    /**
     * 当文本输入框输入内容包含特殊字符，将文本内容转换为符合sql转义的语句。即在每个特殊字符前添加转义字符'/',后台会为每个like添加 escape '/'
     **/
    _dealEscapeChar:function(value) {
    	 if(value.indexOf('/')!=-1) {
    	 	value = value.replace(/\//g,"\/\/");
    	 }
    	 if(value.indexOf('%')!=-1){
    	 	value = value.replace(/%/g,"/%");
    	 }
    	 if(value.indexOf('_')!=-1) {
    	 	value = value.replace(/_/g,"/_");
    	 }
    	 if(value.indexOf('&')!=-1) {
    	 	value = value.replace(/&/g,"/&");
    	 }
    	 return value;
    },
    /**
      * 获取自定义查询条件
      * @return 自定义查询条件集合
      **/
    _getCustomQueryCondition: function() {
        var customQueryInfo = new Array();
        if (this.customOptions.customQCFunc != undefined && this.customOptions.customQCFunc != null) {
            var tempInfo = this.customOptions.customQCFunc();
            if (tempInfo != null && tempInfo != []) {
                customQueryInfo = customQueryInfo.concat(tempInfo);
            }
        }
        return customQueryInfo;
    },
    /**
	 * 获取排序条件
	 **/
    _getSortCondition: function() {
        var return_sortSql = "";
        if(this.customOptions['customSortSqlFunc']!=undefined && this.customOptions['customSortSqlFunc']!=null){
        	var sortSqlTemp = this.customOptions['customSortSqlFunc']();
        	if(sortSqlTemp!=undefined && sortSqlTemp!=null && sortSqlTemp.length>0){
        		return_sortSql = ' ' + sortSqlTemp;
        	}else{
        		return_sortSql = ' ' + this.customOptions.sortInfo.sortSql;
        	}
        }else{
       		/** 下面的写法不会对sortSql和sortPK是否为空进行判断，这样做可以保证若忘记书写时后台查询会出错，从而提醒必须填写排序**/
        	return_sortSql = ' ' + this.customOptions.sortInfo.sortSql;
        }
        return_sortSql += ' ,' + this.customOptions.sortInfo.sortPK + ' Desc ';
        return return_sortSql;
    },
    /**
	 * 数据成功加到datagrid后触发的处理方法
	 **/
    _onLoadSuccessFunc: function(data) {
        /** 小计行的处理不放在合计行哪里是考虑到 有些列表是通过手动loaddata的，不是通过datagrid的查询获取数据 **/
        if (this.customOptions.subtotal) {
        	this.drawSubTotal();
        }
        this.checkedRow(this.customOptions.selectedRowData);
        if (this.dataGridOptions.onLoadSuccess != undefined) {
            this.dataGridOptions.onLoadSuccess(data);
        }
    },
    /**
	 * 行单击处理方法
	 **/
    _rowClickFunc: function(rowIndex, rowData) {
    	this._dealMultiPageSelect(rowIndex, rowData);
        if (this.dataGridOptions.onClickRow != undefined) {
            this.dataGridOptions.onClickRow(rowIndex, rowData);
        }
    },
    /**
	 * 行双击处理方法
	 **/
    _rowDBClickFunc: function(rowIndex, rowData) {
        if (this.dataGridOptions.onDblClickRow != undefined) {
            this.dataGridOptions.onDblClickRow(rowIndex, rowData);
        }
    },
     /**
	 * 勾选一行的时候触发
	 **/
    _onCheckFunc: function(rowIndex, rowData) {
        if (this.dataGridOptions.onCheck != undefined) {
            this.dataGridOptions.onCheck(rowIndex, rowData);
        }
    },
     /**
	 * 取消勾选一行的时候触发
	 **/
    _onUncheckFunc: function(rowIndex, rowData) {
        if (this.dataGridOptions.onUncheck != undefined) {
            this.dataGridOptions.onUncheck(rowIndex, rowData);
        }
    },
    /**
	 * 勾选所有行的时候触发
	 **/
    _onCheckAllFunc: function(rows) {
        if (this.dataGridOptions.onCheckAll != undefined) {
            this.dataGridOptions.onCheckAll(rows);
        }
    },
    /**
	 * 取消勾选所有行的时候触发
	 **/
    _onUncheckAllFunc: function(rows) {
        if (this.dataGridOptions.onUncheckAll != undefined) {
            this.dataGridOptions.onUncheckAll(rows);
        }
    },
    _dealMultiPageSelect:function(rowIndex, rowData) {
    	
    },
    /**
     *处理计算合计行数据
     **/
    calculateTotalData: function(data) {
        if (data == undefined || data == null) {
            return null;
        }
        /**获取封装需要合计的字段**/
        var sumFieldArr = this._getSumFields();
        var sumFieldArrLen = sumFieldArr.length;
        /** 遍历合计数据的属性，非数值属性更改显示值**/
        var numFlag = false;
        for (var p in data) {
            numFlag = false;
            for (var j = 0; j < sumFieldArrLen; j++) {
                if (sumFieldArr[j] == p) {
                    numFlag = true;
                    break;
                }
                if (!numFlag) {
                    data[p] = '--';
                }
            }
        }
        /**添加合计计等提示 **/
        data.ck = '--';
        data.option = '--';
        data.rn = '合计';
        return data;
    },
    drawSubTotal:function() {
    	var data = this.dataGridObj.datagrid('getData');
		var footData = this.calculateSubTotalData(data.rows); 
		var footArr = this.dataGridObj.datagrid('getData').footer;
		if (footArr == undefined || footArr.length == 0) {
			footArr = new Array();
         	footArr[0] = footData;
		} else if (footArr[0].rn == '小计') {
			footArr[0] = footData;
		} else if (footArr[0].rn == '总计') {
			footArr.unshift(footData);
		}
		data.footer = footArr;
		this.dataGridObj.datagrid('reloadFooter', footArr);
    },
    /**
	 * 处理计算数据并返回小计行数据,合计数值字段
	 * @return 返回小计行的数据对象
	 **/ 
    calculateSubTotalData: function(data) { 
        if (data == null || data == undefined) {
            return null;
        }  

        /**获取封装需要小计的字段,并初始化一个大小相同的数组，用于各个字段的合计值**/
        var sumFieldArr = this._getSumFields();
        var sumFieldSumValueArr = new Array(sumFieldArr.length);
        for (var i = 0; i < sumFieldSumValueArr.length; i++) {
            sumFieldSumValueArr[i] = 0;
        }

        /** 合计需要小计的字段 **/
        var sumFieldArrLen = sumFieldArr.length;
        var dataLen = data.length;
        for (var i = 0; i < dataLen; i++) {
            for (var j = 0; j < sumFieldArrLen; j++) {
                if (!isNaN(data[i][sumFieldArr[j]])) {
                    sumFieldSumValueArr[j] += unformatMoney(data[i][sumFieldArr[j]]);
                }
            }
        }

        /**复制一行空数据，并遍历属性赋值**/
        var numFlag = false;
        var firstObj = this._createNullBean();
        var sumFieldSumValueArrLen = sumFieldSumValueArr.length;
        for (var p in firstObj) {
            numFlag = false;
            for (var j = 0; j < sumFieldSumValueArrLen; j++) {
                if (sumFieldArr[j] == p) {
                    firstObj[p] = Math.round(sumFieldSumValueArr[j]*100)/100;
                    numFlag = true;
                    break;
                }
            }
            if (!numFlag) {
                firstObj[p] = '--';
            }
        }
        /**添加小计等提示 **/
        firstObj.ck = '--';
        firstObj.option = '--';
        firstObj.rn = '小计';
        
        return firstObj;
    },
    
     /**
     * 创建一个空对象,属性包含所有列表字段
     * @return 包含所有字段的对象，属性值为null
     **/
    _createNullBean: function() {
    	var bean = {};
        var columnsLen = this.customOptions.columns[0].length;
         for (var i = 0; i < columnsLen; i++) {
            bean[this.customOptions.columns[0][i].field] = null;
        }
        return bean;
    },
    /**
     * 取得当前表格所有的合计字段，并以数组封装返回
     * @return 所有合计字段数组
     **/
    _getSumFields: function() {
        var columnsLen = this.customOptions.columns[0].length;
        var sumFieldArr = new Array();
        for (var i = 0; i < columnsLen; i++) {
            if (this.customOptions.columns[0][i].sum !== undefined && this.customOptions.columns[0][i].sum == true) {
                sumFieldArr.push(this.customOptions.columns[0][i].field);
            }
        }
        return sumFieldArr;
    },
    /**
     * 取得当前表格显示的字段数组，每个字段包含字段名（value)和中文名（text)
     * @return 显示字段拼接字符串
     **/
    _getOutputFieldArr: function() {
        var showColumnData = this._getDefaultColumnInfoByHiddenType(false);
        return showColumnData;
    },
    /**
     * 取得当前表格显示的字段中的合计的字段,并拼接为以','分割的字符串
     * @return 合计字段拼接字符串
     **/
    _getOutputSumFields: function(outputFieldArr) {
        var outputSumFields = '';
        var sumFieldArr = this._getSumFields();
        var outputFieldArrLen = outputFieldArr.length;
        var sumFieldArrLen = sumFieldArr.length;
        for (var i = 0; i < sumFieldArrLen; i++) {
            for (var j = 0; j < outputFieldArrLen; j++) {
                if (sumFieldArr[i] == outputFieldArr[j][0]) {
                    outputSumFields += ',' + sumFieldArr[i];
                    break;
                }
            }
        }
        if (outputSumFields.length > 0) {
            outputSumFields = outputSumFields.substring(1);
        }
        return outputSumFields;
    },
    /**
     * 遍历传递的列表行数据集合，重新设置每行的行数rn字段
     * @param data 列表行数据数组
     *
     **/
    setRowNum: function(data) {
        if (data == null || data == undefined) {
            return;
        }

        var startNum = 1;
        if (this.dataGridOptions.rniscontinuou != undefined && this.dataGridOptions.rniscontinuou == true && this.dataGridOptions.pagination == true) {
            var paginationInfo = this.dataGridObj.datagrid('getPager').data("pagination").options;
            startNum = ((paginationInfo.pageNumber - 1) < 0 ? 0 : (paginationInfo.pageNumber - 1)) * paginationInfo.pageSize + 1;
        }
        var rowLen = data.length;
        for (var i = 0; i < rowLen; i++) {
            data[i].rn = i + startNum;
        }
    },

    /**
     * 取得列表选中的数据,不区分单选多选
     * @return 选中的数据数组,格式为每行数据的集合对象.没有选中任何数据时返回一个空数组
     **/
    getSelectedData: function() {
        var selectedData = this.dataGridObj.datagrid('getChecked');
        return selectedData;
    },
    /**
     * 取得选中数据，并以数组形式返回idField数据
     * @return 选中的数据数组,格式为每行数据的idField值.没有选中任何数据时返回一个空数组
     **/
    getSelectedDataPKArr: function() {
    	var return_idfieldArr = new Array();
        var selectedData = this.dataGridObj.datagrid('getChecked');
        var selectedDataLen = selectedData.length;
        for(var i=0;i<selectedDataLen;i++) {
        	return_idfieldArr.push(selectedData[i][this.customOptions.sortInfo.sortPK]);
        }
        return return_idfieldArr;
    },
    
    /**
     * 过滤表格属性：rn ck option
     * 该方法自动获取表格选中项，并自动过滤以上属性，不需要返回对象就可以使用过滤后的表格对象
     * 调用方式datagrid.filterFieldObj();
     **/
    filterFieldObj: function() {
        var data = this.dataGridObj.datagrid('getData').rows;
		this.getSelectedFilterObj(data);
//        return data;
    },
    /**
     * data		需要过滤的数组对象
     * 过滤表格属性：rn ck option
     * @return 获取参数中过滤后的对象.没有选中任何数据时返回一个空数组
     **/
    getSelectedFilterObj: function(data) {

        $.each(data,
        function(index, value) {
            if (data[index].rn != undefined) {
                delete data[index].rn;
            }
            if (data[index].ck != undefined) {
                delete data[index].ck;
            }
            if (data[index].option != undefined) {
                delete data[index].option;
            }
        })

        return data;
    },

    /**
     * 设置表格某些行选中
     * @param 需要选中的行数据数组,取每行customOptions.sortInfo.sortPK字段的值，如sortPK为userAccount,则['用户账号1','用户账号2']
     **/
    checkedRow: function(selectedRowData) {
        //取消所有选中
        this.dataGridObj.datagrid('clearChecked');
        this.dataGridObj.datagrid('uncheckAll');

        if (selectedRowData == undefined || selectedRowData == null) {
            return;
        }
        if (this.dataGridOptions.checkbox == undefined || this.dataGridOptions.checkbox == false) {
            return;
        }
        //遍历列表数据，选中相应的行
        var rows = this.dataGridObj.datagrid("getData").rows;
        var selectedRowDataLen = selectedRowData.length;
        var rowsLen = rows.length;
        for (var i = 0; i < selectedRowDataLen; i++) {
            for (var j = 0; j < rowsLen; j++) {
                if (rows[j][this.customOptions.sortInfo.sortPK] == selectedRowData[i]) {
                    var index = this.dataGridObj.datagrid("getRowIndex", rows[j][this.customOptions.sortInfo.sortPK]);
                    this.dataGridObj.datagrid("checkRow", index);
                }
            }
        }

    },
    //////////////////列选相关////////////////
    /**
     * 列选入口方法，列表需要列选时调用此方法即可。如:datagrid.showSelectListItem()
     **/
    showSelectListItem: function() {
        var sl_windowHtml = "<div id='slid_div_windowmain' ><div style='margin-top:15px;width:100%;heigth:100%;' id='slid_div_content'><table style='width:100%;heigth:100%'><tr style='height:30px;font-weight:bold'><td style='text-align:center;'><span style='font-size:16px'>隐藏字段</span></td><td></td><td style='text-align:center'><span style='font-size:16px'>显示字段</span></td></tr><tr> <td style='padding-left:35px' ><ul sytle='font-size:12px' id='slid_hidelistitem'></ul> </td><td><div style='width:20px'class='zhong clr fl'>  <a href='#' id='slid_btn_rightall'>&gt;&gt;</a> <a href='#' id='slid_btn_right'>&gt;</a><a href='#' id='slid_btn_left' >&lt;</a><a  href='#' id='slid_btn_leftall'>&lt;&lt;</a><a href='#' id='slid_btn_up'>▲</a><a href='#' id='slid_btn_down'>▼</a><div></td><td style='padding-left:35px'><ul id='slid_showlistitem'></ul></td></tr></table></div><div id='slid_div_bottbtn' class='center' style='text-align:center;padding-top:25px' ><span><input id='slid_ck_save' type='checkbox' checked='checked' ><label for='slid_ck_save'>保存设置</label></span><input type='button'  id='slid_btn_sure' value='保存' class='bt_ensure'><input type='button' id='slid_btn_reset' value='重置' class='bt_cancel'><input type='button' value='取消' id='slid_btn_cancel' class='bt_cancel'></div></div>";
        if (top.$("#slid_div_windowmain").length != 0) {
            top.$("#slid_div_windowmain").remove();
        }
        top.$("body").append(sl_windowHtml);
        this._addListItem();
        this._initSLFunc();
        this._initLSLWindow();
    },
    /**
     * 设置列选组件绑定的方法
     **/
    _initSLFunc: function() {
        var thisObj = this;
        top.$("#slid_btn_reset").click(function() {
            thisObj._setDefaultListItem();
        });
        top.$("#slid_btn_sure").click(function() {
            thisObj._refreshListItem();
        });
        top.$("#slid_btn_cancel").click(function() {
            thisObj._lsWindowClose();
        });

        top.$("#slid_btn_rightall").click(function() {
            thisObj._rightAll();
        });
        top.$("#slid_btn_right").click(function() {
            thisObj._right();
        });
        top.$("#slid_btn_leftall").click(function() {
            thisObj._leftAll();
        });
        top.$("#slid_btn_left").click(function() {
            thisObj._left();
        });
        top.$("#slid_btn_up").click(function() {
            thisObj.upOneListItem();
        });
        top.$("#slid_btn_down").click(function() {
            thisObj.downOneListItem();
        });
        top.$('#slid_hidelistitem').dblclick(function(event){
        	thisObj.hideAreaDBClick(event);
 		});
 		top.$('#slid_showlistitem').dblclick(function(event){
        	thisObj.showAreaDBClick(event);
 		});
 		top.$('#slid_hidelistitem').bind('selectstart',function(){return false;});
 		top.$('#slid_showlistitem').bind('selectstart',function(){return false;});
    },
    /**
     * 初始化列选window
     **/
    _initLSLWindow: function() {
        this.lsWindow = top.layer.open({
            type: 1,
            title: "请选择列表字段",
            area: ['600px', '500px'],
            shift: 1,
            closeBtn: 2,
            shadeClose:true,
            content: top.$('#slid_div_windowmain')
        });
    },
    /**
	 * 字段项目右移
	 **/
    _right: function() {
        var hideBox = top.$('#slid_hidelistitem').listbox();
        var items = hideBox.getSelected();
        hideBox.removeRange(items);
        top.$('#slid_showlistitem').listbox().addRange(items);
    },
    /**
	 * 字段项目全部右移
	 **/
    _rightAll: function() {
        var hideBox = top.$('#slid_hidelistitem').listbox();
        var items = hideBox.getDatas();
        hideBox.clearDisplay();
        hideBox.clearData();
        top.$('#slid_showlistitem').listbox().addRange(items);

    },
    /**
	 * 字段项目左移
	 **/
    _left: function() {
        var showBox = top.$('#slid_showlistitem').listbox();
        var items = showBox.getSelected();
        showBox.removeRange(items);
        top.$('#slid_hidelistitem').listbox().addRange(items);

    },
    /**
	 * 字段项目全部左移
	 **/
    _leftAll: function() {
        var showBox = top.$('#slid_showlistitem').listbox();
        var items = showBox.getDatas();
        showBox.clearDisplay();
        showBox.clearData();
        top.$('#slid_hidelistitem').listbox().addRange(items);

    },
    /**
     * 字段项目上移
     **/
    upOneListItem: function() {
        var showBox = top.$('#slid_showlistitem').listbox();
        var items = showBox.getSelected();
        showBox.upRange(items);
    },
    /**
    * 字段项目下移
    **/
    downOneListItem: function() {
        var showBox = top.$('#slid_showlistitem').listbox();
        var items = showBox.getSelected();
        showBox.downRange(items);
    },
    /**
    * 隐藏字段区域的双击事件处理方法
    **/
    hideAreaDBClick: function(event) {
        var id = event.target.id; 
        var hideBox = top.$('#slid_hidelistitem').listbox();
        var items = hideBox.getDataByID(id);
        hideBox.removeRange(items);
        top.$('#slid_showlistitem').listbox().addRange(items);
    },
    /**
    * 显示字段区域的双击事件处理方法
    **/
    showAreaDBClick: function(event) {
    	event.stopPropagation();
        var id = event.target.id;
        var showBox = top.$('#slid_showlistitem').listbox();
        var items = showBox.getDataByID(id);
        showBox.removeRange(items);
        top.$('#slid_hidelistitem').listbox().addRange(items);
    },
    /**
    * 字段项目下移
    **/
    downOneListItem: function() {
        var showBox = top.$('#slid_showlistitem').listbox();
        var items = showBox.getSelected();
        showBox.downRange(items);
    },
    /**
     * 重置列选显示
     **/
    _setDefaultListItem: function() {
        var hideData = this._getDefaultColumnInfoByHiddenType(true);
        var showData = this._getDefaultColumnInfoByHiddenType(false);
        top.$('#slid_hidelistitem').listbox().reload({
            data: hideData
        });
        top.$('#slid_showlistitem').listbox().reload({
            data: showData
        });
    },
    /**
     * 关闭选择窗口的处理
     **/
    _lsWindowClose: function() {
        top.layer.close(this.lsWindow);
        top.$('#slid_div_windowmain').remove();

    },
    /**
	 * 根据cookies信息，columns信息得到显示和隐藏的字段，并绘画
	 **/
    _addListItem: function() {
    	/** 取得此页面列表显示字段的cookie数据 **/
        var hideData = this._getDefaultColumnInfoByHiddenType(true);
        var showData = this._getDefaultColumnInfoByHiddenType(false);
         this._drawSelectListBox(hideData, showData);
    },
    
	/**
	 * 列选页面保存按钮处理方法，有如下几步处理
	 * 1、取得列选页面的隐藏和显示字段，分别保存到cookie中。
	 *　隐藏和显示字段均保存到cookie中，是考虑到若以后列表添加新字段，则cookie中显示的字段在列表显示，隐藏的在列表隐藏。而新增的按新增的设置显示。
	 * 2、调用重新绘画列表方法重绘列表。
	 * 
	 **/
    _refreshListItem: function() { 
        /** 取得显示字段**/
        var showListItemData = top.$('#slid_showlistitem').listbox('getDatas');
        var hideListItemData = top.$('#slid_hidelistitem').listbox('getDatas');
        var isSave = top.$('#slid_ck_save').attr('checked');
        var showFieldsStr = "";
        var hideFieldsStr = "";
        var showListItemDataLen = showListItemData.length;
        for (i = 0; i < showListItemDataLen; i++) {
       		showFieldsStr += "," + showListItemData[i].value;
       	}
       	if (showFieldsStr.length > 0) {
        	showFieldsStr = showFieldsStr.substring(1);
  		}
  		var hideListItemDataLen = hideListItemData.length;
  		for (i = 0; i < hideListItemDataLen; i++) {
       		hideFieldsStr += "," + hideListItemData[i].value;
       	}
       	if (hideFieldsStr.length > 0) {
        	 hideFieldsStr = hideFieldsStr.substring(1);
  		}
        /** 保存设置 **/
        if (isSave != undefined && isSave == 'checked') {
            /** 删除原来的此页面的cookie **/
            if ($.cookie(this.pageName + '_showListItem') != null) {
                $.removeCookie(this.pageName + '_showListItem');
            }
            if ($.cookie(this.pageName + '_hideListItem') != null) {
                $.removeCookie(this.pageName + '_hideListItem');
            }
            $.cookie(this.pageName + "_showListItem", showFieldsStr);
            $.cookie(this.pageName + "_hideListItem", hideFieldsStr);
        }
        this._lsWindowClose();
        this.showColumns(showFieldsStr,hideFieldsStr);
    },
    /**
     * 显示指定的列（按字段顺序），非指定的列将被隐藏,不会重新获取数据
     * @param showFieldsStr 指定的显示的列字段名，以','分隔
     **/
    showColumns:function(showFieldsStr,hideFieldsStr) {
    	/** 为了解决重新绘画列表时页面的卡慢，导致等待提示不出现或列选页面不关闭的问题
    		将在加载提示成功后再运行重绘代码，添加延时代码是为了尽量保证加载提示已经出现,以提高用户体验
    	**/
    	var thisObj = this;
     	$("#" + this.customOptions.tableID).parent().parent().addLoading({
            msg: '正在重新绘画列表，请稍后...',successcallback:function() {
            	//获得排序后的字段
        		setTimeout(function () {
					//获得排序后的字段
        			var sortColumns = thisObj.sortColumns(showFieldsStr,hideFieldsStr);
        			thisObj.dataGridObj.datagrid('options').columns  = sortColumns;
        			thisObj.dataGridObj.datagrid('reDraw' );
        			thisObj.dataGridObj.datagrid('loadData', thisObj.dataGridObj.datagrid('getData'));
        			$("#" + thisObj.customOptions.tableID).parent().parent().removeLoading();
				}, 150);
            }
        });
    },
    /**
     * 根据显示字段信息，重新设置列表的显示字段和隐藏字段。凡不属于隐藏字段的均显示，其他隐藏
     * todo 优化速度 根据现有列表字段设置显示不显示字段
     **/
    dealTableDisplay: function(showData) {
        showData = ',' + showData + ',';
        var columnsLen = this.customOptions.columns[0].length;
        for (var i = 0; i < columnsLen; i++) {
            if (showData.indexOf(',' + this.customOptions.columns[0][i].field + ',') == -1) {
                this.dataGridObj.datagrid('hideColumn', this.customOptions.columns[0][i].field)
            } else {
                this.dataGridObj.datagrid('showColumn', this.customOptions.columns[0][i].field)
            }
        }
    },

    /**
     * 根据类型取得customOptions.columns中hidden对应状态的字段信息
     * @param type，false:取显示的字段，true：取隐藏字段
     * @return 数组
     **/
    _getDefaultColumnInfoByHiddenType: function(type) {
        var return_arr = new Array();
        /** 获取列表的字段，而不使用customOptions中的字段信息，主要是为了顺序考虑 **/
        var columns = this.dataGridObj.datagrid('options').columns[0];
        var columnsLen = columns.length;
        for (var i = 0; i < columnsLen; i++) {
            if (type == true ? (columns[i].hidden != undefined && (columns[i].hidden == true )) : (columns[i].hidden == undefined || columns[i].hidden == false || columns[i].hidden == 'false')) {
                if (columns[i].field != 'ck' && columns[i].field != 'rn' && columns[i].field != 'option') {
                    return_arr.push({
                        value: columns[i].field,
                        text: columns[i].title,
                        align:columns[i].align,
                        width:columns[i].width,
                        fmType:columns[i].fmType
                    });
                }
            }
        }
   		return return_arr;
    },
    /**
     * 绘画listbox
     **/
    _drawSelectListBox: function(hideData, showData) {
        top.$('#slid_hidelistitem').listbox({
            data: hideData,
            height: 350,
            width: 200,
            dndscope: 'demo',
            dnd: true
        });

        top.$('#slid_showlistitem').listbox({
            data: showData,
            height: 350,
            width: 200,
            dndscope: 'demo',
            dnd: true
        });
    },
    //////////////////导出相关////////////////
    /**
     * 列表导出方法入口，列表需要导出时调用此方法即可。如:datagrid.showExport()
     **/
    showExport: function() {
        var ex_windowHtml = "<div id='exid_div_windowmain' ><div style='margin-top:15px;width:100%;heigth:100%;' id='exid_div_content'> <input id='exid_button_curpage'  class='bt_ensure'  style='height:30px;width:100px;float:left;margin-left:30px;margin-top:20px' type='button' value='本页' /><span style='position:absolute;left:15px;top:85px;font-size:12px; color: #a2a2a2;'>导出查询结果中当前的</br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp分页记录</span><hr style='border:0;background-color:#1fb5ad;width:1px;height:90px;float:left;margin-left:20px;margin-right:20px;'></hr><input  id='exid_button_alldata'  style='background:#1C9189;width:100px;float:left;margin-right:20px;margin-top:20px;height:30px;'  class='bt_ensure' type='button' value='全部' /><span style='position:absolute;left:165px;top:85px;font-size:12px; color: #a2a2a2;'>导出查询结果中所有的</br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp分页记录</span></br> </div> </div>";
        if (top.$("#exid_div_windowmain").length != 0) {
        	top.$("#exid_div_windowmain").remove();
        }
        top.$("body").append(ex_windowHtml);
        this._initEXFunc();
        this._initEXLWindow();
    }, 
    /**
     * 设置列选组件绑定的方法
     **/
    _initEXFunc: function() {
        var thisObj = this;
        top.$("#exid_button_curpage").click(function() {
            thisObj._exportCurPage();
        });
        top.$("#exid_button_alldata").click(function() {
            thisObj._exportAllData();
        });
    },
    /**
     * 初始化列选window
     **/
    _initEXLWindow: function() {
        this.exWindow = top.layer.open({
            type: 1,
            title: "请选择导出类型",
            area: ['300px', '170px'],
            shift: 1,
            closeBtn: 2,
            shadeClose:true,
            content: top.$('#exid_div_windowmain')
        });
    },
    _exportCurPage: function() {
        var outputType = 'CURPAGE';
        this._export(outputType);
    },
    _exportAllData: function() {
        var outputType = 'ALLDATA';
        this._export(outputType);
    },
    _export:function(outputType) {
    	if(this._checkBeforExport()) {
    		this._sendExportRequest(outputType);
    	} 
    },
    /**
     * 导出前检查
     * @return true:检查通过 false：不通过
     **/
    _checkBeforExport:function() {
    	var checkFlag = true;
     	/**取列表输出字段 **/
        var outputFieldArr = this._getOutputFieldArr();
        if(outputFieldArr==null||outputFieldArr.length==0) {
        	top.layer.close(this.exWindow);
    		this.showSelectListItem();
    		top.layer.alert('至少来一个需要导出的字段吧！',{shadeClose:true,closeBtn :2,icon:5});
        	checkFlag = false;
        }
        return checkFlag;
    },
    _sendExportRequest: function(outputType) {
    	top.layer.close(this.exWindow);
        layer.msg('已发送导出请求，请留意"我的下载"',{time:2000});
        
        var thisObj = this;

        /**取查询条件**/
        var qcInfo = this.getQueryCondition(); 
        /**取排序条件**/
        var sortInfo = this._getSortCondition();
        /**取列表输出字段 **/
        var outputFieldArr = this._getOutputFieldArr();
        /** 取列表显示的合计字段 **/
        var outputSumFields = this._getOutputSumFields(outputFieldArr);
        var moduleName = "";
        var selectTreeNoteObj = top.getSelectMenu();
        if(selectTreeNoteObj!=null) {
        	moduleName = selectTreeNoteObj.getAttribute('name');
        }
        if (outputType == 'CURPAGE') {
            var paginationInfo = this.dataGridObj.datagrid('getPager').data("pagination").options;
            Ajax.service('ExportTask', this.customOptions.exportCurrentMethodID, [moduleName,paginationInfo.pageNumber, paginationInfo.pageSize, this.customOptions.classID, this.customOptions.methodID, outputFieldArr, outputSumFields, qcInfo, sortInfo],
            function(data) {
                thisObj._exportRequestSuccessFunc(data)
            });
        } else {
            Ajax.service('ExportTask', this.customOptions.exportAllMethodID, [moduleName,this.customOptions.classID, this.customOptions.methodID, outputFieldArr, outputSumFields, qcInfo, sortInfo],
            function(data) {
                thisObj._exportRequestSuccessFunc(data)
            });
        }
    },
    /**
	 * 后台列表数据请求成功处理方法
	 **/
    _exportRequestSuccessFunc: function(result) {
    	var tip = '';
		if(result[0]==null||result[0]=='') {
			tip = '一个新增任务正在导出'
			top.queryExportStatus(result[1]);
		} else {
			tip = '新增一个大数据任务，将在空闲时间导出';
		}
        top.downloadTip(tip);
	}
}