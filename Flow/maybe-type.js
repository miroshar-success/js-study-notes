// @flow
/* 
Maybe types accept the provided type as well as null or undefined 
?number would mean number null or undefined
*/
function acceptMaybeNumber(value: ?number){

}
acceptMaybeNumber(123)
acceptMaybeNumber(null)
acceptMaybeNumber(undefined)
// acceptMaybeNumber(false)   errors
// acceptMaybeNumber('123')   errors

// ---------------- 对象属性可选
/*
If you want to allow missing properties, use optional property syntax? where the ? is placed before the colon.
*/
function acceptMaybeProp({value}: {value:?number}){
}
acceptMaybeProp({value:123})
acceptMaybeProp({value:undefined})
acceptMaybeProp({value:null})
acceptMaybeProp({})

// ---------------------- refining Maybe types
function fn(value: ?number){
  if(value !== null && value !== undefined){
    return value * 2
  }
}
// function m1(value:?number){
//   return value * 2
// }

function m2(value:?number){
  if(value != undefined){
    return value * 2
  }
}
function m3(value: ?number){
  if(value != null){
    return value * 2
  }
}
function m4(value:?number){
  if(typeof value === 'number'){
    return value * 2
  }
}