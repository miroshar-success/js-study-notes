const calculateBonus = function(performanceLevel,salary){
	if(performanceLevel == 'A'){
		return salary * 4;
	}
	if(performanceLevel == "B"){
		return salary * 3;
	}
	if(performanceLevel == 'C'){
		return salary * 2;
	}
}
let salary_a = calculateBonus('A',2000);
let salary_b = calculateBonus('B',2000);
let salary_c = calculateBonus('C',2000);
console.log(salary_a,salary_b,salary_c);


// 将不同奖金绩效的算法 封装到更小到函数里
function performanceA(salary){
	return salary * 4;
}
function performanceB(salary){
	return salary * 3;
}
function performanceC(salary){
	return salary * 2;
}

function calc(performanceLevel,salary){
	if(performanceLevel == 'A'){
		return performanceA(salary);
	}
	if(performanceLevel == 'B'){
		return performanceB(salary);
	}
	if(performanceLevel == 'C'){
		return performanceC(salary);
	}
}
let s1 = calc('A',4000);
let s2 = calc('B',4000);
let s3 = calc('C',4000);
console.log(s1,s2,s3);
