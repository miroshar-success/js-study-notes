const box = document.querySelector('.box-1')
console.log(box.offsetWidth, box.offsetHeight, box.clientWidth, box.clientHeight)
// 124 124 120 120

const box2 = document.querySelector('.box-2')
console.log(box2.offsetWidth, box2.offsetHeight, box2.clientWidth, box2.clientHeight)
// 100 100 96 96

// client 包括 width / padding
// offset 包括 width / padding / padding

const hello_text = document.querySelector('.hello-text')
const world_text = document.querySelector('.world-text')
const hello_top = hello_text.getBoundingClientRect().top
const world_top = world_text.getBoundingClientRect().top

console.log(world_top - hello_top)
console.log(hello_top, world_top)