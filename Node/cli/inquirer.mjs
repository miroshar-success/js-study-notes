// inquirer包的使用
import inquirer from 'inquirer';

const type_list = [
  'input',
  'number',
  'confirm',
  // 'list',
  'rawlist',
  'expand',
  'checkbox',
  'password',
  'editor'
]

const list = type_list.map(type => ({
  type,
  name: `${type}`,
  message: `${type} - message`
}))

// inquirer.prompt([
/*   {
    type: 'input',
    name: 'username',
    message: '你的名字'
  },
  {
    type: 'input',
    name: 'password',
    message: '请输入密码'
  } */
/*   {
    type: 'number',
    name: 'age',
    message: function(arg) {
      console.log(arg)
      return 'hello world'
    }
  },
  {
    type: 'confirm',
    name: 'confirm',
    message: 'confirm - message'
  },
  {
    type: 'input',
    name: 'choice',
    choices: [1, 2, 3, 4, 5]
  } */
/*   {
    type: 'rawlist',
    name: 'framework',
    choices: ['Angular', 'Vue', 'React'],
    choices: [
      {
        name: 'Angular',
        value: 'a'
      },
      {
        name: 'Vue',
        value: 'v'
      },
      {
        name: 'React',
        value: 'r'
      }
    ],
    default: 'r',
    message: 'Please select a framework'
  },
  {
    type: 'number',
    name: 'age',
    message: 'age',
    validate: function(input) {
      if (/\d+/.test(input)) {
        return true
      }
      return 'You need to provide a number'
    }
  } */
/*   {
    type: 'checkbox',
    choices: ['apple', 'banana', 'grape', 'pineapple', 'orange'],
    choices: [
      {
        name: 'apple',
        value: 'apple'
      },
      {
        name: 'banana',
        value: 'banana'
      },
      {
        name: 'grape',
        value: 'grape'
      },
      {
        name: 'orange',
        value: 'orange',
        disabled: true
      }
    ],
    name: 'fruit',
    message: 'please select a fruit'
  } */
/*   {
    type: 'password',
    name: 'password',
    message: 'type your password'
  } */
/*   {
    type: 'editor',
    name: 'editor',
    message: 'hello'
  } */
/*   {
    type: 'expand',
    name: 'expand',
    message: 'expand message',
    choices: [
      {
        name: 'hello',
        value: 'hello',
        key: 'e'
      },
      {
        name: 'world',
        value: 'world',
        key: 'w'
      }
    ]
  } */
/* ]).then((answer) => {
  console.log(answer)
}) */

inquirer.prompt([
  {
    type: 'input',
    name: 'username',
    message: 'username',
    prefix: 'prefix',
    suffix: 'suffix'
  },
  {
    type: 'number',
    name: 'age',
    message: 'your age',
    validate: (age) => {
      if (/\d+/.test(age)) {
        return true
      }
      return 'provide a number'
    }
  },
  {
    type: 'list',
    name: 'front-end-framework',
    choices: ['vue', 'angular', 'react', 'nuxt', 'next'],
    message: 'select a front-end framework'
  },
  {
    type: 'list',
    name: 'back-end-framework',
    choices: ['express', 'koa', 'nestjs'],
    message: 'select a back-end framework'
  },
  {
    type: 'checkbox',
    name: 'editor',
    choices: ['vscode', 'hbuilder', 'webstorm', 'atom', 'edit-plus'],
    message: 'select a code editor'
  },
  {
    type: 'confirm',
    name: 'like',
    message: 'do you like code'
  }
]).then((answers) => {
  console.log(answers)
})