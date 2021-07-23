console.log((function () {}).length)  // 0
console.log( (function(a){}).length ) // 1
console.log( (function(a,b){}).length ) // 2
console.log( (function(...arg){}).length )  // 0
console.log( (function(a,b,c = 1){}).length ) // 2
console.log( (function(a,b = 1,c){}).length ) // 1