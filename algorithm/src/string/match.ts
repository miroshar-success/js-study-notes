function check(str: string): boolean {
  const reg = /^(\w+)\1+$/
  return reg.test(str)
}

console.log(check('abcabc'))  // true
console.log(check('abcdabc')) // false
console.log(check('abcabcd')) // false
console.log(check('aabaab'))  // true
console.log(check('abaaabaa'))  // true


