// -------- 实现flat（只展开一层） -----------
var array_1 = [1, 2, [3, [4], 5], 6];
function flat_1(array) {
    var temp = [];
    array.forEach(function (item) {
        if (Array.isArray(item)) {
            item.forEach(function (n) { return temp.push(n); });
        }
        else {
            temp.push(item);
        }
    });
    return temp;
}
console.log(flat_1(array_1)); // [ 1, 2, 3, [ 4 ], 5, 6 ]
function flat_2(array) {
    var temp = [];
    array.forEach(function (item) {
        temp = temp.concat(item);
    });
    return temp;
}
console.log(flat_2(array_1)); // [ 1, 2, 3, [ 4 ], 5, 6 ]
// ---------- 实现一个flat ------------
function flat_3(array, d) {
    if (d === void 0) { d = 2; }
    if (d <= 0)
        return array.slice();
    var temp = [];
    array.forEach(function (item) {
        if (Array.isArray(item)) {
            temp = temp.concat(flat_3(item, d - 1));
        }
        else {
            temp = temp.concat(item);
        }
    });
    return temp;
}
console.log(flat_3(array_1)); // [ 1, 2, 3, 4, 5, 6 ]
function flat_4(array, d) {
    if (d === void 0) { d = 1; }
    if (d <= 0)
        return array.slice();
    return array.reduce(function (prev, next) {
        if (Array.isArray(next)) {
            prev = prev.concat(flat_4(next, d - 1));
        }
        else {
            prev = prev.concat(next);
        }
        return prev;
    }, []);
}
console.log(flat_4(array_1, 4)); // [ 1, 2, 3, 4, 5, 6 ]
function flat_5(array) {
    var temp = [];
    array.forEach(function (item) {
        if (Array.isArray(item)) {
            var flatArray = flat_5(item);
            flatArray.forEach(function (n) { return temp.push(n); });
        }
        else {
            temp.push(item);
        }
    });
    return temp;
}
console.log(flat_5(array_1)); // [ 1, 2, 3, 4, 5, 6 ]
var array_2 = [1, 2, [3, 4, [5, { a: 1 }, 6], 7], 8];
console.log(flat_5(array_2));
