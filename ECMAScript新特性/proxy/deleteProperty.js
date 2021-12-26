// handler.deleteProperty() 用于拦截对象属性的 delete 操作

const object = {
  age:30
}
const delete_proxy = new Proxy(object, {
  deleteProperty: function(target, property){ // 必须返回一个boolean, 表示是否删除成功
    if(property in target){
      return true
    }
  }
})
console.log(object.age) // 30

delete object.age

console.log(object.age) // undefined
