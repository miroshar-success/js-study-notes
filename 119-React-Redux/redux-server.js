const data = [
    {firstName:"kyrie",lastName:"irving",age:27},
    {firstName:"lebron",lastName:"james",age:35},
    {firstName:"kevin",lastName:"durant",age:31},
]
const Koa = require("koa");
const router = require("koa-router")();
const app = new Koa();

app.use(async (ctx,next) => {
    ctx.set("Access-Control-Allow-Origin","*");
    ctx.set("Access-Control-Allow-Methods","PUT,GET,POST");
    ctx.set("Access-Control-Allow-Credentials",true);
    next();
})

router.get("/api/player",async ctx => {
    ctx.body = data;
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,() => {
    console.log("app starting at port 3000");
})