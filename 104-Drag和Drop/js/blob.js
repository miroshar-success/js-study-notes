let oContainer = document.querySelector(".container");
oContainer.addEventListener("dragover",drag,false);
oContainer.addEventListener("drop",drag,false);
function drag(event){
	event = event || window.event;
	event.preventDefault();
	let type = event.type;
	switch(type){
		case "drop":
			let files = event.dataTransfer.files;
			for(let i = 0,item; item = files.item(i); i++){
				let blob = new Blob([item]);
				let url = window.URL.createObjectURL(blob);
				console.log(blob,url);
				let img = new Image(250,200);
				img.src = url;
				img.onload = function(){
					oContainer.appendChild(img);
					window.URL.revokeObjectURL(url);
				}
			}
			break;
	}
}