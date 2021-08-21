const handler = {
  get:function(obj,prop) {
    return prop in obj ? obj[prop] : 37
  }
}

const p = new Proxy({}, handler)
p.a = 1;
p.b = undefined;
console.log('a:',p.a, 'b:',p.b) // 1 undefined

// ------------- 无操作转发代理
let target = {};
let p1 = new Proxy(target,{})
p1.a = 100;
console.log(target.a) // 100


// validator
let validator = {
  set:function(obj,prop,value) {
    if(prop === 'age') {
      if(!Number.isInteger(value)) {
        throw new TypeError('The age is not an int')
      }
      if(value > 200) {
        throw new RangeError('The age seems invalid')
      }
      obj[prop] = value;
      return true;
    }
  }
}

let person = new Proxy({},validator);
person.age = 100;
console.log(person)

// person.age = '12345'
console.log(person)

// -------- proxy交换两个元素的属性
let view = new Proxy({
  selected:null
}, {
  set:function(obj,prop,newVal) {
    let oldVal = obj[prop]
    console.log('oldVal:',oldVal)
    if(prop === 'selected') {
      if(oldVal) {
        oldVal.setAttribute('aria-selected',false)
      }
      if(newVal) {
        newVal.setAttribute('aria-selected',true)
      }
    }
    obj[prop] = newVal;
    return true;
  }
})
// let li1 = view.selected = document.querySelector('.item-1');  
// console.log(li1)  // true

// let li2 = view.selected = document.querySelector('.item-2');
// console.log(li2)
// console.log('view:',view)

// 值修正以及附加属性
let products = new Proxy({
  browsers:['Internet Explorer', 'Netscape']
}, {
  get:function(obj,prop) {
    if(prop === 'latestBrowser') {
      return obj.browsers[obj.browsers.length - 1]
    }
    return obj[prop]
  },
  set:function(obj,prop,value) {
    if(prop === 'latestBrowser') {
      obj.browsers.push(value)
      return;
    }
    if(typeof value === 'string') {
      value = [value]
    }
    obj[prop] = value;
    return true;
  }
})
console.log(products.browsers);
products.browsers = 'Firefox';

products.latestBrowser = 'Chrome';
console.log(products.browsers)
console.log(products.latestBrowser) // Chrome

// ------------ demo
const list = new Proxy([
  {name:'Firefox', type:'browser'},
  {name:'SeaMonkey', type:'browser'},
  {name: 'Thunderbird', type:'mailer'}
], {
  get:function(obj,prop) {
    if(prop in obj) {
      return obj[prop]
    }
    if(prop === 'number'){
      return obj.length;
    }
    let result, types ={};
    for(let product of obj) {
      if(product.name === prop){
        result = product;
      }
      if(types[product.type]) {
        types[product.type].push(product)
      }else{
        types[product.type] = [product]
      }
    }
    if(result) {
      return result;
    }
    if(prop in types) {
      return types[prop]
    }
    if(prop === 'types'){
      return Object.keys(types)
    }
    return undefined;
  }
})
console.log('list-0:', list[0]);
console.log('types:',list.types)
console.log('number:',list.number)
console.log('firefox:',list['Firefox'])
console.log('browser:',list['browser'])