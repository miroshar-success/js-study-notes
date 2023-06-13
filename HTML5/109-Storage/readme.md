# Web Storage

  Web Storage API提供了一种非常简单的写法,用于存储和检索较小的,由名称和相应值组成的数据项。
  IndexedDB API提供了一个完整的数据库系统来存储复杂的数据。
  
  sessionStorage 和 localStorage。
      
		1. 允许访问一个对应当前源的Storage对象。
		
		2. localStorage里面存储的数据没有过期时间设置,而存储在sessionStorage里的数据在页面会话结束时会被清除,只在页面会话期间
		可用(只要浏览器处于打开状态,包括页面重载和恢复)。

		3. 每个域都有一个单独的数据存储区,独立运行和控制。
  
  相同的API:
		// 保存数据到 sessionStorage
		Storage.setItem('key', 'value');
		
		// 从 sessionStorage 获取数据
		let data = Storage.getItem('key');
		
		// 从 sessionStorage 删除保存的数据
		Storage.removeItem('key');
		
		// 从 sessionStorage 删除所有保存的数据
		Storage.clear();

## demo

	一个优化的例子:当输入文本框时不小心刷新页面,输入的内容还保存着。
```js
// 获取文本输入框
let field = document.getElementById("field");
 
// 检测是否存在 autosave 键值
// (这个会在页面偶然被刷新的情况下存在)
if (sessionStorage.getItem("autosave")) {
  // 恢复文本输入框的内容
  field.value = sessionStorage.getItem("autosave");
}
 
// 监听文本输入框的 change 事件
field.addEventListener("change", function() {
  // 保存结果到 sessionStorage 对象中
  sessionStorage.setItem("autosave", field.value);
});
```
