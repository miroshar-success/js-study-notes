# Vue实例

	el 用于指定页面中存在的元素挂载vue实例，可以是HTMLElement,也可以是CSS选择器
	new Vue({
		el: '#app' / document.getElementById('app')
	})；
	
	tips：
	1. Vue只支持单个表达式，不支持语句和流控制。
	2. 数据驱动DOM是Vue.js的核心理念。
```js
let data = {a : 1}

let vm2 = new Vue({
    el:'#example',
    data,
})
console.log(vm2.a === data.a);	// true
vm2.a = 2;
console.log(data.a);	// 2

data.a = 3;
console.log(vm2.a);		// 3
```
    tips:
       1. 只有当实例被创建时就已经存在于data中的属性才是响应式的。
       2. Vue无法检测到对象属性的添加或删除
# 指令
	
	插值
	{{}}  当作字符串解析 
    tips:
	1. 除了简单的属性值绑定之外，还可以使用JavaScript表达式进行简单的运算，三元运算等。 
	2. 只支持单个表达式，不支持语句和流控制


	v-text:更新元素的textContent

	v-once: 不需要表达式
		只渲染元素和组件一次。随后的重新渲染，元素/组建及其所有的子节点将被视为静态内容并跳过。
	<span v-once>this message will never change:{{msg}}</span>
	<span>Message:{{msg}}</span>
	
	
	v-html：更新元素的innerHTML. 
	<span v-html='html'></span>
	tips:
		1. 内容按普通HTML插入-不会作为vue模板进行编译。
		2. 在网站上动态渲染任意HTML是非常危险的，只在可信内容上使用v-html,永不用在用户提交的内容上。
	
	
	v-on：绑定事件监听器，事件类型由参数指定。 缩写:@
	
	v-bind: 动态地绑定一个或多个特性，或一个组件prop到表达式  缩写 :
		Vue.js v-bind在处理class和style时，专门增强了它。表达式的结果类型除了字符串之外，还可以是对象或数组。
		v-model用在表单控件上,用于实现双向数据绑定，如果用在除了表单控件以外的标签是没有任何效果的
		
		
	v-if: 根据表达式的值的真假条件渲染元素。在切换时元素及它的数据绑定/组件被销毁并重建
		值为true时可见，为false时不可见
		
	v-else / v-else-if
		
	v-show:根据表达式值得真假，切换元素得display CSS属性。
	
	
	v-for: 基于源数据多次渲染元素或模板快。  需要使用item in items形式的特殊语法
	tips:
	1. items是源数据数组并且item是数组元素迭代的别名
	2. 当和 v-if 一起使用时，v-for得优先级比v-if更高。不推荐同时使用 v-if 和 v-for
	3. v-for写在哪个元素上面，就循环那个元素
	4. v-for对象时，(value,key) 前面遍历出来的是键值，后面遍历的是键名。
	5. 也可以用of替代in作为分隔符，因为它是最接近JavaScript迭代器的语法；
	
	
	v-model:
	在<input><select><textarea> 元素上获取创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。
	它负责监听用户的输入事件以及更新数据。
	
	tips:
	1. v-mode在内部使用不同的属性为不同的输入元素并抛出不同的事件:
		text和textarea元素使用value属性和input事件;
		checkbox和radio使用checked属性和change事件
		select字段将value作为prop并将change作为事件
		
	2. 当多个选择多个复选框时,checkbox必须要有value值，必须绑定到一个数组上
	
## v-if vs v-show

	v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
	v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
	相比之下，v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
	一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；
	如果在运行时条件很少改变，则使用 v-if 较好。
	
	
## v-for的key

	用v-for正在更新已渲染过的元素列表时，它默认用"就地复用"策略。如果数据项的顺序被改变，Vue将不会移动DOM元素来匹配数据项的
	顺序，而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。
	
	当Vue.js用v-for正在更新已渲染过的元素列表时，它默认用"就地复用"策略。如果数据的顺序被改变，Vue
	将不会移动DOM元素来匹配数据项的顺序，而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染
	过的每个元素。
	
## 事件修饰符

	.stop			调用event.stopPropagation()
	.prevent		调用event.preventDefault()
	.self			只当事件是从侦听器绑定的元素本身触发时才触发回调
	.once			只触发一次回调
	.left			只当点击鼠标左键时触发
	.right			只当点击鼠标右键时触发
	
## v-model修饰符
    
    v-model 在输入汉字的时候,在输入的是拼音阶段不会触发视图更新。
    
	.lazy
	在默认情况下,v-model在每次input事件触发后将输入框的值与数据进行同步。可以添加lazy修饰符，
	从而转变为使用change事件进行同步。
	
	.number
	如果想自动将用户的输入值转为数值类型，可以给v-model添加number修饰符:
	
	.trim
	如果要自动过滤用户输入的首位空白字符，可以给v-model添加trim修饰符
	
## ref

	ref被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的$refs对象上。如果在普通的DOM元素上使用，
	引用指向的就是DOM元素；
	
	保存在一个对象中  $refs

