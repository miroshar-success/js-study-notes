function clone(data) {
    if (typeof data !== 'object')
        return data;
    if (data === null)
        return null;
    var result;
    if (Array.isArray(data)) {
        result = [];
    }
    else {
        result = {};
    }
    for (var key in data) {
        result[key] = clone(data[key]);
    }
    return result;
}
var object1 = {
    name: 'kyrie',
    age: 30
};
var object2 = clone(object1);
object1.age = 31;
console.log(object2); // { name: 'kyrie', age: 30 }
// ----- map 结构 -------
var map = new Map([
    ['name', '张三'],
    ['title', 'Author']
]);
var clone_map = clone(map);
console.log(clone_map); // {}
var players = [
    {
        firstName: 'kyrie',
        lastName: 'irving'
    },
    {
        firstName: 'lebron',
        lastName: 'james'
    }
];
var clone_players = clone(players);
players[0]['age'] = 100;
console.log(clone_players);
/*
{
  '0': { firstName: 'kyrie', lastName: 'irving' },
  '1': { firstName: 'lebron', lastName: 'james' }
}
*/
console.log(players);
/*
[
  { firstName: 'kyrie', lastName: 'irving', age: 100 },
  { firstName: 'lebron', lastName: 'james' }
]
*/
// ----- 包含set -----
var setArray = [new Set().add(1), new Set().add(2)];
console.log(setArray); // [ Set(1) { 1 }, Set(1) { 2 } ]
console.log(typeof new Set(), typeof new Map()); // object object
var clone_set_array = clone(setArray);
console.log(clone_set_array, Array.isArray(clone_set_array)); // ['0': {}, '1': {} ]
var s1 = new Set();
var s2 = new Set();
s1.add('hello');
s2.add('world');
console.log([s1, s2]);
console.log(clone([s1, s2])); // [ {}, {} ]
/*
{
  1: Set(),
  2: Map,
  3: {
    1: Map
  }
}
*/
// ------------ 支持array/object/map/set -------------
function deep_clone(object, map) {
    if (map === void 0) { map = new WeakMap(); }
    if (typeof object !== 'object' || object == null)
        return object;
    var fromMap = map.get(object); // 判断是否循环引用了
    if (fromMap)
        return fromMap;
    var target = {};
    map.set(object, target);
    var type = Object.prototype.toString.call(object).slice(8, -1);
    switch (type) {
        case 'Map':
            {
                target = new Map();
                object.forEach(function (value, key) {
                    target.set(deep_clone(value, map), deep_clone(key, map));
                });
            }
            break;
        case 'Set':
            {
                target = new Set();
                object.forEach(function (v) {
                    target.add(deep_clone(v), map);
                });
            }
            break;
        case 'Array':
            {
                target = object.map(function (item) { return deep_clone(item); }, map);
            }
            break;
        case 'Object':
            {
                target = {};
                for (var key in object) {
                    var v = deep_clone(object[key], map);
                    target[key] = v;
                }
            }
            break;
    }
    return target;
}
// ----- 测试 1 set ------
var k1 = [new Set().add('hello'), new Set().add('world')];
console.log('k1:', deep_clone(k1)); // [ Set(1) { 'hello' }, Set(1) { 'world' } ]
var k2 = [new Map([['hello', 'world'], ['你好', '生活']])];
console.log('k2', deep_clone(k2)); // [ Map(2) { 'world' => 'hello', '生活' => '你好' } ]
var k3 = {
    name: 'hello'
};
var deep_k3 = deep_clone(k3);
k3.name = '你好';
console.log(deep_k3); // { name: 'hello' }
var o = {
    a: null
};
o.a = o;
var deep_o = deep_clone(o);
console.log(deep_o); // { a: {} }
// ----------------- demo -----------------
var singer = {};
var p = {};
var m1 = new Map();
m1.set('a', singer);
m1.set('b', p);
// @ts-ignore
singer.age = 30;
// @ts-ignore
p.a = new Set().add('hello');
console.log(m1);
