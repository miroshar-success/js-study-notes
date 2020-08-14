const router = require('koa-router')();

router.get('/api/user',async ctx => {
	ctx.body = '用户页面';
})

module.exports = router;