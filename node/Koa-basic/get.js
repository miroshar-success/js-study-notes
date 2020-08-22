const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();

// 查询参数
router.get('/student',(ctx) => {
    console.log('ctx.request.query',ctx.request.query);
    console.log('ctx.request.querystring',ctx.request.querystring);
    console.log('ctx.query',ctx.query);
    console.log('ctx.querystring',ctx.querystring);
    ctx.body = 'hello,koa-router';
})

// 动态路由参数
router.get('/user/:id',async ctx => {
    console.log('params:',ctx.params);
    const {id} = ctx.params;
    console.log('id:',id);
    console.log(ctx.request);
    ctx.body = {
        name:'kyrie',
        age:27,
        id:123
    }
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(3002,() => {
    console.log('app starting at port 3002');
});


