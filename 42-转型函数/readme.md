<!-- TOC -->

- [1. Number()](#1-number)
- [2. parseInt()](#2-parseint)

<!-- /TOC -->

# 1. Number()

    特殊的 
```js
Number(undefined);  // NaN
Number(null);       // 0
Number('');         // 0
Number(' ');        // 0
Number([]);         // 0
```

    Number.isInteger()
    判断传入的数是否为整数并是否为'number'类型

# 2. parseInt()

    特殊的：
```js
parseIint([]);          // NaN
parseIint(undefined);  // NaN
parseIint(null); // NaN
parseIint(false); // NaN
parseIint(true); // NaN
```