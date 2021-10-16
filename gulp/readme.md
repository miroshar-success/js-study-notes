# Gulp

```js
npm install gulp --dev
```

## Gulp Tasks

  Each gulp task is an asynchronous JavaScript function. Tasks can be considered public or private.

  Public task:
    exported from your gulpfile,which allows then to be run by the gulp command.

  Private task
    made to be used internally,usually used as part of series() or parallel() composition.
```js
// gulpfile.js
const {series} = require('gulp')
/*
The clean function is not exported so it can be considered a privated task.
It can still be used within the `series()` composition
*/
function clean(cb){
  cb()
}
/*
The build function is exported so it is public and can be run with the gulp command
It can also be used within the series() composition
*/
function build(cb){
  cb()
}
exports.build = build;
exports.default = series(clean, build);
```

