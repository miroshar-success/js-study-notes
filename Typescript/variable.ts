function getSum(array:number[][]):number {
  var sum = 0;
  var i = 0;
  for(i = 0; i < array.length; i++){
    var row = array[i]
    for(i = 0; i < row.length; i++){
      console.log('i',i)
      sum += row[i] // 1
    }
  }
  return sum;
}

console.log(getSum([[1],[2,2,7],[1,2,3,4]]))

function getSum_2(array:number[][]) :number{
  var sum = 0;
  for(let i = 0; i < array.length; i++){
    const row = array[i]
    for(let i = 0; i < row.length; i++){
      sum += row[i]
    }
  }
  return sum;
}
console.log(getSum_2([[1],[2,2,7],[1,2,3,4]]))  // 22




for(var i = 0; i < 10; i++){  // 参数i会覆盖for循环里面的i
  (function(i){
    setTimeout(() => {console.log(i)}, i*100)
  })(i)
}


function f(input:boolean): number {
  let a = 100;
  if(input) {
    let b = a + 1
    return b
  }
  return 10
}
