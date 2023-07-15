// --------- 括号是否匹配 ----------
const bracket_map: {[key: string]: string} = {
  '{': '}',
  '(': ')',
  '[': ']'
}
const bracket_match = (str: string): boolean => {
  let flag: boolean = true
  const left_bracket: string[] = []
  for (const bracket of str) {
    if (bracket_map[bracket]) {
      // 左括号
      left_bracket.push(bracket)
    } else {
      // 右括号, 但是此时没有左括号
      if (left_bracket.length === 0) {
        flag = false
        break
      }
      const l = left_bracket.pop() as string
      if (bracket_map[l] === bracket) continue
      flag = false
      break
    }
  }
  return left_bracket.length ? false : flag
}

console.log(bracket_match('(())]}(')) // false
console.log(bracket_match('(())'))    // true
console.log(bracket_match('[(({}))]'))  // true
console.log(bracket_match('[](){}(({}))'))  // true
console.log(bracket_match('()(){'))   // false
console.log(bracket_match('()()}'))   // false
