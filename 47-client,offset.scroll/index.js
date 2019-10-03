let oPlayer = document.querySelectorAll('.player>li')[0];
console.log(oPlayer.__proto__.constructor); // HTMLLIElement 
console.log(oPlayer.__proto__.__proto__);   // HTMLElement
console.log(oPlayer.__proto__.__proto__.__proto__);   // Element
console.log(oPlayer.__proto__.__proto__.__proto__.__proto__);   // Node
console.log(oPlayer.__proto__.__proto__.__proto__.__proto__.__proto__); // EventTarget
console.log(oPlayer.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.constructor);   // Object

let oBox = document.querySelector('.box');

let w = oBox.clientWidth;
let h = oBox.clientHeight;
let t = oBox.clientTop;
let l = oBox.clientLeft;

console.log(w,h,t,l);   // 104 106 10 25;

oBox.style.width = '200px'; // 行内样式

let oChild = document.querySelector('.parent>.child');

console.log(oChild.offsetLeft); // 70
console.log(oChild.offsetTop);  // 50
console.log(oChild.offsetWidth);    // 170
console.log(oChild.offsetHeight);   // 170

let small = document.querySelector('.small');
console.log(small.scrollTop);

// setInterval(function(){
//     window.scrollBy(0,1)
// },1000/60);

