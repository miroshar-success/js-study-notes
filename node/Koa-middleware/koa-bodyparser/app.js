const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const router = require('koa-router')();
const path = require('path');
const bodyParser = require('koa-bodyparser');

app.use(views(
    path.join(__dirname,'./views'),
    {extension:'ejs'}
));

app.use(bodyParser());

router.get('/',async ctx => {
    await ctx.render('index')
})
// 原生node.js获取post数据
function getPostData(ctx){
    return new Promise((resolve,reject) => {
        try{
            let str = '';
            ctx.req.on('data',(chunk) => {
                str += chunk;
            });
            ctx.req.on('end',() => {
                resolve(str);
            })
        }catch(err){
            reject(err);
        }
    })
}

router.post('/login',async ctx => {
    // const data = await getPostData(ctx);
    const data = ctx.request.body;
    console.log(data);
    ctx.body = '上传成功';
});


app.use(router.routes()).use(router.allowedMethods());

app.listen(3002,() => {
    console.log('app starting at port 3002');
})