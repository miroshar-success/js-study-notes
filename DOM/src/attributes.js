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

for(let value of Object.values(attribute.attributes)){
  console.log('value:', value)
}
