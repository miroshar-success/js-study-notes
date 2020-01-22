const fs = require("fs");
const http = require("http");
const path = require("path");

http.createServer((req,res)=>{
	const fileName = path.join(__dirname,"ajax封装.txt");
	console.log(fileName)
	console.log(path.resolve(__dirname,"ajax封装.txt"));
	fs.readFile(fileName,(err,data)=>{
		if(err){
			console.log(err);
		}else{
			res.setHeader("Content-Type","text/plain;charset=utf-8");
			res.end(data.toString());
		}
	})
}).listen(3000);
console.log("浏览器已经监听在3000端口");

// 使用文件读取并没有什么问题,如果data.txt文件非常大的话,可能会消耗大量内存,这样可能造成用户链接缓慢的问题.

// 使用stream 可以一边读取,一边返回数据,数据通过管道流动到客户端，
 http.createServer(function(req,res){
	const fileName = path.resolve(__dirname,"ajax封装.txt");
	let readStream = fs.createReadStream(fileName);
	res.setHeader("Content-Type","text/plain;charset:utf-8");
	readStream.pipe(res);
}).listen(3030);

process.stdin.on("data",function(chunk){
	console.log("stream by stdin",chunk,chunk.toString());
})
