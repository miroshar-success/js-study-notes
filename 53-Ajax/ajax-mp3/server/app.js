const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((req,res) => {
    res.writeHead(200,{
        "Content-Type":"text/html;charset=utf-8",
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods":"GET,PUT,POST",
        "Access-Control-Allow-Credentials":true
    })
    let obj = url.parse(req.url,true);
    if(obj.pathname === "/mp3"){
        fs.readFile("./mp3/WorldCup.mp3",(err,data) => {
            if(err) {
                console.log(err);
            }else{
                res.end(data);
            }
        })
    }
})
server.listen(5000,() => {
    console.log("app starting at port 5000")
});