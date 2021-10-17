// function defaultTask(cb){
//   console.log('hello world')
//   cb()
// }

// exports.default = defaultTask;
// const {series} = require('gulp')

// // GET START
// function clean(cb){
//   console.log('clean-task...')
//   cb()
// }
// function build(cb){
//   console.log('build-task...')
//   cb()
// }

// exports.build = build;
// exports.default = series(clean,build)


// ------------------------------------------------- parallel series
// const {parallel, series} = require('gulp')

// function clean(cb){
//   console.log('clean')
//   cb()
// }
// function javascript(cb){
//   console.log('javascript')
//   cb()
// }
// function css(cb){
//   console.log('css')
//   cb()
// }

// exports.default = series(clean, javascript)
// exports.default = parallel(clean,javascript)
// exports.default = series(clean, parallel(css,javascript))

// function task1(cb){
//   setTimeout(() => {
//     console.log('task1')
//     cb()
//   },1000)
// }
// function task2(cb){
//   setTimeout(() => {
//     console.log('task2')
//     cb()
//   },1000)
// }
// function task3(cb){
//   setTimeout(() => {
//     console.log('task3')
//     cb()
//   },1000)
// }
// exports.foo = series(task1,task2,task3)
// exports.bar = parallel(task1,task2,task3)


// ----------------------------------------------- 读取 压缩 写入css文件
// const fs = require('fs')
// const path = require('path')
// const { join } = require('path')
// const {Transform} = require('stream')


// function mini_css () {
//   const read = fs.createReadStream(path.join(__dirname,'css/style.css'))
//   const write = fs.createWriteStream(path.join(__dirname,'css/normalize.mini.css'))
//   const transform = new Transform({
//     transform:(chunk,encoding, callback) => {
//       const input = chunk.toString();
//       const output = input.replace(/\s+/g,'').replace(/\/\*.+?\*\//g,'');
//       callback(null,output)
//     }
//   })
//   read.pipe(transform).pipe(write)
//   return read
// }

// exports.default = mini_css



// --------------------- return a stream
// const {src, dest} = require('gulp')
// const { EventEmitter } = require('events');
// function streamTask() {
//   return src('css/*.css').pipe(dest('dist'))
// }
// function promiseTask(){
//   return Promise.resolve('the value is ignored')
// }

// function eventTask() {
//   const emitter = new EventEmitter()
//   setTimeout(() => {
//     emitter.emit('finished')
//   },250)
//   return emitter;
// }

// exports.default = eventTask


// ----------------------------------------------- src() dest()
// const {src, dest} = require('gulp')
// const rename = require('gulp-rename')
// const clean = require('gulp-clean-css')

// exports.default = function() {
//   return src('style/*.css')
//   .pipe(clean())
//   .pipe(rename({extname:'.mini.css'}))
//   .pipe(
//     dest('output')
//   )
// }


// -------------------------------------plugin  gulpfile.js
// const {src, dest,parallel, series} = require('gulp')
// const uglify = require('gulp-uglify')
// const rename = require('gulp-rename')
// const clean_css = require('gulp-clean-css')
// const del = require('del')

// function clean() {
//   return del(['dist'])
// }

// function javascript() {
//   return src('src/js/*.js', {base:'src'})
//   .pipe(uglify())
//   .pipe(rename({extname:'.min.js'}))
//   .pipe(dest('dist'))
// }

// function css() {
//   return src('src/style/*.css', {base:'src'})
//   .pipe(clean_css())
//   .pipe(rename({extname:'.min.css'}))
//   .pipe(dest('dist'))
// }

// const compiler = series(clean ,parallel(javascript,css))

// exports.default =  compiler



// ---------------------------------------------------- practice
const {src ,dest, series, parallel, watch } = require('gulp')
const clean_css = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-image')
const del = require('del')
const rename = require('gulp-rename')
const browserSync = require('browser-sync')

const bs = browserSync.create()

function clean() {
  return del(['dist'])
}

function javascript() {
  return src('src/js/*.js',{base:'src'})
  .pipe(uglify())
  .pipe(rename({extname:'.min.js'}))
  .pipe(dest('dist'))
}

function css() {
  return src('src/css/*.css', {base:'src'})
  .pipe(clean_css())
  .pipe(rename({extname:'.min.css'}))
  .pipe(dest('dist'))
}

function page() {
  return src('src/*.html',{base:'src'})
  .pipe(dest('dist'))
}

function image() {
  return src('src/image/*.jpeg',{base:'src'})
  .pipe(imagemin())
  .pipe(dest('dist'))
}

const serve = function() {
  watch('src/css/*.css', css),
  watch('src/js/*.js',javascript),
  watch('src/index.html',page),
  bs.init({
    notify:false,
    files:'dist/**',
    server:{
      baseDir:'dist'
    }
  })
}
// ----------- watch
const compiler = series(clean, parallel(javascript, css, page, image))
// exports.default = compiler;
module.exports = {
  compiler,
  serve
}
