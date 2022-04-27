const text = document.querySelectorAll('#node-list .text')
const incrementButton = document.querySelector('.increment')
const queryButton = document.querySelector('.querySelectorAllButton')
const nodeList = document.querySelector('#node-list')

const childNodes = nodeList.childNodes
console.log('childNodes -------', childNodes)
incrementButton.addEventListener('click', function() {
  const span = document.createElement('span')
  span.textContent = [...text].length + 1
  nodeList.appendChild(span)

  console.log(text.length)
  console.log(childNodes.length, childNodes)
}, false)


// forEach
text.forEach(text => {
  console.log('each', text)
  // <span class="text">1</span>
  // <span class="text">2</span>
})

// entries
console.log(text.entries())
for(const tag of text.entries()){
  console.log(tag)
}
/*
[0, span.text]
[1, span.text]
*/


// keys
for(const key of text.keys()){
  console.log(key)  // 0 1
}

// values
for(const value of text.values()){
  console.log(value)
  // <span class="text">1</span>
  // <span class="text">2</span>
}


for(const key in text){
  console.log('key', key)
  /*
  0 ,1 ,entries ,keys ,values ,forEach ,length ,item
  */
}


for(const tag of text){
  console.log('tag', tag)
    // <span class="text">1</span>
  // <span class="text">2</span>
}


//  ----------- 遍历childNodes ---------
for(const tag of childNodes){
  console.log('childNodes-tag', tag)
}
for(const value of childNodes.values()){
  console.log('childNodes-value:', value)
}
