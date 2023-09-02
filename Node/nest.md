# Nestjs

## Install

```js
npm i -g @nestjs/cli
nest new project-name
```

使用--strict 标识创建一个 TypeScript 的项目。

```js
npm run start
```

启动服务, 默认监听在 3000 端口, 如果需要监听文件的变化, 使用下面的命令:

```js
npm run start:dev
```

This command will watch your files, automatically recompiling and reloading the server.

To create a Nest application instance, we use the core **NestFactory** class. _NestFactory_ exposes a few static
methods that allow creating an application instance.

```js
app.setGlobalPrefix("/api/v1"); // 设置所有路径的前缀
```

## Controllers

Controllers are responsible for handling incoming **requests** and returning **responses** to the client.

```js
import { Controller, Get } from "@nestjs/common";
@Controller() // 可指定一个路由前缀（specify an optional route path prefix of cats)
// easily group set of related routes.
export class CatsController {
  @Get() // 此处可以添加路径信息。(tha path includes both the optional controller path prefix and any path
  // string declared in the request method decorator)
  findAll(): string {
    return "all cats";
  }
}
```

when a request handler returns a JavaScript object or array, it will automatically be serialized to JSON.When it
returns a JavaScript primitive type, however, Nest will send just the value without attempting to serialize it.

### Utils

使用内置的命令行工具快速创建文件

```js
nest g controller user --no-spec
nest g service user --no-spec

// ...
nest g decorator <name>
nest g interface <name>
// 可以通过 nest --help 命令查看支持创建的文件类型
```

### Request Object

获取请求对象相关信息(Handlers ofen need access to the client **request** details).

```js
import { Req } from "@nestjs/common";
import { Request } from "express";

@Controller("cats")
export class CatsController {
  @Get()
  findAll(@Req() request: Request) {
    console.log(request); // 请求相关对象
  }
  @Get("ab*cd") // 路由通配符只有 express 支持
  findAll() {
    return "this route uses a wildcard";
  }
}
```

### Dymanic Params

```js
export class SingerService {
  @Get(":id")
  findOne(@Param() params: any): string {
    console.log(params.id);
  }
  /**
   * @Param() is used to decorate a method parameter, and makes the route parameters available properties of that
   * decorated method parameter inside the body of the method.
   */
}
```

## Async / Await

```js
@Controller()
export class PlayerController {
  async findAll() {
    const res = await axios.post("http://xxx.com/api/v1/players");
    return res;
  }
}
```

### Request Payload

接收客户端携带的参数

```js
import { Post, Body } from "@nestjs/common";
class UserProps {
  name: string;
  age: number;
}

@Controller()
export class UserController {
  @Post("/create_user")
  createUser(@Body() userProps: UserProps) {
    console.log(userProps);
  }
}
```

### Response

```js
import { Response, HttpStatus } from "@nestjs/common";
@Controller()
export class UserController {
  @Get()
  getUserList(@Res() res: Response) {
    res.statu(HttpStatus.OK).json([]);
  }
}
```

## Provider

```js
@Controller()
export class PlayerController {
  // This dependency is resolved and passed to your controller's constructor (or assigned to the indicated property)
  constructor(private playerService: PlayerSerivice) {}
}
```

The **private** syntax. This shorthand allows us to both declare and initialize the **catsService** member
immediately in the same location

## Module

Each application has at least one module.

## Module

Module 下的属性

1. providers
2. controllers
3. imports: the list of imported modules that export the providers which are required in this module
4. exports: the subset of providers that are provided by this module and should be available in other modules
   which import this module.

### Feature modules

A feature module simply organizes code relevant for a specific feature, keeping code organized and establishing clear
boundaries.

```js
// cats.module.ts
import { Module } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}

// app.module.ts
import { Module } from "@nestjs/common";
import { CatsModule } from "./cats/cats.module";

@Module({
  imports: [CatsModule],
})
export class AppModule {}
```

### Shared modules

modules are singletons by default.
Every module is automatically a **shared module**. Once created it can be reused by any module.
In order to share an instance, we first need to **export** the **CatService** provided by adding
it to the module's exports array.

```js
// cat.module.ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatService } from './cats.service';
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatService] // 导出CatService, 其他module中引入 当前module, 然后在controller中可用catService
})
```

```js
// player.module.ts
import { CatModule } from '../cat/cat.module.ts'
import { PlayerController } from './player.controller.ts'
@Module({
  imports: [CatModule],
  controllers: [PlayerController]
})

// player.controller.ts
import { CatService } from '../cat/cat.service.ts'
@Controller()
export class PlayerContrller {
  // 此处可用 cat.module.ts中导出的 CatService
  constructor(private readonly catService: CatService) {}
}
```

## Dependency injection

在 Module 中使用 provider

```js
import { Module } from '@nestjs/common';
import { SingerController } from './singer.controller';
import { SingerService } from './singer.service';

@Module({
  imports: [CatModule],
  controllers: [SingerController],
  providers: [SingerService],
})
export class SingerModule {
  constructor(private singerService: SingerService) {}
}
```

### Global Module

When you want to provide a set of providers which should be available everywhere out-of-the-box, make the module **global** with the **@Global()** decorator.

```js
// 全局module
import { Module, Global } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";

@Global() // 使之成为全局module, 在其他controller中引入当前module的 provider 即可
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

The **@Global()** decorator makes the module global-scoped, Global modules should be registered only once.
generally by the root or core module.

## Middleware

Middleware is a function which is called before the route handler. Middleware functions have access to the **request**
and **response** objects.

中间件可以是函数或者一个使用**Injectable**装饰器的构造函数。构造函数需要实现 **NestMiddleware** 接口。 函数中间件没有特殊的要求.
(You implement custom Nest middleware in either a function, or in a class with an @Injectable() decorator. The class should implement the NestMiddleware interface, while the function does not have any special requirements.)

```ts
// logger.middleware.ts
// 定义一个中间件 (中间件的基本用法)
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 执行中间件的逻辑
    next();
  }
}

// 使用中间件 (在modul中使用configure方法, Module需要实现NestModule接口)
// logger.module.ts
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from "@nestjs/common";
import { LoggerMiddleware } from "./logger.middleware";
@Module({
  controllers: [LoggerController],
  providers: [LoggerService],
})
export class LoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // forRoutes: 指定哪个路由使用中间件
    // 也可以指定特定的方法和特定的路径 传递一个对象参数, { path, method }
    //(We may also futher restrict a middleware to a particular request method by passing an object containing
    // the route path and request method to the forRoutes() method when configuring the middleware)
    consumer.apply(LoggerMiddleware).forRoutes("login");

    consumer.apply(LoggerMiddleware).forRouter({
      path: "login",
      method: RequestMethod.GET,
    });
  }
}
```