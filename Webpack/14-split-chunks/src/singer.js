import _ from 'lodash';
import { sum, multiple } from './math'

const singers = ['周杰伦', '王力宏', '邓紫棋']

console.log(_.each(singers))

console.log(sum(2, 3), multiple(3, 7))