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
