// ---------------------- 组合模式 -------------------------
const MacroCommand = function() {
  return {
    commandList: [],
    add: function (command) {
      this.commandList.push(command)
    },
    execute: function () {
      // 此command 既是 当前函数返回的 command 对象, 也是 一个一个具体要执行的命令
      for (let i = 0, command; command = this.commandList[i++];) {
        if (typeof command.execute === 'function') {
          command.execute()
        }
      }
    }
  }
}

const openAcCommand = {
  execute: function () {
    console.log('打开空调')
  }
}
const openTvCommand = {
  execute: function () {
    console.log('打开电视')
  }
}
const openRadioCommand = {
  execute: function () {
    console.log('打开收音机')
  }
}
const macroCommand1 = MacroCommand()
macroCommand1.add(openAcCommand)
macroCommand1.add(openTvCommand)
macroCommand1.add(openRadioCommand)

// 另一个命令组
const closeDoorCommand = {
  execute: function () {
    console.log('关门')
  }
}
const openComputerCommand = {
  execute: function () {
    console.log('打开电脑')
  }
}
const openQQCommand = {
  execute: function () {
    console.log('登录QQ')
  }
}
const macroCommand2 = MacroCommand()
macroCommand2.add(closeDoorCommand)
macroCommand2.add(openComputerCommand)
macroCommand2.add(openQQCommand)

// --------- 超级宏命令 -----------
const superMacroCommand = MacroCommand()
superMacroCommand.add(macroCommand2)
superMacroCommand.add(macroCommand1)


superMacroCommand.execute()

// -------------------------- 组合模式的例子 (扫描文件夹) ---------------------------------
const Folder = function (name) {
  this.name = name
  this.files = []
}
Folder.prototype.add = function (file) {
  this.files.push(file)
}
Folder.prototype.scan = function () {
  console.log('开始扫描文件夹:', this.name)
  for (let i = 0, length = this.files.length; i < length; i++) {
    const file = this.files[i]
    file.scan()
  }
}

const File = function (name) {
  this.name = name;
}
File.prototype.add = function () {
  throw new Error ('文件下无法再添加文件')
}
File.prototype.scan = function () {
  console.log('开始扫描文件:', this.name)
}

const folder_1 = new Folder('前端学习资料')
const file_1 = new File('深入Vue.js')
const file_2 = new File('深入浅出React')
const file_3 = new File('Node.js')
folder_1.add(file_1)
folder_1.add(file_2)
folder_1.add(file_3)

const folder_2 = new Folder('四大名著')
const file_a = new File('西游记')
const file_b = new File('红楼梦')
const file_c = new File('水浒')
const file_d = new File('三国')

const list = [file_a, file_b, file_c, file_d]
list.forEach(file => {
  folder_2.add(file)
})

folder_1.add(folder_2)
console.log('----------------------------------')
folder_1.scan()


// ------------------- 引用父对象 -----------------------
;(function () {
  function remove (context) {
    if (context.parent == null) return
    for (let i = context.parent.files.length; i >= 0; i--) {
      const item = context.parent.files[i]
      if (item === context) {
        context.parent.files.splice(i, 1)
      }
    }
  }
  const Folder = function (name) {
    this.name = name
    this.parent = null
    this.files = []
  }
  Folder.prototype.add = function (file) {
    this.files.push(file)
    file.parent = this
  }
  Folder.prototype.scan = function () {
    console.log('开始扫描文件夹: -----', this.name)
    for (let i = 0, length = this.files.length; i < length; i++) {
      const file = this.files[i]
      file.scan()
    }
  }
  // 删除文件夹
  Folder.prototype.remove = function () {
    remove(this)
  }
  // ----------- 文件类 -------------
  const File = function (name) {
    this.name = name
    this.parent = null
  }
  File.prototype.scan = function () {
    console.log('开始扫描文件--------', this.name)
  }
  File.prototype.remove = function () {
    remove(this)
  }
  const folder = new Folder('学习资料')
  const js_folder = new Folder('javascript')
  js_folder.add(new File('深入浅出Node.js'))
  js_folder.add(new File('深入浅出React和Redux'))
  js_folder.add(new File('图解HTTP'))
  folder.add(js_folder)
  folder.scan()
  js_folder.remove()  // 移除
  folder.scan()
})()