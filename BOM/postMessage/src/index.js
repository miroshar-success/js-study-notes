const button = document.querySelector('.button')
const iframe = document.querySelector('.iframe')
let opener
button.addEventListener('click', () => {
  opener = window.open("./src/iframe.html","_blank","toolbar=yes,location=yes, directories=no, status=no, menubar=yes, width=500, height=500;")
  // const iframe = document.querySelector('.iframe')
}, false)

setInterval(() => {
  if(!opener) return
  opener.postMessage([{firstName: 'kyrie', lastName: 'irving'}])
}, 1000)


