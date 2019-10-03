import React, {Component} from 'react';
class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            fn:props.fn
        }
    }
    handleDown = (e)=>{
        if(e.keyCode !== 13) return;
        if(!e.target.value.length) return;
        let text = e.target.value;
        this.state.fn(text);
        e.target.value = "";
    }
    render() {
        console.log(this.state.fn);
        return (
            <div>
                <header className="header">
                    <h1>todos</h1>
                    <input
                        className="new-todo"
                        placeholder="What needs to be done?"
                        autoFocus
                        onKeyDown={this.handleDown}
                    />
                </header>
            </div>
        );
    }
}
export default Header;