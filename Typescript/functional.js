var anys = [];
anys.push(1);
anys.push('oh no');
anys.push({ anything: 'goes' });
var o = { x: 'hello world', extra: 1 };
var o2 = o;
var Three = /** @class */ (function () {
    function Three() {
        this.p = 'hello';
    }
    return Three;
}());
var x = { p: 'hi' };
var two = x;
two = new Three();
// ---------------------------------------------------- Unions
function pad(s, n, direction) {
    console.log(s, n, direction);
    return direction + s + n;
}
pad('123', 1, 'left');
pad('123', 1, 'right');
var s = 'right';
pad('123', 1, s);
// 
var str = 'I am a string';
console.log(str);
var singer = [100, 100];
var CIRCLE = 'CIRCLE';
var SQUARE = 'SQUARE';
var TRIANGLE = 'TRIANGLE';
function getArea(s) {
    if (s.kind === 'circle') {
        return Math.PI * Math.pow(s.radius, 2);
    }
    else if (s.kind === 'square') {
        return Math.pow(s.x, 2);
    }
    else {
        return (s.x * s.y) / 2;
    }
}
getArea({ kind: 'circle', radius: 2 });
var obj1 = {};
var obj2 = [];
var obj3 = function () { };
var arr1 = ['1', '2'];
var arr2 = [1, 2, 3];
// -------------------------- Type parameters
function liftArray(t) {
    return [t];
}
// --------------------- 枚举
var PostStatus;
(function (PostStatus) {
    PostStatus[PostStatus["Draft"] = 6] = "Draft";
    PostStatus[PostStatus["UnPublished"] = 7] = "UnPublished";
    PostStatus[PostStatus["Published"] = 8] = "Published";
})(PostStatus || (PostStatus = {}));
console.log(PostStatus.Draft);
// --------------------------- readonly and const
var array = [1, 2, 3, 4, 5];
array.push(102);
array[0];
var rx = { x: 1 };
console.log(rx.x);
