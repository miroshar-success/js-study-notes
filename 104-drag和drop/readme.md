
# 拖拽
    
    JS拖拽:
        JS里拖拽三事件： onmousedown onmousemove onmouseup 可以实现交互性效果,根据鼠标的移动位置让标签元素移动
        
    H5拖拽:
        1. 被拖动元素需要添加 draggable = true 属性
        2. 图片默认可被拖拽
     
    H5拖拽的7个事件:   
    被拖动元素的事件
        1. ondragstart  开始拖动
        2. ondrag       拖动中
        3. ondragend    拖动结束
        
    目标元素的事件
        1. ondragenter  进入目标元素
        2. ondragover   在目标元素中拖动
        3. ondragleave  离开目标元素
        4. ondrop       目标元素
        
        
     draggable=true 设置文件可以被拖拽

# dataTransfer
    
    在进行拖放操作时,DataTransfer对象用来保存,通过拖放动作，拖到浏览器的数据。它可以保存一项或多项数据。
    一种或者多种数据类型。
    
    这个对象可以从所有拖动事件drag events的 dataTransfer属性上获取，但是不能单独创建。
    
## 方法

    setData(type,data)
    getData(type,data);
    
    tips:
        兼容Firefox
    在ondragstart 事件的时候，给每个被拖动元素设置一个 属性
        dragElement.dataTransfer.setData(key,value);
    
    setDragImage()
        自定义一个期望的拖动时的图片。大多数情况下，这项不用设置，因为被拖动的节点被创建成默认图片。
        
    obj.setDragImage(imgElement,offsetX,offsetY);
    
# FileReader

    let reader = new FileReader();
    使用FileReader()构造器去创建一个新的FileReader.
    
# FileList
    
    通过使用在HTML5中加入到DOM的文件API,使在web内容中让用户选择本地文件然后读取这项文件的内容成为可能。
    用户可以通过HTML中的<input>元素或者是通过拖拽来选择本地文件。
    
    被拖动的元素是一个FileList数组对象,每一项都是File对象    
    
    
![files](https://developer.mozilla.org/zh-CN/docs/Web/API/File/Using_files_from_web_applications)



