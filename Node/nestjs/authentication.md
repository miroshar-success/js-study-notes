# Authentication

Authentication is an essential part of most applications. (身份验证是大多数程序至关重要的一环)。...
once authenticated, the server will issue a JWT that can be sent as a bearer token in an authorization header on subsequent requests to prove authentication.

[Auth 2.0](https://datatracker.ietf.org/doc/html/rfc6750)

## JWT

```js
npm install --save @nestjs/jwt
```

```js
// usage
// xx.service.ts
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
}

// xx.module.ts
import { JwtModule } from '@nestjs/jwt'
@Module({
  imports: [
    JwtModule.register({
      secret: 'hello world'
    })
  ]
})

/**
 * asynchronously pass your module options instead of passing them beforehand
*/
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'hello world',
      })
    })
  ]
})
```

## API

1. jwtService.sign(payload) 生成 token 的方法 The sign method is an implementation of jsonwebtoken **.sign()**.
   Differing from jsonwebtoken it also allows an additional **secret**, **privateKey** and **publicKey** properties on
   **options** to override options passed in from the module.
   If payload is not a buffer or a string, it will be coerced into a string using JSON.stringify (如果加密数据是对象, 将会使用 JSON.stringify()方法将对象转换为字符串)
2. jwtService.signAsync() 生成 token 异步方法
3. jwtService.verify() 验证 token 的方法. The verify method is an implementation of jsonwebtoken **.verify()**
4. jwtService.decode()

## Auth#guard

```ts
// 一个路由守卫验证器
// auth.guard.ts
import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = this.jwtService.verify(token, {
        secret: "secret",
      });
      request["user"] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}

// auth.controller.ts
import { Controller, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "./auth.guard.ts";
@Controller()
export class SingerController {
  @Post()
  @UseGuards(AuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
```

## Global guard

如果大量的路由都需要验证是否登录, 可以将判断 token 是否合法的路由守卫注册为一个全局的守卫。
If the vast majority of your endpoints should be protected by default, you can register the authentication guard as a **global guard**

```ts
// auth.guard.ts
import { Reflector } from "@nestjs/core";
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const is_public = this.reflector.getAllAndOverride<boolean>(
      "is_public_key",
      [context.getHandler(), context.getClass()]
    );
    if (is_public) return true;
    // ...
  }
}

// singer.player.ts
import { Controller, SetMedata } from "@nestjs/common";

const Public = () => SetMetadata("is_public_key", true);

@Controller()
export class PlayerController {
  constructor() {}
  @Get("/profile")
  @Public()
  getProfile() {}
}
```
