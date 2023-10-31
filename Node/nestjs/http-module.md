# HttpModule

## Install

```js
npm install --save @nestjs/axios axios

// usage
@Module({
  imports: [HttpModule]
})

// service
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
@Injectable()
export class CatsService {
  constructor(private readonly httpService: HttpService) {}
  getNewsList () {
    return this.httpService.get('http://xxx.com')
  }
}

// controller
import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
@Module({
  imports: [HttpModule]
})
export class CatsModule {}
```

All **HttpService** methods return an **AxiosResponse** wrapped in an **Observable** object.

```ts
import { HttpModule } from '@nestjs/axios'
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000 // 超时时间
    })
  ]
})
```

If you just want to access the underlying Axios instance created by **@nestjs/axios**, you can access it via
**HttpService#axiosRef**

```js
@Injectable()
export class CatsService {
  constructor(private readonly httpService: HttpService) {}
  findAll (): Promise<AxiosResponse<Cat[]>> {
    return this.httpService.axiosRef.get('http://localhost:3000/cats')
  }
}
```
