import React from 'react';
import './App.css';
import {connect} from "react-redux";
import {Increment,Decrement,IncrementAsync} from "./reducers/index.js";

class App extends React.Component {
/*    constructor(props){
        super(props);
        console.log(this.props);
        this.state = {
            count:0
        }
    }*/
/*    increment = ()=>{
        this.props.store.dispatch(this.props.add())
    }
    decrement = () => {
        this.props.store.dispatch(this.props.remove())
    }
    incrementAsync = () => {
        this.props.store.dispatch(this.props.removeAsync());
    }*/
    render(){
        return (
            <div className="App">
                <h1>{this.props.newState}</h1>
                <input
                    type="button"
                    defaultValue="增加"
                    onClick={()=>{
                        this.props.Increment()
                    }}
                />
                <input
                    type="button"
                    defaultValue="减少"
                    onClick={()=>{
                        this.props.Decrement()
                    }}
                />
                <input
                    type="button"
                    defaultValue="异步增加"
                    onClick={()=>{
                        this.props.IncrementAsync()
                    }}
                />
            </div>
        );
    }
}

const mapActionsToProps = {Increment,Decrement,IncrementAsync}
const mapStateToProps = state => {
    return {newState:state}
}

App = connect(mapStateToProps,mapActionsToProps)(App);

export default App;
