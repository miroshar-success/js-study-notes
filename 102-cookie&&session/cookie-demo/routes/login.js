const express = require('express');
const router = express.Router();

router.post('/login',function(req,res){
	res.setHeader('Set-Cookie',['language=javascript','platform=node']);
	console.log(req.headers.cookie,typeof req.headers.cookie);
	res.json({
		status:200,
		msg:'登陆成功'
	})
})

module.exports = router;