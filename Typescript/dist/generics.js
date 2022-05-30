"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function identity(arg) {
    return arg;
}
console.log(identity('123'));
console.log(identity(123));
console.log(identity(true));
console.log(identity([1, 2, 3]));
function sum(a, b) {
    return `${a}-${b}`;
}
console.log(sum('1', 2));
console.log(sum(1, '2'));
function loggingIdentity(arg) {
    return arg.length;
}
console.log(loggingIdentity(['1', '2', '3']));
console.log(loggingIdentity([1, 2, 3]));
function getLength(arg) {
    return arg.length;
}
console.log(getLength([1, 2, 3, 4]));
console.log(getLength('123'));
console.log(getLength({ length: 10 }));
class Player {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
const kyrie = new Player('kyrie', 'irving');
const lebron = new Player('lebron', 'james');
function print(obj, key) {
    console.log(obj[key]);
}
print(kyrie, 'firstName');
print(lebron, 'lastName');
class ObjectRefImplement {
    constructor(object, key) {
        this._object = object;
        this._key = key;
    }
    getValue() {
        return this._object[this._key];
    }
    setValue(value) {
        this._object[this._key] = value;
    }
}
const player_ref = new ObjectRefImplement(kyrie, 'firstName');
player_ref.setValue('ky');
console.log(player_ref.getValue(), kyrie);
const player_ref_1 = new ObjectRefImplement(lebron, 'lastName');
console.log(player_ref_1.getValue());
player_ref_1.setValue('king');
console.log(player_ref_1.getValue());
class Manager {
    constructor(data) {
        this.data = data;
    }
    getItem(index) {
        return this.data[index];
    }
}
const m = new Manager(['1', '2', '3', '4', '5']);
console.log(m.getItem(0));
console.log(m.getItem(1));
function getProperty(obj, key) {
    return obj[key];
}
const x = { a: 1, b: 2, c: 3, d: 4 };
console.log(getProperty(x, 'a'));
console.log(getProperty(x, 'b'));
class ArrayLike {
    constructor() {
        this.length = 0;
    }
    add(ele) {
        this[this.length] = ele;
        this.length += 1;
    }
    get(index) {
        return this[index];
    }
    delete(index) {
        Reflect.deleteProperty(this, index);
        this.length -= 1;
    }
}
const array_like_string = new ArrayLike();
array_like_string.add('1');
array_like_string.add('2');
array_like_string.add('3');
console.log(array_like_string.get(2));
array_like_string.delete(0);
console.log(array_like_string);
const obj = {
    name: 'hello'
};
function quick_sort(array = []) {
    const length = array.length;
    if (length === 0)
        return [];
    const middleIndex = Math.floor(length / 2);
    const [middleValue] = array.splice(middleIndex, 1);
    const left = [], right = [];
    for (const item of array) {
        if (item < middleValue) {
            left.push(item);
        }
        else {
            right.push(item);
        }
    }
    return quick_sort(left).concat(middleValue, quick_sort(right));
}
console.log(quick_sort([1, 3, 2, 12, 5, 9]));
function quickSort(array) {
    const length = array.length;
    if (length === 0)
        return [];
    const middleIndex = Math.floor(length / 2);
    const [middleValue] = array.splice(middleIndex, 1);
    const left = [], right = [];
    for (const item of array) {
        if (item < middleValue) {
            left.push(item);
        }
        else {
            right.push(item);
        }
    }
    return quickSort(left).concat(middleValue, quickSort(right));
}
console.log('number sort:', quickSort([3, 5, 1, 2, 7, 10, 23, 16, 19]));
console.log('string sort:', quickSort(['a', 'c', 'd', 'e', 'f', 'w', 'g', 'l']));
function chineseSort(array) {
    return array.sort((a, b) => a.localeCompare(b, 'zh-CN'));
}
console.log('chinese sort:', chineseSort(['武汉', '郑州', '太原', '济南', '沈阳', '大连']));
function stringSort(str) {
    return quickSort(str.split('')).join('');
}
console.log(stringSort('cdadewsxm'));
function sort(data) {
    if (typeof data === 'string') {
        return stringSort(data);
    }
    return quickSort(data);
}
const sort_string = sort('dfcdae');
const sort_array_number = sort([1, 3, 4, 2, 5]);
const sort_array_string = sort(['e', 'd', 'a', 'c', 'f', 'b']);
console.log(sort_string, sort_array_number, sort_array_string);
