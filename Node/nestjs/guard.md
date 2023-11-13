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
import { NestFactory } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(AuthGuard());
};
```

## Setting roles per handler

Our **RolesGuard** is working, but it is not very smart yet. For example, could have different permission schemes
for different routes. Some might be available only for an admin user, and others could be open for everyone.

**custom metadata** Nest provides the ability to attach custom **metadata** to route handlers.

```ts
// roles.decorator.ts
import { Reflector } from "@nestjs/core";
export const Roles = Reflector.createDecorator<string[]>([]);

// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "./role.decorator";

export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) return true;
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // 此处判断 请求的角色当前路由允许的请求之间的关系。
  }
}

// roles.controller.ts
import { Contoller } from "@nestjs/common";
@Controller()
export class CatController {
  @Roles(["admin"])
  @Post()
  createRole() {}
}
```
