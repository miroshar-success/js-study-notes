const fs = require("fs");
const path = require("path");
// 读取数据,判断是否存储了已经计算过的数据
exports.read = function(number,callback){
    const dirname = path.join(__dirname,"../data",number+".txt");
    fs.readFile(dirname,(err,data)=>{
        if(err){
            // 如果没有存储数据,则传递-1
            callback(-1);
        }else{
            // 如果存储了数据,则返回存储的数据
            callback(data);
        }
    })
}
// 保存数据,如果没有计算过,则保存当前计算的因素
exports.save = function(number,arrList){
    const dirname = path.join(__dirname,"../data",number+".txt");
    fs.writeFile(dirname,JSON.stringify(arrList),(err)=>{
        if(err){
            console.log("文件保存失败");
        }else{
            console.log("文件保存成功");
        }
    })
}
