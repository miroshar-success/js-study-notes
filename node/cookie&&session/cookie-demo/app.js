const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(express.static('public'));
app.use(cookieParser());

// const CityRouter = require('./router/city');
const LoginRouter = require('./routes/login');
app.use('/api',LoginRouter);
// app.use('/api',CityRouter);

app.listen(3030,function(){
	console.log('程序监听在3030端口');
})
