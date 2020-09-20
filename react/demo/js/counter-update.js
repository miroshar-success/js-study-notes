const buttonStyle = {margin:'10px'}
class Counter extends React.Component {
    constructor(props){
        super(props);
        this.handleDecrease = this.handleDecrease.bind(this);
        this.handleIncrease = this.handleIncrease.bind(this);
        this.handleCounterUpdate = this.handleCounterUpdate.bind(this);
        this.state = { count:props.initialValue }
    }
    handleIncrease(){
        this.handleCounterUpdate(true);
    }
    handleDecrease(){
        this.handleCounterUpdate(false);
    }
    handleCounterUpdate(isIncrement){
        let previousCount = this.state.count;
        const newCount = isIncrement ? previousCount + 1 : previousCount - 1;
        this.setState({count:newCount});
        this.props.update(previousCount,newCount);

        /* setState()并不总是立即更新组件。它会批量推迟更新。这使得在调用setState()后立即调用this.state成为隐患。
        *   state是对应用变化组件状态对引用。它不应直接被修改.应该使用基于state和props构建的新对象来表示变化。
        * 1.
        * console.log('before-setState:',this.state.count);
        *this.setState({
            count:this.state.count+1
        },() => {
            console.log('update-setState:',this.state.count);
        })
        console.log('after-setState:',this.state.count);
        *
        * 2.
        *this.setState(state => ({
            count:state.count + 1
        }),() => {
            console.log('update-setState:',this.state.count)
        })
        console.log('after-setState:',this.state.count);
        *
        * */
        // 错误写法:
/*      let previousCount = this.state.count;
        this.setState(state => ({
            count:state.count + 1 ;
        }));
        let newCount = this.state.count;*/
    }
    render(){
        return (
            <div>
                <button onClick={this.handleIncrease} style={buttonStyle}>+</button>
                <button onClick={this.handleDecrease} style={buttonStyle}>-</button>
                <span>{this.props.caption}-count : {this.state.count}</span>
            </div>
        )
    }
}

Counter.propTypes = {
    caption:PropTypes.string.isRequired,
    initialValue:PropTypes.number,
    update:PropTypes.func
}

class CounterWrapper extends React.Component{
    constructor(props){
        super(props);
        this.array = [2,10,20];
        let initSum = this.array.reduce((a,b) => a+b,0)
        this.state = {
            sum:initSum
        }
        this.handleTotal = this.handleTotal.bind(this);
    }
    handleTotal(previousCount,count){
        console.log(previousCount,count);
        this.setState(state => ({
            sum:state.sum + count - previousCount
        }))
    }
    render(){
        let array = this.array;
        return (
            <div>
                <Counter caption={'First Value'} initialValue={array[0]} update={this.handleTotal}/>
                <Counter caption={'Second Value'} initialValue={array[1]} update={this.handleTotal}/>
                <Counter caption={'Third Value'} initialValue={array[2]} update={this.handleTotal}/>
                <p>Total-Count : {this.state.sum}</p>
            </div>
        )
    }
}
ReactDOM.render(
    <CounterWrapper/>,
    document.getElementById("root")
)