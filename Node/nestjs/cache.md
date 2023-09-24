# Cache

Caching is a great and simple **technique** that helps improve your app's performance.

## Install

下载需要的第三方包

```ts
npm install @nestjs/cache-manager cache-manager
```

## Usage

```ts
import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
@Module ({
  imports: [CacheModule.register()]
})

// ...controller.ts
import { Controller, Get } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { CACHE_MANAGER } from '@nestjs/cache-manager'

@Controller()
export class UserController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache){}
  @Get('/cache')
  async getCacheValue () {
    const value = await this.cacheManager.get('key') // 获取缓存的值 (key为键名)
  }
  async setCacheValue () {
    await this.cacheManager.set('key', 'hello world')
    // 默认的缓存时间是5秒
    await this.cacheManager.set('key', 'hello world', 1000) // 设置缓存 1s
    // 删除缓存的数据
    await this.cacheManager.del('key')
    // 清除重置
    await this.cacheManager.reset()
  }
}
```
