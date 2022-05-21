/*
如果padding是数字, 则添加相应数量的空格, 如果是字符串, 则直接加载对应字符的前面
*/
// -------- type guard --------
function padLeft(padding: number | string, input: string): string {
  if(typeof padding === 'number') {
    return ' '.repeat(padding) + input
  }
  return padding + input
}
console.log(padLeft(3, 'hello'))      //    hello
console.log(padLeft('123', 'hello'))  // 123hello


function printAll(strings: string | string[] | null) {
  if(typeof strings === 'object' && strings) {
    for(const string of strings) {
      console.log(string)
    }
  } else if (typeof strings === 'string') {
    console.log(strings)
  }
}
printAll('1234')  // 1234
printAll(['1', '2', '3', '4'])  // 1 2 3 4


function multiplyApp(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if(!values) return values
  return values.map(x => x * factor)
}
console.log(multiplyApp([1, 2, 3, 4], 2))   // [ 2, 4, 6, 8 ]
console.log(multiplyApp([2, 3, 4], 1))      // [ 2, 3, 4 ]
console.log(multiplyApp(undefined, 2))      // undefined


// ------- equality narrowing -------
function example(x: string | number, y: string | boolean) {
  if(x === y) {
    x.toUpperCase()
    y.toUpperCase()
  } else {
    console.log(x, y)
  }
}

interface ContainerBox {
  value: number | null | undefined
}
function getContainerInfo(container: ContainerBox) {
  if(container.value == null) return null
  return container.value
}
console.log(getContainerInfo({value: 123}))
console.log(getContainerInfo({value: undefined}))
console.log(getContainerInfo({value: null}))


// ------------ in operator -----------
type Fish = {swim: () => void}
type Monkey = {skill: () => void}

function move(animal: Fish | Monkey) {
  if( 'skill' in animal) {
    return animal.skill()
  }
  return animal.swim()
}

// --------- instanceof narrowing ----------
function logValue(x: Date | string) {
  if(x instanceof Date) {
    console.log(x.toLocaleDateString())
  } else {
    console.log(new Date(x))
  }
}
logValue(new Date())    // 2022/5/19
logValue('2022-05-19')  // 2022-05-19T00:00:00.000Z


// ---------- Discriminated unions ---------
interface Shape {
  kind: 'circle' | 'square',
  radius?: number;
  sideLength?: number;
}
function getArea(shape: Shape): number {
  if(shape.kind === 'circle') {
    return Math.PI * shape.radius! ** 2
  }
  return shape.sideLength! ** 2
}

interface CircleShape {
  kind: 'circle';
  radius: number
}
interface SquareShape {
  kind: 'square';
  sideLength: number;
}
type AreaShape = CircleShape | SquareShape
function getShapeArea(shape: AreaShape): number {
  if(shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2
  }
  return shape.sideLength ** 2
}

/*
When narrowing, you can reduce the options of a union to a point where you have removed all possibilities
and have nothing left. In those cases, TypeScript will use a never type to represent a state which should not
exist.
*/
/*
The never type is assignable to every type; however, no type is assignable to never(except never itself)
*/
