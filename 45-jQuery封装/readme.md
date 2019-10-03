
# 1. selector

    id
    class
    element
    [div,element,class] 可以传入多个选择器,以逗号分隔开
    ancestor descendant 后代选择器
    prev+next
    prev~siblings
    
    :first  获取第一个元素
    :not    
    :even   偶数(从0开始)
    :odd    奇数
    :eq     查找指定位置的元素
    :gt     查找比索引值大的元素
    :last   匹配最后的元素
    :lt     比所引值小的元素
    :header 选中所有的标题元素
    :animated   匹配对正在执行动画的元素
    :empty  选择子元素为空的
    :has    匹配含有某个选择器的元素
    :parent 查找子元素的父元素 
    :hidden 选取隐藏的元素
        1. 设置为display:none
        2. 带有type='hidden'的表单元素
        3. with 和 height设置为0
        4. 隐藏的父元素
    tips: 该选择器对 visibility:hidden 和opacity:0的元素不起作用  

    [attribute=value]   属性选择器
    :first-child        第一个子元素
    :last-child         最后一个子元素
    li:nth-child(1)     在所有子元素里匹配第一个li元素,如果第一个不是li,则匹配不到     
    li:nth-of-type(1)   在所有的li子元素里匹配第一个li元素

    :input      匹配所有input select textarea button元素
    :password   密码框
    :radio      单选框
    :checkbox   复选框

# 2. Attr

    attr()  设置或返回被选元素的属性值. 如果要设置多个参数,可以传入对象
    removeAttr()    删除某个属性
    addClass        要添加类名
    removeClass()   移除类名
    toggleClass()   切换类名
    html()          设置或返回匹配元素的html内容  能够解析html
    text()          设置或返回匹配元素的内容,不能够解析html
    val()           设置或返回匹配表单元素的value

# 3. CSS

    .css()      设置或返回匹配元素的css样式
    .offset()   返回一个对象,距离父级的left和top,包括margin
    .scrollTop() 
    .height()       设置或返回元素的高度   
    .width()        设置或返回元素的宽度
    .innerHeight    包含padding
    .innerWidth     包含padding
    .outerWidth     包含padding和border
    .outerHeight    包含padding和border
    .outerWidth(true)   包含padding,border和margin
    .outerHeight(true)  包含padding,border和margin

# 4. 文档处理

    append()        在匹配元素内部末尾添加元素
    appendTo()      将匹配的元素添加到另一个指定的元素集合中
    prepend()       在匹配元素内部首位添加元素
    prependTo()     将内容添加到匹配元素内部的首位
    before()        在匹配元素同级的前面添加元素
    after()         在匹配元素同级的后面添加元素
    empty()         删除匹配的元素的子元素
    remove()        从DOM中移除匹配的元素
    clone()         克隆匹配的DOM元素并且选中这些克隆的副本.
    
    detach()        从DOM中删除所有匹配的元素
    tips:这个方法会保留jQuery对象中的匹配的元素,因而可以在将来再使用这些匹配的元素
    detach()会保留所有绑定的事件、附加的数据,这一点与 remove()不同.

```js
// detach方法删除span元素,恢复后点击事件还是可以使用
$(document).ready(function(){
    $('span').click(function(){
        $(this).css('color','red');
    })
    var x = $('span');
    $('.button1').click(function(){
        $('span').detach();
    });
    $('.button2').click(function(){
        $('body').append(x);
    })
});

// remove方法删除span元素后,也可以再恢复,但是点击事件没有了
$(document).ready(function(){
    $('span').click(function(){
        $(this).css('color','red');
    })
    var x = $('span');
    $('.button1').click(function(){
        $('span').remove();
    });
    $('.button2').click(function(){
        $('body').append(x);
    })
});
```

# 5. 筛选

    eq()        返回第n个jQuery对象,从0开始,-1表示最后一个
    first()     第一个元素
    last()      最后一个元素
    hasClass()  检查是否函数某个特定的类
    is()        用于查看选择的元素是否匹配选择器
    has()       检测某个元素是否在另一个元素中
    not()       删除匹配的元素
    children()  子元素,不考虑后代
    find()      子元素,包括后代
    parent()    直接父级
    parents()   所有祖先元素
    siblings()  匹配元素的所有同辈元素的集合

## 5.1. empty()与remove()的区别

    empty是移除标签内的所有节点,包括文本节点
    remove是移除指定的当前节点
```js
<div class='header'>this is header</div>
    this is main 
<div class='footer'>this is fooder</div>

$('.header,.footer').empty()    // div里的内容都被清空了,但div还保留在DOM树上

$('.header,.footer').remove()   // div会被删除
```

# 6. 事件

    bind()              添加一个或多个事件处理程序
    on()                添加一个或多个事件处理程序
    blur()              失去焦点时触发
    focus()             获取焦点时触发
    change()            元素的值改变时,触发change事件失去焦点时change才会触发
    click()             元素被点击时触发
    dblclick()          双击,同一个元素绑定dblclick时,也会触发click事件
    event.currentTarget 冒泡阶段的当前DOM元素
    event.data          event.dat属性包含当前执行的处理程序被绑定时传递到事件方法的可选数据
```js
$('p').each(function(i){
    $(this).on('click',{x:i},function(event){
        console.log( event.data.x );
    })
})
```
    event.isDefaultPrevented()      是否调用了preventDefault();
    event.isPropagationStopped()    
    event.preventDefault()          阻止事件的默认行为
    event.stopPropagation()         阻止事件向上冒泡到DOM树
    event.target                    返回哪个DOM元素触发事件
    event.type                      返回事件类型
    focus   获取焦点时(点击或通过tab键定位到元素时)
    hover() 当鼠标悬停在元素上时触发的两个函数
    tips:如果只指定了一个函数,则mouseover和mouseout都执行他
    keydown                       键盘按下时触发
    keypress                      键盘按下去触发
    keyup                         键盘弹起触发
    mousedown                     鼠标左键按下时
    mouseenter                    鼠标穿过被选元素时触发
    mouseleave                    鼠标指针离开被选元素时
    mousemove                     在指定的元素内移动时触发
    mouseover                     鼠标移入元素触发
    mouseup                       鼠标弹起触发
    mouseout                      鼠标离开元素触发
    off()                         解除通过on绑定的事件
    on()                          向元素添加一个或多个事件处理程序,该处理程序只能被触发一次
    ready()                       DOM加载完后执行的函数

# 7. ready和load先后顺序

    ready先执行,load后执行.

    1. 解析HTML结构 2. 加载外部的脚本和样式表文件 3. 解析并执行脚本代码 4. 构造HTML DOM模型 5. 加载图片等外部文件
    6. 页面加载完毕.

# 8. 效果

    hide()      隐藏
    show()      显示
    fadeIn      淡入
    fadeOut     淡出
    slideDown   滑动
    slideUp     
    slideToggle 

    animate     自定义动画
    $(selector).animate({params},speed,callback);
        params:定义形成动画的CSS属性
        speed:动画运动时间
        callback:动画完成后所执行的函数

    stop        动画或效果完成前对它们进行停止.