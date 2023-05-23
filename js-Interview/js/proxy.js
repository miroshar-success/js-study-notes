console.log('-----------------proxy-------------------')
function Player (firstName, lastName, age) {
  this.firstName = firstName
  this.lastName = lastName
  this.age = age,
  this.fullName = {
    firstName,
    lastName
  }
}

const player = new Player('kyrie', 'irving', 30)
player.__proto__.fullName = 'kyrie irving'
console.log(player)

const proxy_player = new Proxy(player, {
  get: function (target, property, receiver) {
    // console.log('get-target', target)
    // console.log('get-property', property)
    // console.log('get-receiver', receiver, receiver === proxy_player)  // true
    console.log('---------get-------', property)
    return Reflect.get(target, property)
  },
  set: function(target, property, value, receiver) {
    console.log('set-target', target)
    console.log('set-property', property)
    console.log('set-value', value)
    console.log('set-receiver', receiver)
    target[property] = value
    return true
  }
})
/* console.log(proxy_player.age)
proxy_player.age = 32
console.log(proxy_player.age)
proxy_player.fullName.firstName */


// ------------------------ vue ----------------------------
const observer = (target) => {
  if (typeof target !== 'object' || target === null) return
  const handler = {
    get: function(target, property, receiver) {
      console.log('observer-get', property)
      return observer(target[property])
    },
    set: function(target, property, value, receiver) {
      
    }
  }
  return new Proxy(target, handler)
}
const user = {
  username: 'kyrie',
  age: 32,
  fullName: {
    firstName: 'kyrie',
    lastName: 'irving'
  }
}
const proxy_user = observer(user)
proxy_user.age
console.log(proxy_user.fullName)
proxy_user.fullName.firstName
