import _ from 'lodash'
import { sum, multiple } from './math'
const players = ['kyrie', 'durant', 'james']

console.log(_.each(players))

console.log(sum(1,2), multiple(2, 3))