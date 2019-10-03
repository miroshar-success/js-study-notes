const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(express.static('./public'));

app.use(bodyParser.urlencoded({
	extended:true
}));

app.use(function(req,res,next){
	res.header('Set-cookie','mycookie=jayk');
	next();
})

const IndexRouter = require('./routers/index.js');
const UserRouter = require('./routers/user.js');
const AvatarRouter = require('./routers/avatar.js');
const ImageRouter = require('./routers/image.js');
const ProductRouter = require('./routers/product.js');
const BlobRouter = require('./routers/blob.js');
const CookieRouter = require('./routers/cookie.js');


app.use('/api',CookieRouter);
app.use('/api',BlobRouter);
app.use('/api',ProductRouter);
app.use('/api',ImageRouter);
app.use('/api',AvatarRouter);
app.use('/api',IndexRouter);
app.use('/api',UserRouter);

app.listen(3000);
console.log('程序已运行');