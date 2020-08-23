const http = require('http');

http.createServer((req,res) => {
    res.setHeader('Set-Cookie','language=javascript;Max-Age=1000*60;HttpOnly=true');
    res.setHeader('content-type','text/plain;charset=utf-8');
    console.log(req.headers.cookie);
    res.end('hello world');

}).listen(3003,() => {
    console.log('app starting at port 3003');
})