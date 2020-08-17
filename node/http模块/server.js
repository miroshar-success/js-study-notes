const http = require('http');
const url = require('url');
const fs = require('fs');

var url_str="http://localhost:3000/html/index.html?a=1&b=2&c=3#aaa";
console.log(url.parse(url_str,true));

const str = 'http://www.baidu.com';

// const app = http.createServer(function(req,res) {
    // 给前端返回一个读取的页面
/*    const u = url.parse(req.url);
    res.writeHead(200,{
        'Content-Type':'text/plain;charset=utf-8'
    })
    fs.readFile('./readme.md',(err,chunk) => {
        if(err){
            console.log(err);
        }else{
            res.end(chunk);
        }
    })*/

    // 重定向
/*    res.writeHead(301,{
        'Location':'http://www.baidu.com'
    });
    res.end()*/


    // 读取一张图片
/*    res.writeHead(200,{
        'Content-Type':'image/png'
    });*/
/*    res.setHeader('Set-Cookie',['type=ninja','language=javascript']);
    fs.readFile('./images/1.png','binary',(err,data) => {
        if(err){
            console.log(err);
        }else{
            console.log(data);
            res.write(data,'binary');
            res.end();
        }
    })
});*/

// 为每个文件设置路由
/*const app = http.createServer((req,res) => {
    const {pathname} = url.parse(req.url,true);
    console.log(pathname);
    if(pathname === '/index.html'){
        fs.readFile('.' + pathname,(err,data) => {
            if(err){
                console.log(err);
            }else{
                res.end(data);
            }
        })
    }else if(pathname === '/images/1.png'){
        fs.readFile('.' + pathname,(err,data) => {
            if(err){
                console.log(err);
            }else{
                res.end(data);
            }
        })
    }else if(pathname === '/style.scss'){
        fs.readFile('.' + pathname,(err,data) => {
            if(err){
                console.log(err);
            }else{
                res.end(data);
            }
        })
    }
})*/

// 设置路由的另一个方法
/*const app = http.createServer((req,res) => {
    const {pathname} = url.parse(req.url);
    fs.readFile('.' + pathname,(err,data) => {
        if(err){
            console.log(err);
        }else{
            res.end(data);
        }
    })
})*/


// 获取get请求数据
/*const app = http.createServer((req,res) => {
    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8;'
    })
    fs.readFile('./index.html',(err,data) => {
        if(err){
            console.log(err);
        }else{
            res.end(data);
        }
    })
    const {pathname,query} = url.parse(req.url,true);
    if(pathname === '/login'){
        console.log(query);
        res.end('ok')
    }
})*/



// 获取post请求数据
const qs = require('querystring');

const app = http.createServer((req,res) => {
    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8;'
    })
    fs.readFile('./index.html',(err,data) => {
        if(err){
            console.log(err);
        }else{
            res.end(data);
        }
    });
    const {pathname} = url.parse(req.url,true);
    if(pathname === '/login'){
        let str = '';
        req.on('data',(chunk) => {
            str += chunk;
        });
        req.on('end',() => {
            console.log(qs.parse(str));
            const data = qs.parse(str);
            fs.writeFile('./data/' + data.user + '.txt', JSON.stringify(data),(err) => {
                if(err){
                    console.log(err);
                }else{
                    console.log('数据存储成功');
                }
            })
            res.end('ok');
        })
    }
})

app.listen(3001,() => {
    console.log('app starting at port 3001');
});