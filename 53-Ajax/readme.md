
# 1. Ajax

    AJAX最大的优点是在不重新加载整个页面的情况下,可以与服务器交换数据并更新部分网页内容。

    通过在后台与服务器进行少量数据交换,AJAX可以使网页实现异步更新.

    请求方式:
        GET
        POST
        HEAD
        DELETE
        PUT

# 2. 原生的Ajax请求步骤

    XHLHttpRequest()是AJAX的基础,用于在后台与服务器交换数据。

        1. let xhr = new XMLHttpRequest()  
    tips:   var xhr = new ActiveObject('Microsoft.XMLHTTP');


    2.  向服务器发送请求
        xhr.open('GET','ajax_info.txt',true);
        xhr.send();
    
    send()方法接收一个参数,即要作为请求主体发送的数据,如果不需要通过请求主体发送数据,则必须传入null。
    
## 2.1. xhr方法

    xhr.open(method,url,async)  
        method: 请求的类型：GET 或 post
        url:    文件在服务器上的位置
        async:  true(异步) false(同步)

    xhr.send()  将请求发送到服务器
        send(string) string仅用于POST请求。


    1.1 有可能得到的是缓存的结果,可以加一个随机数,或者时间戳
        xhr.open('GET','https://www.baidu.com?t='+Math.random(),true);
        xhr.send();

    1.2 通过GET方法发送信息,向URL添加信息:
        xhr.open('GET','https://www.baidu.com?name=kyrie&age=26',true);
        xhr.send();

    
    setRequestHeader()
        XMLHttpRequest.setRequestHeader()是设置HTTP 请求头部的方法。此方法必须在open()方法和send()方法之间调用。
        如果多次对同一个请求头赋值,只会生成一个合并了多个值的请求头。

## 2.2. 服务器响应

    获取来自服务器的响应,使用XMLHttpRequest对象的 responseText 或 responseXML
    
    response            一个对象，其对象取决于responseType的值,可以尝试设置responseType的值。
    responseType要在调用open()初始化请求之后调用,并要在调用send()发送请求之到服务器之前调用。
    
    responseText        获得字符串形式的响应数据
    responseXML         获得XML形式的响应数据
    status              响应的HTTP状态
    statusText          HTTP状态的说明
    

    JSON.stringify()   将一个javascript值转换为一个JSON字符串
    JSON.parse()       解析JSON字符串,构造由字符串描述的JavaScript值或对象


## 2.3. onreadystatechange事件

    当请求被发送到服务器时,每当readyState改变时,就会触发onreadystatechange事件。

    readyState属性存有XMLHttpRequest的状态信息。

    onreadystatechange      每当readyState属性改变时,就会调用该函数
    readyState              存有XMLHttpRequest的状态 0-4
                                0   请求未初始化
                                1   服务器连接已建立
                                2   请求已接收
                                3   请求处理中
                                4   请求已完成,且响应已就绪
    
    status                     200:'OK'
                               404:'未找到页面'


## 2.4. HTTP Header的Content-Type

    application/x-www-form-urlencoded: 数据被编码为名称/值对
    multipart/form-data: 数据被编码为一条消息
    text/plain:数据以纯文本形式(text/json/xml/html)进行编码,其中不含任何控件或格式字符。

    serialize() 
    处理跨域问题:
        header({'Access-Control-Allow-Origin':'*'})


# 4. XHR 二级事件
    
    XMLHttpRequestEventTarget是一个描述事件处理程序的接口,可以在一个用于处理XMLHttpRequest事件的对象中使用到
    该事件处理程序。
        onload  请求正确加载出内容后调用
        onloadstart 开始请求加载数据时调用
        onprogress  请求过程中的信息
        ontimeout   时间超时时调用,只有通过设置XMLHttpRequest对象的timeout属性来发生超时时,这种情况才会发生。
        onloadend   当内容加载完成,不管失败与否，都会调用该方法。
        
    2级 XMLHttpRequest引入了大量的新功能(例如跨域请求,上传进度事件以及对上传/下载二进制数据的支持等)，这使得AJAX可以与很多
    尖端的HTML5 API结合使用,例如File System API,Web Audio API和 WebGL。
    
    
    XMLHttpRequest.upload属性返回一个XMLHttpRequest对象,用来表示上传的进度。这个对象是不透明的,但是作为一个
    XMLHttpRequestEventTarget，可以通过对其绑定事件来追踪它的进度。
    
    事件	                相应属性的信息类型
    onloadstart	                获取开始
    onprogress	                数据传输进行中
    onabort	                    获取操作终止
    onerror	                    获取失败
    onload	                    获取成功
    ontimeout	                获取操作在用户规定的时间内未完成
    onloadend	                获取完成（不论成功与否）
    
    
## XMLHttpRequest.responseType

    XMLHttpRequest.responseType属性是一个枚举类型的属性,返回响应数据的类型。它允许我们手动的设置返回数据的类型。
    如果设置为一个空字符串,它将使用默认的"text"类型。
    
    tips:
    给一个同步请求设置responseType会抛出一个InvalidAccessError的异常
    
        type            描述
        ""              将responseType设置为空字符串与设置为"text"相同,是默认类型(实际上是DOMString)
        "arraybuffer"   response是一个包含二进制数据的JavaScript ArrayBuffer
        "blob"          response是一个包含二进制数据的Blob对象
        "document"      response是一个HTML Document或XML XMLDocument，这取决于接收到的数据的mime类型。
        "json"          response是一个JavaScript对象
        "text"          response是一个包含在DOMString对象中的文本
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    