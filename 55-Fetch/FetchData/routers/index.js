const express = require('express');
const router = express.Router();
const data = require('../data.json');
router.get('/',function(req,res){
	console.log(req.params,req.query);
	res.send('ok')
});

module.exports = router
