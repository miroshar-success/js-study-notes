
# 1. Document

    元素节点：  element node
    文本节点：  text node
    属性节点：  attribute   node

    HTML DOM是关于如何获取,修改,添加,删除HTML元素的标准.

    document.documentElement    页面所有节点    
    document.body

## 1.1. 获取页面元素的方法

    document.getElementById
    document.getElementsByClassName
    document.getElementsByTagName
    document.querySelector
    document.querySelectorAll

## 1.2. HTMLCollection和NodeList区别

    HTMLCollection  没有entries keys forEach等方法,动态获取
    NodeList有这些方法


    增: document.createElement + appendChild
    删：removeChild
    改：replaceChild
    insertBefore    在指定的子节点前增加节点
    createAttribute 创建属性节点
    createElement   创建元素节点
    createTextNode  创建文本节点
    getAttribute    返回指定的属性值
    setAttribute    把指定属设置或修改为指定的值.
    setAttribute(attributename,attributevalue)


    HTMLCollection接口表示一个包含了元素的通用集合,还提供了用来从该集合中选择元素的方法和属性。
    HTML DOM中的HTMLCollection是即时更新的(live);当期所包含的文档结构发生改变时,它会自动更新。


    NodeList 对象是一个节点的集合,是由Node.childNodes和 document.querySelectorAll 返回的
    NodeList是一个静态集合,对文档模型的任何改动都不会影响集合的内容.document.querySelectorAll返回一个静态的NodeList

    遍历一个NodeList对象中的所有的节点不要尝试使用for...in 或者for each...in 来遍历,因为如果使用这些方法,NodeList对象中的length和item属性
    也会被遍历出来
    
## 1.3. ChildNodes和Children区别

    childNodes      输出的内容包括文本节点,元素节点,
    类型是Nodelist

    children        输出的元素只包括元素节点
    类型是HTMLCollection

    parentElement
    parentNode

    node.nextSibling    下一个节点,包括文本节点
    node.nextElementSibling 下一个元素

    firstChild
    firstElementChild
    lastChild
    lastElementChild

# 2. DocumentFragment

    创建一个新的空白的文档片段(DocumentFragment)

```js
let fragment = document.createDocumentFragment();
```
    fragment是一个指向空DocumentFragment对象的引用.

    描述:
    DocumentFragments是DOM节点.它们不是主DOM树的一部分.通常的用例是创建文档片段,将元素附加到文档片段，
    然后将文档片段附加到DOM树。在DOM树中,文档片段被其所有的子元素所代替。

    因为文档片段存在于内存中,并不在DOM树中,所以将子元素插入到文档片段时不会引起页面回流。

# 3. nodeType

    元素    1
    属性    2
    文本    3
    注释    8
    文档    9

# 4. setAttributeNode

    用于添加新的属性节点.
    如果元素中已经存在指定名称的属性,那么该属性将被新属性替代.

# 5. classList

    Element.classList是一个只读属性,返回一个元素的类属性的实时DOMTokenList集合.

    add()       添加指定的类值
    remove()    删除指定的类值
    item()      按集合中的索引返回类值
    toggle()    切换 class value; 即如果类存在，则删除它并返回false，如果不存
    在，则添加它并返回true。
    contains()  检查元素的类属性中是否存在指定的类
    replace(oldClass,newClass)  用一个新类替换已有类 

# 6. getBoundingClientRect()

    Element.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置.
    返回值是一个DOMRect对象,这个对象是由该元素的getClientRects()方法返回的一组矩形的集合.

    DOMRect对象包含了一组用于描述边框的只读属性 --left top right和bottom,单位为像素。除了width和
    height外的属性都是相对于视口的左上角位置而言的。
 
# 7. document.forms

    forms返回当前文档中的<form>元素的一个集合(一个HTMLCollection)

```js
let selectForm = document.forms[index];
// 获取表单内的元素
let selectFormElement = document.forms[index].elements[index];
```

# textContent

	该属性设置或返回指定节点的文本内容以及它的所有后代的文本内容。
	如果设置了textContent属性,会删除所有的子节点,并被替换为包含指定字符串的一个单独的文本节点。
	
    contenteditable 可以编辑
    oncontextmunu   可以阻止右键点击事件.
    
# Document.readyState

    该属性描述了document的加载状态。
    当该属性值发生变化时,会在document对象上触发readystatechange事件。
        document.readyState:
            1. loading（正在加载）
            2. interactive(可交互) 文档已被解析,'正在加载'状态结束,但是诸如图像,样式表和框架之类的子资源仍在加载。
            3. complete(完成) 文档和所有子资源已经完成加载,表示load状态的事件即将被触发。    
```js
document.addEventListener('readystatechange',(event) => {
    switch(document.readyState){
        case "loading":
            console.log('loading');
            break;
        case "interactive":
            const oText = document.createElement('p');
            oText.textContent = '我是动态生成的';
            document.body.appendChild(oText);
            break;
        case "complete":
            console.log('complete');
            break;
    }
},false);
```

# Document.DOMContentLoaded

    当纯HTML被完全加载以及解析时,DOMContentLoaded事件会被触发,而不必等待样式表。图片或者子框架完成加载。
```js
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed'); // 译者注："DOM完全加载以及解析"
});
```  
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    