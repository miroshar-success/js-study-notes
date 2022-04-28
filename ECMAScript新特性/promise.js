Promise.resolve()
    .then(function () {
    console.log(1);
}).then(function () {
    console.log(2);
}).then(function () {
    console.log(3);
}).then(function () {
    console.log(4);
})
    .then(function () {
    console.log(5);
}).then(function () {
    console.log(6);
});
Promise.resolve()
    .then(function () {
    console.log(10);
}).then(function () {
    console.log(20);
}).then(function () {
    console.log(30);
}).then(function () {
    console.log(40);
})
    .then(function () {
    console.log(50);
}).then(function () {
    console.log(60);
});
Promise.resolve()
    .then(function () {
    console.log(100);
}).then(function () {
    console.log(200);
}).then(function () {
    console.log(300);
}).then(function () {
    console.log(400);
}).then(function () {
    console.log(500);
}).then(function () {
    console.log(600);
});
/*
交替执行
1
10
100
2
20
200
3
30
300
4
40
400
*/
// ----------- promise 返回一个新的promise -------------
Promise.resolve()
    .then(function () {
    console.log('a');
    return Promise.resolve('b');
}).then(function (res) {
    console.log(res);
}).then(function () {
    console.log('c');
}).then(function () {
    console.log('d');
})
    .then(function () {
    console.log('e');
});
