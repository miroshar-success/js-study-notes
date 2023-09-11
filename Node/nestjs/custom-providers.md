# Custom providers

IOC (inversion of control)
DI (Dependency Injection)

```js
// cat.service.ts
/**
 * In cats.service.ts, the @Injectable() decorator declares the CatsService class a class that can be managed by
 * the Nest IoC container.
 */

// cat.controller.ts
/**
 * CatsController declares a dependency on the **CatService** token with constructor injection.
 */
```

When the Nest IOC container instantiates a **CatsController**, if first looks for any dependencies. When it finds the
**CatsService** dependency, it performs a lookup on the **CatsService** token, which returns the **CatsService** class,per the registration setp. (如果是单例模式, Nest 将会创建一个 CatsService 实例,缓存并返回它, 如果已经存在此实例,则直接返回已经缓存的实例。)

One key feature is that dependency analysis.

```ts
import { Module } from '@nestjs/common';
@Module({
  controllers: [CatsController],
  providers: [CatsService],  // takes an array of providers.
  // 另一种写法
  providers: [
    {
      provide: CatsService,
      useClass: CatsService
    }
  ]
})
```

## 自定义 providers

1. You want to create acustom instance instead of having Nest instantiate a class
2. You want to re-use an existing class in a second dependency
3. You want to override a class with a mock version for testing

### useValue

useValue syntax is useful for injecting a constant value. Putting an external library into the Nest container, or replacing a real implementation with a mock object.

```ts
const mockCatService = {
  findAll () {
    return [1, 2, 3, 4, 5]
  }
}

// cat.module.ts
@Module({
  imports: [CatModule],
  providers: [
    {
      provide: CatService,
      // 请求接口返回的是此处mock数据
      useValue: mockCatService
    }
  ]
})
```

### useClass

The useClass syntax allow you to dynamically determine a class that a token should resolve to.

```ts
const configServiceProvider = {
  provide: ConfigureService,
  useClass:
    process.env.NODE_ENV === "development"
      ? DevelopmentConfigService
      : ProductionConfigService,
};

@Module({
  providers: [configServiceProvider],
})
export class AppModule {}
```
