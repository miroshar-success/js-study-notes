const jwt = require('jsonwebtoken')

const j1 = jwt.sign({ name: 'kyrie' }, 'secret')
console.log(j1)
/**
 * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia3lyaWUiLCJpYXQiOjE2OTkwNjE0OTF9.RbiLT_e2_YMbNHs_XalZH9MtuwM6svFKejw708uKKnE
*/

const j2 = jwt.sign('hello', 'secret')
console.log(j2) // eyJhbGciOiJIUzI1NiJ9.aGVsbG8.UYmO_lPAY5V0Wf4KZsfhiYs1SxqXPhxvjuYqellDV5A

jwt.sign('world', 'secret', function (err, data) {
  console.log('data', data)
  // eyJhbGciOiJIUzI1NiJ9.d29ybGQ.bKID0bXmg-bZYseqC3fiu24OvHvIz5RYTSsvsVN-9YI
})

// ----------------- options -----------------
// iat
const older_token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');
console.log('token', older_token)


const j5 = jwt.sign({
  sub: 'hello',
  expiresIn: 100
}, 'hello')
console.log('j5', j5);

/**
 * A JSON numeric value representing the number of seconds from 1970-01-01T00:00:00
*/
const j6 = jwt.sign({
  exp: Math.floor(Date.now() / 1000) + (60 * 60),
  data: 'foobar'
}, 'secret')
console.log(j6)


console.log(jwt.verify(j6, 'secret'))
// { exp: 1699106809, data: 'foobar', iat: 1699103209 }

jwt.verify(j1, 'secret', (err, data) => {
  console.log(err, data)
})