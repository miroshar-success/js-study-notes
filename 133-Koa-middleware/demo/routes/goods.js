const router = require('koa-router')();

router.get('/api/goods',async ctx => {
	ctx.body = '商品页面';
})

module.exports = router;