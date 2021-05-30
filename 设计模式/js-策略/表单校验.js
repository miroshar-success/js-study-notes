const submit = document.querySelector('.submit');
const username = document.querySelector(".username");
const password = document.querySelector(".password");
const telephone = document.querySelector(".telephone");

// submit.addEventListener('click',function(event){
// 	event = event || window.event;
// 	if(!username.value.trim().length){
// 		window.alert("用户名不能为空");
// 		return false;
// 	}
// 	if(password.value.trim().length < 6){
// 		window.alert("密码长度不能小于6");
// 		return false;
// 	}
// 	if( !/(^1[3|5|7|8|9][0-9]{9}$)/.test(telephone.value.trim()) ){
// 		window.alert('手机号码格式不正确');
// 		return false;
// 	}
// 	console.log('注册成功');
// },false);


// 使用策略模式改写表单校验
var strategies = {
	isNonEmpty:function(value,errorMsg){
		if(value == ""){
			return errorMsg;
		}
	},
	minLength:function(value,length,errorMsg){
		if(value.length < length){
			return errorMsg;
		}
	},
	isMobile:function(value,errorMsg){
		if( !/(^1[3|5|8|9][0-9]{9}$)/.test(value) ){
			return errorMsg;
		}
	}
}

var Validator = function(){
	this.cache = [];
}
Validator.prototype.add = function(dom,rule,errorMsg){
	var ary = rule.split(":");
	this.cache.push(function(){
		var strategy = ary.shift();
		ary.unshift(dom.value);
		ary.push(errorMsg);
		return strategies[strategy](dom.value,errorMsg);
		/*return strategies[strategy].apply(dom,ary);*/
	})
}

Validator.prototype.start = function(){
	for(let i = 0, validatorFunc; validatorFunc = this.cache[i++];){
		var msg = validatorFunc();
		if(msg){
			return msg;
		}
	}
}

submit.addEventListener('click',function(event){
	var validator = new Validator();
	validator.add(username,'isNonEmpty','用户名不能为空');
	validator.add(telephone,'isMobile','手机号码格式不对');
	var errorMsg = validator.start();
	console.log('error:',errorMsg);
},false);