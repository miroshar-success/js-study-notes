Function.prototype._bind = function(context, ...args) {
  if (context === undefined || context === null) context = globalThis;
  const self = this;  //   指向当前调用_bind的函数 fn._bind
  return function () {
    const newArgs = [...args, ...arguments]
    return self.apply(context, newArgs)
  }
}

// ---------- 测试 ----------
const player = {
  firstName: 'kyrie',
  lastName: 'irving'
}
function getFullName (age = 0) {
  let fullName = `${this.firstName} - ${this.lastName}`
  if (age) {
    fullName += ` and I am ${age} years old!`
  }
  return fullName
}
const getFullNameBindFn = getFullName._bind(player)

console.log(getFullNameBindFn())  // kyrie - irving
console.log(getFullNameBindFn(32))  // kyrie - irving and I am 32 years old!