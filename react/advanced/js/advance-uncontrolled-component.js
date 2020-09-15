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

class FileInput extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(event){
        event.preventDefault()
    }
    handleChange(event){
        console.log(event.target.files);
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Upload file:
                    <input type="file" onChange={this.handleChange}/>
                </label>
                <input type="submit" value='Submit'/>
            </form>
        )
    }
}

ReactDOM.render(
    <FileInput/>,
    document.getElementById("root")
)