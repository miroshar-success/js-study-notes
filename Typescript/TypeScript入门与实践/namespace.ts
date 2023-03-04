// --------------- 命名空间 ------------
namespace utils {
  function isString (value: any) {
    return typeof value === 'string'
  }
}

namespace System.Utils {
  function isString (value: any) {
    return typeof value === 'string'
  }
}

namespace System {
  export namespace Utils {
    function isString (value: any) {
      return typeof value === 'string'
    }
  }
}

namespace Outer {
  const a = 0
  type Nullable<T> = T | undefined | null
  interface Point {
    x: number
    y: number
  }
  class Cat {
    name: string
    constructor(name: string) {
      this.name = name
    }
  }
  function print(p: Point) {
    console.log(p)
  }
}
// Outer.print({ x: 1, y: 2 })

namespace Player {
  type PlayerProps = {
    firstName: string
    lastName: string
    age: number
  }
  export function print(p: PlayerProps) {
    console.log(p)
  }
}
Player.print({ firstName: 'kyrie', lastName: 'irving', age: 31 })

// ----------- 别名导入 ------------------
namespace Plugins {
  export function isString(value: any) {
    return typeof value === 'string'
  }
  export interface Point {
    x: number
    y: number
  }
}

namespace App {
  import isString = Plugins.isString
  console.log(isString('hello'))
  console.log(isString(123))
  console.log(isString(undefined))
  import Point = Plugins.Point
  const p: Point = { x: 1, y: 2 }
  console.log(p)
}
export {
  
}