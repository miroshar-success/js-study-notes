const express = require("express");
const app = express();
app.use(express.static("./public"));
app.set("views engine","ejs");
let controller = require("./controller/controller.js");
// 订餐页面
app.get("/order",controller.orderFood);
// 所有用户订单页面
app.get("/all",controller.showAll);
// 单个用户的点了哪些食物
app.get("/all/:phone",controller.showFood);
app.listen(3000);