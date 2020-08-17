const mongoose = require('mongoose');
let url = 'mongodb://localhost:27017/nba';

mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true},(err) => {
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');

        const playerSchema = new mongoose.Schema({
            firstName:String,
            lastName:String,
            sex:String,
            age:Number,
            isMarried:Boolean
        });

        console.log(playerSchema.path('_id'));

        const Player = mongoose.model('player',playerSchema);

        let lebron = new Player({
            firstName:'lebron',
            lastName:'james',
            sex:'male',
            age:35,
            isMarried:true
        });
        lebron.save((err) => {
            if(err){
                console.log('数据存储失败');
            }else{
                console.log('数据存储成功')
            }
        });
    }
});

