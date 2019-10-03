const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.static("./public"));
app.set("view engine","ejs");

mongoose.connect("mongodb://localhost:27017/blog",{useNewUrlParser:true},(err) => {
    if(err){
        console.log("连接失败");
        return;
    }else{
        console.log("连接成功");
        app.listen(3000);
    }
})

// 设置后台路由
app.use("/admin",require("./routes/admin.js"))

// 首页
app.use("/",require("./routes/main.js"));