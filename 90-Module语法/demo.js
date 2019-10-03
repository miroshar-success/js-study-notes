export default function(){
	console.log("foo");
	console.log(this);
}

export let obj = {};

function C(){
	this.number = 0;
	this.add = function(){
		this.number += 1;
	};
	this.show = function(){
		console.log(this.number);
	}
}
export let c = new C();