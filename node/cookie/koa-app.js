const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();

app.keys = ['secret cookie'];

router.get('/',async ctx => {
    console.log('/路径:',ctx.cookies.get('username'));
    ctx.body = 'hello,index page';
});

router.get('/user/:username',async ctx => {
    console.log(ctx.cookies.get('username'));
    const username = ctx.params.username;
    ctx.cookies.set('username',username,{
        maxAge:1000 * 60 * 60,
        httpOnly:true,
        path:"/user",
        signed:true
    });
    if(ctx.cookies.get('username') === username){
        ctx.body = `welcome back,${username} `;
    }else{
        ctx.body = `hello,${username}`;
    }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,() => {
    console.log('app starting at port 3000');
})