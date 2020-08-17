// 这个模块用来存储用户的数据
const fs = require("fs");
exports.saveData = function(phone,data,callback){
    // 写入文件,文件名以用户手机号命名,此处接收到的数据为object,需要转成JSON格式
    fs.writeFile("./data/"+phone+'.txt',JSON.stringify(data),(err)=>{
        if(!err){
            callback("点餐成功,请耐心等待");
        }
    })
};

// 该函数用来显示所有用户的下单数据
exports.getAll = function(callback){
    fs.readdir("./data",(err,fileList)=>{
        let arrList = fileList.map((item) => {
            return item.replace(".txt","");
        })
        if(!err){
            // 将读取到的数据传递出去
            callback(arrList);
        }
    })
}
// 展示每个用户点击了哪些商品
exports.showFood = function(phone,callback){
    fs.readFile("./data/"+phone+'.txt',(err,data) => {
        if(!err){
            callback( JSON.parse(data) );
        }
    })
}