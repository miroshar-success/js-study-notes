const express = require('express');
const router = express.Router();
const product = require('../data.json');
router.get('/product',function(req,res){
	res.json({
		msg:200,
		data:product
	})
})

module.exports = router;