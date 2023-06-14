# UIEvent
    
    UIEvent接口表示简单的用户界面事件.UIEvent是从Event派生出来的。某些接口是这个的直接或间接后代:
        MouseEvent TouchEvent FocusEvent KeyboardEvent WheelEvent InputEvent CompositionEvent

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

    0       这个事件,没有事件正在被处理
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

# 1. 事件

    在同一个元素上面绑定不同类型的事件没有冲突,绑定同一类型的事件后面的会覆盖。

# 2. 事件监听

    EventTarget.addEventListener()

    1. 它允许给一个事件注册多个监听器。 特别是在使用AJAX库，JavaScript模块，或其他需要第三方库/插件的代码。
    2. 它提供了一种更精细的手段控制 listener 的触发阶段。（即可以选择捕获或者冒泡）。

    移除事件监听:
    removeEventListener()

    element.attachEvent(event,function);
    element.detachEvent(event,function);
