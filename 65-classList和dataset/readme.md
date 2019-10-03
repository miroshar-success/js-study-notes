
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