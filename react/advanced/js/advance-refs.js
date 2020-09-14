class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            count:0
        }
        this.myRef = React.createRef();
        console.log('constructor',this.myRef.current);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount(){
        console.log('componentDidMount:',this.myRef.current);
    }
    componentWillUpdate(){
        console.log('componentWillUpdate:',this.myRef.current);
    }
    shouldComponentUpdate(nextProps,nextState){
        console.log('state:',this.state,'nextState',nextState);
        console.log('shouldComponentUpdate:',this.myRef.current);
        return true;
    }
    handleClick(){
        this.setState(state => ({
            count:state.count+1
        }))
    }
    render(){
        return (
            <div>
                <button
                    ref={this.myRef}
                    onClick={this.handleClick}
                >{this.state.count}</button>
            </div>
        )
    }
}
// 可以在react组件和dom元素上使用ref,不能在函数组件上使用ref
class CustomTextInput extends React.Component {
    constructor(props){
        super(props);
        this.textInput = React.createRef();
        this.focusTextInput = this.focusTextInput.bind(this);
    }
    focusTextInput(){
        console.log(this.textInput.current);
        this.textInput.current.focus();
    }
/*    componentDidMount(){
        this.textInput.current.focus();
    }*/
    render(){
        return (
            <div>
                <input type="text" ref={this.textInput}/>
                <input
                    type="submit"
                    value='Focus the text input'
                    onClick={this.focusTextInput}
                />
            </div>
        )
    }
}

class AutoFocusTextInput extends React.Component {
    constructor(props){
        super(props);
        this.textInput = React.createRef();
    }
    componentDidMount(){
        // ref用在组件上
        console.log(this.textInput.current);
        // this.textInput.current.focus();
        this.textInput.current.focusTextInput()
    }
    render(){
        return (
            <CustomTextInput ref={this.textInput}/>
        )
    }
}

// 可以在函数组件内部使用ref属性
function FunctionTextInput(){
    const textInput = React.useRef(null);
    function handleClick(){
        textInput.current.focus()
    }
    return(
        <div>
            <input type="text" ref={textInput}/>
            <input type="submit" onClick={handleClick}/>
        </div>
    )
}

// 回调refs
class CallBackRef extends React.Component {
    constructor(props){
        super(props);
        this.textInput = null;
        this.setTextInputRef = element => {
            this.textInput = element;
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        console.log('callback ref:',this.textInput);
        this.textInput.focus()
    }
    render(){
        return (
            <div>
                <input
                    type="text"
                    ref={this.setTextInputRef}
                />
                <input type="submit" onClick={this.handleClick}/>
            </div>
        )
    }
}


ReactDOM.render(
    <div>
        <AutoFocusTextInput/>
        <FunctionTextInput/>
        <CallBackRef/>
    </div>,
    document.getElementById("root")
)