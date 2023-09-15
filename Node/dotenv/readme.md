# Dotenv

Dotenv is a zero-dependency module that loads environment variables from a **.env** file
into process.env. Storing configuration in the environment separate from code

## Install

```js
npm install dotenv --save
```

## Usage

create a **.env** file in the root of your project (在文件夹中创建一个.env 后缀的文件)

```js
// .env
SECRET_KEY = "hello world";

require("dotenv").config();
// process.env now has the keys and values you defined in your .env file
console.log(process.env.SECRET_ENV); // hello world
```

Dotenv exposes four functions:

1. config
2. parse
3. populate
4. decrypt

## Config

**config** will read your **.env** file, parse the contents, assign it to **process.env**, and return an
Object with a **parsed** key containing the loaded content or an **error** key if it failed.

```js
// .env
SECRET_ENV = "hello world";

// index.js
const dotenv = require("env");
const result = dotenv.config();
console.log(result);
/**
 * {
 *    parsed: {
 *      SECRET_ENV: 'hello world'
 *    }
 * }
 */
```

## Parsing

It accepts a _String_ or _Buffer_ and will return an _Object_ with the parsed keys and values.

```js
const dotenv = require("dotenv");
const buf = Buffer.from("BASIC=basic");
console.log(dotenv.parse(buf)); // { BASIC: 'basic' }
```

## Populate

It accepts a target, a source, and options, This is useful for power users who want to supply their
own objects.

```js
const dotenv = require("dotenv");
const parsed = { HELLO: "world" };

dotenv.populate(process.env, parsed);
console.log(process.env.HELLO); // world
```

# FAQ

## Should I commit my **.env** file?

No, We strongly recommend against committing your **.env** file to your version control. It should
only include environment-specific values such as database passwords or API keys.
