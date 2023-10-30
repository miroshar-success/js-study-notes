# Rxjs

Rxjs is a library for composing asynchronous and event-based programs by using observable sequences.

## getting-start

```js
// 订阅事件
$("#getting-start .button").addEventListener(
  "click",
  () => {
    console.log("clicked");
  },
  false
);

// 使用rxjs写法
fromEvent($("#getting-start .button"), "click").subscribe(() => {
  console.log("clicked");
});
```

1. purity
   What makes **RxJS** powerful is it's ability to produce values using pure functions.

```js
// 以前的写法
let _count = 0;
$("#getting-start .button").addEventListener("click", () => {
  console.log(`Clicked ${_count++} times`);
});

// 使用rxjs#scan
fromEvent($("#getting-start .button"), "click")
  .pipe(scan((count) => count + 1, 0))
  .subscribe((count) => console.log(`clicked ${count} times`));
```

The scan operator works just like **reduce** for arrays. It takes a value which is exposed to a callback.
The returned value of the callback will then become the next value exposed the next time the callback runs.

## Flow

```js
// 点击 每秒最多执行一次 (原生js的写法)
let clicked = 0;
let rate = 1000;
let lastClick = Date.now() - rate;
document.addEventListener("click", () => {
  if (Date.now() - lastClick >= rate) {
    console.log("clicked" + clicked + "times!");
    lastClick = Date.now();
  }
});

// 使用rxjs
fromEvent($("#getting-start .per-second-btn"), "click")
  .pipe(
    throttleTime(1000),
    scan((count) => count + 1, 0)
  )
  .subscribe((count) => {
    console.log(`clicked ${count} times!`);
  });
```

## Values

Here's how you can add the current mouse x position for every click (每次点击将 将 count 加上 鼠标的 x 位置点坐标)

```js
fromEvent($(".button"), "click")
  .pipe(
    map((event) => event.clientX),
    scan((count, clientX) => count + clientX, 0)
  )
  .subscribe((count) => {
    console.log(count);
  });
```

## Observables

1. pull: In pull systems, the consumer determines when it receives data from the data producer. The Producer itself
   is unaware of when the data will be delivered to the consumer.
2. push: In push systems, the producer determines when to send data to the consumer. The consumer is unaware of when it
   will receive that data.

```js
// 原生js执行函数
(function () {
  function foo() {
    console.log("hello world");
    return 100;
  }
  const x = foo.call();
  console.log(x); // 100

  const y = foo.call();
  console.log(y); // 100
})();

import { Observable } from "rxjs";
(function () {
  const foo = new Observable((subscriber) => {
    subscriber.next(100);
  });
  foo.subscribe((x) => {
    console.log(x);
  });
  foo.subscribe((x) => {
    console.log(x);
  });
  // 100
  // 100
})();

// two function calls trigger two separate side effects.
// Obervables have no shared execution and are lazy.
// Observable 是同步执行的
```

3. Observables can 'return' multiple values over time.

```js
const foo = new Observable((subscriber) => {
  // 同步输出
  subscriber.next(100);
  subscriber.next(200);
  subscriber.next(300);
  // 异步输出
  window.setTimeout(() => {
    subscriber.next(400);
  }, 1000);
});
foo.subscribe((v) => {
  console.log(v);
  // 依次输出 100 200 300
});
```

### Creating observables

**Observable** 构造函数接收 1 个参数 **subscribe** 函数

```js
// creating
const observable = new Observable(function subscribe(subscriber) => {
  // The function subscribe in new Observable is run for that given subscriber.
  setInterval(() => {
    subscriber.next('hello')
  }, 1000)
});

/**
 * Subscribing to an Observable is like calling a function, providing callbacks where the data will be
 * delivered.
*/
observable.subscribe(x => {
  console.log(x) // 执行 setInterval() 函数
});
```

### Execution

1. Next: sends a value, **Next** is the most important and most common type: they represent actual being delivered to a
   subscriber.
2. Error: sends a JavaScript Error or exception.
3. Complete

```js
// subscriber.next()
const observable = new Observable(function subscribe(subscriber) {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
  subscriber.next(4); // 将不会被执行
});

// subscriber.error(error)
```

### Disposing Observable Executions

once Observer is done receiving values, it has to have a way to stop the execution, in order to aviod wasting
computation power or memory resources.

```js
const subscription = observable.subscribe((x) => console.log(x));

// cancel
subscription.unsubscribe();
// when you subscribe, you get ba k a subscription, which represents the ongoing execution,
// just call **unsubscribe()** to cancel the execution.

/**
 * Each Observable must define how to dispose resources of that execution when we create the Observable using **create().**
 * You can do that by returning a custom **unsubscribe** function
 */
(function () {
  const observable = new Observable(function subscribe(subscriber) {
    const timer = setInterval(function () {
      subscriber.next("hello world");
    }, 1500);
    return function unsubscribe() {
      window.clearInterval(timer);
    };
  });
  const subscription = observable.subscribe(function (v) {
    console.log(v);
  });
  window.setTimeout(() => {
    subscription.unsubscribe();
  }, 8000);
})();
```
