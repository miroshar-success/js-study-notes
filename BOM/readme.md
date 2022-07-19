
# 1. window.name

    跳转页面的时候会使window变化,但是在跳转页面的时候,会有一个window.name的属性保留下来。


    浏览器可视区域的宽高,包括滚动条的高度
    window.innerWidth
    window.innerHeight  


    文档的宽高,包括滚动条的高度
    document.documentElement.clientWidth   
    document.documentElement.clientHeight

    document.body.clientWidth;
    document.body.clientHeight;


    整个浏览器的宽高
    window.outerWidth
    window.outerHeight

# 2. window

    window对象表示一个包含DOM文档的窗口,其document属性指向窗口中载入的DOM文档。

    所有浏览器都支持window对象，所有JavaScript全局对象,函数以及变量均自动成为window对象的成员。
    全局变量 是window对象的属性
    全局函数 是window对象的方法

    HTML DOM的document也是window的对象的属性之一

    document.getElementById();
    window.document.getElementById();   是一样的

## 2.1. window.screen

    屏幕的可用宽度,可用高度

    window.screen.availWidth
    window.screen.availHeight

## 2.2. window.location

    window.location对象用于获得当前页面的地址(URL),并把浏览器重定向到新的页面。

    window.location.hostname    返回web主机的域名
    window.location.pathname    返回当前页面的路径和文件名
    window.location.port        返回主机的端口
    window.location.protocol    返回web协议

    window.location.href        返回当前页面的整个地址
    window.location.reload()    重新载入当前文档
    window.location.replace()   可用一个新文档取代当前文档


    location.href 和 location.history的区别:
        window.location.href    会写入浏览器的历史
        window.location.history 不会


## 2.3. window.navigator

    window.navigator对象包含有关访问者浏览器的信息

    window.navigator.userAgent

## 2.4. 弹窗

    警告框:window.alert()

    alert：同步代码

    确认框:window.confirm()
    提示框:window.prompt()

    window.close()  关闭当前页面
    window.scrollTo(x,y)    页面滚动条滚动到某个位置
    window.scrollBy(x,y)    把内容滚动指定的像素


    window.console.log()    在控制台输出信息

## 2.5. 计时事件
    
    window.setInterval()    间隔指定的毫秒数不停地执行指定的代码
    window.setTimeout()     在指定的毫秒数后执行指定代码

    setInterval() 和 setTimeout() 是HTML DOM Window对象的两个方法


    window.clearInterval(intervalVariable) 用于停止setInterval方法执行的函数
    window.clearTimeOut() 用于停止setTimeout方法执行的函数

## 2.6. Cookie

    Cookie用于存储web页面的用户信息。

    当浏览器从服务器上请求web页面时,属于该页面的cookie会被添加到该请求中。服务端通过这种方式来获取用户的信息

    JavaScript可以使用document.cookie属性来创建,读取,及删除cookie

