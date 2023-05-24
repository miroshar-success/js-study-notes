const { merge, mergeWithCustomize } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const path = require('path')

module.exports = () => merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: '3001',
    host: '0.0.0.0',
    static: path.resolve(__dirname, 'dist'),
    hot: true,
  }
})

/**
 * merge is the core, and the most important idea, of the API, Ofen this is all you need unless you
 * want further contomization
 * 
*/
const object1 = {
  firstName: 'kyrie'
}
const object2 = {
  lastName: 'irving'
}
const object3 = {
  age: 32
}
console.log(merge(object1, object2, object3))
// { firstName: 'kyrie', lastName: 'irving', age: 32 }

console.log(merge(
  { fruit: "apple", color: "red" },
  { fruit: "strawberries" }
))
// { fruit: 'strawberries', color: 'red' }

console.log(mergeWithCustomize({
  customizeArray(a, b, key) {
    console.log('a',a, b, key)
  },
  customizeObject(a, b, key) {
    if (key === 'player') {
      // return merge(b, a)
      return merge(a, b)
    }
  }
})({
  player: {
    firstName: 'kyrie',
    lastName: 'irving',
    age: 30
  }
}, {
  player: {
    firstName: 'lebron',
    lastName: 'james',
    age: 38
  },
  players: ['kyrie', 'wade', 'durant']
}))
/**
{
  player: { firstName: 'kyrie', lastName: 'irving', age: 30 },
  players: [ 'kyrie', 'wade', 'durant' ]
}
 * 
*/