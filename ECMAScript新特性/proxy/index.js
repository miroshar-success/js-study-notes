// --------------- proxy 用于创建一个对象的代理（实现基本操作的拦截和自定义） ----------------
const p1 = new Proxy({}, {
  get:function(obj, prop) {
    return prop in obj ? obj[prop] : 37
  }
})
p1.a = 1;
p1.b = undefined
console.log(p1.a, p1.b, p1.c) // 1 undefined 37
console.log('b' in p1)  // true

// ------------- 验证 ---------------
const validator = {
  set:function(obj, prop, value){
    if(prop === 'age'){
      if(!Number.isInteger(value)){
        throw new Error('The age is not an integer')
      }
      if(value > 200){
        throw new Error('The age seems invalid')
      }
    }
    obj[prop] = value
    return true
  }
}
const person = new Proxy({}, validator)
person.age = 100
// person.age = '1'  // 报错, age 不是一个整数
// person.age = 230  // 报错, 年龄似乎不是一个合法的数值
console.log(person)


// ------------------ 通过属性查找数组中的特定对象 ----------------------
const products = new Proxy([
  {name:'Firefox', type:'browser'},
  {name:'SeaMonkey', type:'browser'},
  {name:'Thunderbird', type:'mailer'}
],{
  get:function(obj,prop) {
    if(prop in obj){  // 返回一个数组正常的属性,通常是返回 某个下标对应的元素
      return obj[prop]
    }
    if(prop === 'number'){  // number 返回数组长度
      return obj.length
    }
    let result, types = {}
    for(let product of obj){  // 遍历对象
      if(product.name === prop){  // 根据产品名字 返回某个产品
        result = product
      }
      if(types[product.type]){  //根据type 分类
        types[product.type].push(product)
      }else{
        types[product.type] = [product]
      }
    }
    if(result) return result
    if(prop in types){
      return types[prop]
    }
    if(prop === 'types'){
      return Object.keys(types)
    }
    return undefined
  }
})

console.log(products[0])  // {name:'Firefox', type:'browser'}
console.log(products['Firefox'])  // {name:'Firefox', type:'browser'}
console.log(products['Chrome']) // undefined
console.log(products['browser'])
/*
[
  { name: 'Firefox', type: 'browser' },
  { name: 'SeaMonkey', type: 'browser' }
]
*/
console.log(products.types) // ['browser','mailer']
console.log(products.number)  // 3
