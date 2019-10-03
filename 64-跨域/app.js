const express = require('express');
const app = express();

app.use(express.static(__dirname));
// node接收Post传递的参数

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(function(req,res,next){
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Credentials',true);
	res.header('Access-Control-Allow-Methods','post');
	res.header('Set-cookie','myCookie=irving');
	next();
})

app.get('/',function(req,res){
	console.log(req.query);
	console.log(req.headers.cookie);
	res.send({'name':'kyrie'});
})
// req 接收数据
// res 发送数据
app.post('/',function(req,res){
	res.send('Hello,What is your name?');
	console.log(req.body);
})

app.listen(3000,function(){
	console.log('连接成功');
});

app.get('/jsonp',function(req,res){
	console.log(req.query.cb);
	// 后台查询到的函数,给函数传递一个参数再发送给前台
	const str = `${req.query.cb}( ${JSON.stringify({lebron:'i am the best player'})} )`;
	res.send(str);
})