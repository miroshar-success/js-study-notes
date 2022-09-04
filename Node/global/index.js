const path = require('path')

console.log(__filename) // 当前文件路径
console.log(__dirname)  // 当前文件夹路径

// console.log(process.env.__dirname)
// console.log(process.env.__filename)
console.log(process.pid)        // 1442
console.log(process.platform)   // darwin
console.log(process.arch)       // arm64
console.log(process.title)      // node
console.log(process.execPath)   // /usr/local/bin/node


console.log('start')
setTimeout(() => {
  console.log('setTimeout')
}, 0)
console.log(process.cwd())
process.nextTick(() => {
  console.log('nextTick')
})
console.log('end')
/**
 * 1. start
 * 2. /Users/jinkang/Desktop/javascript-study-notes/Node/global
 * 3. end
 * 4. nextTick
 * 5. setTimeout
*/

console.log(process.cwd() === __dirname)  // true

// ----------- path -----------
console.log('-------- path start ---------')
console.log(path.dirname(__dirname))  // /Users/jinkang/Desktop/javascript-study-notes/Node
console.log(path.dirname(__filename)) // /Users/jinkang/Desktop/javascript-study-notes/Node/global
console.log(path.extname(__filename)) // .js
// path.isAbsolute(path) 是否为绝对路径
console.log(path.isAbsolute(path.resolve(__dirname, 'hello.txt')))  // true
console.log(path.isAbsolute(path.join(__dirname, 'hello.txt')))     // true

console.log(path.isAbsolute('/foo/bar'))  // true
console.log(path.isAbsolute('./foo/bar')) // false
console.log(path.isAbsolute('.'))         // false


console.log(path.join('foo', 'bar', 'baz/asdf'))  // foo/bar/baz/asdf
console.log(path.join('foo', 'bar'))              // foo/bar


console.log(path.parse(path.resolve(__dirname)))
/*
{
  root: '/',
  dir: '/Users/jinkang/Desktop/javascript-study-notes/Node',
  base: 'global',
  ext: '',
  name: 'global'
}
*/
console.log(path.parse(path.join(__dirname)))
/*
{
  root: '/',
  dir: '/Users/jinkang/Desktop/javascript-study-notes/Node',
  base: 'global',
  ext: '',
  name: 'global'
}
*/

console.log('resolve-path', path.resolve('/foo/bar', 'baz'))    // /foo/bar/baz
console.log('resolve-path', path.resolve('/foo/bar', './baz'))  // /foo/bar/baz
console.log('resolve-path', path.resolve('/foo/bar', '/baz'))   // /baz

console.log('join-path', path.join('/foo/bar', './baz'))        // /foo/bar/baz
console.log('join-path', path.join('/foo/bar', 'baz'))          // /foo/bar/baz
console.log('join-path', path.join('/foo/bar', '/baz'))         // /foo/bar/baz