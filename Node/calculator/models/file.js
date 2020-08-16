const fs = require('fs');
const path = require('path');
module.exports = {
    isSaved(number,callback){
        const dataPath = path.join(__dirname,'../data/' , number +'.txt')
        fs.readFile(dataPath,(err,data) => {
            if(err){
                callback(-1)
            }else{
                callback(data);
            }
        })
    },
    save:function(number,data){
        fs.writeFile('./data/'+number+'.txt',JSON.stringify(data),(err) => {
            if(err){
                console.log('数据写入失败');
            }else{
                console.log('数据写入成功');
            }
        })
    }
}