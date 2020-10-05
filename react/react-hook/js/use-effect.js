const {useState,useEffect} = React;

function Counter (){
    const [count,setCount] = useState(0);
    const handleCount = () => {
        setCount(count+1)
    }
    useEffect(() => {
        console.log('我是effect-hook');
        document.title = `you click me ${count} times`;
    })
    return (
        <div>
            <p>you click me {count} times</p>
            <button onClick={handleCount}>click</button>
        </div>
    )
}

ReactDOM.render(
    <Counter/>,
    document.getElementById("root")
)