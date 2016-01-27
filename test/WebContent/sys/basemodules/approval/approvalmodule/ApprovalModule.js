/**
 * @class 显示审批栏等内容相关
 *		功能包含：获取列表页面审批查询条件、绘制审批栏及审批按钮、绘制审批补录栏和绘制审批路线图
 **/
var ApprovalModule = Class.create();
ApprovalModule.prototype = {
	/** 
     * 初始构造方法
     *
     * @param approvalParams 与审批前端显示相关,包含如下属性
     * 
     * 1.各功能通用属性:
     * funcType: 使用功能的类别(必要)，定义了当前模块的类别，也影响了功能相关属性的定义 QueryCondition:获取列表页面查询条件；DrawApprovalBar:绘制审批栏及审批按钮；DrawAdditionalApprovalBar:绘制审批补录栏；DrawApprovalDiagram:绘制审批路线图
     * userAccount: 当前用户账号
     * 
     * /---- 注意:以下属性的必要性全部是以功能类型为前提的。另外不同功能类型会有同名且包含相同内容的属性，这里仅按照功能类别的需要进行罗列 ---/
     * 
     * 2.QueryCondition专用属性(全部必要)：
     * colCurApprovalPerson: 当前审批用户字段名
     * colHisApprovalPerson: 历史审批用户字段名
     * colApplyPerson: 申请用户字段名
     * colApprovalCheckFlag: 单据审批状态字段名
     * approvalCheckFlagValue: 业务单据的单据审批状态元数据，例如HTSPZT_001等，Object型对象，包含如下属性
     * 		unreport：未提交
     * 		unapprove：未提交
     * 		approving：审批中
     * 		approved：已审批通过
     * 		disapproved：审批不通过
     * tagBusiType: 标签业务类型 00:申请-草稿箱,01:申请-待审批,02:申请-审批中,03:申请-已审批,11:审批-待审批,12:审批-已审批；
     * getQueryConditionFunc: 此属性为获取查询条件的回调方法，参数为一个标准查询条件对象数组，无返回值。生成查询条件后由此方法返回查询条件对象数组
     * 
     * 
     * 3.DrawApprovalBar专用属性：
     * 1)绘制属性
     * approvalBarDivID: 审批栏区域ID(必要)
     * approvalButtonBarDivID: 审批按钮区域ID(非只读时必要)
     * approvalButtonClassName: 审批按钮样式
     * 2)业务属性
     * isReadonly: 是否以只读模式绘制(必要) 只读模式仅供查看，非只读模式用于审批，Boolean型，true:只读,false:非只读
     * userOrgCode: 用户所属单位
     * busiType: 业务单据所属类型(必要) 一般为元数据STD_SPYWLX
     * busiPK: 业务单据PK (必要)
     * busiOrgCode: 业务单据所属单位 (必要)
     * menuId: 当前审批菜单id(非只读时必要)
     * busiDeptCode: 业务单据所属部门
     * busiCondtion: 业务单据的审批条件，Object型对象，包含如下属性(全部是字符型)
     * 		DJ：单价
     * 		ZJ：总价
     * 		MJ：面积
     * 		DY：当月总价
     * 		FL：资产分类代码
     * 		CZLX：处置形式
     * 		DWLX：单位类型
     * busiDefaultValue: 默认值，Object型对象，包含如下属性
     * 		notion：审批意见
     * 		linker：操作人
     * 		operator：经办人
     * 		auditer：审核人
     * 		checker：核准人
     * 		linkDate：审批日期
     * 3)回调方法属性
     * validateFunc: 【保存】【通过】前的校验方法，参数无，返回值boolean型 true:验证通过,false:验证不通过，用来在审批按钮处理前校验页面上的审批信息以外数据是否正确
     * approvalFunc: 【保存】【通过】【不通过】按钮的回调方法(非只读时必要) 该方法无需返回值，包含以下两个参数：
     * 		审批结果：数值型 1:保存,2:通过,3:不通过
     * 		当前审批信息：当前审批信息对象，审批信息对象对应后台类framework.modules.approve.domain.Approval
     * 
     * 
     * 4.DrawAdditionalApprovalBar专用属性：(注：当业务单据PK为''时表示新增空的补录审批信息，否则根据pk查找相关信息)
     * 1)绘制属性
     * approvalBarDivID: 补录审批栏区域ID(必要)
     * 2)业务属性
     * isReadonly: 是否以只读模式绘制(必要) 只读模式仅供查看，非只读模式用于审批，Boolean型，true:只读,false:非只读
     * busiType: 业务单据所属类型(必要) 一般为元数据STD_SPYWLX
     * busiPK: 业务单据PK (必要)
     * busiOrgCode: 业务单据所属单位 (busiPK为''时必要)
     * menuId: 当前审批菜单id(busiPK为''时必要)
     * busiDeptCode: 业务单据所属部门
     * busiCondtion: 业务单据的审批条件，Object型对象，包含如下属性(全部是字符型)
     * 		DJ：单价
     * 		ZJ：总价
     * 		MJ：面积
     * 		DY：当月总价
     * 		FL：资产分类代码
     * 		CZLX：处置形式
     * 		DWLX：单位类型
     * 3)数据传递方法：具体业务功能可通过getAdditionalApprovalData()方法获取审批补录的"审批信息对象集"-3.3)
     * 
     * 5.DrawApprovalDiagram专用属性：
     * 1)绘制属性
     * approvalDiagramDivID: 审批路线图区域ID (必要)
     * approvalDiagramNodeClassName: 审批路线图审批节点样式
     * approvalDiagramDetailClassName: 审批路线图审批明细样式
     * 2)业务属性
     * userOrgCode: 用户所属单位(必要)
     * isReadonly: 是否以只读模式绘制(必要) 只读模式仅供查看，非只读模式用于审批，Boolean型，true:只读,false:非只读
     * busiType: 业务单据所属类型(必要) 一般为元数据STD_SPYWLX
     * busiPK: 业务单据PK (必要)
     * busiOrgCode: 业务单据所属单位 (必要)
     * IsApprovalCompleted: 审批是否已经结束(必要) true或false
     * busiCondtion: 业务单据的审批条件，Object型对象，包含如下属性(全部是字符型)
     * 		DJ：单价
     * 		ZJ：总价
     * 		MJ：面积
     * 		DY：当月总价
     * 		FL：资产分类代码
     * 		CZLX：处置形式
     * 		DWLX：单位类型
     * 
     **/
	initialize: function(approvalParams) {
		this.approvalParams = approvalParams == null ? {} : approvalParams;
		/** 检查一些重要设置属性,不存在问题则结束,这个方法以后删除 **/
        if (!this._checkOptionImportSet()) {
            return;
        }
        
        /** 设置一些重要变量和部分属性默认值 **/
        this._initAndSetDefaultVar();
        this._setDefaultParams();
        
        /** 直接获取列表页面查询条件 **/
        if(this.approvalParams.funcType == "QueryCondition"){
        	this._generateQueryCondition();
        }
        /** 绘制审批栏，**/
        else if(this.approvalParams.funcType == "DrawApprovalBar"){
        	this._drawApprovalBarStart();
        }
        /** 绘制补录审批栏 **/
        else if(this.approvalParams.funcType == "DrawAdditionalApprovalBar"){
        	this._drawAdditionalApprovalBarStart();
        }
        /** 绘制审批路线图 **/
        else if(this.approvalParams.funcType == "DrawApprovalDiagram"){
        	this._drawApprovalDiagram();
        }
        
	},
	
	/**
     * 对approvalParams里面的一些重要属性进行检查提示
     **/
    _checkOptionImportSet: function() {
    	//通用属性
    	if(!this._checkOneOptionImportSet('funcType'))return false;
    	//if(!this._checkOneOptionImportSet('userAccount'))return false;
    	//查询
        if(this.approvalParams.funcType == "QueryCondition"){
        	
        	if(!this._checkOneOptionImportSet('colCurApprovalPerson'))return false;
        	if(!this._checkOneOptionImportSet('colHisApprovalPerson'))return false;
        	if(!this._checkOneOptionImportSet('colApplyPerson'))return false;
        	if(!this._checkOneOptionImportSet('colApprovalCheckFlag'))return false;
        	if(!this._checkOneOptionImportSet('approvalCheckFlagValue'))return false;
        	if(!this._checkOneOptionImportSet('tagBusiType'))return false;
        	if(!this._checkOneOptionImportSet('getQueryConditionFunc'))return false;
        }
        //审批栏
        if(this.approvalParams.funcType == "DrawApprovalBar"){
        	
        	//if(!this._checkOneOptionImportSet('userOrgCode'))return false;
        	if(!this._checkOneOptionImportSet('busiType'))return false;
        	if(!this._checkOneOptionImportSet('busiPK'))return false;
        	if(!this._checkOneOptionImportSet('busiOrgCode'))return false;
        	if(!this._checkOneOptionImportSet('isReadonly'))return false;
        	if(!this._checkOneOptionImportSet('approvalBarDivID'))return false;
        	
	        if(!this.approvalParams.isReadonly){
	        	
	        	//if(!this._checkOneOptionImportSet('busiDeptCode'))return false;
	        	if(!this._checkOneOptionImportSet('menuId'))return false;
	        	if(!this._checkOneOptionImportSet('approvalButtonBarDivID'))return false;
	        	if(!this._checkOneOptionImportSet('approvalFunc'))return false;
	        }
        }
        //补录审批栏
        if(this.approvalParams.funcType == "DrawAdditionalApprovalBar"){
     
        	if(!this._checkOneOptionImportSet('busiType'))return false;
        	if(!this._checkOneOptionImportSet('busiPK'))return false;
        	if(!this._checkOneOptionImportSet('busiOrgCode'))return false;
        	//if(!this._checkOneOptionImportSet('busiDeptCode'))return false;
        	if(!this._checkOneOptionImportSet('menuId'))return false;
        	if(!this._checkOneOptionImportSet('isReadonly'))return false;
        	if(!this._checkOneOptionImportSet('approvalBarDivID'))return false;
        }
        //审批路线图
        if(this.approvalParams.funcType == "DrawApprovalDiagram"){
        	
        	//if(!this._checkOneOptionImportSet('userOrgCode'))return false;
        	if(!this._checkOneOptionImportSet('busiType'))return false;
        	if(!this._checkOneOptionImportSet('busiPK'))return false;
        	if(!this._checkOneOptionImportSet('busiOrgCode'))return false;
        	if(!this._checkOneOptionImportSet('isReadonly'))return false;
        	if(!this._checkOneOptionImportSet('approvalDiagramDivID'))return false;
        	if(!this._checkOneOptionImportSet('IsApprovalCompleted'))return false;
        }
        return true;
    },
    _checkOneOptionImportSet: function(field) {
     	if (this.approvalParams[field] == undefined || this.approvalParams[field] == null) {
            top.layer.alert('请定义approvalParams属性:'+field,{shadeClose:true,closeBtn :2,icon:7});
            return false;
        }
        return true;
    },
    /**
     * 为当前对象初始化一些私有属性，并设置默认值
     **/
    _initAndSetDefaultVar:function() {
    	this.approvalData = null;
    	this.curNodeInfo = {index:-1,level:"1",node:null};
    },
    
    /**
     * 为部分属性设置默认值
     **/
    _setDefaultParams:function() {
    	/** 用户 */
    	this.approvalParams.userAccount = (this.approvalParams.userAccount == undefined || this.approvalParams.userAccount == null) ? top.strUserAccount: this.approvalParams.userAccount;
    	this.approvalParams.userOrgCode = (this.approvalParams.userOrgCode == undefined || this.approvalParams.userOrgCode == null) ? top.strUserOrgCode: this.approvalParams.userOrgCode;
    	
    	/** 业务 */
    	//业务单据的审批条件默认全空
    	this.approvalParams.busiCondtion = (this.approvalParams.busiCondtion == undefined || this.approvalParams.busiCondtion == null) ? {DJ:'',ZJ:'',MJ:'',DY:'',FL:'',CZLX:'',DWLX:''}: this.approvalParams.busiCondtion;
    	this.approvalParams.busiCondtion.DJ = (this.approvalParams.busiCondtion.DJ == undefined || this.approvalParams.busiCondtion.DJ == null) ? '': this.approvalParams.busiCondtion.DJ;
    	this.approvalParams.busiCondtion.ZJ = (this.approvalParams.busiCondtion.ZJ == undefined || this.approvalParams.busiCondtion.ZJ == null) ? '': this.approvalParams.busiCondtion.ZJ;
    	this.approvalParams.busiCondtion.MJ = (this.approvalParams.busiCondtion.MJ == undefined || this.approvalParams.busiCondtion.MJ == null) ? '': this.approvalParams.busiCondtion.MJ;
    	this.approvalParams.busiCondtion.DY = (this.approvalParams.busiCondtion.DY == undefined || this.approvalParams.busiCondtion.DY == null) ? '': this.approvalParams.busiCondtion.DY;
    	this.approvalParams.busiCondtion.FL = (this.approvalParams.busiCondtion.FL == undefined || this.approvalParams.busiCondtion.FL == null) ? '': this.approvalParams.busiCondtion.FL;
    	this.approvalParams.busiCondtion.CZLX = (this.approvalParams.busiCondtion.CZLX == undefined || this.approvalParams.busiCondtion.CZLX == null) ? '': this.approvalParams.busiCondtion.CZLX;
    	this.approvalParams.busiCondtion.DWLX = (this.approvalParams.busiCondtion.DWLX == undefined || this.approvalParams.busiCondtion.DWLX == null) ? '': this.approvalParams.busiCondtion.DWLX;
    	//自定义审批信息默认值 默认除日期外全空，日期默认当前日期
    	this.approvalParams.busiDefaultValue = (this.approvalParams.busiDefaultValue == undefined || this.approvalParams.busiDefaultValue == null) ? {notion:'',linker:'',operator:'',auditer:'',checker:'',linkDate:''}: this.approvalParams.busiDefaultValue;
    	this.approvalParams.busiDefaultValue.notion = (this.approvalParams.busiDefaultValue.notion == undefined || this.approvalParams.busiDefaultValue.notion == null) ? '': this.approvalParams.busiDefaultValue.notion;
    	this.approvalParams.busiDefaultValue.linker = (this.approvalParams.busiDefaultValue.linker == undefined || this.approvalParams.busiDefaultValue.linker == null) ? '': this.approvalParams.busiDefaultValue.linker;
    	this.approvalParams.busiDefaultValue.operator = (this.approvalParams.busiDefaultValue.operator == undefined || this.approvalParams.busiDefaultValue.operator == null) ? '': this.approvalParams.busiDefaultValue.operator;
    	this.approvalParams.busiDefaultValue.auditer = (this.approvalParams.busiDefaultValue.auditer == undefined || this.approvalParams.busiDefaultValue.auditer == null) ? '': this.approvalParams.busiDefaultValue.auditer;
    	this.approvalParams.busiDefaultValue.checker = (this.approvalParams.busiDefaultValue.checker == undefined || this.approvalParams.busiDefaultValue.checker == null) ? '': this.approvalParams.busiDefaultValue.checker;
    	this.approvalParams.busiDefaultValue.linkDate = (this.approvalParams.busiDefaultValue.linkDate == undefined || this.approvalParams.busiDefaultValue.linkDate == null || this.approvalParams.busiDefaultValue.linkDate == '') ? getTodayDate(): this.approvalParams.busiDefaultValue.linkDate;
    	
    	//默认校验必定通过
    	this.approvalParams.validateFunc = (this.approvalParams.validateFunc == undefined || this.approvalParams.validateFunc == null) ? function(){return true;}: this.approvalParams.validateFunc;
    	
    	/** 绘制 */
    	//审批栏按钮样式
    	this.approvalParams.approvalButtonClassName = (this.approvalParams.approvalButtonClassName == undefined || this.approvalParams.approvalButtonClassName == null) ? 'bt_list_function': this.approvalParams.approvalButtonClassName;
    	//审批节点样式
    	this.approvalParams.approvalDiagramNodeClassName = (this.approvalParams.approvalDiagramNodeClassName == undefined || this.approvalParams.approvalDiagramNodeClassName == null) ? '': this.approvalParams.approvalDiagramNodeClassName;
    	//审批明细样式
    	this.approvalParams.approvalDiagramDetailClassName = (this.approvalParams.approvalDiagramDetailClassName == undefined || this.approvalParams.approvalDiagramDetailClassName == null) ? '': this.approvalParams.approvalDiagramDetailClassName;
    },
    
    /**=================================================获取列表页面查询条件======================================================**/
    /**
     * 根据相关属性，生成列表页面查询条件，并通过回调方法传给业务功能
     **/
    _generateQueryCondition:function() {
    	var customQCArr = new Array();
		
    	/**  审批-待审批:“当前审批用户”必须包含当前用户本人  */
	    if (this.approvalParams.tagBusiType.equals("11")) {
	    	var orgQc = new Object();
	 		orgQc.fn = this.approvalParams.colCurApprovalPerson;
			orgQc.oper = ARY_STR_LIKE[0];
			orgQc.value1 = "%|"+this.approvalParams.userAccount+"|%";
			customQCArr.push(orgQc);
		
		/**  审批-已审批:“历史审批用户”必须包含当前用户本人  */
		} else if (this.approvalParams.tagBusiType.equals("12")) {
	    	var orgQc = new Object();
	 		orgQc.fn = this.approvalParams.colHisApprovalPerson;
			orgQc.oper = ARY_STR_LIKE[0];
			orgQc.value1 = "%|"+this.approvalParams.userAccount+"|%";
			customQCArr.push(orgQc);
			
		/**  申请-草稿箱:业务申请表中的“申请人”是当前用户本人，“申请单状态”为“未提交”  */
		} else if (this.approvalParams.tagBusiType.equals("00")) {//
	    	var orgQc = new Object();
	 		orgQc.fn = this.approvalParams.colApplyPerson;
			orgQc.oper = ARY_STR_EQUAL[0];
			orgQc.value1 = this.approvalParams.userAccount;
			customQCArr.push(orgQc);
			var orgQc = new Object();
	 		orgQc.fn = this.approvalParams.colApprovalCheckFlag;
			orgQc.oper = ARY_STR_EQUAL[0];
			orgQc.value1 = this.approvalParams.approvalCheckFlagValue.unreport;
			customQCArr.push(orgQc);
			
		/**  申请-待审批:“申请单状态”为“待审批”  */
		} else if (this.approvalParams.tagBusiType.equals("01")) {
			var orgQc = new Object();
	 		orgQc.fn = this.approvalParams.colApprovalCheckFlag;
			orgQc.oper = ARY_STR_EQUAL[0];
			orgQc.value1 = this.approvalParams.approvalCheckFlagValue.unapprove;
			customQCArr.push(orgQc);
			
		/**  申请-审批中:“申请单状态”为“审批中”  */
		} else if (this.approvalParams.tagBusiType.equals("02")) {
			var orgQc = new Object();
	 		orgQc.fn = this.approvalParams.colApprovalCheckFlag;
			orgQc.oper = ARY_STR_EQUAL[0];
			orgQc.value1 = this.approvalParams.approvalCheckFlagValue.approving;
			customQCArr.push(orgQc);
			
		/**  申请-已审批:“申请单状态”不为“未提交”“待审批”和 “审批中”  */
		} else if (this.approvalParams.tagBusiType.equals("03")) {
			var orgQc = new Object();
	 		orgQc.fn = this.approvalParams.colApprovalCheckFlag;
			orgQc.oper = ARY_STR_NOTINCLUDE[0];
			orgQc.value1 = this.approvalParams.approvalCheckFlagValue.unreport+","+this.approvalParams.approvalCheckFlagValue.unapprove+","+this.approvalParams.approvalCheckFlagValue.approving;
			customQCArr.push(orgQc);
			
		} else {
			top.layer.alert('Warning！未知业务标签类型:'+this.approvalParams.tagBusiType,{shadeClose:true,closeBtn :2,icon:7});
		}
		
		/**  将查询条件对象数组传回给具体业务  */
		try{
			this.approvalParams.getQueryConditionFunc(customQCArr);
		}catch(e){top.layer.alert(e.message,{shadeClose:true,closeBtn :2,icon:7});}
    },
    
    /**=================================================绘制审批栏======================================================**/
    /**
     * 绘制审批栏前的准备工作
     **/
	_drawApprovalBarStart: function(){
		/** 绘制前的位置校验 */
		//校验绘制位置存在性
		this.drawAreaObj = $('#' + this.approvalParams.approvalBarDivID);
		if(this.drawAreaObj == null){
			top.layer.alert('审批栏绘制区域'+this.approvalParams.approvalBarDivID+'不存在',{shadeClose:true,closeBtn :2,icon:7});
		}
		//非只读状态检查按钮区域存在性
		if(!this.approvalParams.isReadonly){
	        this.drawButtonAreaObj = $('#' + this.approvalParams.approvalButtonBarDivID);
	        if(this.drawButtonAreaObj == null){
				top.layer.alert('审批按钮绘制区域'+this.approvalParams.approvalButtonBarDivID+'不存在',{shadeClose:true,closeBtn :2,icon:7});
			}
		}
		/** 审批信息获取 */ 
		$("body").addLoading({msg:"正在获取审批信息，请稍候..."});
		var appmod = this;
		Ajax.service( 'ApprovalBO', 'getAllApprovalInfo',[this.approvalParams.busiPK,this.approvalParams.busiType] , 
			function(data) {
				$("body").removeLoading();
				appmod.approvalData = data;
				appmod._drawApprovalBar();
				if(!appmod.approvalParams.isReadonly){
					appmod._drawApprovalButton();
				}
			},
			function(){
				$("body").removeLoading();
				top.layer.alert('获取数据出现问题了，请联系管理员。',{closeBtn :2,icon:5});
			}
		);
		
	},
	
	/**
     * 绘制审批栏
     **/
	_drawApprovalBar: function(){
		//没有审批信息直接跳过
		if(this.approvalData == null || this.approvalData.length==0)return;
		//初始化当前审批节点相关信息
		this._initCurAppNodeInfo();
		//清空审批栏
	  	this.drawAreaObj.html("");
	  	this.drawAreaObj.css({padding:7,background:"#CFCFCF",overflowY:"hidden"});
	  	
	  	//遍历审批信息，绘制审批栏
	  	var appmod = this;
	  	var bInitEditor = false;
	  	$.each(this.approvalData,function(n,info) {
	  		
	  		/** 屏蔽不需要的节点 */
	  		//当审批节点单位与用户所在单位不一致时，不显示类型为内部的审批节点
	  		if(info.linkOrgCode != appmod.approvalParams.userOrgCode && info.approvalPathLX == "0"){
	  			return;
	  		}
	  		//当审批节点单位与用户所在单位一致时，且存在内部节点时，不显示类型为外部的审批节点
	  		if(info.linkOrgCode == appmod.approvalParams.userOrgCode && info.approvalPathLX == "1"){
	  			var bIsHidden = false;
	  			$.each(appmod.approvalData,function(n2,info2) {
					if(info.linkOrgCode == info2.linkOrgCode && info2.approvalPathLX == "0"){
						bIsHidden = true;
						return false;
					}
				});
				if(bIsHidden)return;
	  		}
	  		//当审批栏以只读状态绘制时，如果审批相关信息没有填写，不显示当前的审批节点
	  		if( appmod.approvalParams.isReadonly && appmod.curNodeInfo.index == n){
	  			if(info.notion==""&&info.linker==""&&info.operator==""&&info.auditer==""&&info.checker==""&&info.linkDate=="")
	  				return;
	  		}
	  		
	  		/** 初始化显示控制参数 */
	  		//行PK
	  		var rowid = info.pk;
	  		if (rowid.indexOf(":")!=-1) {
	     		rowid = rowid.replace(/:/g,""); 
	    	}
	  		//是否为只读
	  		var bReadOnly = true;
	  		//当满足下面条件时，本行以非只读状态绘制 1.审批栏以非只读状态绘制 2.当前审批节点索引不为-1 3.当前审批节点索引与当前索引相等
	    	if( !appmod.approvalParams.isReadonly && appmod.curNodeInfo.index != -1 && appmod.curNodeInfo.index == n){
	      		bReadOnly = false;
	    	}
	    	//当用户不在可审批账号中时，审批栏为只读
	    	if(("|"+info.allowApprPerson+"|").indexOf("|"+appmod.approvalParams.userAccount+"|")==-1){
	      		bReadOnly = true;
	    	}
	    	
	    	//HTML块定义
	    	var strHtml = "";
	    	var strFirstHTML ="";
	    	var strNotionHTML = "";
	    	var strEndHTML = "";
	    	
	    	//显示相关属性设定
	    	var className = "";
	    	var strLinkDate = "";
	    	var strLinker = "";
	    	var strOperator = "";
	    	var strAuditer = "";
	    	var strChecker = "";
	    	var strNotion = "";
    	
	    	//审批栏样式和显示字段赋值
	    	if(bReadOnly){
	    		className = "ApprovalBar";
	    	}else{
	    		className = "ApprovalBar CurApprovalBar";
	    		strLinkDate = appmod.approvalParams.busiDefaultValue.linkDate;
		    	strLinker = appmod.approvalParams.busiDefaultValue.linker;
		    	strOperator = appmod.approvalParams.busiDefaultValue.operator;
		    	strAuditer = appmod.approvalParams.busiDefaultValue.auditer;
		    	strChecker = appmod.approvalParams.busiDefaultValue.checker;
		    	strNotion = appmod.approvalParams.busiDefaultValue.notion;
		    	bInitEditor = true;
	    	}
	    	if(info.linkDate != null && info.linkDate != "")strLinkDate = info.linkDate;
    		if(info.linker != null && info.linker != "")strLinker = info.linker;
    		if(info.operator != null && info.operator != "")strOperator = info.operator;
    		if(info.auditer != null && info.auditer != "")strAuditer = info.auditer;
    		if(info.checker != null && info.checker != "")strChecker = info.checker;
    		if(info.notion != null && info.notion != "")strNotion = info.notion;
    		
	    	/** 显示字段控件的html生成 */
	    	var htmlNotion = appmod._editorHTMLFactory({
				readonly:bReadOnly,
				type:"textarea",
				rowid:rowid,
				colname:"notion",
				value:strNotion,
				required:true,
				chname:"审批意见",
				maxlen:200
		  	});
		  	var htmlLinker = '<span class="ApprovalAttrName">操作人</span>' + appmod._editorHTMLFactory({
				readonly:bReadOnly,
				type:"text",
				rowid:rowid,
				colname:"linker",
				value:strLinker,
				required:true,
				chname:"操作人",
				maxlen:25
		  	});
		  	var htmlOperator = '<span class="ApprovalAttrName">经办人</span>' + appmod._editorHTMLFactory({
				readonly:bReadOnly,
				type:"text",
				rowid:rowid,
				colname:"operator",
				value:strOperator,
				required:true,
				chname:"经办人",
				maxlen:25
		  	});
		  	var htmlAuditer = '<span class="ApprovalAttrName">审核人</span>' + appmod._editorHTMLFactory({
				readonly:bReadOnly,
				type:"text",
				rowid:rowid,
				colname:"auditer",
				value:strAuditer,
				required:true,
				chname:"审核人",
				maxlen:25
		  	});
		  	var htmlChecker = '<span class="ApprovalAttrName">核准人</span>' + appmod._editorHTMLFactory({
				readonly:bReadOnly,
				type:"text",
				rowid:rowid,
				colname:"checker",
				value:strChecker,
				required:true,
				chname:"核准人",
				maxlen:25
		  	});
		  	var htmlLinkDate = '<span class="ApprovalAttrName">审核日期</span>' + appmod._editorHTMLFactory({
				readonly:bReadOnly,
				type:"date",
				rowid:rowid,
				colname:"linkDate",
				value:strLinkDate,
				required:true,
				chname:"审核日期"
		  	});
		  	
	    	strFirstHTML  = '<table cellSpacing="0" cellPadding="0" class="'+className+'">';
	    	strNotionHTML = 	'<tr>'
						  + 		'<td rowspan="2" class="ApprovalTitleTD"><div class="ApprovalTitle">'+info.itemName+'</div></td>'
						  + 		'<td >'+htmlNotion+'</td>'
						  + 	'</tr>'
						  + 	'<tr>'
						  + 		'<td class="ApprovalAttrTD">';
			strEndHTML    =			'</td>'
						  +		'</tr>'
         				  + '</table>';
         	//添加表单标签		  
         	if(!bReadOnly){
         		strFirstHTML = '<div id="approvalform">' + strFirstHTML;
         		strEndHTML = strEndHTML + '</div>';
         	}
         	
         	/** 组装html */
         	if(info.approvalPathLX == "0"){
				strHtml = strFirstHTML + strNotionHTML + htmlLinker + htmlLinkDate + strEndHTML;
         	}else{
         		strHtml = strFirstHTML + strNotionHTML + htmlOperator + htmlAuditer + htmlChecker + htmlLinkDate + strEndHTML;
         	}
         	/** 添加审批栏 */
	  		appmod.drawAreaObj.html(appmod.drawAreaObj.html()+strHtml);
	  		
		});
  		/** 初始化可编辑控件(必须在页面html控件填充之后) */
		if(bInitEditor){
	  		var rowid = this.curNodeInfo.node.pk;
	  		if (rowid.indexOf(":")!=-1) {
	     		rowid = rowid.replace(/:/g,""); 
	    	}
  			if(this.curNodeInfo.node.approvalPathLX == "0"){
  				$("#notion"+rowid).validatebox();
  				$("#linker"+rowid).validatebox();
  				$("#linkDate"+rowid).datebox({
  					width:120
  				});
  			}else{
  				$("#notion"+rowid).validatebox();
  				$("#operator"+rowid).validatebox();
  				$("#auditer"+rowid).validatebox();
  				$("#checker"+rowid).validatebox();
  				$("#linkDate"+rowid).datebox({
  					width:120
  				});
  			}
		}
	},
	
	/**
     * 绘制一个编辑框，返回其html值
     * 注：目前支持text，textarea和date三种
     * 参数属性如下
     * readonly 是否只读，true:只读 false:非只读
     * rowid 审批记录id
     * colname 列名
     * type 编辑框类型，目前支持text，textarea和date三种
     * value 默认值
     * chname 列中文名
     * required 是否必填 true:必填 false:不必填
     * maxlen 最大长度
     **/
	_editorHTMLFactory: function(info){
		if(info.readonly){
			if(info.type == "textarea"){
				return '<textarea  readonly>'+info.value+'</textarea>';
			}else{
				return '<input value="'+info.value+'" readonly></input>';
			}
		}else{
			if(info.type == "text"){
				return '<input id="'+info.colname+info.rowid+'" value="'+info.value+'" class="easyui-validatebox validatebox-text" missingMessage="'+info.chname+'不能为空" required="'+info.required+'" invalidMessage="不能超过'+info.maxlen+'个字符！" validType="length[1,'+info.maxlen+']"></input>';
			}else if(info.type == "date"){
				return '<input id="'+info.colname+info.rowid+'" value="'+info.value+'" class="easyui-datebox datebox-f combo-f" editable="false"/>';
			}else if(info.type == "textarea"){
				return '<textarea id="'+info.colname+info.rowid+'" class="easyui-validatebox validatebox-text" missingMessage="'+info.chname+'不能为空" required="'+info.required+'" invalidMessage="不能超过'+info.maxlen+'个字符！" validType="length[1,'+info.maxlen+']">'+info.value+'</textarea>';
			}
		}
		return '';
	},
	
	/**
     * 初始化当前审批节点以及审批级别
     */
	_initCurAppNodeInfo: function(){
		
		var iCurNodeIndex = -1;// 当前用户所在的审批节点索引 为-1时表示用户只有查看权限
	  	var strOrgCode = this.approvalData[0].linkOrgCode;//初始审批单位
	  	
	  	//判断当前用户是否有审批权限以及确定当前用户所处节点
	  	var appmod = this;
		$.each(this.approvalData,function(n,info) {
			
    		//审批状态为"未审批",且用户单位与审批单位一致,而且可以审批的用户中也包含当前用户时，确定此节点为当前审批节点
    		//alert(info.approvalStuts+":"+info.linkOrgCode+":"+this.approvalParams.userOrgCode+":"+info.allowApprPerson+":"+this.approvalParams.userAccount);
			if( info.approvalStuts == "0" && info.linkOrgCode == appmod.approvalParams.userOrgCode && ("|"+info.allowApprPerson+"|").indexOf("|"+appmod.approvalParams.userAccount+"|")!=-1 ){
    			iCurNodeIndex = n ;
		    	return false;
    		}
			//当 已经到达未审批节点 或者 审批单位级别已经比用户所在单位高 时 ，认为此用户无审批
    		if(info.approvalStuts == "0" || info.linkOrgCode.length < appmod.approvalParams.userOrgCode.length){
	    		if(appmod.approvalParams.isReadonly){//当以只读状态绘制时，不显示当前的审批节点
		  			iCurNodeIndex = n;
		  		}else{
	    			iCurNodeIndex = -1;//此用户只能进行查看
		  		}
	    		if(strOrgCode == appmod.approvalParams.userOrgCode){// 当用户所在单位=初始审批单位时，审批级别为内部
	    			strCurLevel = 0;
	    		}else{
	    			strCurLevel = 1;
	    		}
    			return false;
    		}
    		
		});
		
		this.curNodeInfo.index = iCurNodeIndex;
    	this.curNodeInfo.node = this.approvalData[iCurNodeIndex];
    	
	},
	
	/**
     * 绘制审批按钮
     */
	_drawApprovalButton: function(){
		//清空审批栏
	  	this.drawButtonAreaObj.html("");
		//没有审批信息直接跳过
		if(this.approvalData == null || this.approvalData.length==0)return;
	  	//当前审批节点不存在时直接跳过
	  	if(this.curNodeInfo.index == -1)return;
	  	
	  	/** 新增按钮html */
	  	var strHTML = "";
	  	strHTML += '<a id="appbutSave" class="'+this.approvalParams.approvalButtonClassName+'" href="#">保存</a>&nbsp;';
	  	strHTML += '<a id="appbutAgree" class="'+this.approvalParams.approvalButtonClassName+'" href="#">通过</a>&nbsp;';
	  	//当当前审批节点的“是否可审批不同意”值为“0”时不显示[不通过]按钮
	  	if(!this.curNodeInfo.node.pdBeCanApproveUnAgree == "0"){
		  	strHTML += '<a id="appbutDisagree" class="'+this.approvalParams.approvalButtonClassName+'" href="#">不通过</a>';
	  	}
	  	this.drawButtonAreaObj.html(strHTML);
	  	
	  	/** 给按钮添加事件 */
	  	var appmod = this;
	  	$("#appbutSave").bind("click",function(){appmod._save();});
	  	$("#appbutAgree").bind("click",function(){appmod._agree();});
	  	$("#appbutDisagree").bind("click",function(){appmod._disagree();});
	},
	
	/**
     * 【保存】按钮响应事件
     */
	_save: function(){
		//验证不通过跳过
		if(!this._validate())return;
		
		this._commonsave(1,'您确定仅保存审批信息吗？',{});
	},
	
	/**
     * 【通过】按钮响应事件
     */
	_agree: function(){
		/** 验证不通过跳过 */
		if(!this._validate())return;
		
		/** “当前审批流程类型”的值是“外部”时,直接通过 */
		if(this.curNodeInfo.node.approvalPathLX == "1"){
			this._commonsave(2,'您确定通过此审批单吗？',{});
		}
		
		/** 调用接口“是否进行下一审批”F13 */
		else{
			$("body").addLoading({msg:"正在验证审批信息，请稍候..."});
			var appmod = this;
			Ajax.service('ApprovalBO', 'isCanNext',[this.curNodeInfo.node,this.approvalParams.busiCondtion] , 
				function(data) {
					$("body").removeLoading();
					appmod._agree2(data);
				},
				function(){
					$("body").removeLoading();
					top.layer.alert('获取数据出现问题了，请联系管理员。',{closeBtn :2,icon:5});
				}
			);
		}
	},
	
	/**
     * 调用“是否进行下一审批”接口后的响应函数
     */
	_agree2: function(data){
		
		//当"是否可以进行下一步审批"是false时，直接保存
		if(data.flag == "false" || data.flag == "null"){
			this._commonsave(2,'您确定通过此审批单吗？',{});
			return;
		}
		
		//当三个参数都为0时，填充下个节点相关数值，然后保存
		if(this.curNodeInfo.node.isCanPoint == "0" && this.curNodeInfo.node.isCanNode == "0" && this.curNodeInfo.node.isCanEnd == "0"){
			
			//是否结束审批 0 不结束
			this.curNodeInfo.node.isEnd = "0";
			//内部节点跳转时，直接指定下一审批路径
			if(this.curNodeInfo.node.linkOrgCode == data.xysplj.orgSysCode){
				this.curNodeInfo.node.nextNode = data.xysplj.pk;
			}
			//跨单位跳转时，清空下一审批路径
			else{
				this.curNodeInfo.node.nextNode = "";
			}
			
			this._commonsave(2,'您确定通过此审批单吗？',{});
			return;
		}
		
		//弹出页面进行下一步选择处理
		var appmod = this;
		var alertpanel = new ApprovalModuleAlertPanel({
			type:'1',
			curApproveNode:this.curNodeInfo.node,
			menuId:this.approvalParams.menuId,
			busiOrgCode:this.approvalParams.busiOrgCode,
			busiDeptCode:this.approvalParams.busiDeptCode,
			alertpanelCallBack:function(data){
				appmod._agree3(data);
			}
		}); 
					
	},
	
	/**
     * 【通过】弹出页面回调函数
     * @param: result 下一步选择结果，包含下列属性
     * 		isEnd 是否结束审批
     * 		nextNode 跳转指定节点
     * 		nextPerson 下一审批人
     */
	_agree3: function(result){
		//结束审批时 修改状态清空指定节点和审批人
		if(result.isEnd == "1"){
			//是否结束审批 1 结束
			this.curNodeInfo.node.isEnd = "1";
			//跳转指定节点 空
			this.curNodeInfo.node.nextNode = "";
			//下一审批人 空
			this.curNodeInfo.node.nextCheckPerson = "";
		}else{
			//是否结束审批 0 不结束
			this.curNodeInfo.node.isEnd = "0";
			//跳转指定节点 指定
			this.curNodeInfo.node.nextNode = result.nextNode;
			//下一审批人 指定
			this.curNodeInfo.node.nextCheckPerson = result.nextPerson;
		}
		this._commonsave(2,'您确定通过此审批单吗？',{});
	},
	
	/**
     * 【不通过】按钮响应事件
     */
	_disagree: function(){
		if(!this._validate())return;
		//“是否可审批不同意”的值不是4时,直接保存
		if(this.curNodeInfo.node.pdBeCanApproveUnAgree != 4){
			this._commonsave(3,'您确定不通过此审批单吗？',{});
		}else{
			//弹出页面进行退回节点选择
			var appmod = this;
			var alertpanel = new ApprovalModuleAlertPanel({
				type:'2',
				approvalData:this.approvalData,
				userOrgCode:this.approvalParams.userOrgCode,
				alertpanelCallBack:function(data){
					appmod._commonsave(3,'您确定不通过此审批单吗？',{nextNode:data});
				}
			}); 
		}
	},
	
	/**
     * 通用数据保存方法
     */
	_commonsave: function(type,msg,param){
		var appmod = this;
		this.alertLayerOut = top.layer.open({
			title:'信息',
			icon: 3,
			closeBtn:2,
			area:[250,150],
			btn:['确定', '取消'],
			content:msg,
			yes: function(index){
				//参数对象
				var paramobj = $.extend({
					nextNode:''
				}
				,param);
				
				//指定跳转节点 
				if(type == '3' && paramobj.nextNode != null){
					appmod.curNodeInfo.node.nextNode = paramobj.nextNode;
				}
				
				//保存页面上的数据
				appmod._setValueIntoObjs();
				
				//清除遮罩层
				top.layer.close(appmod.alertLayerOut);
				
				//传回给业务页面
				try{
					appmod.approvalParams.approvalFunc(type,appmod.curNodeInfo.node);
				}catch(e){
					top.layer.alert('页面保存方法调用错误',{shadeClose:true,closeBtn :2,icon:7});
				}
			},
			cancel:function(){
				//清除遮罩层
				top.layer.close(appmod.alertLayerOut);
			}
		});
			
	},
	
	/**
     * 审批模块统一验证方法
     */
	_validate: function(){
		//页面验证不通过直接返回false
		if(!this.approvalParams.validateFunc())return false;
		//审批信息验证
		return $("#approvalform").form('validate');
	},
	
	/**
     * 将页面上的值保存到当前审批节点中
     */
	_setValueIntoObjs: function(){
		//没有审批信息直接跳过
		if(this.approvalData == null || this.approvalData.length==0)return;
	  	//当前审批节点不存在时直接跳过
	  	if(this.curNodeInfo.index == -1)return;
	  	var rowid = this.curNodeInfo.node.pk;
  		if (rowid.indexOf(":")!=-1) {
     		rowid = rowid.replace(/:/g,""); 
    	}
	  	if(this.curNodeInfo.node.approvalPathLX == "1"){
	  		this.curNodeInfo.node.notion = $("#notion"+rowid).val();
	  		this.curNodeInfo.node.operator = $("#operator"+rowid).val();
	  		this.curNodeInfo.node.auditer = $("#auditer"+rowid).val();
	  		this.curNodeInfo.node.checker = $("#checker"+rowid).val();
	  		this.curNodeInfo.node.linkDate = $("#linkDate"+rowid).datebox("getValue");
	  	}else{
	  		this.curNodeInfo.node.notion = $("#notion"+rowid).val();
	  		this.curNodeInfo.node.linker = $("#linker"+rowid).val();
	  		this.curNodeInfo.node.linkDate = $("#linkDate"+rowid).datebox("getValue");
	  	}
	},
	
	/**=================================================绘制补录审批栏======================================================**/
	/**
     * 绘制补录审批栏前的准备工作
     **/
	_drawAdditionalApprovalBarStart: function(){
		/** 绘制前的位置校验 */
		//校验绘制位置存在性
		this.drawAreaObj = $('#' + this.approvalParams.approvalBarDivID);
		if(this.drawAreaObj == null){
			top.layer.alert('审批栏绘制区域'+this.approvalParams.approvalBarDivID+'不存在',{shadeClose:true,closeBtn :2,icon:7});
		}
		
		/** 审批信息获取 */ 
		$("body").addLoading({msg:"正在获取审批信息，请稍候..."});
		var appmod = this;
		Ajax.service( 'ApprovalBO', 'getAdditionalApprovalInfo',[this.approvalParams.busiPK,this.approvalParams.busiOrgCode,this.approvalParams.busiType,this.approvalParams.busiCondtion,[this.approvalParams.menuId,this.approvalParams.busiOrgCode,this.approvalParams.busiDeptCode]] , 
			function(data) {
				$("body").removeLoading();
				if(data.length>15){
					alert("审批节点数量("+data.length+")过多")
					return;
				}
				appmod.approvalData = data;
				appmod._drawAdditionalApprovalBar();
			},
			function(){
				$("body").removeLoading();
				top.layer.alert('获取数据出现问题了，请联系管理员。',{closeBtn :2,icon:5});
			}
		);
	},
	
	/**
     * 绘制补录审批栏
     **/
	_drawAdditionalApprovalBar: function(){
		//没有审批信息直接跳过
		if(this.approvalData == null || this.approvalData.length==0)return;
		//清空审批栏
	  	this.drawAreaObj.html("");
	  	
	  	//遍历审批信息，绘制审批栏
	  	var appmod = this;
	  	$.each(this.approvalData,function(n,info) {
	  		
	  		/** 初始化显示控制参数 **/
	  		//行PK(不使用pk，因为pk可能为空)
	  		var rowid = n;
	  		
	  		//是否为只读
	  		var bReadOnly = appmod.approvalParams.isReadonly;
	    	
	    	//审批栏样式设定
	    	var className = "";
	    	if(bReadOnly){
	    		className = "ApprovalBar";
	    	}else{
	    		className = "ApprovalBar CurApprovalBar";
	    	}
	    	
	    	/** 绘制 **/
	    	var form = $('<div id="approvalform"></div>');
     		form.appendTo(appmod.drawAreaObj);
     		
	    	var table = $('<table cellSpacing="0" cellPadding="0" class="'+className+'">');
     		table.appendTo(form);
     		
     		var tr1=$('<tr></tr>');
        	tr1.appendTo(table);
        	
        	var tr2=$('<tr></tr>');
        	tr2.appendTo(table);
        	
        	var td1=$('<td rowspan="2" class="ApprovalTitleTD"></td>');
			td1.appendTo(tr1);
			
			var td2=$('<td></td>');
			td2.appendTo(tr1);
			
			var td3=$('<td class="ApprovalAttrTD"></td>');
			td3.appendTo(tr2);
			
			var div=$('<div class="ApprovalTitle">'+info.itemName+'</div>');
			div.appendTo(td1);
			
			appmod._createController({
				parentElement:td2,
				type:"textarea",
				colname:"notion",
				value:info.notion,
				rowid:rowid,
				chname:"审批意见",
				maxlen:200,
				readonly:bReadOnly
			});
			
			if(info.approvalPathLX == "0"){
				
				var span=$('<span class="ApprovalAttrName">操作人</span>');
				span.appendTo(td3);
				
				appmod._createController({
					parentElement:td3,
					type:"text",
					colname:"linker",
					value:info.linker,
					rowid:rowid,
					chname:"操作人",
					maxlen:25,
					readonly:bReadOnly
				});
			
			}else{
				
				var span=$('<span class="ApprovalAttrName">经办人</span>');
				span.appendTo(td3);
				
				appmod._createController({
					parentElement:td3,
					type:"text",
					colname:"operator",
					value:info.operator,
					rowid:rowid,
					chname:"经办人",
					maxlen:25,
					readonly:bReadOnly
				});
				
				var span=$('<span class="ApprovalAttrName">审核人</span>');
				span.appendTo(td3);
				
				appmod._createController({
					parentElement:td3,
					type:"text",
					colname:"auditer",
					value:info.auditer,
					rowid:rowid,
					chname:"审核人",
					maxlen:25,
					readonly:bReadOnly
				});
				
				var span=$('<span class="ApprovalAttrName">核准人</span>');
				span.appendTo(td3);
				
				appmod._createController({
					parentElement:td3,
					type:"text",
					colname:"checker",
					value:info.checker,
					rowid:rowid,
					chname:"核准人",
					maxlen:25,
					readonly:bReadOnly
				});
			}
			
			var span=$('<span class="ApprovalAttrName">审核日期</span>');
			span.appendTo(td3);
			
			appmod._createController({
				parentElement:td3,
				type:"date",
				colname:"linkDate",
				value:info.linkDate,
				rowid:rowid,
				chname:"审核日期",
				maxlen:25,
				readonly:bReadOnly
			});
			
	  		
		});
	},
	/**
     * 向指定父元素内添加控件 TODO
     * 注：目前支持text，textarea和date三种
     * 参数属性如下
     * parentElement 父级元素 必要
     * type 编辑框类型，目前支持text，textarea和date三种
     * colname 列名
     * value 默认值
     * rowid 审批记录id
     * chname 列中文名
     * maxlen 最大长度
     * readonly 是否只读，true:只读 false:非只读，默认只读
     * required 是否必填 true:必填 false:不必填，默认不必填
     **/
	_createController: function(info){
		/**  校验及默认值 **/
		if(info.parentElement == undefined || info.parentElement == null)return;
		var options = $.extend({
			type:'text',
			colname:'',
			value:'',
			rowid:'',
			chname:'',
			required:false,
			readonly:true
		},info);
		if(options.value==null)options.value='';
		
		if(options.readonly){
			if(options.type == "textarea"){
				var textarea=$('<textarea  readonly>'+options.value+'</textarea>');
				textarea.appendTo(options.parentElement);
			}else{
				var input=$('<input value="'+options.value+'" readonly></input>');
				input.appendTo(options.parentElement);
			}
		}else{
			var id = options.colname+options.rowid;
			if(options.type == "text"){
				
				var input=$('<input id="'+id+'" value="'+options.value+'" ></input>');
				input.appendTo(options.parentElement);
				$("#"+id).addClass('easyui-validatebox validatebox-text');
				$("#"+id).validatebox({
					required:options.required,
					missingMessage:options.chname+'不能为空',
					invalidMessage:'不能超过'+options.maxlen+'个字符！',
					validType:'length[1,'+options.maxlen+']'
				});
				
			}else if(info.type == "date"){
				
				var input=$('<input id="'+id+'" value="'+options.value+'" editable="false"></input>');
				input.appendTo(options.parentElement);
				$("#"+id).addClass('easyui-datebox datebox-f combo-f');
				$("#"+id).datebox({
					width:120
				});
				
			}else if(info.type == "textarea"){
				var textarea=$('<textarea id="'+id+'" >'+options.value+'</textarea>');
				textarea.appendTo(options.parentElement);
				$("#"+id).addClass('easyui-validatebox validatebox-text');
				$("#"+id).validatebox({
					required:options.required,
					missingMessage:options.chname+'不能为空',
					invalidMessage:'不能超过'+options.maxlen+'个字符！',
					validType:'length[1,'+options.maxlen+']'
				});
				
			}
		}
	},
	/**
     * 补录数据传递方法
     **/
	getAdditionalApprovalData: function(){
  		//没有审批信息直接返回
		if(this.approvalData == null || this.approvalData.length==0)return this.approvalData;
		//遍历审批信息，从控件中获取值
	  	var appmod = this;
	  	$.each(this.approvalData,function(n,info) {
	  		var rowid = n;
		  	if(info.approvalPathLX == "1"){
		  		info.notion = $("#notion"+rowid).val();
		  		info.operator = $("#operator"+rowid).val();
		  		info.auditer = $("#auditer"+rowid).val();
		  		info.checker = $("#checker"+rowid).val();
		  		info.linkDate = $("#linkDate"+rowid).datebox("getValue");
		  	}else{
		  		info.notion = $("#notion"+rowid).val();
		  		info.linker = $("#linker"+rowid).val();
		  		info.linkDate = $("#linkDate"+rowid).datebox("getValue");
		  	}
	  	});
		return this.approvalData;
	},
	/**=================================================绘制审批路线图======================================================**/
	/**
     * 绘制审批路线图
     **/
	_drawApprovalDiagram: function(){
		
	}
}

 /**
 * @class 显示和处理审批流程中的分支
 *		功能包含：绘制“是否结束审批”，“选择审批人”等控件，并将结果反馈给审批模块
 **/
var ApprovalModuleAlertPanel = Class.create();
ApprovalModuleAlertPanel.prototype = {
	/** window 主div的html **/
    windowHtml: //"<div id='asid_div_alertpanel' class='ApprovalBar'><table><tr style='display:none'><td>请选择是否结束审批：</td><td><input id='asid_comp_end' class='easyui-combobox' placeholder='请选择是否结束审批' ></td></tr><tr style='display:none'><td>请选择跳转的节点：</td><td><input id='asid_comp_nextnode' class='easyui-combobox' placeholder='请选择跳转的节点' ></td></tr><tr style='display:none'><td>请选择指定审批人：</td><td><input id='asid_comp_point' class='easyui-combobox' placeholder='请选择指定审批人' ></td></tr><tr style='display:none'><td>请选择退回节点：</td><td><input id='asid_comp_back' class='easyui-combobox' placeholder='请选择退回节点' /></td></tr><tr><td colspan='2' style='text-align:center'><a id='asid_btn_sure' class='bt_list_function' href='#'>确定</a>&nbsp;<a id='asid_btn_cancel' class='bt_list_function' href='#'>取消</a></td></tr></table></div>",
	"    <div id='asid_div_alertpanel' class='ApprovalBar' style='width:100%;padding-top:10px; '>					"+
	"		<table style='margin:0 auto;'>																			"+
	"			<tr style='display:none;height:40px;'>																			"+
	"				<td style='text-align:right;'>请选择是否结束审批：</td>												"+
	"				<td><input id='asid_comp_end' class='easyui-combobox' placeholder='请选择是否结束审批' ></td>		"+
	"			</tr>																								"+
	"			<tr style='display:none;height:40px;'>																			"+
	"				<td style='text-align:right;'>请选择跳转的节点：</td>												"+
	"				<td><input id='asid_comp_nextnode' class='easyui-combobox' placeholder='请选择跳转的节点' ></td>	"+
	"			</tr>																								"+
	"			<tr style='display:none;height:40px;'>																			"+
	"				<td style='text-align:right;'>请选择指定审批人：</td>												"+
	"				<td><input id='asid_comp_point' class='easyui-combobox' placeholder='请选择指定审批人' ></td>		"+
	"			</tr>																								"+
	"			<tr style='display:none;height:40px;'>															"+
	"				<td style='text-align:right;'>请选择退回节点：</td>												"+
	"				<td><input id='asid_comp_back' class='easyui-combobox' placeholder='请选择退回节点' /></td>		"+
	"			</tr>																								"+
	"		</table>																								"+
	"	</div>																										",
	/** 
     * 初始构造方法
     *
     * @param options 与审批流程中的各种分支相关,包含如下属性
     * 
     * TODO 参数信息待补充
     */
	initialize: function(options) {
    
		this.options = $.extend({
			type:'1',
			curApproveNode:null,
			menuId:'',
			busiOrgCode:'',
			busiDeptCode:'',
			approvalData:null,
			userOrgCode:'',
			alertpanelCallBack:null
		}
		,options);
		
		var thisObj = this;
        if ($("#asid_div_alertpanel").length != 0) {
            $("#asid_div_alertpanel").remove();
        }							
        $("body").append(this.windowHtml);
        
        this.init();
	},
	
	/** 
     * 初始化界面元素和私有属性
     */
	init: function() {
		this.nextNodeData = null;
		this.initComponent();
        this.initWindow();
		this.initData();
	},
	
	/**
 	* 设置控件 TODO 显示处理
 	**/
    initComponent: function() {
        var thisObj = this;
        
        if(this.options.type == '1'){
        	
        	/** 显示初始化*/
        	//先禁用三个控件
        	$('#asid_comp_end').attr('disabled',true);
        	$('#asid_comp_nextnode').attr('disabled',true);
        	$('#asid_comp_point').attr('disabled',true);
        	//可以结束审批时,显示对应控件
        	if(this.options.curApproveNode.isCanEnd == '1'){
        		$("#asid_comp_end").parent().parent().css('display','');
        		$('#asid_comp_end').attr('disabled',false);
        	}
        	//可选下一审批节点时,显示对应控件
        	if(this.options.curApproveNode.isCanNode == '1'){
        		$("#asid_comp_nextnode").parent().parent().css('display','');
        		$('#asid_comp_nextnode').attr('disabled',false);
        	}
        	//可选下一审批人时,显示对应控件
        	if(this.options.curApproveNode.isCanPoint != '0'){
        		$("#asid_comp_point").parent().parent().css('display','');
        		$('#asid_comp_point').attr('disabled',false);
        	}
        	/** 控件属性初始化*/
	        //是否结束审批
	        $('#asid_comp_end').combobox({
	        	width:180,
				height:26,
				panelHeight:70,
				editable:false,
				missingMessage:'必须选择是否结束审批',
				valueField:'value',
				textField:'name',
				data:[{name:'结束审批',value:'1'},{name:'继续下一级审批',value:'0'}],
				onBeforeLoad: function(param){
				},
				onSelect: function(data){
					//结束审批时不能选择下一审批节点和下一审批人,清空选项并禁用控件
					if(data.value == '1'){
						thisObj.enableComponent('asid_comp_nextnode',false);
						thisObj.enableComponent('asid_comp_point',false);
					}else{
						thisObj.enableComponent('asid_comp_nextnode',true);
						thisObj.enableComponent('asid_comp_point',true);
					}
				}
			});
			
			//选择跳转节点
	        $("#asid_comp_nextnode").combobox({
				width:180,
				height:26,
				panelHeight:70,
				editable:false,
				missingMessage:'必须选择一个选项',
				valueField:'pk',
				textField:'itemName',
				data:[{itemName:'不指定节点',pk:'-1'}],
				onBeforeLoad: function(param){
				},
				onSelect: function(data){
					//更新下一审批人数据源
					if(thisObj.options.curApproveNode.isCanPoint != '0'){
						thisObj.updatePersonData(data.pk);
					}
				}
			});
			
			//指定审批人
			$("#asid_comp_point").combobox({
				width:180,
				height:26,
				panelHeight:70,
				editable:false,
				missingMessage:'必须选择一个选项',
				valueField:'userAccount',
				textField:'userName',
				data:[{userName:'不指定人',userAccount:'-1'}],
				multiple:thisObj.options.curApproveNode.isCanPoint=='2'?true:false,
				onBeforeLoad: function(param){
				},
				onSelect: function(data){
					/**审批人多选*/
					if(thisObj.options.curApproveNode.isCanPoint == '2'){
						/**“不指定人”不能与其它选项同时被选中*/
						if(data.userAccount == -1){
							$('#asid_comp_point').combobox('setValue',-1)
						}else{
							var values = $('#asid_comp_point').combobox('getValues');
							if($.inArray('-1',values)!=-1){
								values.splice($.inArray('-1',values),1);
								$('#asid_comp_point').combobox('setValues', values)
							}
						}
					}
				}
			});
			//默认选择不结束审批
			$('#asid_comp_end').combobox('setValue','0');
        }
        
		if(this.options.type == '2'){
			
			$("#asid_comp_back").parent().parent().css('display','');
			$('#asid_comp_back').attr('disabled',false);
			//选择退回节点
			$("#asid_comp_back").combobox({
				width:180,
				height:26,
				panelHeight:170,
				editable:false,
				missingMessage:'必须选择一个选项',
				valueField:'approvalPathPK',
				textField:'itemName',
				onBeforeLoad: function(param){
				}
			});
		}
    },
    
    /**
 	 * 设置默认数据
 	 **/
    initData: function() {
        var thisObj = this;
        //初始化未审批节点数据源
        if(this.options.type == '1'){
        	this.addLoadingLayout('正在获取审批节点数据，请稍候...');
	        Ajax.service('ApprovalBO', 'getBeInProcess',[this.options.curApproveNode.approvalPathPK] , 
				function(data) {
					thisObj.removeLoadingLayout()
					thisObj.nextNodeData = data;
					//设置"选择跳转节点"控件的数据源
					if(thisObj.options.curApproveNode.isCanNode == '1'){
						//添加"不指定"选项,并设置为默认
						var datasource = [{itemName:'不指定节点',pk:'-1'}];
						$.merge(datasource,data);
						$('#asid_comp_nextnode').combobox('loadData',datasource);
						$('#asid_comp_nextnode').combobox('setValue','-1');
						$('#asid_comp_point').combobox('setValue','-1');
					}
					
					
					//不用选择下一审批节点而需要选择下一审批人时，调用“允许审批人账号”接口，获取下一审批人信息
					if(thisObj.options.curApproveNode.isCanNode == '0' && thisObj.options.curApproveNode.isCanPoint != '0'){
						thisObj.updatePersonData(data[0].pk);
					}
					
				},
				function(){
					thisObj.removeLoadingLayout();
					top.layer.alert('获取数据出现问题了，请联系管理员。',{closeBtn :2,icon:5});
				}
			);
        }
        //初始化已审批节点数据源
        else{
        	var datasource = new Array;
        	datasource[0] = {itemName:'不退回',approvalPathPK:'-1'};
        	datasource[1] = {itemName:'退回到申请人',approvalPathPK:'-2'};
        	$.each(this.options.approvalData,function(n,info) {
        		//不显示非本单位节点和外部节点
        		if(info.linkOrgCode != thisObj.userOrgCode || info.approvalPathLX == '1') return;
        		//遇到未审批节点则跳出
        		if(info.approvalStuts == '0') return false;

        		datasource.push({itemName:info.itemName,approvalPathPK:info.approvalPathPK})
        	});
        	$('#asid_comp_back').combobox('loadData',datasource);
			$('#asid_comp_back').combobox('setValue','-1');
        }
    },
    
    /**
	 * 初始化设置window
 	 **/
    initWindow: function() {
        var thisObj = this;
        if(this.options.type == '1'){
        	this.alertwindow = layer.open({
	            type: 1,
	            title: '审批流程选择',
	            area: ["320px", "228px"],
	            shift: 1,
	            closeBtn: 2,
	            btn : [ '确定', '取消' ],
	            content: $("#asid_div_alertpanel"),
	            yes : function(index) {
	            	thisObj.sure();
	            },
	            cancel: function() {
	                thisObj.windowClose();
	            }
	        });
        }else{
	        this.alertwindow = layer.open({
	            type: 1,
	            title: '退回节点选择',
	            area: ["320px", "148px"],
	            shift: 1,
	            closeBtn: 2,
	            btn : [ '确定', '取消' ],
	            content: $("#asid_div_alertpanel"),
	            yes : function(index) {
	            	thisObj.sure();
	            },
	            cancel: function() {
	                thisObj.windowClose();
	            }
	        });
        }
        
        //修改遮罩层属性，使其z-index低于多选控件下拉框的z-index
        $("[id^=layui-layer]").css('z-index',8999);
        $("[id^=layui-layer-shade]").css('z-index',8998);
    },
	
    /**
 	 * 关闭选择窗口的处理
 	 **/
    windowClose: function() {
        layer.close(this.alertwindow);
    },
	
    /**
 	 * 关闭选择窗口的处理
 	 **/
    sure: function() {
    	/** 校验 */
    	if(!$("#asid_div_alertpanel").form('validate'))return;
    	
    	/** 选择下一审批信息保存 */
    	if(this.options.type == '1'){
    		/** 获取结果 */
    		var isEnd = '0';//是否结束审批 不结束
		  	var nextNode = "";//下个审批节点 默认不指定
		  	var nextPerson = "";//下个审批人 默认不指定
		  	if(this.options.curApproveNode.isCanEnd == '1'){
		  		isEnd = $('#asid_comp_end').combobox('getValue');
        	}
        	if(this.options.curApproveNode.isCanNode == '1' && $('#asid_comp_nextnode').combobox('getValue') != '-1'){
        		nextNode = $('#asid_comp_nextnode').combobox('getValue');
        	}
        	//不可以指定或不指定时，默认接下来的审批节点
        	else{
        		nextNode = this.nextNodeData[0].pk;
        	}
        	if(this.options.curApproveNode.isCanPoint != '0' && $('#asid_comp_point').combobox('getValue') != '-1'){
        		if(this.options.curApproveNode.isCanPoint == '1'){
	        		nextPerson = $('#asid_comp_point').combobox('getValue');
        		}else if(this.options.curApproveNode.isCanPoint == '2'){
        			var values = $('#asid_comp_point').combobox('getValues');
        			if(values.length == 0){
        				top.layer.alert('请选择一个审批人',{shadeClose:true,closeBtn :2,icon:7});
        				$('#asid_comp_point').combobox('setValue','-1');
        				return;
        			}
        			$.each(values,function(n,value) {
        				nextPerson += '|' + value;
        			});
        			nextPerson = nextPerson.substring(1);
        		}
        	}
        	/** 组装结果并回调 */
        	var result = new Object;
        	result.isEnd = isEnd;
        	result.nextNode = nextNode;
        	result.nextPerson = nextPerson;
        	this.windowClose();
        	this.options.alertpanelCallBack(result);
    	}
    	/** 选择退回节点保存 */
    	else{
    		var nextNode = $('#asid_comp_back').combobox('getValue');
    		//不退回为空
    		if(nextNode == "-1"){
		  		nextNode = "";
		  	}
		  	//退回申请人为0
		  	else if(nextNode == "-2"){
		  		nextNode = "0";
		  	}
		  	this.windowClose();
		  	this.options.alertpanelCallBack(nextNode);
    	}
    },
    
    /**
 	 * 启用or禁用下拉选择控件，用于页面初始化后，启用时会添加必填属性，禁用时会去除必填属性并选中默认项
 	 * @param id 控件id
 	 * @param enable 是否启用，true:启用 false:禁用
 	 **/
    enableComponent: function(id,enable) {
    	if(enable){
    		$('#'+id).combobox('enable');
    	}else{
    		$('#'+id).combobox('disable');
	    	$('#'+id).combobox('setValue','-1');
    	}
    },
    
    /**
 	 * 更新"指定审批人"控件的数据源
 	 **/
    updatePersonData: function(strPathPK) {
    	//路径pk不正确时，清空数据源并设置"不指定"为默认
		if(strPathPK==null || strPathPK=='-1' || strPathPK==''){
			$('#asid_comp_point').combobox('loadData',[{userName:'不指定人',userAccount:'-1'}]);
			$('#asid_comp_point').combobox('setValue','-1');
			return;
		}
		var thisObj = this;
		this.addLoadingLayout('正在获取审批人数据，请稍候...');
    	Ajax.service('ApprovalBO', 'getCanApprovalPerson',[strPathPK,[this.options.menuId,this.options.busiOrgCode,this.options.busiDeptCode]] , 
			function(data) {
				thisObj.removeLoadingLayout();
				//添加"不指定"选项,并设置为默认
				var datasource = [{userName:'不指定人',userAccount:'-1'}];
				$.merge(datasource,data);
				$('#asid_comp_point').combobox('loadData',datasource);
				$('#asid_comp_point').combobox('setValue','-1');
			},
			function(){
				thisObj.removeLoadingLayout();
				top.layer.alert('获取数据出现问题了，请联系管理员。',{closeBtn :2,icon:5});
			}
		);
    },
    addLoadingLayout:function(msg){
    	$("#asid_div_alertpanel").parent().parent().addLoading({z:100000,msg:msg});
    },
    removeLoadingLayout:function(){
    	$("#asid_div_alertpanel").parent().parent().removeLoading();
    }
}
