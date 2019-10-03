const express = require("express");
const app = express();
const {Mongoose} = require("./utils/config.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user");
const session = require("express-session");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(cookieParser());

app.use(session({
    secret:"secret",
    name:"sessionId",
    resave:true,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60,
    }
}));
Mongoose.connect();
app.use("/user",userRouter);

app.listen(3000);
console.log('服务监听在3000端口');

module.exports = app;
