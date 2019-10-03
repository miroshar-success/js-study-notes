
# Document.execCommand()
		
	设计模式：有些命令需要在设计模式开启下才可以使用
	document.designMode = 'on'
	
	document.execCommand('selectAll')		全选
	document.execCommand('copy')			复制
	document.execCommand('cut')				剪切
	document.execCommand('delete')			删除
	
	修改字体
	document.execCommand('foreColor',true,'#f00');
	
# 自定义事件
	
	
```js
// create Event
const event = new Event('build');

// listen
elem.addEventListener('build',function(){
	console.log('触发了自定义事件');
},false);

// Dispatch the event
elem.dispatchEvent(event);
```

## 添加自定义数据

	CustomEvent
	
```js
elem.addEventListener('build',function(e){
	console.log(e);	// 
},false);

const event = new CustomEvent('build',{
	detail:{
		fitstName:'Kyrie',
		lastName:'irving'
	}
})
```