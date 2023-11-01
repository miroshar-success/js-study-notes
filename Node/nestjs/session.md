# Session

## Install

```js
npm install express-session
npm install -D @types/express-session
```

## Usage

```js
// apply the **express-session** middleware as global middleware(作为全局中间件)
import * as session from "express-session";
app.use(
  session({
    secret: "secret-key", // used to sign the session ID cookie.
    resave: false,
    saveUninitialized: false,
  })
);
```

Session data is not saved in the cookie itself, just the session ID. Session data is sored server-side.

## options

```js
import * session from 'express-session'
app.use(session({
  cookie: {
    domain: '',  // cookie作用的域名, Set-Cookie#Domain
    expires: new Date('2020-11-11'), //过期时间. Set-Cookie#Expires
    httpOnly: false,  // Set-Cookie#HttpOnly  // 设置为true, 客户端js无法读取cookie. (document.cookie)
    maxAge: 10000, // (in millseconds),过期时间 (by taking the current server time and adding maxAge milliseconds)
    path: '/',  // Set-Cookie#path (默认根路径)
    sameSite: false,
    secure: false // Set-Cookie#Secure
    //
  },
  proxy: true, //trust the reverse proxy when setting secure cookies(X-Forwarded-Proto header)
  rolling: false // force the session identifier cookie to be set on every response.
}))
```

### options#secret

This is the secret used to sign the session ID cookie. This can be either a string for a single secret, or an
array of multiple secrets. (一个字符串或者一个数组)。 If an array of secrets is provided, only the first element will be
used to sign the session ID cookie. (如果传递了一个数组, 仅数组的第一个元素会被用来作为 cookie ID 的签名)。

1. The use of environment variables to store the secret, ensuring the secret it self does not exist in your repository
2. Periodic updates of the secret, while ensuring the previous secret is in the array. (Chaning the secret value will invalidate all existing sessions. ....with the new secret as first element of the array, and including previous secrets as the later elements)

### options#saveUninitialized

Forces a session that is **uninitialized** to be saved to the store. Chossing false is useful for implementing login sessions.

### options#resave

Forces the session to be saved back to the session store, even if the session was never modified during the request.
