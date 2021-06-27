# fs模块

    Node.js内置的 File System模块, 专门用来对文件的增删改查操作。

    Node导入文件系统模块语法(fs)
    const fs = require("fs");

    异步方法函数最后一个参数为回调函数,回调函数的第一个参数包含了错误信息(error).

## fs.readFile
	
	读取的数据是Buffer数据
```js
// 读取文件
fs.readFile("./input.txt",(err,data)=>{
    if(err){
        console.log(err);
    }else{
        console.log(data.toString());
    }
})
```
## fs.writeFile

    fs.writeFile(file,data[,options],callback)
        file:文件名或文件描述
        data:要写入的数据
        options:{encoding,mode,flag}   flag 默认为,"w",有则覆盖,没有数据则创建。
										flag "a" 有数据则追加数据,没有则创建。
        callback:只包含错误信息,在写入失败时返回
```js
// 写入文件 writeFile直接打开方式默认是w模式,如果文件存在，改方法写入的内容会覆盖旧的文件内容。
{flag:"a"} 以追加内容的方式写入文件

file.writeFile("./input.txt","Hello World",(err,data)=>{
    if(err){
        console.log(err);
    }else{
        console.log("文件写入成功");
    }
})
```
	tips: 1. 写入的数据会自动转为字符串格式,默认调用toString()方法。

## fs.stats

	获取文件信息
	fs.stat(path,callback)
		path:文件路径
		callback:(err,stats)    stats是fs.Stats对象

## 删除文件

	fs.unlink(path,callback);

## 创建目录

	fs.mkdir(path,options,callback)
		path:创建目录的路径
		options:
			recursive:是否以递归的方式创建目录,默认为false
					tips:   当要创建多层级目录的时候设置为true,否则会报错
			mode:设置目录权限,默认为0777

## 删除目录

	fs.rmdir(path,callback)
	tips:
	删除目录也要一层一层的删除

## 读取目录

	fs.readdir(path,callback);	返回的是一个数组

## 检查文件是否存在

	fs.access(path,callback)
	if(err) 则表示文件不存在,否则表示文件存在

## 文件重命名

	fs.rename(oldPath,newPath,callback)
	
	参数是路径，表示也可以移动文件。

# Buffer

	JavaScript语言自身只有字符串数据类型，没有二进制数据类型。在Node.js中，定义了一个Buffer类，用来创建一个专门存放二进制数据的
	缓存区。
	Buffer.from()接口创建Buffer对象。
	buffer.length：字节长度
	
	Tips:
	1. Buffer所占用的内存不是通过V8分配的，属于堆外内存。
	2. Buffer受Array影响很大，可以访问length属性得到长度,也可以通过下标访问元素。
	3. 创建一个指定长度的buffer使用 Buffer.alloc()方法；
    
## 创建Buffer类

    二进制的数据 以十六进制显示，主要用来操作字节。Buffer对象的内存分配不是在V8的堆内存中,而是在Node的C++层面实现内存的申请的。
	因为处理大量的字节数据不能采用需要一点内存就像操作系统申请一点内存的方式。这可能造成大量的内存申请的系统调用。
	
		tips: 1个中文在UTF-8编码下为3个字节,字母为1个字节。

    Buffer.alloc(size);     返回一个指定大小的Buffer实例
    Buffer.allocUnsafe()    返回一个指定大小的Buffer实例，但是它不会被初始化。
    Buffer.from(string);    返回一个被String的值初始化的新的Buffer实例

    Buffer.toString()   将buffer类型转为字符串
	Buffer.from()		将字符串转为Buffer
			
## 写入缓冲区
    
	Buffer对象可以存储不同类型编码的字符串的值,调用 write()方法可以不断写入内容到Buffer对象中。
	buf.write(string,[offset],[length],[encoding])
			
		string: 写入缓冲区的字符串
		offset:缓冲区开始写入的索引值
		length:写入的字节数
		encoding:使用的编码.默认为"utf-8"
			
	从缓冲区读取数据
		buf.toString([encoding],start,end);
        
## 缓冲区合并

	Buffer.concat(list,[totalLength])
		list:用于合并的Buffer对象数组列表
		totalLength:指定合并后Buffer对象的总长度    
	
	
	拷贝缓冲区:
		buf.copy(targetBuffer)
    
## Buffer的拼接
    
```js
let fs = require("fs");
var rs = fs.createReadStream("test.txt");
let data = "";
rs.on("data",(chunk)=>{
    data += chunk;
});
rs.on("end",() => {
    console.log(data);
})
```
    tips:
    1. data+= chunk 这里隐藏了 data = data.toString() + chunk.toString();