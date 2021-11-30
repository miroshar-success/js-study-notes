const data = {
  message:'hello world',
  count:0
}

const vm = {};

/* Object.defineProperty(vm,'count',{
  configurable:true,
  enumerable:true,
  get() {
    return data.count
  },
  set(newValue) {
    if(newValue === data.message){
      return;
    }
    console.log('setter')
    data.count = newValue
    document.querySelector('.text').textContent = data.count;
  }
})
document.querySelector('.button').addEventListener('click',function() {
  vm.count += 1;
}) */


// ---------------------------------------- 处理多个数据 --------------------------------------
function proxy(data) {
  for(let key in data) {
    Object.defineProperty(vm,key, {
      configurable:true,
      enumerable:true,
      get() {
        return data[key]
      },
      set(newValue) {
        if(newValue === vm[key]){
          return
        }
        data[key] = newValue;
        // document.querySelector('.text').textContent = data.count
        document.querySelector('.text').textContent = data.message
      }
    })
  }
}
proxy(data)
/* document.querySelector('.button').addEventListener('click', function(){
  vm.count += 1;
}) */

document.querySelector('.button').addEventListener('click',function(){
  vm.message = vm.message.split(' ').reverse().join(" ")
})
