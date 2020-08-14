const router = require('koa-router')();
const Koa = require('koa');
const app = new Koa();


router.get('/',async ctx => {
	let html = `<form action='/login' method='GET'> 
		<p>姓名:<input type='value' name='user' / ></p>
		<p>年龄:<input type='value' name='age'/ ></p>
		<input type='submit' value='提交'/>
	</form>`
	ctx.body = html;
})

router.get('/login',async ctx => {
	let req_query = ctx.request.query;
	let req_querystring = ctx.request.querystring;
	console.log(req_query,req_querystring);
	let ctx_query = ctx.query;
	let ctx_querystring = ctx.querystring;
	console.log(ctx.query,ctx.querystring);
	ctx.body = '提交成功';
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,() => {
	console.log('app start at port 3000');
})