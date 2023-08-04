// ---------------------- 命令模式 --------------------
const $ = (selector) => document.querySelector(selector)

const setCommand = function(dom, command) {
  dom.addEventListener('click', () => {
    command.execute()
  }, false)
}

const add_menu = () => {
  console.log('新增子菜单')
}
const refresh_menu = () => {
  console.log('刷新菜单')
}
const del_menu = () => {
  console.log('删除菜单')
}

const MenuBarCommand = function (receiver) {
  this.receiver = receiver
}
MenuBarCommand.prototype.execute = function() {
  if (typeof this.receiver === 'function') {
    this.receiver()
  }
}

setCommand($('.button-1'), new MenuBarCommand(add_menu))
setCommand($('.button-2'), new MenuBarCommand(refresh_menu))
setCommand($('.button-3'), new MenuBarCommand(del_menu))

// ------------------ 支持撤销 -----------------------
;(function () {
  const commands = {
    right: function () {
      console.log('向右移动')
    },
    left: function() {
      console.log('向左移动')
    },
    jump: function() {
      console.log('跳跃')
    },
    crouch: function() {
      console.log('蹲下')
    }
  }
  const makeCommand = function(receiver, state) {
    return function () {
      return receiver[state]()
    }
  }
  const keyCodeCommandMap = {
    38: 'jump',
    40: 'crouch',
    37: 'left',
    39: 'right'
  }
  const commandStack = []
  document.onkeyup = function(e) {
    const keyCode = e.keyCode
    if (!keyCodeCommandMap[keyCode]) return false
    const command = makeCommand(commands, keyCodeCommandMap[keyCode])
    if (command) {
      command()
      commandStack.push(command) 
    }
  }

  const btn = document.querySelector('.reset-btn')
  btn.addEventListener('click', () => {
    let command = commandStack.pop()
    while (command) {
      command()
      command = commandStack.pop()
    }
  }, false)
})();

// ---------------------- 宏命令 ----------------------------
;(function () {
  const closeDoorCommand = {
    execute: function() {
      console.log('关门')
    }
  }
  const openComputerCommand = {
    execute: function() {
      console.log('打开电脑')
    }
  }
  const openQQCommand = {
    execute: function() {
      console.log('登录QQ')
    }
  }
  const MacroCommand = function () {
    return {
      commandList: [],
      add: function (command) {
        this.commandList.push(command)
      },
      execute: function () {
        for (let i = 0, length = this.commandList.length; i < length; i++) {
          const command = this.commandList[i]
          command.execute()
        }
      }
    }
  }
  const macro_command = MacroCommand()
  macro_command.add(closeDoorCommand)
  macro_command.add(openComputerCommand)
  macro_command.add(openQQCommand)
  macro_command.execute()
})()