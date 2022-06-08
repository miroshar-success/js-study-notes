const { card_group } = require('../../src/array/card_group.ts')

test('card group', () => {
  expect(card_group([1,2,3,4,4,3,2,1])).toBe(true)
  expect(card_group([1,2,3,4,5,4,3,2])).toBe(false)
  expect(card_group([1,2,2,1,2,2])).toBe(true)
})
