window.onload = newgame;
var state , ui;
function newgame(playagain){
		ui = {
			heading:null,prompt:null,input:null,high:null,low:null,mid:null
		}
		// 获取每个元素,通过id获取
		for(let id in ui){
			ui[id] = document.getElementById(id);
		}
		// 监听 input onchange事件, 进行判断
		ui['input'].onchange = handleGuess;
		// 初始state
		state = {
			guessnum:0,		// 猜的次数,并作为url的一部分添加进 history
			n: Math.floor(Math.random() * 100 ) + 1,	// 要猜的值
			high:100,	// 最大范围
			low:0,	// 最小值
			guess:undefined	// 上一次猜的值
		}
		display(state);
		if(playagain) {save(state);}
}

// 保存状态是添加一个 新的历史记录,并保存当前的数据到 state.
function save(state){
	if(!history.pushState) return;
	var url = "#guess" + state.guessnum;
	window.history.pushState(state,'',url);
}

window.onpopstate = function(event) {
	if(event.state) {
		state = event.state;
		display(state);
	}else{
		window.history.replaceState(state,"","#guess" + state.guessnum);
	}
}

// 根据输入的值进行判断,先判断输入值是否在 low---high 之间。
function handleGuess(event){
	let value = parseInt(event.target.value.trim());
	if(value < state.high && value > state.low){
		if(value < state.n) {
			state.low = value;
		}else if (value > state.n){
			state.high = value;
		}
		state.guess = value;
		state.guessnum++;
		save(state);
		display(state);
	}else{
		alert('Please enter a number greater than' + state.low + 'and less than' + state.high);
	}
}

function display(state){
	ui.heading.innerHTML = document.title = `I'am thinking of a number between ${state.low} and ${state.high}`;
	ui.low.style.width = state.low + '%';
	ui.mid.style.width = (state.high - state.low) + '%';
	ui.high.style.width = (100 - state.high )+ '%';

	ui.input.style.visibility = 'visible';
	ui.input.value = "";
	ui.input.focus();

	if(state.guess == undefined){
		ui.prompt.innerHTML = 'Type your guess and hit enter';
	}else if(state.guess < state.n){
		ui.prompt.innerHTML = state.guess + ' is to low.Guess again';
	}else if(state.guess > state.n){
		ui.prompt.innerHTML = state.guess + ' is to high.Guess again';
	}else{
		ui.input.style.visibility = 'hidden';
		ui.heading.innerHTML = document.title = state.guess + ' is correct';
		ui.prompt.innerHTML = 'You Win, <button onclick="newgame(true)">Play Again</button>'
	}
}