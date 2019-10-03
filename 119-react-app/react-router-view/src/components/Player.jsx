import React, {Component} from 'react';
import Url from "url"
class Player extends Component {
    constructor(props){
        super(props);
        this.state = {
            num:0
        }
    }
    // 无法对卸载的组件进行状态更新
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                num:5
            })
        },2000)
    }
    componentWillUnmount(){
        this.setState = () => {
            return
        }
    }
    render() {
        let player = Url.parse(this.props.location.search,true);
        console.log(player);
        const {query:{name}} = player;
        console.log(name);
        return (
            <div>
                <p>{name}</p>
            </div>
        );
    }
}
export default Player;