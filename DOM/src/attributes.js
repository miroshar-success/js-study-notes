// -------------------------------- Element.attributes / --------------------------------
const attribute = document.querySelector('.attributes div')
console.log(attribute.attributes, typeof attribute.attributes) // NameNodeMap, object
/* for(let key in attribute.attributes){
  console.log('key:', key, 'value:', attribute.attributes[key])
} */

for(let key of Object.keys(attribute.attributes)){
  console.log(key)
}

for(let [key,value] of Object.entries(attribute.attributes)){
  console.log(key, value)
}
/*
0 class=​"name"
1 id=​"hello"
2 data-id=​"123"
3 style=​"color:​red;​"
*/

for(let value of Object.values(attribute.attributes)){
  console.log('value:', value)
}
/*
value: class=​"name"
value: id=​"hello"
value: data-id=​"123"
value: style=​"color:​red;​"
*/
