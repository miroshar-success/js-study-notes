export  function Increment(){
    return {
        type:"INCREMENT"
    }
}
export function Decrement(){
    return {
        type:"DECREMENT"
    }
}

export function IncrementAsync(){
    return function(dispatch){
        setTimeout(()=>{
            dispatch(Increment())
        },2000);
    }
}

export function counter(state=1,action){
    switch(action.type){
        case "INCREMENT":
            return state + 3;
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
}