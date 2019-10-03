const express = require("express");
const controller = require("./controller/index.js");
const app = express();
app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/order",controller.getData);
app.get("/all",controller.getAll);
app.get("/all/:number",controller.getOne);
app.listen(3000);
console.log("服务监听在3000端口下");
