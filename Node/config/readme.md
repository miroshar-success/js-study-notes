# Config

Node-config organizes hierarchical configurations for your app deployments.It lets you define a set of default parameters, and extend them for different deployment environments.
(允许你这是一系列参数 并在不同的部署环境时 扩展它们)

## Usage

```js
// app.js
const config = require("config");
const dbConfig = config.get("Customer.dbConfig");

// config/default.json
{
  "Customer": {
    "dbConfig": {
      "host": "localhost",
      "port": 5984,
      "dbName": "customers"
    },
    "credit": {
      "initialLimit": 100,
      "initialDays": 1
    }
  }
}
```

Node-config reads configuration files in the _./config_ directory for the running process, typically the application root.

If a configuration file does not contain a value for a given property, **get()** will throw an exception.
(如果传递给 get 的属性不存在 会抛出异常, 也不能给 get 传递 undefined 或者 null)

Note that **null** is an acceptable value, and will not throw an exception when it would be returned by **get()**
属性值为 null 的时候 不会抛出异常。

## Testing for config values

If you want to see if a config value exists, use the **has()** method

```ts
// 判断某个属性值是否存在
if (config.has("username")) {
}
```

**has()** will not throw an exception if the parameter passed **null** or **undefined**
but will simply return **false**.

## Environment Variables

```js
// 在命令行设置环境变量
export NODE_ENV=production
node index.js

// setting in JavaScript before the first load of node-config
process.env.NODE_ENV = 'production'
```

获取当前的环境变量

```js
const config = require("config");
console.log("environment variable:", config.util.getEnv("NODE_ENV"));

// ---- 获取配置文件目录 ----
config.util.getEnv("NODE_CONFIG_DIR");

// --- hostname (this variable contains the name of your host server) ----
config.util.getEnv("HOSTNAME");
```
