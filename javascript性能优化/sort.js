// ------ 快速排序 使用splice ---------
function quickSort(array) {
    var length = array.length;
    if (length === 0)
        return [];
    var middleIndex = Math.floor(length / 2);
    var middleValue = array.splice(middleIndex, 1)[0];
    var left = [], right = [];
    for (var i = 0; i < array.length; i++) {
        if (array[i] < middleValue) {
            left.push(array[i]);
        }
        else {
            right.push(array[i]);
        }
    }
    return quickSort(left).concat([middleValue], quickSort(right));
}
var arr = [1, 4, 3, 5, 7, 2, 6, 9, 8];
console.log(quickSort(arr)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
// ----- 使用slice方法 -------
function quickSliceSort(array) {
    var length = array.length;
    if (length === 0)
        return [];
    var middleIndex = Math.floor(length / 2);
    var middleValue = array.slice(middleIndex, middleIndex + 1)[0];
    var left = [], right = [];
    for (var i = 0; i < length; i++) {
        if (i === middleIndex)
            continue;
        if (array[i] < middleValue) {
            left.push(array[i]);
        }
        else {
            right.push(array[i]);
        }
    }
    return quickSort(left).concat([middleValue], quickSort(right));
}
var arr1 = [1, 4, 3, 5, 7, 2, 6, 9, 8];
console.log(quickSliceSort(arr1));
