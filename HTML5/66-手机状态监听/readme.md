
# Online/Offline

	为了构建一个支持离线的web应用,你需要知道你的应用何时真正处于离线状态。同时,你还需要知道应用何时重新回到了
	[在线状态]。
	
	
	online		有网
	offline		没有网

	
	navigator.onLine
		navigator.onLine是一个值为true/false(true表示在线,false表示离线)的属性。
		
## [online]与[offline]事件

	当浏览器从在线与离线状态中切换时,这两个事件会在页面的<body>上触发。此外，该事件会从document.body
	冒泡到document上，最后到达window。两个事件都无法被取消！
	
	1. 在window或document或document.body上使用addEventListener
	2. 在document或document.body的. ononline或.onoffline属性设置为一个JavaScript Function对象。
	不能使用 window.ononline或window.onoffline。
	
	
# visibilitychange
#  
	当用户最小化窗口或切换到另一个选项卡时，API会发送visibilitychange 事件，让听众知道页面状态已更改！
	浏览器标签页被隐藏或显示的时候会触发visibilitychange 事件！
```js
document.addEventListener('visibilitychange',function(){
	console.log(document.visibilityState)
},false);
```
	当页面不可见的时候显示 hidden,可以时显示 visibility!
	
	
## Document.visibilityState
	
	Document.visibilityState(只读属性),返回document的可见性,即当前可见元素的上下文环境。可能的值:
		
		'visible': 此时页面内容至少是部分可见，即此页面在前景标签页中,并且窗口没有最小化
		'hidden':  此时页面对用户不可见,即文档出处于背景标签页或者窗口处于最小化状态,或者操作系统正处于
		'锁屏状态'.
		'prerender': 页面此时正在渲染中
		'unloaded':	页面从内存中卸载清楚
		
# window.navigator.getBattery()

	getBattery()方法返回了系统的电量信息，返回一个battery的promise对象，然后resolve后得到BatteryManager对象。
	它提供了一些新的事件，以及方法供您监控电池的状态。
	
```js
window.navigator.getBattery()
.then(function(data){
	console.log(data);
});
```
	data返回的是一个BatteryManger对象
	{
		charging:true,					一个布尔值,表示当前电池是否正在充电
		chargingTime:Infinity,			充电完毕需要的时间
		dischargingTime:Infinity,		剩余电量可用时间
		level:0.97						电量百分比
	}
	
# window.navigator.vibrate()
	
	Navigator.vibrate()方法使设备(有震动硬件)产生有频率的振动。若某震动方法已经在进行中,则前一个震动方式停止,
	新的取而代之。
	
	若因为提供无效的参数使得无法使设备震动，它将返回false,否则返回true。
```js
const successBool = window.navigator.vibrate(pattern);
```
	pattern:
	1. 一个值表示交替震动的毫秒数。
	2. 一个包含整数的数组表示交替的震动、暂停、震动
	
	为了防止被恶意使用，不能直接调用，需要click里面才可以使用！