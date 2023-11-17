# Execution Context

Nest provides serval utility classes that help make it easy to write applications that function across
multiple application context.

1. ArgumentsHost
   The **ArgumentsHost** class provides methods for retrieving the arguments being passed to a handler. It allows
   choosing the appropriate context to retrieve the arguments from.

```ts
switchToRpc();

switchToHttp();

switchToWs();

host.getType(); // http / rpc / graphql
const [req, res, next] = host.getArgs();

/**
 * The host.switchToHttp() helper call returns an HttpArgumentsHost object that is appropriate for the HTTP application
 * context. The HttpArgumentsHost object has two useful methods we can use to extract the desired objects.
 */

const ctx = host.switchToHttp();
const request = ctx.getRequest<Request>();
const response = ctx.getResponse<Response>();
```

2. ExecutionContext

   **ExecutionContext** extends **ArgumentsHost**. 使用的地方: such as in the **canActivate()** method
   of a **guard** and the **intercept()** method of an **interceptor**

```ts
export interface ExecutionContext extends ArgumentsHost {
  getClass<T>(): Type<T>;
  // 返回当前使用路由守卫所属的控制器 (Returns the type of the controller class which the current handler belongs to)
  getHandler(): Function;
  // Returns a reference to the handler (method) that will be invoked next in the request pipeline.
}
```

```ts
// 一个demo
import { Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "./auth.guard.ts";
@Controller()
export class CatsController {
  @Post()
  @UseGuards(AuthGuard)
  create() {
    // ...
  }
}

// auth.guard.ts
import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
export class AuthGuard implements CanActivate {
  canActivate(host: ExecutionContext) {
    const methodKey = host.getHandler().name; // create
    const className = host.getClass().name; // CatsController
  }
}
/**
 * The ability to access references to both the current class and handler method
 */
```

## Reflection and metadata

Nest provides the ability to attach **custom metadata** to route handlers through decorators created
via **Reflector#createDecorator** method, and the built-in **@SetMetadata()** decorator.

```ts
// roles.decorator.ts
/**
 * Reflector#createDecorator  需要指定参数类型
 */
import { Reflector } from "@nestjs/core";
export const Roles = Reflector.createDecorator<string>([]);

// menu.controller.ts
@Controller()
export class MenuController {
  @Get()
  /**
   * Here we have attached the Roles decorator metadata to the getMenuList() method.
   */
  @Roles(["admin"])
  getMenuList() {
    return this.menuService.getMenuList();
  }
}

// to access the route's role(custom metadata),read the handler metadata, use the get() method
@Injectable()
export class RolesGuard {
  constructor(private reflector: Reflector) {}
}
// 接受两个参数: 1. a decorator reference and a context
const roles = this.reflector.get(Roles, context.getHandler());

// 如果是controller层面的 metadata
@Controller()
@Roles(['admin'])

const roles = this.reflector.get(Roles, context.getClass());
```

Nest given the ability to provide metadata at multiple levels, you may need to extra and merge metadata
from serval contexts.

```ts
const mix_1_roles = this.reflector.getAllAndOverride(Roles, [
  context.getHandler(),
  context.getClass(),
]);
// 后面的数据会覆盖前面的 (controller层面的会覆盖方法层面的)
// [ 'user' ]

const mix_2_roles = this.reflector.getAllAndOverride(Roles, [
  context.getClass(),
  context.getHandler(),
]);
// route 方法的 metadata会覆盖 controller的metadat
// [ 'admin' ]

// 合并
const merge_roles = this.reflector.getAllAndMerge(Roles, [
  context.getClass(),
  context.getHandler(),
]);
// merge [ 'admin', 'user' ]
```

These methods extract both controller and method metadata ac once, and combine them in different ways.

## SetMetadata()

```ts
@Post()
@SetMetadata('roles', ['admin'])
getMenuList () {
  return ['a', 'b', 'c']
}
```

We attached the **roles** metadata to the **getMenuList()** method.
(roles is a metadata key and ['admin'] is the associated value) roles 作为 metadata 的 key, ['admin'] 是其关联的值。

It is not good practive to use **SetMetadata()** directly in your routes. Instead, you can create your own decorators.
(直接在路由方法上使用 @SetMetadata() 不是一个好的方式), 你可以创建自定义的装饰器。

```ts
import { SetMetadata } from "@nestjs/common";
export const Roles = (...roles: string[]) => SetMetadata("roles", roles);
```

The difference is that with **@SetMetadata** you have more control over the metadata key and value.
and also can create decorators that take more than one argument (相比于 Reflector.createDecorator(), SetMetadata()
对键值有更多的控制权，也意味着你需要多传递一个参数)。

```ts
// usage
@Post()
@Roles('admin')
getMenuList () {
  return ['a', 'b', 'c', 'd']
}

// role.guard.ts
// 第一个参数 此时不需要传递一个Roles的引用, 只用传递一个key 即可
const roles = this.reflector.get<string[]>('roles', context.getHandler());
```
