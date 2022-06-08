const { test_flower } = require('../../src/array/flower.ts')

test('test flower 1', () => {
  expect(test_flower([0,0,1,0,1,0], 1)).toBe(true)
  expect(test_flower([1,0,0,1,0,0,1], 2)).toBe(false)
  expect(test_flower([1,0,0,1,0,0,1], 0)).toBe(true)
})
