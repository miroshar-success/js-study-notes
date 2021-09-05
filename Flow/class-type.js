// @flow
class Player {
}
let instance:Player = new Player()

// ----------------------------- Class Methods
class MyClass {
  method(value:string):number {
    return 123
  }
}
const MyInstance:MyClass = new MyClass()


class Singer {
  name: string;
  constructor(name){
    this.name = name
  }
  method():void{
    console.log(this.name)
  }
}
const singer:Singer = new Singer('jay')

// --------------------- Fields added outside of the class definition need to be annotated within the body of the class
function func_we_use_everywhere(x:number):number{
  return x + x
}

class Foo {
  static helper: (number) => number
}
Foo.helper = func_we_use_everywhere


//------------Class generics
class Bar<A,B,C> {
  constructor(arg1:A, arg2:B,arg3:C) {
  }
}
const value:Bar<number,boolean,string> = new Bar(1,false,'123')