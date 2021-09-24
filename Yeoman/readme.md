# Installing yo and some generators
```js
npm install -g yo
```
  Generators are npm packages named generator-XYZ.
  for example To install the webapp generator:
```js
npm install -g generator-webapp
```
  We will use generator-webapp in our examples below ,Replace webapp with the name of your generator
  for the same result.
```js
yo webapp
```
  Easily access a generator's home page by running:
```js
npm home generator-webapp
```
  Yo else provide the following commands:
```js
yo --help // access the full help screen
yo --generators // list every installed generators
yo --version  // get the version
```

## 接收用户输入
```js
prompting() {
  return this.prompt([
    {
      type:'input',
      name:'name',
      message:'Your project name',
      default: this.appname
    }
  ]).then(answers => {
    this.answers = answers
  })
}
```



