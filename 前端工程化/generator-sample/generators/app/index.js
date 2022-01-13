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
    const context = this.answers;
    this.fs.copyTpl(tmpl, output, context)

    // 创建一个简易的生成vue基本目录的方式
    const templates = [
      'src/App.vue',
      'src/main.js',
      'src/router.js',
      'src/components/HelloWorld.vue',
      'src/store/index.js',
      'src/store/getters.js',
      'src/store/mutations.js',
      'src/store/state.js',
      'src/views/About.vue',
      'src/views/Home.vue'
    ]
    templates.forEach(item => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        this.answers
      )
    })
  }
  prompting() {
    return this.prompt([
      {
        type:'input',
        name:'name',
        message:'Your project name',
        default: this.appname
      }
    ]).then(answers => {
      this.answers = answers
    })
  }
}
/*
执行 npm link 把模块链接到全局范围
yo sample // 生成了一个text.txt文件
*/
