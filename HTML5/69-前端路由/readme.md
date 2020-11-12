
# hash
	
	URL接口的hash属性返回一个USVString,其中会包含URL标识中的#和fragment标识符（fragment即通常所说的URL hash)。
	这里的fragment不会经过百分比编码(URL编码)。
	
# hashchange

	当URL的片段标识符更改时,将触发hashchange事件(跟在#符号后面的URL部分，包括#符号)
```js
// 监听hash值是否变化;
window.onhashchange = function(event){
    console.log(event.newURL,event.oldURL);
	console.log(window.location.hash);
}
```
    hashchange事件对象下有两个属性: newURL(当前页面新的URL) 和 oldURL(当前页面旧的URL)
	tips: 如果页面路由#后没有字符，则window.location.hash获取不到任何内容。

# history
	
	使用back() forward() go()方法可以在用户历史记录中向前和向后跳转。
	DOM window对象通过history对象提供了对浏览器历史的访问。它暴露了很多有用的方法和属性，允许
	你在用户浏览历史中向前和向后跳转，同时——HTML5开始——提供了对history栈中内容的操作。
	
	window.history.back()
	向后跳转
	
	window.history.forward()
	像前跳转
	
	也可以使用go()方法载入到会话历史中的某一特定页面，通过与当前页面相对位置来标指
	window.history.go(1)	相当于 window.history.forward()
	window.history.go(-1)	相当于 window.history.back()
	
## history.pushState()/history.replaceState()

	HTML5引入了history.pushState()和history.replaceState()方法，他们分别可以添加和修改历史记录条目
	这些方法通常与window.onpopstate配合使用。
	
	history.pushState()的三个参数：
	1. 一个状态对象	2. 一个标题（目前被忽略）	3. 一个URL
	hsitory.replaceState()的参数同上，区别在于 history.pushState()是新建一个历史记录而 history.replaceState()
	是修改当前的历史记录项。
	
	tips:
	1. pushState()不会触发hashchange事件，即使新的URL与旧的URL仅哈希不同也是如此。
	2. 假设在http://mozilla.org/foo.html中执行了以下代码
```js
let startObj = {
	foo:"bar"
}
history.pushState(startObj,"page 2","bar.html");
```
	这将使浏览器地址栏显示为http://mozilla.org/bar.html,但这并不会导致浏览器加载bar.html.
	
# window.popstate

	每当处于激活状态的历史记录条目发生变化时，popstate事件就会在对应window对象上触发。如果当前处于激活状态的历史记录
	条目是由history.pushState()方法创建，或由history.replaceState()方法修改过的，则popstate事件事件对象的
	state属性包含了这个历史记录条目state对象的一个拷贝。
	
	tips
	1. 调用history.pushState() 或者history.replaceState()不会触发popState事件。popstate事件只会在浏览器某些行为下触发
	比如点击后退 前进按钮(或者在JavaScript中调用history.back() history.forward() history.go()方法)；
	
	
## pushState()与hash区别

	在某种意义上,调用pushState()与设置window.location.href = "#foo"类似，二者都会在当前页面创建并激活新的历史记录。
	但pushState()具有如下几条优点:
	1. 新的 URL 可以是与当前URL同源的任意URL 。而设置 window.location 仅当你只修改了哈希值时才保持同一个 document。
	2. pushState设置新的URL可以与当前的URL一样，也会把记录添加到栈中，而hash设置的新值必须与原来不一样才会触发记录
	添加到栈中。
	
    如果页面设置了状态对象而用户重启了浏览器,那么当页面重新加载时,页面会接受一个onload事件,但没有popstate事件。
    可以通过history.state属性获取 得到如果popstate被触发时能得到的状态对象。
```js
window.addEventListener('load',function() {
  let currentState = history.state;
})
```	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	