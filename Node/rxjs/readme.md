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

```
