const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa()

const user = require('./routes/user')
const goods = require('./routes/goods')


router.use(user.routes()).use(user.allowedMethods());
router.use(goods.routes()).use(goods.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,() => {
	console.log('app start at port 3000');
})



