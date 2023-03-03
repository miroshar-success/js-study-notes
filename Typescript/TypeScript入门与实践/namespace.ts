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