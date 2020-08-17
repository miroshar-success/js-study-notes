const p1 = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve('1');
    },3000);
})

const p2 = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve("2");
    },2000);
})

const p3 = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve("3");
    },1000);
})

p1.then((res) => {
    console.log(res);
    return p2;
})
.then((res) => {
    console.log(res);
    return p3;
})
.then(res => {
    console.log(res);
})

let result = Promise.all([p1,p2,p3]);
result.then((res) => {
    console.log(res);
})