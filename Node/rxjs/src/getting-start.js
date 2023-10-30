const { fromEvent, scan, throttleTime, map } = rxjs

// ------- 以前的写法 ------
$('#getting-start .button').addEventListener('click', () => {
  console.log('clicked ----- addEventListener')
}, false)

fromEvent($('#getting-start .button'), 'click').subscribe(() => {
  console.log('clicked ------ rxjs')
})

// ------purity ------
// 以前的写法
let _count = 0
$('#getting-start .button').addEventListener('click', () => {
  console.log(`Clicked ${_count++} times`)
})
// ----- 使用rxjs 隔离状态 ------
fromEvent($('#getting-start .click-btn'), 'click')
  .pipe(scan(count => count + 1, 0))
  .subscribe(count => {
    console.log(`clicked ${count} times`)
  })

// ------- 每秒点击一次 -------
let clicked = 0
let rate = 1000
let lastClick = Date.now() - rate
$('#getting-start .per-second-btn').addEventListener('click', () => {
  /*   if (Date.now() - lastClick >= rate) {
      console.log(`clicked ${++clicked} times`)
      lastClick = Date.now()
    } */
})

fromEvent($('#getting-start .per-second-btn'), 'click')
  .pipe(
    throttleTime(1000),
    scan((count) => count + 1, 0)
  ).subscribe((count) => {
    console.log(`clicked ${count} times!`)
  })

// --------- values --------
fromEvent($('#getting-start .add-btn'), 'click')
  .pipe(
    throttleTime(1000),
    map(event => event.clientX),
    scan((count, clientX) => count + clientX, 0)
  )
  .subscribe((count) => {
    console.log(count)
  })