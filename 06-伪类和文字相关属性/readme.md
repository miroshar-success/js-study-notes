
# input
	
	修改input光标及文本颜色：color:red
	修改input输入框的光标颜色但不修改文本颜色：caret-color:red;
	
	:invalid CSS 伪类 表示任意内容未通过验证的 <input> 或其他 <form> 元素 .
	:valid CSS 伪类表示内容验证正确的<input> 或其他 <form> 元素。
```css
input:valid {
  background-color: powderblue;
}
```
	
# white-space

    pre: 空白会被浏览器保留
    nowrap: 文本不会换行，会在同一行上继续
    pre-wrap: 保留空白符序列，正常进行换行
    pre-line: 合并空白符序列，正常进行换行（多个空格会被合并）
    
![pre-line和pre-wrap区别](https://www.cnblogs.com/qianlegeqian/p/3987235.html)