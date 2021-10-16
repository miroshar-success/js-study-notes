// function defaultTask(cb){
//   console.log('hello world')
//   cb()
// }

// exports.default = defaultTask;
const {series} = require('gulp')

// GET START
function clean(cb){
  console.log('clean-task...')
  cb()
}
function build(cb){
  console.log('build-task...')
  cb()
}

exports.build = build;
exports.default = series(clean,build)
