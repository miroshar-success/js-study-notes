type Direction = 'Left' | 'Right' | 'Top' | 'Bottom'
type PositionMap = 'Left' | 'Right' | 'Up' | 'Down'

type CommonDirection = Extract<Direction, PositionMap>  // Left Right

type MyExtract<T,U> = T extends U ? T : never

class Animal {
  constructor(public name: string, public age: number) {
    this.name = name
    this.age = age
  }
  say(): void {
    console.log(this.name)
  }
}
class Monkey extends Animal {
  skill() {
    console.log('爬')
  }
}

type ExtractAnimal = MyExtract<Monkey, Animal>
type MonkeyType = typeof Monkey
