const { Observable } = rxjs;
(function () {
  const observable = new Observable((subscriber) => {
    subscriber.next(1)
    subscriber.next(2)
    subscriber.next(3)
    window.setTimeout(() => {
      subscriber.next(4)
      subscriber.complete()
    }, 1000)
  })
  console.log('getting start')
  observable.subscribe({
    next(x) {
      console.log(`got value ${x}`)
    },
    complete() {
      console.log('done')
    }
  })
})();

(function () {
  function foo() {
    console.log('hello world')
    return 100
  }
  const x = foo.call()
  console.log('x', x) // 100
  const y = foo.call()
  console.log('y', y) // 100
})();

// 使用observable 写法
(function () {
  const foo = new Observable(subscriber => {
    console.log('你好世界')
    subscriber.next(120)
    subscriber.next(240)
  })
  console.log('observable - before')
  foo.subscribe(x => {
    // 120   240
    console.log(x)
  })
  foo.subscribe(x => {
    // 120   240
    console.log(x)
  })
  console.log('observable - after')
})();

// ------------ observable can return multiple values over time ----------
(function () {
  console.log('observable-start')
  const foo = new Observable(subscriber => {
    subscriber.next(100)
    subscriber.next(200)
    subscriber.next(300)
    window.setTimeout(() => {
      console.log(400)
    }, 500)
  })
  foo.subscribe(v => {
    console.log(v)
    // 依次输出 100 200 300
  })
  console.log('observable-end')
})();

// --------------- creating observables --------------
(function () {
  const observable = new Observable(function subscribe(subscriber) {
    const id = window.setInterval(function () {
      console.log('creating')
      subscriber.next('111112232233')
    }, 1000)
  })
  // **subscribe** function is the most important piece to describe the Observable.
  /*   observable.subscribe(x => {
      console.log(x)
    }) */
})();

// --------------- complete --------------
(function () {
  const observable = new Observable(function subscribe(subscriber) {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.complete();
    subscriber.next(4)
  });
  observable.subscribe(function (x) {
    console.log('subscribe:', x)
  })
})();

(function () {
  let count = 0
  const observable = new Observable(function subscribe(subscriber) {
    const timer = window.setInterval(function () {
      count += 1;
      subscriber.next(count)
      if (count > 5) {
        subscriber.complete()
        window.clearTimeout(timer)
      }
    }, 1000)
  })
  observable.subscribe(function (x) {
    console.log('subscribe-interval', x)
  })
})();

// ---------------- error -------------
(function () {
  const observable = new Observable(function subscribe(subscriber) {
    try {
      subscriber.next(1)
      subscriber.next(2)
      a = 11111
    } catch (err) {
      subscriber.error(err)
    }
  });
  const s = observable.subscribe(function (v) {
    console.log('error', v)
  })
  s.error = function (e) {
    console.log(e)
  }
})();

// ---------------- Disposing observable executions -------------
(function () {
  const observable = new Observable(function subscribe(subscriber) {
    subscriber.next(1)
  });
  const subscription = observable.subscribe(x => {
    console.log(x)
  });
  console.log(subscription, subscription.unsubscribe())
})();

// ------------------- subscription --------------------
(function () {
  let timer = null
  const observable = new Observable(function subscribe(subscriber) {
    timer = window.setInterval(function () {
      subscriber.next(12345)
    }, 2000)  
  })
  const subscription = observable.subscribe(function (v) {
    console.log('value:', v)
  })
  window.setTimeout(() => {
    subscription.unsubscribe()
  }, 5000)
})();

// ------------- cancel observable ---------------
(function () {
  const observable = new Observable(function subscribe(subscriber) {
    const timer = setInterval(function () {
      subscriber.next('hello world')
    }, 1500)
    return function unsubscribe() {
      window.clearInterval(timer)
    }
  })
  const subscription = observable.subscribe(function (v) {
    console.log(v)
  })
  window.setTimeout(() => {
    subscription.unsubscribe()
  }, 8000)
})();

// -------------- 使用js -----------------
(function () {
  function subscribe(subscriber) {
    const id = setInterval(() => {
      subscriber.next('原生js')
    }, 1200)
    return function ubsubscribe() {
      window.clearInterval(id)
    }
  }
  const unsubscribe = subscribe({ next: x => console.log(x) })
  unsubscribe()
})()
