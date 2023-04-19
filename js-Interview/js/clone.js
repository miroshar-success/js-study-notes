// 拷贝
const deep_clone = (object) => {
  if (typeof object !== 'object' || object === null) return object
  const temp = Array.isArray(object) ? [] : {}
  for (const key in object) {
    const val = object[key]
    if (typeof val !== 'object' || val === null) {
      temp[key] = object[key]
    } else {
      temp[key] = deep_clone(val)
    }
  }
  return temp
}

const player_kyrie = {
  firstName: 'kyrie',
  lastName: 'irving',
  age: 30,
  team: ['骑士', '凯尔特人', '篮网', '独行侠']
}

const player_lebron = deep_clone(player_kyrie)
player_lebron.firstName = 'lebron'
player_lebron.lastName = 'james'
player_lebron.age = 38
player_lebron.team[1] = '热火'
player_lebron.team[2] = '骑士'
player_lebron.team[3] = '湖人'
console.log(player_lebron, player_kyrie)