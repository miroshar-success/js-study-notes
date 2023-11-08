# Exception Filter

Nest comes with a built-in **exceptions layer** which is responsible for processing all unhandled exceptions across
an application. (所有未捕获的异常都会在这个程序内置的 exceptions layer 处理), which when automatically sends an appropriate user-friendly
response. (返回一个合适的响应)

```js
{
  message: "";
  statusCode: 500;
}
/**
 * Basically, any thrown exception containing the statusCode and message properties will be properly populated and
 * sent back as a response
 */
```

## HttpException

```ts
import { HttpException, Controller } from "@nestjs/common";
@Controller()
export class SingerController {
  @Get()
  async findAll() {
    /**
     * HttpExption 接收两个必须的参数
     * 1. response arguments defines the JSON response body (可以是一个字符串或者对象)
     * 2. status defines the HTTP status code
     */
    throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
  }
}
/**
 *
 * {"response":{"message":"hello world","data":null,"response":null},"status":403,"message":"hello world","name":"HttpException"}
 */
```

## Built-in Exception

一些内置的常见异常类型

1. BadRequestException
2. UnauthorizedException
3. NotFoundException
4. ForbiddenException
5. NotAcceptableException
6. RequestTimeoutException
   ...

## Exception filters

you may want full control over the exceptions layer. you may want to add logging or use a different JSON schema based on
some dynamic factors. (有时想完全控制异常处理逻辑, 比如写入日志)

```ts
/**
 * 创建一个自定义的异常过滤器捕获异常 (an instance of the HttpException class)
 * To do this, we'll need to access underlying platform Request and Response objects.
 * */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    response.status(status).json({
      statusCode: status,
      timestamp: Date.now(),
      path: request.url,
    });
  }
}

// 使用自定义的HttpExceptionFilter
// user.controller.ts
import { HttpExceptionFilter } from "./custom-http-filter.ts";
import { Controller, UseFilters } from "@nestjs/common";
@Controller()
/**
 * 可以传递一个实例,也可以直接使用一个类。（尽可能使用class而不是实例。）
 * It reduces memory usage since Nest can easily reuse instances of the same class across your entire module.
 */
@UseFilters(HttpExceptionFilter)
@UserFilters(new HttpExceptionFilter())
export class UserController {
  @Get("/user/profile")
  handleeGetUserProfile() {
    throw new ForbiddenException(); // 一定要throw 一个异常
  }
}

// main.ts
async function bootstrap() {
  const app = await NestFacotry.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
```
