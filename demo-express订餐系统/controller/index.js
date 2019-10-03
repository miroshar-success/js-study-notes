const file = require("../models/file.js");
// 获取用户的点餐数据
exports.getData = function(req,res){
    const tel = req.query.tel;
    file.saveData(tel,req.query,(msg)=>{
        res.send(msg);
    });
}
// 获取所有用户保存的用户数
exports.getAll = function(req,res){
    file.getData((fileList)=>{
        res.render("showAll",{
            fileList
        })
    })
};
// 获取某一个用户的下单数据
exports.getOne = function(req,res){
    const number = req.params.number;
    console.log(number);
    file.getOne(number,function(data){
        res.render("showOne",data)
    });
}
