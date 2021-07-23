// Array方法
// filter
Array.prototype.my_filter = function(callback) {
  const result = [];
  for(let i = 0, length = this.length; i < length; i++){
    if (callback(this[i],i,this)) {
      result.push(this[i])
    }
  }
  return result;
}
const array = [1,2,3,4,5,6,7,8,9,10];

console.log(array.my_filter(function(item,index,array){
  console.log('filter:', item)
  console.log('filter:', index)
  console.log('filter:',array)
  return item > 5;
}))


// map
Array.prototype.my_map = function(callback){
  const result = []
  for(let i = 0, length = this.length; i < length; i++){
    result.push(callback(this[i],i,this))
  }
  return result
}
console.log( array.my_map((item,i,array) => {
  console.log('map:', item)
  console.log('map:', i)
  console.log('map:', array)
  return item * 2
}) )


// some
Array.prototype.my_some = function(callback){
  let flag = false;
  for(let i = 0, length = this.length; i < length; i++){
    if (callback(this[i],i,this)){
      flag = true;
      break;
    }
  }
  return flag;
}

console.log( array.my_some(function(item,i,array) {
  console.log('some:', item)
  console.log('some:', i)
  console.log('some:', array)
  return item > 3
}))


// every
Array.prototype.my_every = function(callback) {
  let flag = true;
  for(let i = 0, length = this.length; i < length; i++){
    if(!callback(this[i],i,this)) {
      flag = false;
      break;
    }
  }
  return flag;
}
console.log( array.my_every(function(item,index,array){
  console.log('every:', item, index, array);
  return item < 5
}) )

// some
Array.prototype.my_reduce = function(callback,initialValue){
  let prev, flag = true; // flag表示是否提供了initialValue,如果提供了,则accumulator为initialValue, currentValue为第一个值
  // 如果没有提供的话, accumulator为第一个值, currentValue为第二个值
  if(initialValue === undefined) {
    prev = this[0]
    flag = false;
  }else{
    prev = initialValue
  }
  if(flag) {
    for(let i = 0, length = this.length; i < length; i++){  
      prev = callback(prev,this[i],i,this)
    }
  }else{
    for(let i = 0, length = this.length - 1; i < length; i++){
      prev = callback(prev,this[i+1],i,this)
    }
  }
  return prev
}

console.log( array.my_reduce(function(prev,next,i,array) {
  console.log('reduce:', prev,next,i,array);
  return prev + next
}) )