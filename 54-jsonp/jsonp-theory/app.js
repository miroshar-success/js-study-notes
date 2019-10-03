const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

router.get('/user',async ctx => {
	console.log( ctx.query.callback );
	const fn = ctx.query.callback;
	let player = {
		success:true,
		firstName:'kyrie',
		lastName:'irving',
	}
	let data = `${fn}(${JSON.stringify(player)})`;
	ctx.body = data;
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,() => {
	console.log('app starting at port 3000');
});