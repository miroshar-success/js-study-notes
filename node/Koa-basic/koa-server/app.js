const Koa = require("koa");
const app = new Koa();

app.use(async ctx => {
    console.log(app.env);
    console.log("ctx.header",ctx.header);
    console.log("ctx.headers",ctx.headers);
    console.log("ctx.method",ctx.method);
    console.log("ctx.url",ctx.url);
    console.log("ctx.originUrl",ctx.originUrl);
    console.log("ctx.origin",ctx.origin);
    console.log("ctx.path",ctx.path);
    console.log("ctx.query",ctx.query);
    console.log("ctx.querystring",ctx.querystring);
    console.log("ctx.socket",ctx.socket);
    console.log("ctx.ip",ctx.ip);
    console.log("ctx.href",ctx.href);
    // ctx.body = "你好，世界";
    ctx.type = "text/html;charset=utf-8";
    ctx.body = '[1,2,3]';
})

app.listen(3000);