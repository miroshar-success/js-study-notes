const http = require("http");
const fs = require("fs");
const url = require("url");
const server = http.createServer((req,res) => {
    res.setHeader("content-type","text/html;charset=utf-8");
    // 输入 /student/01 显示该该学生的成绩
    let {pathname,query} = url.parse(req.url,true);
    console.log(pathname,query);
    // 利用正则匹配路径
    if( /^\/student\/\d{2}$/.test(pathname) ){
        fs.readFile("./student.txt",(err,data) => {
            if(err){
                console.log(err);
            }else{
                // 如果有数据,则读取数据
                // 获取学生的学号 保存在number里
                let number = pathname.slice(-2);
               // 读取文件后将信息返回到页面
                let result = JSON.parse(data.toString());
                if(result.hasOwnProperty(number)) {
                    res.write("<h5>姓名:" + result[number].name + "</h5>");
                    res.write("<h5>学号:" + number + "</h5>");
                    res.write("<p>语文:" + result[number]["语文"] + "</p>");
                    res.write("<p>数学:" + result[number]["数学"] + "</p>");
                    res.write("<p>英语:" + result[number]["英语"] + "</p>");
                    res.end();
                }else{
                    res.end("该生信息不存在");
                }
            }
        })
    }

});
server.listen(9000);