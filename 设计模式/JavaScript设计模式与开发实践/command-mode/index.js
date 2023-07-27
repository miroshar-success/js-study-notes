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