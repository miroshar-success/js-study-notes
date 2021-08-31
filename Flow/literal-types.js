// @flow

function acceptTwo(value:2){
}
// acceptTwo(123)
acceptTwo(2)


function acceptBoolean(value:false){
}
acceptBoolean(false)
// acceptBoolean(true)


function acceptString(value:'string'){
}
acceptString('string')
// acceptString('123')

// --------------- union types
function getColor(name: 'success' | 'danger' | 'warning'){
  switch(name) {
    case 'success':
      return 'green'
    case 'danger':
      return 'red'
    case 'warning':
      return 'yellow'
  }
}
getColor('success')
getColor('warning')
getColor('danger')
// getColor('error')