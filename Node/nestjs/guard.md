# Guard

Guards have a single responsibility, They determine whether a given request will be handled by the route
handler or not, depending on certain conditions(like permissions, roles, etc.) present at run time.

注意: Guards are executed after all middleware, but before any interceptor or pipe
(路由守卫执行时机在所有的中间件执行之后, 并且在拦截器和流处理 之前)

Every guard must implements a **canActivate()** function. 返回一个布尔值, 表明是否验证通过 (This function should return a boolean, indicating whether the current request is allowed or not.)

```js
// auth.guard.ts
// demo
import { Injectable, CanActivate, ExectionContext } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExectionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return true;
  }
}

// 使用路由守卫
import { UseGuards } from "@nestjs/common";
import { AuthGurad } from "./auth.guard.ts";
@UseGuards(AuthGurad)
export class UserController {}
```

## Global Guards

```js
// 全局守卫
```
