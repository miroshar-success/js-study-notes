const list = [
  {
    number:1,
    word:'one'
  },
  {
    number:2,
    word:'two'
  },
  {
    number:3,
    word:'three'
  },
  {
    number:4,
    word:'four'
  },
  {
    number:5,
    word:'five'
  }
]
//------------------------------------------ 未使用第三方库打包 -------------------------------------------
/* function numberToWord(number) {
  let findNumber = list.find(item => item.number === number)
  if(findNumber){
    return findNumber.word
  }
  return 'can not find a word'
}


function wordToNumber(word){
  let findNumber = list.find(item => item.word === word)
  if(findNumber){
    return findNumber.number;
  }
  return 'can not find a number'
}

export {
  numberToWord,
  wordToNumber
}
 */

 //------------------------------------------  使用第三方库 ------------------------------------------
import _ from 'lodash'

function numberToWord(number) {
  return _.reduce(
    list, (accu,ref) => {
      return ref.number === number ? ref.word : accu;
    },
    ''
  )
}

function wordToNumber(word) {
  return _.reduce(
    list,
    (accu,ref) => {
      return ref.word === word && word.toLowerCase() ? ref.number : accu;
    }, -1
  )
}

export {
  numberToWord,
  wordToNumber
}
