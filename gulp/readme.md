# 1. Gulp

```js
npm install gulp --dev
```

## 1.1. Gulp Tasks

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
### 1.1.1. Compose tasks

  Gulp provides two powerful composition methods, series() and parallel().allowing individual tasks
  to be composed into larger operations.

  series:
    To have your tasks execute in order, use the series() method

  parallel
    For tasks to run at maximum concurrency, combine them with the parallel() method.

## 1.2. Working with File

  The src() and dest() methods are exposed by gulp to interact with files on your computed.

### 1.2.1. src()

  src() is given a glob to read from the file system and produces a Node stream. The stream produced by
  src() should be returned from a task to signal async completion.

### 1.2.2. dest()

  dest() is given an output directory string and also produces a Node stream which is generally used as a
  terminator stream.When it receives a file passed through the pipeline,it writes the contents and other
  details to the filesystem at a given directory.


## Plugins

  Gulp plugins areNode Transform Streams that encapsulate common behavior to transform files in a pipeline 
  - often placed between src() and dest() using the .pipe() method. They can change the filename metadata
  or contents of every file that passes through the stream.
```js
const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

exports.default = function() {
  return src('src/*.js')
    // The gulp-uglify plugin won't update the filename
    .pipe(uglify())
    // So use gulp-rename to change the extension
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('output/'));
}
```
[gulp-load-plugins](https://www.npmjs.com/package/gulp-load-plugins)
[gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
## Watching Files

  The watch() API connects globs to tasks using a file system watcher. It watches for changes to 
  files that match the globs and executes the task when a change occurs.
```js
const { watch, series } = require('gulp');
function clean(cb) {
  // body omitted
  cb();
}
function javascript(cb) {
  // body omitted
  cb();
}
function css(cb) {
  // body omitted
  cb();
}

exports.default = function() {
  // You can use a single task
  watch('src/*.css', css);
  // Or a composed task
  watch('src/*.js', series(clean, javascript));
};
```
