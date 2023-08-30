# Node.js

1. APM(应用监控 Application Performance Management) 包括 Agent(上报数据)/Monitor(收集数据)/Dashboard(展示数据)
   概念 / 搭建 / AliNode
2. 高可用
   负载均衡(服务负载均衡和 RPC 负载均衡) / 灰度发布 / 优雅退出
3. 日志
   日志原理 / 日志分析 / 日志监控 / 日志收集与处理
   ELK 架构 Sentry 日志收集平台
4. 稳定性
   安全风险 / 限流 / 错误处理
5. 测试
   单元测试 / 代码质量 / 性能测试
   Code Smell 以及代码质量检查工具 SonarQube
6. 内存泄露
   内存回收原理 / 内存问题排查实战
7. 灰度发布机制与健康检查
8. 安全风险防范
9. 异常处理

## nvm

使用 git 下载:

```js
cd ~/ git clone https://github.com/nvm-sh/nvm.git .nvm
. ./nvm.sh
```

[nvm 下载](https://github.com/nvm-sh/nvm)

## 镜像管理

```js
npm install nrm -g

nrm ls  查看镜像源
nrm use <镜像名称>
npm config get registry (获取当前的镜像源)
```

## USE Method

Utilization: 利用率 (以资源一个时间段内被使用的百分比来表示)
Saturation 饱和度 (某个资源排队的数量)
Errors 误差 (出现异常的数量)

计算密集型: 计算/逻辑判断量非常大并且集中的类型,因为主要占用 CPU 资源所以又叫 CPU 密集型,当计算任务数等于 CPU 核心数的时候,是 CPU 运行效率最高的时候。

I/O 密集型: 当磁盘的读取数据和输出数据非常大的类型。由于 I/O 操作的运行时间远远大于 CPU,内存运行时间,所以任务的大部分时间都是在
等待 IO 操作完成,I/O 的特点是 CPU 消耗小。

rss: Resident Set Size: 为进程执行分配的总内存
heapTotal: V8 分配的堆总大小
heapUsed: V8 执行期间实际使用的内存

autocannon (压力测试)
clinic

https://gitee.com/node-apm/nodejs-memory-leak/blob/master/index.js

## QPS(Query Per Second)

用来衡量服务的性能。QPS 指每秒钟能执行的 query。QPS 的数值越高,server 能处理的 request 越多。

峰值 QPS: 每天 80%的访问集中在 20%的时间里, 这 20%的时间叫做峰值时间。

RT: (Response-time) 响应时间: 执行一个请求从开始到最后收到响应数据所花费的总体时间, 即从客户端发起请求到收到服务器响应结果的时间。

并发数指系统同时能处理的请求数量, 反应了系统的负载能力。

Graphite / Grafana 监控 Node.js 应用

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

## Dymanic Params

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

## Request Payload

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

## Response

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
