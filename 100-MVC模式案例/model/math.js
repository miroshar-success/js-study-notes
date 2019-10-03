// 这个文件负责计算,然后暴露出一个接口
/*exports.math = function(number){
    let result = [];
    for(let i = 1; i <= number; i++){
        if(number % i ===0){
            result.push(i);
        }
    }
    console.log(result);
}*/

module.exports = {
    math:function(number){
        let result = [];
        for(let i = 1; i <= number; i++){
            if(number % i === 0){
                result.push(i);
            }
        }
        return result;
    }
}