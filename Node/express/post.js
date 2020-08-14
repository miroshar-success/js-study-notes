// formidable 接收Post数据
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(express.static("public"));
/*
app.post("/login",(req,res)=>{
    // console.log(req.method,req.protocol,req.query,req.params,req.router,req.path);
    let form = new formidable.IncomingForm();
    form.uploadDir = "./upload";
    form.type = true;
    form.parse(req,(err,fields,files)=>{
        if(!err){
            console.log(fields);
            console.log(files);
            let extname = path.extname(files.source.name);
            // fs.rename(oldPath,newPath,callback)
            fs.rename(files.source.path,files.source.path+extname,(err)=>{
                if(!err){
                    res.send("ok");
                }
            });
            res.send("ok");
        }
    })
}) */

app.use(bodyParser.urlencoded({
    extended:false
}))

app.post("/login",(req,res)=>{
    console.log(req.body);
    res.send("ok");
})

app.listen(8080);