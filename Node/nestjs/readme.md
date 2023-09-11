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

### 构造函数中间件

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

    // 也可以传递一个或者多个controller classes, 使用逗号分隔。
    // (In most cases, you will probably just pass a list of controllers separated by commas)
    consumer.apply(LoggerMiddleware).forRoutes(PlayerController);
  }
}
```

### Functional middleware

将上述类的中间件转换为函数中间件写法 如下:

```ts
// logger.middleware
import { Request, Response, NextFunction } from "express";
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log("request...");
  next();
}

// logger.module.ts
// 使用函数中间件
// ...
export class LoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(PlayerController);
  }
}
```

### Global middleware

全局中间件

```js
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```

使用多个中间件

```js
// ...
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
```

## Pipe

### Built-in pipes

Pipes 通常有两个功能:

1. transformation: transform input data to the desired form (转换输入的数据格式)
2. evaluate input data and if valid, simply pass it through unchanged, otherwise, throw an exception.

```ts
// 转换动态路由参数
import { Response, Param } from "@nestjs/common";
export class CatService {
  @Get(":id")
  // ParseIntPipe 将id 从字符串转换为数字
  findCat(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    return res.status(200).json({
      code: 0,
      msg: "success",
      data: this.catService.findOne(id),
    });
  }
  // 实例化一个 ParseIntPipe()构造函数, 给构造函数传递参数自定义相应行为
  @Get('/cat/:id')
  findBrand (
    @Param('id', new ParseIntPipe( { errorHttpStatusCode: HttpStauts: NOT_ACCEPTABLE } ))
    id: number
  ) {
    return this.catService.findOne(id)
  }
  @Get()
  findBrand (@Query('id', ParseIntPipe) id: number) {
    return this.catService.findOne(id)
  }
  @Get(':uuid')
  findBrand (@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    // 检测参数是否为uuid, 也可以指定特定版本的uuid
    // (you are passing UUID inversion 3,4,5, if you only require a specific version of UUID,
    // you can pass a version in the pipe options)
  }
}
```

### Custom pipes

```ts
// validation.ts
import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    /**
     * console.log(value,  metadata) 动态参数
     * value: 123 { metatype: [Function: String], type: 'param', data: 'id' }
     *
     * // 查询参数
     * value: 123 {"type":"query","data":"id"}
     */
    return value;
  }
}

@Controller()
export class CatController {
  @Get("/:id") //动态路由参数
  findCat(@Param("id", new ValidationPipe()) id: string) {}
  @Get("/query") // 查询参数
  findCat(@Param("id", new ValidationPipe()) id: string) {}
  @Post("/create")
  createCat(@Body(new ValidationPipe()) body: { id: number; name: string }) {}
}

/**
 * PipeTransform 是一个泛型接口。
 * PipeTransform<T, R> is a generic that must be implemented by any pipe. The generic interface uses
 * T to indicate the type of the input value (T 表示输入值的类型), and R indicate the return type of the
 * transform() method. (R transform()表示输出函数值类型)
 */
```

Every pipe must implement the **transform()** method to fulfill the **PipeTransform** interface contract.
transform 函数有两个参数：

1. value (value is received by the route handling method)
2. metadata (metadata 是一个对象包含三个属性)

```ts
interface ArgumentMetadata {
  type: "body" | "query" | "param" | "custom"; // 参数来源
  metatype?: Type<unknown>; // 在使用ts时给参数的注解类型, 如 String, 如果使用的是js, 则为undefined
  data?: string; // 传递给装饰器的参数 如id.
}

// 使用场景: 1. converting a string to an integer. (转换数据格式)
// 2 some required data fields may be missing, and we would like to apply defaut values.
// (给一个缺失的值默认值)
```

### Schema based validation

我们需要在请求时判断传递的参数是否是合法的, 所以在提交给服务器的数据需要先进行校验. 可以在 controller 中进行数据校验,但是这样做
会违反单一职责原则。
(We want to ensure that any incoming request to the create method contains a valid body. So we have to validate
object. We could do this inside the route handler method, but doing so is not ideal as is would break the single
responsibility rule).

As noted earlier, a **validation pipe** either returns the value unchanged or throws an exception.

借用第三方库进行数据验证

```ts
npm install --save zod
```

```ts
// todo.validation.ts
// 用法
import { PipeTransform, BadRequestException } from "@nestjs/common";
import { ZodObject } from "zod";

export class TodoValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}
  transform(value: any) {
    // 可以是一个异步函数
    try {
      this.schema.parse(value);
    } catch (err) {
      throw new BadRequestException(err);
    }
    return value; // 返回未修改过的value
  }
}

// 定义数据类型
import { z } from "zod";
export const createCatSchema = z
  .object({
    text: z.string(),
    id: z.number(),
    completed: z.boolean(),
  })
  .required();

export type CreateTodoDto = z.infer<typeof createCatSchema>;
```

```ts
// todo.controller.ts
@Controller()
export class TodoController {
  @Post("/createTodo")
  @UsePipes(new TodoValidationPipe(createCatSchema))
  createTodo(@Body() createTodo: CreateTodoDTO) {
    this.todoService.create(createTodo);
  }
}
```

### Global scoped pipes

it is applied to every route handler across the entire application.

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
```

Global pipes are used across the whole application, for every controller and every route handler.

### Providing defaults

To allow an endpoint to handle missing querystring parameter values. we have to provide a default value.

```ts
// todo.pipe.ts
// 默认值pipe
const default_todo_props = {
  id: Date.now(),
  text: "我是默认值",
  completed: false,
};
export class DefaultPipe implements PipeTransform {
  // 创建todo, 没有传递参数
  transform(value: any = {}) {
    for (const key in default_todo_props) {
      if (!value.hasOwnProperty(key)) {
        value[key] = default_todo_props[key];
      }
    }
    return value;
  }
}
```

```ts
// todo.controller.ts
// DefaultValuePipe
@Controller()
export class TodoController {
  @Get("/query/todo")
  queryTodo(
    @Query("page", new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query("size", new DefaultValuePipe(20), ParseIntPipe) size: number,
    @Res() res: Response
  ) {
    return res.status(200).json({
      code: 0,
      message: "success",
      data: null,
    });
  }
}
```
