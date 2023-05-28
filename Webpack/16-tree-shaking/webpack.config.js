const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'inline-cheap-source-map',
  entry: {
    app: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    filename: '[name].bundle.js',
    clean: true,
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    static: path.resolve(__dirname, 'dist'),
    compress: true
  }
/*   optimization: {
    usedExports: true
  } */
}
/**
 * tree-shaking 必须使用es2015模块语法, commonjs的代码不行
 * 使用 mode 为 production。
*/

/*#__PURE__*/ // 标记为无副作用