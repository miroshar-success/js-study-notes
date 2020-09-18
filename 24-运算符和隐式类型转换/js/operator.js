// 运算符的优先级
/*var a = 42;
var b = "foo";
console.log( a && b);   // 42
console.log( a || b);   // foo

var c1 = 42 , d1;
d1 = (c1++,c1);

console.log(d1,c1);    // 43 43

var c2 = 42, d2;
d2 = c2++,c2;
console.log(d2,c2); // 42   43

var c3 = 42, d3;
d3 = ++c3,c3;
console.log(d3,c3); // 43  43*/


var a = 42;
var b = "foo";
var c = false;
var d = a && b || c ? c || b ? a : c && b : a;

console.log(  ((a && b) || c) ? ( (c || b) ? a : (c && b) ): a );
            //     'foo'   ?      ("foo" ? 42 : false) : 42

console.log( false && true || true );   // true;
console.log( (false && true) || true );   // true
console.log( false && (true || true) ); // false

console.log( true || false && false );  // true
console.log( (true || false) && false );    // false;
console.log( true || (false && false) );    // true


// 三目运算是右关联。

console.log( true ? false : true ? true : true );   // false

console.log( true ? false : (true ? true : true) ); // false
console.log( (true ? false : true) ? true : true ); // true

console.log( true ? false : true ? true : false );  //  false
console.log( true ? false : (true ? true : false) );    // false
console.log( (true ? false : true) ? true : false );    //  false


console.log(222.1234567.toFixed(2));
console.log(typeof 122.34555.toFixed(2))    // string

console.log( typeof 'hello world'); // string
console.log( typeof null);  // object
console.log(typeof true);   // boolean
console.log(typeof undefined);  // undefined
console.log(typeof {a:'123'});  // object
console.log(typeof 12); // number
console.log(typeof []); // object
console.log(typeof function(){});   // function
console.log(typeof Symbol('foo'))   // symbol

console.log( 0 == false );  // true
console.log( 1 == true);    // true

console.log( 0 == "" ); // true
console.log( 0 == [] ); // true

console.log( [1,2,3] == '1,2,3' );  // true

var foo = function(){};

console.log(typeof foo);    // function

var x = function bar(){}
console.log(typeof bar,typeof x);   // undefined function












