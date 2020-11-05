const oText = document.querySelector('.text');

oText.addEventListener('input',(event) => {
	event = event || window.event;
	window.sessionStorage.setItem('username',event.target.value.trim());
},false);

if( window.sessionStorage.getItem('username') ){
	oText.value = window.sessionStorage.getItem('username');
}
