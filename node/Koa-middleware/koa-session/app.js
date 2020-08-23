const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
const session = require('koa-session');

app.keys = ['vue-ssr'];

const config = {
    key:'koa.sess',
    httpOnly:true,
    maxAge:1000 * 60,
    renew:true,
    rolling:false,
    signed:true,
    sameSite: null
}
app.use(session(config,app));

router.get('/',async ctx => {
    console.log(`${ctx.url}: ${ctx.session.username}`);
    ctx.body = 'home page';
})


router.get('/user/:username',async ctx => {
    const {username} = ctx.request.params;
    if(!!ctx.session.username) {
        ctx.body = `welcome back ${username}`;
    }else{
        ctx.body = `hello, ${username}`;
    }
    ctx.session.username = username;
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(3005,() => {
    console.log('app starting at port 3005');
})