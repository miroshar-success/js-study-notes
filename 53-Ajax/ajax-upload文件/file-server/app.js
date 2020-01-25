const Koa = require("koa");
const router = require("koa-router")();
const app = new Koa();
const formidable = require('formidable');
const fs = require('fs');
/*app.use(async (ctx,next) => {
    ctx.set("Access-Control-Allow-Origin",ctx.headers.origin);
    ctx.set("Access-Control-Allow-Methods","GET,POST,HEAD,DELETE");
    ctx.set("Access-Control-Allow-Credentials",true);
    next();
})*/
app.use(async ctx => {
    console.log(ctx.url);
    if(ctx.url === "/" && ctx.method === "GET"){
        fs.readFile("../index.html",(err,data) => {
            if(err) return;
            ctx.body = data.toString();
            console.log(data.toString())
        })
    }
})


router.post("/files",async ctx => {
    let form = new formidable.IncomingForm();
    form.uploadDir = './upload';
    form.multiples = true;
    form.keepExtensions = true;
    form.parse(ctx.req,(err,fields,files) => {
        if(!err){
/*            form.on("progress",function(bytesReceived,bytesExpected){
                console.log(`bytesReceived:${bytesReceived},bytesExpected:${bytesExpected}`)
                ctx.body = `bytesReceived:${bytesReceived},bytesExpected:${bytesExpected}`;
            })*/
            ctx.body = "上传成功";
        }
    });
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(63342,() => {
    console.log("app start at port 63342");
})