const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();

// 应用及中间件
/*app.use(async (ctx,next) => {
    console.log(new Date());
    console.log('这是一个中间件01');
    await next();   // 当前路由匹配完成后继续往后匹配
    if(ctx.status === 404){
        ctx.body = 'not found';
        console.log('not found');
    }else{
        console.log(ctx.url);
    }
})

router.get('/student',async ctx => {
    console.log(ctx.query);
    console.log('status',ctx.status);
    ctx.body = 'student page';
});


// 路由中间件
router.get('/news',async (ctx,next) => {
    console.log('news');
    await next();
})

router.get('/news',async ctx => {
    ctx.body = 'news';
});


// 错误处理中间件
router.get('/player',async ctx => {
    ctx.body = 'player page';
});*/


// koa中间件执行顺序
app.use(async (ctx,next) => {
    ctx.body = 'hello1';
    console.log('01 --- 第一个中间件');
    await next();
    console.log('05 -- 执行第五步')
});

app.use(async (ctx,next) => {
    ctx.body = 'hello2';
    console.log('02 --- 第二个中间件');
    await next();
    console.log('04 -- 执行第四步');
});

router.get('/player',async ctx => {
    console.log('03 -- player page');
    ctx.body = 'player page';
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(3001,() => {
    console.log('app starting at port 3001');
})

