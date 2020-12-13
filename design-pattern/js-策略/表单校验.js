const submit = document.querySelector('.submit');
const username = document.querySelector(".username");
const password = document.querySelector(".password");
const telephone = document.querySelector(".telephone");

submit.addEventListener('click',function(event){
	event = event || window.event;
	if(!username.value.trim().length){
		window.alert("用户名不能为空");
		return false;
	}
	if(password.value.trim().length < 6){
		window.alert("密码长度不能小于6");
		return false;
	}
	if( !/(^1[3|5|7|8|9][0-9]{9}$)/.test(telephone.value.trim()) ){
		window.alert('手机号码格式不正确');
		return false;
	}
	console.log('注册成功');
},false);


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

