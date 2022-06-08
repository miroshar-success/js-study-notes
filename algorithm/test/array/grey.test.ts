const { grey_code } = require('../../src/array/grey.ts')

test('grey code 2', () => {
  expect(grey_code(2)).toEqual(['00', '01', '11', '10'])
})

test('grey code 3', () => {
  expect(grey_code(3)).toEqual(['000', '001', '011', '010', '110', '111', '101', '100'])
})
