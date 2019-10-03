const express = require("express");
const app = express();

app.use(express.static("public"));
app.set("view engine","ejs");
const controller = require("./controller/index.js");

app.get("/:number",controller.showResult);

app.listen(5000);
console.log("服务监听在5000端口下");
