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