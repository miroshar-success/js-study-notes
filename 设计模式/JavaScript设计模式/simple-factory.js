// ------------------- 简单工厂模式 ----------------------
// 1
const Basketball = function() {
  this.info = '篮球盛行于美国'
}
Basketball.prototype.getMember = function() {
  console.log('每队需要5名队员')
}
// 2
const Football = function() {
  this.info = '足球在世界范围内很流行'
}
Football.prototype.getMember = function() {
  console.log('每个队伍需要11名球员')
}
// 3
const Tennis = function() {
  this.info = '每年都很多网球系列赛'
}
Tennis.prototype.getMember = function() {
  console.log('每队需要1名队员');
}

const SportFactory = function(name) {
  switch (name) {
    case 'nba':
      return new Basketball()
    case 'wordCup':
      return new Football()
    case 'frenchOpen':
      return new Tennis()
  }
}

const basketball = SportFactory('nba')
const football = SportFactory('wordCup')
const tennis = SportFactory('frenchOpen')

console.log(basketball, football, tennis)
// Basketball { info: '篮球盛行于美国' }  Football { info: '足球在世界范围内很流行' } Tennis { info: '每年都很多网球系列赛' }
basketball.getMember()
football.getMember()
tennis.getMember()
/**
 *  每队需要5名队员     
    每个队伍需要11名球员
    每队需要1名队员     
 * 
*/