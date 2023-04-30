const is_object = (obj) => typeof obj === 'object' && obj !== null

const is_equal = (o1, o2) => {
  if (!is_object(o1) || !is_object(o2)) return o1 === o2
  if (o1 === o2) return true
  // 比较key值
  if (Object.keys(o1).length !== Object.keys(o2).length) {
    return false
  }
  let flag = true
  for (const key of Object.keys(o1)) {
    const v1 = o1[key]
    const v2 = o2[key]
    flag = is_equal(v1, v2)
    if (!flag) break
  }
  return flag
}

const player_1 = {
  age: 30,
  firstName: 'kyrie',
  lastName: 'irving',
}
const player_2 = {
  firstName: 'kyrie',
  lastName: 'irving',
  age: 30
}

const object_1 = {
  a: 100,
  b: {
    x: 1010,
    y: 200
  }
}
const object_2 = {
  a: 100,
  b: {
    x: 100,
    y: 200
  }
}

console.log(is_equal(player_1, player_2))
console.log(is_equal(object_1, object_2))
console.log(is_equal(player_1, player_1), is_equal([1,2,3],[2,3,4]), is_equal([1,2,3], [1,2,3]))

// -------------------- key不相同 ------------------
const o1 = {
  a: 1,
  b: 2,
  c: 3
}
const o2 = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
}
console.log(is_equal(o1, o2))