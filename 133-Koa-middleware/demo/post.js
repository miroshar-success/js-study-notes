const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();

router.get('/index',async ctx => {
	const html = `
		<form action='/login' method='POST'>
			<p>姓名:<input type='text' name='user'/></p>
			<p>年龄:<input type='number' name='age'/></p>
			<button type='submit'>提交</button>
		</form>
	`
	ctx.body = html;
})

function formData(str){
	let arr = str.split('&');	// ['user=1223','age=28']
	const obj = {}
	for(let item of Object.values(arr)){
		let str = item.split('=');
		let key = str[0];
		let value = decodeURIComponent(str[1]);
		obj[key] = value;
	}
	return obj
}


function postData(ctx){
	return new Promise((resolve,reject) => {
		try{
			let data = '';
			ctx.req.on('data',(chunk) => {
				data += chunk
			})
			ctx.req.on('end',() => {
				let postData = formData(data);
				resolve(postData);
			})
		}catch(err){
			reject(err);
		}
	})
}

router.post('/login',async ctx => {
	const data = await postData(ctx);
	console.log(data);
	ctx.body = '提交成功';
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
	console.log('app start at port 3000');
})