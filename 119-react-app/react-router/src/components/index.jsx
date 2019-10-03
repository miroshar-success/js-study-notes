import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

class Index extends Component {
    constructor(){
        super()
        this.state = {
            page:"index"
        }
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                page:"button"
            })
        },2000)
    }
    componentWillUnmount(){
        this.setState = ()=>{
            return
        }
    }
    render() {
        return (
            <div>
                <Redirect to={`/${this.state.page}`} push></Redirect>
            </div>
        );
    }
}

export default Index;