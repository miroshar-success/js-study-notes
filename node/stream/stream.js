const fs = require('fs');

// Buffer的拼接

const rs = fs.createReadStream('./readme.md.md');
console.log('read stream:',rs);

let start = new Date();
let data = '';
rs.on('data',(chunk) => {
    console.log(chunk);
    data += chunk;
});
rs.on('end',() => {
    console.log('文件读取完毕所需的时间:',new Date() - start);
    console.log(data);
})

/*
fs.readFile('./readme.md.md',(err,data) => {
    if(err){
        console.log(err);
    }else{
        console.log(data);
        console.log('文件读取完毕所需的时间:',new Date() - start);
    }
})*/

// 设置了 setEncoding

const readStream1 = fs.createReadStream('./poem.txt',{highWaterMark:11});
let str = '';
readStream1.setEncoding('utf8');
readStream1.on('data',(chunk) => {
    str += chunk;
})
readStream1.on('end',() => {
    console.log('设置了setEncoding----文件读取完毕');
    console.log(str);
});


const readStream2 = fs.createReadStream('./poem.txt',{highWaterMark:11});
let poem = '';

readStream2.on('data',(chunk) => {
    poem += chunk;
});
readStream2.on('end',() => {
    console.log('未设置setEncoding --- 文件读取完毕');
    console.log(poem);
})


// 使用iconv-lite 模块
const iconv = require('iconv-lite');
const readStream3 = fs.createReadStream('./poem.txt',{highWaterMark:11});
let chunks = [];
let size = 0;
readStream3.on('data',(chunk) => {
    chunks.push(chunk);
    size += chunk.length;
});
readStream3.on('end',() => {
    var buffer = Buffer.concat(chunks,size);
    var str = iconv.decode(buffer,'utf-8');
    console.log('使用了iconv-lite模块再进行的转码');
    console.log(str);
})


const readerStream = fs.createReadStream('./poem.txt');
const writerStream = fs.createWriteStream('./output.txt');
let chunk = '';

readerStream.on('data',(buffer) => {
    chunk += buffer;
    writerStream.write(buffer);
});

readerStream.on('end',() => {
    console.log('文件读取结束');
})




