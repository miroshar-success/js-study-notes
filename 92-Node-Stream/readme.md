
# Stream

    Stream是一个抽象接口，Node.js中，Stream有四种流类型:
        Readable: 可读操作
        Writable:  可写操作
        Duplex: 可读可写操作
        Transform: 操作被写入数据，然后读出结果。
        
    所有的Stream对象都是EventEmitter的实例。常用的事件有:
        data - 当有数据可读时触发
        end - 没有更多的数据可读时触发
        error - 在接收和写入过程中发生错误时触发
        finish - 所有数据已被写入到底层系统时触发。
        
## Stream的来源

	1. 从控制台输入
	2. http请求中的request
	3. 读取文件

	控制台输入:
```js
process.stdin.on("data",(chunk)=>{
	console.log("stream by stdin",chunk,chunk.toString());
})
```

## stream的去处

	1. 输出到控制台
	2. http请求中的response
	3. 写入文件

## 创建可读流
    
```js
const fs = require("fs");
// 创建的可读流默认是静止的
const readstream = fs.createReadStream("input.txt"); 

// 处理流事件
readstream.on('data',function(err){
    if(err){
        console.log(err);
    }
});
readstream.on("end",function(err){
    if(err){
        console.log(err);
    }
    console.log("文件读取结束");
})
```
    tips:
    1. readFile的局限性，只能读取体积小的文件。读取大文件时间比较长.
    2. readStream读取大文件
    3. 读取大文件时，每次读取的字节数highWaterMark:65536
	4. resume()方法可以让可读流运动起来
    
## 写入流

```js
const fs = require("fs");
const writestream = fs.createWriteStream("./output.txt");
writestream.write(data,"UTF8");
```

## 管道流

    管道流提供了一个输入流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。
```js
let readStream = fs.createReadStream("./input.txt");
let writeStream = fs.writeStream("./output.txt");

readStream.pipe(writeStream);
 ```
    
## Tips	
	
	Buffer的拼接
```js
var fs = require("fs");
let rs = fs.createStream("./input.txt");	// 文件内容以静夜思为例
rs.on("data",(chunk)=>{
	data+=chunk;		
	// 这里隐藏了一句 data = data.toString() + chunk.toString(),所以下面输出来的数据 是字符串,而不是buffer
});
rs.on("end",(err)=>{
	if(err){
		console.log(err);
	}else{
		console.log(data);
	}
})；
```
	如果设置了每次读取的Buffer字节长度,如：
	let rs = fs.createStream("./input.txt",{highWaterMark:11});
	则会输出乱码的数据,为了解决这种情况的发生,
	
	1. 可以设置 data 事件 传入的数据格式, setEncoding("UTF8"),为编码后的字符串,而不再是Buffer对象。