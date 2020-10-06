
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


/* 优化 useEffect */
function Random(){
    const [count,setCount] = useState(0);
    const handleClick = () => {
        setCount(count+1)
    }
    useEffect(() => {
       console.log('hello,我是effect,我只渲染一次');
    },[])   // 只渲染一次

    return (
        <div>
            <p>{count}</p>
            <button onClick={handleClick}>click</button>
        </div>
    )
}

/*effect执行的时机*/
function ChangeSize(){
    useEffect(() => {
        const oBox = document.querySelector('.box');
        console.log(oBox);
        oBox.style.backgroundColor = 'skyblue';
    })
    return (
        <div>
            <div
                className="box"
                style={{width:'100px',height:'100px',backgroundColor:"pink"}}
            ></div>
        </div>
    )
}

/*自定义hook useInterval*/

function useInterval(callback,time){
    React.useEffect(() => {
       const timer = setInterval(callback,time);
       return () => {
            clearInterval(timer);
       }
    },[])
}

function Timer(){
    const [count,setCount] = React.useState(0);
    const [age,setAge] = React.useState(0);
    useInterval(() => {
        setCount(count+1);
        console.log('count:',count);
    },1000);
    React.useEffect(() => {
        let timer = setInterval(() => {
            // setAge(age+1);
            setAge(age => age+1);
        },1000)
        return () => {
            clearInterval(timer);
        }
    },[])
    return(
        <div>
            <p>自定义hook: {count}</p>
            <p>age: {age}</p>
        </div>
    )
}


ReactDOM.render(
    <Timer/>,
    document.getElementById("root")
);