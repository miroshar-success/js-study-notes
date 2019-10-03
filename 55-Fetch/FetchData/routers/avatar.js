const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const path = require('path');

router.post('/avatar',function(req,res){
	console.log(req.body);
	const form = new formidable.IncomingForm()
	form.uploadDir = './upload';
	form.keepExtensions = true;
	form.multiples = true;
	form.parse(req,(err,fields,files) => {
		if(err){
			console.log(err);
		}else{
			console.log(fields,files);
			res.json({
				msg:200,
				data:'上传成功'
			})
		}
	})

})

module.exports = router;