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

### API

1. jwtService.sign(payload) 生成 token 的方法 The sign method is an implementation of jsonwebtoken **.sign()**.
   Differing from jsonwebtoken it also allows an additional **secret**, **privateKey** and **publicKey** properties on
   **options** to override options passed in from the module.
   If payload is not a buffer or a string, it will be coerced into a string using JSON.stringify (如果加密数据是对象, 将会使用 JSON.stringify()方法将对象转换为字符串)
2. jwtService.signAsync() 生成 token 异步方法
3. jwtService.verify() 验证 token 的方法. The verify method is an implementation of jsonwebtoken **.verify()**
4. jwtService.devode()
