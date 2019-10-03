const express = require('express');
const router = express.Router();
router.post('/user',function(req,res){
	console.log(req.body);
	res.json({
		msg:200
	})
})

module.exports = router;