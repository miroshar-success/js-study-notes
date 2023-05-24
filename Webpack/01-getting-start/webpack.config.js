const path = require('path')
/*
1. npm install webpack webpack-cli --save-dev  安装webpack和webpack-cli

2. npx webpack 会将脚本src/index.js 作为入口起点。生成 dist/main.js

3. mode: development/production/node
*/
/* module.exports = {
  mode:'none',
  entry:path.join(__dirname,'src/index.js'),
  output:{
    filename:'index.js',
    path:path.join(__dirname,'dist')
  }
} */

module.exports = {
  mode: 'none',
  entry: {
    pageOne: path.resolve(__dirname, 'src/page-one.js'),
    pageTwo: path.resolve(__dirname, 'src/page-two.js'),
    pageThree: path.resolve(__dirname, 'src/page-three.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  }
}
