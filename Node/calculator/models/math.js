module.exports = function math(number){
    console.log('match:',number);
    let result = [];
    for(let i = 1; i < number; i++){
        if(number % i === 0){
            result.push(i);
        }
    }
    return result;
}