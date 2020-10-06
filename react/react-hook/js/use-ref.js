function Focus(){
    const inputRef = React.createRef();
    function handleFocus(){
        console.log('inputRef:',inputRef )
        inputRef.current.focus();
    }
    React.useEffect(() => {
        inputRef.current.focus();
    },[])
    return (
        <div>
            <input type="text" ref={inputRef}/>
            <button
                onClick={handleFocus}
            >focus</button>
        </div>
    )
}

/*利用 useRef对值进行缓存*/
function Counter(){
    const [count,setCount] = React.useState(0);
    const countRef = React.useRef(0);
    return (
        <div>
            <p>current-count: {count}</p>
            <p>prev-count: {countRef.current}</p>
            <button onClick={() => {
                countRef.current = count;
                setCount(count => count + 1)
            }}>click me to add</button>
            <button
                onClick={() => {
                    countRef.current = count;
                    setCount(count => count-1)
                }}
            >click me to reduce</button>
        </div>
    )
}

ReactDOM.render(
    <Counter/>,
    document.getElementById("root")
)