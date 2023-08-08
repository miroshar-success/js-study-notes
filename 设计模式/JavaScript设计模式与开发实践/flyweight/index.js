// ------------------ 享元模式 -----------------------
(function () {
  const Model = function (sex) {
    this.sex = sex
  }
  Model.prototype.takePhoto = function () {
    console.log(`sex= ${this.sex}, underwear= ${this.underwear}`)
  }
  const maleModel = new Model('male')
  const femaleModel = new Model('female')
  for (let i = 1; i <= 50; i++) {
    // 外部状态在必要时被传入共享对象来组成一个完整的对象
    maleModel.underwear = `underwear-${i}`;
    maleModel.takePhoto()
  }
  for (let i = 1; i <= 50; i++) {
    femaleModel.underwear = `underwear-${i}`;
    femaleModel.takePhoto()
  }
})();

(function () {
  const Upload = function (fileName, fileSize) {
    this.fileName = fileName
    this.fileSize = fileSize
  }
  Upload.prototype.init = function (id) {
    this.id = id
    this.dom = document.createElement('div')
    this.dom.style.cssText = 'font-size:14px; padding: 3px 0;'
    this.dom.innerHTML = `
      <span>文件名: ${this.fileName}</span>
      <span>文件大小: ${this.fileSize}</span>
      <button class='del_btn'>删除</button>
    `;
    this.dom.querySelector('.del_btn').onclick = () => {
      this.delFile()
    }
    document.body.appendChild(this.dom)
  }
  Upload.prototype.delFile = function () {
    if (this.fileSize < 300) {
      return this.dom.parentNode.removeChild(this.dom)
    } else {
      const confirm = window.confirm(`确认要删除文件 ${this.fileName}吗?`)
      if (!confirm) return
      return this.dom.parentNode.removeChild(this.dom)
    }
  }
  const btn = document.querySelector('.select-file-btn')
  let idx = 0
  btn.onclick = function () {
    let select = document.createElement('input')
    select.setAttribute('multiple', true)
    select.setAttribute('type', 'file')
    select.addEventListener('change', (e) => {
      const files = e.target.files || [];
      console.time('s')
      for (const file of files) {
        const obj = new Upload(file.name, file.size)
        obj.init(idx++)
      }
      console.timeEnd('s')
    }, false)
    select.click()
    select = null
  }
})();

// --------------- 使用享元模式 -------------------
(function () {
  const Upload = function (uploadType = 'html5') {
    this.uploadType = uploadType
  }
  const UploadFactory = (function () {
    const createdFlyWeightObject = {}
    return {
      create: function (uploadType = 'html5') {
        if (createdFlyWeightObject[uploadType]) return createdFlyWeightObject[uploadType]
        return createdFlyWeightObject[uploadType] = new Upload()
      }
    }
  })();
  const uploadManager = (function () {
    const uploadDatabase = {}
    return {
      add: function (id, fileName, fileSize) {
        const obj = UploadFactory.create()
        const dom = document.createElement('div')
        dom.innetHTML = `
          <span>文件名: ${fileName}</span>
          <span>文件大小: ${fileSize}</span>
          <button>删除</button>
        `;
        document.body.appendChild(dom)
        uploadDatabase[id] = {
          fileName,
          fileSize,
          dom
        }
        return obj
      }
    }
  })();
})();

const toolTipFactory = (function () {
  const toolTip = []
  return {
    create: function () {
      if (toolTip.length === 0) {
        const div = document.createElement('div')
        div.classList.add('a')
        document.body.appendChild(div)
        return div
      } else {
        return toolTip.shift()
      }
    },
    recover: function (toolTipDOM) {
      return toolTip.push(toolTipDOM)
    }
  }
})();
const toolTip = [];
(['A', 'B', 'C']).forEach(item => {
  const tool = toolTipFactory.create()
  tool.innerText = item
  toolTip.push(tool)
})
toolTip.forEach(item => {
  toolTipFactory.recover(item)
});

(['E', 'F', 'G', 'H']).forEach(item => {
  const tool = toolTipFactory.create()
  tool.innerText = item
})