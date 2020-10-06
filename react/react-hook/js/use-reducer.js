import * as React from "react";

const initialState = {count:0};

function reducer(state,action){
    switch(action.type){
        case 'increment':
            return {count:state.count+1}
        case "decrement":
            return {count:state.count-1}
        default:
            return initialState;
    }
}

function Counter(){
    const [state,dispatch] = React.useReducer(reducer,initialState);
    function handleIncrement(){
        dispatch({
            type:'increment'
        })
    }
    function handleDecrement(){
        dispatch({
            type:'decrement'
        })
    }
    return (
        <div>
            <p>current-count : {state.count}</p>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
        </div>
    )
}

function counter(state = 0, action){
    switch(action.type){
        case "increment":
            return state + 1;
        case "decrement":
            return state - 1;
        default:
            return state;
    }
}

function ReducerCounter(){
    const [count,dispatch] = React.useReducer(counter,0);
    function increment(){
        dispatch({
            type:'increment'
        })
    }
    function decrement(){
        dispatch({
            type:"decrement"
        })
    }
    return (
        <div>
            <p>{count}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    )
}

/*useReducer 重写 add-todo */
function todos(state,action){
    const {type,payload} = action;
    console.log(type,payload);
    switch(type){
        case "add":
            return [...state,{
                text:payload.text,
                completed:payload.completed,
                id:payload.id,
            }]
        case "toggle":
            return state.map((todo) => {
                if(payload.id == todo.id){
                    todo.completed = !todo.completed;
                }
                return todo;
            })
        default:
            return state;
    }
}

function TodoList(){
    const [todoList,dispatch] = React.useReducer(todos,[]);
    const [text,setText] = React.useState("");
    function handleChange(event){
        let text = event.target.value.trim();
        setText(text);
    }
    function handleSubmit(){
        dispatch({
            type:'add',
            payload:{
                text,
                completed:false,
                id:Date.now()
            }
        })
        setText("");
    }
    function handleDelete(todo){
        dispatch({
            type:'toggle',
            payload:{
                id:todo.id
            }
        })
    }
    return (
        <div className={'todo-list-wrapper'}>
            <div>
                <input
                    type="text"
                    value={text}
                    onChange={handleChange}
                />
                <input
                    type="submit"
                    text={'Submit'}
                    onClick={handleSubmit}
                />
            </div>
            <ul className="list">
                {todoList.length > 0 && todoList.map((todo,index) => (
                    <li
                        key={'todo-'+index}
                        onClick={() => {handleDelete(todo)}}
                    >
                        <span style={{padding:'0 5px'}}>{todo.completed ? 'ok' : 'false'}</span>
                        <span>{todo.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}


/*惰性初始化*/
function init(initialValue){
    return {count:initialValue}
}

function counter(state,action){
    switch(action.type){
        case "add":
            return {count:state.count+1};
        case "reduce":
            return {count:state.count-1};
        default:
            return {count:initialValue}
    }
}

function InitialCounter(){
    const [state,dispatch] = React.useReducer(counter,0,init);
    return (
        <div>
            <p>{state.count}</p>
            <button onClick={() => dispatch({type:'add'})}>+</button>
            <button onClick={() => dispatch({type:'reduce'})}>-</button>
        </div>
    )
}

ReactDOM.render(
    <InitialCounter/>,
    document.getElementById("root")
)