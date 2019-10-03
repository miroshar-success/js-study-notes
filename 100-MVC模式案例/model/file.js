// 读取文件和保存数据
let fs = require("fs");
// 暴露一个读取文件的函数
exports.read = function(number,callback){
    fs.readFile("./data/"+number+'.txt',(err,data) => {
        // 如果没有读取到文件,则表示没有数据
        if(err){
            console.log(err);
            callback(-1);
        }else{
            // 否则 就是有数据,将数据传递出去
            console.log(data);
            // 此处读取到的文件是Buffer,需要将Buffer转为字符串格式
            callback(JSON.parse(data));
        }
    })
}
// 保存数据
exports.save = function(number,data){
    // 写入文件的时候,将数组保存为字符串
    fs.writeFile("./data/"+number+".txt",JSON.stringify(data),(err)=>{
        if(err){
            console.log("文件保存失败");
        }else{
            console.log("文件保存成功");
        }
    })
}