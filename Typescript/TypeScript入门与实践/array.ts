// ------------ 数组 ------------
const number_array :number[] = [1,2,3,4,5]
const number_string_array: (number | string)[] = [1, 2, '3']

const number_arrays: Array<number> = [1,2,3,4,5]
const number_string_arrays: Array<string|number> = ['a', 1, 2]

const button_elements: HTMLButtonElement[] = []

const object_array: Array<{ x: number; y: number }> = [{ x: 1, y: 2 }]

const element_of_array = number_string_array[2]
console.log(number_array[0])

// --------- 超出数组长度 --------
const out: number = number_array[4]


// -------------- 只读数组 ----------------
const colors: readonly number[] = [255, 0, 0]
const readonly_array: ReadonlyArray<number> = [1, 2, 3]
const another_readonly_array: Readonly<string[]> = ['1', '2', '3']

const readonly_player: Readonly<{ firstName: string; lastName: string}> = {
  firstName: 'kyrie',
  lastName: 'irving'
}


// ---------- 元祖 ----------
const point_array: [number, number] = [0, 0]
const score_array: [string, number] = ['math', 120]

const readonly_tuple_array: readonly [number, string] = [1, '1']
const readonly_tuple: Readonly<[number, string]> = [123, 'chinese']

const score = score_array[1]
const grade = score_array[0]

// console.log(score_array[3])


// --------------- 元祖可选元素 -------------
const optional_tuple_array: [string, number?, boolean?] = ['123']
const optional_tuple_array_1: [string, number?, boolean?] = ['123', 123, false]
const optional_tuple_array_2: [string, number?, boolean?] = ['123', 123]


// ---------- 元祖剩余元素 ---------
const tuple_rest_element: [string, ...number[]] = ['hello', 1, 2, 3]
const tuple_rest_string_element: [number, ...string[]] = [123, 'hello', 'world']


// ------ 元祖的长度 --------
const get_tuple_length = (p: [number, number]): number => p.length
console.log(get_tuple_length([1, 2]))
console.log(get_tuple_length([4, 5]))

const possible_tuple_length: [string, number?, boolean?] = ['123']

const get_possible_tuple_length = (tuple: [string, number?, boolean?]): number => {
  if (tuple.length === 1) return 1
  if (tuple.length === 2) return 2
  if (tuple.length === 3) return 3
  return 0
}