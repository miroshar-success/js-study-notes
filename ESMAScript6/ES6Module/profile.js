// 输出变量
export const firstname = 'kyrie'
export const lastname = 'irving'
export const year = 1992;

// 输入函数或者 类
class Player{
    constructor(){
        this.firstName = 'kyrie';
        this.lastName = 'irving';
    }
    skill(){
        console.log("crossover");
    }
}
function multiple(x,y){
    return x * y;
}
export {Player,multiple};

let guard = {
    firstName:"kyrie",
    lastName:"irving",
    year:1992
}
setTimeout(() => {
    guard = {
        firstName:"lebron",
        lastName:"james",
        year:1984
    }
},3000)
export {guard}

export const singer = "jay chou";

export function foo(){
    console.log("foo");
}