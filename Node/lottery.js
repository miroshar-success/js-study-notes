const list = [
  [ 2, 3, 22, 26, 31 ],   [ 2, 19, 22, 25, 35 ],
  [ 5, 10, 13, 22, 28 ],  [ 2, 24, 25, 26, 34 ],
  [ 4, 14, 15, 32, 33 ],  [ 3, 6, 10, 15, 23 ],
  [ 2, 3, 23, 28, 35 ],   [ 1, 7, 17, 23, 35 ],
  [ 9, 15, 19, 25, 29 ],  [ 1, 12, 13, 15, 30 ],
  [ 11, 18, 21, 25, 32 ], [ 2, 6, 21, 25, 28 ],
  [ 4, 12, 13, 17, 18 ],  [ 5, 17, 30, 34, 35 ],
  [ 5, 10, 11, 16, 19 ],  [ 2, 3, 18, 20, 27 ],
  [ 7, 10, 19, 26, 32 ],  [ 10, 17, 30, 31, 34 ],
  [ 5, 10, 19, 31, 32 ],  [ 4, 26, 27, 30, 33 ],
  [ 2, 9, 17, 26, 32 ],   [ 3, 11, 19, 25, 27 ],
  [ 11, 16, 31, 33, 35 ], [ 4, 10, 21, 28, 31 ],
  [ 4, 6, 10, 24, 28 ],   [ 1, 8, 10, 20, 35 ],
  [ 1, 20, 21, 31, 33 ],  [ 1, 20, 24, 25, 31 ],
  [ 2, 11, 20, 22, 34 ],  [ 1, 4, 12, 23, 29 ],
  [ 7, 11, 14, 21, 29 ],  [ 3, 4, 7, 12, 19 ],
  [ 5, 8, 22, 25, 35 ],   [ 16, 19, 24, 27, 33 ],
  [ 5, 13, 22, 28, 29 ],  [ 1, 3, 6, 11, 13 ],
  [ 7, 18, 25, 27, 33 ],  [ 10, 19, 20, 23, 31 ],
  [ 2, 4, 6, 7, 8 ],      [ 1, 5, 14, 20, 30 ],
  [ 8, 12, 16, 21, 32 ],  [ 3, 5, 13, 19, 25 ],
  [ 1, 8, 9, 21, 22 ],    [ 16, 17, 21, 28, 32 ],
  [ 7, 9, 19, 28, 29 ],   [ 4, 7, 13, 26, 28 ],
  [ 5, 9, 24, 29, 35 ],   [ 2, 13, 16, 18, 23 ],
  [ 6, 12, 16, 19, 31 ]
]

const run = () => {
  const LENGTH = 5;
  const result = []
  for (let i = 0, length = Math.floor(list.length / LENGTH); i <= length; i++) {
    const data = list.slice(i * LENGTH, (i + 1) * LENGTH);
    const temp = []
    const list_1 = [],
          list_2 = [],
          list_3 = [],
          list_4 = [],
          list_5 = [],
          list_6 = [],
          list_7 = [];
    for (const item of data) {
      for (let j = 0, length = item.length; j < length; j++) {
        const number = item[j]
        if ( number >= 1 && number <= 5) {
          list_1.push(number)
        }
        if ( number >= 6 && number <= 10) {
          list_2.push(number)
        }
        if ( number >= 11 && number <= 15) {
          list_3.push(number)
        }
        if ( number >= 16 && number <= 20) {
          list_4.push(number)
        }
        if ( number >= 21 && number <= 25) {
          list_5.push(number)
        }
        if ( number >= 26 && number <= 30) {
          list_6.push(number)
        }
        if ( number >= 31 && number <= 35) {
          list_7.push(number)
        }
      }
    }
    temp.push(
      list_1.length,
      list_2.length,
      list_3.length,
      list_4.length,
      list_5.length,
      list_6.length,
      list_7.length
    )
    result.push([...temp])
  }
  const flat = []
  for (let i = 0; i < 7; i++) {
    const t = []
    for (const item of result) {
      t.push(item[i])
    }
    flat.push(t)
  }
  // 按每5组数计算出现个数
  // 计算每个号码出现次数
  const map = {}
  const set = new Set()
  const all_number = []
  for (let i = 1; i <= 35; i++) {
    all_number.push(i)
  }
  const missing_list = []
  for (const item of list.slice(30, 50)) {
    for (const number of item) {
      if (!map[number]) {
        map[number] = 1
      } else {
        map[number] = map[number] + 1
      }
      set.add(number)
    }
  }
  all_number.forEach(number => {
    if (!set.has(number)) {
      missing_list.push(number)
    }
  })
  // 冷温热号码
  const list_map = {}
  for (const key in map) {
    const value = map[key]
    if (!list_map[value]) {
      list_map[value] = [key]
    } else {
      list_map[value].push(key)
    }
  }
  return {
    flat,
    list_map,
    missing_list
  }
}

const { flat, list_map, missing_list } = run()
console.log(flat, list_map, missing_list)