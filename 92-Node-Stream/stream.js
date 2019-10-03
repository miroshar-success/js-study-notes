const fs = require("fs");

// 写入一个文件,再读取
fs.writeFile("./input.txt","浮生却似冰底水，日夜东流人不知",(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("文件写入成功");
    }
});

//创建一个readme.md文件
/*
fs.writeFile("./readme.md","",(err)=>{
    if(err){
        console.log(err);
    }
    console.log("文件创建成功");
})
*/

// 创建可读流
const rs = fs.createReadStream("./input.txt");
// rs.resume();

rs.on("data",(err,data)=>{
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
})
/* rs.on("end",(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("数据读取完成");
    }
}); */

rs.on("finish",(err) => {
    if(err){
        console.log(err);
    }else{
        console.log("数据读取完成");
    }
});

let start = new Date();
/*
fs.readFile("./1.jpg",(err,data)=>{
    if(err){
        console.log(err);
    }else{
        console.log(data);
        console.log(new Date() - start);
    }
});
*/

/*let readstream = fs.createReadStream("./1.jpg");
let writestream = fs.createWriteStream("./2.jpg");
console.log(readstream);

readstream.on("data",(err,chunk) => {
    if(err){
        console.log(err);
    }else{
        console.log(chunk);
        writestream.write(chunk);
    }
});
readstream.on("end",function(err){
    if(err){
        console.log(err);
    }
    console.log(new Date() - start );
});

let data = "我是写入流创建的数据";
const ws = fs.createWriteStream("./output.txt");
ws.write(data,"UTF8");
*/

let readStream = fs.createReadStream("./demo.txt");
let writeStream = fs.createWriteStream("./demo1.txt");

readStream.pipe(writeStream);
console.log("程序执行完毕");
