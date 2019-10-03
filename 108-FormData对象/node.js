const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const formidable = require("formidable");
app.use(bodyParser.urlencoded({
    extended:false
}))
app.post("/",function(req,res){
    res.header(200,{
        "Access-Control-Allow-Origin":"*",
    });
    console.log(req.body);
    let form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files) => {
        console.log(fields,files);
        res.send("上传成功");
    })
}).listen(7000);
console.log("程序已启动");