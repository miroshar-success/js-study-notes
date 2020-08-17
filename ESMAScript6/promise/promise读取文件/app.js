const fs = require('fs');

/*
fs.readFile('./files/a.txt',(err,data) => {
    if(err) {
        console.log(err);
    }else{
        console.log(data.toString());
    }
})

fs.readFile('./files/b.txt',(err,data) => {
    if(err){
        console.log(err);
    }else{
        console.log(data.toString());
    }
})

fs.readFile('./files/c.txt',(err,data) => {
    if(err){
        console.log(err);
    }else{
        console.log(data.toString());
    }
})
*/

let p1 = new Promise((resolve,reject) => {
    fs.readFile("./files/a.txt",(err,data) => {
        if(err){
            reject(err);
        }else{
            resolve(data.toString());
        }
    })
})
let p2 = new Promise((resolve,reject) => {
    fs.readFile("./files/b.txt",(err,data) => {
        if(err){
            reject(err);
        }else{
            resolve(data.toString());
        }
    })
})
let p3 = new Promise((resolve,reject) => {
    fs.readFile("./files/c.txt",(err,data) => {
        if(err){
            reject(err);
        }else{
            resolve(data.toString());
        }
    })
})
/*
p1.then((data) => {
    console.log(data);
    return p2
})
.then((data) => {
    console.log(data);
    return p3
})
.then((data) => {
    console.log(data);
})
 */

let result = Promise.all([p1,p2,p3]);
result.then(arr => {
    console.log(arr[0],arr[1],arr[2]);
})

function promiseReadFile(filePath){
    return new Promise((resolve,reject) => {
        fs.readFile(filePath,(err,data) => {
            if(err){
                reject(err);
            }else{
                resolve(data.toString());
            }
        })
    })
}

promiseReadFile("./files/a.txt")
    .then((res) => {
        console.log(res);
        return promiseReadFile('./files/b.txt');
    })
    .then(res => {
        console.log(res);
        return promiseReadFile("./files/c.txt");
    })
    .then(res => {
        console.log(res);
    })










