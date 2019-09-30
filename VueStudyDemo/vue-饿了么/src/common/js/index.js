export function formDate(date,formstr){
	if(/(y+)/.test(formstr)){
		formstr = formstr.replace(RegExp.$1,(date.getFullYear()+"").substring(4-RegExp.$1.length));
	}
	let obj = {
		"M+":date.getMonth() + 1,
		"d+":date.getDate(),
		"h+":date.getHours(),
		"m+":date.getMinutes(),
		"s+":date.getSeconds()
	}
	for(let key in obj){
		if(new RegExp(`(${key})`).test(formstr)){
			let str = obj[key] + "";
			formstr = formstr.replace(RegExp.$1,(RegExp.$1.length===1)?str:padLeftZero(str) );
		}
	}
	return formstr
}

function padLeftZero(str){
	return ("00"+str).substring(str.length);
}



/*
将上面的写法复习一遍
yyyy-MM-dd hh:mm  将时间戳转换成 这种形式的日期,利用正则表达式匹配替换
*/
export function MyFormDate(date,fmt){
	// 如果匹配到了,则将yyyy字符串替换为具体的年份
	if(/(y+)/.test(fmt)){
		fmt = fmt.replace(RegExp.$1,(date.getFullYear()+"").substring(4-RegExp.$1.length));
	}
	let DateObject = {
		"M+":date.getMonth() + 1,
		"d+":date.getDate(),
		"h+":date.getHours(),
		"m+":date.getMinutes(),
	}
	for(let key in DateObject){
		if( new RegExp(`(${key})`).test(fmt) ){
			let str = DateObject[key] + "";
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padZero(str) );
		}
	}
	return fmt;
}
/*
如果传入的 时间字符串 是一个字符, 则直接将 M d h m 等替换成对应的时间就可以了,
如果传入的是两个字符,则月份 或者 小时 分钟小于10的 需要在前面补0. 
*/
function padZero(str){
	return ("00" + str).substring(str.length);
}