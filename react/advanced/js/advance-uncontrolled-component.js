class NameForm extends React.Component {
    constructor(props){
        super(props);
        this.textInputRef = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        console.log('value:',this.textInputRef.current.value);
        event.preventDefault();
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" ref={this.textInputRef} defaultValue={'hello'}/>
                <input type="submit" value='submit'/>
            </form>
        )
    }
}

ReactDOM.render(
    <NameForm/>,
    document.getElementById("root")
)