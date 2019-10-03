const model = require("../models/math.js");
const file = require("../models/file.js");
module.exports = {
    showResult:function(req,res){
        const number = req.params.number;
        let start = new Date();
        file.read(number,function(msg){
            // 先判断当前的数据有没有存储过,如果没有存储,则先计算,然后存储,最后再渲染页面
            if(msg === -1){
                // 先计算,
                const arrList = model.math(number);
                // 然后保存数据
                file.save(number,arrList);
                // 再渲染页面
                res.render("showResult",{
                    arrList,
                    t:new Date() - start
                })
            }else{
                // 否则就是已经存储了数据,此时读取数据再渲染就可以了
                const arrList = JSON.parse(msg);
                res.render("showResult",{
                    arrList,
                    t:new Date() - start
                })
            }
        });
        /*
        fs.readFile("./data/"+number+".txt",(err,data)=>{
            if(err){
                // 没有存储,先计算数据,然后将数据保存至以当前查询数字为名的data文件夹中
                const arrList = model.math(number);
                fs.writeFile("./data/"+number+".txt",JSON.stringify(arrList),(err)=>{
                    if(err){
                        console.log("数据保存失败");
                    }else{
                        console.log("数据保存成功");
                    }
                });
                res.render("showResult",{
                    arrList
                })
            }else{
                const arrList = JSON.parse(data);
                res.render("showResult",{
                    arrList
                })
            }
        })*/
    }
}
