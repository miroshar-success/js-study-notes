const fs = require('fs');
/*
fs.writeFile('./hello.txt','hello world',{flag:'a'},(err) => {
    if(err){
        console.log(err);
    }else{
        console.log('写入成功');
    }
});

fs.writeFile('./hello.txt',JSON.stringify({name:'kyrie'}),{flag:"a"},(err) => {
    if(err){
        console.log(err);
    }else{
        console.log('写入对象成功');
    }
});*/


fs.readFile('./hello.txt',(err,data) => {
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
});

fs.readFile('./img/1.png',(err,data) => {
    if(err){
        console.log(err);
    }else{
        console.log('图片读取成功:',data);
        fs.writeFile('./img/2.png',data,(err) => {
            if(err){
                console.log(err);
            }else{
                console.log('图片写入成功');
            }
        })
    }
});
/*
const result = fs.unlinkSync('./hello.txt');
console.log(result);*/

fs.stat('./img/1.png',(err,data) => {
    if(err){
        console.lgo(err);
    }else{
        console.log('文件信息:',data);
        console.log('读取的文件是否是文件? ', data.isFile())
    }
});

fs.writeFile('./input.txt','我是通过fs.write写入的数据',(err) => {
    if(err){
        console.log(err);
    }else{
        console.log('数据写入成功');
        console.log('-------------我是分割线--------------');
        fs.readFile('./input.txt',(err,data) => {
            if(err) return err;
            console.log('异步读取文件数据:',data.toString());
        })
    }
});


fs.rmdir('./123',(err) => {
    if(err){
        console.log(err);
    }else{
        console.log('文件删除成功');
    }
});

// 重命名文件
fs.rename('./img/2.png','./img/bourne.png',(err) => {
    if(err){
        console.log(err);
    }else{
        console.log('图片名修改成功');
    }
})