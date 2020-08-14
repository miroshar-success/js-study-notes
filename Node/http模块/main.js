let fs = require("fs");
let path = require("path");
let programData = {
    name:"node.js文件",
    fileData:[
        {
            name:"css",
            type:"dir"
        },
        {
            name:"images",
            type:"dir"
        },
        {
            name:"js",
            type:"dir"
        },
        {
            name:"index.html",
            type:"file"
        }
    ]
}
// 创建一个文件夹,然后判断 在文件夹下创建的文件 是文件还是文件夹。
exports.createFile = function(programData){
    let {name,fileData} = programData;
    fs.access(name,(err)=>{
        if(err){
            fs.mkdirSync(name);
            fileData.forEach((item)=>{
                const dirname = path.join(__dirname,name,item.name);
                if(item.type === "dir"){
                    // 如果是文件夹,则在name下创建文件
                    // fs.mkdirSync(name+"/"+item.name);
                    // 使用绝对路径
                    fs.mkdirSync(dirname);
                }else{
                    fs.writeFile(dirname,"",(err)=>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log("文件夹创建成功");
                        }
                    })
                }
            })
        }
    })
}