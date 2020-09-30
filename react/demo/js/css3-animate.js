class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show:false,
            paused:true
        }
        this.toggleHide = this.toggleHide.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    toggleHide(){
        this.setState(state => ({
            show:!state.show
        }))
    }
    toggle(){
        this.setState(state => ({
            paused:!state.paused
        }))
    }
    render() {
        return (
            <div>
                <p className={this.state.show ? 'active' : ''}>Hello,World</p>
                <button onClick={this.toggleHide}>click</button>
                <div className="outside">
                    <div className={['inside',this.state.paused ? 'paused' : 'play'].join(' ')}></div>
                </div>
                <button onClick={this.toggle}>{this.state.paused ? 'play' : 'paused'}</button>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
)