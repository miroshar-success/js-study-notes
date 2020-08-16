const math = require('../models/math.js');
const file = require('../models/file.js');

module.exports = function calculator(req,res){
    const {number} = req.params;
    const start = new Date();
    // 先判断之前是否计算过,如果没有计算过,则计算,并把计算过的数字结果保存起来。
    file.isSaved(number,(result) => {
        if(result == -1){
            var result = math(number);
            file.save(number,result);
        }else{
            var result = JSON.parse(result.toString());
        }
        res.render('result',{
            result,
            time:new Date() - start,
            number
        })
    });
}