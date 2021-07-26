// 纯函数
function getArea(r) {
  console.log('r:',r);
  return Math.PI * r * r;
}
// console.log(getArea(4));
// console.log(getArea(4));


// 纯函数相同的输入就有相同的输出,可以缓存计算结果
function memorize(fun) {
  const cache = Object.create(null); // 存储计算结果的对象
  return function() {
    const key = JSON.stringify([...arguments])
    cache[key] = cache[key] || fun.apply(null,[...arguments])
    return cache[key]
  }
}
const a = memorize(getArea);
console.log(a(4));
console.log(a(4));


const bag = {price: 40}

function m1(obj,count){
  return obj.price * count;
}
function m2(obj,count){
  obj.price = 50;
  return obj.price * count
}
console.log(m1(bag,10)) // 400
console.log(m2(bag,10));  // 500

