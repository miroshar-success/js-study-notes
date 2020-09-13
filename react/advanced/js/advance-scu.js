class CounterButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            count:1,
            player:{
                firstName:'kyrie'
            }
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.setState(state => ({
            count:state.count+1
        }))
        // let player = this.state.player;
        // player.firstName = 'irving';
        // this.setState({player});
        this.setState(state => ({
            player:{...state.player,firstName:'irving'}
        }))
    }
    shouldComponentUpdate(nextProps,nextState){
        console.log('nextProps:',nextProps);
        console.log("nextState:",nextState);
        console.log("is equal:",nextState.player === this.state.player);
        if(nextState.player !== this.state.player){
            return true;
        }
        return false;
    }
    render() {
        return (
            <button
                onClick={this.handleClick}
            >
                name: {this.state.player.firstName}
            </button>
        )
    }
}


class CountButton extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            count:0,
            player:{firstName:'lebron'}
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
/*        let player = this.state.player;
        player.firstName = 'james';
        this.setState({player});*/
        this.setState(state => ({
            player:{...state.player,firstName:"james"}
        }));
    }
    render(){
        return (
            <button
                onClick={this.handleClick}
            >{this.state.player.firstName}</button>
        )
    }
}

ReactDOM.render(
    <div>
        <CounterButton color={'red'}/>
        <CountButton/>
    </div>,
    document.querySelector("#root")
);


let player1 = {
    firstName:'kyrie',
    lastName:'irving',
    teammate:{
        firstName:'kevin',
        lastName:"durant"
    }
}

let player2 = {...player1};

console.log('player1 === player2 ?',player1 === player2);

player1.teammate.firstName = 'kd';
console.log(player2.teammate.firstName);


class ListOfWord extends React.PureComponent {
    render(){
        return <div>{this.props.words.join(",")}</div>
    }
}

class ListOfWords extends React.Component {
    shouldComponentUpdate(nextProps){
        console.log('current-props:',this.props);
        console.log("next-props:",nextProps);
        console.log(this.props === nextProps);
        return true;
    }
    render() {
        return <div>{this.props.words.join(",")}</div>
    }
}

class WordAdder extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            words:['marklar']
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
/*        let words = this.state.words;
        words.push("abdc");
        this.setState({words:words})*/
/*        this.setState(state => ({
            words:state.words.concat(['abcd'])
        }))*/

        this.setState(state => ({
            words:[...state.words,'efg']
        }));
    }
    shouldComponentUpdate(nextProps,nextState){
        console.log("state:",this.state.words);
        console.log('nextState:',nextState.words);
        console.log(this.state.words === nextState);
        return true;
    }
    render(){
        return (
            <div>
                <button onClick={this.handleClick}>add word</button>
                {/*<div>*/}
                {/*    <p>purecomponent</p>*/}
                {/*    <ListOfWord words={this.state.words}/>*/}
                {/*    <p>not purecomponent</p>*/}
                {/*    <ListOfWords words={this.state.words}/>*/}
                {/*</div>*/}
            </div>
        )
    }
}

ReactDOM.render(
    <WordAdder/>,
    document.getElementById("root")
)











