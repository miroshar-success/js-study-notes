# FileList 和 File
	
	当用户通过Input的file控件选取文件后,这个控件的files属性就是FileList对象。结构上类似于数组，
	包含用户选取的多个文件,每个文件是一个File对象。
    
    通常情况下,File对象是来自用户在一个<input>元素上选择文件后返回的FileList对象,也可以是来自由拖放操作生成的dataTransfer对象
    或者来自HTMLCanvasElement上的mozGetAsFile()API。
    	
	
	tips:
	1. 给input标签设置multiple属性时可选择多个文件。
    2. File对象是特殊类型的Blob,且可以用在任意的Blob类型的context中。FileReader() URL.createObjectURL() 及
    XMLHttpRequest.send()都能处理Blob和File
    
```js
1. 当Input控件的内容改变时触发

document.getElementByIId('input').files[0];

oInput.addEventListener('change',function(){
	console.log(this.files);	// FileList
	console.log(this.files.constructor);	// FileList() 
	console.log(this.fiels.item(0).constructor);	// File
},false);


2. 在拖拽时触发
oBox.addEventListener('dragover',drag,false);
oBox.addEventListener('drop',drag,false);
function drag(e){
	e = e || window.e;
	e.preventDefault();
	e.returnValue = false;
	let type = e.type;
	switch(type){
		case 'dragover':
		break;
		case 'drop':
		console.log(e.dataTransfer);
		break;
	}
}

const dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('drop',handleFileSelect,false);

function handleFileSelect(e){
	e = e || window.e;
	e.preventDefault();
	e.stopPropagation();
	const files = e.dataTransfer.files;
}
```

# Blob
	
	Blob对象代表了一段二进制数据.
	Blob对象表示一个不可变,原始数据的类文件对象。File接口基于Blob,继承了blob的功能并将其扩展使其支持用户
	系统上的文件。
	
	File.prototype.__proto__ == Blob.prototype // File.prototype = new Blob();
	
	使用Blob构造函数生成blob对象时,接收两个参数,第一个参数是一个包含数据数据的数组,第二个参数是数据的类型。
	
	可以用来隐藏真实的下载地址,防止别人爬虫
```js
const blob = new Blob([data],{type:'text/xml'});
```
	tips:
		1. 从Blob中读取内容的唯一方法是使用FileReader。
		2. 生成blob对象的两种方法： 使用Blob构造函数 或对现有的Blob对象使用slice方法切出一部分。
	
## example
	
	利用blob对象和a标签生成可下载链接
```js
const blob = new Blob(['Hello World']);
const a = document.createElement('a');
a.href = window.URL.createObjectURL(blob);
a.download = 'hello-world.txt';
a.textContext = 'DownLoad-Hello-World';
document.body.appendChild(a);
```

## BloB属性
	
	Blob.size
	  Blob对象中所包含数据的大小
	  
	 Blob.type
	   一个字符串，表明该Blob对象所包含数据的MIME类型。
	   
# FileReader
	
	FileReader对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区)的内容,使用File或Blob
	对象指定要读取的文件或数据。参数是File对象或Blob对象。
	
	FileReader() 返回一个新构造的FileReader。
	
## 属性
	
	FileReader.error
		表示在读取文件时发生错误。
		
	FileReader.readyState
		表示FileReader状态的数字。
		0	还没有加载任何数据
		1	数据正在被加载
		2	已完成全部的读取请求
		
	FileReader.result
	    tips:文件的内容。该属性仅在读取操作完成后才有效，数据的格式取决于使用哪个方法来启动读取数据操作。
	    FileReader.onload 处理load事件,该事件在读取操作完成时触发。
		
## 事件处理
	
	FileReader.onabort
		读取操作被中断时触发
		
	FileReader.onerror
		读取发生错误时触发
		
	FileReader.onload
		读取操作完成时触发
		
	FileReader.onloadstart
		读取操作开始时触发
		
	FileReader.onloadend
		读取操作结束时(要么结束，要么失败)触发
		
	FileReader.onprogress
		读取Blob时触发
		
## 方法
	
	FileReader.readAsArrayBuffer()
	开始读取指定的 Blob中的内容, 一旦完成, result 属性中保存的将是被读取文件的 ArrayBuffer 数据对象
	
	FileReader.readAsDataURL()
	开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容。
	它的作用基本上是将文件数据进行Base64编码,得到的是图片本身
	
	FileReader.readAsText()
	开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个字符串以表示所读取的文件内容
	
# URL.createObjectURL
	
	会创建一个DOMString,其中包含一个表示参数中给出的对象的URL。这个URL的声明周期和创建它窗口中的document
	绑定。这个新的URL对象表示指定的File对象或Blob对象。
	
	得到的是图片的链接,这个url存在的时间,等同于网页的存在时间,一旦网页刷新或卸载,这个URL就失效。
	
# URL.revokeObjectURL
	
	该方法用来释放一个之前通过调用URL.createObjectURL()创建已经存在的URL对象。

## URL和FileReader区别
	
	FileReader这种方式把图片转成base64形式,得到的是图片本身
	window.URL.createObjectURL(Blob|File) 得到的是一个图片链接