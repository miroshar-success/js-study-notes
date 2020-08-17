// 引入连接连接数据库的db.js文件
let db = require("../models/db.js");
// 展示首页
exports.showIndex = function(req,res){
    db.getAllStudent((results)=>{
        res.render('index',{
            results
        });
    })
}
// 显示增加学生信息的页面
exports.showInfo = function(req,res){
    res.render("add");
}
// 增加学生信息提交数据
exports.addInfo = function(req,res){
    db.addInfo(req.body,(msg)=>{
        res.send(msg);
    });
}
// 暂时删除学生数据
exports.showRemove = function(req,res){
    res.render("remove");
}
// 删除学生的数据
exports.removeInfo = function(req,res){
    console.log(req.body);
    db.removeInfo(req.body.name,(msg)=>{
        if(msg == -1){
            res.send("该生信息不存在");
        }else{
            res.send("删除成功");
        }
    });
}
// 展示编辑学生信息页面
exports.showUpdate = function(req,res){
    res.render("update");
}
// 编辑学生信息
exports.updateInfo = function(req,res){
    db.updateInfo(req.body.name,req.body,(msg)=>{
        if(msg == -1){
            res.send("该生信息不存在,无法编辑");
        }else{
            res.send(msg);
        }
    });
}
exports.showCheck = function(req,res){
    res.render("check.ejs");
}

exports.checkInfo = function(req,res){
    db.checkInfo(req.body.name,(msg)=>{
        if(msg == -1){
            res.send("您查看的学生信息不存在");
        }else{
            res.send(msg);
        }
    });
}