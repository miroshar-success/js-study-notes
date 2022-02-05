// ------------- 闭包 -------------
function makeCounter() {
  let privateCounter = 0;
  function changeBy(value) {
    privateCounter += value;
  }
  return {
    increment: function() {
      changeBy(1)
    },
    decrement: function() {
      changeBy(-1)
    },
    value: function() {
      return privateCounter;
    }
  }
}

const counter1 = makeCounter()
const counter2 = makeCounter()

counter1.increment()
counter2.decrement()

console.log(counter1.value(), counter2.value()) // 1  -1



// ---------- 间接传递函数 ------------
function foo() {
  var a = 2;
  function baz() {
    console.log(a)
  }
  bar(baz)
}

function bar(fn) {
  fn()
}

//  传递函数也可以是间接的。

