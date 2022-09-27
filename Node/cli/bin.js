#!/usr/bin/env node
/* function run(argv) {
  console.log('argv', argv);
}
run(process.argv.slice(2)); */

// console.log('hello world')
// console.log(process.argv)

/* process.on('beforeExit', code => {
  console.log('process before Exit event with code', code)
})
process.on('exit', (code) => {
  console.log('process exit event with code', code)
})
console.log('hello world');

function print() {
  const argument = process.argv[2]
  switch(argument) {
    case '--version':
      console.log('版本号');
      break;
    case '--help':
      console.log('帮助');
      break;
  }
}
print() */
// program.parse(process.argv)


/* console.log('start')
setTimeout(() => {
  console.log('setTimeout-1')
},0)
Promise.resolve().then(() => {
  console.log('promise-1')
})
process.nextTick(() => {
  console.log('process')
})
setTimeout(() => {
  console.log('setTimeout-2')
},0)
Promise.resolve().then(() => {
  console.log('promise-2')
})
console.log('end') */
/*
1. start
2. end
3. process
4. promise-1
5. promise-2
6. setTimeout-1
7. setTimeout-2
*/

const { program, Option } = require('commander');

/* program
.option('-d --debug', 'output extra debugging')
.option('-s --small', 'small pizza size')
.option('-p --pizza-type <type>', 'flavour of pizza')
.option('-c --color <color>', 'flavour of color', 'red')
.option('--no-sauce', 'remove sauce')
.option('--no-cheese', 'plain with no cheese') */
// 定一个必选项
// .requiredOption('-c --cheese <type>', 'pizza must have cheese')
/* .option('-n --number <numbers...>', 'specify numbers')
.option('-l --letter [letters...]', 'specify letters'); */
// program.version('0.0.1')
// program.parse(process.argv)

/* program
.addOption(new Option('-t --timeout <delay>', 'timeout in seconds').default(60, 'one minute'))
.addOption(new Option('-d --drink <size>', 'drink size').choices(['small', 'medium', 'large']))
.addOption(new Option('-p --port <number>','port number').env('PORT'))
program.parse(process.argv)
 */

// custom
/* const _parseFloat = (value, previous) => {
  console.log(value, previous)
  return value
}
const _parseInt = (value, previous) => {
  console.log(value, previous)
  return value
}

program
.option('-f --float <number>', 'float argument', _parseFloat, 1)
.option('-i --integer <number>', 'integer argument', _parseInt, 2)
.option('-c --collect <value>', 'repeatable value', collect, [])
program.parse(process.argv)
const options = program.opts();
console.log(options) */


// ---- commands ------
/* program
.command('clone <source> [destination]')
.description('clone a repository into a newly created directory')
.action((source, destination) => {
  console.log('clone command called', source, destination)
}) */


/* program
.command('start service>', 'start named service')
.command('stop [service]', 'stop named service, or all if no name supplied') */

/* program
.version('1.0.0')
.argument('<username>', 'user to login')
.argument('[password]', 'password for user, if requred', 'no password given')
.action((username, password) => {
  console.log('username', username)
  console.log('password', password)
}) */

// 传递一个数组
/* program
.version('1.0.0')
.command('rmdir')
.argument('<dirs...>')
.action(function(dirs) {
  dirs.forEach(dir => {
    console.log('rmdir %s', dir)
  })
}) */

// custom argument
/* const _parseInt = (value, previous) => {
  console.log(value, previous)
  return value
}

const _parseFloat = (value, previous) => {
  console.log(value, previous)
  return value
}

program
.command('add')
.argument('<first>', 'integer argument', _parseInt, 'parseInt')
.argument('<second>', 'integer argument', _parseFloat, 'parseFloat')
.action((first, second) => {
  console.log(`${first} - ${second}`)
}) */


// action handler
/* program
.argument('<name>')
.option('-t --title <honorific>', 'title to use before name')
.option('-d --debug', 'display some debugging')
.action((name, options, command) => {
  if (options.debug) {
    console.log(command.name(), options)
    const title = options.title ? `${options.title}` : '';
    console.log(`${title} - ${name}`)
  }
}) */

/* program
.command("duplicate")
.summary("make a copy")
.description(`Make a copy of the current project.
This may require additional disk space.
`); */

// custom help
/* program
.description('An application for pizza ordering')
.option('-p --peppers', 'Add peppers')
.option('-c --cheese <type>', 'Add the specified type of cheese', 'marble') */

// command
/* program
.command('clone <source> [destination]')
.description('clone a repository into a newly created directory')
.action((source, destination) => {
  console.log('clone command called: ', source, destination)
}) */
/* program
.command('clone')
.argument('<source>')
.argument('<destination>')
.description('clone a repository into a newly created directory')
.action((source, destination) => {
  console.log('clone command called: ', source, destination)
}) */

// arguments
/* program
.argument('<username>', 'user to login')
.argument('<password>', 'password')
.action((username, password) => {
  console.log('action:', username, password)
}) */

/* program
.argument('sub-command')
.description('hello, this is a sub-command')
.option('-t --title <title>', 'title to use before name')
.option('-d --debug', 'display some debugging')
.action((name, options, command) => {
  if (options.debug) {
    console.log(command.name(), options)
    const title = options.title ? options.title : ''
    console.log(`title: ${title} ${name}`)
  }
})

program.parse(process.argv)

console.log('options:', program.opts()) */

// program.parse(process.argv)
program
.command('create <project-name>')
.description('create a new vue project')
.action((name) => {
})

program.parse(process.argv)