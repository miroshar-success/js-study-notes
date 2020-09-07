// class 组件和 function 组件
function Welcome(props){
    return <h3>Hello,{props.name}</h3>
}

class Greeting extends React.Component {
    render() {
        return <h3>Hello,{this.props.name}</h3>
    }
}

ReactDOM.render(
    <div>
        <Welcome name={'kyrie'}/>
        <Greeting name={'lebron'}/>
    </div>,
    document.getElementById("root")
)

function App(){
    return (
        <div>
            <Welcome name={'durant'}/>
            <Welcome name={'curry'}/>
            <Welcome name={'lebron'}/>
        </div>
    )
}
ReactDOM.render(
    <App/>,
    document.getElementById('root')
)