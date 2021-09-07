// @flow
interface Serializable {
  serialize(): string;
}
class Foo {
  serialize() {return '[Foo]'}
}
class Bar{
  serialize() {return '[Bar]'}
}

const foo:Serializable = new Foo()
const bar:Serializable = new Bar()

class MyClass implements Serializable {
  serialize() { return 'Foo' }
}
class MyBar implements Serializable {
  serialize() { return 'Bar' }
}

interface SayName {
  say_name() :string
}
interface SayHello {
  say_hello(): string
}
class Player implements SayName, SayHello {
  say_name() {
    return '123'
  }
  say_hello() {
    return '456'
  }
}

// --------------------------------------------- Interface Methods
interface MyInterface {
  method(value:string): number;
  property: string;
  property?: string;
}
interface MyInterfaceTwo<A,B,C> {
  property:A,
  method(val:B):C
}

//------------------------------------------- variance (read-only and write-only)
interface OneInstance {
  +firstName: string, // readOnly
  -lastName: string,  // writeOnly
  age: number | string
}

const obj:OneInstance = {
  firstName:'kyrie',
  lastName:'irving',
  age:30
}
obj.firstName
obj.lastName = '123'