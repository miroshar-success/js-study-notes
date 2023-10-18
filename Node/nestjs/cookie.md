# Cookies

An **HTTP cookie** is a small piece of data stored by the user's browser.When the user visits the website again,
the cookie is automatically sent with the request.

```js
// install
npm install cookie-parser
npm install -D @types/cookie-parser

// usage
import cookieParser from 'cookie-parser'
app.use(cookieParser())

/**
 * cookieParser(secret, options) 接受两个参数
 * 1. secret: 字符串, 用来作为签名cookie的密钥, 该参数为可选。
 * 2. options: 是一个对象，将作为 cookie.parse 的第二个参数。
*/
```

## cookie#parse

```js
const cookies = cookie.parse("foo=bar", {
  decode: decodeURIComponent, // 指定一个函数用来解码cookie 的value值
});
```

## cookie#serialize(name, value, options)

serialize a cookie name-value pair into a **Set-Cookie** header string.

```js
cookie.serialize("foo", "bar", {
  domain,
  encode, // specifies a function that will be used to encode a cookie's value.
  // The default function is the global **encodeURIComponent**
  httpOnly, // specifies the **boolean** value for the **HttpOnly**
  maxAge, // 过期时长
  secure,
  sameSite,
});
```

```ts
@Controller()
export class LoginController {
  @Get("/")
  getUserInfo(@Res() res: Response) {
    res.cookie(name, value, {
      // options 传递给 cookie.serialize()的第三个参数
    });
  }
}
```
