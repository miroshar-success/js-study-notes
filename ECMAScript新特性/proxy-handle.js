// handler.apply()  用于拦截函数的调用

function sum (a,b) {
  return a + b;
}
const handler = {
  apply:function(target,thisArg,argumentsList) {
    console.log(`Calculate sum: ${arguments}`,...argumentsList);
    console.log('this:', thisArg);
    return target(argumentsList[0],argumentsList[1]) * 10;
  }
}
const proxy1 = new Proxy(sum,handler);
console.log(sum(1,2)) // 3
console.log(proxy1(1,2))  // 30
