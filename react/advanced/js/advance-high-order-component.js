class CommentList extends React.Component {
    constructor(props){
        super(props);
        this.state = {comments:DataSource.getComments()}
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount(){
        DataSource.addChangeListener(this.handleChange)
    }
    componentWillUnmount(){
        DataSource.removeChangeListener(this.handleChange)
    }
    handleChange(){
        this.setState({comments:DataSource.getComments()})
    }
    render(){
        return (
            <div>
                {this.state.comments.map((comment) => (
                    <comment comment={comment} key={comment.id}/>
                ))}
            </div>
        )
    }
}

class BlogPost extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            blogPost:DataSource.getBlogPost(props.id)
        }
    }
    componentDidMount(){
        DataSource.addChangeListener(this.handleChange);
    }
    componentWillUnmount(){
        DataSource.removeChangeListener(this.handleChange);
    }
    handleChange(){
        this.setState({
            blogPost:DataSource.getBlogPost(this.props.id)
        })
    }
    render(){
        return (
            <TextBlock text={this.state.blogPost}/>
        )
    }
}
const CommentListWithSubscription = withSubscription(CommentList,
    (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(BlogPost,
    (DataSource,props) => DataSource.getBlogPost(props.id)
)

function withSubscription(WrappedComponent,selectData){
    return class extends React.Component {
        constructor(props){
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = {
                data:selectData(DataSource,props)
            }
        }
        componentDidMount(){
            DataSource.addChangeListener(this.handleChange)
        }
        componentWillUnmount(){
            DataSource.removeChangeListener(this.handleChange)
        }
        handleChange(){
            this.setState({
                data:selectData(DataSource,this.props)
            })
        }
        render(){
            return <WrappedComponent data={this.state.data} {...this.props}/>
        }
    }
}

