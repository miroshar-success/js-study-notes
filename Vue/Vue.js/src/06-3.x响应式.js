// ----------------------------- proxy 代理整个对象 -----------------------------
const temp = {
  message:'hello world',
  count:0
}
const proxy_instance = new Proxy(temp, {
  get(target,key) {
    console.log('getter:', target, key)
    return target[key]
  },
  set(target, key, newValue) {
    console.log('setter:', target, key, newValue)
    if(target[key] === newValue) return;
    target[key] = newValue;
  }
})

document.querySelector('.button').addEventListener('click',() => {
  proxy_instance.count += 1;
})
proxy_instance.count = 1;
console.log(proxy_instance.count)
