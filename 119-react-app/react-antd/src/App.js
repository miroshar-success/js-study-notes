import React from 'react';
import './App.css';

import {DatePicker,Button,Icon} from 'antd'
import 'antd/dist/antd.css'
class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading:false,
            iconLoading:false
        }
    }
    handleLoading = () => {
        this.setState({
            loading:true
        })
    }
    render(){
        return (
            <div className="App">
                <header className="App-header">
                    <DatePicker/>
                </header>
                <Button type={"primary"}>Primary</Button>
                <Button>Default</Button>
                <Button type={"dashed"}>Dashed</Button>
                <Button type={"danger"}>Danger</Button>
                <Button type={"link"}>Link</Button>
                <Button icon="search" type="danger">Search</Button>
                <Button loading shape="circle"></Button>
                <Button
                    type="primary"
                    icon="poweroff"
                    loading={this.state.loading}
                    onClick={this.handleLoading}
                >Click me!</Button>
                <Button type="primary" disabled>Primary</Button>
                <Button type="primary" size="small">Primary</Button>
                <div className="icon">
                    <Icon type="play-circle" theme="filled" />
                    <Icon type="delete" theme="filled" />
                    <Icon type="heart" theme="filled" />
                    <Icon type="ie-square" theme="filled" />
                    <Icon type="setting" theme="filled" />
                    <Icon type="smile" theme="outlined" spin/>
                </div>
            </div>
        )
    }
}

export default App;
