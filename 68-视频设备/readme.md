
# Navigator.getUserMedia

	Navigator.getUserMedia()方法提供用户需要使用音频视频输入设备,比如相机,屏幕共享,或者麦克风
	如果用户给与许可,successCallBack回调就会被调用，MediaStream对象作为回调函数的参数。如果用户拒绝
	许可或者没有媒体可用，errorCallback就会被调用。
	
```js
1. 第一种方法调用摄像头：ES5的方式，需要传入3个参数

window.navigator.getUserMedia({audio:true,video:true},function(){
	
},function(){
	
});

2. 第二种调用摄像头的方法：ES6 可以使用then和catch
window.navigator.mediaDevices.getUserMedia({video:true})
.then(function(stream){
	console.log(stream);
})
.catch(function(error){
	console.log(error);
})
```
	tips:
	1. 这个函数功能,只能在localhost或者是https方式才可以使用。
	2. 页面显示拍摄的内容 2.1 video  2.2 canvas
	3. navigator.getUserMedia()必须要传入三个参数,否则会报错
	4. 当用户拒绝访问设备是返回DOMException 

## 前置/后置摄像头

	给video传递一个对象,(默认是前置的);
	video:{
		facingMode:"user/environment"		
	}
```js
window.navigator.MediaDevices.getUserMedia({video:{ 
	ficingMode:'user'
}}).then( stream =>{
	console.log(stream);
})
.catch(function(err){
	console.log(err);
})
```

# Navigator.MediaDevices.getUserMedia(constraints)
	
	会提示用户给与使用媒体输入的许可，媒体输入产生一个MediaStreaM,里面包含了媒体的轨道。
	它返回一个Promise对象，成功后会resolve回调一个MediaStream对象

## 参数constraints
	
	该参数包含了video和audio两个成员的MediaStreamConstraints对象，用于说明请求的媒体类型。必须至少一个类型
	或者两个同时可以被指定。
	
	1. 不带任何参数的音频和视频 {audio:true,video:true}
	2. 带有参数 {audio:true,video:{
		width:1280,
		height:700
	}},
	3. 前置摄像头 {video:{
		facingMode:'user'
	}}
	4. 后置摄像头 {video:{
		facingMode:'environment'
	}}
	5. 帧率 frameRate:{
		ideal:10,
		max:15
	}
	
## MediaStream
	
	MediaStream接口是一个媒体内容的流。一个流包含几个轨道，比如视频和音频轨道
	
	属性:
	MediaStream.id 
	包含36个字符的DOMString,用来作为这个对象的唯一标识符
	
## DOMException
	
	该接口代表由于调用方法或访问一个web API属性时的异常事件,这基本上是在web API中如何描述错误情况的
	
	DOMException.message
	DOMException.name
