const fs = require("fs");
const path = require("path");
// 点餐后保存用户数据
exports.saveData = function(tel,data,callback){
    let dirname = path.join(__dirname,"../data",tel+".txt");
    fs.writeFile(dirname,JSON.stringify(data),(err)=>{
        if(err){
            console.log(err);
        }else{
            callback("您已点餐成功,请耐心等待!");
        }
    })
}

// 获取已经保存的用户数据
exports.getData = function(callback){
    fs.readdir("./data",(err,fileList)=>{
        if(err){
            console.log(err);
        }else{
            const arrList = fileList.map((value)=>{
                return value.replace(/\.txt/,"");
            });
            callback(arrList);
        }
    })
}

// 获取单个用户的下单数据信息
exports.getOne = function(number,callback){
    const dirname = path.join(__dirname,"../data",number+".txt");
    fs.readFile(dirname,(err,data)=>{
        if(err){
            console.log(err);
        }else{
             // 读到的数据是Buffer
            let food = data.toString();
            console.log(food,typeof food);
            callback(JSON.parse(food));
        }
    })
}

