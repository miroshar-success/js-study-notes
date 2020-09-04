
# 1. Document
    
    文档对象模型(DOM)将web页面与脚本或编程语言连接起来。
    
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

# 3. Node

    Node是一个接口,各种类型的DOM API对象会从这个接口继承。它允许我们使用相似的方式对待这些不同类型的对象。
        
        Node.childNodes     返回包含指定节点的子节点的集合,该集合为即时更新的集合(live collection)
        Node.firstChild     返回树节点的第一个子节点。
        Node.isConnected    无论节点是否与DOM树连接,都会返回一个布尔值。
        Node.lastChild      返回当前节点的最后一个子节点。
        Node.nextSibling    返回其父节点的childNodes列表中紧跟在其后面的节点。
        Node.nodeName       返回当前节点的节点名称
        Node.nodeType       节点类型:1表示元素节点,2表示属性节点
        Node.nodeValue      返回或设置当前节点的值
        Node.parentElement  返回当前节点的父元素节点
        Node.textContent    表示一个节点及其后代的文本内容 
        
    元素    1
    属性    2
    文本    3
    注释    8
    文档    9
    
    
    Node 方法
        Node.appendChild() 方法将一个节点附加到指定父节点的子节点列表的末尾处。如果将被插入的节点已经存在于当前文档的
        文档树中,那么appendChild()只会将它从原先的位置移动到新的位置。
    
        Node.hasChildNodes()方法返回一个布尔值,表明当前节点是否包含有子节点，判断当前节点是否有子节点的方法
            Node.hasChildNodes()    true or false
            Node.firstChild !== null
            Node.childNodes.length > 0
        
        Node.insertBefore()
            在节点之前插入一个拥有指定父节点的子节点。如果给定的子节点是对文档中现有节点的引用,insertBefore()
            会从当前位置移动到新位置。
            var insertNode = parentNode.insertBefore(newNode,referenceNode);
        
        tips:
            没有insertAfter方法,可以使用insertBefore和Node.nextSibling来模拟它。
            parentNode.insertBefore(newNode,referenceNode.nextSibling);
        
        Node.removeChild()  方法返回DOM中的删除的一个子节点。返回删除的节点。
            parentNode.removeChild(childNode);
            
            if(node.parentNode) {
                node.parentNode.removeChild(node);
            }
            
            // 删除一个元素的所有节点
            while(node.firstChild){
                node.removeChild(node.firstChild)
            }
            
# textContent

    在节点上设置textContent属性的话,会删除它的所有子节点,并替换为一个具有给定值的文本节点。 
    
    与innerText区别：
        textContent 会获取所有元素的内容，包括 <script> 和 <style> 元素
        textContent会返回节点中的每一个元素.相反,innertext受CSS样式的影响,并且不会返回隐藏元素的文本。

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

# 7. document.forms

    forms返回当前文档中的<form>元素的一个集合(一个HTMLCollection)

```js
let selectForm = document.forms[index];
// 获取表单内的元素
let selectFormElement = document.forms[index].elements[index];
```

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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    