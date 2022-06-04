/* type ResolveFunction = (value: any) => any
type RejectFunction = (reason: any) => any
type Executor = (resolve: ResolveFunction, reject:RejectFunction) => void

type Status = 'pending' | 'fulfilled' | 'rejected'

class Promise<T = any> {
  public status: Status = 'pending'
  public resolve: ResolveFunction
  public reject: RejectFunction
  constructor(exec: Executor) {
    this.resolve = function(value) {
      if(this.status === 'pending') {
        this.status = 'fulfilled'
        console.log('resolve', value)
      }
    }
    this.reject = function(reason) {
      if(this.status === 'pending') {
        this.status = 'rejected'
        console.log('reject', reason)
      }
    }
    exec(this.resolve, this.reject)
  }
} */


const p1 = new Promise((resolve, reject) => {})
const p2 = p1.then()

console.log(p1 === p2, p1, p2)  // false

export {

}
