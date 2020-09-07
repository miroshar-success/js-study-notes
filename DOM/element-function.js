const oHello = document.getElementById("hello");
console.log('class:', oHello.getAttribute("class") );
console.log('id:', oHello.getAttribute('id'));
console.log("attributes:",oHello.attributes);

for(value of oHello.attributes){
    console.log(value)
}

for(let i = 0; i < oHello.attributes.length; i++) {
    console.log("attribute-name:", oHello.attributes[i].name,'attribute-value:',oHello.attributes[i].value );
}

console.log('getAttributeNames',oHello.getAttributeNames());    //['class','id']
console.log("hasAttributes",oHello.hasAttributes());

if( oHello.hasAttributes() ){
    for(let key of oHello.getAttributeNames()){
        console.log('attribute-key:', key,'-----> value:',oHello.getAttribute(key) );
    }
}

console.log( 'getAttributeNode',oHello.getAttributeNode('id') );
console.log(  'value:', oHello.getAttributeNode('id').value );

const oItem = document.querySelector(".item");

console.log(oItem.hasAttribute("class"));
console.log(oItem.hasAttribute("data-name"));

const parent = document.querySelector('.parent');
const img = document.createElement('img');
parent.insertAdjacentElement('beforebegin',img);
// parent.insertAdjacentElement('afterbegin',img);
parent.insertAdjacentElement('beforeend',img);
parent.insertAdjacentElement('afterend',img);

parent.insertAdjacentHTML("beforebegin",`<p>我是before-begin</p>`);
parent.insertAdjacentHTML('afterbegin',`<p>after-begin</p>`);
parent.insertAdjacentHTML("beforeend",`<p>before-begin</p>`);
parent.insertAdjacentHTML("afterend",`<p>after-end</p>`);


parent.removeAttribute('class');

const video = document.querySelector('.video');
const button = document.querySelector('.button');

button.addEventListener('click',() => {
    video.requestFullscreen();
});

video.addEventListener('fullscreenchange',() => {
    console.log('进入全屏了');
});











