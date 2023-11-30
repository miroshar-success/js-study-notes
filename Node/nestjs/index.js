// 控制反转 依赖注入
class Student {
  constructor(name, phone) {
    this.name = name
    this.phone = phone
  }
  play() {
    this.phone.play(this.name)
  }
  setName(name) {
    this.name = name
  }
}

class IPhone {
  play(name) {
    console.log(`${name} use iPhone play games`)
  }
}

class Android {
  play(name) {
    console.log(`${name} use android play games`)
  }
}

const student1 = new Student('kyrie', new IPhone())
const student2 = new Student('james', new Android())

student1.play()
student2.play()

student1.setName('wade')
student1.play()
