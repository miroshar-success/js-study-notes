function tick() {
    const element = (
        <div>
            <p>Hello,World</p>
            <h3>{new Date().toLocaleTimeString()}</h3>
        </div>
    );
    ReactDOM.render(
        element,
        document.getElementById("root")
    )
}
// tick();
// setInterval(tick,1000);

function Clock(props){
    return (
        <div>
            <p>Hello,World!!!!!</p>
            <h3>It is {props.date.toLocaleTimeString()}</h3>
        </div>
    )
}
function update(){
    ReactDOM.render(
        <Clock date={new Date()}/>,
        document.getElementById("root")
    )
}
update();
setInterval(update,1000);