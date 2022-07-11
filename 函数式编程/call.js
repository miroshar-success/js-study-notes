'use strict'
Function.prototype._call = function(context, ...args) {
  if(context === null || context === undefined) context = globalThis;
  if(typeof context !== 'object') context = new Object(context)
  const _call = Symbol('call')
  context[_call] = this
  const result = context[_call](...args)
  delete context[_call]
  return result
}

function sum(a, b) {
  return a + b + this.c
}
const obj_1 = {
  c: 20
}
const obj_2 = {
  c: 10
}

const s1 = sum._call(obj_1, 1, 2) // 23
const s2 = sum._call(obj_2, 2, 4) // 16

console.log(s1, s2)

const is_strict_mode = (function is_strict_mode() {
  return this === undefined;
}())

function f1(a, b) {
  console.log(is_strict_mode)
  return a + b;
}
console.log(f1(2, 3))

function getThis() {
  if(typeof self !== 'undefined') return self;
  if(typeof window !== 'undefined') return window;
  if(typeof global !== 'undefined') return global
}
