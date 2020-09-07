// ReactDOM.render(
//     <h1>Hello,World</h1>,
//     document.getElementById("root")
// )

const name = 'Josh Perez';
const element = <h1>Hello,{name}</h1>;

ReactDOM.render(
    element,
    document.getElementById('root')
);

function formatName(user){
    return user.firstName + " " + user.lastName;
}
const user = {
    firstName:"Harper",
    lastName:"Perez"
}

let ele = (
    <h2 tabIndex="0">
        Hello,{formatName(user)}
    </h2>
)
ReactDOM.render(
    ele,
    document.getElementById('root')
);


const e = React.createElement(
    'p',
    {className:"greeting",tabIndex:"1"},
    'hello,react'
);
ReactDOM.render(
    e,
    document.getElementById('root')
);

// React元素是不可变对象。
function tick() {
    const element = (
        <div>
            <h1>Hello,World</h1>
            <h2>It is {new Date().toLocaleTimeString()} -- time-string</h2>
            <h2>It is {new Date().toLocaleDateString()} -- date-string</h2>
            <h2>It is {new Date().toLocaleString()} -- local-string</h2>
        </div>
    )
    ReactDOM.render(
        element,
        document.getElementById('root')
    )
};
setInterval(tick,1000);