const express = require("express");
const app = express();
const controller = require("./controller/controller.js");
app.use(express.static("./public"));
app.set("view engine","ejs");   // 设置模板引擎
/*
app.get("/:number",(req,res)=>{
    console.log(req.params);
    console.log(req.url,req.path);
    // req.params 是一个对象
    // res.send("你好"); // res.end() 只能传递字符串和Buffer
    res.send({name:"Hello"});
}); */
// 命名路由
app.get("/:number",controller.showResult);
app.listen(7000);