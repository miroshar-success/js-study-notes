const MyComponents = {
    DatePicker:function DatePicker(props){
        return <div>Image a {props.color} datepicker here!</div>
    }
}

function BlueDatePicker(){
    return <MyComponents.DatePicker color='blue'/>
}

class Button extends React.Component {
    render(){
        let description;
        if(this.props.number % 2 === 0) {
            description  = <strong>even</strong>
        }else{
            description = <i>odd</i>
        }
        console.log(this.props);
        return (
            <div>
                <p>JavaScript表达式作为props:{1+2+3+4}</p>
                <p>if语句用在JSX代码以外的地方:{description}</p>
                <p>子面量字符串:{this.props.message}-{this.props.tag}-{this.props.label}</p>
                <p>没有给props指定值的时候:{this.props.autocomplete.toString()}</p>
            </div>
        )
    }
}

class App extends React.Component {
    render() {
        return (
            <BlueDatePicker/>
        );
    }
}

function Greeting(props){
    return (
        <div>
            <p>FirstName:{props.firstName}</p>
            <p>LastName:{props.lastName}</p>
        </div>
    )
}

const props = {firstName:"lebron",lastName:'james'}


const MyButton = (props) => {
    const {kind,...other} = props;
    const className = kind === 'primary' ? 'primary' : 'default';
    console.log('other:',other);
    console.log("all-props:",props);
    return (
        <button className={'btn-'+className} {...other}/>
    )
}

function ThemeButton(){
    return (
        <MyButton kind='primary' onClick={() => console.log("hello,world")}>Click Me!</MyButton>
    )
}

function Container(props){
    return (
        <div className={'container'}>{props.children}</div>
    )
}


class Banner extends React.Component {
    render() {
        return (
            <Container>
                <h1>我是头部</h1>
                <main>我是body</main>
                <footer>我是footer</footer>
                我是字符串
            </Container>
        );
    }
}


class PlayerList extends React.Component{
    render(){
        return [
            <li key="A">Kyrie</li>,
            <li key="B">Durant</li>,
            <li key="C">Lebron</li>,
        ]
    }
}

const playerlist = [
    {firstName:"kyrie",lastName:"irving"},
    {firstName:"kevin",lastName:"durant"},
    {firstName:"lebron",lastName:"james"}
]

class PlayerItem extends React.Component {
    render() {
        return [...playerlist.map((item,index) => (
            <li key={index}>
                <span className="firstName">{item.firstName}---</span>
                <span className="lastName">{item.lastName}</span>
            </li>
        ))]
    }
}

function RepeatPlayer(props){
    let players = [];
    for(let i = 0; i < props.number;i++){
        players.push(props.children(i));
    }
    console.log('players:',players);
    return <ul>{players}</ul>
}
function LengthOfPlayer(){
    return (
        <RepeatPlayer number={playerlist.length}>
            {(index) => (<li key={index}>{playerlist[index].firstName}--{playerlist[index].lastName}</li>)}
        </RepeatPlayer>
    )
}

// 函数作为props.children进行传递
function Repeat(props){
    let items = [];
    for(let i = 0; i < props.numTimes; i++){
        items.push(props.children(i));
    }
    console.log("items:",items);
    return <div>{items}</div>
}

function ListOfTenThings(){
    return (
        <Repeat numTimes={10}>
            {(index) => <div key={index}>This is item {index} in the list</div>}
        </Repeat>
    )
}

ReactDOM.render(
    <div>
        <App/>
        <MyComponents.DatePicker color={'red'}/>
        <Button
            number={4}
            message={'hello world!'}
            tag="&lt;3"
            label={"<3"}
            autocomplete
        />
        <Greeting firstName={'kyrie'} lastName={'irving'}/>
        <Greeting {...props}/>
        <ThemeButton/>
        <Banner/>
        <ul>
            <PlayerList/>
            <PlayerItem/>
        </ul>
        <p>函数作为props.children</p>
        <ListOfTenThings/>
        <LengthOfPlayer/>
    </div>,
    document.getElementById("root")
)