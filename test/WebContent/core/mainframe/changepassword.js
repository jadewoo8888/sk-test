var oldpasswordInfo = "请输入旧密码,忘记密码请联系管理员";
var newpasswordInfo = "3-16位，由大小写字母、数字、符号(除空格)组成";
var verifypasswordInfo = "请再次输入新密码,确保与新密码一致";
var oldpasswordInfotipIndex = null;
var newpasswordInfotipIndex = null;
var verifypasswordInfotipIndex = null; 

$(function() {
	//添加提示
    addTips();
    /** 输入框去掉空格 **/
    $("td input").bind('keyup',
    function() {
        this.value = this.value.replace(/^ +| +$/g, '');
    });

    /** 触发提交事件 **/
    $("#id_btn_submit").click(function() {
    	changeBtnDisabled(true);
        if (checkBeforeSave()) {
            save();
        } else {
        	changeBtnDisabled(false);
        }
    });
    /**取消关闭窗口 **/
    $("#id_btn_cancel").click(function() {
        closeFrameWindow();
    });
    /** 新密码输入框焦点 **/
    $('#newPassword').focus(function() {
        $('#pwdLevel_1').attr('class', 'ywz_zhuce_hongxian');
        $('#newPassword').keyup();
    });
    /** 监听新密码键盘输入 **/
    
	$('#newPassword').keyup(function () {
		var __th = $(this);
		if (!__th.val()) {
        	Primary();
            return;
		}
		if (__th.val().length < 6) {
			Weak();
			return;
		}
		var _r = checkPassword(__th);
		if (_r < 1) {
        	Primary();
        	return;
       	}

       	if (_r > 0 && _r < 2) {
        	Weak();
		} else if (_r >= 2 && _r < 4) {
        	Medium();
		} else if (_r >= 4) {
        	Tough();
       	}
    });
});

/**
 * 为输入框添加各种提示处理方法
 **/
function addTips() {
$("#newPassword").bind('mouseover',
    function() {
        newpasswordInfotipIndex = layer.tips(newpasswordInfo, "#newPassword", {
            tips: 3
        }); 
    });
    $("#newPassword").bind('click',
    function() {
        if (newpasswordInfotipIndex != null) {
            layer.close(newpasswordInfotipIndex);
        }
    });

    $("#newPassword").bind('mouseout',
    function() {
        layer.close(newpasswordInfotipIndex);
    });

    $("#oldPassword").bind('mouseover',
    function() {
        oldpasswordInfotipIndex = layer.tips(oldpasswordInfo, "#oldPassword", {
            tips: 3
        });
    });

    $("#oldPassword").bind('click',
    function() {
        if (oldpasswordInfotipIndex != null) {
            layer.close(oldpasswordInfotipIndex);
        }
    });

    $("#oldPassword").bind('mouseout',
    function() {
        layer.close(oldpasswordInfotipIndex);
    });

    $("#verifyPassword").bind('mouseover',
    function() {
        verifypasswordInfotipIndex = layer.tips(verifypasswordInfo, "#verifyPassword", {
            tips: 3
        });
    });

    $("#verifyPassword").bind('click',
    function() {
        if (verifypasswordInfotipIndex != null) {
            layer.close(verifypasswordInfotipIndex);
        }
    });

    $("#verifyPassword").bind('mouseout',
    function() {
        layer.close(verifypasswordInfotipIndex);
    });

}

/** 密码强度相关代码 **/
function Primary() {
    $('#pwdLevel_1').attr('class', 'ywz_zhuce_huixian');
    $('#pwdLevel_2').attr('class', 'ywz_zhuce_huixian');
    $('#pwdLevel_3').attr('class', 'ywz_zhuce_huixian');
}

function Weak() {
    $('#pwdLevel_1').attr('class', 'ywz_zhuce_hongxian');
    $('#pwdLevel_2').attr('class', 'ywz_zhuce_huixian');
    $('#pwdLevel_3').attr('class', 'ywz_zhuce_huixian');
}

function Medium() {
    $('#pwdLevel_1').attr('class', 'ywz_zhuce_hongxian');
    $('#pwdLevel_2').attr('class', 'ywz_zhuce_hongxian2');
    $('#pwdLevel_3').attr('class', 'ywz_zhuce_huixian');
}

function Tough() {
    $('#pwdLevel_1').attr('class', 'ywz_zhuce_hongxian');
    $('#pwdLevel_2').attr('class', 'ywz_zhuce_hongxian2');
    $('#pwdLevel_3').attr('class', 'ywz_zhuce_hongxian3');
}

function checkPassword(pwdinput) {
	var maths, smalls, bigs, corps, cat, num;
	var str = $(pwdinput).val();
	var len = str.length;

	var cat = /.{16}/g
	if (len == 0) return 1;
	if (len > 16) { $(pwdinput).val(str.match(cat)[0]); }
	cat = /.*[\u4e00-\u9fa5]+.*$/
	if (cat.test(str)) {
		return -1;
	}
	cat = /\d/;
	var maths = cat.test(str);
	cat = /[a-z]/;
	var smalls = cat.test(str);
  	cat = /[A-Z]/;
  	var bigs = cat.test(str);
	var corps = corpses(pwdinput);
	var num = maths + smalls + bigs + corps;

	if (len < 6) { return 1; }
	if (len >= 6 && len <= 8) {
    	if (num == 1) return 1;
    	if (num == 2 || num == 3) return 2;
     	if (num == 4) return 3;
	}

	if (len > 8 && len <= 11) {
		if (num == 1) return 2;
		if (num == 2) return 3;
		if (num == 3) return 4;
		if (num == 4) return 5;
	}

	if (len > 11) {
		if (num == 1) return 3;
		if (num == 2) return 4;
		if (num > 2) return 5;
	}
}

function corpses(pwdinput) {
	var cat = /./g
	var str = $(pwdinput).val();
	var sz = str.match(cat)
	for (var i = 0; i < sz.length; i++) {
		cat = /\d/;
		maths_01 = cat.test(sz[i]);
		cat = /[a-z]/;
      	smalls_01 = cat.test(sz[i]);
     	cat = /[A-Z]/;
       	bigs_01 = cat.test(sz[i]);
       	if (!maths_01 && !smalls_01 && !bigs_01) { return true; }
       	}
	return false;
}

function closeFrameWindow() {
    var index = top.layer.getFrameIndex(window.name);
    top.layer.close(index);
}

/**
 * 保存前检查，检查是否能发送后台请求，若不能则提示相应信息
 * @return false:检查不通过 true：通过
 **/
function checkBeforeSave() {
    if ($("#oldPassword").val() == '') {
        layer.tips(oldpasswordInfo, "#oldPassword", {
            tips: 3
        });
        return false;
    }
    if ($("#newPassword").val().length < 3 || $("#newPassword").val().length > 16) {
        layer.tips(newpasswordInfo, "#newPassword", {
            tips: 3
        });
        return false;
    }
    if ($("#verifyPassword").val() != $("#newPassword").val()) {
        layer.tips(verifypasswordInfo, "#verifyPassword", {
            tips: 3
        });
        return false;
    }
    return true;
}

/**
 * 保存
 **/
function save() { 
    var oldPassword = hex_md5($("#oldPassword").val());
    var newPassword = hex_md5($("#newPassword").val());
    $('body').addLoading({msg: '正在更改密码，请稍后...'});
    Ajax.service('UserBO', 'changePassword', [top.strUserAccount,oldPassword, newPassword], saveResult,saveFailure);
}

/**
 * 保存后返回结果处理
 **/
function saveResult(data) {
	changeBtnDisabled(false);
	$('body').removeLoading();
    if (data == 'null' || data == '') {
        layer.open({
            title: '信息',
            icon: 6,
            closeBtn: 2,
            area: ['300px', '180px'],
            btn: ['确定'],
            content: "密码修改成功，请谨记密码。若忘记密码，请联系管理员！",
            yes: function(index) {
                layer.close(index);
                closeFrameWindow();
            }
        });
    } else {
        layer.open({
            title: '信息',
            icon: 5,
            closeBtn: 2,
            area: ['230px', '200px'],
            btn: ['确定'],
            content: data,
            yes: function(index) {
                layer.close(index);
            }
        });
    }
}

/**
 * 保存失败处理方法
 **/
function saveFailure(xmlHttpRequest, textStatus, errorThrown) {
	changeBtnDisabled(false);
	$('body').removeLoading();
	layer.open({
            title: '信息',
            icon: 5,
            closeBtn: 2, 
            area: ['230px', '200px'],
            btn: ['确定'],
            content: '更改密码出现了错误，请联系管理员',
            yes: function(index) {
                layer.close(index);
            }
     });
}
