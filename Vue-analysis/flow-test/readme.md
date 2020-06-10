# flow

    安装:
        yarn add flow-bin -g
    
        yarn run flow init
            It is common to have an empty .flowconfig file for your project. .flowconfig tells the 
            Flow background process the root of where to begin checking Flow code for errors.
            
    run flow:
        yarn run flow
        
[flow官网](https://flow.org/en/docs/install/)

## Usage

    1. Initialize your project with flow init
    2. Start the flow background process with flow
    3. Determine which files flow will monitor with // @flow
    4. Write Flow code for your project
    5. Check your code for type errors.
    
    Example:
```js
// @flow   或者 /*@flow*/
function split(str){
    return str.split(" ")
}
split(123);



function add(x:number,y:number){
    return x + y;
}
add(1,3);


// 检测数组
var arr:Array<number> = [1,2,3];
arr.pusy(123);
// 数组类型注释的格式是Array<T>,T表示数组中每项的数据类型。
```

![Type nnotations](https://flow.org/en/docs/types/primitives/)

    JavaScript has a number of different primitive types:
        Boolean
        String
        Number
        null
        undefined(void in Flow types)
        Symbols

```js
function method(x:number,y:string,z:boolean){
    console.log(x,y,z);
}
method(3.14,'hello',true);

function foo(x:Number,y:String,z:Boolean){
    console.log(x,y,z);
}
foo(new Number(3),new String('foo'),new Boolean(false));
```

[primitives](https://flow.org/en/docs/types/primitives/)









