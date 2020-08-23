# Cookie

    Http Cookie 是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一个服务器发送请求时
    被携带并发送到服务器上。通常用户告知服务器两个请求来自同一个浏览器。
    
    Cookie主要用于以下三个方面：
        会话状态管理(比如用户登陆状态，购物车，游戏分数或其他需要记录到信息)
        个性化设置（比如用户自定义设置，主题等）
        浏览器行为跟踪
        
## 创建Cookie

    当服务器收到HTTP请求时,服务器可以在响应头里添加一个Set-Cookie选项。
    Set-Cookie响应头部和Cookie请求头部
    服务器使用({{HTTPHeader('Set-Cookie')}})响应头部向用户代理(一般是浏览器)发送Cookie信息。
        Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>; Secure; HttpOnly
        
    在node.js中，设置cookie的方式
        response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
        
## Cookie生命周期

    Cookie 的生命周期可以通过两种方式定义：
    
    会话期 Cookie 是最简单的 Cookie：浏览器关闭之后它会被自动删除，也就是说它仅在会话期内有效。会话期Cookie不需要指定
    过期时间（Expires）或者有效期（Max-Age）。需要注意的是，有些浏览器提供了会话恢复功能，这种情况下即使关闭了浏览器，
    会话期Cookie 也会被保留下来，就好像浏览器从来没有关闭一样，这会导致 Cookie 的生命周期无限期延长。
    持久性 Cookie 的生命周期取决于过期时间（Expires）或有效期（Max-Age）指定的一段时间。   
        
        Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
        
## 限制访问Cookie

    有两种方法可以确保Cookie被安全发送,并且不会被意外的参与者或脚本访问:Secure属性和HttpOnly属性。
        标记为Secure的Cookie只应通过被Https协议加密过的请求发送给服务端。
        JavaScript的Api无法访问带有HttpOnly属性的Cookie。此类Cookie仅作用域服务器。
        
    res.setHeader('Set-Cookie','language=javascript;Max-Age=1000*60;HttpOnly=true;Secure=true');
        
    JavaScript通过Document.cookie创建cookie，也可以通过该属性访问非HttpOnly标记的Cookie。
        document.cookie = 'username=jayk';
    
    通过JavaScript创建的Cookie不能包含HttpOnly标志
    
    Domain和Path表示 定义了Cookie的作用域。即允许Cookie应该发送给哪些URL。    
        
        Domain指定了哪些主机可以接受Cookie,如果不指定,默认为不包含子域名。如果指定了Domain,则一般包含子域名。
        
        Path标识指定了主机下的哪些路径可以接受Cookie。如果设置了Path=/docs,则以下地址都会匹配：
            /docs
            /docs/Web/
            /docs/Web/HTTP
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        