// 鸭子类型, 只用关心对象的行为,而不用关注对象本身
let duck = {
	duckSinging:function(){
		console.log('123');
	}
}
let chicken = {
	duckSinging:function(){
		console.log('123');
	}
}
let choir = [];

function joinChoir(animal){
	if(animal && typeof animal.duckSinging == 'function'){
		choir.push(animal);
		console.log('加入合唱团');
	}
}
joinChoir(duck)
joinChoir(chicken);
console.log(choir);


// 多态，同一个操作作用于不同对象上可以产生不同的解释
let Duck = function(){}
let Chicken = function(){}

let makeSound = function(animal){
	if(animal instanceof Duck){
		console.log('111');
	}
	if(animal instanceof Chicken){
		console.log('222')
	}
}

makeSound(new Duck());
makeSound(new Chicken());


// 动物发声是不变的,指令是变的,将不变和可变 分开来。
let sound = function(animal){
	animal.sound()
}
Duck.prototype.sound = function(){
	console.log('哈哈哈');
}
Chicken.prototype.sound = function(){
	console.log('呵呵呵');
}

sound(new Duck());
sound(new Chicken());

let Dog = function(){}
Dog.prototype.sound = function(){
	console.log('哈呵哈呵');
}
sound(new Dog());


// 多态的一个案例
var googleMap = {
	show:function(){
		console.log('谷歌地图');
	}
}
// var renderMap = function(){
// 	googleMap.show();
// }

var baiduMap = {
	show:function(){
		console.log('百度地图');
	}
}
function renderMap(type){
	if(type == 'google'){
		googleMap.show();
	}
	if(type == 'baidu'){
		baiduMap.show();
	}
}

const render = function(map){
	if(typeof map.show == 'function'){
		map.show()
	}
}
render(googleMap)
render(baiduMap)

renderMap('google')
renderMap('baidu')