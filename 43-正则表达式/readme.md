<!-- TOC -->autoauto- [1. 正则(RegExp)](#1-正则regexp)auto- [2. match()](#2-match)auto- [3. replace()](#3-replace)auto- [4. search()](#4-search)auto- [5. split()](#5-split)auto- [6. test()](#6-test)auto- [7. 修饰符](#7-修饰符)auto- [8. 特殊字符](#8-特殊字符)auto- [9. 定位符](#9-定位符)auto- [10. 限定符](#10-限定符)autoauto<!-- /TOC -->

# 1. 正则(RegExp)

    RegExp构造函数创建了一个正则表达式对象,用于将文本与一个模式匹配。
    
    正则表达式是用于匹配字符串中字符组合的模式，在JavaScript中,正则表达式也是对象。这些模式被用于RegExp的exec和test方法。
    以及String的match,replace,search和split方法。

# 2. match()

    在字符串内检索指定的值,或找到一个或多个正则表达式的匹配。
        stringObject.match(searchvalue);
        stringObject.match(regexp);
```js
string.match(/l/); // ['l',index:2,input:'Hello World',groups:undefined,length:1]
// length:表示查询到的匹配字符串的个数
string.match(/l/g);// ['l','l','l'] 
```
    tips:
    1. 在全局检索模式下，match() 即不提供与子表达式匹配的文本的信息，也不声明每个匹配子串的位置 
    2. 已经匹配过的字符串不会再进入下一次匹配

# 3. replace()

    在字符串中用一些字符替换另一些字符,或者替换一个与正则表达式匹配的字串。
        stringObject.replace(regexp/substr,replacement);

    tips:
    1. replacement可以是字符串也可以是函数,
    2. 不会改变源字符串
    
# 4. search()

    用于检索字符串中指定的子字符串,或检索与正则表达式匹配的子字符串.
        stringObject(regexp);
        stringObject(searchValue);

    tips: 使用正则表达式的时候,匹配对大小写敏感,要执行忽略大小写的检索,使用标志 i .

# 5. split()

    用于将一个字符串分割成字符串数组.
        stringObject.split(separator,howmany);

    tips:   该参数可指定返回的数组的最大长度。如果设置了该参数，返回的子串不会多于这个参数指定的数组。如果没有设置该参数，整个字
    符串都会被分割，不考虑它的长度

# 6. test()

    用来查看正则表达式与自定的字符串是否匹配。返回true或false.
```js
/^hello/.test('hello world');   // true
```

# 7. 修饰符

    g   全局匹配
    i   忽略大小写
    m   换行匹配

# 8. 特殊字符

    ^   在开头匹配
    [0-9]/[a-z]/[A-Z] 匹配数组0-9,字母a-z或A-Z

# 9. 定位符

    ^   匹配字符串开始位置 (写在要匹配的字符串前面)
    $   匹配字符串结束位置 (写在要匹配的字符串后面)
    \b  匹配单词边界
    \B  匹配非单词边界
    \w  匹配字母下划线或数字,等价于[0-9a-zA-Z]

# 10. 限定符

    *   匹配前面的子表达式0次或多次     {0,}
    +   匹配前面的子表达式1次或多次     {1,}
    ?   匹配前面的子表达式0次或一次     {0,1}
    {n} 匹配确定的n次   
    {n,}至少匹配n次
    {n,m}最少匹配n次最多匹配m次。
    ()  标记一个子表达式的开始和结束位置。子表达式可以获取供以后使用

    |   或者
    
```js
let str13 = 'Hello World';
str13.replace(/(Hello)\s(World)/,'$2 $1');
```
