//----- 棒球比赛------
/*
给定一个字符串列表, 每个字符串可以是以下四种类型之一
1. 整数: 表示直接在本轮中获得的积分
2. +  :  本轮获得的积分是前两轮有效 回合得分的总和
3. D  :  本轮获得的积分是前一轮有效  回合得分的两倍
4. C  :  表示获得的最后一个有效回合得分 是无效的, 应该被移除
*/

// ['5', '2', 'C', 'D', '+']
function stack(array: string[]): number {
  const temp: number[] = []
  for(let i = 0, length = array.length; i < length; i++) {
    const item = array[i]
    switch(item) {
      case '+': {
        const length = temp.length;
        const p1 = temp[length-2], p2 = temp[length-1]
        temp.push(p1+p2)
      }
      break;
      case 'C': {
        temp.pop()
      }
      break;
      case 'D': {
        const number = temp[temp.length-1]
        temp.push(number*2)
      }
      break;
      default: {
        temp.push(Number(item))
      }
    }
  }
  return temp.reduce((prev,next) => prev + next, 0)
}
console.log(stack(['5', '2', 'C', 'D', '+']))

console.log(stack(['5', '-2', '4', 'C', 'D', '9', '+', '+']))
