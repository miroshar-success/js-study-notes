// 设计原则 SOLID
// 1. 职责单一原则  2. 开放封闭原则 3. 接口独立原则
function loadImage(src) {
  return new Promise((resolve,reject) => {
    const img = document.createElement('img')
    img.onload = function() {
      resolve(img)
    }
    img.onerror = function() {
      reject('error')
    }
    img.src = src
  })
}


// ------------------- 停车场 --------------------
class Camera {
  shot(car) {
    return {
      number: car.number,
      in: new Date().getTime()
    }
  }
}

class Screen {
  show(car, inTime) {
    console.log(`车牌号 ${car.number}, 停车时间 ${new Date().getTime() - inTime}`)
  }
}

class Park {
  constructor(floors) {
    this.floors = floors || []
    this.camera = new Camera()  // 进停车场
    this.screen = new Screen()  // 出停车场
    this.carList = {}
  }
  in(car) {
    const info = this.camera.shot(car) // 存储车牌号和进入都时间
    // 找一个车位
    let flag = false
    for(let i = 0, length = this.floors.length; i < length; i++) {
      for(let j = 0, j < this.floors[i]['places'].length; j++) {
        const place = this.floors[i]['places'][j]
        if(place.empty) {
          info.floors = i;
          info.place = j
          info.place = place; // 存储都
          place.in()
          flag = true;
          break;
        }
      }
      if(flag) break;
    }
    if(!flag) {
      console.log('车位都停满了')
      return
    }
    console.log(this.emptyPlace())
    this.carList[car.number] = info
  }
  out(car) {
    const _car = this.carList[car.number]
    this.screen(_car, _car.in)  // 显示时间
    Reflect.deleteProperty(this.carList, car.number)  // 清空车牌存储都信息
    _car.place.out() // 重置empty属性
    console.log(this.emptyPlace())
  }
  // 停车场空余车位
  emptyPlace() {
    return this.floors.map(floor => {
      return `第${floor.index}层车位 还有 ${floor.emptyPlace()} 个车位`;
    }).join('\n')
  }
}

class Car {
  constructor(number) {
    this.number = number  // 车牌
  }
}

class Floor {
  constructor(index, places) {
    this.index = index  // 第几层车位
    this.places = places || []
  }
  emptyPlace() {
    let sum = 0
    this.places.forEach(place => {
      if(place.empty) {
        this.sum += 1
      }
    })
    return sum
  }
}

class Place {
  constructor() {
    this.empty = true
  }
  in() {
    this.empty = false
  }
  out(){
    this.empty = true
  }
}
const floors = []
for(let i = 0; i < 3; i++) {
  const places = []
  for(let j = 0; j < 100; j++) {
    const place = new Place()
    places.push(place)
  }
  const floor = new Floor(i+1, places);
  floors.push(floor)
}


const part = new Park(floors)
