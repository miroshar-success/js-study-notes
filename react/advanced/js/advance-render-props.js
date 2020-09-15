/*
class MouseTracker extends React.Component {
    constructor(props){
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = {x:0,y:0}
    }
    handleMouseMove(event){
        this.setState({
            x:event.clientX,
            y:event.clientY
        })
    }
    render(){
        return (
            <div
                onMouseMove={this.handleMouseMove}
                style={{height:"100%",width:"100%"}}>
                <h1>移动鼠标</h1>
                <p>当前鼠标的位置:{this.state.x},{this.state.y}</p>
            </div>
        )
    }
}
*/

class Mouse extends React.Component {
    constructor(props){
        super(props);
        this.state = {x:0,y:0}
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }
    handleMouseMove(event){
        this.setState({
            x:event.clientX,
            y:event.clientY
        })
    }
    render(){
        return (
            <div style={{width:"100%",height:"100%"}} onMouseMove={this.handleMouseMove}>
                <p>The current mouse position is ({this.state.x},{this.state.y})</p>
            </div>
        )
    }
}
class MouseTracker extends React.Component {
    render(){
        return (
            <React.Fragment>
                <h1>移动鼠标!</h1>
                <Mouse/>
            </React.Fragment>
        )
    }
}

class Cat extends React.Component {
    render(){
        const mouse = this.props.mouse;
        return (
            <div style={{position:'absolute',left:mouse.x-40,top:mouse.y-40,width:"80px",height:'80px',backgroundColor:"pink"}}></div>
        )
    }
}

class MouseWithCat extends React.Component {
    constructor(props){
        super(props);
        this.state = {x:0,y:0}
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }
    handleMouseMove(event){
        this.setState({
            x:event.clientX,
            y:event.clientY
        })
    }
    render(){
        console.log(this.props);
        return (
            <div
                style={{width:"100%",height:"100%"}}
                onMouseMove={this.handleMouseMove}
            >
                {this.props.render(this.state)}
            </div>
        )
    }
}

ReactDOM.render(
    <MouseWithCat render={mouse => (
        <Cat mouse={mouse}/>
    )}/>,
    document.getElementById("root")
)
























