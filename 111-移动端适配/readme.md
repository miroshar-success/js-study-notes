
# 移动端事件
    
    在移动端,click事件触发有300ms的延迟
    
    ontouchstart    触碰开始事件
    ontouchmove     在屏幕移动时触发
    ontouchend      手指离开屏幕的时候触发
    
    TouchEvent.targetTouches
        一个只读的TouchList列表,含有当前屏幕的所有触摸点所对应的Touch对象。这些点的目标
        元素和触发touchstart事件的目标元素时同一个。
    
    TouchEvent.touches
        一个 TouchList，其会列出所有当前在与触摸表面接触的  Touch 对象，不管触摸点是否
        已经改变或其目标元素是在处于 touchstart 阶段
        
# window.screen 
    
    屏幕的可用宽高,(减去下方状态栏的高度)
    screen.availWidth - 可用的屏幕宽度     
    screen.availHeight - 可用的屏幕高度
    
    screen.width        屏幕的总宽度
    screen.height       屏幕的总高度

    