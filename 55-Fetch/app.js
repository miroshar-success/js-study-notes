const express = require('express');
const multer = require('multer');
const app = express();
const fs = require('fs');

// 设置文件存储路径
storage = multer.diskStorage({
	destination:__dirname,
	filename:function(req,file,cb){
		let filename = file.originalname.split('.');
		cb(null,`${Date.now()}.${filename[filename.length-1]}`);
	}
})

upload = multer({
	storage
})



app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/upload',upload.single('file'));

app.get('/blob',function(req,res){
	fs.readFile('./1.jpg','binary',function(err,filedata){
		// res.send(filedata);
		res.write(filedata,'binary');
		res.end();
	});
})

app.listen(3000,function(){
	console.log('success');
})