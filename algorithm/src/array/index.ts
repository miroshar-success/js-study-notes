// -------- 数字2-9 对应的字母组合 -----------
const number_map: {[key: string]: string} = {
  2: 'abc',
  3: 'def',
  4: 'ghi',
  5: 'jkl',
  6: 'mno',
  7: 'pqrs',
  8: 'tuv',
  9: 'wxyz'
}
function fn( str: string) {
  if(!str.length) return []
  if(str.length === 1) return str.split('').map(item => number_map[item])
  const code: string[] = []
  for(const s of str) {
    if(number_map[s]) {
      code.push(number_map[s])
    }
  }
  if(code.length === 1) return code
  function combine(array: string[]) {
    const result: string [] = []
    for(let i = 0; i < array[0].length; i++) {
      for(let j = 0; j < array[1].length; j++) {
        result.push(`${array[0][i]}${array[1][j]}`)
      }
    }
    array.splice(0, 2, ...result)
    if(array.length) {
      combine(array)
    }else {
      return result
    }
  }
}


function combine(array: string[]) {
  const result: string [] = []
  for(let i = 0; i < array[0].length; i++) {
    for(let j = 0; j < array[1].length; j++) {
      result.push(`${array[0][i]}${array[1][j]}`)
    }
  }
  // @ts-ignore
  array.splice(0, 2, result)
  if(array.length) {
    // combine(array)
  }else {
    return result
  }
}
combine(['abc', 'def'])
