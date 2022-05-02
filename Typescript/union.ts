// ------- 联合类型 和 类型保护 ---------
interface Counter {
  count: number
}

function sum(a: Object | Counter, b: Object | Counter) {
  if('count' in a && 'count' in b) {
    return a.count + b.count
  }
}


interface Bird {
  fly: boolean
  sing: () => void
}

interface Dog {
  fly: boolean
  bark: () => void
}
function trainAnimal(animal: Bird | Dog) {
  // 类型保护
  if(animal.fly)  {
    (animal as Bird).sing()
  } else {
    (animal as Dog).bark()
  }

  if('sing' in animal) {
    animal.sing()
  }else{
    animal.bark()
  }
}
