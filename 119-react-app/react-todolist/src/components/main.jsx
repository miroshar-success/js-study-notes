import React, {Component} from 'react';
class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            player:props.player
        }
        this.handleRemove = this.handleRemove.bind(this);
    }
    handleRemove(index){
        console.log("点击了第",index + "个");
        let player = this.state.player;
        player.splice(index,1);
        this.setState({
            player
        })
    }
    render() {
        return (
            <section className="main">
                <input id="toggle-all" className="toggle-all" type="checkbox"/>
                    <label htmlFor="toggle-all">Mark all as complete</label>
                    <ul className="todo-list">
                        {
                            this.state.player.length && this.state.player.map((item,index)=>{
                                return (
                                    <li className="completed" key={index}>
                                        <div className="view">
                                            <input className="toggle" type="checkbox" defaultChecked/>
                                            <label>{item}</label>
                                            <button className="destroy" onClick={this.handleRemove.bind(this,index)}></button>
                                        </div>
                                        <input className="edit" defaultValue="Create a TodoMVC template"/>
                                    </li>
                                )
                            })
                        }
                    </ul>
            </section>
        );
    }
}
export default Main;