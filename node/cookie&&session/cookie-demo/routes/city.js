const express = require('express');
const router = express.Router();

router.get("/city",function(req,res){
	res.send('你的足迹是' + req.cookies.city);
})

router.get('/city/:cityname',function(req,res){
	const city = req.params.cityname;
	let cityArr = req.cookies.city || [];
	cityArr.push(city);
	res.cookie('city',cityArr);
	res.send('你今天去了'+ city);
});

module.exports = router;