# window.getComputedStyle

    window.getComputedStyle()方法返回一个对象,该对象在应用活动样式表并解析这些值可能包含的
    任何基本计算后报告元素的所有CSS属性的值。
    
    let style = window.getComputedStyle(element,[pseudoElt]);
        element: 用于获取计算样式的Element
        pseudoElt: 指定一个要匹配的伪元素的字符串。必须对普通元素省略(或null)
        
    tips:
    1. 返回的style是一个实时的CSSStyleDeclaration对象,当元素的样式更改时,它会自动更新本身。
    2. window.getComputedStyle 等价于 document.defaultView.getComputedStyle
    
    
# HTMLElement.style

    window.getComputedStyle返回的对象与从元素的style属性返回的对象具有相同的类型。但是两个
    对象具有不同的目的。从getComputedStyle返回的对象是只读的,ele.style对象应用于在特定元素上
    设置样式。
    
     HTMLElement.style属性返回一个CSSStyleDeclaration对象,表示元素的内联style属性
    但忽略任何样式表应用的属性。  
	
	tips:
	1. 不能通过直接给style属性设置字符串来设置style,因为style应被当成是只读的，通过style属性返回的CSSStyleDeclaration对象是只读的，
	但是style属性本身的属性能够用来设置样式。
	ele.style.color = '' / ele.style.cssText = ''  /  ele.setAttribute('style','')
	
```js
// 在单个语句中设置多个样式
elt.style.cssText = "color: blue; border: 1px solid black"; 
// 或者
elt.setAttribute("style", "color:red; border: 1px solid blue;");

// 设置特定样式，同时保持其他内联样式值不变
elt.style.color = "blue";
```
# 与伪元素一起使用

    getComputedStyle可以与伪元素一起使用,可以从伪元素拉取样式信息
    
    let style = window.getComputedStyle(element,":after|:before");
    
# Element.getBoundingClientRect()

    该方法返回元素的大小及其相对于视口的位置,返回一个DOMRect对象,这个对象是由该元素的getClientRect()方法
    返回的一组矩形的集合,即:是与该元素相关的CSS边框集合
    
    tips：
    除了width和height外的属性都是相对于视口左上角的位置而言的。
    当滚动位置发生变化时,top和left属性也会随之立即发生变化,因为他们的值是相对于视口的。而不是绝对的。如果要获得相对于
    真个网页左上角定位的属性值,只要给top和left值加上当前的滚动位置(window.scrollX和window.scrollY);
    
![getBoundingClientRect]('./boundingClientRect.png')













