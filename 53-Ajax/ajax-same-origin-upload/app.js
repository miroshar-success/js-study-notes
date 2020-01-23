const http = require("http");
const fs = require("fs");
const formidable = require("formidable");
const app = http.createServer((req,res) => {
    res.writeHead(200,{
        "Content-Type":"text/html;charset=utf-8"
    })
    fs.readFile("./index.html",(err,data) => {
        if(err) return;
        res.end(data.toString());
    })
    console.log(req.url,req.method);
    if(req.url === "/upload" && req.method.toLowerCase() === "post"){
        const form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.uploadDir = "./upload";
        form.multiples = true;
        form.parse(req,(err,fields,files) => {
            if(err) return;
            console.log(fields,files);
        })
    }
});

app.listen(3000, () => {
    console.log("app start at port 3000");
})