const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(express.static("./public"));
app.set("view engine","ejs");
const controller = require("./controller/controller.js");
// 首页,查看所有学生成绩
app.get("/",controller.showIndex);
// 展示添加学生信息页面
app.get("/add",controller.showInfo);
// 增加学生信息,通过post请求
app.post("/add",controller.addInfo);
// 展示删除学生数据的页面
app.get("/remove",controller.showRemove);
// 删除学生的信息
app.post("/remove",controller.removeInfo);
// 展示编辑学生信息页面
app.get('/update',controller.showUpdate);
// 编辑学生信息
app.post("/update",controller.updateInfo);
// 展示查看学生信息的页面
app.get("/check",controller.showCheck);
// 查询学生信息
app.post("/check",controller.checkInfo);
app.listen(3000);
