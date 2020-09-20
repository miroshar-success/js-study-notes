// ClickButton  首字母必须大写
class ClickButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            count:0
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        this.setState(state => ({
            count:state.count+1
        }))
    }
    render() {
        return (
            <div>
                <p>{this.state.count}</p>
                <button onClick={this.handleClick}>Click Me!</button>
            </div>
        );
    }
}
ReactDOM.render(
    <ClickButton/>,
    document.getElementById("root")
)

