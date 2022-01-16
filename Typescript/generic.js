// ------------- 泛型 --------------
function identify(arg) {
    return arg;
}
function _identify(arg) {
    return arg;
}
var _number = _identify(123);
var _string = _identify('123');
var _boolean = _identify(false);
// --------- 使用泛型变量 -----------
function loggingIdentify(arg) {
    console.log(arg.length);
    return arg;
}
// --------- 泛型类 --------
var GenericNumber = /** @class */ (function () {
    function GenericNumber() {
    }
    return GenericNumber;
}());
var myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 10;
function getLength(arg) {
    console.log(arg.length);
    return arg;
}
// getLength(123)
// ------- 在泛型约束中使用参数类型 --------
function getProperty(obj, key) {
    return obj[key];
}
var x = {
    a: 1,
    b: 2,
    c: 3,
    d: 4
};
getProperty(x, 'a');
getProperty(x, 'b');
// getProperty(x, 'm')
var list_options = [
    {
        country_name: 'china',
        country_id: 1
    },
    {
        country_name: 'american',
        country_id: 2
    },
    {
        country_name: 'japan',
        country_id: 3
    }
];
function create_select_options(list, label, value) {
    var temp = [];
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (typeof item[value] === 'number') {
            temp.push({
                label: item[label],
                value: item[value]
            });
        }
        else {
            temp.push({
                label: item[label],
                value: item[value] * 1
            });
        }
    }
    return temp;
}
var _list_options = create_select_options(list_options, 'country_name', 'country_id');
console.log(_list_options);
