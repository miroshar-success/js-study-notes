const Koa = require("koa");
const router = require("koa-router")();
const app = new Koa();
const formidable = require('formidable');

app.use(async (ctx,next) => {
    ctx.set("Access-Control-Allow-Origin",ctx.headers.origin);
    ctx.set("Access-Control-Allow-Methods","GET,POST,HEAD,DELETE");
    ctx.set("Access-Control-Allow-Credentials",true);
    next();
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

app.use(router.routes());

app.listen(4000,() => {
    console.log("app start at port 4000");
})