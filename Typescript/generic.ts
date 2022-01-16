// ------------- 泛型 --------------
function identify(arg: number): number{
  return arg
}

function _identify<T>(arg:T) : T {
  return arg;
}
const _number:number = _identify(123)
const _string:string = _identify('123')
const _boolean:boolean = _identify<boolean>(false)


// --------- 使用泛型变量 -----------
function loggingIdentify<T>(arg:T[]): T[] {
  console.log(arg.length)
  return arg
}

// --------- 泛型类 --------
class GenericNumber<T> {
  zeroValue: T
  add:(x:T, y:T) => T
}
const myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 10;


// ---------- 泛型约束 ----------
interface Lengthwise {
  length: number;
}
function getLength<T extends Lengthwise>(arg:T):T {
  console.log(arg.length)
  return arg
}
// getLength(123)


// ------- 在泛型约束中使用参数类型 --------
function getProperty<T, K extends keyof T>(obj:T, key:K) {
  return obj[key]
}
const x = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
}
getProperty(x, 'a')
getProperty(x, 'b')
// getProperty(x, 'm')


const list_options = [
  {
    country_name:'china',
    country_id: 1
  },
  {
    country_name: 'american',
    country_id: 2
  },
  {
    country_name: 'japan',
    country_id: 3
  }
]

function create_select_options(list:any [], label:string, value:string):Array<{label:string; value:number}>{
  const temp = []
  for(let i = 0; i < list.length; i++) {
    const item = list[i]
    if(typeof item[value] === 'number'){
      temp.push({
        label:item[label],
        value: item[value]
      })
    }else{
      temp.push({
        label:item[label],
        value: item[value]*1
      })
    }
  }
  return temp;
}
const _list_options = create_select_options(list_options, 'country_name', 'country_id')
console.log(_list_options)
