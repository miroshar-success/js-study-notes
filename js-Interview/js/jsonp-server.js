const http = require('http')

const app = http.createServer(function(req, res) {
  const player_list = [
    {
      firstName: 'kyrie',
      lastName: 'irving'
    }
  ]
  const search_array = req.url.substring(req.url.indexOf('?') + 1).split('&')
  const obj = {}
  for (const value of search_array) {
    const [key, val] = value.split('=')
    obj[key] = val
  }
  const fn = obj['callback']
  res.end(`${fn}(${JSON.stringify(player_list)})`)
})

app.listen(3000, () => {
  console.log('app listening at port 3000')
})