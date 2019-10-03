import React from 'react';
import './App.css';
class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text:"",
            user:'',
            sex:"0",
            city:"",
            citylist:["杭州","深圳","广州","北京"],
            player:[
                {
                    name:'kyrie',
                    flag:true
                },
                {
                    name:"lebron",
                    flag:false
                },
                {
                    name:"durant",
                    flag:false
                },
                {
                    name:"curry",
                    flag:false
                }
            ],
            content:""
        }
    }
    changeText = (e)=>{
        console.log(e.target.value);
        this.setState({
            text:e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(
            this.state.user,
            this.state.sex,
            this.state.city,
            this.state.player,
            this.state.content
        );
    }
    handleUser = (e) => {
        this.setState({
            user:e.target.value
        })
    }
    handleSex = (e) => {
        this.setState({
            sex:e.target.value
        })
    }
    handleSelect = (e)=>{
        console.log(e.target.value);
        this.setState({
            city:e.target.value
        })
    }
    handleCheckbox = (index)=>{
        console.log(index);
        let player = this.state.player;
        player[index].flag = !this.state.player[index].flag;
        this.setState({
            player
        })
    }
    handleTextarea = (e) => {
        this.setState({
            content:e.target.value
        })
    }
    render(){
        return (
            <div className="App">
                <header className="App-header">
                    <img src={require("./static/imgs/timg.jpg")} alt="" width="200"/>
                    <h2>Form 表单</h2>
                    <input type="text" value={this.state.text} onChange={this.changeText}/>
                    <p>{this.state.text}</p>
                    <hr/>
                    <form onSubmit={this.handleSubmit}>
                        <p>
                            用户名:
                            <input
                                type="text"
                                value={this.state.user}
                                onChange={this.handleUser}
                            />
                        </p>
                        <label htmlFor="male">男:</label>
                        <input
                            type="radio"
                            id={"male"}
                            value={"0"}
                            checked={this.state.sex === "0"}
                            onChange={this.handleSex}
                        />
                        <label htmlFor="female">女:</label>
                        <input
                            type="radio"
                            id={"female"}
                            value={"1"}
                            checked={this.state.sex === "1"}
                            onChange={this.handleSex}
                        />
                        <div className={"selectBox"}>
                            {
                                this.state.citylist.length > 0 && (
                                    <select city={this.state.city} onChange={this.handleSelect}>
                                        <option readOnly>请选择城市</option>
                                        {
                                            this.state.citylist.map((item,index)=>{
                                                return (
                                                    <option key={index}>{item}</option>
                                                )
                                            })
                                        }
                                    </select>
                                )
                            }
                        </div>
                        <div className={"checkBox"}>
                            {
                                this.state.player.length > 0 && this.state.player.map((item,index)=>{
                                    return(
                                        <p key={index}>
                                            <input
                                                type="checkbox"
                                                checked={item.flag}
                                                name={"sports"}
                                                onChange={this.handleCheckbox.bind(this,index)}
                                            />
                                            <span>{item.name}</span>
                                        </p>
                                    )
                                })
                            }
                        </div>
                        <div className="textareaBox">
                            <textarea
                                value={this.state.content}
                                onChange={this.handleTextarea}
                            ></textarea>
                        </div>
                        <p>
                            <input type="submit" defaultValue="提交"/>
                        </p>
                    </form>
                </header>
            </div>
        );
    }
}
export default App;
