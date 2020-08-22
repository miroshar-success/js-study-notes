const Koa = require('koa');
const app = new Koa();

async function getData(){
    return 'hello world';
}

getData().then(data => {
    console.log(data);
});

function timer(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve('hello');
        },3000)
    })
}

async function t(){
    const result = await timer();
    console.log(result);
}
t();

app.use(async ctx => {
    ctx.body = 'hello world';
});
app.listen(3001);