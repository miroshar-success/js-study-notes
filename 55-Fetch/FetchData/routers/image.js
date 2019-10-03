const express = require('express');
const router = express.Router();
const formidable = require('formidable');

router.post('/image',function(req,res){
	const form = new formidable.IncomingForm();
	form.multiple = true;
	form.keepExtensions = true;
	form.uploadDir = './upload';
	form.parse(req,(err,fields,files) => {
		if(err){
			console.log(err);
			return;
		}
		console.log(files);
		res.json({
			msg:'ok',
		})
	})
})

module.exports = router;