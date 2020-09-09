const element = <form action="">
    <label htmlFor="">名字:
        <input type="text" name='name'/>
    </label>
    <input type="submit" value='提交'/>
</form>

ReactDOM.render(
    element,
    document.getElementById("root")
)

// input标签
class NameForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value:"",
            age:10
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        console.log("你提交的名字:",this.state.value);
        console.log("你的年龄:",this.state.age);
        event.preventDefault();
    }
    handleChange(event){
        this.setState({
            value:event.target.value
        })
    }
    handleChangeAge =(event) => {
        this.setState({
            age:event.target.value
        })
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="">名字:
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
                <label htmlFor="">Age:
                    <input type="text" value={this.state.age} onChange={this.handleChangeAge}/>
                </label>
                <input type="submit" value='提交'/>
            </form>
        )
    }
}
// textarea

class EssayForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:'请撰写一篇关于你喜欢的DOM元素的文章'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(event){
        console.log('你提交的文章是:',this.state.value)
        event.preventDefault()
    }
    handleChange(event){
        this.setState({
            value:event.target.value
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="">文章:
                    <textarea value={this.state.value} onChange={this.handleChange}></textarea>
                </label>
                <input type="submit" value='提交'/>
            </form>
        )
    }
}

class FlavorForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {value: 'coconut'};
    }
    handleSubmit = (event) => {
        console.log("你选择的水果是:",this.state.value);
        event.preventDefault();
    }
    handleChange = (event) => {
        this.setState({
            value:event.target.value
        })
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    选择你喜欢的风味:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="grapefruit">葡萄柚</option>
                        <option value="lime">酸橙</option>
                        <option value="coconut">椰子</option>
                        <option value="mango">芒果</option>
                    </select>
                </label>
                <input type="submit" value='提交'/>
            </form>
        )
    }
}

class Player extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value:'kyrie'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(event) {
        console.log('你选择的球员是:',this.state.value);
        event.preventDefault()
    }
    handleChange(event) {
        this.setState({
            value:event.target.value
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    选择你最喜欢的球员:
                    <select onChange={this.handleChange} value={this.state.value}>
                        <option value="kyrie">kyrie</option>
                        <option value="lebron">lebron</option>
                        <option value="durant">durant</option>
                        <option value="curry">curry</option>
                    </select>
                </label>
                <input type="submit" value='submit'/>
            </form>
        )
    }
}

class Reservation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isGoing:true,
            numberOfGuests:2,
            isVisited:false
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.name === "isGoing" ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]:value
        })
    }
    handleVisited = (event) => {
        this.setState(state => ({
            isVisited:!state.isVisited
        }))
    }
    render(){
        return (
            <form>
                <label>参与:
                    <input
                        type="checkbox"
                        name='isGoing'
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange}
                    />
                </label>
                <label>来宾人数:
                    <input
                        type="number"
                        name='numberOfGuests'
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange}
                    />
                </label>
                <input
                    type="checkbox"
                    name={'isVisited'}
                    value={this.state.isVisited}
                    onChange={this.handleVisited}
                />
            </form>
        )
    }
}

ReactDOM.render(
    <Reservation/>,
    document.querySelector("#root")
)