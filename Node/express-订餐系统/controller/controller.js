const file = require("../model/file.js");
// 暴露一个预定食物的函数
exports.orderFood = function(req,res,){
    // 获取用户预定的食物,传递给写文件的函数
    let {phone,food} = req.query;
    // 将用户的手机号 和 预定的食物传递给 保存数据的函数
    file.saveData(phone,req.query,(msg)=>{
        res.end(msg);
    });
};
// 显示所有的用户订单数据
exports.showAll = function(req,res){
    file.getAll((data) => {
        console.log(data);
        // 此处接收所有用户的订单并渲染
        res.render("list",{
            data
        })
    });
}

// 展示单个用户购买了哪些商品
exports.showFood = function(req,res){
    console.log(req.params);
    file.showFood(req.params.phone,(data) => {
        console.log(data);
        res.render("user",data)
    })
}