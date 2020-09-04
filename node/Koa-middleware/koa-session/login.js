const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());

app.use(async (ctx,next) => {
    ctx.set('Access-Control-Allow-Origin','http://localhost:63342');
    ctx.set('Access-Control-Allow-Methods',"PUT,GET,POST");
    ctx.set('Access-Control-Allow-Credentials',true);
    await next();
})

router.post('/login',async ctx => {
    ctx.cookies.set('username','kyrie');
    console.log('body',ctx.request.body);
    ctx.body = 'successful login';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log('app starting at port 4000');
})