// mongoose 可以在node.js环境中操控 mongodb
const mongoose = require("mongoose");

// 连接数据库       mongoab协议             player 表明连接的是哪个数据库
/*
mongoose.connect("mongodb://localhost:27017/player",{useNewUrlParser:true},(err) => {
    if(err){
        console.log("数据库连接失败");
        return;
    }else{
        console.log("数据库连接成功");
    }
});
*/
mongoose.connect("mongodb://localhost:27017/player",{useNewUrlParser:true});
var db = mongoose.connection;
db.on("error",console.log.bind(console,"connection error"));
db.once("open",function(){
    console.log("连接成功");

    // 定义 player这个collection 的数据构成
    let playerSchema = new mongoose.Schema({
        name:String,
        sex:String,
        age:Number,
        isMarried:Boolean
    });

    // 像player这个文档中添加文档
    let Player = mongoose.model("player",playerSchema);
    let Lebron = mongoose.model("player",playerSchema);
    let Durant = mongoose.model("player",playerSchema);
    let Curry = mongoose.model("player",playerSchema);
    let kyrie = new Player({
        name:"kyrie",
        sex:"男",
        age:26,
        isMarried:false
    });

    let lebron = new Lebron({
        name:"lebron",
        sex:"男",
        age:34,
        isMarried:true
    })

    let durant = new Durant({
        name:"durant",
        sex:"男",
        age:30,
        isMarried:false
    });

    let curry = new Curry({
        name:"curry",
        sex:"男",
        age:30,
        isMarried:true
    })

    /*
    lebron.save();
    kyrie.save();
    durant.save();
    curry.save(); */

    Player.findOne({name:"kyrie"},function(err,result){
        if(!err){
            console.log(result);
        }
    });
    Player.findOne({age:34}).then((result) => {
        console.log(result);
    });
    Player.findOne({age:26}).then(result => {
        console.log(result)
    });
    Player.find({isMarried:true}).then(results=>{
        console.log(results);
    });

    Player.find({age:30}).then(results => {
        console.log(results);
    });

    Player.deleteOne({name:"kyrie"},(err,result)=>{
        console.log(err,result);
    })
    Player.deleteOne({name:"lebron"}).then(result=>{
        console.log(result);
    })
    Player.deleteMany({isMarried:true}).then(result=>{
        console.log(result);
    })

    Player.updateOne({name:"durant"},{$set:{name:"杜兰特"}}).then(result=>{
        console.log(result);
    });
    Player.updateOne({name:"lebron"},{$set:{name:"詹姆斯"}}).then(result=>{
        console.log(result);
    })

    Player.updateMany({isMarried:true},{$set:{isMarried:false}},(err,result)=>{
        console.log(result);
    })
});

