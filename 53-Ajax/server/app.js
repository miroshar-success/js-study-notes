const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();

const data = [
    {
        "url":"https://img10.360buyimg.com/cms/jfs/t1/45002/6/10555/267286/5d786885Ef719a99b/c95f582b449a4e98.png",
        "title":"iPhone 11",
        "color":"黑色",
        "size":"64GB",
        "desc":"移动联通电信 4G 手机 双卡双待",
        "price":"5499"
    },
    {
        "url":"https://img14.360buyimg.com/cms/jfs/t1/75829/21/10188/351923/5d7a833eE2e65bfe4/9bf499b9243c0841.png",
        "title":"iPhone 11 Pro Max",
        "color":"金色",
        "size":"64GB",
        "desc":"移动联通电信 4G 手机 双卡双待",
        "price":"9599"
    },
    {
        "url":"https://img11.360buyimg.com/cms/jfs/t1/51915/21/10292/316305/5d786885Ecd5dd795/c8dd51cac470a12c.png",
        "title":"iPhone 11 Pro",
        "color":"暗夜绿",
        "size":"64GB",
        "desc":"移动联通电信 4G 手机 双卡双待",
        "price":"8699"
    },
    {
        "url":"https://img14.360buyimg.com/cms/jfs/t1/46434/2/10663/275006/5d7a8349E59c96b83/7a9bcda22b92cdf6.png",
        "title":"iPhone 11",
        "color":"紫色",
        "size":"128GB",
        "desc":"移动联通电信 4G 手机 双卡双待",
        "price":"5999"
    }
]
/*
*  可以使用cors库

* */
app.use(async (ctx,next) => {
    ctx.set('Access-Control-Allow-Origin',"*");
    ctx.set("Access-Control-Allow-Credentials",'true');
    ctx.set("Access-Control-Allow-Methods","GET,PUT,POST");
    next();
})

router.get('/goods',async ctx => {
    ctx.body = data;
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('app start at port 3000');
})