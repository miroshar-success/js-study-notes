let str = "深入浅出node.js";
var buffer = Buffer.from(str,"utf-8");
console.log(buffer);

var buf1 = Buffer.alloc(100);
console.log(buf1.length);
buf1[40] = 25;
buf1[20] = -100;
console.log(buf1[40],buf1[20]);

buf = Buffer.alloc(256);
let len = buf.write("www.runoob.com",10,10,"utf-8");
console.log(len);
console.log(buf);
console.log(buf.toString("utf-8",0,20));

let buffer1 = Buffer.from("菜鸟教程");
let buffer2 = Buffer.from("www.runoob.com");
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log(buffer3,buffer3.toString());