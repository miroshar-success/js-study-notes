// ------- 反转字符串中的单词 ----------
function reverse_string(str: string): string {
  if(!str) return ''
  return str.split(' ').map(item => {
    return item.split('').reverse().join('')
  }).join(' ')
}

/* const string_1 = 'Hello World!'
const string_2 = 'This is a function'
console.log(reverse_string(string_1)) // olleH !dlroW
console.log(reverse_string(string_2)) // sihT si a noitcnuf */

module.exports = {
  reverse_string
}

export {

}
