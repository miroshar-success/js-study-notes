const numbers = [2,4,6,8,10];
const listItems = numbers.map((number) =>
    <li key={number}>{number}</li>
)

class NumberList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            numbers:[1,2,3,4,5]
        }
    }
    render(){
        return (
            <ul>
                {this.state.numbers.length > 0 && this.state.numbers.map(item =>
                    <li key={item}>{item}</li>
                )}
                {listItems}
            </ul>
        )
    }
}

const players = ['kyrie','durant','curry','james'];
function PlayerItem(props){
    return <li>{props.value}</li>
}

function PlayerItems(props){
    const players = props.players;
    const element = players.map((player) =>
        <PlayerItem value={player} key={player}/>
    )
    return (
        <ul>{element}</ul>
    )
}

ReactDOM.render(
    <div>
        <NumberList/>
        <PlayerItems players={players}/>
    </div>,
    document.getElementById("root")
);

const posts = [
    {id:1,title:"Hello World!",content:"Welcome to learning React!"},
    {id:2,title:"Installation",content:"You can install React from npm"}
]

function Post(props) {
    return (
        <div>
            <h3>{props.title}</h3>
            <p>{props.content}</p>
        </div>
    )
}

function Blog(props){
    const sidebar = (
        <ul>
            {props.posts.map((post) =>
                <li key={post.id}>{post.title}</li>
            )}
        </ul>
    )
    const content = props.posts.map((post) =>
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    )
    const post = props.posts.map((post) =>
        <Post
            key={post.id}
            title={post.title}
            content={post.content}
        />
    )
    return (
        <div>
            {sidebar}
            <hr/>
            {content}
            <hr/>
            {post}
        </div>
    )
}

ReactDOM.render(
    <Blog posts={posts}/>,
    document.getElementById("root")
)







