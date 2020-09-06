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













