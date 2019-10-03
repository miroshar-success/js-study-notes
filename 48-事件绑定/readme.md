
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