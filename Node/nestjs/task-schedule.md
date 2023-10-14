# Task Scheduling

Task scheduling allows you to schedule arbitrary code (methods/functions) to execute at a fixed date/time,
at recurring intervals, or once after a specified interval.

## usage

```js
npm install --save @nestjs/schedule

// app.module.ts
import { } from '@nestjs/schedule'
@Module({
  imports: [
    Schedule.forRoot()
  ]
})
```

The **.forRoot()** call initializes the scheduler and registers any declarative **cron jobs**, **timeouts**
and **intervals** that exist within your app.

## Cron

计时程序 (跟时间对象有关系)

1. Once, at a specified date/time
2. recurring jobs can run at a specified instant with in a specified interval(once per hour, once per week, once every 5 minute)
   这里的每 5 分钟 跟时间对象相关, 比如每 5 分钟就是 每小时的 05 分, 10 分 15 分,是 5 的整数倍。哪怕程序开始时是 10:02 开始的,那么 10:05 就会执行,而不是 10:07.

```ts
import { Cron } from "@nestjs/schedule";
import { Injectable, Logger } from "@nestjs/common";
@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  @Cron(45 * * * * *)
  handleCron () {
    this.logger.debug('每分钟的第45秒')
  }
}
```

一些例子:

```js
1.  * * * * * * 代表每秒
2. 45 * * * * * 每分钟的45s (every minute, on the 45th second)
3. 0 10 * * * * 每个小时的第10分钟 (every hour, at the start of the 10th minute)
4. 0 */30 9-17 * * * 上午9点到下午5点的 每30分钟 (every 30 minutes between 9am and 5pm)
5. 0 30 11 * * 1-5 (Monday to Friday at 11:30am)
```

上面的一些用法可能比较难记, **@nestjs/schedule** 提供了一些枚举类型方便使用 (provides a convenient enum with commonly used cron patterns)

```js
import { CronExpression } from '@nestjs/schedule'
//...
@Cron(CronExpression.EVERY_30_SECONDS)

// 也可以给Cron() 传递一个时间对象指示执行的时机(Doing so causes the jobs to execute exactly once, at the specified date)

@Cron(new Date(new Date().getTime() + 1000 * 10)) // 程序启动的10s后
```

## Intervals

执行方法 在指定的时间间隔。使用 **@Interval()** 装饰器, 传递一个参数(as a number in milliseconds)

```ts
@Interval(1000)
handleInterval() {
  console.log('every second')
}
// 内部机制使用的是 JavaScript的 serInterval() 函数
```

## Timeout

To declare that a method should run (once) at a specified timeout. use the **Timeout()** decorator.

```ts
import { Timeout } from "@nestjs/schedule";
export class TimeoutService {
  @Timeout(1000)
  handleTimeout() {
    console.log("timeout");
  }
}
```
