// ------------------------ Node.textContent ------------------------
console.log(document.documentElement.textContent)

console.log(document.textContent) // null

document.querySelector('.button-1').addEventListener('click',() => {
  document.querySelector('.text-content-wrapper').textContent = 'hello world'
})

console.log(document.querySelector('.text-content-wrapper').textContent)
/*
    opacity:0
    now you can see me
    visibility
    display:none
*/
console.log(document.querySelector('.text-content-wrapper').innerText)
/*
    opacity:0
    now you can see me
    visibility
*/

console.log(document.querySelector('.none').innerText)

function $(attr){
  return document.querySelector(attr)
}

$('.button-2').addEventListener('click', () => {
  // $('.text-content-wrapper').innerHTML = `<h1>我是新插入的html</h1>`;
  $('.text-content-wrapper').textContent = `<h1>我是新插入的html</h1>`;
})


