const info = require("./profile.js");
const path = require("path");
const fs = require("fs");
// console.log(info);
// info.say();
//
// console.log(info.firstName);
// console.log(info.lastName);

let name = new info("kyrie");
name.sayName();

console.log(__dirname);
console.log(__filename);

console.log( path.resolve("./main.js") );
console.log( path.resolve("./profile.js"));

let a = "hello";
console.log(global.a);
console.log(global);

console.log(path.extname(__filename));  // .js
console.log(path.parse(__dirname));
console.log(path.parse(__filename));

console.log(path.join(__dirname,"abc","jak"));

fs.access("./profil1e.js",(err)=>{
    // console.log( err ? "有文件" : "没有文件" );
    if(!err){
        console.log("文件存在");
    }else{
        console.log("文件不存在");
    }
})

const programData = {
    name:"Vue-Router",
    fileData:[
        {
            name:"css",
            type:"dir"
        },
        {
            name:"js",
            type:"dir"
        },
        {
            name:"images",
            type:"dir"
        },
        {
            name:"index.html",
            type:"file"
        }
    ]
}

const createFile = require("./demo.js");
console.log(createFile);
createFile.fn(programData);