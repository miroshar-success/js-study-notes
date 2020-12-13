var performanceA = function() {}
performanceA.prototype.calculate = function(salary){ return salary * 4}

var performanceB = function() {}
performanceB.prototype.calculate = function(salary){ return salary * 3}

var performanceC = function() {}
performanceC.prototype.calculate = function(salary){ return salary * 2}

const Bonus = function(){
	this.salary = null;
	this.strategy = null;
}
Bonus.prototype.setSalary = function(salary){
	this.salary = salary;
}
Bonus.prototype.setStrategy = function(strategy){
	this.strategy = strategy;
}

Bonus.prototype.getBonus = function(){
	if(!this.strategy){
		throw new Error("为设置strategy属性");
	}
	return this.strategy.calculate(this.salary);
}

var bonus = new Bonus();
bonus.setSalary(1000);
bonus.setStrategy(new performanceA());
let a = bonus.getBonus();
console.log(a)

bonus.setStrategy(new performanceB());
let b = bonus.getBonus();
console.log(b);

bonus.setStrategy(new performanceC());
let c = bonus.getBonus();
console.log(c);


// js版本的策略模式
var strategies = {
	'A' : function(salary){
		return salary * 4
	},
	"B" : function(salary){
		return salary * 3;
	},
	"C" : function(salary){
		return salary * 2
	}
}

var calculateBonus = function(level,salary){
	return strategies[level](salary)
}

let s_1 = calculateBonus('A',2000);
let s_2 = calculateBonus('B',2000);
let s_3 = calculateBonus('C',2000);

console.log(s_1, s_2, s_3);		// 8000	6000 4000