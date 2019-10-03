import React from 'react';
import './App.css';
class App extends React.Component{
    render(){
        return (
            <div className="App">
                <img src={require("./static/imgs/timg.jpg")} width={"250"}/>
                <h2>Form 表单</h2>
                <input type="text"/>
            </div>
        );
    }
}
export default App;
