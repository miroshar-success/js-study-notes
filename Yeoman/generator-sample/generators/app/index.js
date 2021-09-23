// 此文件作为Generator的核心人口 需要导出一个继承自Yeoman Generator的类型
const Generator = require('yeoman-generator')
module.exports = class extends Generator {
  writing() {
    // this.fs.write(
    //   this.destinationPath('text.txt'), // 文件路径
    //   Math.random().toString()  // 写入内容
    // )
    // 模版文件路径
    const tmpl = this.templatePath('hello-world.txt')
    // 输出路径
    const output = this.destinationPath('foo.txt')
    const context = {title: 'hello world'}
    this.fs.copyTpl(tmpl, output, context)
  }
}
/*
执行 npm link 把模块链接到全局范围
yo sample // 生成了一个text.txt文件
*/
