const router = require('koa-router')();
const Koa = require('koa');
const app = new Koa();

router.get('/student/:id', async ctx => {
	const id = ctx.params;
	console.log(ctx.params);
	ctx.body = 'hello world';
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
	console.log('app start at port 3000');
})