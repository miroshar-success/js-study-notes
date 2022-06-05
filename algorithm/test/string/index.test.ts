const { reverse_string } = require('../../src/string/index.ts')

test('adds reverse_string ', () => {
  expect(reverse_string('Hello World!')).toBe('olleH !dlroW')
  expect(reverse_string('This is a function')).toBe('sihT si a noitcnuf')
})

test('test reverse_string empty string', () => {
  expect(reverse_string('')).toBe('')
})
