
# encodeURL

    encodeURI() 函数通过将特定字符的每个实例替换为一个 两个 三或四转义序列来对统一资源标识符(URL)
    进行编码。
    
    encodeURI(URI);
    
# decodeURI

    decodeURI() 函数解码一个由encodeURI 先前创建的统一资源标识符（URI）或类似的例程。
    但不能解码那些不会被 encodeURI 编码的内容
    
# window.btoa()

    从String对象中创建一个base-64编码的ASCII字符串。
    
# window.atob()

    该函数对经过base-64编码的字符串进行解码。
    tips:
    1. 如果传入字符串不是有效的base64字符串,比如其长度不是4的倍数,则抛出异常。
    2. 并不是所有的字符都可以进行base64编码,可以利用encodedURI进行编码，再用window.btoa()编码。
    
    let encodeData = window.btoa("Hello World");
    let decodeData = window.atob(encodeData);
    