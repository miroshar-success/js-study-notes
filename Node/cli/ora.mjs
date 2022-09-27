import ora from 'ora'
const spinner = ora('Loading...').start()

setTimeout(() => {
  spinner.prefixText = 'I am prefix text';
  spinner.color = 'red'
  // spinner.stop()
  // spinner.succeed('success')
  // spinner.fail('I am fail')
  // spinner.warn('warn message')
  spinner.info('info message')
  // spinner.clear()
}, 3000)

import chalk from 'chalk'

console.log( chalk.blue('Hello World') )

/* const { log } = console;

log(chalk.blue('hello') + chalk.red('world'))
log(chalk.blue.bgRed.bold('Hello world!'))
log(chalk.red('Hello'), chalk.underline.bgBlue('world') + '!')

log(
  `CPU: ${chalk.red('90%')}
  RAM: ${chalk.green('40%')}
  DISK: ${chalk.yellow('70%')}
  `
)
log(chalk.green(
  'I am a green line' + chalk.blue.underline.bold('with a blue substring') + 'that becomes green again'
))

const error = chalk.bold.red;
const warning = chalk.hex('#FFA500')

log(error('This is a error message'))
log(warning('This is a warning message')) */
