const newEvent = document.createEvent("UIEvent");
console.log(newEvent);

// MouseEvent 派生自UIEvent, UIEvent派生自Event
const mouse_event = document.createEvent("MouseEvent");
console.log('mouse-event:',mouse_event);

const keyboard_event = document.createEvent('KeyboardEvent');
console.log('keyboard_event',keyboard_event);

// 默认的click事件
const oBtn = document.querySelector(".btn");
oBtn.addEventListener('click',(event) => {
	console.log('click-event:',event);
});


// 使用编程的方式生成一个点击事件
const toggle = document.querySelector(".toggle");
const checkbox = document.querySelector(".checkbox");

function simulateClick(e){
	const evt = new MouseEvent('click',{
		bubbles:true,
		cancelable:true,
		view:window,
	});
	console.log('evt:',evt);
	var canceled = checkbox.dispatchEvent(evt);
	console.log(canceled);
}

toggle.addEventListener("click",simulateClick);


// 创建一个自定义事件
toggle.addEventListener('hello',function(e) {
	console.log('hello-event',e,e.type);
})
toggle.addEventListener('world',function(e) {
	console.log('world-event',e,e.type);
})
const e1 = new CustomEvent('hello',{
	detail:{
		language:'javascript'
	}
});
const e2 = new CustomEvent('world',{
	detail:{
		framework:'react'
	}
});

e1.prototype = window.Event.prototype;
toggle.dispatchEvent(e1);
toggle.dispatchEvent(e2);


const custom = document.querySelector(".custom");
function customFunc() {
	custom.addEventListener('h',(e) => {
		console.log('custom-event:',e);
	})
	const customEvent = new CustomEvent('h',{
		detail:{
			name:'hello'
		}
	});
	custom.dispatchEvent(customEvent);
}
custom.addEventListener('click',customFunc);







