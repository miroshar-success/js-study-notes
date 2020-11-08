# Document.execCommand()
    
    当一个HTML文档切换到设计模式时,document暴露execCommand方法,该方法允许运行命令来操作可编辑内容区域的元素
    tips: 已废弃
        
	设计模式：有些命令需要在设计模式开启下才可以使用
	document.designMode = 'on'
	
	document.execCommand('selectAll')		选中编辑区里的全部内容。
	document.execCommand('copy')			复制
	document.execCommand('cut')				剪切
	document.execCommand('delete')			删除
	
	修改字体
	document.execCommand('foreColor',true,'#f00');
	
# 自定义事件
	
	Event.createEvent()     // 不建议
	建立一个新的事件,该事件必须先以其init() method 初始化才行
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

	CustomEvent 创建一个自定义事件
	
	Syntax语法:
    event = new CustomEvent(typeAry,customEventInit);
        typeArg: 一个自定义事件名称
        customEventInit:
            detail: 传入自定义数据
            bubbles: 表示事件能否冒泡
            cancelable: 表示该事件是否可以取消
```js
elem.addEventListener('build',function(e){
	console.log(e.detail);	// 
},false);

const event = new CustomEvent('build',{
	detail:{
		fitstName:'Kyrie',
		lastName:'irving'
	}
});
elem.dispatchEvent(event);
```

# window.getSelection()
    
    Selection对象表示用户选择的文本范围或插入符号的当前位置。它代表页面中的文本选区，可能横跨多个元素。
    
        anchor: 用户开始选择的地方
        focus:  用户结束选择的地方
    
    const selection = window.getSelection();
        调用Selection.toString()方法会返回被选中区域中的纯文本。
    
    selection是一个Selection对象。如果想要将selection转换为字符串，可以通过连接一个空字符串"" 或者使用
    String.toString()方法。
       
    也可以使用document.getSelection() 两个方法等价
    
## Selection
    
    属性
        anchorNode: 返回该选区起点所在的节点(Node)
        anchorOffset: 选区起点在 anchorNode 中的位置偏移量
        focusNode :返回该选区终点所在的节点
        focusOffset: 其表示的是选区终点在 focusNode 中的位置偏移量
        isCollapsed: 返回一个布尔值，用于判断选区的起始点和终点是否在同一个位置
        rangeCount: 返回该选区所包含的连续范围的数量
    
    方法：
        toString()
        返回当前选区的纯文本内容
    
    
    
    
    
    
    
    
    
    
    
    
    