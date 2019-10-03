const express = require('express');
const router = express.Router();


router.get('/cookie',function(req,res){
	console.log(req.headers.cookie);
	res.json({
		msg:200,
		cookie:true
	})
})

module.exports = router;