const fs = require("fs");
/*
const readstream = fs.createReadStream("./test.txt");
let data = "";
readstream.on("data",(chunk) => {
    data += chunk;
});
readstream.on("end",() => {
    console.log(data)
}); */

// 将每次可读流的长度限制为11
var rs = fs.createReadStream("./test.txt",{highWaterMark:11});
let data = "";
rs.setEncoding("utf-8");
rs.on("data",(chunk) => {
    console.log(chunk);
    data += chunk;
});
rs.on("end",() => {
    console.log(data);
});


let http = require("http");
var helloworld = "";
for(let i = 0; i < 1024 * 10; i++){
    helloworld += "a";
}
helloworld = Buffer.from(helloworld);
http.createServer((req,res) => {
    res.writeHead(200);
    res.end(helloworld);
}).listen(8001);