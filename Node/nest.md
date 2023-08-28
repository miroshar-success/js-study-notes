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
