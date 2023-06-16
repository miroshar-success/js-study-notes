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

// 纯函数不修改外部变量，不读取外部变量,只依赖参数。

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

// ------------------- 求母亲节日期 -----------------------------
const getMontherDay = (year) => {
  const date = new Date()
  date.setFullYear(year)
  date.setMonth(4)
  date.setDate(1)
  let week_day = date.getDay() // 5月1日星期几
  week_day = week_day === 0 ? 7 : week_day
  // 周日是星期0
  return new Date(date.setDate(14 - week_day + 1))
}

console.log(getMontherDay(2023))