# 拖拽
	
	任何元素都可以拖放,为了让元素可以拖放,需设置 draggable=true
	
	1. 被拖动元素的三个事件
		ondragstart		开始拖拽，拖动的一瞬间
	tips:
	1. 兼容FIrefox浏览器时,需要在dragstart事件设置拖拽数据
		event.dataTransfer.setData('key','value');
	
		ondrag			拖拽中
		ondragend		拖拽结束
		
	2. 目标元素的四个事件
		ondragenter		进入目标元素的时候触发(临界点是鼠标进入目标元素,只触发一次);
		ondragover		在目标元素上的时候触发,不停的触发
		ondragleave		离开目标元素的时候触发
		ondrop			放置被拖动的元素
		
	tips:
	1. 阻止默认事件在 ondragover阶段

# DragEvent
	
	是一个表示拖，放交互的一个DOM event接口。用户通过将指针设备放置在触摸表面上并且然后将指针拖动到新位置
	来发起拖动。
	
	DragEvent.dataTransfer
	在拖放交互期间传输的数据。
	
	事件类型：
		drag
		dragend
		dragenter
		dragexit
		dragleave
		dragover
		dragstart
		drop
	
	DragEvent.files
	包含一个在数据传输上所有可用的本地文件列表。此属性访问指定的FileList中无效的索引将返回未定义。
	
## FileList
	
	一个FileList对象通常来自于一个HTML input元素的files属性。可以通过这个对象访问到用户所选择的文件。
	通过files属性获得的是一个FileList对象数组,它的每个元素都是File对象,可以通过(name,size,type)等属性对
	每个元素进行访问。
	
	
	files.name			文件的名字
	files.item[index]	选择第index个文件
	file.size			返回文件的大小