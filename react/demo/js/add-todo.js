class AddTodo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text:"",
            list:[]
        }
        this.textInput = null;
/*        this.inputRef = element => {
            this.textInput = element;
        };*/
        this.handleChange = this.handleChange.bind(this);
        this.handleAddTodo = this.handleAddTodo.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }
    handleChange(event){
        this.setState({
            text:event.target.value
        });
    }
    handleAddTodo(){
        this.setState({
            list:[...this.state.list,this.textInput.value]
        });
        this.setState({
            text:""
        })
        this.textInput.value = ""
    }
    handleRemove(index){
        let array = [...this.state.list];
        array.splice(index,1);
        this.setState({
            list:array
        });
    }
    render() {
        return (
            <div>
                <div>
                    <input
                        type="text"
                        defaultValue={this.state.text}
                        ref={element => this.textInput = element}
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleAddTodo}>add</button>
                </div>
                <ol>
                    {this.state.list.map((item,index) => (
                        <ListItem
                            key={index}
                            item={item}
                            index={index}
                            delItem={this.handleRemove}
                        />
                    ))}
                </ol>
            </div>
        );
    }
}

class ListItem extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        console.log('constructor');
    }
    handleClick(){
        console.log(this.props.index);
        this.props.delItem(this.props.index);
    }
/*    componentDidMount(){
        console.log('componentDidMount');
    }
    shouldComponentUpdate(nextProps,nextState){
        console.log(nextProps,nextState);
        return true;
    }
    componentDidUpdate(){
        console.log('componentDidUpdate');
    }
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }*/
/*    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps:',nextProps)
    }*/
    shouldComponentUpdate(nextProps,nextState){
        console.log('nextProps:',nextProps);
        if(nextProps.item !== this.props.item){
            return true;
        }
        return false;
    }
    render(){
        const {item} = this.props;
        console.log('child-render');
        return (
            <li onClick={this.handleClick}>{this.props.name}---{item}</li>
        )
    }
}

class Banner extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            banner:[]
        }
    }
    componentDidMount(){
        axios.get('http://localhost:3000/banner').then(response => {
            console.log(response);
            if(response.data.code == 200){
                this.setState({
                    banner:response.data.banners
                })
            }
        })
    }
    render(){
        return (
            <div className='banner'>
                <ul>
                    {this.state.banner.length > 0 && this.state.banner.map((banner) =>
                        <li key={banner.targetId}>
                            <img src={banner.imageUrl} alt=""/>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

ListItem.propTypes = {
    item:PropTypes.string,
    index:PropTypes.number,
    delItem:PropTypes.func,
    name:PropTypes.string.isRequired
}
/*默认值*/
ListItem.defaultProps = {
    name:'kyrie'
}
ReactDOM.render(
    <Banner/>,
    document.getElementById("root")
)