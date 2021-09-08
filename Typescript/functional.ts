const anys = []
anys.push(1)
anys.push('oh no')
anys.push({anything: 'goes'})


let o = {x: 'hello world', extra:1}
let o2: {x: string} = o


type One = {p: string}
interface Two {
  p: string;
}
class Three {
  p = 'hello'
}
let x:One = {p: 'hi'}
let two:Two = x
two = new Three()

// ---------------------------------------------------- Unions