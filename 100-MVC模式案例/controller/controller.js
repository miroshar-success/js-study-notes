const MathResult = require("../model/math.js");
const file = require("../model/file.js");
exports.showResult = function(req,res){
    // 定义一个初始时间
    let start = new Date(); // 注意: 要放在计算的函数前面
    // 获取到 输入的数字
    let number = req.params.number;
    // 将负责计算的文件引入
    file.read(number,function(result){
        // 如果没有读取到文件,则开始计算,并将计算的结果保存,然后再渲染
        /*if(flag === -1){
            // 此处计算的result是一个数组,保存的时候,将数组转为字符串
            var result = MathResult.math(number);
            file.save(number,result);
            res.render("show",{
                result,
                number,
                t:new Date() - start,
            })
        }else{
            res.render("show",{
                result:flag,
                number,
                t:new Date() - start
            });
        }*/
        // 对上面的写法进行优化
        if(result === -1){
            var result = MathResult.math(number);
            file.save(number,result);
        }
        res.render("show",{
            result,
            number,
            t:new Date() - start
        })
    })

};
