// --------------------------------- Types by Inference
let helloworld = 'hello World';

// const user = {
//   name: 'kyrie',
//   id: 0
// }

interface UserInterface {
  name: string;
  id: number;
}

const user: UserInterface = { // Works
  name: 'kyrie',
  id: 1
}

// const player: UserInterface = {  //Error
//   firstName: 'kyrie',
//   lastName: 'irving',
//   name: 'Kyrie - Irving',
//   id: 2
// }


interface Player {
  name: string;
  id: number;
}

class UserAccount {
  name: string;
  id: number 
  constructor(name: string, id:number) {
    this.name = name;
    this.id = id
  }
}
const player: Player = new UserAccount('kyrie', 1)
console.log('player:', player)


// -------------------------------------- You can use interface to annotate parameters and return values to functions
function getAdminUser():Player {
  return {
    name: 'hello',
    id:10
  }
}

function deleteUser(user:Player) {
}
deleteUser({name:'你好', id:20})

// --------------- primitive types boolean / bigint / null / number / string / symbol / undefined
// any never void (a function which returns undefined or has no return value)



// ----------------------------------------- Union 
type flag = true | false;

type WindowStates = 'open' | 'closed' | 'minimized'
type LockStates = 'locked' | 'unlocked'
type type = 'success' | 'error' | 'warning'

function getLength(obj: string | Array<string>): number{
  return obj.length
}
getLength('123')
getLength(['1', '2', '3'])

function wrapInArray(obj: string | string []): Array<string>{
  if(typeof obj === 'string'){
    return [obj]
  }
  return obj
}
wrapInArray('123')
wrapInArray(['1','2','3'])

// --------------------------------- generics
/* Generics provide variables to types. */
type StringArray = Array<string>
type NumberArray = Array<number>
type ObjectArray = Array<{name:string}>

interface Backpack<Type> {
  add: (obj:Type) => void;
  get:() => Type
}

// ----------------------------------------------- Structural Type system
interface Point{
  x: number;
  y: number;
}

function logPoint(p:Point) {
  console.log(`${p.x} - ${p.y}`);
}
const point: Point = {x:12,y:26}
logPoint(point)

// -------- The shape-matching only requires a subset of the object's fields to match
const point3 = {x:12, y:26, z:89}
const point4 = {x:37, y:26, width:30, height: 80}
logPoint(point3)
logPoint(point4)

class VirtualPoint {
  x: number;
  y: number;
  constructor(x: number, y:number){
    this.x = x
    this.y = y
  }
}
const newPoint = new VirtualPoint(13,56)


const obj = {width:10, height:15}
const area = obj.width * obj.height;