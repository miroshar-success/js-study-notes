
# Navigator.getUserMedia

	Navigator.getUserMedia()方法提供用户需要使用音频视频输入设备,比如相机,屏幕共享,或者麦克风
	如果用户给与许可,successCallBack回调就会被调用，MediaStream对象作为回调函数的参数。如果用户拒绝
	许可或者没有媒体可用，errorCallback就会被调用。
	
	Note: 此API已更名为 MediaDevices.getUserMedia()。 
```js
1. 第一种方法调用摄像头：ES5的方式，需要传入3个参数

window.navigator.getUserMedia({audio:true,video:true},function(){
	
},function(){
	
});
```
	tips:
	1. 这个函数功能,只能在localhost或者是https方式才可以使用。
	2. 页面显示拍摄的内容 2.1 video  2.2 canvas
	3. navigator.getUserMedia()必须要传入三个参数,否则会报错
	4. 当用户拒绝访问设备是返回DOMException 

## Permission

    在一个可以安装app中使用 getUserMedia()，需要在manifest文件中指定一个或者多个条目:
```json
"permissions":{
  'audio-capture':{
    'description':"Required to capture audio using getUserMedia()",
  },
  "video-capture": {
    "description": "Required to capture video using getUserMedia()"
  }
}
```

# MediaDevices.getUserMedia()

    MediaDevices.getUserMedia() 会提示用户给予使用媒体输入的许可。媒体输入会产生一个MediaStream,里面包含了请求的媒体类型的轨道。
    可以包含一个视频轨道 一个音频轨道或其他轨道类型。
    
    返回一个Promise对象,成功后会resolve回调一个MediaStream对象。若对象拒绝了使用权限或者媒体源不可用。promise会reject
    回调一个PermissionDeniedError或者NotFoundError。
    
    const promise = window.navigator.mediaDevices.getUserMedia(constraints);
```js
// constraints:    
{video:true,audio:true}  // 必须填写一个
    
 // 应用想要使用1280X720的摄像头分辨率:
{
    audio:true,
    video:{
        width:1280,
        height:720
    }
}
```

        
    在使用video标签显示 视频流时 video.src = URL.createObjectURL(stream)
    tips: 报错  Failed to execute createObjectURL on 'URL'    
    
    Chrome升级后不再支持这种写法,需要修改为: video.srcObject = stream;
    
    ## 强烈要求获取指定的尺寸时: 可以使用关键字 min,max 或者 exact(min == max)
```js
{
    autio:true,
    video:{
        width:{min:1280},height:{min:720}
    }
}
```

    
    ideal 关键字： 当请求包含一个ideal（应用最理想的）值时，这个值有着更高的权重
```js
{
  audio: true,
  video: {
    width: { min: 1024, ideal: 1280, max: 1920 },
    height: { min: 776, ideal: 720, max: 1080 }
  }
}
```

## 前置/后置摄像头

	给video传递一个对象,(默认是前置的);
	video:{
		facingMode:"user/environment"		
	}
```js
window.navigator.MediaDevices.getUserMedia({video:{ 
	facingMode:'user' // 前置摄像头
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
