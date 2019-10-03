const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/nba",{useNewUrlParser:true},(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("数据库连接成功");
    // 定义这个collection里的文档结构
    let playerSchema = new mongoose.Schema({
        firstName:String,
        lastName:String,
        age:Number,
        isMarried:Boolean,
    });
    // 像player这个集合里添加数据
    const Player = mongoose.model("players",playerSchema);
    let lbj = new Player({
        firstName:"lebron",
        lastName:"james",
        age:34,
        isMarried:true
    });
    let kd = new Player({
        firstName:"kevin",
        lastName:"durant",
        age:30,
        isMarried:false
    });
    let ki = new Player({
        firstName:"kyrie",
        lastName:"irving",
        age:27,
        isMarried:false
    });
    let dw = new Player({
        firstName:"dwyne",
        lastName:"wade",
        age:35,
        isMarried:true
    });
    let kl = new Player({
        firstName:"kevin",
        lastName:"love",
        age:30,
        isMarried:false
    })
    // 查找
    Player.find({isMarried:true},(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
    Player.find({isMarried:false}).then(result=>{
        console.log(result);
    });

//    删除数据
    Player.deleteOne({firstName:"lebron"},(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);    // {n:1,ok:1,deletedCount:1}
        }
    })
    // 更新数据,更新一个
    Player.updateOne({firstName:"dwyne"},{firstName:"dwyane"},(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
    Player.updateMany({isMarried:false},{isMarried:true}).then(result=>{
        console.log(result);
    })
})
