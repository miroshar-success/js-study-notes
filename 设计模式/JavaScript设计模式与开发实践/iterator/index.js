// ---------------- 迭代器模式 ----------------

// 内部迭代器
const each = function(array = [], callback) {
  for (let i = 0, length = array.length; i < length; i++) {
    callback(array[i], i, array)
  }
}
each([1, 2, 3, 4, 5], (item, idx, array) => {
  console.log(item, idx, array)
  /**
    1 0 [ 1, 2, 3, 4, 5 ]
    2 1 [ 1, 2, 3, 4, 5 ]
    3 2 [ 1, 2, 3, 4, 5 ]
    4 3 [ 1, 2, 3, 4, 5 ]
    5 4 [ 1, 2, 3, 4, 5 ]
  */
})


// ------------------- 外部迭代器 --------------------
const Iterator = function(obj) {
  let idx = 0
  const next = function() {
    idx += 1
  }
  const isDone = function() {
    return idx >= obj.length
  }
  const getCurrentItem = function() {
    return obj[idx]
  }
  return {
    next,
    getCurrentItem,
    isDone
  }
}
// --------- 比较两个数组是否相等 ------------
const compare = (iterator1, iterator2) => {
  while (!iterator1.isDone() && !iterator2.isDone()) {
    if (iterator1.getCurrentItem() !== iterator2.getCurrentItem()) {
      return false
    }
    iterator1.next()
    iterator2.next()
  }
  return true
}
console.log(compare(Iterator([1,2,3,4,5]), Iterator([1,2,3,4,6])))  // false
console.log(compare(Iterator([1,2,3,4,5]), Iterator([1,2,3,4,5])))  // true


// -------------- 迭代类数组对象和数组 + 中止 迭代器 -------------------
const _each = function(obj, callback) {
  let val = undefined
  let length = obj.length
  if (Array.isArray(obj)) {
    for (let i = 0; i < length; i++) {
      val = callback.call(null, obj[i], i)
      if (val === false) break
    }
  } else {
    for (const key in obj) {
      val = callback.call(null, obj[key], key)
      if (val === false) break
    }
  }
}

_each([1, 2, 3, 4, 5], function(item, i) {
  if (item > 3) return false
  console.log('i----', i, item) // 0 1 2
  /**
   *  i---- 0 1
      i---- 1 2
      i---- 2 3
   * 
  */
})

_each({
  0: 1,
  1: 2,
  2: 5,
  3: 6,
  4: 9,
  length: 5
}, function(item, i) {
  if (item > 4) return false
  console.log('----- object', i, item)
  /**
   * ----- object 0 1
     ----- object 1 2
  */
})