
# 1. contextmenu

    右键菜单

    
# 2. 事件冒泡和默认行为

    e.stopPropagation()
    IE: e.cancelBubble = true;

    e.preventDefault()
    e.returnValue = false;


    e.defaultPrevented      是否设置了阻止事件默认行为

# 3. eventPhase

    表示事件流当前处于哪一个阶段

    0       这个时间,没有事件正在被处理
    Event.NONE

    1       事件正在被目标元素的祖先对象处理,从window开始,然后Document,然后是
    HTMLHtmlElement,直到目标元素的父元素.
    Event.CAPTURING_PHASE

    2       事件对象已经抵达the event target.
    Event.AT_TARGET

    3       事件对象逆向向上传播回目标元素的祖先元素,从父元素开始,并且最终到达包含
    元素window.
    Event.BUBBLING_PHASE

# 4. relatedTarget

    mouseover和mouseout事件中添加了relatedTarget属性,在mouseover事件中,它表示鼠标来自哪个元素,在mouseout事件中,它指向鼠标去往的那个元素.

    在Microsoft中添加了两个属性:
        fromElement:在mouseover事件中表示鼠标来自哪个元素
        toElement:在mouseout事件中指向鼠标去往的那个元素

