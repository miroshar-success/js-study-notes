const { lack } = require('../../src/sort/lack.ts')

test('lack number', () => {
  expect(lack([1, 2, 0])).toBe(3)
  expect(lack([3, 4, -1, 1])).toBe(2)
  expect(lack([-1, -2, 5, 2, 3, 1])).toBe(4)
  expect(lack([1,2,3,4,5,6])).toBe(7)
})
