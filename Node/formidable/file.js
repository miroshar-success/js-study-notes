let express = require("express");
let formidable = require("formidable");
let app = express();
app.use(express.static("./public"));

app.post("/upload",(req,res) => {
    let form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";   // 设置文件保存的路径
    form.keepExtensions = true;     // 保持文件的后缀名
    form.multiples = true;  // 接收多文件
    form.parse(req,(err,fields,files) => {
        if(!err){
            console.log(files);
            res.send("ok");
        }
    })
})

app.listen(4000);