const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
const good = require('./data.json');

router.get('/api/goods',async ctx => {
	ctx.body = good
})

router.get('/api/home.vue',async ctx => {
	ctx.body = '首页';
})

router.get('/api',async ctx => {
	const html = `<form method='GET' action='api/login'>
		<p>姓名:<input type='text' name='user'/></p>
		<p>年龄:<input type='number' name='age'/></p>
		<p><input type='submit' value='提交'/></p>
	<form>`
	ctx.body = html;
})

router.get('/api/login',async ctx => {
	/*
	从上下文中直接获取:
	ctx.query  			返回{a:1,b:2} 
	ctx.querystring		返回a=1&b=2
	
	从上下文的request对象中获取
	ctx.request.query
	ctx.request.querystring
	*/
	console.log(ctx.request.query,ctx.request.querystring);
	console.log(ctx.query,ctx.querystring);
	ctx.body = '注册成功';
})

router.get('/api/student/:id',async ctx => {
	console.log(ctx.params.id);
	ctx.body = `您的学号是:${ctx.params.id}`;
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,() => {
	console.log('app start at port 3000');
})