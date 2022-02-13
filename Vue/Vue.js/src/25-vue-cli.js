#!/usr/bin/env node

/*
item2
oh my zsh 配色方案
commander
inquirer
chalk
clui
child_process
*/

console.log('hello world')

const { program } = require('commander')
const inquirer = require('inquirer')

program.arguments('<dir>')
.description('this is a directory')
.action((dir) => {
  console.log('--dir', dir)
  return inquirer.prompt([
    {
      type:'list',
      name:'framework',
      message:'which framework do you like?',
      choices: [
        'react',
        'vue',
        'angular'
      ]
    }
  ]).then(answer => {
    console.log('result:', answer)
  })
})

program.parse(process.argv)
