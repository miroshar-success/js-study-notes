
# classList
	
	Element.classList是一个只读属性,返回一个元素的类属性的实时DOMTokenList集合。
	原型上有 add contains entries forEach item keys length remove replace toggle 等方法
	
	add()
		添加自定的类值。如果这些类已经存在于元素的属性中,那么它们将被忽略
	
	remove()
		删除指定的类值
		
	item()
		按集合中的索引返回类值
		
	toggle(string,boolean)
		1. 当只有一个参数时:切换class,有类的话删除它并返回false,如果不存在则添加它并返回true
		2. 存在第二个参数时:如果第二个参数为true,则添加指定的类,false则删除它

	contains(string)
		检查元素的类属性中是否存在指定的类值
		
	replace(oldClass,newClass)
		用一个新类替换已有类
		
# dataset

	HTMLElement.dataset属性允许无论是在读取模式和写入模式下访问HTML或DOM中的元素上设置的所有自定义数据属性(data-*)集。
	它是一个DOMString的映射，每个自定义数据属性的一个条目。
	
```js
const p = document.querySelector('p');
console.log(p.dataset);	// DOMStringMap  {page:'page1'}	
p.dataset.page = 'page2';
console.log(p.dataset);
```

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