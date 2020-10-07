function UseMemoExample(){
    const [count,setCount] = React.useState(0);
    const memorizedText1 = () => {
        return `this is a memorized text ${Date.now()}`
    }
    const memorizedText2 = React.useMemo(() => {
        return `this is also memorized text ${Date.now()}`
    },[Math.floor(count / 10)])
    return (
        <div>
            <p>you click me {count} times;</p>
            <p>memorizedText1 - {memorizedText1()}</p>
            <p>memorizedText2 - {memorizedText2}</p>
            <button
                onClick={() => {setCount(count => count+1)}}
            >click</button>
        </div>
    )
}

const s = new Set();

function UseCallbackMemo(){
    const [count,setCount] = React.useState(0);
    const add = React.useCallback(() => {
        setCount(count => count+1);
    },[])
    s.add(add);
    console.log(s.size);
    return (
        <div>
            <p>you click me {count} times</p>
            <button onClick={add}>click</button>
        </div>
    )
}


ReactDOM.render(
    <UseCallbackMemo/>,
    document.getElementById("root")
)