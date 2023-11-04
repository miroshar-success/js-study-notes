# Jsonwebtoken

```js
// 下载
npm install jsonwbtoken
```

## Usage

### jwt.sign(payload, secretOrPrivateKey, [options, callback])

1. 异步 (如果提供了回调函数) the calllback is called with the **err** or the JWT
2. 同步 直接返回 token 字符串 (returns the JsonWebToken as string)

payload could be an object literal, buffer or string representing valid JSON
If payload is not a buffer or a string, it will be coerced into a string using **JSON.stringify**

```js
const jwt = require("jsonwebtoken");
jwt.sign({ name: "hello" }, "secret");

jwt.sign("hello", "secret");

jwt.sign("world", "secret", function (err, data) {
  console.log("data", data);
  // eyJhbGciOiJIUzI1NiJ9.d29ybGQ.bKID0bXmg-bZYseqC3fiu24OvHvIz5RYTSsvsVN-9YI
});
```

## Options

1. algorithm (加密的算法, default: HS256)
2. expiresIn (过期时间), expresses in seconds or a string
   比如 60, '2 days', '10h' (数字表示秒数) A numeric value is interpteted as a seconds count.
3. notBefore 参数和 expiresIn 一样

```js
const jwt = require("jsonwebtoken");

// If **iat** is inserted in the payload, it will be used instead of the real timestamp form
// calculating other things
const older_token = jwt.sign(
  { foo: "bar", iat: Math.floor(Date.now() / 1000) - 30 },
  "shhhhh"
);
console.log("token", older_token);

/**
 * **exp** or any other claim is only set if the payload is an object literal.
 */
const j5 = jwt.sign(
  {
    sub: "hello",
    expiresIn: 100,
  },
  "hello"
);
console.log("j5", j5);
```

### jwt.verify(token, secretOrPublicKey, [options, callback])

The callback is called with the decoded payload if the signature is valid

```js
console.log(jwt.verify(j6, "secret"));
// { exp: 1699106809, data: 'foobar', iat: 1699103209 }

jwt.verify(j1, "secret", function (err, data) {
  console.log(data);
});
```
