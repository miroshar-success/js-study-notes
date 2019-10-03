const fs = require("fs");

//写入文件
fs.writeFile("./hello.txt","Hello Kyrie!",function(err){
    if(err){
        console.log(err);
    }else{
        console.log("文件写入成功");
    }
});

console.log("Hello World!");

//读取文件
fs.readFile("./hello.txt",(err,data)=>{
    if(err){
        console.log(err);
    }else{
        console.log(data.toString());
    }
});

fs.readFile("./input.txt",(err,data) => {
    if(err){
        console.log(err);
    }else{
        console.log(data.toString());
    }
})

fs.writeFile("./demo.txt","我是demo",{flag:"a"},(err) => {
    if(err){
        console.log(err);
    }else{
        console.log("文件写入成功");
    }
    console.log("--------我是分割线------------");
    fs.readFile("./demo.txt",(err,data)=>{
        if(err){
            console.log(err);
        }else{
            console.log(data.toString());
            console.log("数据读取成功");
        }
    })
});

fs.open("./hello.txt","r+",(err,fd)=>{
    if(err){
        console.log(err);
    }else{
        console.log("文件打开成功");
        console.log(fd);
    }
})

console.log("开始获取文件信息");
fs.stat("./hello.txt",(err,stats)=>{
    if(err){
        console.log(err);
    }else{
        console.log(stats);
        console.log("hello.txt是文件吗?" + stats.isFile() );
        console.log("hello.txt是目录吗?" + stats.isDirectory());
    }
})

fs.readFile("C:/Users/11295/Desktop/timg.jpg",(err,data) => {
    if(err){
        console.log(err);
    }else{
        fs.writeFile("./1.png",data,(err)=>{
            if(err){
                console.log(err);
            }else{
                console.log("数据写入成功");
            }
        })
    }
});

fs.unlink("./hello.txt",(err)=>{
    if(err){
        console.log(err);
    }
    console.log("文件删除成功");
});

console.log("开始创建目录");
// fs.mkdir("./images/logos/pngs",{recursive:true},(err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log("目录创建成功");
//     }
// });

//开始删除目录
// fs.rmdir("./images",(err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log("目录删除成功");
//     }
// });

// 读取目录
fs.readdir("../91-Node",(err,file) => {
    if(err){
        console.log(err);
    }else{
        console.log("开始读取目录");
        console.log(file);
        console.log(Array.isArray(file));
        file.forEach(item => {
            console.log(item);
        })
    }
});

// fs.access() 检查当前目录是否有该文件
fs.access("./demo.txt",(err) => {
    console.log(!err? "文件存在" : "不存在");
})

//fs.rename()  文件重命名

// fs.rename("./1.png","jay.png",(err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log("文件重命名成功");
//     }
// })

// fs.rename("./jayk.png","jayk1.png",(err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log("文件重命名成功");
//     }
// });

fs.watchFile("./input.txt",(cur,prev)=>{
    console.log(cur.size,prev.size);
})

