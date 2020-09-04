const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');

app.keys = ['hello,world'];

const config = {
    key:'koa.sess',
    maxAge:86400000,
    signed:true,
    httpOnly:true,
    rolling:true,
    renew:false,
}
app.use(session(config,app));
app.use(bodyParser());

app.use(async (ctx,next) => {
    ctx.set('Access-Control-Allow-Origin',"http://localhost:63342");
    ctx.set('Access-Control-Allow-Methods',"PUT,POST,GET");
    ctx.set("Access-Control-Allow-Credentials",true);
    ctx.set('Access-Control-Allow-Headers',"Content-Type");
    await next();
});

router.post('/login',(ctx) => {
    const {username} = ctx.request.body;
    if(ctx.session.username === 'kyrie'){
        ctx.body = 'hello,welcome back!';
    }else{
        ctx.body = 'hello,welcome to my page';
    }
    ctx.session.username = username;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(5000,() => {
    console.log("app starting at port 5000");
})