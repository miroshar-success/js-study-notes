// process.env.NODE_ENV = 'production'

/**
 * multiple node instances
*/
process.env.NODE_APP_INSTANCE = 3

const config = require('config')
const dbConfig = config.get('Customer.dbConfig')
// console.log('环境变量:', process.env.NODE_ENV)
console.log(dbConfig)
// 读取的是 config/下 default.json 的 Customer.dbConfig字段
/**
 * { host: 'localhost', port: 5984, dbName: 'customers' }
*/
try {
  console.log(config.get('hello'))
} catch (err) {
  /**
   * Configuration property 'hello' is not defined
  */
  console.log('error122', err)
}

// -------------- 传递null ------------
// console.log(config.get(null))

// --------- 属性值为null --------
console.log(config.get('username')) // null

// -------------- has --------------
console.log(config.has('username')) // true
console.log(config.has('hello'))    // false

console.log('username:', config.get('username'))
console.log('password', config.get('password'))

console.log('NODE_ENV:', config.util.getEnv('NODE_ENV'))

console.log('dir:', config.util.getEnv('NODE_CONFIG_DIR'))

console.log('hostname:', config.util.getEnv('HOSTNAME'))