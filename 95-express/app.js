const express = require("express");
const app = express();

// get方法
/*app.get("/",(req,res) => {
    res.setHeader("Content-Type","text/html");
    res.write("<h2>Hello World!</h2>");
    res.end();
});

app.listen(4000,() => {
    console.log("Example app listening on port 4000");
}) */
app.use(express.static("public"));

app.use("/login",(req,res)=>{
    res.setHeader("Content-Type","text/html;charset=utf-8");
    console.log(req.url);
    console.log(req.query);
    res.end("登陆成功");
});
app.listen(3030,()=>{
    console.log("example app listening on port:3030");
})