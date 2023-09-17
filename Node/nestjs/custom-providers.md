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

## useValue

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

## useClass

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

## useFactory

The **useFactory** syntax allows for creating providers dynamically. The actual provider will be supplied
by the value returned from a factory function.

## useExisting

The **useExisting** ayntax allows you to create aliases for existing providers.

```ts
@Module({
  providers: [
    {
      provide: "AliasedLoggerService",
      useExisting: LoggerService,
    },
    LoggerService,
  ],
  controllers: [LoggerController],
})
export class LoggerModule {}
```

# Asynchronous providers

At times, the application start should be delayed until one or more asynchronous tasks are completed.
The syntax for this is to use **async/wait** with the **useFactory** syntax.The factory returns a promise.

# Dynamic modules

Modules define groups of components like providers and controllers that fit together as a modular part of an overall
application.

When a provider needs to be visible outside of a module, it is first exported from its host module,and then imported
into its consuming module.

## Dynamic module use case

configuration module, This makes it easy to dynamically change the application settings in different deployements.

In other words, dynamic modules provide an API for importing one module into another, and customizing the
properties and behavior of that module when it is imported.

In fact, what our **register()** method will return is a **DynamicModule**. A dynamic module is nothing more than a module
created at run-time, with the same exact properties as a static module, plus one additional property called **module**.

<!-- 动态模块其实 是一个运行时的模块 包含一个额外的属性 叫做module -->

1. **@Module()** decorator's **imports** property can take not only a module class name, but also a function returning a dynamic
   module.
2. A dynamic module can itself import other modules. (如果动态模块依赖于其他的 modules, 可以在**imports**属性中导入它们)

```ts
import { DynamicModule } from "@nestjs/common";
import { ConfigService } from "./config.service";

@Module({})
export class ConfigModule {
  static register(options): DynamicModule {
    /**
     * Out remaining task it to somehow inject the options object from the register() step into our ConfigureService
     */

    /** We'll need to first bind the options object to the Nest IOC container, and then have Nest inject it
      into our ConfigService.
     * */
    return {
      module: ConfigModule,
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}
```

```ts
//*.module.ts
// 重点：register中接收的参数 怎么注入到 service中。
@Module({})
export class ConfigModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: "CONFIG_OPTIONS",
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}

// *.service.ts
@Injectable()
export class ConfigService {
  constructor(@Inject("CONFIG_OPTIONS") private options: Record<string, any>) {
    console.log(options);
  }
}
```

### register

you are expectin to configure a dynamic module with a specific configuration for use only by the calling module.

<!-- 为动态路由指定一个特殊的配置, 只应用到当前的模块 -->

### forRoot

you are expecting to configure a dynamic module once and reuse that configuration in multiple places

### forFeature

youe are expecting to use the configuration of a dynamic module's **forRoot** but need to modify some
configuration specific to the calling module's needs.

## ConfigurableModuleBuilder

```ts
type ConfigModuleOptions = {
  folder: string;
};
// config.module-definition.ts
import { ConfigurableModuleBuilder } from "@nestjs/common";
export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableBuilder<ConfigurableModuleBuilder>().build();

// config.module.ts
import { ConfigurableModuleClass } from "./config.module-definition";
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule extends ConfigurableModuleClass {}
```

Extending the **ConfigurableModuleClass** means that **ConfigModule** provides now not only the **register**
method, but also the **registerAsync** method which allows consumers asynchronously configure that module.

```ts
import { ConfigurableModuleClass } from "./config.module-definition";
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule extends ConfigurableModuleClass {}

// config.service.ts
import { MODULE_OPTIONS_TOKEN } from "./config.module-definition";
@Injectable()
export class ConfigService {
  constructor(@Inject(MODULE_OPTIONS_TOKEN) private options) {
    console.log("options", options);
  }
}
```
