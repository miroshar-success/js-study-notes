const fs = require("fs");

// 写入文件
fs.writeFile("./hello.txt","我是用fs模块写入的文件",{flag:"a"},(err)=>{
    if(err){
        console.log("写入失败");
    }else{
        console.log("写入成功");
    }
});

fs.writeFile("./hello.txt",[1,2,3],{flag:'a'},(err)=>{
    if(err){
        console.log("写入失败");
    }else{
        console.log("写入成功");
    }
});

fs.writeFile("./hello.txt",{name:'kyrie'},{flag:"a"},(err)=>{
    if(err){
        console.log("写入失败");
    }else{
        console.log("写入成功");
    }
});

// 读取文件
fs.readFile("./1.jpg",(err,data)=>{
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
});
fs.readFile("./hello.txt",(err,data)=>{
    if(err){
        console.log(err);
    }else{
        console.log(data.toString());
    }
});

// 通过读写操作复制一张图片
fs.readFile("./1.jpg",(err,data)=>{
    if(err){
        console.log("图片读取失败");
    }else{
        fs.writeFile("./gcj.jpg",data,{flag:"w"},(err)=>{
            if(err){
                console.log("图片写入失败");
            }else{
                console.log("图片复制成功");
            }
        })
    }
});

// 获取文件信息
fs.stat("./1.jpg",(err,stats)=>{
    if(err){
        console.log("没有读取到文件");
    }else{
        console.log("是文件夹吗？" + stats.isDirectory());    // false
        console.log("是文件吗?" + stats.isFile());  // true
    }
});

// 删除文件

fs.unlink("./hello.txt",(err)=>{
    if(err){
        console.log("删除失败");
    }else{
        console.log("删除成功");
    }
})

// 读取文件
fs.readdir("../buffer",(err,data)=>{
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
});

fs.readdir("../fs模块",(err,data)=>{
    if(err){
        console.log(err);
    }else{
        console.log(data);
        console.log(data instanceof Array); // true
    }
});

// 判断路径是否存在
fs.access("./app.js",(err)=>{
    if(err){
        console.log("路径不存在");
    }else{
        console.log("路径存在");
    }
})

// 重命名文件
fs.rename("./1.jpg","./郭采洁.jpg",(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("文件已重命名");
    }
});

fs.rename("./gcj.jpg","./imgs/1.jpg",(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("文件移动成功");
    }
})
