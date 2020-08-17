const express = require("express");
// const cookieParser = require("cookie-parser");
const app = express();
// app.use(cookieParser());
const session = require("express-session");

app.use(session({
    secret:"kyrie",
    cookie:{maxAge:10000},
    resave:true,
    saveUninitialized:true
}))


app.get("/:city",(req,res) => {
    let city = req.params.city;
    req.session.place = req.session.place || [];
    // 将成实添加进去数据
    req.session.place.push(city);
    res.send("Hello"+city);
})

app.get("/",(req,res) => {
    console.log(req.session);
    res.send("你访问的城市有:" + req.session.place);
})

app.listen(3000);

/*
app.get("/:city",(req,res)=>{
    // 第一次访问的时候不会携带cookie,
    let cityArr = req.cookies.place || [];
    // 获取访问的足迹,并将其添加进数组
    let city = req.params.city;
    cityArr.push(city);
    res.cookie("place",cityArr,{
        maxAge:100000
    });
    res.send("<h3>你今天去了"+city+"</h3>")
})
// 访问根路由的时候显示所有足迹
app.get("/",(req,res)=>{
    // 返回的是一个对象,
    console.log(req.cookies);
    res.send("你的足迹是"+ req.cookies.place);
})
*/

/*
app.get("/",(req,res) => {
    console.log(req.cookies);
    res.cookie("name","123456",{
        maxAge:5000
    });
    res.send("ok");
})
*/
