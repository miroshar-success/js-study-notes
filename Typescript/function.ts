//  ------------ 为函数定义类型 --------
function add(x:number, y:number): number{
  return x + y;
}
const getSum = function(x:number, y:number):number{return x + y;}

// --------- 函数类型包含两部分, 参数类型和返回值类型 -----

/*
可选参数和默认参数
*/
function fullName(firstName:string, lastName:string): string{
  return firstName + '' + lastName
}

function f1(firstName:string, lastName?:string):string{
  if(lastName){
    return firstName + '' + lastName;
  }else{
    return firstName;
  }
}

function f2(firstName:string, lastName = 'Smith'):string{
  return firstName + lastName;
}
console.log(f1('kyrie'))
console.log(f2('lebron'))


// -------- 剩余参数 --------
function buildName(firstName:string,...restOfName:string[]){
  return firstName + ' ' + restOfName.join(' ')
}
const employeeName = buildName('Joseph', 's1', 's2', 's3')
console.log(employeeName)


// --------- this指向 --------
const deck = {
  suits:['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function() {
    // 箭头函数能够保证this为创建时的值,而不是调用时的值。
    return () => {
      const pickedCard = Math.floor(Math.random() * 52)
      const pickedSuit = Math.floor(pickedCard / 13)
      return {
        suit: this.suits[pickedSuit],
        card: pickedCard % 13
      }
    }
  }
}
const cardPicker = deck.createCardPicker()
console.log(cardPicker());



// ----------- this参数------------
const player = {
  firstName: 'kyrie',
  lastName: 'irving',
  getFullName: function() {
    return () => {
      // 此时this 还是 any类型
      return `${this.firstName} - ${this.lastName}`
    }
  }
}
const getFullName = player.getFullName()
console.log('getFullName:', getFullName())  // kyrie - irving

// ---------------- 使this有类型 ---------------
interface Card {
  suit: string
  card: number
}
interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this:Deck):() => Card;
}
const object:Deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards:Array(52),
  createCardPicker: function(this:Deck) {
    return (): Card => {
      const pickedCard = Math.floor(Math.random() * 52)
      const pickedSuit = Math.floor(pickedCard / 13)
      return {
        suit: this.suits[pickedSuit],
        card: pickedCard % 13
      }
    }
  }
}

// ---------------------- 函数重载 ---------------------
const suits = ['hearts', 'spades', 'clubs', 'diamonds']
function pickCard(x): any {
  if(typeof x === 'object'){
    let pickedCard = Math.floor(Math.random() * x.length)
    return pickedCard;
  }
  else if(typeof x === 'number'){
    const pickedSuit = Math.floor(x / 13)
    return {
      suit:suits[pickedSuit],
      card: x % 13
    }
  }
}
