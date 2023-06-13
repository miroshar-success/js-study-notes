# HTTP

  HTTP(HyperText Transfer Protocol) 超文本传输协议 是一种能够获取如HTML这样的网络资源的 通讯协议。它是Web上进行数据交换的基础。

  TCP/IP协议族按层次分四层: 应用层, 传输层, 网络层 和数据链路层。

  字库表/编码方式/字符集

## 应用层

  应用层决定了向用户提供应用服务时通信的活动。FTP(File Transfer Protocol),DNS (Domain Name System)。
  HTTP协议也处于该层。

  DNS: 提供域名到IP地址之间的解析服务。

## 传输层

  传输层对上层应用层,提供处于网络连接中的两台计算机之间的数据传输。在传输层有两个性质不同的协议
  TCP (Transmission Control Protocol) 和 UDP (User Data Protocol)

  3次握手
  用TCP协议把数据包发送出去后, 使用了TCP的标志 (SYN) synchronize。和ACK (acknowledgement)。

  发送端发送一个带有SYN 标志的数据包给对方。接收端收到后, 回传一个带有SYN/ACK标志的数据包以示传达确认信息。最后发送端再
  回传一个带ACK标志的数据包, 代表 '握手' 结束。

  TCP协议是为了更容易传送大数据才把数据分割,而且TCP协议能够确认数据是否送达对方。

  HTTP的长连接和短连接本质上是TCP长连接和短连接

## 网络层

  网络层用来处理在网络上流动的数据包。数据包式网络传输的最小数据单位。该层规定了通过怎样的路径 到达对方计算机。并把数据包传递
  给对方。

  IP (Internet Protocol) / MAC (Media Access Control Address)
  IP地址指明了节点被分配到的地址。MAC地址是指网卡所属的固定地址。IP地址可以和MAC地址进行配对。IP间的通信依赖MAC地址。

  ARP (Address Resolution Protocol) 是一个以解析地址的协议。

## 链路层

  用来处理连接网络的硬件部分。包括控制操作系统, 硬件的设备驱动, NIC(Network Interface Card, 网络适配器)以及光纤等物理可见部分。硬件上的范畴均在链路层的作用范围之内。

## URI/URL

  URI (Uniform Resource Identifier) 
  URI就是由某个协议方案表示的资源的定位标识符。协议方案是指访问资源所使用的协议类型名称。

  Uniform: 规定统一的格式可方便处理多种不同类型的资源, 而不用根据上下文环境来识别资源指定的访问方式
  Resource: 资源的 定义是 '可标识的任何东西'
  Identifier: 表示可标识的对象, 也称为标识符。

  常见的方案/协议:
  data / file / ftp(文件传输协议) / http/https / mailto / ssh / tel / urn / view-source(资源的源代码)

  data URL: 允许内容创建者向文档中嵌入小文件。

## MIME类型

  媒体类型(Multipurpost Internet Mail Extensions)是一种标准，用来表示文档,文件或字节流的性质和格式。
  语法:
    type/subtype
1. text/plain
2. text/html
3. image/jpeg
4. image/png
5. audio/ogg
6. audio/mpeg
7. video/mp4
8. application/json
9. application/javascript

## 报文

  报文头大体可以分为四类: 通用报文头/请求报文头/响应报文头/实体报文头

  HTTP消息是服务器和客户端之间交换数据的方式。有两种类型的消息: request / response。HTTP消息由采用ASCII编码的多行文本构成。在HTTP/2
  中,为了优化和性能方面的改进,曾经可人工阅读的消息被分到多个HTTP帧中。

### HTTP请求

  HTTP请求是由客户端发出的消息,用来使服务器执行动作。 HTTP请求和响应具有相似的结构。
1. 一行起始行用于描述要执行的请求,或者是对应的状态,成功或失败, 这个起始行总是单行的。
2. 一个可选的HTTP标头集合指明请求或描述消息主体。
3. 一个空行指示所有关于请求的元数据已经发送完毕。
4. 一个可选的包含请求相关数据的主体,或者响应相关的文档。主体的大小由起始行的HTTP头来指定。
  
  起始行包含三个元素:
1. 一个HTTP方法 (GET/POST等)
2. 请求目标
3. HTTP版本(HTTP version)

  标头(Header)
1. 通用标头(General header) 指代同时适用于请求和响应的消息。
2. 请求标头(Request header)
3. 表示标头(Representation header)

  主体(body)

  请求的最后一部分是主体。

## 请求方法

1. CONNECT 方法可以开启一个客户端与所请求资源之间的双向沟通的通道。它可以用来创建隧道。
2. GET  GET方法请求指定的资源。使用 **GET** 的请求应该只用于获取数据。
3. HEAD **HEAD 方法** 请求资源的头部信息,并且这些头部与HTTP GET 方法请求时返回的一致. 该请求方法的一个使用场景时在下载一个
大文件前先获取其大小再决定是否要下载, 以此可以节约带宽资源。
4. HTTP 的 **OPTIONS 方法** 用于获取目的资源所支持的通信选项。
5. POST 方法发送数据给服务器,请求主体的类型由 **Content-Type** 首部指定。PUT方法和POST方法的区别是 PUT方法是幂等的, 连续调用一次
或者多次调用的效果相同。
  application/x-www-form-urlencoded
  mutipart/form-data
  text/plain

## 状态码

1. 1XX: 代表请求已被接受,需要继续处理。只包含状态行和某些可选的响应头信息
2. 2XX: 表示成功, 代表请求已成功被服务器接受,理解并接受。
    202: 表示服务器已经接受到请求消息,但是尚未进行处理。对于请求的处理是无法保证的, 无法通过HTTP协议给客户端发送一个异步请求来告知其请求的处理结果。
    206: 代表请求已完成,并且主体包含所请求的数据区间, 该数据区间是在请求的 **Range** 首部指定的。
3. 3XX: 表示重定向, 表示客户端需要采取进一步的操作才能完成请求。
    301: 说明请求的资源已经移动到了由Location头部指定的url上,是固定的不会再改变。
    302: 表明请求的资源被暂时的移动到了由该HTTP响应头 Location 指定的URL上。
4. 4XX: 表示请求错误.
  401: Unauthorized 缺乏目标资源要求的身份验证凭证,发送的请求未得到满足。
  403: 客户端错误, 服务器有能力处理该请求, 但是拒绝访问请求
  404: 服务器无法找到所请求的资源。
  405: 服务器禁止使用当前HTTP方法的请求

5. 5XX: 
    500 Internal Server Error 是表示服务器端错误的响应状态码,意味着所请求的服务器遇到意外的情况并阻止其执行请求。
    502 Bad Gateway 是一种HTTP协议的服务端错误状态码, 它表示作为网关或代理的服务器, 从上游服务器中接收到的响应是无效的。

## HTTP/1.1 ----- 标准化的协议

  HTTP/1.1 消除了大量歧义内容并引入了多项改进:
1. 连接可以复用, 节省了多次打开TCP连接加载网页文档资源的时间。(持久连接: Keep Alive),只要任意一端没有明确提出断开连接, 则保持TCP连接状态。
2. 增加管线化技术, 允许在第一个应答被完全发送之前就发送第二个请求, 以降低通信延迟。
3. 支持响应分块。
4. 引入额外的缓存控制机制
5. 引入内容协商机制,包括语言,编码,类型等。并允许客户端和服务器之间约定以最合适的内容进行交换。

  持久连接的好处在于减少了TCP连接的重复建立和断开所造成额外开销,减轻了服务器端的负载。在HTTP/1.1中,所有的连接默认都是持久连接。

  长连接也还是有缺点的,就算是在空闲状态, 它还是会消耗服务器资源的, 而且在重覆载时, 还有可能遭受Dos攻击。连接在空闲一段时间后
  会被关闭(服务器可以使用 Keep-Alive 协议头来指定一个最小的连接保持时间)。

  Dos攻击: 是一种网络攻击手段, 它通过给服务器发送大量请求来阻止对资源的合法使用。

### 管线化

  持久连接使得多数请求以管线化(pipelining) 方式发送成为可能。从前发送请求后需等待并收到响应,才能发送下一个请求。管线化技术出现后,不用等待
  响应亦可直接发送下一个请求。

## HTTP认证

  服务器可以用来质询(challenge)客户端的请求, 客户端则可以提供身份验证凭据。

  Base认证 用户的ID/密码作为凭据信息,并且base64算法进行编码
  
1. 服务器向客户端返回401(Unauthorized 未被授权的) 响应状态码, 并在WWW-Authenticate响应标头提供如何进行验证的信息
2. 通过包含凭据的Authorization 请求标头进行验证。
3. 客户端会向用户显示密码提示,然后发送包含正确的Authorization标头的请求。

  Basic认证 / Digest认证 / SSL认证(HTTPS的客户端证书完成认证的方式) / 基于表单认证(session/cookie) / Bearer

## 网关

  Web网关 在一侧使用HTTP协议, 在另一侧使用另一种协议
1. (HTTP/*) 服务器端Web网关
2. (HTTP/HTTPS) 服务器端安全网关
3. (HTTPS/HTTP) 客户端安全加速器网关
4. 资源网关

  网关(Gateway) 网间连接器,协议转换器。网关在网络层以上实现网络互连, 是复杂的网络互连设备,仅用于两个高层协议不同的网络互连。
  网关既可以用户广域网互连,也可以用于局域网互连。网关是一种充当转换任务的计算机系统或设备。使用在不同的通信协议, 数据格式或语言...,
  网关是一个翻译器。

## HTTP缓存

  Cache-Control: 请求/响应头, 缓存控制字段
  在 HTTP Caching 标准中, 有两种不同类型的缓存: 私有缓存 和 共享缓存。
1. 私有缓存时绑定到特定客户端的缓存 ---- 通常是浏览器缓存。
```js
{
  'Cache-Control': 'private'
}
```
  存储的HTTP响应有两种状态: *fresh* 和 *stale*, *fresh* 通常表示响应仍然有效, 可以重复使用。而*stale*状态表示缓存的响应已经过期。

  在HTTP/1.0中, 新鲜度过去由Expires标头指定。Expires标头使用明确的时间而不是通过指定经过的时间来指定缓存的生命周期。
  如果Expires 和 Cache-Control: max-age 都可用, 则将 max-age定义为首选。

  如果在max-age定义的日期内再次发起请求, 则使用缓存数据而不发起http请求。

```js
{
  Vary: 'Accept-Language'
}
```
  通过在Vary标头的值中添加 'Accept-Language', 根据语言单独缓存响应。
  如果不希望重复使用响应, 而是希望始终从服务器获取最新内容, 则可以使用 *no-cache* 指令强制验证。*no-cache* 指令不会阻止
  响应的存储, 而是阻止在没有重新验证的情况下重用响应。*no-cache* 指令将强制客户端在重用任何存储的响应之前发送验证请求。
  如果不希望将响应存储在任何缓存中, 应该使用 *no-store*

### 验证响应

  过时的响应不会立即被丢弃。HTTP有一种机制, 可以通过询问源服务器将陈旧的响应转换为新的响应。这称为**验证**, 有时也称为 **重新验证**。
  验证是通过 **If-Modified-Since** 或者 **If-None-Match** 请求标头的 **条件请求** 完成的。

## 内容协商

  在HTTP协议中, **内容协商** 是一种机制, 用于为同一URI提供资源不同的 表示形式。以帮助用户代理指定最合适用户的表示形式。(例如,哪种文档语言/哪种图片格式或者哪种内容编码。)

  客户端设置特定的 HTTP 标头 这是进行内容协商的标准方式。
1. Accept: 用来告知(服务器)客户端可以处理的内容类型,这种内容类型用**MIME类型**表示。借助内容协商机制,服务器可以从诸多选项中选择一项进行应用, 并使用**Content-Type**应答头同志客户端它的选择。
2. Accept-Charset: 客户端可以处理的字符集类型
3. Accept-Encoding: 客户端可以理解的编码方式-通常是某种压缩算法,服务端在响应头**Content-Encoding**通知客户端该选择
4. Accept-Language: 请求头允许客户端声明它可以理解的自然语言,以及优先选择的区域方言。使用**Content-Language**应答头通知客户端

## HTTP2.0

  性能增强的核心: 二进制分帧
  HTTP/1.1 以及更早的HTTP协议报文都是语义可读的。在HTTP/2中, 这些报文被嵌入到了一个心的二进制结构,帧。帧允许实现很多优化。
  比如报文标头的压缩以及多路复用。

  HTTP/2是二进制协议而不是文本协议。不再可读 这是一个多路复用协议。并行的请求能在同一个链路中处理, 移除了HTTP/1.x中顺序和阻塞的约束
  压缩了标头。因为标头在一系列请求中常常是相似的,其移除了重复和传输重复数据的成本。

## CSP(Content Security Policy)

  内容安全策略(CSP)是一个额外的安全层, 用于检测并削弱某些特定类型的攻击。包括跨站脚本(XSS)和数据注入攻击等。
  为使CSP可用, 你需要配置你的网络服务器返回 Content-Security-Policy HTTP标头。 除此之外, <meta> 元素也可以被用来配置该策略
```html
<meta
  http-equiv='Content-Security-Policy'
  content="default-src 'self'; img-src https://*; child-src 'none'"
>
```
  CSP的主要目标是减少和报告XSS攻击。XSS攻击利用了浏览器对于从服务器获取的内容的信任。

  CSP通过指定有效域 - 使服务器管理者有能力减少或消除XSS攻击所依赖的载体。一个CSP兼容的浏览器将会仅从白名单域获取到的脚本文件,忽略所有的其他脚本。

  配置内容安全策略涉及到添加 **Content-Security-Policy** HTTP标头到一个页面,并配置相应的值,以控制用户代理 可以为该页面获取哪些资源。策略由一系列 策略指令所组成,每个策略指令都描述了针对某个特定资源的类型以及策略生效的范围。
```js
res.writeHead(200, {
  'Content-Security-Policy': 'default-src \'self\''
})
```

  default-src:
1. child-src (定义了使用如 frame 和 iframe 等元素在加载web worker和嵌套浏览上下文时的有效来源。)
2. connect-src
  用于限制通过使用脚本接口加载的URL。其中受限制的API如下:
  2.1 <a>
  2.2 fetch()
  2.3 XMLHttpRequest()
  2.4 EventSource
  2.5 WebSocket
3. font-src
4. frame-src
5. img-src
6. manifest-src
7. media-src
8. object-src
9. script-src
10. style-src
11. worker-src

  'self': 指向与要保护的文件所在的源。包括相同的URL scheme 与端口号。
  'unsafe-inline': 允许使用内联资源。
  'none': 不允许任何内容

[Content-Security-Plicy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)

## 重定向

  **URL重定向** 是一种为页面,表单或者整个web站点/应用提供多个URL地址的技术。HTTP对此操作有一种特殊类型的响应,称为**HTTP重定向**。
  在HTTP协议中,重定向操作由服务器向请求发送特殊的重定向响应而触发。重定向响应包含以3开头的状态码, 以及**Location** 标头,其保存着重定向的URL。

1. 永久重定向
  这种重定向操作是永久性的.它表示原URL不应再被使用,而是选用新的URL替换它。
2. 临时重定向
  有时请求的资源无法从其标准地址访问,但是却可以从另外的地方访问。 在这种情况下,可以使用临时重定向。
3. 特殊重定向
  304（Not Modified) 会使页面跳转到本地的缓存副本中.

  http重定向机制.
```html
<head>
  <meta http-equiv="Refresh" content="0; URL=http://example.com/" />
</head>
```
  content属性的值开头是一个数字,指示浏览器在等待该数字表示的秒数之后再进行跳转。

  JavaScript重定向机制的原理是设置 **window.location**的属性值,然后加载新的页面。
```js
window.location.href = 'http://www.baidu.com'
```

## CORS

  CORS(跨域资源共享) 是一种基于HTTP头的机制,该机制通过允许服务器标示出了它自己以外的其他源(域名/协议/端口),使得浏览器允许这些源访问
  自己加载的资源。CORS机制允许Web应用服务器进行跨源访问机制,从而使跨源数据传输得以安全进行。

  对那些可能对服务器数据产生副作用的HTTP请求方法,浏览器必须首选用 **OPTIONS** 方法发起一个预检请求 (preflight request),
  从而获知服务端是否允许该跨源请求。

  当响应的是附带身份凭证的请求时, 服务端必须明确 **Access-Control-Allow-Origin** 的值, 而不能使用通配符 *。

1. Access-Control-Allow-Origin
2. Access-Control-Max-Age: 指定了preflight请求的结果能够被缓存多久。
3. Access-Control-Allow-Credentials: 指定了当浏览器的credentials为true时是否允许浏览器读取response的内容。
4. Access-Control-Allow-Methods: 访问资源时允许使用的请求方法, 用于预检请求的响应。
5. Access-Control-Allow-Headers: 用于预检请求的响应。

  XMLHttpRequest 或者 Fetch 对于跨源请求,浏览器不会发送身份凭证信息。如果需要发送凭证信息,需要设置XMLHttpRequest对象的某个特殊标志位!

  如果跨域访问, 前端设置了 withCredentials: true, 而后台没有设置 *Access-Control-Allow-Credentials: true*, 请求会报错。
  如果后台设置了 *Access-Control-Allow-Credentials: true*, 而前端没有设置 withCredentials: true, 则不会跨域传递cookie。

  *Access-Control-Request-Method* 告知服务器,实际请求将使用*POST*方法。标头字段*Access-Control-Request-Headers* 告知服务器,实际请求携带自定义标头字段。

  *Access-Control-Max-Age* 给定了预检请求可供缓存的时间长短。 默认为5s

## cookie

  禁止网页引入的第三方JS设置cookie。

  主域名相同 可共享Cookie。
  单点登录 SSO
  OAuth2.0

## TCP/UDP

  UDP 无连接/无断开,效率低。 适合视频/语音

  prefetch 资源预先获取 (preload相关)
  dns-prefetch / preconnect

  前端攻击
  XSS (跨站脚本攻击). 将JS代码插入到网页内容中,渲染时执行JS代码。
  预防: 特殊字符替换

  CSRF(跨站请求伪造) 诱导用户访问另一个网站接口,伪造请求。
  1. 严格的跨域请求限制
  2. 为cookie设置SameSite, 禁止跨域传递cookie.
  3. SQL注入
  4. DOS