const express = require('express');
const app = express();

app.use(function(req,res,next){
	res.header('Access-Control-Allow-Origin',"*");
	res.header('Access-Control-Allow-credentials',"true");
	res.header('Access-Control-Allow-Headers','Content-Type');
	res.header('Access-Control-Allow-Methods','POST')
	next();
})

app.get('/api/actor',function(req,res){
	res.json({
		msg:'ok',
		data:{
			name:'郭采洁',
			img:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1669140284,2973970398&fm=26&gp=0.jpg'
		}
	})
})

app.get('/api/user',function(req,res){
	console.log(req.query.cb);
	const data = {
		firstName:'kyrie',
		lastName:'irving'
	}
	let cbFun = `${req.query.cb} ( ${JSON.stringify(data)} )`
	res.send(cbFun);
})


app.post('/api/post',function(req,res){
	console.log(res.body);
	res.json({
		status:200
	})
})




app.listen(3000);
console.log('程序已启动');